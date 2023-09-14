import { js } from "cc"
import { FTS, FtsPos } from "qsdk/storage/fts/FTS"
import { IMFTS } from "./IMFTS"

//-------- 暂未实现

export type FindCountResult = {
    key: string
    dbName: string
    tableName: string
    updateTime: number
    count: number
}

export type FindContentHandler = {
    totalCount(): number
    next()
}

export type FindContentResult = {
    data: any
    pos?: FtsPos[]
}

export class ChatQuery {

    private _keyword = ""
    private _dbName = ""
    private _tableNames: string[]
    private _limit: number
    private _fetchPos: boolean

    keyword(keyword: string) {
        this._keyword = keyword
        return this
    }

    dbName(dbName: string) {
        this._dbName = dbName
        return this
    }

    tableNames(...names: string[]) {
        this._tableNames = names
        return this
    }

    limit(limit: number) {
        this._limit = limit
        return this
    }

    fetchPos(fetchPos: boolean) {
        this._fetchPos = fetchPos
        return this
    }

    async findCount(): Promise<FindCountResult[]> {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        let dbName = this._dbName
        let tableNames = this._tableNames

        let conversations = await IMFTS.searchChatConversation({
            dbName: dbName,
            tableName: tableNames
        })
        if (!conversations) {
            return
        }

        let where = ""
        if (dbName && tableNames) {
            where = js.formatStr(
                " and key in (%s)",
                tableNames.map(tableName => {
                    return `'${dbName}.${tableName}'`
                }).join(",")
            )
        } else if (dbName) {
            where = ` and key like '${dbName}.%'`
        } else {
            throw new Error("必须指定dbName")
        }

        let sql = js.formatStr(
            "select key, count() as count from chatfts where content match simple_query('%s') %s group by key",
            this._keyword,
            where,
        )
        let r = await ftsdb.execAsync(sql)
        if (!r.success) {
            return
        }
        let rtn: FindCountResult[] = []
        r.rows.forEach(row => {
            let key = row.key
            let conversation = conversations[key]
            if (conversation) {
                rtn.push({
                    dbName: conversation.dbName,
                    tableName: conversation.tableName,
                    key: key,
                    count: parseInt(row.count) || 0,
                    updateTime: conversation.updateTime,
                })
            }
        })
        return rtn
    }

    static async findContent() {

    }


}