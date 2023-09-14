import { IMessageKey, MessageKey } from "idl/mp/common/social.im";
import { ChatType } from "./config/define";
import { Session } from "./core/Session";
import { IM } from "./IM";
import { App } from "app/App";

let id_ = 0;
export class Util {
	static async genSessionTempName(session: Session) {
        let message = session.message;
        let userList = await IM.getInstance().listGroupUser(message.groupID);
        let nicks = [];
        for (let i = 0; i < userList.length; i++) {
            if (nicks.length >= 3) {
                break;
            }
            let user = userList[i];
            if (user) {
                let u = await App.userMgr.getUserByID(user.userID).finish();
                if (u) {
                    nicks.push(u.nickname);
                }
            }
        }
        if (nicks.length > 0) {
            return nicks.join("、");
        }
		return "";
	}

    static msgIDToMsgKey(msgID: string): IMessageKey {
        const t = msgID.split("-");
        const msgKey = {
            timestamp: t[0],
            fromID: t[1],
            random: t[2]
        };
       return MessageKey.create(msgKey) as any
    }
    static allocateID(): number {
        id_++;
        return id_;
    }
    static formatSessionID(fromID: number, toID: number, chatType?: ChatType): string {
        chatType = chatType || ChatType.Single;

        let to = toID;
        let from = fromID;
        let sessionID = "";
        if (chatType === ChatType.Single || chatType === ChatType.Official) {
            // 单聊需要保证小ID在前面
            if (fromID < toID) {
                from = fromID;
                to = toID;
            } else {
                from = toID;
                to = fromID;
            }
            sessionID = `s${from}to${to}`;
        } else if (chatType === ChatType.Group) {
            sessionID = `g${toID}`;
        } else if (chatType === ChatType.Channel) {
            sessionID = `c${toID}`;
        } else {
            sessionID = `q${chatType}${toID}`;
        }
        return sessionID;
    }

    static msgKeyToMsgID(msgKey: IMessageKey): string {
        return `${msgKey.timestamp}-${msgKey.fromID}-${msgKey.random}`;
    }

    static getSortKey(): string {
        return Date.now().toString() + Util.allocateID();
    }

    static genLocalMessageID(): string {
        return "9" + Math.floor(Date.now()).toString() + Util.allocateID();
    }

    static createDefaultSession(): Session {
        let session = new Session();
        session.msgNum = 0
        session.bgPic = ""
        session.extra = ""
        session.topRank = 0
        session.isDND = false
        session.isBlack = false
        session.isSave = false
        session.showNick = false
        session.name = ""
        session.sortKey = Util.getSortKey();
        session.status = 0;

        return session;
    }
}