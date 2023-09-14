import { uiMgr } from 'bos/exports';
import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { GroupManager } from './GroupManager';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { UserNick } from '../../common/src/component/UserNick';
import { SelectUserParams } from '../../common/src/component/selectors/select/SelectUserCtr';
import { Selector, SelectorType } from '../../common/src/Selector';
import { IM } from 'qsdk/im/IM';
import { ISetGroupUserReq } from 'idl/mpff/social/im.v2';
import { IInt32Value } from 'idl/mp/common/wrappers';

const { ccclass, property } = _decorator;

@ccclass('Adminer')
export class Adminer extends Component {

    @property({ type: Label })
    title: Label | null = null

    @property({ type: Node })
    memberList: Node | null = null

    @property({ type: Node })
    addCell: Node | null = null

    @property({ type: Node })
    deleteCell: Node | null = null

    @property({ type: Prefab })
    avatar: Prefab | null = null

    start() {
        this.updateView()
    }

    protected onEnable(): void {
        this.updateView()
    }

    async updateView() {
        if (this.title) {
            this.title.string = "群管理员"
        }
        await GroupManager.getInstance().syncGroupUser()
        let admirers = GroupManager.getInstance().adminIDList
        this.memberList.removeAllChildren()
        this.memberList.insertChild(this.deleteCell, 0)
        this.memberList.insertChild(this.addCell, 0)
        let num = admirers.length
        for (let i = num - 1; i >= 0; i--) {
            let userID = admirers[i]
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

    clickBack() {//返回上级
        uiMgr.popPage()
    }

    /*添加管理员*/
    async clickAddAdminer() {
        await GroupManager.getInstance().syncGroupUser()

        let groupMember = GroupManager.getInstance().memberIDList
        //打开界面
        let params: SelectUserParams = {
            userIDList: groupMember,//用户列表
            onComplete: (userIDList) => {
                //添加管理员
                let roleLevel: IInt32Value = {
                    value: 2
                }
                let req: ISetGroupUserReq = {
                    groupID: GroupManager.getInstance().groupID,
                    userIDList: userIDList,
                    roleLevel: roleLevel
                }
                IM.getInstance().setGroupUser(req).then(({ err, resp }) => {
                    if (!err) {
                        this.scheduleOnce(() => {
                            this.updateView()
                        }, 0.1)
                    }
                })

            },//选择完成回调
        }
        Selector.getInstance().loadSelector(SelectorType.User, params)
    }

    /*
        删除管理员
    */
    async clickRemoveAdminer() {
        await GroupManager.getInstance().syncGroupUser()

        let groupAdminer = GroupManager.getInstance().adminIDList
        //打开界面
        let params: SelectUserParams = {
            userIDList: groupAdminer,//用户列表
            onComplete: (userIDList) => {
                //删除管理员
                let roleLevel: IInt32Value = {
                    value: 3
                }
                let req: ISetGroupUserReq = {
                    groupID: GroupManager.getInstance().groupID,
                    userIDList: userIDList,
                    roleLevel: roleLevel
                }
                IM.getInstance().setGroupUser(req).then(({ err, resp }) => {
                    if (!err) {
                        this.scheduleOnce(() => {
                            this.updateView()
                        }, 0.1)
                    }
                })
            },//选择完成回调
        }
        Selector.getInstance().loadSelector(SelectorType.User, params)
    }

}


