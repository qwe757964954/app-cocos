import { _decorator, Component, Node, Toggle } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { GroupManager } from './GroupManager';
import { IChangeGroupOwnerReq, ICreateGroupReq, ISaveGroupReq } from 'idl/mpff/social/im.v2';
import { resLoader, StringUtil, uiMgr } from 'bos/exports';
import { IM } from 'qsdk/im/IM';
import { SelectUserParams } from '../../common/src/component/selectors/select/SelectUserCtr';
import { Selector, SelectorType } from '../../common/src/Selector';
import { AlertParams } from 'bos/framework/gui/UIMgr';
import { App } from 'app/App';

@ccclass('GroupAdminViewCtr')
export class GroupAdminViewCtr extends XComponent {
    @property(Toggle)
    modifyGroupNameCheckBox: Toggle = null

    @property(Toggle)
    inviteStrategyCheckBox: Toggle = null

    @property(Node)
    disbandGroup: Node = null

    @property(Node)
    changeAdmin: Node = null

    @property(Node)
    changeOwner: Node = null

    @property(Node)
    groupApply: Node = null

    private isAdminModifyGroupName = false
    private isJoinConfirm = false


    start() {
        this.isAdminModifyGroupName = GroupManager.getInstance().isAdminModifyGroupName
        this.isJoinConfirm = GroupManager.getInstance().isJoinConfirm()
        this.updateView()
    }

    async updateView() {
        let groupOwner = await GroupManager.getInstance().isGroupOwner()
        if (groupOwner) {
            this.disbandGroup.active = true;
            this.changeAdmin.active = true;
            this.changeOwner.active = true;
        } else {
            this.disbandGroup.active = false;
            this.changeAdmin.active = false;
            this.changeOwner.active = false;
        }

        let isJoinConfirm = GroupManager.getInstance().isJoinConfirm()
        this.groupApply.active = isJoinConfirm

        this.modifyGroupNameCheckBox.isChecked = this.isAdminModifyGroupName
        this.inviteStrategyCheckBox.isChecked = this.isJoinConfirm
    }

    onCheckModifyGroupName() {

        this.isAdminModifyGroupName = !this.isAdminModifyGroupName

        let str = JSON.stringify({ isAdminModifyGroupName: this.isAdminModifyGroupName })

        let req: ISaveGroupReq = {
            groupID: GroupManager.getInstance().groupID,
            extra: {
                value: StringUtil.stringToUint8Array(str)
            }
        }
        IM.getInstance().saveGroup(req).then(({ err, resp }) => {
            if (!err) {
                GroupManager.getInstance().isAdminModifyGroupName = this.isAdminModifyGroupName
                this.updateView()
            }
        })

    }

    onCheckInviteStrategy() {

        this.isJoinConfirm = !this.isJoinConfirm

        let joinType = 0
        if (this.isJoinConfirm) {
            joinType = 1
        }

        let req: ISaveGroupReq = {
            groupID: GroupManager.getInstance().groupID,
            joinStrategy: { joinType: joinType }
        }
        IM.getInstance().saveGroup(req).then(({ err, resp }) => {
            if (!err) {
                GroupManager.getInstance().joinType = joinType
                this.updateView()
            }
        })

    }


    async onClickGroupApply() {


        console.log("onClickGroupApply")
        resLoader.loadPrefab("social@chatSetting/res/prefab/JoinApply", (err, prefab) => {
            if (err) {
                console.error(err)
                return
            }
            uiMgr.pushPage(prefab)
        })
    }

    async onClickChangeOwner() {
        console.log("onClickChangeOwner")

        await GroupManager.getInstance().syncGroupUser()

        let userIDList1 = GroupManager.getInstance().memberIDList
        let userIDList2 = GroupManager.getInstance().adminIDList

        let userIDList = userIDList1.concat(userIDList2)
        if (userIDList.length <= 0) {
            return
        }
        let params: SelectUserParams = {
            userIDList: userIDList,
            onComplete: (userIDList,) => {

                if (userIDList.length > 0) {
                    let userID = userIDList[0]
                    App.userMgr.getUserByID(userID).finish().then((user) => {
                        let alertDate: AlertParams = {
                            title: "提示",
                            content: "确认选择" + user.nickname + "为新群主，你将自动放弃群主身份",
                            ok: {
                                title: "确定",
                                callback: () => {
                                    let req: IChangeGroupOwnerReq = {
                                        groupID: GroupManager.getInstance().groupID,
                                        userID: userIDList[0]
                                    }
                                    IM.getInstance().changeGroupOwner(req).then(({ err, resp }) => {
                                        if (!err) {
                                            uiMgr.popPage()
                                        }
                                    })
                                }
                            },
                            cancel: {
                                title: "取消",
                                callback: () => {

                                }
                            }
                        }
                        uiMgr.pushAlert(alertDate)
                    })
                }
            },
            isSingleSelect: true,
            isAutoClose: false,

        }
        Selector.getInstance().loadSelector(SelectorType.User, params)
    }

    onClickChangeAdmin() {
        console.log("onClickChangeAdmin")
        resLoader.loadPrefab("social@chatSetting/res/prefab/AdminerView", (err, prefab) => {
            if (err) {
                console.error(err)
                return
            }
            uiMgr.pushPage(prefab)
        }
        )
    }

    onClickDisbandGroup() {
        console.log("onClickDisbandGroup")

    }

    onClickBack() {
        uiMgr.popPage()
    }

}