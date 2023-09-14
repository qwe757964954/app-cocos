import * as orm from "bos/framework/orm/exports";

/**
DROP TABLE IF EXISTS `Relation`
DROP TABLE IF EXISTS `KVTable`
DROP TABLE IF EXISTS `ApplyMutualFollow`
DROP TABLE IF EXISTS `Mask`
 */



@orm.Table({ name: "Relation" })
export class IRelation extends orm.Entity {

    // 用户id
    @orm.FieldNumber({unique:true,primary:true})
    userID: number


    // 用户id
    @orm.FieldNumber()
    follow: number

    // 用户id
    @orm.FieldNumber()
    followAt: number

    // 用户id
    @orm.FieldNumber()
    fans: number

    // 拉黑标志位
    @orm.FieldNumber()
    fansAt: number


    // 拉黑时间
    @orm.FieldNumber()
    black: number

    // 用户id
    @orm.FieldNumber()
    blackAt: number


    // 被拉黑标志位
    @orm.FieldNumber()
    blacked: number

    // 被拉黑时间
    @orm.FieldNumber()
    blackedAt: number

    isFriend(): boolean {
        return this.followAt > 0 && this.fansAt > 0
    }
}

@orm.Table({ name: "KVTable" })
export class KVTable extends orm.Entity {
    @orm.FieldString({ primary: true })
    key: string

    @orm.FieldString()
    value: string
}

@orm.Table({ name: "ApplyMutualFollow" })
export class ApplyMutualFollow extends orm.IEntity {
    @orm.FieldString({ unique: true })
    applyID: string

    @orm.FieldNumber()
    fromUid: number

    @orm.FieldNumber()
    toUid: number

    @orm.FieldNumber()
    createdAt: number

    @orm.FieldNumber()
    status: number

    @orm.FieldString()
    desc: string
}


@orm.Table({ name: "Mask" })
export class Mask extends orm.IEntity {
    @orm.FieldString({ unique: true })
    userID: number

    @orm.FieldNumber()
    createdAt: number

    @orm.FieldNumber()
    updatedAt: number

    @orm.FieldString()
    alias: string

    @orm.FieldJson()
    phones: string[]

    @orm.FieldJson()
    labels: string[]

    @orm.FieldString()
    desc: string

    @orm.FieldString()
    extra: string

    @orm.FieldNumber()
    scene: number
}