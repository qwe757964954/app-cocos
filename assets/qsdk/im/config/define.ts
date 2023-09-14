import { MessageSysAddGroupUser, MessageSysChangeGroupOwner, MessageSysGroupChangeInfo, MessageSysGroupCreated, MessageSysGroupSetRole, MessageSysGroupUserInfoChange, MessageSysInviteGroupUser, MessageSysMessageUpdate, MessageSysRemoveGroupUser, MessageSysSendMessageRejected, MessageSysUpdateGroupAnnouncement, MessageSysUpdateGroupName } from "idl/mp/common/social.im";

export interface SendMessageOption {
    buffer: ArrayBuffer;
    info?: any;
}
export enum ChatType {

    Single = 0,

    Group = 1,

    Official = 3,

    Channel = 4,

}

export enum FromType {

    FromTypeUser = 0,

    FromTypeOfficial = 3,

}

export enum GroupRole {

    GroupRoleUnknown = 0,

    GroupRoleOwner = 1,

    GroupRoleAdmin = 2,

    GroupRoleMember = 3,

}

export enum MessageType {

    Ignore = -1,

    Text = 0,

    Image = 7,

    Voice = 8,

    Video = 9,

    File = 10,

    Quote = 5,

    Revoked = 6,

    List = 11,

    Edit = 12,

    Meeting = 20,

    MeetingSignaling = 21,

    Merger = 30,

    Card = 40,

    Custom = 100,

    Sys = 101,

}

export enum CallingAction {

    Unknown = 0,

    Invite = 1,

    Reject = 2,

    Accept = 3,

    Leave = 4,

}



export enum CallingFinishReason {

    ReasonUnknown = 0,

    ReasonCancel = 1,

    ReasonReject = 2,

    ReasonTimeOut = 3,

    ReasonBusy = 4,

    ReasonHangUp = 5,

    ReasonException = 6,

}

export enum MediaMode {

    MediaModeUnknown = 0,

    MediaModeAudio = 1,

    MediaModeVideo = 2,

    MediaModeVideoAndAudio = 3,

}

export enum SysCMD {

    SysCmdUnknown = 0,

    MessageBegin = 1001,

    InboxNewMessage = 1002,

    SendMessageRejected = 1003,

    MessageDel = 1004,

    MessageUpdate = 1005,

    MessageEnd = 2000,

    GroupBegin = 5001,

    GroupCreated = 5002,

    AddGroupUser = 5003,

    RemoveGroupUser = 5004,

    UpdateGroupAnnouncement = 5005,

    UpdateGroupName = 5006,

    ChangeGroupOwner = 5008,

    GroupSetRole = 5009,

    GroupChangeInfo = 5010,

    InviteGroupUser = 5011,

    GroupUserInfoChange = 5012,

    GroupEnd = 7001,

    RelateBegin = 7002,

    RelateApplyAccept = 7003,

    RelateEnd = 8000,

}

export enum GroupJoinType {

    GroupJoinTypeDirectly = 0,

    GroupJoinTypeApply = 1,

}

export enum MessageStatus {
    // 成功
    Success = 0,

    // 发送中
    Sending = 1,

    // 发送失败
    Failure = 2,

    // 撤回
    Revoked = 3,

    // 删除
    Deleted = 1001,

    // 不显示
    NoShow = 2001
}

export enum GroupChangeInfoType {
    GroupChangeInfoTypeUnknown = 0,
    GroupChangeInfoTypeName = 1,
    GroupChangeInfoTypeAnnouncement = 2,
    GroupChangeInfoTypeMark = 3,
    GroupChangeInfoTypeExtra = 4,
    GroupChangeInfoTypeJoinStrategy = 5,
}


export const SysCMDConfig = {
    [SysCMD.AddGroupUser]: MessageSysAddGroupUser,
    [SysCMD.RemoveGroupUser]: MessageSysRemoveGroupUser,
    [SysCMD.GroupCreated]: MessageSysGroupCreated,
    [SysCMD.UpdateGroupName]: MessageSysUpdateGroupName,
    [SysCMD.UpdateGroupAnnouncement]: MessageSysUpdateGroupAnnouncement,
    [SysCMD.ChangeGroupOwner]: MessageSysChangeGroupOwner,
    [SysCMD.GroupSetRole]: MessageSysGroupSetRole,
    [SysCMD.SendMessageRejected]: MessageSysSendMessageRejected,
    [SysCMD.GroupChangeInfo]: MessageSysGroupChangeInfo,
    [SysCMD.InviteGroupUser]: MessageSysInviteGroupUser,
    [SysCMD.MessageUpdate]: MessageSysMessageUpdate,
    [SysCMD.GroupUserInfoChange]: MessageSysGroupUserInfoChange
}


export const IMEvent = {
    ON_RECEIVE_MESSAGE: "ON_RECEIVE_MESSAGE",
    ON_SYNC_PAGE_MESSAGE_FINISH: "ON_SYNC_PAGE_MESSAGE_FINISH",
    ON_PREPARE_SEND_MESSAGE: "ON_PREPARE_SEND_MESSAGE",
    ON_NOTIFY_GROUP_APPLY_CHANGE: "ON_NOTIFY_GROUP_APPLY_CHANGE",
    ON_NOTIFY_GROUP_APPLY_SYNC_FINISH: "ON_NOTIFY_GROUP_APPLY_SYNC_FINISH",
    ON_NOTIFY_SYNC_GROUP_USER: "ON_NOTIFY_SYNC_GROUP_USER",


    ON_CREATE_GROUP:"ON_CREATE_GROUP",
    ON_ADD_GROUP_USER:"ON_ADD_GROUP_USER",
    ON_REMOVE_GROUP_USER:"ON_REMOVE_GROUP_USER",
    ON_GROUP_NAME_CHANGE:"ON_GROUP_NAME_CHANGE",
    ON_GROUP_INFO_CHANGE:"ON_GROUP_INFO_CHANGE",
    ON_INVITE_GROUP_USER:"ON_INVITE_GROUP_USER",
}