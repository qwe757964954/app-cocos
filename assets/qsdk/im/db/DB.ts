import * as orm from "bos/framework/orm/exports";
import { Session } from "../core/Session";
import { Message } from "../core/Message";
import { ApplyJoinGroup, GroupUser, GroupUserHash, KVTable, Meeting, ServerSeq } from "./Model";
import { MessageStatus, MessageType, SysCMD } from "../config/define";
import { Log, TimeUtil } from "bos/exports";
import { IApplyJoinGroup } from "idl/mpff/social/im.v2";
import { Void } from "idl/base/base";
const Version: string = "1.0"

export type TSessionTable = orm.TableConnection<Session>
export type TServerSeqTable = orm.TableConnection<ServerSeq>

export class DB {

    private db: orm.DB
    private sessionTable: TSessionTable;
    private serverSeqTable: TServerSeqTable;

    private KVTable: orm.TableConnection<KVTable>;
    private meetingTable: orm.TableConnection<Meeting>;
    private applyJoinGroupTable: orm.TableConnection<ApplyJoinGroup>;
    private groupUserHashTable: orm.TableConnection<GroupUserHash>;
    private groupUserTable: orm.TableConnection<GroupUser>;

    protected messageTables: Map<string, orm.TableConnection<Message>> = null!;

    private userID: number = 0

    getSessionTable(): TSessionTable {
        return this.sessionTable
    }

    getMessageTable(sessionID: string): orm.TableConnection<Message> {
        let messageTable = this.messageTables.get(sessionID)
        if (messageTable == null) {
            messageTable = this.db.register(Message, sessionID)
            this.messageTables.set(sessionID, messageTable)
        }
        return messageTable
    }

    constructor() {
        this.messageTables = new Map<string, orm.TableConnection<Message>>()
    }

    public init(userID: number) {
        this.userID = userID
        if (this.db) {
            this.db.close()
        }
        this.messageTables.clear()
        this.db = new orm.DB(AppConfig.appID + "_" + userID.toString() + "_IM_" + Version)
        this.db.register(Session)
        this.sessionTable = this.db.table(Session)

        this.db.register(ServerSeq)
        this.serverSeqTable = this.db.table(ServerSeq)

        this.db.register(KVTable)
        this.KVTable = this.db.table(KVTable)

        this.db.register(Meeting)
        this.meetingTable = this.db.table(Meeting)

        this.db.register(ApplyJoinGroup)
        this.applyJoinGroupTable = this.db.table(ApplyJoinGroup)

        this.db.register(GroupUserHash)
        this.groupUserHashTable = this.db.table(GroupUserHash)

        this.db.register(GroupUser)
        this.groupUserTable = this.db.table(GroupUser)
    }

    async getKV(key: string): Promise<KVTable | null> {
        let kv = await this.KVTable.select().where(orm.where.and({ key: key })).first()
        if (kv && kv.result) {
            return kv.result
        }
        return null
    }

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

    get dbName() {
        return this.db && this.db.name
    }

    public async getLastSyncSeq(): Promise<ServerSeq> {
        let ret = await this.serverSeqTable.select().first()
        if (ret && ret.result) {
            this.serverSeqTable.bindObject(ret.result)
            return ret.result
        } else {
            let seq = new ServerSeq()
            seq.bat = 0
            seq.seq = 0
            let r = await this.serverSeqTable.insert(seq)
            this.serverSeqTable.bindObject(r.result)
            return r.result
        }
    }

    async updateMessage(msg: Message) {
        return this.getMessageTable(msg.sessionID).update(msg)
    }

    // 本地数据，异步插入
    async insertLocalMessage(msg: Message) {
        return this.getMessageTable(msg.sessionID).insert(msg)
    }

    // 服务器数据 快速插入，非异步
    insertServerMessage(msg: Message) {
        let clientSeq = msg.clientSeq || 0
        msg.clientSeq = 0 // 服务器数据过来 入库的clientSeq都应该为0
        this.getMessageTable(msg.sessionID).insert(msg)
        msg.clientSeq = clientSeq // 还原clientSeq. 这里是为了列表查询的时候找到本地插入的数据
    }

    async insertSession(session: Session) {
        return this.getSessionTable().insert(session)
    }
    async updateSession(session: Session) {
        return this.getSessionTable().update(session)
    }

    async loadSessionList(): Promise<Array<Session>> {
        let ret = await this.getSessionTable().select().all()
        let sessionList = new Array<Session>()
        let hideSessionMap = new Map<string, Session>()
        if (ret && ret.list) {
            for (let index = 0; index < ret.list.length; index++) {
                const session = ret.list[index];
                session.extraToObj()
                let MessageTable = this.getMessageTable(session.sessionID)
                let m = await MessageTable.select().where(orm.where.and({ msgID: session.msgID })).first()
                if (m && m.result) {
                    this.decodeMessageFromDB(m.result)
                    session.message = m.result
                    if (session.message.status != MessageStatus.NoShow) {
                        sessionList.push(session)
                    } else {
                        hideSessionMap.set(session.sessionID, session)
                    }
                } else {
                    // this.getSessionTable().delete(session)
                }
            }
        }
        return sessionList
    }

    // Decode data loaded from the database
    decodeMessageFromDB(msg: Message) {
        if (msg.type >= MessageType.Quote && msg.type <= MessageType.Card && msg.content !== "") {
            msg.content = JSON.parse(msg.content);
        }

        if (msg.type === MessageType.Custom) {
            msg.content = JSON.parse(msg.content);
        }

        if (msg.entity && typeof msg.entity === "string" && msg.entity !== "") {
            msg.entity = JSON.parse(msg.entity);
        } else {
            msg.entity = {}
        }
        // if (msg.extra && typeof msg.entity === "string" && msg.entity !== "") {
        //     msg.extra = "";
        // }

        if (msg.replyMarkup && typeof msg.replyMarkup === "string" && msg.replyMarkup !== "") {
            msg.replyMarkup = JSON.parse(msg.replyMarkup);
        } else {
            msg.replyMarkup = {};
        }

        if (msg.type === MessageType.Sys && msg.content !== "") {
            const content = JSON.parse(msg.content);
            msg.content = content;
        }
    }

    revokedMessage(message: Message) {
        const MessageTable = this.getMessageTable(message.sessionID);
        if (MessageTable) {
            Log.w("revokedMessage", message)
            let m = MessageTable.select().where(orm.where.and({ msgID: message.content.msgID })).first().then((r) => {
                if (r && r.result) {
                    r.result.status = MessageStatus.Revoked;
                    Log.w("revokedMessage result", r.result)
                    MessageTable.update(r.result);
                }
            })
        }
    }

    deletePreSendMessage(message: Message) {
        const MessageTable = this.getMessageTable(message.sessionID);
        if (MessageTable) {
            MessageTable.delete(orm.where.and({ clientSeq: message.clientSeq }))
        }
    }

    async queryMessage(req: { offset?: number; limit: number; sessionID: string; }) {
        const MessageTable = this.getMessageTable(req.sessionID);
        req.offset = req.offset || 0
        if (MessageTable) {
            let ret = await MessageTable.select().where('status < 2001').limit(req.limit).offset(req.offset).orderByDesc("id").all()
            if (ret && ret.list) {
                for (let index = 0; index < ret.list.length; index++) {
                    const message = ret.list[index];
                    this.decodeMessageFromDB(message)
                }
            }
            return ret.list
        }
    }

    async queryAllMessage(req: { sessionID: string, simpleWhere: string }) {
        const MessageTable = this.getMessageTable(req.sessionID);
        req.simpleWhere = req.simpleWhere || ''
        if (MessageTable) {
            let ret = await MessageTable.select().where(req.simpleWhere).all()
            if (ret && ret.list) {
                for (let index = 0; index < ret.list.length; index++) {
                    const message = ret.list[index];
                    this.decodeMessageFromDB(message)
                }
            }
            return ret.list
        }
    }

    async queryGroupApplyList(req: { sessionID: string }) {
        const MessageTable = this.getMessageTable(req.sessionID);
        if (MessageTable) {
            let ret = await MessageTable.select().where('type = 101').orderByDesc("id").all()
            let groupApplyList: Message[] = []
            if (ret && ret.list) {
                for (let index = 0; index < ret.list.length; index++) {
                    let message = ret.list[index];
                    this.decodeMessageFromDB(message)
                    if (message.sysCMD == SysCMD.InviteGroupUser) {
                        groupApplyList.push(message)
                    }
                }
            }
            return groupApplyList
        }
    }

    async saveApplyJoinGroupToDB(list: IApplyJoinGroup[]): Promise<number> {
        const promise1 = new Promise<number>((resolve, reject) => {
            let count = list.length - 1
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                this.applyJoinGroupTable.select().where(orm.where.and({ applyID: element.groupID })).first().then((r) => {
                    let apply = new ApplyJoinGroup()
                    apply.applyID = element.applyID
                    apply.groupID = element.groupID
                    apply.applyUserID = element.applyUserID
                    apply.expiredAt = element.expiredAt
                    apply.result = element.result
                    apply.createdAt = TimeUtil.getTime()
                    if (r && r.result) {
                        this.applyJoinGroupTable.update(apply)
                    } else {
                        this.applyJoinGroupTable.insert(apply)
                    }
                    count--
                    if (count <= 0) {
                        resolve(0)
                    }
                })
            }
            if (count <= 0) {
                resolve(1)
            }
        });
        return promise1
    }

    async getAllApplyJoinGroupList() {
        let ret = await this.applyJoinGroupTable.select().all();
        if (ret && ret.list) {
            return ret.list
        }
    }

    async saveGroupUser(gUser: GroupUser, isInsert: boolean) {
        if (isInsert) {
            return this.groupUserTable.insert(gUser)
        } else {
            return this.groupUserTable.update(gUser)
        }
    }

    async queryGroupUser(gUser: GroupUser) {
        let ret = await this.groupUserTable.select().where(orm.where.and({ groupID: gUser.groupID, userID: gUser.userID })).first()
        return ret.result
    }


    async queryAllGroupUser(groupID: number) {
        let ret = await this.groupUserTable.select().where(orm.where.and({ groupID: groupID })).all()
        return ret.list
    }

    async queryAllGroupUserHash() {
        let ret = await this.groupUserHashTable.select().all()
        return ret.list
    }

    deleteGroupUserHash(groupID: number) {
        this.groupUserHashTable.delete(orm.where.and({ groupID: groupID }))
    }


    async queryGroupUserHash(groupUserHash: GroupUserHash) {
        let ret = await this.groupUserHashTable.select().where(orm.where.and({ groupID: groupUserHash.groupID })).first()
        return ret.result
    }

    saveGroupUserHash(groupUserHash: GroupUserHash, isInsert: boolean) {
        if (isInsert == false) {
            this.groupUserHashTable.update(groupUserHash)
        } else {
            this.groupUserHashTable.insert(groupUserHash)
        }
    }

    deleteGroupUser(groupUser: GroupUser) {
        this.groupUserTable.delete(orm.where.and({ groupID: groupUser.groupID, userID: groupUser.userID }))
    }

    deleteMessage(message: any) {
        let MessageTable = this.getMessageTable(message.sessionID);
        if (MessageTable) {
            MessageTable.delete(orm.where.and({ msgID: message.msgID }))
        }
    }

    deleteSession(session: Session) {
        let SessionTable = this.getSessionTable()
        let MessageTable = this.getMessageTable(session.sessionID);

        if (MessageTable) {
            MessageTable.dropTable()
        }

        if (SessionTable) {
            SessionTable.delete(orm.where.and({ sessionID: session.sessionID }))
        }
    }


}