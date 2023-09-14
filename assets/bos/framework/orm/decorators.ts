import { ORM_TABLE_ID } from "./consts";

export class TableData {

    clz: Function
    tableOption: TableOption
    fields: ClassField[] = []
    private fieldsMap: { [fieldName: string]: ClassField } = {}

    constructor(ctor: Function) {
        this.clz = ctor
    }

    get tableID(): number {
        return this.clz[ORM_TABLE_ID]
    }

    check() {
        let found = false
        this.fields.forEach(f => {
            if (f.fieldOption.type == null) {
                throw new Error(`必须有type: ${f.propertyName}`)
            }
            if (f.fieldOption.primary) {
                if (found) {
                    throw new Error("不允许有多个主键")
                } else {
                    found = true
                }
            }
            if (f.fieldOption.primary) {
                if (f.fieldOption.type != "number" && f.fieldOption.type != "string") {
                    throw new Error("主建只能是number/string")
                }
                if (f.fieldOption.type != "number" && f.fieldOption.autoIncrement) {
                    throw new Error("只有number主键可以自增长")
                }
            }
        })
        if (!found) {
            let pk = ClassField.DefaultPrimaryKey()
            this.fields.push(pk)
        }
    }

    findFieldByFieldName(fieldName: string) {
        let f = this.fieldsMap[fieldName]
        if (f) {
            return f
        }
        f = this.fields.find(v => v.fieldOption.name == fieldName)
        this.fieldsMap[fieldName] = f
        return f
    }

    findFieldByPropertyName(propertyName: string) {
        let f = this.fieldsMap["_p_" + propertyName]
        if (f) {
            return f
        }
        f = this.fields.find(v => v.propertyName == propertyName)
        this.fieldsMap["_p_" + propertyName]
        return f
    }

    findPrimaryKey() {
        let pk = this.fields.find(v => v.fieldOption.primary)
        return pk
    }

    createSql(tableName: string) {
        if (tableName == null || tableName == "") {
            tableName = this.tableOption.name
        }
        this.check()
        let sql = "create table if not exists " + tableName
        sql = sql + "( "
        sql = sql + this.fields.map(v => {
            let s = v.fieldOption.name
            if (v.fieldOption.type == "boolean") {
                s = s + " integer "
            } else if (v.fieldOption.type == "number" && v.fieldOption.primary) {
                s = s + " integer "
            } else if (v.fieldOption.type == "number") {
                s = s + " real "
            } else {
                s = s + " text "
            }
            if (v.fieldOption.primary) {
                s = s + " primary key "
                if (v.fieldOption.autoIncrement) {
                    s = s + " autoincrement "
                }
            }
            if (v.fieldOption.unique) {
                s = s + " unique "
            }
            if (v.fieldOption.notNull) {
                s = s + " not null "
            }
            return s
        }).join(", ")
        sql = sql + ")"
        // Log.d(sql)
        return sql
    }

    /**
     * 把数据库查出来的数据，转换为 T[]
     * @param results  格式如: [{name:"zzp", age:18}, ...]
     * @returns 
     */
    parse<T>(results: any[]): T[] {
        if (results == null) {
            return []
        }
        let list: T[] = []
        results.forEach(r => {
            let t: T = new (this.clz as any)()
            for (let k in r) {
                let v = r[k]
                let field = this.findFieldByFieldName(k)
                if (field) {
                    t[field.propertyName] = field.decode(v)
                }
            }
            list.push(t)
        })
        return list
    }
}

interface TableOption {
    name?: string
    extra?: any
}

export interface CustomFieldType {
    /**
     * 将此值转换为存到数据库里的类型
     * @param value 
     */
    encode(value): string
    /**
     * 将数据库里的值转成自己在类型
     * @param valueFromDB 
     */
    decode(valueFromDB: string): any
}

type FieldType = "string" | "number" | "json" | "boolean" | CustomFieldType

interface FieldOption {
    name?: string
    type?: FieldType
    primary?: boolean
    autoIncrement?: boolean
    unique?: boolean
    notNull?: boolean
    /**
     * 此字段是自定义数据
     */
    extra?: any
}

type Convertor = {
    encode: (value) => string,
    decode: (value: string) => any,
}

const convertors: { [type: string]: Convertor } = {
    "string": {
        decode(value) {
            return value != null ? value.toString() : ""
        },
        encode(value) {
            if (value == null) {
                return "null"
            } else {
                return `'${value.toString()}'`
            }
        },
    },
    "number": {
        decode(value) {
            return parseFloat(value) || 0
        },
        encode(value) {
            return value != null ? value.toString() : "0"
        },
    },
    "json": {
        encode(value) {
            let s = value != null ? JSON.stringify(value) : ""
            return `'${s}'`
        },
        decode(value) {
            if (value == null || value == "") {
                return null
            }
            let j = null
            try {
                j = JSON.parse(value)
            } catch (e) {
                console.log("json.parse", e)
            }
            return j
        },
    },
    "boolean": {
        decode(value) {
            return value == "1"
        },
        encode(value) {
            return value ? "1" : "0"
        },
    }
}

export class ClassField {

    propertyName: string
    fieldOption: FieldOption

    static DefaultPrimaryKey() {
        return new ClassField("id", {
            type: "number",
            autoIncrement: true,
            name: "id",
            primary: true,
            unique: true
        })
    }

    constructor(propertyName: string, fieldOption?: FieldOption) {
        this.propertyName = propertyName
        this.fieldOption = fieldOption || {}
    }

    encode(value): string {
        if (typeof this.fieldOption.type == "string") {
            return convertors[this.fieldOption.type].encode(value)
        } else {
            return this.fieldOption.type.encode(value)
        }
    }

    decode(value): any {
        if (typeof this.fieldOption.type == "string") {
            return convertors[this.fieldOption.type].decode(value)
        } else {
            return this.fieldOption.type.decode(value)
        }
    }
}

let tables: { [id: number]: TableData } = {}

let _id = 0

function obtainTableData(ctor: Function): TableData {
    let id = (ctor as any)[ORM_TABLE_ID]
    if (id == null) {
        id = ++_id
        Object.defineProperty(ctor, ORM_TABLE_ID, { value: id })
    }
    let data = tables[id]
    if (data == null) {
        data = new TableData(ctor)
        tables[id] = data
    }
    return data
}

function obtainField(obj, propertyName: string) {
    let td = obtainTableData(obj.constructor)
    let f = td.findFieldByPropertyName(propertyName)
    if (!f) {
        f = new ClassField(propertyName)
        td.fields.push(f)
    }
    return f
}

function mergeFieldOption(dst: FieldOption, src: FieldOption) {
    for (let key in src) {
        let value = src[key]
        if (value != null) {
            dst[key] = value
        }
    }
}

export function Table(opt?: TableOption) {
    return function (clz: Function) {
        let data = obtainTableData(clz)
        data.clz = clz
        data.tableOption = opt || {}
    }
}

function Field(opt: FieldOption) {
    return function (obj, name) {
        if (opt.name == null) {
            opt.name = name
        }
        let f = obtainField(obj, name)
        mergeFieldOption(f.fieldOption, opt)
    }
}

export function FieldString(opt?: FieldOption) {
    if (!opt) {
        opt = { type: "string" }
    } else {
        opt.type = "string"
    }
    return Field(opt)
}

export function FieldJson(opt?: FieldOption) {
    if (!opt) {
        opt = { type: "json" }
    } else {
        opt.type = "json"
    }
    return Field(opt)
}

export function FieldNumber(opt?: FieldOption) {
    if (!opt) {
        opt = { type: "number" }
    } else {
        opt.type = "number"
    }
    return Field(opt)
}

export function FieldBoolean(opt?: FieldOption) {
    if (!opt) {
        opt = { type: "boolean" }
    } else {
        opt.type = "boolean"
    }
    return Field(opt)
}

export function FieldCustom(type: CustomFieldType, opt?: FieldOption) {
    if (!opt) {
        opt = { type: type }
    } else {
        opt.type = type
    }
    return Field(opt)
}

// export function FieldPrimaryKey() {
//     return function (obj, name) {
//         obtainField(obj, name).fieldOption.primary = true
//     }
// }

// export function FieldAutoIncrement() {
//     return function (obj, name) {
//         obtainField(obj, name).fieldOption.autoIncrement = true
//     }
// }

// export function FieldUnique() {
//     return function (obj, name) {
//         obtainField(obj, name).fieldOption.unique = true
//     }
// }

// export function FieldNotNull() {
//     return function (obj, name) {
//         obtainField(obj, name).fieldOption.notNull = true
//     }
// }


export function findTableData(ctor: Object | Function): TableData {
    if (ctor == null) {
        throw new Error("orm findTableData传入参数为空")
    }
    if (typeof ctor != "function") {
        ctor = Object.getPrototypeOf(ctor).constructor
    }
    for (let id in tables) {
        let t = tables[id]
        if (t.clz == ctor) {
            return t
        }
    }
}

export function setRowid(obj: any, rowid: number) {
    let td = findTableData(Object.getPrototypeOf(obj).constructor)
    let f = td.findPrimaryKey()
    if (f && f.fieldOption.primary && f.fieldOption.type == "number") {
        obj[f.propertyName] = rowid
    }
}