import { GroupManager } from 'app/modules/social/chatSetting/src/GroupManager';
import { resLoader, uiMgr } from 'bos/exports';
import { _decorator, Button, Component, Label, Node } from 'cc';
import { IM } from 'qsdk/im/IM';
import { Session } from 'qsdk/im/core/Session';
const { ccclass, property } = _decorator;

@ccclass('ChatTipView')
export class ChatTipView extends Component {

    @property({ type: Node })
    tipNode: Node | null = null

    @property({ type: Button })
    applyTip: Button | null = null

    @property({ type: Button })
    noticeTip: Button | null = null

    @property({ type: Label })
    applyTipLabel: Label | null = null

    @property({ type: Label })
    noticeTipLabel: Label | null = null

    sessionID: string = ""
    session: Session | null = null

    setup(params: { sessionID: string }) {
        this.sessionID = params.sessionID
        this.updateView()
    }


    protected onEnable() {
        this.updateView()
    }

    async updateView() {
        if (!this.sessionID || !this.tipNode) return
        this.session = IM.getInstance().getSession(this.sessionID)
        let applyNum = this.session.getGroupApply()
        let isGroupMember = await GroupManager.getInstance().isGroupMember()
        let apply = applyNum > 0 && !isGroupMember
        let notice = this.session.hasGroupAnnouncement()
        if (apply) {
            if (!this.applyTip) return
            if (!this.applyTipLabel) return
            this.tipNode.active = true
            this.applyTip.node.active = true
            this.applyTipLabel.string = "新邀请进群申请" + applyNum
            this.session.updateGroupApply(0)
        } else {
            if (!this.applyTip) return
            if (!this.applyTipLabel) return
            this.tipNode.active = false
            this.applyTip.node.active = false
        }
        if (notice) {
            if (!this.noticeTip) return
            if (!this.noticeTipLabel) return
            this.tipNode.active = true
            this.noticeTip.node.active = true
            this.noticeTipLabel.string = GroupManager.getInstance().announcement.announcement
            this.session.updateAnnounce(false)
        } else {
            if (!this.noticeTip) return
            if (!this.noticeTipLabel) return
            this.tipNode.active = false
            this.noticeTip.node.active = false
        }
    }

    gotoApply() {
        resLoader.loadPrefab("social@chatSetting/res/prefab/JoinApply", (err, prefab) => {
            if (err) {
                console.error(err)
                return
            }
            uiMgr.pushPage(prefab)
        })
    }

    gotoNotice() {
        resLoader.loadPrefab("social@chatSetting/res/prefab/GroupNotice", (err, asset) => {
            if (err) {
                console.error(err);
                return;
            }
            uiMgr.pushPage(asset, { params: { sessionID: this.sessionID, type: "GroupNotice" } });
        });
    }
}


