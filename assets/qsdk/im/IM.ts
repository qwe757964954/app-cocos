import { Base64, EmptyClass, EventTargetExtends, ImageUtil, Log, StringUtil, TimeUtil } from "bos/exports";
import { assert } from "cc";
import { MessageNotifySeq } from "idl/mp/common/social.im.notify";
import { GetGroupReq, IAddGroupUserReq, IChangeGroupOwnerReq, ICreateGroupReq, ICreateJoinGroupInviteReq, IDisbandGroupReq, IGetConversationSettingReq, IGetGroupExtraInfoReq, IGetGroupReq, IItemQueryReq, IListChannelReq, IListGroupUserReq, IListMessageReq, IM as IMService, IRemoveGroupUserReq, ISaveConversationSettingReq, ISaveGroupReq, ISendMessageReq, ISetGroupAnnouncementReq, ISetGroupUserReq, ISyncApplyJoinGroupReq } from "idl/mpff/social/im.v2";
import { OSS } from "qsdk/exports";
import { IMEvent, MessageStatus, MessageType, SendMessageOption } from "./config/define";
import { Message } from "./core/Message";
import { MessageEAD } from "./core/MessageEAD";
import { Processor } from "./core/Processor";
import { Session } from "./core/Session";
import { DB } from "./db/DB";
import { GroupUser, KVTable, ServerSeq } from "./db/Model";
import { ChatSearch } from "./fts/ChatSearch";
import { GroupMgr } from "./group/GroupMgr";
import { TaskQueue } from "bos/exports";
import { ItemQueryReq } from "idl/mpff/social/callback/im.v2";
import { Util } from "./Util";


/**
await cce.SceneFacadeManager.queryNodeDump("a72Txc2G9D1oEoyK7IX4xY")
Drop Table if exists Session;
 */


export class IM extends EventTargetExtends(EmptyClass) {

    isUserSyncFinish: boolean;
    appid: string;
    private uid: number;
    private pageSize: number = 50;
    private lastNotifySrvSeq: MessageNotifySeq = null

    private db: DB = null;

    processor: Processor = null;
    groupMgr: GroupMgr = null;

    private sessionList: Array<Session> = null;

    private syncingMessage: boolean = false;

    private lastSyncSeq: ServerSeq = null


    private readonly kApplyJoinGroupKVSync: string = "applyJoinGroupKVSync";
    private applyJoinGroupKVSync: KVTable = null;
    private applyJoinGroupKVSyncSeq: number = 0;

    static instance: IM = null
    private isApplySyncing: boolean;
    private isNotifyApplySync: boolean = false;


    private taskGroup: Map<string, TaskQueue> = new Map()

    static getInstance() {
        if (this.instance == null) {
            this.instance = new IM()
        }
        return this.instance
    }

    constructor() {
        super()
        this.processor = new Processor(this)
        this.groupMgr = new GroupMgr(this)
        IMService.on("NotifyMessage", (resp: any) => {
            Log.w("NotifyMessage", resp)
            this.onRecvNotifyMessage(resp)
        })
        Log.w("IMService constructor")
    }

    getTaskQueue(key: string): TaskQueue {
        let taskQueue = this.taskGroup.get(key)
        if (!taskQueue) {
            taskQueue = new TaskQueue()
            taskQueue.start()
            this.taskGroup.set(key, taskQueue)
        }
        return taskQueue
    }

    getSessionList(): Array<Session> {
        return this.sessionList
    }

    getDB(): DB {
        return this.db
    }

    get myUid(): number {
        return this.uid
    }

    getSession(sessionID: string): Session | null {
        for (let index = 0; index < this.sessionList.length; index++) {
            const session = this.sessionList[index];
            if (session.sessionID == sessionID) {
                return session
            }
        }
        return null
    }

    onRecvNotifyMessage(resp: any): void {
        console.log("onRecvNotifyMessage----->", resp)
        if (resp) {
            if (resp.cmd == 2 && resp.message && resp.message.isTmp) { // 收到临时消息 直接派发
                if (!this.db) { // IM未初始化完成，直接返回
                    return;
                }
                let msg = MessageEAD.decodeMessage(resp.message, this)
                this.emit(IMEvent.ON_RECEIVE_MESSAGE, msg)
                return;
            }
            if (resp.cmd == 3) { // 收到群申请消息
                if (this.isApplySyncing) {
                    return;
                }
                this.isNotifyApplySync = true
                this.incrSyncApplyJoinGroup()
                return;
            }
            if (resp.cmd == 1) {
                // lastNotifySrvSeq必须比服务器下发的小才进行
                if (!this.lastNotifySrvSeq) {
                    this.lastNotifySrvSeq = resp.srvSeq;
                } else {
                    if (this.lastNotifySrvSeq.bat <= resp.srvSeq.bat && this.lastNotifySrvSeq.seq < resp.srvSeq.seq) {
                        this.lastNotifySrvSeq = resp.srvSeq;
                    }
                }
            }
            if (this.syncingMessage == false) {
                this.incrSyncMessage()
            }
        }
    }

    /**
     * 初始化IM
     */
    public init(uid: number, appid?: string) {
        if (this.uid && this.uid == uid) {
            return
        }
        this.uid = uid
        this.initDB(uid)
        ChatSearch.init(uid)
        this.groupMgr.reset()
    }

    async initDB(uid: number) {
        if (this.db == null) {
            this.db = new DB()
        }
        this.db.init(uid)

        this.sessionList = null
        this.lastSyncSeq = null
        await this.loadLocalSessionList()
        this.startSyncMessage()
        this.startSyncApplyJoinGroup()
    }

    async loadLocalSessionList() {
        if (this.sessionList == null) {
            let sessionList = await this.db.loadSessionList()
            this.sessionList = sessionList
            this.processor.sortSession()
        }
        return this.sessionList
    }
    // 开始同步消息
    async startSyncMessage() {
        this.isUserSyncFinish = false
        if (this.lastSyncSeq == null) {
            this.lastSyncSeq = await this.db.getLastSyncSeq()
        }
        await this.incrSyncMessage()
        this.isUserSyncFinish = true
        await this.processor.onUserSyncFinish()
    }

    // 更新上次同步的seq
    async updateSyncSeq(message: Message) {
        this.lastSyncSeq.bat = message.bat
        this.lastSyncSeq.seq = message.seq
        this.lastSyncSeq.update()
    }

    // 增量同步消息
    async incrSyncMessage() {
        if (this.lastSyncSeq == null) {
            Log.w("还没开启消息同步...")
            return
        }
        if (this.syncingMessage) {
            Log.w("正在同步消息中...")
            return
        }
        this.syncingMessage = true
        while (true) {
            let req: IListMessageReq = {
                pageSize: this.pageSize,
                lastSeq: {
                    bat: this.lastSyncSeq.bat, seq: this.lastSyncSeq.seq,
                }
            }
            let { err, resp } = await IMService.ListMessage(req)
            if (!err) {
                let messages = resp.list
                for (let i = 0; i < messages.length; i++) {
                    let message = messages[i]
                    // 编解码消息
                    let msg = MessageEAD.decodeMessage(message, this)
                    await this.processor.processRecvMessage(msg)
                    this.updateSyncSeq(msg)
                    if (!msg.ignoreEmit() && this.isUserSyncFinish == true) {
                        this.emit(IMEvent.ON_RECEIVE_MESSAGE, msg)
                    }
                }

                if (this.isUserSyncFinish == false) {
                    let flag = messages.length < this.pageSize
                    this.emit(IMEvent.ON_SYNC_PAGE_MESSAGE_FINISH, flag)
                }

                if (messages.length < this.pageSize) {
                    if (this.lastNotifySrvSeq) {
                        if (this.lastSyncSeq.bat <= this.lastNotifySrvSeq.bat
                            && this.lastSyncSeq.seq < this.lastNotifySrvSeq.seq) {
                            continue
                        }
                    }
                    break
                }
            } else {
                Log.e("同步消息失败", err)
                break
            }
        }
        this.syncingMessage = false
    }

    public async sendMessage(message: Message, opt?: SendMessageOption) {
        message.fromID = this.uid
        if (message.chatType == 4) {
            message.isTmp = true
        }
        if (message.isTmp == true) {
            return this.sendMessageWithEncode(message)
        } else {
            let msg = await this.processor.preSendMessage(message)
            if (msg) {
                this.emit(IMEvent.ON_PREPARE_SEND_MESSAGE, msg);
            }
            let { err, resp } = await this.sendMessageWithEncode(msg)
            if (err) {
                msg.status = MessageStatus.Failure
                this.db.updateMessage(msg)
                this.emit(IMEvent.ON_RECEIVE_MESSAGE, msg)
            }
            return { err, resp }
        }
    }

    private async sendMessageWithEncode(message: Message) {
        assert(message.type != undefined, "type is undefined")
        assert(message.toID != undefined, "toID is undefined")
        let content: any = MessageEAD.encodeMessage(message)
        let req: ISendMessageReq = {
            message: {
                toID: message.toID,
                fromID: this.uid,
                fromType: message.fromType,
                chatType: message.chatType,
                type: message.type,
                content: content,
                isTmp: message.isTmp,
                clientSeq: message.clientSeq,
                replyMarkup: message.replyMarkup,
                entity: message.entity,
                createdAt: TimeUtil.getTime(),
            }
        }
        return IMService.SendMessage(req)
    }

    async sendImage(message: Message, opt: SendMessageOption) {
        message.type = MessageType.Image
        return await this.sendFile(message, opt)
    }

    async queryMessage(req: { offset?: number, limit: number, sessionID: string }) {
        return await this.db.queryMessage(req)
    }

    async queryGroupApplyList(req: { sessionID: string }) {
        return await this.db.queryGroupApplyList(req)
    }


    // 请帮我生成以下接口注释文档
    async uploadFile(message: Message, opt: SendMessageOption) {
    }

    async downloadFile() {

    }
    // 请帮我生成以下接口注释文档
    async sendFile(message: Message, opt: SendMessageOption) {
        let file = opt.buffer
        let ret = await OSS.getInstance().uploadFile(file, { prefix: "im_" })
        if (ret.err) {
            return { err: -1 }
        }
        // let info = { size: file.size, suffix: "." + file.name.split(".").pop(), name: file.name }
        let info = {}
        if (opt.info) {
            for (let key in opt.info) {
                let value = opt.info[key]
                if (value != null && value != undefined) {
                    info[key] = value
                }
            }
        }

        let extra = null
        if (message.extra) {
            extra = message.extra
        }
        let content: any = { url: ret.url, info: info }
        if (message.extra) {
            content.extra = message.extra
        }
        message.content = content
        Log.w("上传文件成功", message, JSON.stringify(message.content))
        this.sendMessage(message)
        return { err: null }
    }

    /**
    创建群组
    @async
    @function createGroup
    @param {ICreateGroupReq} req - 包含创建群组所需参数的请求对象
    @returns {Promise} Promise 表示异步操作结果，包含新创建的群组信息
    */
    async createGroup(req: ICreateGroupReq) {
        return IMService.CreateGroup(req);
    }

    async addGroupUser(req: IAddGroupUserReq) {
        return IMService.AddGroupUser(req)
    }

    async removeGroupUser(req: IRemoveGroupUserReq) {
        return IMService.RemoveGroupUser(req)
    }

    /**
    Saves conversation settings.
    @async
    @param {ISaveConversationSettingReq} req - Request object containing details of the conversation settings to be saved.
    @returns {*} Result of saving conversation settings.
     */
    async saveConversationSetting(req: ISaveConversationSettingReq) {
        return IMService.SaveConversationSetting(req);
    }

    async getConversationSetting(req: IGetConversationSettingReq) {
        return IMService.GetConversationSetting(req);
    }

    async getGroup(req: IGetGroupReq) {
        return IMService.GetGroup(req);
    }

    /**
    Revokes the specified message.
    @param {Message} message - The message to revoke.
    */
    revokedMessage(message: Message) {
        let msg = message.clone()
        msg.type = MessageType.Revoked
        msg.clientSeq = 0
        msg.content = { msgID: message.msgID }
        Log.w("撤回消息", msg)
        this.sendMessageWithEncode(msg)
    }

    /**
    将当前对话置顶，使用户可以更方便地找到
    @async
    @param {Session} session - The session object representing the current conversation.
    @returns {Promise<void>} async function pinConversation(session) { // implementation goes here }
    */
    async pinConversation(session: Session) {
        let req: ISaveConversationSettingReq = {
            setting: {
                sessionID: session.sessionID,
                topRank: session.topRank || 1,
            }
        }
        let { err, resp } = await this.saveConversationSetting(req)
        if (!err) {
            this.db.updateSession(session)
            this.processor.sessionToTop(session)
        }
        return { err, resp }
    }

    /**
    设置会话接收消息的选项
    @async
    @function
    @param {Session} session - 会话对象
    @param {boolean} [isDND=true] - 是否勿扰模式，默认为 true
    */
    async setConversationRecvMessageOpt(session: Session, isDND: boolean = true) {
        session.isDND = isDND
        let req: ISaveConversationSettingReq = {
            setting: {
                sessionID: session.sessionID,
                isDND: session.isDND,
            }
        }
        let { err, resp } = await this.saveConversationSetting(req)
        if (!err) {
            this.db.updateSession(session)
        }
        return { err, resp }
    }

    /**
    列出channel列表
    @param {IListChannelReq} req - The request object containing any optional parameters.
    */
    async listChannel(req: IListChannelReq) {
        return IMService.ListChannel(req)
    }

    /**
     * 获取群申请信息
     */
    async getApplyJoinGroupList() {
        return this.db.getAllApplyJoinGroupList()
    }

    /**
    生成申请加入的key,用于扫描二维码加入群聊
    @param {ICreateJoinGroupInviteReq} req - The request object containing any optional parameters.
    */
    async createJoinGroupInvite(req: ICreateJoinGroupInviteReq) {
        return IMService.CreateJoinGroupInvite(req)
    }

    async startSyncApplyJoinGroup() {
        if (this.db) {
            let syncID = await this.db.getKV(this.kApplyJoinGroupKVSync)
            if (syncID) {
                this.applyJoinGroupKVSync = syncID
                this.applyJoinGroupKVSyncSeq = Number(syncID.value)
            }
        }
        this.incrSyncApplyJoinGroup()
    }

    async incrSyncApplyJoinGroup() {
        this.isApplySyncing = true
        let req: ISyncApplyJoinGroupReq = {
            seq: this.applyJoinGroupKVSyncSeq,
        }
        let { err, resp } = await this.syncApplyJoinGroup(req)
        if (!err) {
            let list = resp.list
            console.log("同步群聊申请结束", resp)
            if (this.isNotifyApplySync) {
                this.isNotifyApplySync = false
                for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    this.emit(IMEvent.ON_NOTIFY_GROUP_APPLY_CHANGE, element)
                }
            }
            let ret = await this.db.saveApplyJoinGroupToDB(list)
            if (list.length > 0) {
                let last = list[list.length - 1]
                this.applyJoinGroupKVSyncSeq = last.seq
                this.updateApplyJoinGroupKVSyncSyncID()
            }
            this.emit(IMEvent.ON_NOTIFY_GROUP_APPLY_SYNC_FINISH, ret)
        }
        this.isApplySyncing = false
    }

    //同步互关日志
    async syncApplyJoinGroup(req: ISyncApplyJoinGroupReq) {
        return IMService.SyncApplyJoinGroup(req)
    }

    updateApplyJoinGroupKVSyncSyncID() {
        if (this.applyJoinGroupKVSyncSeq > 0) {
            if (this.applyJoinGroupKVSync) {
                this.applyJoinGroupKVSync.value = this.applyJoinGroupKVSyncSeq.toString()
                this.db.setKV(this.applyJoinGroupKVSync)
            } else {
                this.applyJoinGroupKVSync = new KVTable()
                this.applyJoinGroupKVSync.key = this.kApplyJoinGroupKVSync
                this.applyJoinGroupKVSync.value = this.applyJoinGroupKVSyncSeq.toString()
                this.db.setKV(this.applyJoinGroupKVSync, true)
            }
        }
    }

    /**
     * 获取群成员，优先从内存获取，如果没有则查询数据库，如果查不到，最后从服务器获取
     */
    async listGroupUser(groupID: number) {
        let taskQueue = this.getTaskQueue(groupID.toString())
        let ret: GroupUser[] = await taskQueue.push({
            target: this,
            executor: async () => {
                return this.listGroupUserByQueue(groupID)
            }
        }).finish();
        return ret
    }

    async listGroupUserByQueue(groupID: number) {
        let req: IListGroupUserReq = {
            groupID: groupID,
        }
        let ret = await this.groupMgr.listGroupUser(groupID)
        if (ret.list && ret.list.length > 0) {
            return ret.list
        }
        if (ret.hash && ret.hash != "") {
            req.hash = { value: ret.hash }
        }
        let { err, resp } = await IMService.ListGroupUser(req)
        if (!err) {
            this.groupMgr.updateGroupUsersByServer(req.groupID, resp.userList, resp.hash)
            return this.groupMgr.getGroupUsers(req.groupID)
        }
        return []
    }

    deleteLocalMessage(message: any) {
        this.db.deleteMessage(message)
    }


    async modifyGroupName(req: ISaveGroupReq) {
        return this.saveGroup(req)
    }

    // 保存群信息
    // 必须传groupID
    async saveGroup(req: ISaveGroupReq) {
        return IMService.SaveGroup(req)
    }

    /**
        local req:ISetGroupUserReq = {
            groupID :groupID,
            alias:{ value :name },
            userIDList:{uid}
        }
     * @param req 
     * @returns 
     */
    async setGroupUser(req: ISetGroupUserReq) {
        return IMService.SetGroupUser(req)
    }


    async setGroupAnnouncement(req: ISetGroupAnnouncementReq) {
        return IMService.SetGroupAnnouncement(req)
    }

    async getGroupExtraInfo(req: IGetGroupExtraInfoReq) {
        return IMService.GetGroupExtraInfo(req)
    }

    async disbandGroup(req: IDisbandGroupReq) {
        return IMService.DisbandGroup(req)
    }

    async changeGroupOwner(req: IChangeGroupOwnerReq) {
        // console.log("IM  ChangeGroupOwner--->")
        return IMService.ChangeGroupOwner(req)
    }

    async itemQuery(req: { msgID: string, queryData: string, queryURL: string }) {
        // console.log("ItemQuery:Req", req.queryData)
        
        let tempReq: IItemQueryReq = {
            messageKey: Util.msgIDToMsgKey(req.msgID),
            queryData: Base64.decodeToUint8Array(req.queryData),
            queryURL: req.queryURL
        }
        // console.log("ItemQuery:Req", tempReq)
        return IMService.ItemQuery(tempReq)
    }


}   