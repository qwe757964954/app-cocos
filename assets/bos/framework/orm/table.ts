import { CONNECTED_TABLE } from "./consts";
import { DB, InsertResult, SelectMultiResult, UpdateResult } from "./db";
import { findTableData } from "./decorators";
import { FindFunc, Select } from "./select";
import { Where, WhereOpt } from "./where";

export class TableConnection<T> {

    private db: DB
    private clz: Function
    private _tableName: string
    private findFunc: FindFunc<T>

    constructor(db: DB, clz: Function, tableName: string) {
        this.db = db
        this.clz = clz
        this._tableName = tableName
        if (tableName == null || tableName == "") {
            throw new Error("必须传真实的tableName")
        }
        this.findFunc = (where: Where, limit: string, order: string): Promise<SelectMultiResult<T>> => {
            return new Promise(r => {
                this.db.find<T>(tableName, this.clz, where, limit, order, r)
            })
        }
    }

    getTableData() {
        return findTableData(this.clz)
    }

    get tableName() {
        return this._tableName
    }

    /**
     * 将一个自己new出来的对象关联到这个table，之后就可以直接 obj.save() obj.update() 等操作
     * @param obj 
     */
    bindObject(obj: T) {
        Object.defineProperty(obj, CONNECTED_TABLE, { value: this, enumerable: false })
    }

    dropTable() {
        this.db.dropTable(this.clz, this._tableName)
    }

    select() {
        return new Select<T>(this.findFunc)
    }

    async insert(t: T): Promise<InsertResult<T>> {
        if (t == null) {
            throw new Error("table.insert传入参数为空")
        }
        return new Promise<InsertResult<T>>(r => {
            this.db.insert(this._tableName, t, r)
        })
    }

    async insertAll(data: T[]): Promise<InsertResult<T[]>> {
        return new Promise<InsertResult<T[]>>(r => {
            this.db.insertAll(this._tableName, data, r)
        })
    }

    async update(t: T): Promise<UpdateResult> {
        if (t == null) {
            throw new Error("table.update传入参数为空")
        }
        return new Promise(r => {
            this.db.update(this._tableName, t, r)
        })
    }

    /**
     * 根据where条件更新所有数据
     * @param where 
     * @param args 需要存入数据库的键值对，键是类中定义的字段名(不是数据库列名)，值是原始值(字符串不需要使用''包裹)
     */
    async updateAll(where: Where, args: { [key: string]: any }): Promise<UpdateResult> {
        return new Promise<UpdateResult>(r => {
            this.db.updateAll(this._tableName, this.clz, where, args, r)
        })
    }

    /**
     * update or insert by 主键
     * @param t 
     * @returns 
     */
    async save(t: T): Promise<UpdateResult> {
        let td = findTableData(t)
        let pk = td.findPrimaryKey()
        if (pk == null) {
            return { success: false, errmsg: "必须有主键才行" }
        }
        let pkValue = t[pk.propertyName]
        if (pkValue == null || pkValue == "") {
            return { success: false, errmsg: "主键必须有值" }
        }
        let r = await this.select().where(`${pk.fieldOption.name} = ${pk.decode(pkValue)}`).first()
        if (!r.success) {
            return { success: false, errmsg: r.errmsg }
        }
        if (r.result) {
            return this.save(t)
        } else {
            return this.insert(t)
        }
    }

    /**
     * 更新所有符合条件的数据
     * @param where 
     * @param t 这里的所有数据(除主键外)都会更新到数据库里去
     * @returns 
     */
    async saveByWhere(where: Where, t: T): Promise<UpdateResult> {
        let r = await this.select().where(where).first()
        if (!r.success) {
            return { success: false, errmsg: r.errmsg }
        }
        if (r.result) {
            let args: { [key: string]: any } = {}
            let td = findTableData(t)
            td.fields.forEach(f => {
                if (f.fieldOption.primary) {
                    return
                }
                args[f.propertyName] = t[f.propertyName]
            })
            return this.updateAll(where, args)
        } else {
            return this.insert(t)
        }
    }

    /**
     * 
     * @param where null表示删除全部
     */
    async delete(where: Where)
    async delete<T>(obj: T)
    async delete(whereOrObj) {
        if (typeof whereOrObj == "string" || whereOrObj instanceof WhereOpt || whereOrObj == null) {
            this.db.delete(this.tableName, whereOrObj)
        } else {
            this.db.deleteByPrimaryKey(this._tableName, whereOrObj)
        }
    }

}