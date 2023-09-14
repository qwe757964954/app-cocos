import { App } from "app/App";
import { User } from "app/domain/user/User";
import { IM } from "qsdk/im/IM";
import { ChatType, FromType, GroupChangeInfoType, GroupRole, MessageType, SysCMD } from "qsdk/im/config/define";
import { Message } from "qsdk/im/core/Message";


export class ChatUtil {
    static async getMessageShortText(message: Message) {
        if (message.type === MessageType.Custom) {
            return "自定义消息"
        } else {
            if (message.type == MessageType.Sys) {
                return this.processSysText(message)
            } else {
                return this.processTypeText(message)
            }
        }
    }

    static processTypeText(message: Message) {
        let text = "";
        if (message.type === MessageType.Quote) {
            text = message.content.content;
        } else {
            if (message.type === MessageType.Text) {
                if (message.status === 1) {
                    text = "发送中-> " + message.content;
                } else {
                    text = message.content;
                }
            }

            if (message.type === MessageType.Image) {
                text = "[图片]";
            }

            if (message.type === MessageType.File) {
                text = "[表情]";
            }

            if (message.type === MessageType.Revoked) {
                text = "撤回消息";
            }

            if (message.type === MessageType.Meeting) {
                text = "语音通话已结束";
            }

            if (message.type === MessageType.Video) {
                text = "[视频]";
            }

            if (message.type === MessageType.File) {
                text = "[文件]";
            }

            if (message.type === MessageType.Voice) {
                text = "[语音]";
            }

            if (message.type === MessageType.Card) {
                text = "[名片]";
            }

            if (message.type === MessageType.Merger) {
                text = "[聊天记录]";
            }

            if (message.type === MessageType.Custom) {
                const str = "自定义消息";
                text = str;
            }
        }

        if (message.chatType === ChatType.Official) {
            if (message.type === MessageType.Text) {
                text = message.content;
            } else {
                if (message.fromType === FromType.FromTypeOfficial) {
                    text = message.content.text;
                }
            }
        }

        return text

    }


    static async processSysText(message: Message) {
        let content = message.sysContent
        let text = ""
        let optUserName = await this.getOptUserName(message.fromID)

        if (message.sysCMD === SysCMD.AddGroupUser || message.sysCMD === SysCMD.GroupCreated) {
            // 被邀请
            let userList: User[] = await this.getUserList(content.userIDList)
            let userNames = [];
            for (let v of userList) {
                if (v.uid !== message.fromID) {
                    userNames.push(v.nickname);
                }
            }

            text = `${optUserName}邀请${userNames.join("、")}加入了群聊`;
            //return text
        } else if (message.sysCMD === SysCMD.UpdateGroupAnnouncement) {
            text = `${optUserName}修改群公告`;
            //return text
        } else if (message.sysCMD === SysCMD.RemoveGroupUser) {
            if (message.sysContent.userIDList.length === 1 && message.fromID === message.sysContent.userIDList[0]) {
                let optUserName = await this.getOptUserName(message.fromID)
                text = `${optUserName}退出了群聊`;

            } else {

                // 被邀请的用户列表
                let userList: User[] = await this.getUserList(message.sysContent.userIDList)
                let userNames = [];
                for (let v of userList) {
                    userNames.push("“" + v.nickname + "”");
                }
                text = `${optUserName}把${userNames.join("、")}移出了群聊`;
            }

        } else if (message.sysCMD === SysCMD.UpdateGroupName) {
            text = `${optUserName}修改了群名称`;


        } else if (message.sysCMD === SysCMD.SendMessageRejected) {
            text = "消息被拒收";
            if (message.sysContent) {
                const type = message.sysContent.type || 0;
                const strList = [
                    "被拉黑，消息拒收",
                    "您已拉黑对方",
                    "您的消息发送已达到上限",
                    "您已经被禁言",
                    "您说话太快了，请休息一下再聊吧"
                ];
                text = strList[type] || "消息被拒收";
            }
        } else if (message.sysCMD == SysCMD.RelateApplyAccept) {
            text = "[打招呼]"
        } else if (message.sysCMD === SysCMD.GroupChangeInfo) {
            let changeType = content.changeType;
            let userID = content.userID;

            if (changeType === GroupChangeInfoType.GroupChangeInfoTypeAnnouncement) {
                userID = content.announcement.userID;
            }

            let optName = await this.getOptUserName(userID)

            if (changeType === GroupChangeInfoType.GroupChangeInfoTypeName) {
                text = `${optName}修改群名称为“${content.name}”`;
            } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeAnnouncement) {
                text = content.announcement.announcement;
            } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeMark) {
                // this.groupMark = content.mark;
                // this.groupMarkLab.text = this.groupMark;
            } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeExtra) {
                // this.groupExtra = content.extra;
            } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeJoinStrategy) {
                const joinStrategy = content.joinStrategy;
                if (joinStrategy.joinType === 0) {
                    text = `${optName}已关闭“群聊邀请确认”，群成员可以随意邀请朋友进群。`;
                } else {
                    text = `${optName}已启用“群聊邀请确认”，群成员需群主或群管理员确认才能邀请朋友进群。`;
                }
            } else if (changeType === 6) {
                text = `${optName}已启用“群聊邀请确认”，群成员需群主或群管理员确认才能邀请朋友进群。`;
                // this.groupInviteStrategy = content.inviteStrategy;
            }

        } else if (message.sysCMD === SysCMD.InviteGroupUser) {
            let optUserName = this.getOptUserName(message.content.inviterUserID)
            let userList = await this.getUserList(message.content.userIDList)

            let userNames = [];
            for (let v of userList) {
                userNames.push("“" + v.nickname + "”");
            }
            text = `${optUserName}邀请${userNames.join("、")}申请加入群聊`;

        } else if (message.sysCMD === SysCMD.GroupUserInfoChange) {
            console.log("Define.SysCMD.GroupUserInfoChange", message);
            let changeInfoList = message.content.changeInfo;
            let opUserID = message.content.opUserID;

            let userIDList = []
            changeInfoList.forEach(changeInfo => {
                userIDList.push(changeInfo.userID)
            });

            let optUser = await this.getUser(opUserID)
            let userList = await this.getUserList(userIDList)

            if (changeInfoList) {
                let changeInfo = changeInfoList[0];
                if (changeInfo) {
                    if (changeInfo.roleLevel) {
                        if (changeInfo.roleLevel.value === GroupRole.GroupRoleOwner) {
                            const newUser = userList[0];
                            const newOwnerName = newUser.nickname;
                            text = `“${newOwnerName}”已经成为新群主`;
                            if (newUser.uid === IM.getInstance().myUid) {
                                text = "你已经成为新群主";
                            }

                        } else {
                            let roleDesc = "";
                            const role = changeInfo.roleLevel.value;
                            if (role === GroupRole.GroupRoleOwner) {
                                roleDesc = "群主";
                            } else if (role === GroupRole.GroupRoleAdmin) {
                                roleDesc = "管理员";
                            } else if (role === GroupRole.GroupRoleMember) {
                                roleDesc = "普通成员";
                            }
                            const userNames: string[] = [];
                            for (const v of userList) {
                                if (v.uid === IM.getInstance().myUid) {
                                    userNames.push("你");
                                } else {
                                    userNames.push(v.nickname);
                                }
                            }
                            text = userNames.join("、") + "被设置成为" + roleDesc;
                        }
                    }
                }
            }
        }
        return text
    }


    static async getOptUserName(userID: number) {
        let optUser = await this.getUser(userID);
        let optUserName = optUser.nickname
        if (userID === IM.getInstance().myUid) {
            optUserName = "你";
        }
        return optUserName
    }


    static async getUser(userID: number) {
        if (userID === undefined) {
            console.trace()
        }
        // console.log("getUserID--->", userID)
        let user = await App.userMgr.getUserByID(userID).finish()
        // console.log("getUserID--->callback--->", user)
        return user
    }

    static async getUserList(userIDList: number[]): Promise<User[]> {
        let userList = []
        for (let index = 0; index < userIDList.length; index++) {
            let user = await this.getUser(userIDList[index])
            userList.push(user)
        }
        return userList
    }


}