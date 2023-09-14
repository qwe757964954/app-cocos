import { EmptyClass, EventTargetExtends, StringUtil, eventSystem, uiMgr } from "bos/exports";
import { UIParams } from "bos/framework/gui/UIMgr";
import { IGroupAnnouncement } from "idl/mp/common/social.im";
import { GetGroupExtraInfoReq, IDisbandGroupReq, IGetGroupExtraInfoReq, IGetGroupReq, ISetGroupAnnouncementReq } from "idl/mpff/social/im.v2";
import { IM } from "qsdk/im/IM";
import { GroupChangeInfoType, GroupJoinType, GroupRole, IMEvent } from "qsdk/im/config/define";
import { Message } from "qsdk/im/core/Message";
import { Session } from "qsdk/im/core/Session";
import { GroupUser } from "qsdk/im/db/Model";
import { SocialChatSettingEvent } from "../../common/src/Define";


export enum GroupUIPage {
    // 设置
    Setting = 0,
    // 修改群信息
    ModifyGroupInfo = 1,
    // 群管理
    Admin = 2,
    // 更换管理员
    ChangeAdministrator = 3,
    // 更换群主
    ChangeOwner = 4,
    // 群申请通过
    GroupApply = 5
}

export class GroupManager extends EventTargetExtends(EmptyClass) {
    private _session: Session = null;

    private _groupRole = GroupRole.GroupRoleMember;

    //所有人员
    private _allIDList: number[] = [];

    // 管理员 --不包括群主
    private _adminIDList: number[] = [];

    // 普通成员 --不包括群主和管理员
    private _memberIDList: number[] = [];

    private _groupUserCount = 0;

    //是否只有群管理员才能修改群权限
    private _isAdminModifyGroupName = false;

    // 群公关相关
    private _announcement: IGroupAnnouncement = {};

    //  群拥有者ID
    private _ownerID = 0;

    // 加入策略
    private _joinStrategy: number = 0;

    // 邀请直接加入
    private _joinType = 0;

    // 群名称
    private _groupName: string = "";
    // 群ID
    private _groupID: number = null;

    // 群别名
    private _groupMark: string = "";

    // 群昵称
    private _alisa: string = "";
    public get alisa(): string {
        return this._alisa;
    }
    public set alisa(value: string) {
        this._alisa = value;
    }

    /**
     *
     */
    constructor() {
        super();

        eventSystem.on(IMEvent.ON_GROUP_INFO_CHANGE, this.onGroupChangeInfo, this)
    }

    private static instance: GroupManager = null
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new (GroupManager)
        }
        return this.instance
    }

    public static openPage(page: GroupUIPage, params?: UIParams) {
        switch (page) {
            case GroupUIPage.Setting:
                uiMgr.loadPage("social@chatSetting/res/prefab/ChatSetting", params)

                break;

            case GroupUIPage.ModifyGroupInfo:
                uiMgr.loadPage("social@chatSetting/res/prefab/GroupInfoView", params)

                break;
            case GroupUIPage.ChangeAdministrator:
                uiMgr.loadPage("social@chatSetting/res/prefab/ChangeAdministratorView", params)

                break;
            case GroupUIPage.ChangeOwner:
                uiMgr.loadPage("social@chatSetting/res/prefab/ChangeOwnerView", params)

                break;
            case GroupUIPage.Admin:
                uiMgr.loadPage("social@chatSetting/res/prefab/GroupAdminView", params)
                break;

            case GroupUIPage.GroupApply:
                uiMgr.loadPage("social@chatSetting/res/prefab/GroupApplyView", params)
                break;

        }
    }


    reset() {
        this._groupRole = GroupRole.GroupRoleMember;

        //所有人员
        this._allIDList = [];

        // 管理员 --不包括群主
        this._adminIDList = [];

        // 普通成员 --不包括群主和管理员
        this._memberIDList = [];

        this._groupUserCount = 0;

        //是否只有群管理员才能修改群权限
        this._isAdminModifyGroupName = false;

        // 群公关相关
        this._announcement = {};

        //  群拥有者ID
        this._ownerID = 0;

        // 加入策略
        this._joinStrategy = 0;

        // 邀请直接加入
        this._joinType = 0;

        // 群名称
        this._groupName = "";
        // 群ID
        this._groupID = null
        // 群别名
        this._groupMark = "";

        this._alisa = ""
    }




    async initGroup(session: Session) {
        this.reset()

        this._session = session

        if (session.message.isGroup()) {
            // 获取群信息
            let groupID = session.message.toID
            this._groupID = groupID
            let req: IGetGroupExtraInfoReq = {
                groupID: groupID
            }

            // 群公告相关
            let { err, resp } = await IM.getInstance().getGroupExtraInfo(req)
            if (!err) {
                this._announcement = resp.extra?.announcement
            }
            this.processGroup(groupID)

            this.syncGroupUser()
        }
    }

    async processGroup(groupID: number) {
        let req2: IGetGroupReq = {
            groupID: groupID
        }

        let { err, resp } = await IM.getInstance().getGroup(req2)
        if (!err) {
            let group = resp.group
            // console.log("group.extra--->", group.extra)
            let extra = StringUtil.byteBufferToUTF8String(group.extra)
            // console.log("extra--->", extra)

            if (typeof extra === "string" && extra !== "") {
                const extraObj = JSON.parse(extra);
                // Whether only group administrators can modify the group name
                this._isAdminModifyGroupName = extraObj.isAdminModifyGroupName;
            }

            if (group.joinStrategy) {
                this.joinType = group.joinStrategy.joinType
            }

            this._groupName = group.name;
            this._groupUserCount = group.userCount;
        }
    }


    async syncGroupUser() {
        if (!this.groupID) {
            console.log("syncGroupUser------->groupID is null")
            return
        }

        this._allIDList = [];
        this._adminIDList = [];
        this._memberIDList = [];

        let userList: GroupUser[] = await IM.getInstance().listGroupUser(this.groupID)

        for (let index = 0; index < userList.length; index++) {
            let groupUser = userList[index]
            if (groupUser.userID === IM.getInstance().myUid) {
                this.groupRole = groupUser.roleLevel
                this.alisa = groupUser.alias
            }

            if (groupUser.roleLevel === GroupRole.GroupRoleOwner) {
                console.log("群主ID", groupUser.userID)
                this.ownerID = groupUser.userID;
                this.allIDList.unshift(groupUser.userID);
            } else {
                this.allIDList.push(groupUser.userID);
            }

            if (groupUser.roleLevel === GroupRole.GroupRoleAdmin) {
                console.log("群管理ID", groupUser.userID)
                this.adminIDList.push(groupUser.userID);
            }

            if (groupUser.roleLevel === GroupRole.GroupRoleMember) {
                this.memberIDList.push(groupUser.userID);
            }
        }

        console.log("this.allIDList", this.allIDList)
        console.log("this.adminIDList", this.adminIDList)
        console.log("this.memberIDList", this.memberIDList)

        this.groupUserCount = userList.length;
    }



    onGroupChangeInfo(message: Message): void {
        console.log("onGroupChangeInfo----->", message)
        if (!this.session || message.sessionID !== this.session.sessionID) {
            return;
        }
        const content = message.sysContent;
        const changeType = content.changeType;
        if (changeType === GroupChangeInfoType.GroupChangeInfoTypeName) {
            this.groupName = content.name;
        } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeAnnouncement) {
            this.announcement = content.announcement;
        } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeMark) {
            // this.groupMark = content.mark;
            this.groupMark = content.mark
        } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeExtra) {

            let extra = StringUtil.byteBufferToUTF8String(content.extra)

            if (typeof extra === "string" && extra !== "") {
                let extraOjb = JSON.parse(extra);
                // Whether only group administrators can modify the group name
                this.isAdminModifyGroupName = extraOjb.isAdminModifyGroupName;
            }
        } else if (changeType === GroupChangeInfoType.GroupChangeInfoTypeJoinStrategy) {
            this.joinStrategy = content.joinStrategy;
            this.joinType = content.joinStrategy.joinType;
        }
        eventSystem.emit(SocialChatSettingEvent.ON_GROUP_INFO_CHANGE, message)
    }

    isJoinConfirm() {
        return this.joinType === GroupJoinType.GroupJoinTypeApply
    }


    async isGroupOwner() {
        await this.syncGroupUser()
        return this.groupRole == GroupRole.GroupRoleOwner
    }

    async isGroupAdmin() {
        await this.syncGroupUser()
        return this.groupRole == GroupRole.GroupRoleAdmin
    }

    async isGroupMember() {
        await this.syncGroupUser()
        return this.groupRole == GroupRole.GroupRoleMember
    }


    async disbandGroup() {
        let req: IDisbandGroupReq = {
            groupID: this._groupID
        }

        return IM.getInstance().disbandGroup(req)
    }

    async submitAnnouncement(text: string) {
        let req: ISetGroupAnnouncementReq = {
            groupID: this.groupID,
            announcement: text
        }

        return IM.getInstance().setGroupAnnouncement(req)
    }




    public get groupRole() {
        return this._groupRole;
    }
    public set groupRole(value) {
        this._groupRole = value;
    }

    public get allIDList(): number[] {
        return this._allIDList;
    }
    public set allIDList(value: number[]) {
        this._allIDList = value;
    }
    public get adminIDList(): number[] {
        return this._adminIDList;
    }
    public set adminIDList(value: number[]) {
        this._adminIDList = value;
    }

    public get memberIDList(): number[] {
        return this._memberIDList;
    }
    public set memberIDList(value: number[]) {
        this._memberIDList = value;
    }
    public get groupUserCount() {
        return this._groupUserCount;
    }
    public set groupUserCount(value) {
        this._groupUserCount = value;
    }

    public get isAdminModifyGroupName() {
        return this._isAdminModifyGroupName;
    }
    public set isAdminModifyGroupName(value) {
        this._isAdminModifyGroupName = value;
    }
    public get announcement(): IGroupAnnouncement {
        return this._announcement;
    }
    public set announcement(value: IGroupAnnouncement) {
        this._announcement = value;
    }
    public get ownerID() {
        return this._ownerID;
    }
    public set ownerID(value) {
        this._ownerID = value;
    }

    public get joinStrategy(): number {
        return this._joinStrategy;
    }
    public set joinStrategy(value: number) {
        this._joinStrategy = value;
    }

    public get joinType() {
        return this._joinType;
    }
    public set joinType(value) {
        this._joinType = value;
    }

    public get groupName(): string {
        return this._groupName;
    }
    public set groupName(value: string) {
        this._groupName = value;
    }

    public get groupMark(): string {
        return this._groupMark;
    }
    public set groupMark(value: string) {
        this._groupMark = value;
    }

    public get session(): Session {
        return this._session;
    }
    public set session(value: Session) {
        this._session = value;
    }
    public get groupID(): number {
        return this._groupID;
    }
    public set groupID(value: number) {
        this._groupID = value;
    }
}