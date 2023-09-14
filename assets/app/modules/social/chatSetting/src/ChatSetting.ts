import { NodeUtil, eventSystem, uiMgr } from 'bos/exports';
import { _decorator, Component, Node, Label, Toggle, Prefab, Event } from 'cc';
import { Session } from 'qsdk/im/core/Session';
import { Message } from 'qsdk/im/core/Message';
import { IM } from 'qsdk/im/IM';
import { AlertParams } from 'app/modules/common/alertview/src/AlertView';
import { SocialChatSettingEvent } from '../../common/src/Define';
const { ccclass, property } = _decorator;

@ccclass('ChatSetting')
export class ChatSetting extends Component {

    @property({ type: Label })
    title: Label | null = null

    @property({ type: Node })
    createGroup: Node | null = null

    @property({ type: Toggle })
    doNotDisturb: Toggle | null = null

    @property({ type: Toggle })
    topping: Toggle | null = null

    @property({ type: Toggle })
    tip: Toggle | null = null

    @property({ type: Prefab })
    popupWithButton: Prefab | null = null

    private sessionID: string = ""
    private session: Session | null = null

    start() {
        eventSystem.on(SocialChatSettingEvent.ON_GROUP_INFO_CHANGE, this.onGroupChangeInfo, this)
        //eventSystem.on(IMEvent.ON_GROUP_USER_CACHE_CHANGE, this.onGroupChangeInfo, this)
    }

    onDestroy(): void {
        eventSystem.off(SocialChatSettingEvent.ON_GROUP_INFO_CHANGE, this.onGroupChangeInfo, this)
        //eventSystem.off(SocialChatSettingEvent.ON_GROUP_USER_CACHE_CHANGE, this.onGroupChangeInfo, this)
    }

    onGroupChangeInfo(message: Message) {
        if (this.sessionID != message.sessionID) {
            return
        }
        this.updateCell()
        NodeUtil.sendMessage(this.node, "updateView")
    }

    setup(params: { sessionID: string }) {
        this.sessionID = params.sessionID
        this.session = IM.getInstance().getSession(params.sessionID)
        this.updateCell()
    }

    protected onEnable(): void {
        if (this.session) {
            this.updateCell()
        }
    }

    updateCell() {//更新cell
        if (this.session == null) {
            return
        }

        this.updateDoNotDisturb()
        this.updateTopping()
    }

    getSession() {
        return this.session
    }

    clickBack() {//返回上级
        uiMgr.popPage()
    }

    goToCreateGroup() {//创建群聊
        console.log("创建群聊")
    }

    setDoNotDisturb(event: Event) {//消息免打扰
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        if (!toggle.isChecked) {
            IM.getInstance().setConversationRecvMessageOpt(this.session, true).then(({ err, resp }) => {
            })
        } else {
            IM.getInstance().setConversationRecvMessageOpt(this.session, false).then(({ err, resp }) => {
            })
        }
    }

    updateDoNotDisturb() {//更新消息免打扰
        if (this.doNotDisturb == null) return
        let doNotDisturb = this.session.isDND
        if (doNotDisturb) {
            this.doNotDisturb.isChecked = true
        } else {
            this.doNotDisturb.isChecked = false
        }
    }

    setTopping(event: Event) {//消息置顶
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        console.log("setTopping this.session", this.session)
        if (!toggle.isChecked) {
            this.session.topRank = 1
            IM.getInstance().pinConversation(this.session).then(({ err, resp }) => {
            })
        } else {
            this.session.topRank = 0
            IM.getInstance().pinConversation(this.session).then(({ err, resp }) => {
            })
        }
    }

    updateTopping() {//更新消息置顶
        if (this.topping == null) return
        let topping = this.session.topRank
        if (topping > 0) {
            this.topping.isChecked = true
        } else {
            this.topping.isChecked = false
        }
    }

    setTip(event: Event) {//提醒
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        if (!toggle.isChecked) {
            console.log("提醒")
        } else {
            console.log("取消提醒")
        }
    }

    updateTip() {//更新提醒按钮
        if (this.tip == null) return
        let tip
        if (tip) {
            this.tip.isChecked = true
        } else {
            this.tip.isChecked = false
        }
    }

    findChatRecord() {//查找聊天记录
        console.log("查找聊天记录")
        // 查找聊天记录
    }

    setChatBackground() {//设置聊天背景
        console.log("设置聊天背景")
        // 设置聊天背景
    }

    clickClearChatHistory() {//清空聊天记录
        if (this.popupWithButton) {
            let alertDate: AlertParams = {
                title: "提示",
                content: "确定删除聊天记录吗？",
                ok: {
                    title: "确认",
                    callback: () => {
                        this.clearChatHistory();
                    }
                },
                cancel: {
                    title: "取消",
                }
            }
            uiMgr.pushPopup(this.popupWithButton, { params: alertDate })
        }
    }

    clearChatHistory() {
        console.log("清空聊天记录")
        // 清空聊天记录
    }
}