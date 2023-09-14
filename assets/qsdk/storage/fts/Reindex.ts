import { StorageUtil } from "bos/exports"
import { DB, DBObserver } from "bos/framework/orm/db"
import * as orm from "bos/framework/orm/exports"
import { NATIVE } from "cc/env"
import { FTS } from "./FTS"
import { FTSHelper } from "./FTSHelper"

export type ReindexProcessor = {
    reindexTable(db: orm.DB, tableName: string, fullReindex: boolean): Promise<void>
}

const KEY_LASTTIME = "fts_last_fullreindex_time"

function warn(...data: any[]) {
    console.warn("fts reindex", ...data)
}

function log(...data: any[]) {
    // console.log("fts reindex", ...data)
}

let fullReindex = false
let pendingDBs: { [name: string]: DB } = {}
let processors: ReindexProcessor[] = []

let dbObserver: DBObserver = {
    onClose: (db) => {
        delete pendingDBs[db.name]
    },
    onOpen: (db) => {
        if (db.name.startsWith("bos_orm_fts_")) {
            return
        }
        let ftsdb = FTS.ftsdb
        if (ftsdb) {
            reindexDB(db)
        } else {
            pendingDBs[db.name] = db
        }
    },
    onTableRegist: (db, table) => {
    }
}

async function reindexDB(db: DB) {
    let result = await db.execAsync("select tbl_name from sqlite_master where type = 'table'")
    if (!result.success || !result.rows || !result.rows.length) {
        warn("查询表出错", result)
        return
    }
    log("tables", result.rows)
    for (let row of result.rows) {
        let name: string = row.tbl_name
        if (name && !name.startsWith("sqlite")) {
            for (let p of processors) {
                await p.reindexTable(db, name, fullReindex)
            }
        }
    }
}

async function cleanFTS(db: orm.DB, tb: orm.TableConnection<any>) {
    let sql = `select id from ${tb.tableName}`
    let result = await db.execAsync(sql)
    if (!result.success) {
        warn("cleanFTS", sql, result)
        return
    }
    let ids = result.rows.map(row => {
        let id = parseInt(row.id) || 0
        return id
    })
    if (ids.length == 0) {
        return
    }
    log("ids", db.name, tb.tableName, ids)
    FTS.meta.delete(orm.and({
        dbName: db.name,
        tableName: tb.tableName,
        docID__notin: ids,
    }))
}

export namespace Reindex {

    export function init() {
        let lastTime = parseInt(StorageUtil.get(KEY_LASTTIME)) || 0
        fullReindex = Date.now() - lastTime > 7 * 24 * 3600 * 1000
        if (fullReindex) {
            log("fts上次索引时间", new Date(lastTime).toLocaleString(), "需要全部重建")
        }
        DB.addObserver(dbObserver)
        Object.values(DB.getAllDBs()).forEach(db => {
            dbObserver.onOpen(db)
        })
    }

    export function onFtsInit() {
        setTimeout(async () => {
            for (let name in pendingDBs) {
                let db = pendingDBs[name]
                await reindexDB(db)
            }
            pendingDBs = {}
            if (fullReindex) {
                StorageUtil.set(KEY_LASTTIME, Date.now().toString())
            }
        }, 5000);
    }

    export function regist(processor: ReindexProcessor) {
        if (!processors.includes(processor)) {
            processors.push(processor)
        }
    }

}

Reindex.regist({
    reindexTable: async (db: orm.DB, tableName: string, fullReindex: boolean) => {
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
        if (!FTSHelper.hasFtsInfo(td)) {
            return
        }
        if (!fullReindex) {
            cleanFTS(db, tb)
        }


        let metaMaxDocID = 0
        let dataMaxDocID = 0

        // 找最大的docID
        if (!fullReindex) {
            let ftsdb = FTS.ftsdb
            if (!ftsdb) {
                warn("没有ftsdb")
                return
            }
            let sql = `select max(docID) as maxid from meta where dbName='${db.name}' and tableName='${tb.tableName}'`
            let result = await ftsdb.execAsync(sql)
            if (!result.success) {
                warn(sql, result)
                return
            }
            if (result.rows && result.rows.length) {
                metaMaxDocID = parseInt(result.rows[0].maxid) || 0
            }
            log("metaMaxDocID", metaMaxDocID)
        }

        // 找业务表最大id
        let sql = `select max(id) as maxid from '${tb.tableName}'`
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
                .where(
                    orm.and({
                        id__gt: metaMaxDocID,
                        id__le: dataMaxDocID,
                    })
                )
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
                FTS.postInertEvent({
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

if (NATIVE) {
    Reindex.init()
}
