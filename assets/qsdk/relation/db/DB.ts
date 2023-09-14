import * as orm from "bos/framework/orm/exports";
import { IRelation as IRelation, KVTable, ApplyMutualFollow, Mask } from "./Model";
import { Log } from "bos/exports";
import { IApplyMutualFollow, IUserMark } from "idl/mpff/social/relation.v1";

export type TRelation = orm.TableConnection<IRelation>
export type TKVTable = orm.TableConnection<KVTable>
export type TApplyMutualFollow = orm.TableConnection<ApplyMutualFollow>
export type TMask = orm.TableConnection<Mask>

const Version: string = "1.0"



export class DB {

    private db: orm.DB
    private RelationTable: TRelation;
    private KVTable: TKVTable;
    private ApplyMutualFollowTable: TApplyMutualFollow;
    private MaskTable: TMask;

    getRelationTable(): TRelation {
        return this.RelationTable
    }

    constructor() {

    }

    public init(userID: number) {
        this.db = new orm.DB(userID.toString() + "_Relation_" + Version)

        this.db.register(IRelation)
        this.db.register(KVTable)
        this.db.register(ApplyMutualFollow,)
        this.db.register(Mask)

        this.RelationTable = this.db.table(IRelation)
        this.KVTable = this.db.table(KVTable)
        this.ApplyMutualFollowTable = this.db.table(ApplyMutualFollow)
        this.MaskTable = this.db.table(Mask)
    }

    async test() {
        // let u = new RelationTable()
        // u.userID = 123
        // this.tRelation.insert(u).then(r => {
        //     Log.i(r)
        // })
    }

    async getKV(key: string): Promise<KVTable | null> {
        let kv = await this.KVTable.select().where(orm.where.and({ key: key })).first()
        if (kv && kv.result) {
            return kv.result
        }
        return null
    }

    // setKV(key: string|KVTable, value?: string) {
    //     if (typeof key === 'string') {
    //         const data = (typeof value === 'object') ? JSON.stringify(value) : value;
    //         let kv = new KVTable()
    //         kv.key = key
    //         kv.value = data
    //         this.tKVTable.insert(kv).then(r => {
    //             Log.w("insert kv", r)
    //         })
    //     } else  {
    //         this.tKVTable.update(key).then(r => {
    //             Log.w("update kv", r)
    //         })
    //     }
    // }

    setKV(kv: | KVTable, isInsert: boolean = false) {
        if (isInsert == true) {
            this.KVTable.insert(kv).then(r => {
                Log.w("insert kv", r)
            })
        } else {
            this.KVTable.update(kv).then(r => {
                Log.w("update kv", r, kv)
            })
        }
    }

    deleteRelationTable() {
        this.RelationTable.dropTable()
        this.db.register(IRelation)
        this.RelationTable = this.db.table(IRelation)
    }

    async saveApplyMutualFollowToDB(applyMutualFollow: IApplyMutualFollow) {
        let apply = await this.ApplyMutualFollowTable.select().where(orm.where.and({ applyID: applyMutualFollow.applyID })).first()
        if (apply && apply.result) {
            let result = apply.result
            result.applyID = applyMutualFollow.applyID
            result.fromUid = applyMutualFollow.fromUid
            result.toUid = applyMutualFollow.toUid
            result.status = applyMutualFollow.status
            result.createdAt = applyMutualFollow.createdAt
            result.desc = applyMutualFollow.desc
            await this.ApplyMutualFollowTable.update(result)
            return
        } else {
            let apply = new ApplyMutualFollow()
            apply.applyID = applyMutualFollow.applyID
            apply.fromUid = applyMutualFollow.fromUid
            apply.toUid = applyMutualFollow.toUid
            apply.status = applyMutualFollow.status
            apply.createdAt = applyMutualFollow.createdAt
            apply.desc = applyMutualFollow.desc

            // this.ApplyMutualFollowTable.save().where
            await this.ApplyMutualFollowTable.insert(apply)
        }
    }

    async saveMarkToDB(userMark: IUserMark) {
        let apply = await this.MaskTable.select().where(orm.where.and({ userID: userMark.userID })).first()
        let applyORM = new Mask()
        let insert = false
        if (apply && apply.result) {
            applyORM = apply.result
            insert = false
        } else {
            insert = true
        }
        applyORM.userID = userMark.userID
        applyORM.labels = userMark.mark.labels
        applyORM.createdAt = userMark.mark.createdAt
        applyORM.desc = userMark.mark.desc
        applyORM.updatedAt = userMark.mark.updatedAt
        applyORM.phones = userMark.mark.phones
        applyORM.extra = userMark.mark.extra
        applyORM.scene = userMark.mark.scene
        applyORM.alias = userMark.mark.alias
        if (insert == true) {
            await this.MaskTable.insert(applyORM)
        } else {
            await this.MaskTable.update(applyORM)
        }
    }


    async batchQueryRelation(uidList: number[]): Promise<IRelation[]> {
        let ret = await this.RelationTable.select().where(orm.where.and({ userID__in: uidList })).all()
        if (ret && ret.list) {
            return ret.list
        }
        return null
    }

    async getApplyMutualFollowList() {
        let ret = await this.ApplyMutualFollowTable.select().where("status < 5 ").all()
        return ret.list
    }

    async getMutualFollowList(): Promise<IRelation[]> {
        let ret = await this.RelationTable.select().where("follow = 1 and fans = 1").all()
        if (ret && ret.list) {
            return ret.list
        }
        return null

    }

    async getBlackList() {
        let ret = await this.RelationTable.select().where("black = 1").all()
        if (ret && ret.list) {
            return ret.list
        }
        return null
    }
}
