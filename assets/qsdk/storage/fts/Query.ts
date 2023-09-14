import * as orm from "bos/framework/orm/exports"
import { js } from "cc"
import { FTS, FTSTypes, Meta } from "./FTS"
import { MetaInfo } from "./MetaInfo"

type AddTableParam = {
    dbName: string
    tableName: string
    fetchPos?: boolean
    onlyCount?: boolean
    onlyIDs?: boolean
    /**
     * 格式按 orm.WhereOpt 内的格式，在查询业务表时会附加这个条件。 如: {uid__in:[1,3,5]}
     */
    where?: { [key: string]: any }
    limit?: number
    offset?: number
}

type QueryResult = {
    dbName: string
    tableName: string
    count?: number
    docID?: number
    subtype?: string
    pos?: { [subtype: string]: FTSTypes.FtsPos[] }
    posContent?: { [subtype: string]: string }
    data?: any
}

export class Query {

    private _keyword: string
    private _args: AddTableParam[] = []

    keyword(v: string) {
        this._keyword = v
        return this
    }

    addTable(args: AddTableParam) {
        if (args.onlyCount && args.onlyIDs) {
            throw new Error("onlyCount/onlyIDs只能有一个")
        }
        if (args.limit && (args.onlyCount || args.onlyIDs)) {
            throw new Error("onlyCount/onlyIDs不支持limit")
        }
        this._args.push(args)
        return this
    }


    async find(): Promise<QueryResult[]> {
        let metaInfo = new MetaInfo()
        let includePos = this._args.find(v => v.fetchPos) != null
        let ftsResults = await FTS.searchFts(this._keyword, includePos)
        if (!ftsResults) {
            return
        }
        if (ftsResults.length == 0) {
            return []
        }
        let metaIDs: number[] = []
        if (includePos) {
            metaInfo.addFtsResults(ftsResults)
            metaIDs = metaInfo.metaids
        } else {
            metaIDs = ftsResults.map(v => { return v.metaID })
        }

        let rtn: QueryResult[] = []

        async function onMetaResults(arg: AddTableParam, metas: Meta[]) {
            metaInfo.addMetaResults(metas)
            if (arg.onlyIDs) {
                metas.forEach(meta => {
                    rtn.push({
                        dbName: meta.dbName,
                        tableName: meta.tableName,
                        docID: meta.docID,
                        subtype: meta.subtype,
                        pos: metaInfo.getPosByDoc(meta.dbName, meta.tableName, meta.docID),
                        posContent: metaInfo.getPosContentByDoc(meta.dbName, meta.tableName, meta.docID),
                    })
                })
                return
            }
            let dbName = arg.dbName
            let tableName = arg.tableName
            let db = orm.DB.getDB(dbName)
            let tb = db && db.opened && db.table<any>(null, tableName)
            if (tb) {
                let ids: number[] = []
                let idMap: { [id: number]: boolean } = {}
                metas.forEach(meta => {
                    if (!idMap[meta.docID]) {
                        ids.push(meta.docID)
                    }
                })
                if (ids.length > 0) {
                    let args = { id__in: ids, }
                    if (arg.where) {
                        for (let key in arg.where) {
                            args[key] = arg.where[key]
                        }
                    }
                    let select = tb.select().where(orm.and(args))
                    if (arg.limit) {
                        select.limit(arg.limit)
                    }
                    if (arg.offset) {
                        select.offset(arg.offset)
                    }
                    let selectResult = await select.all()
                    if (selectResult.success) {
                        selectResult.list.forEach(v => {
                            rtn.push({
                                dbName: dbName,
                                tableName: tableName,
                                pos: arg.fetchPos && metaInfo.getPosByDoc(dbName, tableName, v.id),
                                posContent: arg.fetchPos && metaInfo.getPosContentByDoc(dbName, tableName, v.id),
                                docID: v.id,
                                data: v,
                            })
                        })
                    }
                }
            } else {
                console.log("业务数据库未打开", dbName, tableName)
            }
        }

        for (let arg of this._args) {
            if (arg.onlyCount) {
                let where = js.formatStr(
                    " id in (%s) and dbName='%s' and tableName = '%s' ",
                    metaIDs.map(v => { return v.toString() }).join(","),
                    arg.dbName,
                    arg.tableName,
                )
                let metaCountResults = await FTS.searchMetaCountByWhere(where)
                if (metaCountResults) {
                    metaCountResults.forEach(v => {
                        rtn.push({
                            dbName: v.dbName,
                            tableName: v.tableName,
                            count: v.count,
                        })
                    })
                }
            } else {
                let where = orm.and({
                    id__in: metaIDs,
                    dbName: arg.dbName,
                    tableName: arg.tableName,
                })
                let metas = await FTS.meta.select().where(where).all()
                if (metas.success) {
                    await onMetaResults(arg, metas.list)
                } else {
                    await onMetaResults(arg, [])
                }
            }
        }
        return rtn
    }


}