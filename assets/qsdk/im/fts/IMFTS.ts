import * as orm from "bos/framework/orm/exports";
import { js } from "cc";
import { NATIVE } from "cc/env";
import { FTS, FTSTypes } from "qsdk/storage/fts/FTS";
import { FTSHelper } from "qsdk/storage/fts/FTSHelper";
import { Reindex } from "qsdk/storage/fts/Reindex";

export type ChatConversationReq = {
    dbName?: string
    tableName?: string | string[]
}

export type ChatConversationResult = {
    key: string
    dbName: string
    tableName: string
    updateTime: number
    count: number
}

type ChatConversationResultMap = { [key: string]: ChatConversationResult }

export type ChatFtsReq = {
    keyword: string
    fetchKey?: boolean
    fetchPos?: boolean
    key?: string | string[]
    groupby?: string
}

export type ChatFtsResult = {
    key: string
    metaID: number
    pos?: FTSTypes.FtsPos[],
    posContent?: string,
}

export type ChatMetaReq = {
    /**
     * 是否查询metaID
     */
    fetchID: boolean
    key: string[]
    metaID: number[]
    limit?: number
    offset?: number
}

export type ChatMetaResult = {
    docID?: number
    metaID?: number
}

let delegate: FTSTypes.FtsDelegate = {
    onInsertEvent: (arg: FTSTypes.FtsDelegateArg) => {
        // console.log("imfts.onInsertEvent", arg)
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        let fts_extra = arg.td.tableOption.extra
        if (fts_extra) {
            fts_extra = fts_extra.fts_extra
        }
        if (!fts_extra) {
            return
        }
        let colContent = fts_extra.content
        let colTime = fts_extra.time
        let filter = fts_extra.filter
        if (!filter(arg.data)) {
            return
        }
        let dbName = arg.db.name
        let tableName = arg.tableName
        let updateTime = arg.data[colTime]
        if (updateTime instanceof Date) {
            updateTime = updateTime.getTime()
        }
        let content = arg.td.findFieldByPropertyName(colContent).encode(arg.data[colContent])
        if (!content) {
            return
        }
        if (content.startsWith("'") && content.endsWith("'")) {
            content = content.substring(1, content.length - 1)
        }

        // 更新时间
        let sql = js.formatStr(
            `
            insert into chatconversation(dbName, tableName, updateTime)
            values('%s', '%s', %s)
            on conflict(dbName, tableName) do
                update set updateTime = excluded.updateTime
            `,
            dbName,
            tableName,
            updateTime,
        )
        ftsdb.exec(sql, r => {
            if (!r.success) {
                console.warn("IMFTS 更新chatconversation失败", r.errmsg)
            }
        })

        // 更新meta
        sql = js.formatStr(
            `
            insert into chatmeta(dbName, tableName, key, docID, updateTime, content)
            values('%s', '%s', '%s', %s, %s, '%s')
            on conflict(key, docID) do
                update set updateTime = excluded.updateTime, content = excluded.content
            `,
            dbName,
            tableName,
            dbName + "." + tableName,
            arg.data.id,
            updateTime,
            content,
        )
        ftsdb.exec(sql, r => {
            if (!r.success) {
                console.warn("IMFTS 更新meta失败", r.errmsg)
            }
        })

    },
    onDeleteEvent: (arg: FTSTypes.FtsDelegateArg) => {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        let sql = js.formatStr(
            "delete from chatmeta where dbName = '%s' and tableName = '%s' and docID = %s",
            arg.db.name,
            arg.tableName,
            arg.data.id,
        )
        ftsdb.exec(sql, r => {
            if (!r.success) {
                console.warn("IMFTS删除chatmeta失败", r.errmsg)
            }
        })
    },
    onUpdateEvent: (arg: FTSTypes.FtsDelegateArg) => {
        delegate.onDeleteEvent(arg)
        delegate.onInsertEvent(arg)
    }
}

async function init() {
    let ftsdb = FTS.ftsdb
    if (!ftsdb) {
        console.warn("IMFTS ftsdb为空")
        return
    }

    // 创建meta表
    let sql = `
        create table if not exists chatmeta(
            metaID integer primary key autoincrement,
            dbName,
            tableName,
            key,
            docID integer,
            updateTime integer,
            content,
            unique(key, docID)
        )
    `
    ftsdb.exec(sql, r => {
        if (!r.success) {
            console.warn("IMFTS 创建chatmeta失败", r.errmsg)
        }
    })

    // 创建时间表
    sql = `
        create table if not exists chatconversation(
            dbName,
            tableName,
            updateTime integer,
            primary key(dbName, tableName)
        )
    `
    ftsdb.exec(sql, r => {
        if (!r.success) {
            console.warn("IMFTS 创建chatconversation失败", r.errmsg)
        }
    })

    // 创建fts
    sql = `
        create virtual table if not exists chatfts using fts5(
            content,
            metaID unindexed,
            key,
            tokenize = 'simple'
        )
    `
    ftsdb.exec(sql, r => {
        if (!r.success) {
            console.warn("IMFTS创建chatfts失败", r.errmsg)
        }
    })

    // 创建触发器
    sql = `
        create trigger if not exists chatmeta_ai after insert on chatmeta begin
            insert into chatfts(content, metaID, key) values(new.content, new.metaID, new.key);
        end;

        create trigger if not exists chatmeta_ad after delete on chatmeta begin
            delete from chatfts where metaID = old.metaID;
        end;

        create trigger if not exists chatmeta_au after update on chatmeta begin
            update chatfts set content = new.content where metaID = new.metaID;
        end;
    `
    ftsdb.exec(sql, r => {
        if (!r.success) {
            console.warn("IMFTS创建触发器失败", r.errmsg)
        }
    })
}

export class IMFTS {
    static init() {
        if (!NATIVE) {
            return
        }
        FTS.addDelegate(delegate)
        init()
    }

    /**
     * 查询 ftsconversation 表。 表中记录的有某张表最后更新更新
     * @param arg 
     * @returns 
     */
    static async searchChatConversation(arg?: ChatConversationReq): Promise<ChatConversationResultMap> {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        if (arg == null) {
            arg = {}
        }
        let rtn: ChatConversationResultMap = {}

        let tableNames: string[] = null
        if (typeof (arg.tableName) == "string") {
            tableNames.push(`'${arg.tableName}'`)
            tableNames = [`'${arg.tableName}'`]
        } else if (Array.isArray(arg.tableName)) {
            tableNames = []
            arg.tableName.forEach(v => {
                tableNames.push(`'${v}'`)
            })
        }

        let sql = js.formatStr(
            "select dbName, tableName, updateTime from chatconversation where 1 %s %s;",
            arg.dbName ? js.formatStr(" and dbName='%s'", arg.dbName) : "",
            tableNames ? js.formatStr(" and tableName in(%s)", tableNames.join(",")) : ""
        )
        let r = await ftsdb.execAsync(sql)
        if (!r.success) {
            return null
        }
        r.rows.forEach(row => {
            let item: ChatConversationResult = {
                key: row.dbName + "." + row.tableName,
                dbName: row.dbName,
                tableName: row.tableName,
                updateTime: parseInt(row.updateTime),
                count: 0,
            }
            rtn[item.key] = item
        })
        return rtn
    }

    static async searchChatFts(arg: ChatFtsReq): Promise<ChatFtsResult[]> {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        let columns = ""
        let where = ""
        if (arg.fetchKey) {
            columns = ", key"
        }
        if (arg.fetchPos) {
            columns = columns + ", simple_highlight_pos(chatfts, 0) as pos, simple_highlight(chatfts, 0, '<<<', '>>>') as posContent"
        }
        if (arg.key) {
            if (typeof (arg.key) == "string") {
                where = js.formatStr("and key = '%s'", arg.key)
            } else {
                where = js.formatStr("and key in (%s)", arg.key.map(v => `'${v}'`).join(","))
            }
        }
        let sql = js.formatStr(
            "select metaID %s from chatfts where 1 %s and content match simple_query('%s') %s",
            columns,
            where,
            arg.keyword,
            arg.groupby || "",
        )
        let r = await ftsdb.execAsync(sql)
        if (!r.success) {
            return
        }
        let rtn: ChatFtsResult[] = []
        r.rows.forEach(row => {
            rtn.push({
                key: row.key,
                metaID: parseInt(row.metaID),
                pos: FTSHelper.parsePos(row.pos),
                posContent: row.posContent,
            })
        })
        return rtn
    }

    static async searchChatMeta(arg: ChatMetaReq): Promise<ChatMetaResult[]> {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            return
        }
        let columns = ""
        let where = ""
        let limit = ""
        if (arg.fetchID) {
            columns = ", metaID"
        }
        if (arg.key) {
            where = js.formatStr(" and key in (%s)", arg.key.map(v => `'${v}'`).join(","))
        }
        if (arg.metaID) {
            where = where + js.formatStr(" and metaID in (%s)", arg.metaID.join(","))
        }
        if (arg.limit) {
            limit = " limit " + arg.limit
            if (arg.offset) {
                limit = limit + " offset " + arg.offset
            }
        }
        let sql = js.formatStr(
            "select docID %s from chatmeta where 1 %s order by updateTime desc, metaID desc %s",
            columns,
            where,
            limit,
        )
        let r = await ftsdb.execAsync(sql)
        if (!r.success) {
            return
        }
        let rtn: ChatMetaResult[] = []
        r.rows.forEach(row => {
            rtn.push({
                metaID: parseInt(row.metaID) || null,
                docID: parseInt(row.docID) || null,
            })
        })
        return rtn
    }
}


if (NATIVE) {
    function warn(...data: any[]) {
        console.warn("imfts reindex", ...data)
    }

    function log(...data: any[]) {
        // console.log("imfts reindex", ...data)
    }
    async function cleanFTS(db: orm.DB, tb: orm.TableConnection<any>) {
        let ftsdb = FTS.ftsdb
        if (!ftsdb) {
            warn("没有ftsdb")
            return
        }
        let sql = `select id from ${tb.tableName}`
        let result = await db.execAsync(sql)
        if (!result.success || !result.rows) {
            warn("cleanFTS", sql, result)
            return
        }
        let ids = result.rows.map(row => {
            let id = parseInt(row.id) || 0
            return id
        })
        log(db.name, tb.tableName, ids)
        if (ids.length == 0) {
            return
        }
        sql = js.formatStr(
            `delete from chatmeta where dbName='%s' and tableName='%s' and docID not in(%s)`,
            db.name,
            tb.tableName,
            ids.join(",")
        )
        await ftsdb.execAsync(sql)
    }

    Reindex.regist({
        reindexTable: async (db, tableName, fullReindex) => {
            log("reindexTable", db.name, tableName)
            let tb = db.getTable(tableName)
            if (!tb) {
                warn("没有tb", db.name, tableName)
                return
            }
            let td = tb.getTableData()
            if (!td) {
                warn("没有td", db.name, tableName)
                return
            }
            let fts_extra = td.tableOption.extra && td.tableOption.extra.fts_extra
            if (!fts_extra) {
                return
            }
            let ftsdb = FTS.ftsdb
            if (!ftsdb) {
                warn("没有ftsdb")
                return
            }
            if (!fullReindex) {
                await cleanFTS(db, tb)
            }

            let metaMaxDocID = 0
            let dataMaxDocID = 0

            if (!fullReindex) {
                let sql = js.formatStr(
                    `select max(docID) as maxid from chatmeta where dbName='%s' and tableName='%s'`,
                    db.name,
                    tb.tableName
                )
                let result = await ftsdb.execAsync(sql)
                if (!result.success) {
                    warn(sql, result)
                }
                if (result.success && result.rows && result.rows.length) {
                    metaMaxDocID = parseInt(result.rows[0].maxid) || 0
                }
                log("metaMaxDocID", metaMaxDocID)
            }

            let sql = `select max(id) as maxid from ${tb.tableName}`
            let result = await db.execAsync(sql)
            if (!result.success) {
                warn(sql, result)
            }
            if (result.success && result.rows && result.rows.length) {
                dataMaxDocID = parseInt(result.rows[0].maxid) || 0
            }
            log("dataMaxDocID", dataMaxDocID)

            if (metaMaxDocID < dataMaxDocID) {
                log("需要增量更新", db.name, tableName, metaMaxDocID, dataMaxDocID)
            }

            let offset = 0
            while (true) {
                let result = await tb.select()
                    .where(orm.and({
                        id__gt: metaMaxDocID,
                        id__le: dataMaxDocID
                    }))
                    .orderByAsc("id")
                    .limit(10)
                    .offset(offset)
                    .all()
                if (!result.success) {
                    warn(result)
                }
                if (!result.success || !result.list || !result.list.length) {
                    break
                }
                for (let v of result.list) {
                    delegate.onInsertEvent({
                        data: v,
                        db: db,
                        tableName: tb.tableName,
                        td: td,
                    })
                }
                offset = offset + result.list.length
            }
        }
    })
}