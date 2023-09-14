import * as orm from "bos/framework/orm/exports";
import { FTS, FTSTypes, Meta } from "./FTS";
import { MetaInfo } from "./MetaInfo";
import { Query } from "./Query";

export namespace FullSearchTypes {
    export type FindCountResult = FTSTypes.SearchMetaCountResult

    export type FindIDsResult = {
        dbName: string
        tableName: string
        docID: number
        subtype: string
        pos: FTSTypes.FtsPos[],
        posContent: string
    }

    export type FindContentResult = {
        dbName: string
        tableName: string
        pos: { [subtype: string]: FTSTypes.FtsPos[] }
        posContent: { [subtype: string]: string }
        data: any
    }

    export type MetaGroup = { [dbName: string]: { [tableName: string]: number[] } }
}

function groupMetaResults(metas: Meta[]): FullSearchTypes.MetaGroup {
    let all: FullSearchTypes.MetaGroup = {}
    metas.forEach(meta => {
        let db = all[meta.dbName]
        if (!db) {
            db = {}
            all[meta.dbName] = db
        }
        let tb = db[meta.tableName]
        if (!tb) {
            tb = []
            db[meta.tableName] = tb
        }
        tb.push(meta.docID)
    })
    return all
}

export class FullSearch {

    static init(params: FTSTypes.FTSInitParams) {
        FTS.init(params)
    }

    static async findCount(search: string): Promise<FullSearchTypes.FindCountResult[]> {
        let ftsResults = await FTS.searchFts(search, false)
        if (!ftsResults) {
            return null
        }
        let ids = ftsResults.map(v => { return v.metaID })
        return FTS.searchMetaCount(ids)
    }

    static async findIDs(search: string): Promise<FullSearchTypes.FindIDsResult[]> {
        let rtn: FullSearchTypes.FindIDsResult[] = []
        let metaInfo = new MetaInfo()
        let ftsResults = await FTS.searchFts(search, true)
        if (!ftsResults) {
            return
        }
        metaInfo.addFtsResults(ftsResults)

        let metaResult = await FTS.meta.select().where(orm.where.and({ id__in: metaInfo.metaids })).all()
        if (!metaResult.success) {
            return
        }
        metaInfo.addMetaResults(metaResult.list)
        metaResult.list.forEach(v => {
            let pos = metaInfo.getPosByDoc(v.dbName, v.tableName, v.docID)
            let posContent = metaInfo.getPosContentByDoc(v.dbName, v.tableName, v.docID)
            rtn.push({
                dbName: v.dbName,
                tableName: v.tableName,
                docID: v.docID,
                subtype: v.subtype,
                pos: pos && pos[v.subtype],
                posContent: posContent && posContent[v.subtype],
            })
        })
        return rtn
    }

    static async findContent(search: string): Promise<FullSearchTypes.FindContentResult[]> {
        let metaInfo = new MetaInfo()
        let ftsResults = await FTS.searchFts(search, true)
        if (!ftsResults) {
            return
        }
        if (ftsResults.length == 0) {
            return []
        }
        metaInfo.addFtsResults(ftsResults)
        let metaResult = await FTS.meta.select().where(orm.where.and({ id__in: metaInfo.metaids })).all()
        if (!metaResult.success) {
            return null
        }
        metaInfo.addMetaResults(metaResult.list)
        let all = groupMetaResults(metaResult.list)

        let rtn: FullSearchTypes.FindContentResult[] = []

        for (let dbName in all) {
            for (let tableName in all[dbName]) {
                let ids = all[dbName][tableName]
                let db = orm.DB.getDB(dbName)
                if (db && db.opened) {
                    let conn = db.table<any>(null, tableName)
                    if (conn) {
                        let result = await conn.select().where(orm.where.and({ id__in: ids })).all()
                        if (result.success) {
                            result.list.forEach(v => {
                                rtn.push({
                                    dbName: dbName,
                                    tableName: tableName,
                                    pos: metaInfo.getPosByDoc(dbName, tableName, v.id),
                                    posContent: metaInfo.getPosContentByDoc(dbName, tableName, v.id),
                                    data: v,
                                })
                            })
                        }
                    }
                }
            }
        }
        return rtn
    }

    static newQuery() {
        return new Query()
    }
}
