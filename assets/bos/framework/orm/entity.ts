import { CONNECTED_TABLE } from "./consts";
import { InsertResult, SaveResult, UpdateResult } from "./db";
import { findTableData } from "./decorators";
import { TableConnection } from "./table";

const DEFAULT_ERR = "数据库未打开或者table未注册"

export abstract class Entity {

    constructor() {
    }

    private getTableConnection<T>(): TableConnection<T> {
        let property = Object.getOwnPropertyDescriptor(this, CONNECTED_TABLE)
        return property && property.value
    }

    /**
     * 插入
     * @returns 
     */
    async insert<T>(): Promise<InsertResult<T>> {
        let conn = this.getTableConnection<T>()
        if (!conn) {
            return {
                success: false,
                result: this as any,
                errmsg: DEFAULT_ERR
            }
        }
        return conn.insert(this as any)
    }

    /**
     * 更新已有数据
     * @returns 
     */
    async update<T>(): Promise<UpdateResult> {
        let conn = this.getTableConnection<T>()
        if (!conn) {
            return {
                success: false,
                errmsg: DEFAULT_ERR
            }
        }
        return conn.update(this as any)
    }

    /**
     * 如果数据库已经存在，则更新，否则插入
     * @returns 
     */
    async save<T>(): Promise<SaveResult<T>> {
        let conn = this.getTableConnection<T>()
        if (!conn) {
            return {
                success: false,
                errmsg: DEFAULT_ERR,
                result: this as any
            }
        }
        let td = findTableData(this)
        let pk = td.findPrimaryKey()
        let value = this[pk.fieldOption.name]
        let findResult = await conn.select().where(`${pk.fieldOption.name} = ${pk.encode(value)}`).first()
        if (!findResult.success) {
            return {
                success: false,
                errmsg: findResult.errmsg,
                result: this as any
            }
        }
        if (findResult.result == null) {
            return conn.insert(this as any)
        }
        let r = await conn.update(this as any)
        return {
            success: r.success,
            result: this as any,
            errmsg: r.errmsg,
        }
    }

    delete<T>() {
        let conn = this.getTableConnection<T>()
        if (!conn) {
            return {
                success: false,
                errmsg: DEFAULT_ERR,
                data: this as any
            }
        }
        conn.delete<T>(this as any)
    }

}


export abstract class IEntity extends Entity {
    id: number
}   
