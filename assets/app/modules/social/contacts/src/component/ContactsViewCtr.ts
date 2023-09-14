import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { IRelation } from 'qsdk/relation/db/Model';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { director } from 'cc';
import { RelationEvent } from 'qsdk/relation/define';
import { Decorator, eventSystem, resLoader, uiMgr } from 'bos/exports';
import { SocialContactsEvent } from 'app/modules/social/common/src/Define';
import { CustomTableView, CustomTableViewCellData, CustomTableViewSectionData } from 'app/modules/social/common/src/CustomTableView';
import { CharSideBarCtr } from 'app/modules/social/common/src/component/selectors/base/CharSideBarCtr';
import { App } from 'app/App';
import { MoreViewCtr } from './MoreViewCtr';
import { IBlackReq, IUnFollowReq } from 'idl/mpff/social/relation.v1';

enum ContactsType {
    Func = 1,
    User = 2,
    Char = 3,
    Apply = 4,
}

export interface ContactsConfigItem {
    type: ContactsType;
    funcDesc: string;
    event: string;
    key: string;
    redPoint: boolean;
}

const configList: ContactsConfigItem[] = [
    {
        type: ContactsType.Func,
        funcDesc: "新的朋友",
        event: SocialContactsEvent.ON_SHOW_CONTACTS_NEW_FRIEND,
        key: "newFriend",
        redPoint: false
    },
    {
        type: ContactsType.Func,
        funcDesc: "黑名单",
        event: SocialContactsEvent.ON_SHOW_CONTACTS_BLACKLIST,
        key: "blackList",
        redPoint: false
    },
];

export enum ContactsUIPage {
    ApplyListView = "social@contacts/res/prefab/ApplyListView",
    BlackListView = "social@contacts/res/prefab/BlackListView",
}


@ccclass('ContactsViewCtr')
export class ContactsViewCtr extends XComponent {

    @property(Prefab)
    functionPrefab: Prefab = null

    @property(Prefab)
    userPrefab: Prefab = null

    @property(Prefab)
    charPrefab: Prefab = null

    @property(Prefab)
    applyListViewPrefab;

    @property(Prefab)
    addFriendViewPrefab;

    @property(Node)
    moreBtn: Node = null;

    @property(CustomTableView)
    tableview: CustomTableView = null;

    @property(CharSideBarCtr)
    charSideBar: CharSideBarCtr = null;

    start() {
        StrongRelation.getInstance().on(RelationEvent.ON_NOTIFY_RELATION_CHANGE, this.onNotifyRelationChange)
        StrongRelation.getInstance().on(RelationEvent.ON_NOTIFY_APPLY_CHANGE, this.onNotifyApplyChange)
        StrongRelation.getInstance().on(RelationEvent.ON_NOTIFY_RELATION_SYNC_FINISH, this.onNotifyRelationSyncFinish)


        eventSystem.on(SocialContactsEvent.ON_SHOW_CONTACTS_BLACKLIST, this.onShowBlackList, this)
        eventSystem.on(SocialContactsEvent.ON_SHOW_CONTACTS_NEW_FRIEND, this.onShowNewFriend, this)

        this.initFollowList()
    }

    onDestroy(): void {
        StrongRelation.getInstance().off(RelationEvent.ON_NOTIFY_RELATION_CHANGE, this.onNotifyRelationChange)
        StrongRelation.getInstance().off(RelationEvent.ON_NOTIFY_APPLY_CHANGE, this.onNotifyApplyChange)
        StrongRelation.getInstance().off(RelationEvent.ON_NOTIFY_RELATION_SYNC_FINISH, this.onNotifyRelationSyncFinish)

        eventSystem.off(SocialContactsEvent.ON_SHOW_CONTACTS_BLACKLIST, this.onShowBlackList, this)
        eventSystem.off(SocialContactsEvent.ON_SHOW_CONTACTS_NEW_FRIEND, this.onShowNewFriend, this)
    }

    // 初始化好友列表
    async initFollowList() {
        let sectionListData: CustomTableViewSectionData[] = []

        let funcSection: CustomTableViewSectionData = {
            cells: []
        }
        for (let index = 0; index < configList.length; index++) {
            let functionData: CustomTableViewCellData = {
                prefab: this.functionPrefab,
                data: configList[index]
            }
            funcSection.cells.push(functionData)
        }
        sectionListData.push(funcSection)


        let relationList = await StrongRelation.getInstance().getFriendList()
        console.log("StrongRelation.getInstance().getFriendList()==", relationList)

        let userList = []

        for (let index = 0; index < relationList?.length; index++) {
            let relation = relationList[index];
            let user = await App.userMgr.getUserByID(relation.userID).finish()
            userList.push(user)
        }

        let userSectionList = this.charSideBar.getCharSideData(userList)
        for (let index = 0; index < userSectionList?.length; index++) {
            let userSection = userSectionList[index];

            userSection.cells.forEach(element => {
                element.prefab = this.userPrefab
            });

            sectionListData.push(userSection)
        }
        this.charSideBar.setData(sectionListData)
        this.tableview.setData(sectionListData)


    }

    onNotifyRelationChange() {
        console.log("ContactsViewCtr:onNotifyRelationChange")

    }

    onNotifyApplyChange() {
        console.log("ContactsViewCtr:onNotifyApplyChange")

    }

    onNotifyRelationSyncFinish() {
        console.log("ContactsViewCtr:onNotifyRelationSyncFinish")
    }


    onClickBack() {
        uiMgr.popPage()
    }

    onClickMore() {
        resLoader.loadPrefabNode("social@contacts/res/prefab/MoreView.prefab", (view) => {
            let trs = this.moreBtn.getComponent(UITransform)
            let pos = trs.convertToWorldSpaceAR(new Vec3(0, 0, 0));

            director.getScene().getChildByName('Canvas').addChild(view)
            view.getComponent(MoreViewCtr).updateView(pos)
        })
    }


    onShowBlackList() {
        uiMgr.loadPage(ContactsUIPage.BlackListView)
    }

    onShowNewFriend() {
        uiMgr.loadPage(ContactsUIPage.ApplyListView)
    }

    @Decorator.OnAppEvent("IM_UNMUTUALFOLLOW_USER")//解除好友
    onUnFollowUser(userID: number) {
        console.log("onUnFollowUser", userID)

        let req: IUnFollowReq = {
            uid: userID
        }
        StrongRelation.getInstance().unFollow(req).then(({ err, resp }) => {
            if (!err) {
                this.initFollowList()
            }
        })
    }

    @Decorator.OnAppEvent("IM_BLACK_USER")//拉黑好友
    onBlackUser(userID: number) {
        console.log("onBlackUser", userID)
        let req: IBlackReq = {
            uid: userID
        }
        StrongRelation.getInstance().black(req).then(({ err, resp }) => {
            if (!err) {
                this.initFollowList()
            }
        })
    }

}