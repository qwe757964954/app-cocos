type Args = { [k: string]: string | number | string[] | number[] }

export type SimpleWhere = string

export type Where = SimpleWhere | WhereOpt

export class WhereOpt {

    private and: boolean
    private args: Args
    private empty = false

    constructor(and: boolean, args: Args) {
        this.and = and
        this.args = args
    }

    static Empty() {
        let w = new WhereOpt(false, null)
        w.empty = true
        return w
    }

    private encode(value): string {
        return typeof (value) == "string" ? `'${value}'` : value.toString()
    }


    buildSentence(): string {
        if (this.empty) {
            return null
        }
        let strs: string[] = []
        for (let k in this.args) {
            let v = this.args[k]
            let s = ""
            if (k.endsWith("__gt")) {
                k = k.substring(0, k.length - 4)
                s = k + " > " + this.encode(v)
            } else if (k.endsWith("__lt")) {
                k = k.substring(0, k.length - 4)
                s = k + " < " + this.encode(v)
            } else if (k.endsWith("__ge")) {
                k = k.substring(0, k.length - 4)
                s = k + " >= " + this.encode(v)
            } else if (k.endsWith("__le")) {
                k = k.substring(0, k.length - 4)
                s = k + " <= " + this.encode(v)
            } else if (k.endsWith("__not")) {
                k = k.substring(0, k.length - 5)
                s = k + " != " + this.encode(v)
            } else if (k.endsWith("__in")) {
                k = k.substring(0, k.length - 4)
                let values = (v as any[]).map(v => this.encode(v)).join(",")
                s = k + " in " + " ( " + values + " ) "
            }
            else if (k.endsWith("__notin")) {
                k = k.substring(0, k.length - 7)
                let values = (v as any[]).map(v => this.encode(v)).join(",")
                s = k + " not in " + " ( " + values + " ) "
            } else {
                s = k + " = " + this.encode(v)
            }
            strs.push(s)
        }
        let joiner = this.and ? " and " : " or "
        let sentence = " ( " + strs.join(joiner) + " ) "
        return sentence
    }
}

/**
 * 构造一个 where 查询条件，使用and连接
 * @param args 
 * @returns 
 */
export function and(args: Args) {
    return new WhereOpt(true, args)
}

/**
 * 构造一个 where 查询条件，使用or连接
 * @param args 
 * @returns 
 */
export function or(args: Args) {
    return new WhereOpt(false, args)
}

export let where = { and, or }
