import { js, sys } from "cc"
import { DEBUG, NATIVE } from "cc/env"
import { Listeners } from "./Listeners"
import { findTableData, setRowid } from "./decorators"
import { ExecCallback, ExecResult, Isql, NativeSql, WebSql } from "./sql"
import { TableConnection } from "./table"
import { Where, WhereOpt } from "./where"

export type InsertResult<T> = {
    success: boolean
    result: T
    errmsg?: string
}

export type SelectMultiResult<T> = {
    success: boolean
    list?: T[]
    errmsg?: string
}

export type SelectSingleResult<T> = {
    success: boolean
    result?: T
    errmsg?: string
}

export type UpdateResult = {
    success: boolean
    errmsg?: string
}

export type SaveResult<T> = InsertResult<T>

export type LimitString = string

export type OrderString = string

export type InsertCallback<T> = (result: InsertResult<T>) => void

export type SelectCallback<T> = (result: SelectMultiResult<T>) => void

export type UpdateCallback = (result: UpdateResult) => void

export type DBObserver = {
    onOpen(db: DB): void
    onClose(db: DB): void
    onTableRegist(db: DB, table: TableConnection<any>): void
}

let observers: DBObserver[] = []
let dbs = new Map<string, DB>()

export class DB {

    private static addDB(db: DB) {
        dbs.set(db.name, db)
    }

    private static removeDB(db: DB | string) {
        if (!db) {
            return
        }
        if (typeof db == "string") {
            dbs.delete(db)
        } else {
            dbs.delete(db.name)
        }
    }

    static getDB(dbName: string): DB {
        return dbs.get(dbName)
    }

    static getAllDBs() {
        let rtn: { [dbname: string]: DB } = {}
        dbs.forEach((db, name) => {
            rtn[name] = db
        })
        return rtn
    }

    static addObserver(observer: DBObserver) {
        if (observer) {
            if (!observers.includes(observer)) {
                observers.push(observer)
            }
        }
    }

    static removeObserver(observer: DBObserver) {
        if (observer) {
            js.array.remove(observers, observer)
        }
    }

    private _name: string
    private db: any
    private isql: Isql
    private runs: VoidFunction[]
    private tables: { [tableName: string]: TableConnection<any> } = {}

    constructor(name: string) {
        this._name = name
        this.isql = sys.isBrowser ? new WebSql() : new NativeSql()
        DB.addDB(this)
        observers.forEach(observer => {
            observer.onOpen(this)
        })
    }

    get name() {
        return this._name
    }

    get opened() {
        return this.db != null
    }

    getAllTables() {
        let rtn: { [tableName: string]: TableConnection<any> } = {}
        for (let key in this.tables) {
            rtn[key] = this.tables[key]
        }
        return rtn
    }

    getTable(tableName: string) {
        return this.tables[tableName]
    }

    private commit(fun: VoidFunction) {
        if (this.db) {
            fun()
        } else {
            if (this.runs == null) {
                this.runs = [fun]
                this.isql.open(this._name, db => {
                    this.db = db
                    let runs = [...this.runs]
                    this.runs = []
                    runs.forEach(f => {
                        f()
                    })
                })
            } else {
                this.runs.push(fun)
            }
        }
    }

    close() {
        DB.removeDB(this)
        this.commit(() => {
            this.isql.close(this.db)
            this.db = null
        })
        observers.forEach(observer => {
            observer.onOpen(this)
        })
    }

    /**
     * 注册这个table，如果不传tableName，则使用table注解定义的名字
     * @param table 
     * @param tableName 
     * @returns 
     */
    register<T>(table: Function, tableName?: string) {
        let td = findTableData(table)
        if (tableName == null || tableName == "") {
            tableName = td.tableOption.name
        }
        td.check()
        let conn = new TableConnection<T>(this, table, tableName)
        this.tables[tableName] = conn
        let sql = td.createSql(tableName)
        this.commit(() => {
            this.isql.exec(this.db, sql)
        })
        observers.forEach(observer => {
            observer.onTableRegist(this, conn)
        })
        return conn
    }

    /**
     * 获取某个已经注册的table。 优先使用tableName获取，如果未传tableName，则从clz中寻找tableName
     * @param clz 
     * @param tableName 
     * @returns 
     */
    table<T>(clz: Function, tableName?: string) {
        if (tableName == null || tableName == "") {
            let td = findTableData(clz)
            tableName = td.tableOption.name
        }
        return this.tables[tableName] as TableConnection<T>
    }

    dropTable(clz: Function, tableName?: string) {
        if (tableName == null || tableName == "") {
            tableName = findTableData(clz).tableOption.name
        }
        let sql = "drop table if exists " + tableName
        this.commit(() => {
            this.isql.exec(this.db, sql)
        })
    }

    /**
     * 一次插入多条数据。 **此操作无法获得插入rowid**
     * @param tableName 
     * @param data 
     * @param cb 
     */
    insertAll<T>(tableName: string, data: T[], cb: InsertCallback<T[]>) {
        if (data == null || data.length == 0) {
            cb({ result: null, success: false, errmsg: "data不能为空" })
            return
        }
        let td = findTableData(data[0])
        let sqls: string[] = []
        for (let t of data) {
            let sql = "insert into " + tableName
            sql = sql + "(" + td.fields.map(v => v.fieldOption.name).join(", ") + ")"
            sql = sql + " values(" + td.fields.map(v => {
                let value = t[v.propertyName]
                if (v.fieldOption.primary && (value == null || value == 0 || value == "")) {
                    return "null"
                }
                let str = v.encode(value)
                if (typeof (v.fieldOption.type) == "object") {
                    str = `'${str}'`
                }
                return str
            }).join(", ") + ")"
            sql = sql + "; "
            sqls.push(sql)
        }
        let sql = sqls.join("")
        this.commit(() => {
            this.isql.exec(this.db, sql, result => {
                cb({ success: result.success, result: data, errmsg: result.errmsg })
                if (result.success) {
                    for (let t of data) {
                        Listeners.onInsertEvent({
                            db: this,
                            data: t,
                            tableName: tableName,
                            td: td,
                        })
                    }
                }
            })
        })
    }

    insert<T>(tableName: string, t: T, cb: InsertCallback<T>) {
        let td = findTableData(t)
        let sql = "insert into " + tableName
        sql = sql + "(" + td.fields.map(v => v.fieldOption.name).join(", ") + ")"
        sql = sql + " values(" + td.fields.map(v => {
            let value = t[v.propertyName]
            if (v.fieldOption.primary && (value == null || value == 0 || value == "")) {
                return "null"
            }
            let str = v.encode(value)
            if (typeof (v.fieldOption.type) == "object") {
                str = `'${str}'`
            }
            return str
        }).join(", ") + ")"
        this.commit(() => {
            this.isql.exec(this.db, sql, result => {
                if (result.success && result.extra && result.extra.rowid) {
                    setRowid(t, result.extra.rowid)
                }
                cb({ success: result.success, result: t, errmsg: result.errmsg })
                if (result.success) {
                    Listeners.onInsertEvent({
                        db: this,
                        data: t,
                        tableName: tableName,
                        td: td,
                    })
                }
            })
        })
    }

    update<T>(tableName: string, t: T, cb?: UpdateCallback) {
        let td = findTableData(t)
        let sql = "update " + tableName
        sql = sql + " set "
        sql = sql + td.fields.map(f => {
            let v = t[f.propertyName]
            let value = f.encode(v)
            let str = f.fieldOption.name + "="
            if (typeof (f.fieldOption.type) == "object") {
                str = str + `'${value}'`
            } else {
                str = str + value
            }
            return str
        }).join(", ")
        let pk = td.findPrimaryKey()
        sql = sql + " where " + pk.fieldOption.name + "=" + pk.encode(t[pk.propertyName])
        this.commit(() => {
            this.isql.exec(this.db, sql, result => {
                cb && cb({ success: result.success, errmsg: result.errmsg })
                if (result.success) {
                    Listeners.onUpdateEvent({
                        db: this,
                        tableName: tableName,
                        td: td,
                        data: t,
                    })
                }
            })
        })
    }

    updateAll(tableName: string, clz: Function, where: Where, args: { [key: string]: string | number }, cb?: UpdateCallback) {
        let td = findTableData(clz)
        let sql = "update " + tableName
        sql = sql + " set "
        let strs: string[] = []
        for (let k in args) {
            let v = args[k]
            let f = td.findFieldByFieldName(k)
            if (f) {
                strs.push(f.fieldOption.name + "=" + f.encode(v))
            }
        }
        sql = sql + strs.join(",")
        if (where) {
            if (where instanceof WhereOpt) {
                sql = sql + " where " + where.buildSentence()
            } else {
                sql = sql + " where " + where
            }
        }
        this.commit(() => {
            this.isql.exec(this.db, sql, result => {
                cb && cb({ success: result.success, errmsg: result.errmsg })
            })
        })
    }

    delete(tableName: string, where: Where) {
        let sql = "delete from " + tableName
        if (where) {
            if (where instanceof WhereOpt) {
                sql = sql + " where " + where.buildSentence()
            } else {
                sql = sql + " where " + where
            }
        }
        this.commit(() => {
            this.isql.exec(this.db, sql)
        })
    }

    deleteByPrimaryKey(tableName: string, obj) {
        let td = findTableData(obj.constructor)
        let pk = td.findPrimaryKey()
        if (!pk) {
            throw new Error("删除的对象必须有主键")
        }
        let value = obj[pk.propertyName]
        if (value == null) {
            throw new Error("主键值为null,无法删除")
        }
        let where = pk.fieldOption.name + " = " + pk.encode(value)
        this.delete(tableName, where)
        Listeners.onDeleteEvent({
            db: this,
            tableName: tableName,
            td: td,
            data: obj,
        })
    }

    find<T>(
        tableName: string,
        clz: Function,
        where: Where,
        limit: string,
        order: string,
        cb: SelectCallback<T>
    ) {
        let td = findTableData(clz)
        let sql = "select * from " + tableName
        if (where) {
            if (where instanceof WhereOpt) {
                sql = sql + " where " + where.buildSentence()
            } else {
                sql = sql + " where " + where
            }
        }
        if (order) {
            sql = sql + ` order by ${order}`
        }
        if (limit) {
            sql = sql + ` limit ${limit}`
        }
        this.commit(() => {
            this.isql.exec(this.db, sql, result => {
                if (result.success) {
                    cb && cb({ success: true, list: td.parse(result.rows) })
                } else {
                    cb && cb({ success: false, errmsg: result.errmsg })
                }
            })
        })
    }

    loadPlugin(libPath: string, entryFun?: string) {
        if (NATIVE) {
            this.commit(() => {
                if (DEBUG) {
                    console.log("loadPlugin", libPath, entryFun)
                }
                let e = p_sqlite.load_plugin(this.db, libPath, entryFun)
                if (e) {
                    console.warn("loadPlugin error", e)
                }
            })
        }
    }

    exec(sql: string, cb?: ExecCallback) {
        this.commit(() => {
            this.isql.exec(this.db, sql, cb)
        })
    }

    execAsync(sql: string): Promise<ExecResult> {
        return new Promise(r => {
            this.commit(() => {
                this.isql.exec(this.db, sql, r)
            })
        })
    }

}   