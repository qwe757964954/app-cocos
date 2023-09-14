import { Log, TimeUtil, eventSystem } from "bos/exports";
import { IM } from "../IM";
import { Util } from "../Util";
import { Message } from "./Message";
import { Session } from "./Session";
import { MessageStatus, ChatType, MessageType, SysCMD, GroupChangeInfoType, IMEvent } from "../config/define";
import { assert } from "cc";
import { IGetGroupReq } from "idl/mpff/social/im.v2";


export class Processor {

    private lastSessionIndex: number = -1
    private newSessionIndex: number = -1
    private im: IM = null

    async processRecvMessage(msg: Message) {
        await this.processMessage(msg)
        if (!msg.ignoreEmit()) {
            await this.processSession(msg)
        }
        this.im.getDB().insertServerMessage(msg)
        this.beforeEmitMessage(msg)
    }

    async processMessage(message: Message) {

        // 如果是自己发送的消息，需要先删除预发送的消息
        if (message.clientSeq > 0 && message.fromID == this.im.myUid) {
            this.im.getDB().deletePreSendMessage(message)
        }
        if (message.type == 101) {
            this.processSysMessage(message);
        }

        // 处理撤回消息
        if (message.type == MessageType.Revoked) {
            this.im.getDB().revokedMessage(message);
        }

        if (message.ignoreEmit()) {
            message.status = MessageStatus.NoShow;
        }

        // 处理meeting相关系统消息
        //   if (message.type == Define.MessageType.MeetingSignaling) {
        //     this.processMeetingSignaling(message);
        //   } else if (message.type == Define.MessageType.Meeting) {
        //     this.processMeeting(message);
        //   }

        //   this.calculateCacheSignalingTimeOut(message);
    }

    processSysMessage(message: Message): void {
        if (message.type == MessageType.Sys) {
            let isFilterMessage = false;
            const cmd = message.content.cmd;
            const content = message.content.body;
            // let cmd = message.sysCMD

            if (this.im.groupMgr) {
                this.im.groupMgr.syncGroupUserByServerMessage(message, this.im.isUserSyncFinish);
            }

            if (cmd == SysCMD.GroupChangeInfo) {
                // 群公告修改成空的消息需要过滤掉
                if (content.changeType == 2 && content.announcement && content.announcement.announcement == "") {
                    isFilterMessage = true;
                }

                if (content.changeType == 3 || content.changeType == 4) {
                    isFilterMessage = true;
                }
            }

            if (cmd == SysCMD.MessageUpdate) {
                isFilterMessage = true;
            }

            // 修改群昵称过滤
            if (cmd == SysCMD.GroupUserInfoChange) {
                const changeInfoList = content.changeInfo;
                if (changeInfoList && changeInfoList[1] && changeInfoList[1].alias) {
                    // IMLog.w("修改群昵称过滤1", message)
                    isFilterMessage = true;
                }
            }

            // 设置群成员角色和更换群主  cmd废弃
            if (cmd == SysCMD.ChangeGroupOwner || cmd == SysCMD.GroupSetRole) {
                isFilterMessage = true;
            }

            // message.isFilter = isFilterMessage
            if (isFilterMessage) {
                message.status = MessageStatus.NoShow;
            }
        }

    }



    async processSession(msg: Message) {
        this.newSessionIndex = -1
        this.lastSessionIndex = -1
        let sessionList = this.im.getSessionList()
        let lastSession = null
        for (let i = 0; i < sessionList.length; i++) {
            const v = sessionList[i];
            if (v.sessionID === msg.sessionID) {
                lastSession = sessionList.splice(i, 1)[0];
                this.lastSessionIndex = i;
                break;
            }
        }
        let session = null
        if (lastSession == null) {
            // Log.i("create session", msg)
            session = await this.createSession(msg)
        } else {
            // Log.i("updateSession session", msg)
            session = lastSession
            this.updateSession(session, msg)
        }
        let index = this.getSessionIndex(session)
        this.newSessionIndex = index
        sessionList.splice(index, 0, session);
        // Log.i("processSession 11111111111", sessionList.length, index, session)
    }

    getSessionIndex(session: Session): number {
        let sessionList = this.im.getSessionList()
        let index = sessionList.length + 1;
        for (let i = 0; i < sessionList.length; i++) {
            const v = sessionList[i];
            if (v.topRank <= session.topRank) {
                return i;
            }
        }
        return index;
    }

    updateSession(session: Session, message: Message): void {
        let sync = true;
        if (message.type === MessageType.Revoked) {
            if (message.content.msgID !== session.msgID) {
                sync = false;
            }
        }
        if (message.status === MessageStatus.NoShow) {
            sync = false;
        }
        if (sync) {
            session.msgID = message.msgID;
            session.message = message;
        }
        session.msgNum += this.getMessageNum(message);
        if (session.msgNum <= 0) {
            session.msgNum = 0;
        }
        session.sortKey = `${TimeUtil.getTimestamp()}${Util.allocateID()}`;
        session.status = 0;
        this.im.getDB().updateSession(session);
    }

    getMessageNum(message: Message): number {
        if (message.type === MessageType.Meeting && message.chatType === ChatType.Group) {
            return 0;
        }
        if (message.isMySelf()) {
            return 0;
        }

        if (message.type === 101) {
            if (message.content.cmd === SysCMD.RelateApplyAccept) {
                return 1;
            }
        } else if (message.type === MessageType.Revoked) {
            return -1;
        } else {
            return 1;
        }
        return 1;
    }


    constructor(imObject: IM) {
        this.im = imObject
    }


    async createSession(msg: Message): Promise<Session> {
        let session = Util.createDefaultSession()
        session.msgID = msg.msgID
        session.sessionID = msg.sessionID
        session.message = msg;
        // if (hideSession) {
        //     session.update();
        //     delete this.hideSessionMap[message.sessionID];
        // } else {
        //     session.save();
        // }




        if (msg.isChannel()) {
            return session;
        }

        let { err, resp } = await this.im.getConversationSetting({ sessionID: session.sessionID })
        if (!err) {
            let setting = resp.setting
            for (let key in setting) {
                let value = setting[key]
                if (value != null && value != undefined) {
                    session[key] = value
                }
            }
        }

        if (msg.isGroup()) {
            let req: IGetGroupReq = {
                groupID: msg.otherID(),
            }
            let ret = await this.im.getGroup(req)
            if (!ret.err) {
                session.name = ret.resp.group.name
            }
        }

        // console.time("insertSession" + session.sessionID)
        this.im.getDB().insertSession(session);// 不要await 会导致整体卡主
        // console.timeEnd("insertSession" + session.sessionID)
        return session;
    }

    beforeEmitMessage(message: Message) {
        let session = this.im.getSession(message.sessionID)
        if (message.type == MessageType.Sys) {
            if (message.isGroup()) {
                let content = message.content
                if (content.cmd == SysCMD.GroupChangeInfo) {
                    // fix 找到session  标记 hasmodify
                    let body = content.body
                    if (session) {
                        session.extraToObj()
                        if (body.changeType == GroupChangeInfoType.GroupChangeInfoTypeName) {
                            if (body.name != "") {
                                session.name = body.name
                                session.extra.hasModifyServerGroupName = true
                            } else {
                                session.extra.hasModifyServerGroupName = false
                            }
                        } else if (body.changeType == GroupChangeInfoType.GroupChangeInfoTypeAnnouncement) {
                            if (body.announcement && body.announcement.announcement != "") {
                                session.extra.groupAnnouncement = true
                                // 群申请提醒和公告提醒只能存在一个
                                session.extra.groupApply = 0
                            } else {
                                session.extra.groupAnnouncement = false
                            }
                        } else if (body.changeType == GroupChangeInfoType.GroupChangeInfoTypeMark) {
                            session.extra.groupMark = message.content.mark
                        }
                    }
                }

                if (content.cmd == SysCMD.InviteGroupUser) {
                    if (session) {
                        let groupApply = session.extra.groupApply || 0
                        session.extra.groupApply = groupApply + 1
                        // 群申请提醒和公告提醒只能存在一个
                        session.extra.groupAnnouncement = false
                        // Util.updateSessionExtra(session)
                    }
                }

                if (content.cmd == SysCMD.MessageUpdate) {

                }

                IM.getInstance().getDB().updateSession(session);
                this.dispatchSysMessage(message)
            }
        }
    }

    dispatchSysMessage(message: Message): void {
        if (message.sysCMD === SysCMD.GroupCreated) {
            eventSystem.emit(IMEvent.ON_CREATE_GROUP, message);
        } else if (message.sysCMD === SysCMD.AddGroupUser) {
            eventSystem.emit(IMEvent.ON_ADD_GROUP_USER, message);
        } else if (message.sysCMD === SysCMD.RemoveGroupUser) {
            eventSystem.emit(IMEvent.ON_REMOVE_GROUP_USER, message);
        } else if (message.sysCMD === SysCMD.UpdateGroupName) {
            eventSystem.emit(IMEvent.ON_GROUP_NAME_CHANGE, message);
        } else if (message.sysCMD === SysCMD.GroupChangeInfo) {
            eventSystem.emit(IMEvent.ON_GROUP_INFO_CHANGE, message);
        } else if (message.sysCMD === SysCMD.InviteGroupUser) {
            eventSystem.emit(IMEvent.ON_INVITE_GROUP_USER, message);
        }
    }


    async onUserSyncFinish() {
        if (this.im.groupMgr) {
            this.im.groupMgr.syncGroupUserByServerMessage(null, this.im.isUserSyncFinish);
        }
        Log.i("onUserSyncFinish")
    }


    async preSendMessage(message: Message) {
        const msg = message.clone();
        msg.fromID = this.im.myUid;
        assert(msg.toID != undefined, "msg.toID is empty");
        let sessionID = msg.sessionID;
        if (!sessionID) {
            sessionID = Util.formatSessionID(msg.fromID, msg.toID, msg.chatType);
            msg.sessionID = sessionID;
        }
        msg.seq = 0;
        msg.bat = 0;
        msg.msgID = Util.genLocalMessageID();
        msg.createdAt = Math.floor(Date.now() / 1000);
        msg.status = 1;
        await this.im.getDB().insertLocalMessage(msg);
        this.updatePreSendSession(msg);
        msg.clientSeq = msg["id"]
        Log.w("updateMessage", msg)
        await this.im.getDB().updateMessage(msg);
        return msg;
    }

    updatePreSendSession(message: Message) {
        let session = this.im.getSession(message.sessionID)
        if (!session) {
            session = this.addTempSession(message)
        }
        session.msgID = message.msgID
        session.message = message
        this.im.getDB().updateSession(session)
    }

    public addTempSession(message: Message): Session {
        let sessionID = Util.formatSessionID(message.fromID, message.toID, message.chatType);
        let session = this.im.getSession(sessionID)
        if (session == null) {
            session = this.createTempSession(message)
            const index: number = this.getSessionIndex(session);
            let sessionList = this.im.getSessionList()
            sessionList.splice(index, 0, session);
            this.lastSessionIndex = -1;
            this.newSessionIndex = index;
        }
        return session
    }

    createTempSession(message: Message) {
        if (!message.toID) throw new Error("必须存在 toID");
        let session = Util.createDefaultSession()

        message.fromID = this.im.myUid;
        message.type = message.type || 0;
        message.chatType = message.chatType || 0;
        message.content = message.content || "";
        message.sessionID = Util.formatSessionID(
            message.fromID, message.toID, message.chatType
        );
        message.seq = 0;
        message.bat = 0;
        message.msgID = Util.genLocalMessageID();;
        message.createdAt = Date.now();
        message.extra = "";
        message.status = MessageStatus.NoShow;

        session.msgID = message.msgID;
        session.sessionID = message.sessionID;
        session.message = message;

        // Channel聊天不创建聊天表,也不存储Session
        if (message.chatType === ChatType.Channel) {
            session.message = message;
        } else {
            this.im.getDB().insertSession(session).then((s) => {
                if (s.success) {
                    this.im.getDB().insertLocalMessage(message);
                }
            });
        }

        return session;
    }

    sessionToTop(session: Session): void {
        this.sortSession();
        // if (session.topRank > 0) {
        // } else {
        //     let sessionList = this.im.getSessionList()
        //     for (let i = 1; i < sessionList.length; i++) {
        //         const v = sessionList[i];
        //         if (v.sessionID == session.sessionID) {
        //             sessionList.splice(i, 1);
        //             break;
        //         }
        //     }
        //     // const index = this.getSessionIndex(session);
        //     // sessionList.splice(index, 0, session);
        //     sessionList.unshift(session)
        // }
    }
    sortSession(): void {
        let sessionList = this.im.getSessionList()
        sessionList.sort((a: Session, b: Session) => {
            if (a && b) {
                const a_topLevel = a.topRank + a.sortKey;
                const b_topLevel = b.topRank + b.sortKey;
                return a_topLevel >= b_topLevel ? -1 : 1;
            } else {
                return -1;
            }
        })
    }

    getSessionNewIndex() {
        return { newIndex: this.newSessionIndex, lastIndex: this.lastSessionIndex }
    }
}

