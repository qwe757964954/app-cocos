import { SelectMultiResult, SelectSingleResult } from "./db";
import { SimpleWhere, Where, WhereOpt } from "./where";

export type FindFunc<T> = (where: Where, limit: string, order: string) => Promise<SelectMultiResult<T>>

export class Select<T> {

    private findFunc: FindFunc<T>

    private _where: WhereOpt | SimpleWhere
    private _orderBy: string
    private _offset: number = null
    private _limit: number = null

    constructor(findFunc: FindFunc<T>) {
        this.findFunc = findFunc
    }

    where(where: WhereOpt | SimpleWhere) {
        this._where = where
        return this
    }

    orderByAsc(colName: string) {
        this._orderBy = ` ${colName} asc `
        return this
    }

    orderByDesc(colName: string) {
        this._orderBy = ` ${colName} desc `
        return this
    }

    offset(offset: number) {
        this._offset = offset
        return this
    }

    limit(limit: number) {
        this._limit = limit
        return this
    }

    /**
     * 只查询一条数据。  此操作等价于 limit(1).all()。
     * 
     * 结果也会受到 offset(xx) 的影响
     * @returns 
     */
    async first(): Promise<SelectSingleResult<T>> {
        this._limit = 1
        let limitString: string
        if (this._offset != null) {
            limitString = this._offset.toString() + ", 1"
        } else {
            limitString = "1"
        }
        let result = await this.findFunc(this._where, limitString, this._orderBy)
        let rtn: SelectSingleResult<T> = {
            success: result.success,
            result: result.list && result.list[0] as T,
        }
        return rtn
    }

    async all(): Promise<SelectMultiResult<T>> {
        let limitString: string = null
        if (this._offset != null && this._limit != null) {
            limitString = `${this._offset}, ${this._limit}`
        } else if (this._limit != null) {
            limitString = this._limit.toString()
        }
        return this.findFunc(this._where, limitString, this._orderBy)
    }
}