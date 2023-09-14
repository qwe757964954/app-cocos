import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { _decorator, Button, Component, EditBox, Label, Node } from 'cc';
import { UserNick } from '../../common/src/component/UserNick';
import { TimeUtil, uiMgr } from 'bos/exports';
import { GroupManager } from './GroupManager';
const { ccclass, property } = _decorator;

@ccclass('GroupNotice')
export class GroupNotice extends Component {

    @property({ type: Label })
    title: Label | null = null

    @property({ type: Button })
    editBtn: Button | null = null

    @property({ type: Button })
    confirmBtn: Button | null = null

    @property({ type: Node })
    info: Node | null = null

    @property({ type: Node })
    avatar: Node | null = null

    @property({ type: Label })
    nameLabel: Label | null = null

    @property({ type: Label })
    timeLabel: Label | null = null

    @property({ type: EditBox })
    noticeContent: EditBox | null = null

    start() {
        this.updateView()
    }

    async updateView() {
        if (this.title) {
            this.title.string = "群公告"
        }
        let isMember = await GroupManager.getInstance().isGroupMember()
        let noticeData = GroupManager.getInstance().announcement
        let groupNotice = noticeData.announcement
        let userID = noticeData.userID
        if (groupNotice) {
            this.info.active = true
            this.avatar.getComponent(Avatar).setUserID(userID)
            this.nameLabel.getComponent(UserNick).setUserID(userID)
            this.timeLabel.string = TimeUtil.toyyyyMMddHHmmss(noticeData.createdAt * 1000)
            // let data = new Date(noticeData.createdAt)
            // data.

            this.noticeContent.string = groupNotice
            this.noticeContent.enabled = false
            if (!isMember) {
                //普通群成员没有编辑权限
                this.editBtn.node.active = true
            }
        } else {
            this.confirmBtn.node.active = true
            this.noticeContent.enabled = true
        }
    }

    //编辑群公告按钮回调
    editGroupNotice() {
        this.noticeContent.enabled = true
        this.noticeContent.focus()
        this.editBtn.node.active = false
        this.confirmBtn.node.active = true
    }

    //完成按钮回调
    completeEdit() {
        GroupManager.getInstance().submitAnnouncement(this.noticeContent.string)
        uiMgr.popPage()
    }

    clickBack() {
        uiMgr.popPage()
    }
}