import * as orm from "bos/framework/orm/exports";
import { IM } from "../IM";
import { MessageType, MessageStatus, ChatType } from "../config/define";
import { Message } from "./Message";
import { App } from "app/App";
import { Util } from "../Util";
import { sys } from "cc";
import { eventSystem } from "bos/exports";

@orm.Table({ name: "session" })
export class Session {

	@orm.FieldString({ unique: true })
	sessionID: string

	/**
		消息ID
	*/
	@orm.FieldString()
	msgID: string

	// 客户端排序专用
	@orm.FieldString()
	sortKey: string

	/**
	   消息数量
	*/
	@orm.FieldNumber()
	msgNum: number

	/**
	   会话状态
	*/
	@orm.FieldNumber()
	status: number

	/**
	   会话图标
	*/
	@orm.FieldString()
	bgPic: string

	/**
	   会话名称
	*/
	@orm.FieldString({
		extra: { fts: true }
	})
	name: string

	/**
	   置顶权重
	*/
	@orm.FieldNumber()
	topRank: number

	/**
	   是否免打扰
	*/
	@orm.FieldBoolean()
	isDND: boolean

	@orm.FieldBoolean()
	isBlack: boolean

	@orm.FieldBoolean()
	isSave: boolean

	@orm.FieldBoolean()
	showNick: boolean

	@orm.FieldJson()
	extra: any

	message: Message;



	getMessageContent() {
		if (this.message) {
			return this.message.content;
		}
	}

	async getTempName(params: { isShortName?: boolean, forceUpdate?: boolean } = { isShortName: false, forceUpdate: false }): Promise<string> {
		let isShortName = params.isShortName;
		let forceUpdate = params.forceUpdate;
		if (this.message) {
			if (this.message.isGroup()) {
				let userList = await IM.getInstance().listGroupUser(this.message.groupID);

				if (this.extra?.groupMark && this.extra?.groupMark != "") {
					return `${this.extra?.groupMark}(${userList.length})`
				}

				if (isShortName) {
					return `群聊(${userList.length})`
				} else {

					let name = this.extra?.groupTempName;
					if (forceUpdate == false && name && name != "" && typeof name == "string") {
						return name;
					} else {
						name = await Util.genSessionTempName(this);
						if (name != "") {
							this.extra = this.extra || {};
							if (this.extra.groupTempName == null) {
								this.extra.groupTempName = name;
								IM.getInstance().getDB().updateSession(this);
							} else if (this.extra.groupTempName != name) {
								this.extra.groupTempName = name;
								IM.getInstance().getDB().updateSession(this);
							}

						}

						return name
					}
				}
			} else if (this.message.isSingle()) {
				let user = await App.userMgr.getUserByID(this.message.otherID()).finish();
				if (user && user.uid == this.message.otherID()) {
					return user.nickname;
				}
			}else if(this.message.isOfficial()){
				return this.name || "公众号"
			}
		}
		return "未知"
	}

	updateGroupMark(mark: string) {
		if (this.message) {
			if (this.message.isGroup()) {
				if (this.extra.groupMark == null) {
					this.extra.groupMark = mark;
					IM.getInstance().getDB().updateSession(this)
				} else if (this.extra.groupMark != mark) {
					this.extra.groupMark = mark;
					IM.getInstance().getDB().updateSession(this);
				}
			}
		}
	}

	getGroupMark() {
		if (this.message) {
			if (this.message.isGroup()) {
				return this.extra?.groupMark
			}
		}
		return ""
	}

	extraToObj() {
		if (this.extra === "") {
			this.extra = {}
		}
	}

	// 是否有人@我
	hasAtMe(): boolean {
		if (this.message?.isGroup()) {
			return this.extra?.isAtMe
		}
		return false
	}

	hasGroupAnnouncement(): boolean {
		if (this.message?.isGroup()) {
			return this.extra?.groupAnnouncement
		}
		return false

	}

	getGroupApply(): number {
		if (this.message?.isGroup()) {
			return this.extra?.groupApply
		}
		return 0
	}

	updateAtMe(value: boolean) {
		if (this.message?.isGroup()) {
			this.extraToObj()
			this.extra.isAtMe = value
			IM.getInstance().getDB().updateSession(this);
		}
	}

	updateAnnounce(value: boolean) {
		if (this.message?.isGroup()) {
			this.extraToObj()
			this.extra.groupAnnouncement = value
			IM.getInstance().getDB().updateSession(this);
		}
	}

	updateGroupApply(value: number) {
		if (this.message?.isGroup()) {
			this.extraToObj()
			this.extra.groupApply = value
			IM.getInstance().getDB().updateSession(this);
		}
	}

}