import * as orm from "bos/framework/orm/exports";
import { js } from "cc";
import { NATIVE } from "cc/env";
import { FTS, FTSTypes } from "qsdk/storage/fts/FTS";
import { MetaData, MetaInfo } from "qsdk/storage/fts/MetaInfo";
import { IMFTS } from "./IMFTS";

export namespace ChatSearchTypes {
    export type FindCountResult = {
        dbName: string
        tableName: string
        updateTime: number
        count: number
    }

    export type FindContentReq = {
        keyword: string
        dbName: string
        tableName: string
        fetchPos?: boolean
        limit?: number
        offset?: number
    }

    export type FindContentResult = {
        /**
         * 业务表数据
         */
        data: any
        pos: FTSTypes.FtsPos[]
        posContent: string
    }
}

export class ChatSearch {

    static init(uid: number) {
        if (!NATIVE) {
            return
        }
        FTS.init({ uid: uid })
        IMFTS.init()
    }

    /**
     * 通过关键字查询会话，仅返回每个会话匹配的聊到记录的数量
     * @param search 
     * @returns 
     */
    static async findCount(search: string): Promise<ChatSearchTypes.FindCountResult[]> {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        let conversionResults = await IMFTS.searchChatConversation()
        if (!conversionResults) {
            return
        }
        let keys = Object.keys(conversionResults).map(key => `'${key}'`)
        let sql = js.formatStr(
            "select key, count() as count from chatfts where key in (%s) and content match simple_query('%s') group by key",
            keys.join(","),
            search,
        )
        let r = await ftsdb.execAsync(sql)
        if (!r.success) {
            return
        }
        let rtn: ChatSearchTypes.FindCountResult[] = []
        r.rows.forEach(row => {
            let key = row.key
            let count = parseInt(row.count) || 0
            let conversation = conversionResults[key]
            if (conversation) {
                rtn.push({
                    dbName: conversation.dbName,
                    tableName: conversation.tableName,
                    count: count,
                    updateTime: conversation.updateTime,
                })
            }
        })
        return rtn
    }

    static async findContent(arg: ChatSearchTypes.FindContentReq): Promise<ChatSearchTypes.FindContentResult[]> {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        let key = arg.dbName + "." + arg.tableName
        let metaInfo = new MetaInfo()

        let ftsResults = await IMFTS.searchChatFts({
            keyword: arg.keyword,
            key: key,
            fetchPos: arg.fetchPos,
        })
        if (!ftsResults) {
            return
        }
        if (ftsResults.length == 0) {
            return []
        }
        let metaIDs = ftsResults.map(v => { return v.metaID })
        if (arg.fetchPos) {
            metaInfo.addFtsResults(ftsResults)
        }
        let metaResults = await IMFTS.searchChatMeta({
            fetchID: arg.fetchPos,
            key: [key],
            metaID: metaIDs,
            limit: arg.limit,
            offset: arg.offset
        })
        if (!metaResults) {
            return
        }
        if (metaResults.length == 0) {
            return []
        }
        let docIDs = metaResults.map(v => v.docID)
        if (arg.fetchPos) {
            let metas: MetaData[] = metaResults.map(v => {
                return {
                    dbName: arg.dbName,
                    tableName: arg.tableName,
                    docID: v.docID,
                    id: v.metaID,
                }
            })
            metaInfo.addMetaResults(metas)
        }

        let rtn: ChatSearchTypes.FindContentResult[] = []
        // 开始查业务表
        let db = orm.DB.getDB(arg.dbName)
        let tb = db && db.opened && db.table<any>(null, arg.tableName)
        if (tb) {
            let r = await tb.select()
                .where(orm.where.and({ id__in: docIDs }))
                .orderByDesc("id")
                .all()
            if (!r.success) {
                return
            }
            r.list.forEach(data => {
                let pos = metaInfo.getPosByDoc(arg.dbName, arg.tableName, data.id)
                let posContent = metaInfo.getPosContentByDoc(arg.dbName, arg.tableName, data.id)
                rtn.push({
                    data: data,
                    pos: pos && pos.SUBTYPE,
                    posContent: posContent && posContent.SUBTYPE,
                })
            })
        } else {
            console.log("业务表未打开", arg.dbName, arg.tableName)
        }
        return rtn
    }

}