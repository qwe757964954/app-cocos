// Message Encoding and Decoding
// import { Buffer } from "buffer";
import { Base64, Log, Net, StringUtil } from "bos/exports";
import { Message } from "../core/Message"
import { Util } from "../Util";
import { IM } from "../IM";
import { SysCMDConfig, MessageType, MessageStatus } from "../config/define";
import { MessageAudio, MessageCard, MessageFile, MessageImage, MessageList, MessageMeetingSignaling, MessageQuote, MessageRevoked, MessageSys, MessageVideo } from "idl/mp/common/social.im";
import { MergerMessage, IMessage } from "idl/mpff/social/im.v2";



export class MessageEAD {
    static encodeMessage(message: Message): Uint8Array {
        let proto = undefined
        if (message.type == MessageType.Text) {
            return StringUtil.stringToUint8Array(message.content)
        } else if (message.type == MessageType.Image) {
            proto = MessageImage
        } else if (message.type == MessageType.Quote) {
            message.content.msgKey = Util.msgIDToMsgKey(message.content.msgID)
            message.msgID = null
            proto = MessageQuote
        } else if (message.type == MessageType.Revoked) {
            proto = MessageRevoked
            message.content.msgKey = Util.msgIDToMsgKey(message.content.msgID)
            message.msgID = null
        } else if (message.type == MessageType.File) {
            proto = MessageFile
        } else if (message.type == MessageType.Video) {
            proto = MessageVideo
        } else if (message.type == MessageType.Voice) {
            proto = MessageAudio
        } else if (message.type == MessageType.MeetingSignaling) {
            proto = MessageMeetingSignaling
        } else if (message.type == MessageType.List) {
            proto = MessageList
        } else if (message.type == MessageType.Merger) {
            proto = MergerMessage
        } else if (message.type == MessageType.Card) {
            proto = MessageCard
        } else if (message.type == MessageType.Custom) {
            return StringUtil.stringToUint8Array(JSON.stringify(message.content))
        }
        if (proto != undefined) {
            let ret = proto.encode(message.content).finish()
            return ret
        }
    }

    // 解码消息，主要是系统自定义消息
    static decodeMessage(message: IMessage, im: IM): Message {
        let success = true;
        let msg: Message = new Message();
        msg.bat = message.srvSeq.bat
        msg.seq = message.srvSeq.seq
        msg.chatType = message.chatType
        msg.clientSeq = message.clientSeq
        msg.content = message.content
        msg.extra = message.extra
        msg.entity = message.entity
        msg.createdAt = message.createdAt
        msg.fromID = message.fromID
        msg.fromType = message.fromType
        msg.replyMarkup = message.replyMarkup
        msg.toID = message.toID
        msg.type = message.type
        msg.status = 0

        // console.warn(message,"im decodeMessage")


        msg.extra = StringUtil.byteBufferToUTF8String(message.extra)

        msg.msgID = Util.msgKeyToMsgID(message.msgKey)
        msg.sessionID = Util.formatSessionID(msg.fromID, msg.toID, msg.chatType)

        if (msg.content == undefined) {
            msg.content = ""
            msg.type = MessageType.Text
            return msg
        }

        if (msg.type == MessageType.Text) {
            msg.content = StringUtil.byteBufferToUTF8String(message.content)
        } else if (msg.type == MessageType.Sys) {
            const sysCMDContent = MessageSys.decode(message.content);
            const sysContentProto = SysCMDConfig[sysCMDContent.cmd];
            if (sysContentProto) {
                let content = sysContentProto.decode(sysCMDContent.body);
                const sysMsgContent = {
                    cmd: sysCMDContent.cmd,
                    body: content,
                };
                msg.content = sysMsgContent;
            } else {
                msg.content = { cmd: sysCMDContent.cmd, body: Base64.encode(message.content), _unDecodePB: 1 };
            }
        } else if (msg.type == MessageType.Quote) {
            let content = MessageQuote.decode(message.content);
            msg.content = {};
            msg.content.content = content.content;
            msg.content.msgID = Util.msgKeyToMsgID(content.msgKey);

        } else if (msg.type === MessageType.Revoked) {
            let content = MessageRevoked.decode(message.content);
            msg.content = {};
            msg.content.msgID = Util.msgKeyToMsgID(content.msgKey);
            msg.status = MessageStatus.NoShow;

            // msg.content = MessageRevoked.decode(message.content);
            // msg.content.msgID = Util.msgKeyToMsgID(msg.content.msgKey);
            // Log.i("msg->",JSON.stringify(msg.content),msg.content)
            // msg.status = MessageStatus.NoShow;

        } else if (msg.type === MessageType.File) {
            msg.content = MessageFile.decode(message.content);
            msg.content.extra = StringUtil.byteBufferToUTF8String(msg.content.extra)

        } else if (msg.type === MessageType.Image) {
            msg.content = MessageImage.decode(message.content);
            msg.content.extra = StringUtil.byteBufferToUTF8String(msg.content.extra)

        } else if (msg.type === MessageType.Voice) {
            msg.content = MessageAudio.decode(message.content);
            msg.content.extra = StringUtil.byteBufferToUTF8String(msg.content.extra)

        } else if (msg.type === MessageType.Video) {
            msg.content = MessageVideo.decode(message.content);
            msg.content.extra = StringUtil.byteBufferToUTF8String(msg.content.extra)

        } else if (msg.type === MessageType.Meeting) {
            let content = StringUtil.byteBufferToUTF8String(message.content)
            msg.content = JSON.parse(content)

        } else if (msg.type === MessageType.Card) {
            msg.content = MessageCard.decode(message.content)

            
        } else if (msg.type === MessageType.MeetingSignaling) {
            msg.content = MessageMeetingSignaling.decode(message.content);

        }
        else if (msg.type === MessageType.List) {
            msg.content = MessageList.decode(message.content);
            for (let value of msg.content.items) {
                value.queryData = Base64.encode(value.queryData);
            }

        } else if (msg.type === MessageType.Merger) {
            msg.content = MergerMessage.decode(message.content);

        } else if (msg.type === MessageType.Custom) {
            let content = StringUtil.byteBufferToUTF8String(message.content)
            msg.content = JSON.parse(content)
            Log.i("Custom", msg.content)
        }
        return msg
    }
}