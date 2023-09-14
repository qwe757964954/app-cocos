import { App } from 'app/App';
import { Group } from 'app/modules/common/avatar/src/Group';
import { uiMgr } from 'bos/exports';
import { _decorator, Button, color, Component, EditBox, Label, Node, Sprite } from 'cc';
import { IStringValue } from 'idl/mp/common/wrappers';
import { IGetGroupReq, ISaveGroupReq, ISetGroupUserReq } from 'idl/mpff/social/im.v2';
import { IM } from 'qsdk/im/IM';
import { Session } from 'qsdk/im/core/Session';
import { GroupManager } from './GroupManager';
const { ccclass, property } = _decorator;

@ccclass('ModifyGroupInfoViewCtr')
export class ModifyGroupInfoViewCtr extends Component {

    @property({ type: Label })
    title: Label | null = null

    @property({ type: Label })
    tipLabel: Label | null = null

    @property({ type: Node })
    avatar: Node | null = null

    @property({ type: EditBox })
    editBox: EditBox | null = null

    @property({ type: Button })
    confirmBtn: Button | null = null

    private groupInfo: any = null
    private sessionID: string = ""
    private session: Session | null = null
    private type: string = ""

    start() {
        this.getGroupInfo()
    }

    setup(params: { sessionID: string, type: string }) {
        this.type = params.type
        this.sessionID = params.sessionID
        this.session = IM.getInstance().getSession(params.sessionID)
    }

    getGroupInfo() {
        let req: IGetGroupReq = {
            groupID: this.session.message.groupID
        }
        IM.getInstance().getGroup(req).then((resp) => {
            if (!resp.err) {
                this.groupInfo = resp.resp
                this.updateView()
                this.updateAvatar()
                this.updateBtn()
            }
        })
    }

    async updateView() {
        if (this.type == null || this.groupInfo == null) {
            return
        }
        if (this.type == "GroupName") {
            this.title.string = "群名称"
            this.tipLabel.string = "修改群聊名称后，将在群内通知其他成员"
            if (this.groupInfo.group.name == null || this.groupInfo.group.name == "") {
                this.editBox.placeholder = "未命名"
            } else {
                this.editBox.string = this.groupInfo.group.name
            }
        } else if (this.type == "GroupNotes") {
            this.title.string = "群备注"
            this.tipLabel.string = "群聊的备注仅自己可见"
            let mark = await this.session.getGroupMark()
            if (mark == null || mark == "") {
                this.editBox.placeholder = "备注"
            } else {
                this.editBox.string = mark
            }
        } else if (this.type == "GroupNickname") {
            this.title.string = "我在群里的昵称"
            this.tipLabel.string = "昵称修改后，只会在群内显示，群内成员都可以看见"
            let uid = IM.getInstance().myUid
            let alias = IM.getInstance().groupMgr.getUserAlias(this.groupInfo.group.groupID, uid)
            if (alias == null || alias == "") {
                let user = await App.userMgr.getUserByID(uid).finish()
                if (this.node.isValid == false) {
                    return
                }
                this.editBox.string = user.nickname
            } else {
                this.editBox.string = alias
            }
        }
    }

    updateAvatar() {
        if (this.sessionID == null || this.avatar == null) {
            return
        }
        this.avatar.getComponent(Group).setSessionID(this.sessionID)
    }

    updateBtn() {
        if (!this.editBox.string) {
            this.confirmBtn.interactable = false
            this.confirmBtn.node.getComponent(Sprite).color = color(255, 255, 255)
        } else {
            this.confirmBtn.interactable = true
            this.confirmBtn.node.getComponent(Sprite).color = color(7, 193, 96)
        }
    }

    clickBg() {
        this.editBox?.blur();
    }

    clickBackBtn() {
        uiMgr.popPage()
    }

    clickDeleteBtn() {
        this.editBox?.blur();
        if (this.editBox == null) {
            return
        }
        this.editBox.string = ""
        if (this.type == "GroupName") {
            this.editBox.placeholder = "未命名"
        } else if (this.type == "GroupNotes") {
            this.editBox.placeholder = "备注"
        } else if (this.type == "GroupNickname") {
            this.editBox.placeholder = ""
        }
        this.updateBtn()
    }

    clickConfirmBtn() {
        if (this.type == "GroupName") {
            let name: IStringValue = {
                value: this.editBox.string
            }
            let req: ISaveGroupReq = {
                groupID: this.groupInfo.group.groupID,
                name: name
            }
            IM.getInstance().modifyGroupName(req).then(({ err, resp }) => {
                if (!err) {
                    uiMgr.popPage()
                }
            })
        }
        if (this.type == "GroupNotes") {
            this.session.updateGroupMark(this.editBox.string)
            uiMgr.popPage()

        }
        if (this.type == "GroupNickname") {
            let alias: IStringValue = {
                value: this.editBox.string
            }
            let req: ISetGroupUserReq = {
                groupID: this.groupInfo.group.groupID,
                alias: alias,
                userIDList: [IM.getInstance().myUid]
            }
            IM.getInstance().setGroupUser(req).then(({ err, resp }) => {
                if (!err) {
                    GroupManager.getInstance().alisa = this.editBox.string
                    uiMgr.popPage()
                }
            })
        }
    }
}