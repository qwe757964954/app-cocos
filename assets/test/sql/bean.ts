import * as orm from "bos/framework/orm/exports";

@orm.Table({ name: "t_user_3" })
export class User extends orm.Entity {

    @orm.FieldString({
        primary: true,
        unique: true,
        notNull: true,
    })
    name: string

    @orm.FieldNumber()
    age: number

    @orm.FieldJson()
    info: any

    @orm.FieldBoolean()
    rich: boolean

    @orm.FieldNumber()
    money: number

    @orm.FieldCustom({
        decode(valueFromDB) {
            if (valueFromDB == null || valueFromDB == "") {
                return new Date(0)
            }
            let t = parseInt(valueFromDB)
            return new Date(t)
        },
        encode(value) {
            if (value == null) {
                return "0"
            }
            return (value as Date).getTime().toString()
        },
    })
    mydata: Date

    constructor(name?: string, age?: number) {
        super()
        this.name = name
        this.age = age
    }
}


@orm.Table({ name: "test2" })
export class Test2 extends orm.Entity {
    @orm.FieldString()
    name: string
}

@orm.Table({ name: "test3" })
export class Test3 extends orm.Entity {
    @orm.FieldString({ primary: true })
    id: string

    constructor(id: string) {
        super()
        this.id = id
    }
}

@orm.Table({ name: "test4" })
export class Test4 extends orm.IEntity {
    @orm.FieldString()
    name: string
}
