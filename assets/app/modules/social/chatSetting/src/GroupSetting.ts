import { App } from 'app/App';
import { AlertParams } from 'app/modules/common/alertview/src/AlertView';
import { eventSystem, resLoader, uiMgr } from 'bos/exports';
import { _decorator, Component, Node, Label, Toggle, Prefab, Event } from 'cc';
import { IDisbandGroupReq, IGetGroupReq, IGetGroupResp, IRemoveGroupUserReq } from 'idl/mpff/social/im.v2';
import { IM } from 'qsdk/im/IM';
import { Session } from 'qsdk/im/core/Session';
import { GroupManager, GroupUIPage } from './GroupManager';
import { IMEvent } from 'qsdk/im/config/define';
import { SocialChatSettingEvent, SocialFeedEvent } from '../../common/src/Define';
import { ChatUser } from '../../chat/src/component/chatCell/ChatUser';
const { ccclass, property } = _decorator;

@ccclass('GroupSetting')
export class GroupSetting extends Component {

    @property({ type: Node })
    groupOpt: Node | null = null

    @property({ type: Node })
    exitGroup: Node | null = null

    @property({ type: Label })
    groupName: Label | null = null

    @property({ type: Label })
    groupNotice: Label | null = null

    @property({ type: Label })
    noticeContent: Label | null = null

    @property({ type: Node })
    groupManager: Node | null = null

    @property({ type: Label })
    groupNotes: Label | null = null

    @property({ type: Label })
    myGroupName: Label | null = null

    @property({ type: Toggle })
    otherName: Toggle | null = null

    @property({ type: Prefab })
    popupWithButton: Prefab | null = null

    private sessionID: string = ""
    private session: Session | null = null
    private groupInfo: IGetGroupResp | null = null

    start() {
        eventSystem.on(SocialChatSettingEvent.ON_GROUP_INFO_CHANGE, this.onGroupChangeInfo, this)
        eventSystem.on(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, this.onSyncGroupUser, this)

    }

    protected onDestroy(): void {
        eventSystem.off(SocialChatSettingEvent.ON_GROUP_INFO_CHANGE, this.onGroupChangeInfo, this)
        eventSystem.off(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, this.onSyncGroupUser)

    }

    onGroupChangeInfo() {
        this.updateGroupBlock()
    }

    async onSyncGroupUser(){
        await GroupManager.getInstance().syncGroupUser()
        this.updateGroupBlock()
    }

    setup(params: { sessionID: string }) {
        this.sessionID = params.sessionID
        this.session = IM.getInstance().getSession(params.sessionID)
        if (this.session.message.isGroup()) {
            this.groupOpt.active = true
            this.exitGroup.active = true
            this.getGroupInfo()
        }

    }

    protected onEnable(): void {
        if (this.session && this.session.message.isGroup()) {
            this.getGroupInfo()
        }
    }

    getGroupInfo() {
        let req: IGetGroupReq = {
            groupID: this.session.message.toID
        }
        IM.getInstance().getGroup(req).then((resp) => {
            if (!resp.err) {
                this.groupInfo = resp.resp
                this.updateGroupBlock()
            }
        })
    }

    updateGroupBlock() { //更新群聊块
        this.updateGroupName()
        this.updateGroupNotice()
        this.updateGroupManager()
        this.updateGroupNotes()
        this.updateMyGroupName()
        this.updateOtherName()
    }




    /**
    * 群聊
   */
    async setGroupName() {//修改群名称
        let isAdminModifyGroupName = GroupManager.getInstance().isAdminModifyGroupName //是否是管理员才能修改群名称
        if (isAdminModifyGroupName) {
            let isGroupMember = await GroupManager.getInstance().isGroupMember()
            if (isGroupMember) {
                let params: AlertParams = {
                    title: "提示",
                    content: "只有群主和管理员才能修改群公告",
                    ok: {
                        title: "确认",
                        callback: () => {
                            uiMgr.popPopup()
                        }
                    },
                    cancel: {
                        title: "取消",
                    }
                }
                uiMgr.pushPopup(this.popupWithButton, { params: params })
                return
            }
        }
        resLoader.loadPrefab("social@chatSetting/res/prefab/GroupInfoView", (err, asset) => {
            if (err) {
                console.error(err);
                return;
            }
            uiMgr.pushPage(asset, { params: { sessionID: this.sessionID, type: "GroupName" } });
        });
    }

    updateGroupName() {//更新群名称
        if (!this.groupInfo || !this.groupName) {
            return
        }
        let groupName = this.groupInfo.group.name
        if (groupName) {
            this.groupName.string = groupName
        } else {
            this.groupName.string = "未设置"
        }
    }

    setGroupManager() {//群管理
        GroupManager.openPage(GroupUIPage.Admin)
    }

    async updateGroupManager() {//更新群管理
        if (!this.groupManager) {
            return
        }
        let isGroupMember = await GroupManager.getInstance().isGroupMember()

        this.groupManager.active = !isGroupMember
    }

    async setGroupNotice() {//修改群公告
        let isGroupMember = await GroupManager.getInstance().isGroupMember()
        let groupNotice = GroupManager.getInstance().announcement.announcement
        if (isGroupMember && !groupNotice) {
            let params: AlertParams = {
                title: "提示",
                content: "只有群主和管理员才能修改群公告",
                ok: {
                    title: "确认",
                    callback: () => {
                        uiMgr.popPopup()
                    }
                },
                cancel: {
                    title: "取消",
                }
            }
            uiMgr.pushPopup(this.popupWithButton, { params: params })
            return
        }
        resLoader.loadPrefab("social@chatSetting/res/prefab/GroupNotice", (err, asset) => {
            if (err) {
                console.error(err);
                return;
            }
            uiMgr.pushPage(asset, { params: { sessionID: this.sessionID, type: "GroupNotice" } });
        });
    }

    updateGroupNotice() {//更新群公告
        if (!this.groupNotice) {
            return
        }
        let groupNotice = GroupManager.getInstance().announcement.announcement
        if (groupNotice) {
            this.groupNotice.node.active = false
            this.noticeContent.node.active = true
            this.noticeContent.string = groupNotice
        } else {
            this.groupNotice.string = "未设置"
        }
    }

    setGroupNotes() {//设置备注
        resLoader.loadPrefab("social@chatSetting/res/prefab/GroupInfoView", (err, asset) => {
            if (err) {
                console.error(err);
                return;
            }
            uiMgr.pushPage(asset, { params: { sessionID: this.sessionID, type: "GroupNotes" } });
        });
    }

    updateGroupNotes() {//更新群备注
        if (!this.session || !this.groupNotes) {
            return
        }
        let notes = this.session.extra.groupMark
        if (notes) {
            this.groupNotes.string = notes
        } else {
            this.groupNotes.string = "未设置"
        }
    }

    setMyName() {//修改我的群昵称
        resLoader.loadPrefab("social@chatSetting/res/prefab/GroupInfoView", (err, asset) => {
            if (err) {
                console.error(err);
                return;
            }
            uiMgr.pushPage(asset, { params: { sessionID: this.sessionID, type: "GroupNickname" } });
        });
    }

    async updateMyGroupName() {//更新我的群昵称
        if (!this.groupInfo || !this.myGroupName) {
            return
        }
        let userID = App.userMgr.loginUser.uid
        let myGroupName = GroupManager.getInstance().alisa
        if (myGroupName && myGroupName !== "") {
            this.myGroupName.string = myGroupName
        } else {
            let user = await App.userMgr.getUserByID(userID).finish()
            if (this.node.isValid == false) {
                return
            }
            this.myGroupName.string = user.nickname
        }
    }

    setOtherName(event: Event) {//显示他人群昵称
        let target = event.target as Node
        let toggle = target.getComponent(Toggle)
        this.session.showNick = !toggle.isChecked
        if (!toggle.isChecked) {
            console.log("显示他人群昵称")
            IM.getInstance().groupMgr.setIsShowAlias(this.session.message.toID, true)
        } else {
            console.log("不显示他人群昵称")
            IM.getInstance().groupMgr.setIsShowAlias(this.session.message.toID, false)

        }
    }

    updateOtherName() {//更新是否显示他人群昵称
        if (!this.otherName) {
            return
        }
        let otherName = IM.getInstance().groupMgr.getIsShowAlias(this.session.message.toID)

        if (otherName) {
            this.otherName.isChecked = true
        } else {
            this.otherName.isChecked = false
        }
    }

    async exit() {//退出群聊
        if (this.popupWithButton) {
            let alertDate: AlertParams
            let isGroupOwner = await GroupManager.getInstance().isGroupOwner()
            if (isGroupOwner) {
                //如果是群主，弹出解散群聊
                alertDate = {
                    title: "提示",
                    content: "解散群聊后，群成员和群主都将被移除群聊",
                    ok: {
                        title: "确认",
                        callback: () => {
                            this.clearChatHistory();
                            this.dissolveGroup();
                        }
                    },
                    cancel: {
                        title: "取消",
                    }
                }

            } else {
                alertDate = {
                    title: "提示",
                    content: `即将退出群聊${this.groupName.string}，退出后会清除聊天记录`,
                    ok: {
                        title: "确认",
                        callback: () => {
                            this.clearChatHistory()
                            this.exitGroupChat()
                        }
                    },
                    cancel: {
                        title: "取消",
                    }
                }
            }
            uiMgr.pushPopup(this.popupWithButton, { params: alertDate })
        }
    }

    clearChatHistory() {
        //清除聊天记录
        console.log("清除聊天记录")
    }

    //解散群聊
    dissolveGroup() {
        let req: IDisbandGroupReq = {
            groupID: this.session.message.toID
        }
        IM.getInstance().disbandGroup(req)
    }

    //退出群聊
    exitGroupChat() {
        let userIDList = [App.userMgr.loginUser.uid]
        let req: IRemoveGroupUserReq = {
            groupID: this.session.message.toID,
            userIDList: userIDList
        }
        IM.getInstance().removeGroupUser(req)
    }
}