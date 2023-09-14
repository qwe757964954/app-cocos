import * as orm from "bos/framework/orm/exports";
import { IM } from "../IM";
import { MessageType, MessageStatus, ChatType, SysCMD } from "../config/define";
import { Log } from "bos/exports";
import { IMessageEntity } from "idl/mp/common/social.im";

@orm.Table({
    name: "message",
    extra: {
        fts_extra: {
            content: "content",
            time: "createdAt",
            filter: function (data: Message) {
                return data.type == 0
            }
        }
    }
})
export class Message {
    /**
        聊天类型
    */
    @orm.FieldNumber()
    chatType: number

    /**
        发送者ID
    */
    @orm.FieldNumber()
    fromID: number

    /**
        发送者类型
    */
    @orm.FieldNumber()
    fromType: number

    /**
        目标用户ID
    */
    @orm.FieldNumber()
    toID: number

    /**
        消息类型
    */
    @orm.FieldNumber()
    type: number
    /**
        消息内容,除了文本消息是字符串，其他类型都为结构体(table)
    */
    @orm.FieldCustom(
        {
            encode(value) {
                const data = (typeof value === 'object') ? JSON.stringify(value) : value;
                return data;
            },
            decode(valueFromDB) {
                return valueFromDB;
            },
        },
        {
            extra: { fts: true }
        }
    )
    content: any

    /**
        人员
    */
    @orm.FieldJson()
    entity: IMessageEntity

    /**
        会话id
    */
    @orm.FieldString()
    sessionID: string
    /**
        消息ID
    */
    @orm.FieldString({ unique: true })
    msgID: string

    /**
        创建时间
    */
    @orm.FieldNumber()
    createdAt: number

    /**
        客户端发送序号
    */
    @orm.FieldNumber()
    clientSeq: number
    /**
        消息状态
    */
    @orm.FieldNumber()
    status: number

    @orm.FieldNumber()
    seq: number

    @orm.FieldNumber()
    bat: number

    /**
        消息扩展信息
    */
    @orm.FieldJson()
    extra: any

    /**
        回复标记
    */
    @orm.FieldJson()
    replyMarkup: any

    isTmp: boolean = false


    isMySelf(): boolean {
        return this.fromID == IM.getInstance().myUid;
    }

    otherID(): number {
        if (this.chatType == ChatType.Group) {
            return this.toID;
        }
        if (this.fromID == IM.getInstance().myUid) {
            return this.toID;
        }
        return this.fromID;
    }

    isGroup(): boolean {
        return this.chatType == ChatType.Group;
    }

    isSingle(): boolean {
        return this.chatType == ChatType.Single;
    }

    isOfficial(): boolean {
        return this.chatType == ChatType.Official;
    }

    isChannel(): boolean {
        return this.chatType == ChatType.Channel;
    }

    ignoreEmit(): boolean {
        if (this.type == MessageType.MeetingSignaling) {
            return true;
        }
        if (this.type == MessageType.Sys) {
            if (this.sysCMD == SysCMD.GroupUserInfoChange) {
                return true;
            }
        }
        return false;
    }

    async queryQuoteMessage(): Promise<Message> {
        if (this.type != MessageType.Quote) {
            return null;
        }

        if (this["quoteMessage"]) {
            return this["quoteMessage"];
        }

        let DB = await IM.getInstance().getDB();
        if (DB) {
            let MessageTable = DB.getMessageTable(this.sessionID);
            let r = await MessageTable.select().where(orm.where.and({ msgID: this.content.msgID })).first()
            if (r && r.result) {
                let quoteMessage = r.result
                DB.decodeMessageFromDB(quoteMessage)
                Object.defineProperty(this, "quoteMessage", quoteMessage);
                return quoteMessage;
            }
        }
        return null;
    }

    clone(): Message {
        let msg = new Message();
        msg.bat = this.bat;
        msg.chatType = this.chatType;
        msg.clientSeq = this.clientSeq;
        msg.content = this.content;
        msg.createdAt = this.createdAt;
        msg.entity = this.entity;
        msg.extra = this.extra;
        msg.fromID = this.fromID;
        msg.fromType = this.fromType;
        msg.msgID = this.msgID;
        msg.replyMarkup = this.replyMarkup;
        msg.seq = this.seq;
        msg.sessionID = this.sessionID;
        msg.status = this.status;
        msg.toID = this.toID;
        msg.type = this.type;
        return msg;
    }

    get sysCMD(): number {
        if (this.type != MessageType.Sys) {
            return 0;
        }
        return this.content.cmd;
    }
    get sysContent(): any {
        if (this.type != MessageType.Sys) {
            return null;
        }
        return this.content.body;
    }

    get groupID(): number {
        if (this.isGroup()) {
            return this.toID;
        }
        return -1;
    }
}
