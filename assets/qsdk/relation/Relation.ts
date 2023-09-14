
import { DB } from "./db/DB";
// import { Relation as RelationTable } from "./db/Model";
import { EmptyClass, EventTargetExtends, Log, Net, ObjectUtil, TimeUtil } from "bos/exports";
import { KVTable, IRelation as RelationTable, ApplyMutualFollow as ApplyMutualFollowTable } from "./db/Model";
import { RelateType, RelationEvent } from "./define";
import {
    SyncID, Relation as RelationService, ApplyMutualFollow, SyncChangeReq,
    Relate, SyncRelate, PageListReq, SyncApplyMutualFollowReq, AcceptMutualFollowReq,
    RejectMutualFollowReq, DelApplyMutualFollowReq, SyncMarkReq, UserMark, SaveMarkReq,
    UnFollowReq, BlackReq, ApplyMutualFollowReq, ISyncChangeReq, IPageListReq, IRejectMutualFollowReq, IDelApplyMutualFollowReq, IAcceptMutualFollowReq, ISaveMarkReq, ISyncApplyMutualFollowReq, ISyncMarkReq, ISyncID, IRelate, ISyncRelate, IApplyMutualFollow, IUserMark, IApplyMutualFollowReq, IUnFollowReq, IBlackReq, IUnBlackReq
} from "idl/mpff/social/relation.v1";

export class Relation extends EventTargetExtends(EmptyClass) {

    protected db: DB = null;

    private readonly kRelationSyncID: string = "RelationSyncID";
    private readonly kApplyMutualFollowSyncID: string = "ApplyMutualFollowSyncID";
    private readonly kRelationMarkSyncID: string = "RelationMarkSyncID";

    private relationKVSync: KVTable = null;
    private applyMutualFollowKVSync: KVTable = null;
    private relationMarkKVSync: KVTable = null;



    private relationSyncID: ISyncID = null;
    private applyMutualFollowSyncID: number = 0;
    private relationMarkSyncID: number = 0;



    protected relationList: Map<number, RelationTable> = null!;
    protected pageIndex = -1;
    protected syncingApply = false;
    protected isNotifyApplySync = false
    protected syncingMark = false;

    protected notifyApplySyncList: Array<IApplyMutualFollow> = []


    protected constructor() {
        super()
        RelationService.on("NotifySync", (resp: any) => {
            if (this.pageIndex == -1) {
                this.syncIncrData()
            }
        })

        RelationService.on("NotifyApplySync", (resp: any) => {
            if (this.syncingApply == false) {
                this.isNotifyApplySync = true
                this.incrSyncApplyMutualFollow()
            }
        })
    }

    /**
     * 初始化IM
     * @param params
     */
    public init(userID: number) {
        this.relationList = new Map<number, RelationTable>();
        this.initDB(userID)
    }

    initDB(userID: number) {
        if (!this.db) {
            this.db = new (DB)
            this.db.init(userID)
            this.db.test()

            this.startSyncRelation()

            this.startSyncMark()

            this.startSyncApplyMutualFollow()

            this.getMutualFollowList().then((resp) => {
                // Log.w(resp, "batchQuery11111111111")
            })
        }
    }
    async getMutualFollowList() {
        return this.db.getMutualFollowList();
    }

    async startSyncRelation() {
        if (this.db) {
            let syncID = await this.db.getKV(this.kRelationSyncID)
            if (syncID) {
                this.relationKVSync = syncID
                this.relationSyncID = JSON.parse(syncID.value);
            }
            this.syncIncrData()
        }
    }

    async syncIncrData() {
        const pageSize = 100
        let action = 0
        this.pageIndex = 1
        this.relationList.clear()
        while (true) {
            let req: ISyncChangeReq = {
                syncID: this.relationSyncID,
                pageSize: pageSize,
                page: 1,
            }
            let { err, resp } = await this.syncRelationChange(req)
            if (!err) {
                // Log.w(req, "req",resp)
                this.relationSyncID = resp.lastSyncID
                if (resp.code > 1000) {
                    if (resp.code == 3002) {
                        this.deleteRelationTable()
                        await this.fullSyncRelationData()
                        action = 0
                        break
                    } else if (resp.code == 3001) {
                        for (let v of resp.list) {
                            let data = this.relationList.get(v.uid) || new RelationTable()
                            this.modifyRelation(data, v)
                            this.relationList.set(v.uid, data)
                        }
                        if (resp.list.length >= pageSize) {
                            this.pageIndex = this.pageIndex + 1
                        } else {
                            action = 1
                            this.pageIndex = -1
                            break
                        }
                    }
                } else {
                    break
                }
            }
        }
        this.onSyncRelationDataFinish(action)
    }

    //同步数据完成
    onSyncRelationDataFinish(action: number) {
        let num = 0
        this.relationList.forEach((v, k) => {
            num = num + 1
            this.db.getRelationTable().bindObject(v)
            v.save<RelationTable>().then(() => {
                if (action == 1) {
                    this.emit(RelationEvent.ON_NOTIFY_RELATION_CHANGE, v)
                }
                num = num - 1
                if (num == 0) {
                    this.updateSyncID()
                    this.emit(RelationEvent.ON_NOTIFY_RELATION_SYNC_FINISH, action)
                    Log.w("onSyncRelationDataFinish")
                }
            })
        })
    }

    updateSyncID() {
        if (this.relationKVSync) {
            this.relationKVSync.value = JSON.stringify(this.relationSyncID)
            this.db.setKV(this.relationKVSync)
        } else {
            this.relationKVSync = new KVTable()
            this.relationKVSync.key = this.kRelationSyncID
            this.relationKVSync.value = JSON.stringify(this.relationSyncID)
            this.db.setKV(this.relationKVSync, true)
        }
    }

    deleteRelationTable() {
        if (this.db) {
            this.db.deleteRelationTable()
        }
        this.relationList = new Map<number, RelationTable>();
    }

    protected modifyRelation(localData: RelationTable, temp: IRelate | ISyncRelate) {
        localData.userID = temp.uid;
        let serverData = <Relate>temp

        // Log.i(serverData)
        // 全量数据
        if (serverData.relateAt) {
            if (serverData.relateType == RelateType.Fans) {
                localData.fans = 1;
                localData.fansAt = serverData.relateAt;
            } else if (serverData.relateType == RelateType.Follow) {
                localData.follow = 1;
                localData.followAt = serverData.relateAt;
            } else if (serverData.relateType == RelateType.Black) {
                localData.follow = 0;
                localData.black = 1;
                localData.blackAt = serverData.relateAt;
            } else if (serverData.relateType == RelateType.Blacked) {
                localData.fans = 0;
                localData.blacked = 1;
                localData.blackedAt = serverData.relateAt;
            }
            // 增量数据
        } else {
            let serverData = <SyncRelate>temp
            if (serverData.operateAt) {
                // 转换为本地操作数据 server 1 是增加 也就是本地的1 2是delete 也就是本地的0
                let localOperate = serverData.operate === 1 ? 1 : 0;

                if (serverData.relateType === RelateType.Fans) {
                    localData.fans = localOperate;
                    localData.fansAt = serverData.operateAt;
                } else if (serverData.relateType === RelateType.Follow) {
                    localData.follow = localOperate;
                    localData.followAt = serverData.operateAt;
                    if (localData.follow === 0) { //取关，删除好友
                        // this.deleteApply(serverData);
                    } else {
                        this.incrSyncMark(); // 成为好友，同步好友来源 即同步mark,需要注意:避免反复同步
                    }
                } else if (serverData.relateType === RelateType.Black) {
                    localData.follow = 0;
                    localData.black = localOperate;
                    localData.blackAt = serverData.operateAt;
                } else if (serverData.relateType === RelateType.Blacked) {
                    localData.fans = 0;
                    localData.blacked = localOperate;
                    localData.blackedAt = serverData.operateAt;
                }
            }
        }
    }


    protected async fullSyncRelationData() {
        const pageSize = 100
        this.pageIndex = 1

        while (true) {
            let { err, resp } = await this.pageList({ page: this.pageIndex, pageSize: pageSize })
            if (err) {
                this.pageIndex = -1
                break
            }
            if (this.pageIndex == -1) {
                break
            }
            for (let v of resp.list) {
                let data = this.relationList.get(v.uid) || new RelationTable()
                this.modifyRelation(data, v)
                this.relationList.set(v.uid, data)
            }
            if (resp.list.length < pageSize) {
                this.pageIndex = -1
                break
            } else {
                this.pageIndex = this.pageIndex + 1
            }
        }
        this.pageIndex = -1
        Log.i("this.relationList", this.relationList)
    }

    async syncRelationChange(req: ISyncChangeReq) {
        return await RelationService.SyncChange(req)
    }

    async pageList(req: IPageListReq) {
        return await RelationService.PageList(req)
    }


    // 同步好友数据

    async startSyncApplyMutualFollow() {
        if (this.db) {
            if (this.applyMutualFollowKVSync == null) {
                this.applyMutualFollowKVSync = await this.db.getKV(this.kApplyMutualFollowSyncID)
            }
            if (this.applyMutualFollowKVSync) {
                this.applyMutualFollowSyncID = Number(this.applyMutualFollowKVSync.value);
            }
            this.incrSyncApplyMutualFollow()
        }
    }
    async incrSyncApplyMutualFollow() {
        let pageSize = 100
        this.syncingApply = true
        this.notifyApplySyncList.length = 0
        while (true) {
            let req: ISyncApplyMutualFollowReq = {
                seq: this.applyMutualFollowSyncID,
                pageSize: pageSize,
                ver: 1,
            }
            Log.w("syncApplyMutualFollow", req)
            let { err, resp } = await this.syncApplyMutualFollow(req)
            if (!err) {
                if (resp.seq > 0) {
                    this.applyMutualFollowSyncID = resp.seq
                }
                this.saveApplyMutualFollowToDB(resp.list, () => {
                    if (resp.list.length < pageSize) {
                        let action = 0
                        if (resp.seq > 0) {
                            // 保存同步索引
                            this.updateApplyMutualFollowSyncID()
                            action = 1
                        }
                        this.emit(RelationEvent.ON_NOTIFY_APPLY_SYNC_FINISH, action)
                        Log.w("syncApplyMutualFollow finish", err, resp)
                    }
                })
                if (resp.list.length < pageSize) {
                    if (this.isNotifyApplySync) {
                        if (this.notifyApplySyncList.length > 0) {
                            this.notifyApplySyncList.forEach(element => {
                                this.emit(RelationEvent.ON_NOTIFY_APPLY_CHANGE, element)
                            });
                            this.notifyApplySyncList.length = 0
                        }
                        this.isNotifyApplySync = false
                    }
                    break
                }
            } else {
                break
            }
        }
        this.syncingApply = false
    }

    saveApplyMutualFollowToDB(list: IApplyMutualFollow[], cb: Function) {
        let num = list.length
        if (num > 0) {
            list.forEach(v => {
                if (this.isNotifyApplySync) {
                    this.notifyApplySyncList.push(v)
                }
                this.db.saveApplyMutualFollowToDB(v).then(() => {
                    num--
                    if (num == 0) {
                        cb()
                    }
                })
            })
        } else {
            cb()
        }
    }

    async syncApplyMutualFollow(req: ISyncApplyMutualFollowReq) {
        return await RelationService.SyncApplyMutualFollow(req)
    }

    updateApplyMutualFollowSyncID() {
        if (this.applyMutualFollowSyncID > 0) {
            if (this.applyMutualFollowKVSync) {
                this.applyMutualFollowKVSync.value = this.applyMutualFollowSyncID.toString()
                this.db.setKV(this.applyMutualFollowKVSync)
            } else {
                this.applyMutualFollowKVSync = new KVTable()
                this.applyMutualFollowKVSync.key = this.kApplyMutualFollowSyncID
                this.applyMutualFollowKVSync.value = this.applyMutualFollowSyncID.toString()
                this.db.setKV(this.applyMutualFollowKVSync, true)
            }
        }

    }

    // 同步备注数据

    async startSyncMark() {
        if (this.db) {
            if (this.relationMarkKVSync == null) {
                this.relationMarkKVSync = await this.db.getKV(this.kRelationMarkSyncID)
            }
            if (this.relationMarkKVSync) {
                this.relationMarkSyncID = Number(this.relationMarkKVSync.value);
            }
            this.incrSyncMark()
        }
    }

    async incrSyncMark() {
        if (this.syncingMark == true) {
            return
        }
        let pageSize = 100
        this.syncingMark = true
        while (true) {
            let seq: ISyncMarkReq = {
                seq: this.relationMarkSyncID,
                pageSize: pageSize,
            }
            let { err, resp } = await this.syncMark(seq)
            if (!err) {
                if (resp.seq > 0) {
                    this.relationMarkSyncID = resp.seq
                }
                this.saveMarkListToDB(resp.list, () => {
                    if (resp.list.length < pageSize) {
                        if (resp.seq > 0) {
                            // 保存同步索引
                            this.updateMarkSyncID()
                        }
                        Log.w("syncMark finish", resp)
                    }
                })
                if (resp.list.length < pageSize) {
                    break
                }
            } else {
                break
            }
        }
        this.syncingMark = false
    }
    updateMarkSyncID() {
        if (this.relationMarkSyncID > 0) {
            if (this.relationMarkKVSync) {
                this.relationMarkKVSync.value = this.relationMarkSyncID.toString()
                this.db.setKV(this.relationMarkKVSync)
            } else {
                this.relationMarkKVSync = new KVTable()
                this.relationMarkKVSync.key = this.kRelationMarkSyncID
                this.relationMarkKVSync.value = this.relationMarkSyncID.toString()
                this.db.setKV(this.relationMarkKVSync, true)
            }
        }
    }

    async saveMarkListToDB(list: IUserMark[], cb?: Function) {
        let num = list.length
        if (num > 0) {
            list.forEach(v => {
                this.saveMarkToDB(v).then(() => {
                    num--
                    if (num == 0) {
                        if (cb) {
                            cb()
                        }
                    }
                })
            })
        } else {
            if (cb) {
                cb()
            }

        }
    }

    async saveMarkToDB(userMark: IUserMark) {
        this.db.saveMarkToDB(userMark)
    }


    async syncMark(req: ISyncMarkReq) {
        return RelationService.SyncMark(req)
    }

    async saveMark(req: ISaveMarkReq) {
        return RelationService.SaveMark(req)
    }

    async setUserAlias(req: { userID: number, alias: string }) {
        let { err, resp } = await this.saveMark({
            userID: req.userID, mark: {
                alias: req.alias,
            }
        })
        if (!err) {
            this.saveMarkToDB({
                userID: req.userID, mark: {
                    alias: req.alias,
                }
            })
        }
    }


    // 取消关注
    async unFollow(req: IUnFollowReq) {
        return RelationService.UnFollow(req)
    }

    /*
        拉黑
    */
    async black(req: IBlackReq) {
        return RelationService.Black(req)
    }

    /*
        取消拉黑
    */
    async unBlack(req: IUnBlackReq) {
        return RelationService.UnBlack(req)
    }

    /*
        请求互相关注，类似于微信添加好友
    */
    async applyMutualFollow(req: IApplyMutualFollowReq) {
        return RelationService.ApplyMutualFollow(req)
    }


    /*
        接受互关，类似于微信同意添加好友
    */
    async acceptMutualFollow(req: IAcceptMutualFollowReq) {
        let { err, resp } = await RelationService.AcceptMutualFollow(req)
        if (!err) {
            if (resp.userMark) {
                this.saveMarkToDB(resp.userMark)
            }
        }
        return { err, resp }
    }

    /*
        拒绝互相关注，类似于拒绝添加好友
    */
    async rejectMutualFollow(req: IRejectMutualFollowReq) {
        return await RelationService.RejectMutualFollow(req)
    }

    /*
        删除互关请求日志
    */
    async delApplyMutualFollow(req: IDelApplyMutualFollowReq) {
        return await RelationService.DelApplyMutualFollow(req)
    }

    async batchQuery(uidList: number[]) {
        return await this.db.batchQueryRelation(uidList)
    }

    async query(userID: number) {
        let ret = await this.db.batchQueryRelation([userID])
        if (ret) {
            return ret[0]
        }
        return null
    }

    async getApplyMutualFollowList() {
        return await this.db.getApplyMutualFollowList()
    }


    async getBlackList() {
        return this.db.getBlackList()
    }

}