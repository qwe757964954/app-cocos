import { App } from 'app/App';
import { Label } from 'cc';
import { js } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { GroupRole, MessageSysRemoveGroupUser, SysCMD } from 'idl/mp/common/social.im';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

const RejectedStr = [
    "被拉黑，消息拒收",
    "您已拉黑对方",
    "您的消息发送已达到上限",
    "您已经被禁言",
    "您说话太快了，请休息一下再聊吧"
]

@ccclass('SysTextCell')
export class SysTextCell extends Component {

    @property(Label)
    label: Label = null!;

    start() {

    }

    async updateView(message: Message) {
        // this.label.string = message.sysContent
        console.info("SysTextCell updateView", message)
        let sysCMD = message.sysCMD
        if (sysCMD == SysCMD.GroupCreated || sysCMD == SysCMD.AddGroupUser) {
            this.processGroup(message, "%s邀请%s加入了群聊")
        } else if (sysCMD == SysCMD.RemoveGroupUser) {
            let sysContent = message.sysContent
            // console.log("sysContent.$userIDList222", sysContent.$userIDList,sysContent.userIDList,sysContent.userIDList)
            if (sysContent.userIDList.length == 1 && message.fromID == sysContent.userIDList[0]) {
                if (message.isMySelf()) {
                    this.label.string = "你退出了群聊"
                } else {
                    let user = await App.userMgr.getUserByID(message.fromID).finish()
                    this.label.string = js.formatStr("%s退出了群聊", user.nickname)
                }
            } else {
                this.processGroup(message, "%s把%s移出了群聊");
            }
        } else if (sysCMD == SysCMD.UpdateGroupAnnouncement) {
            let user = await App.userMgr.getUserByID(message.fromID).finish()
            this.label.string = js.formatStr("%s修改群公告", user.nickname)
        } else if (sysCMD == SysCMD.UpdateGroupName) {
            let user = await App.userMgr.getUserByID(message.fromID).finish()
            this.label.string = js.formatStr("%s修改群名称", user.nickname)
        } if (sysCMD == SysCMD.SendMessageRejected) {
            let type = message.sysContent.type
            this.label.string = RejectedStr[type] || "消息被拒收"
        } if (sysCMD == SysCMD.ChangeGroupOwner) {
            let text = ""
            if (message.isMySelf()) {
                text = "你已经成为新群主"
            } else {
                let user = await App.userMgr.getUserByID(message.fromID).finish()
                text = js.formatStr("“%s”已经成为新群主", user.nickname)
            }
            this.label.string = text
        } if (sysCMD == SysCMD.GroupSetRole) {
            let text = ""
            let sysContent = message.sysContent
            let role = sysContent.roleLevel
            if (role == GroupRole.GroupRoleAdmin) {
                text = "管理员"
            } else if (role == GroupRole.GroupRoleMember) {
                text = "普通成员"
            } else if (role == GroupRole.GroupRoleOwner) {
                text = "群主"
            }

            let names = []
            for (let index = 0; index < sysContent.userIDList.length; index++) {
                const userID = sysContent.userIDList[index];
                if (userID == App.userMgr.loginUid) {
                    names.push("你")
                } else {
                    let user = await App.userMgr.getUserByID(userID).finish()
                    names.push(user.nickname)
                }
            }

            this.label.string = names.join("、") + "被设置成为" + text
        } else if (sysCMD == SysCMD.GroupChangeInfo) {
            let sysContent = message.sysContent
            let text = ""
            let changeType = sysContent.changeType
            let userID = sysContent.userID

            const callback = (optName: string): void => {
                let text: string = "";
                if (changeType == 1) {
                    text = `${optName}修改群名称为“${sysContent.name}”`;
                } else if (changeType == 2) {
                    text = sysContent.announcement.announcement;

                } else if (changeType == 3) {


                } else if (changeType == 4) {

                } else if (changeType == 5) {
                    const joinStrategy = sysContent.joinStrategy;
                    if (joinStrategy.joinType == 0) {
                        text = `${optName}已关闭“群聊邀请确认”，群成员可以随意邀请朋友进群。`;
                    } else {
                        text = `${optName}已启用“群聊邀请确认”，群成员需群主或群管理员确认才能邀请朋友进群。`;
                    }
                } else if (changeType == 6) {
                    text = `${optName}已启用“群聊邀请确认”，群成员需群主或群管理员确认才能邀请朋友进群。`;
                }

                this.label.string = text;
            };


            if (userID == App.userMgr.loginUid && changeType != 6) {
                text = "你"
            } else {
                let user = await App.userMgr.getUserByID(userID).finish()
                text = user.nickname
            }
            callback(text)

        } if (sysCMD == SysCMD.InviteGroupUser) {
            this.processGroupApply(message, "%s邀请%s申请加入群聊")
        }
    }

    async processGroup(message: Message, formatStr: string = "%s邀请%s加入了群聊") {
        let sysContent = message.sysContent
        let inviteUserStr = ""
        let inviteUser = await App.userMgr.getUserByID(message.fromID).finish()
        if (message.isMySelf()) {
            inviteUserStr = "你"
        } else {
            inviteUserStr = inviteUser.nickname
        }
        let names = []
        console.log("sysContent.$userIDList", sysContent.$userIDList,sysContent.userIDList,sysContent.userIDList.length)
        for (let index = 0; index < sysContent.userIDList.length; index++) {
            const element = sysContent.userIDList[index];
            let user = await App.userMgr.getUserByID(element).finish()
            names.push(user.nickname)
        }

        let nameStr = names.join("、")
        let content = js.formatStr(formatStr, inviteUserStr, nameStr)
        this.label.string = content
    }

    async processGroupApply(message: Message, formatStr: string) {
        let sysContent = message.sysContent
        const inviteUserID = sysContent.inviterID;
        let user = await App.userMgr.getUserByID(inviteUserID).finish();
        let inviteUser = ""
        if (inviteUserID == App.userMgr.loginUid) {
            inviteUser = "你";
        }else{
            inviteUser = user.nickname
        }
        let names = []
        for (let index = 0; index < sysContent.userIDList.length; index++) {
            const element = sysContent.userIDList[index];
            let user = await App.userMgr.getUserByID(element).finish()
            names.push(user.nickname)
        }

        let nameStr = names.join("、")
        let content = js.formatStr(formatStr, inviteUser, nameStr)
        this.label.string = content
    }
}


