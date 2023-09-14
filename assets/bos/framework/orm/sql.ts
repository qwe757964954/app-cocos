import { Log } from "bos/exports"
import * as cc from "cc"

const USE_EXEC_NEW = true

interface Db { }

type OpenCallback = (db: Db) => void

export type ExtraResult = {
    rowid: number
    updated: number
}

export type ExecResult = {
    success: boolean
    errmsg?: string
    rows?: any[]
    extra?: ExtraResult
}

export type ExecCallback = (result: ExecResult) => void

export interface Isql {
    open(name: string, cb: OpenCallback)
    close(db: Db)
    exec(db: Db, sql: string, cb?: ExecCallback)
    get support(): boolean
}

export class NativeSql implements Isql {

    support = true

    open(name: string, cb: OpenCallback) {
        let root = cc.native.fileUtils.getWritablePath()
        let dir = root + "/orm"
        cc.native.fileUtils.createDirectory(dir)
        let file = dir + `/${name}.db`
        let db = p_sqlite.open(file)
        setTimeout(() => {
            cb(db)
        }, 0);
    }

    close(db: Db) {
        p_sqlite.close(db)
    }

    exec(db: Db, sql: string, cb?: ExecCallback) {
        // console.log("nativesql.exec", sql)
        if (USE_EXEC_NEW) {
            this.execNew(db, sql, cb)
        } else {
            this.execOld(db, sql, cb)
        }
    }

    private execOld(db: Db, sql: string, cb?: ExecCallback) {
        let rows = []
        p_sqlite.exec(db, sql, (result) => {
            if (!cb) {
                return
            }
            if (result.keys) {
                let item = {}
                for (let i = 0; i < result.keys.length; i++) {
                    let key = result.keys[i]
                    let value = result.values[i]
                    item[key] = value
                }
                rows.push(item)
            }
            if (result.finish) {
                if (result.errmsg) {
                    Log.e("NativeSql", result.errmsg)
                    Log.e(sql)
                }
                cb({
                    success: result.errmsg == null || result.errmsg == "",
                    errmsg: result.errmsg,
                    rows: rows,
                    extra: {
                        rowid: result.rowid,
                        updated: result.updated,
                    }
                })
            }
        })
    }

    private execNew(db: Db, sql: string, cb?: ExecCallback) {
        let rows = []
        p_sqlite.exec(db, sql, (result) => {
            if (!cb) {
                return
            }
            if (result.rows) {
                for (let row of result.rows) {
                    let keys = row.keys
                    let values = row.values
                    let item = {}
                    for (let i = 0; i < keys.length; i++) {
                        let key = keys[i]
                        let value = values[i]
                        item[key] = value
                    }
                    rows.push(item)
                }
            }
            if (result.errmsg) {
                Log.e("NativeSql", result.errmsg)
                Log.e(sql)
            }
            cb({
                success: result.errmsg == null || result.errmsg == "",
                errmsg: result.errmsg,
                rows: rows,
                extra: {
                    rowid: result.rowid,
                    updated: result.updated,
                }
            })
        }, true)
    }
}

export class WebSql implements Isql {

    get support(): boolean {
        let win: any = window
        return typeof win.openDatabase == "function"
    }

    open(name: string, cb: OpenCallback) {
        let win: any = window
        let db = win.openDatabase(name, "1", name, 1000)
        setTimeout(() => {
            cb(db)
        }, 0);
    }

    close(db: Db) {
        // nothing
    }

    exec(_db: Db, sql: string, cb?: ExecCallback) {
        // console.log("websql.exec", sql)
        let db = _db as any
        db.transaction(ctx => {
            let sqls: string[] = []
            sql.split(";").forEach(v => {
                v = v.trim()
                if (v && v.length) {
                    sqls.push(v)
                }
            })
            for (let i = 0; i < sqls.length; i++) {
                let sql = sqls[i]
                ctx.executeSql(sql, null, (_, result) => {
                    if (!cb) {
                        return
                    }
                    let results = []
                    if (result.rows) {
                        for (let i = 0; i < result.rows.length; i++) {
                            results.push(result.rows.item(i))
                        }
                    }
                    let rowid = 0
                    let updated = 0
                    try { rowid = result.insertId } catch (e) { }
                    try { updated = result.rowsAffected } catch (e) { }
                    if (i == sqls.length - 1) {
                        cb({
                            success: true,
                            rows: results,
                            extra: {
                                rowid: rowid,
                                updated: updated,
                            }
                        })
                    }
                }, (_, e) => {
                    e.sql = sql
                    Log.e(e)
                    if (!cb) {
                        return
                    }
                    let error = e.message ? e.message.toString() : "unknown error"
                    if (i == sqls.length - 1) {
                        cb({ success: false, errmsg: error })
                    }
                    return true
                })
            }
        })
    }

}