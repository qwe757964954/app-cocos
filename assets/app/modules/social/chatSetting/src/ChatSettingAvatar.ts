import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { eventSystem, resLoader, uiMgr } from 'bos/exports';
import { _decorator, Component, instantiate, Node, Label } from 'cc';
import { Session } from 'qsdk/im/core/Session';
import { IM } from 'qsdk/im/IM';
import { ChatSetting } from './ChatSetting';
import { UserNick } from '../../common/src/component/UserNick';

import { IAddGroupUserReq, ICreateGroupReq, IRemoveGroupUserReq } from 'idl/mpff/social/im.v2';
import { Selector, SelectorType } from '../../common/src/Selector';
import { SelectUserParams } from '../../common/src/component/selectors/select/SelectUserCtr';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { GroupManager } from './GroupManager';
import { AlertParams } from 'app/modules/common/alertview/src/AlertView';
import { IMEvent } from 'qsdk/im/config/define';

const { ccclass, property } = _decorator;

@ccclass('ChatSettingAvatar')
export class ChatSettingAvatar extends Component {

    @property(Node)
    chatSetting: Node | null = null

    @property({ type: Node })
    moreMember: Node | null = null

    @property({ type: Node })
    contentNode: Node | null = null

    @property({ type: Node })
    addCell: Node | null = null

    @property({ type: Node })
    deleteCell: Node | null = null

    @property({ type: Label })
    title: Label | null = null

    session: Session | null = null
    myID: number = 0
    ownAvatar :Node | null = null

    private groupUserIDList: number[] = []

    start(): void {
        this.groupUserIDList = []

        eventSystem.on(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, this.onSyncGroupUser, this)


        this.getSession()
        if (!this.session) return
        IM.getInstance().listGroupUser(this.session.message.groupID).then(groupUserList => {
            for (let index = 0; index < groupUserList.length; index++) {
                this.groupUserIDList.push(groupUserList[index].userID)
            }
            this.updateAvatarColumn()
        })

        this.myID = IM.getInstance().myUid

        this.updateTitle()

    }

    protected onDestroy(): void {
        eventSystem.off(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, this.onSyncGroupUser)

    }

    async onSyncGroupUser(){
        await GroupManager.getInstance().syncGroupUser()
        if(this.ownAvatar){
            this.ownAvatar.getChildByName("name").getComponent(Label).string = GroupManager.getInstance().alisa
        }
    }

    //更新标题
    async updateTitle() {
        if (this.title == null) return
        if (this.session.message.isGroup()) {
            let num = this.groupUserIDList.length
            this.title.string = "聊天信息" + "(" + num + ")"

        } else {
            this.title.string = "聊天详情"
        }
    }

    getSession() {
        if (this.chatSetting) {
            this.session = this.chatSetting.getComponent(ChatSetting).getSession()
        }
    }

    //查看更多成员
    moreMembers() {
        resLoader.loadPrefab("social@chatSetting/res/prefab/MoreGroupMember", (err, prefab) => {
            if (!err) {
                uiMgr.pushPage(prefab, { params: { sessionID: this.session.sessionID } })
            } else {
                console.error("prefab--->", err)
            }
        })
    }

    //更新头像栏
    async updateAvatarColumn() {
        if (!this.contentNode) return
        this.contentNode.removeAllChildren()

        let isMember = await GroupManager.getInstance().isGroupMember()
        if (!isMember) {
            this.contentNode.insertChild(this.deleteCell, 0)
        }
        this.contentNode.insertChild(this.addCell, 0)

        if (this.session.message.isGroup()) {
            let num = this.groupUserIDList.length
            //普通群成员页面最多显示19个头像
            //管理员页面最多显示18个头像
            if (isMember) {
                if (num > 19) {
                    num = 19
                    this.moreMember.active = true
                }
            } else {
                if (num > 18) {
                    num = 18
                    this.moreMember.active = true
                }
            }

            //添加头像
            for (let i = num - 1; i >= 0; i--) {
                let userID = this.groupUserIDList[i]
                this.addAvatar(userID)
            }
        } else {
            let uid = this.session.message.otherID()
            let userID = Number(uid)
            this.addAvatar(userID)
        }
        this.updateTitle()
    }

    addAvatar(userID: number) { //添加头像栏中的头像
        resLoader.loadPrefab("social@chatSetting/res/prefab/AvatarCell", (err, prefab) => {
            if (err) {
                console.error("prefab--->", err)
            } else {
                let node = instantiate(prefab)
                this.contentNode.insertChild(node, 0)
                node.getChildByName("Avatar").getComponent(Avatar).setUserID(userID)

                //自己设置了群昵称，会显示自己的群昵称,否则显示自己的昵称
                if (this.myID == userID) {
                    this.ownAvatar = node
                    let alisa = GroupManager.getInstance().alisa
                    if (alisa && alisa != "") {
                        node.getChildByName("name").getComponent(Label).string = GroupManager.getInstance().alisa
                        return
                    } else {
                        node.getChildByName("name").getComponent(UserNick).setUserID(userID)
                        return
                    }
                }
                node.getChildByName("name").getComponent(UserNick).setUserID(userID)
            }
        })
    }


    /**
 *  点击加号
 *  单聊选群成员创建群
 *  群聊添加群成员
 */
    async clickAddUser() {
        let isNeedApply = GroupManager.getInstance().isJoinConfirm()
        let isMember = await GroupManager.getInstance().isGroupMember()
        if (isNeedApply && isMember) {
            let alertDate: AlertParams
            alertDate = {
                title: "提 示",
                content: "群主或管理员已启用“群聊邀请确认”，邀请朋友进去可向群主或群管理员申请",
                ok: {
                    title: "申请",
                    callback: () => {
                        this.join()
                    }
                },
                cancel: {
                    title: "取消",
                }
            }
            resLoader.loadPrefab("common@alertview/res/prefab/AlertView", (err, prefab) => {
                if (!err) {
                    uiMgr.pushPopup(prefab, { params: alertDate })
                } else {
                    console.log("prefab--->", err)
                }
            })
        } else {
            this.join()
        }
    }

    async join() {
        // 构建好友列表
        let relationList = await StrongRelation.getInstance().getMutualFollowList()
        let userIDList = []
        for (let index = 0; index < relationList.length; index++) {
            let relation = relationList[index]
            userIDList.push(relation.userID)
        }

        // 过滤掉当前群成员
        let filterIDList = []
        let isGroup = this.session.message.isGroup()
        if (isGroup) {
            filterIDList = await this.getGroupUserIDList()
        } else {
            let otherID = this.session.message.otherID()
            filterIDList.push(otherID)
        }

        let params: SelectUserParams = {
            userIDList: userIDList,//用户列表
            onComplete: (userIDList) => {
                if (!isGroup) {
                    this.createGroupMessage(userIDList)
                } else {
                    this.addGroupUser(userIDList)
                }
            },//选择完成回调

            filterIDList: filterIDList,
        }
        Selector.getInstance().loadSelector(SelectorType.User, params)
    }

    createGroupMessage(userIDList: number[]) {
        console.log("createGroupMessage", userIDList)
        userIDList.push(this.session.message.otherID())

        let req: ICreateGroupReq = {
            userIDList: userIDList
        }
        IM.getInstance().createGroup(req).then(({ err, resp }) => {
            if (!err) {
                //
                // 退出到主界面 
                uiMgr.popPage()
                uiMgr.popPage()



            } else {
                console.log(err)
            }
        })
    }

    addGroupUser(userIDList: number[]) {
        console.log("addGroupUser", userIDList)
        let req: IAddGroupUserReq = {
            groupID: this.session.message.groupID,
            userIDList: userIDList
        }
        IM.getInstance().addGroupUser(req).then(({ err, resp }) => {
            if (!err) {
                //
                userIDList.forEach(userID => {
                    this.groupUserIDList.push(userID)
                })
                this.updateAvatarColumn()

            } else {
                console.log(err)
            }
        })
    }


    async getGroupUserIDList(): Promise<number[]> {
        let groupUserList = await IM.getInstance().listGroupUser(this.session.message.groupID)

        let userIDList = []

        groupUserList.forEach(user => {
            if (user.userID !== IM.getInstance().myUid) {
                userIDList.push(user.userID)
            }
        });
        return userIDList
    }

    /*
        删除群成员
    */
    async clickRemoveUser() {
        let userIDList = await this.getGroupUserIDList()

        let params: SelectUserParams = {
            userIDList: userIDList,//用户列表
            onComplete: (userIDList) => {
                this.removeGroupUser(userIDList)
            },//选择完成回调
        }
        Selector.getInstance().loadSelector(SelectorType.User, params)
    }

    removeGroupUser(userIDList: number[]) {
        console.log("removeGroupUser", userIDList)

        let req: IRemoveGroupUserReq = {
            groupID: this.session.message.groupID,
            userIDList: userIDList
        }
        IM.getInstance().removeGroupUser(req).then(({ err, resp }) => {
            if (!err) {
                //
                let userIDMap: Map<number, number> = new Map()
                for (let index = 0; index < userIDList.length; index++) {
                    let userID = userIDList[index]
                    userIDMap.set(userID, userID)
                }

                let newUserIDList = []
                for (let index = 0; index < this.groupUserIDList.length; index++) {
                    let userID = this.groupUserIDList[index]
                    if (!userIDMap.has(userID)) {
                        newUserIDList.push(userID)
                    }
                }

                this.groupUserIDList = newUserIDList

                this.updateAvatarColumn()
            } else {
                console.log(err)
            }
        })
    }


}