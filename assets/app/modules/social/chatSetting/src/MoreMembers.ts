import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { IM } from 'qsdk/im/IM';
import { Session } from 'qsdk/im/core/Session';
import { UserNick } from '../../common/src/component/UserNick';
import { uiMgr } from 'bos/exports';
import { IAddGroupUserReq, IRemoveGroupUserReq } from 'idl/mpff/social/im.v2';
import { SelectUserParams } from '../../common/src/component/selectors/select/SelectUserCtr';
import { Selector, SelectorType } from '../../common/src/Selector';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { GroupManager } from './GroupManager';
const { ccclass, property } = _decorator;

@ccclass('MoreMembers')
export class MoreMembers extends Component {

    @property({ type: Label })
    title: Label | null = null

    @property({ type: Prefab })
    avatar: Prefab | null = null

    @property({ type: Node })
    memberList: Node | null = null

    @property({ type: Node })
    addCell: Node | null = null

    @property({ type: Node })
    deleteCell: Node | null = null

    private session: Session | null = null
    private groupUserIDList: number[] = []

    start() {
        IM.getInstance().listGroupUser(this.session.message.groupID).then(groupUserList => {
            for (let index = 0; index < groupUserList.length; index++) {
                this.groupUserIDList.push(groupUserList[index].userID)
            }
            this.updateTitle()
            this.updateView()
        })
    }

    setup(params: { sessionID: string }) {
        this.session = IM.getInstance().getSession(params.sessionID)
    }

    updateTitle() {
        if (this.title) {
            this.title.string = "群成员(" + this.groupUserIDList.length + ")"
        }
    }

    async updateView() {//更新头像栏
        this.memberList.removeAllChildren()

        let isMember = await GroupManager.getInstance().isGroupMember()
        if (!isMember) {
            this.memberList.insertChild(this.deleteCell, 0)
        }
        this.memberList.insertChild(this.addCell, 0)
        let num = this.groupUserIDList.length
        for (let i = num - 1; i >= 0; i--) {
            let userID = this.groupUserIDList[i]
            this.addAvatar(userID)
        }

    }

    addAvatar(userID: number) { //添加头像栏中的头像
        if (this.avatar) {
            let node = instantiate(this.avatar)
            this.memberList.insertChild(node, 0)
            node.getChildByName("Avatar").getComponent(Avatar).setUserID(userID)
            node.getChildByName("name").getComponent(UserNick).setUserID(userID)
        }
    }

    clickBack() {
        uiMgr.popPage()
    }


    /**
 *  点击加号
 *  单聊选群成员创建群
 *  群聊添加群成员
 */
    async clickAddUser() {
        // 构建好友列表
        let relationList = await StrongRelation.getInstance().getMutualFollowList()
        let userIDList = []
        for (let index = 0; index < relationList.length; index++) {
            let relation = relationList[index]
            userIDList.push(relation.userID)
        }

        // 过滤掉当前群成员
        let filterIDList = []
        filterIDList = await this.getGroupUserIDList()
        let params: SelectUserParams = {
            userIDList: userIDList,//用户列表
            onComplete: (userIDList) => {

                this.addGroupUser(userIDList)

            },//选择完成回调

            filterIDList: filterIDList,
        }
        Selector.getInstance().loadSelector(SelectorType.User, params)
    }

    addGroupUser(userIDList: number[]) {
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
                this.updateView()

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

                this.updateView()
            } else {
                console.log(err)
            }
        })
    }
}



