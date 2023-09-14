import * as orm from "bos/framework/orm/exports";
import { IM } from "../IM";
import { MessageType, MessageStatus, ChatType } from "../config/define";

@orm.Table({ name: "ServerSeq" })
export class ServerSeq extends orm.IEntity {

    @orm.FieldNumber()
    seq: number


    @orm.FieldNumber()
    bat: number
}


@orm.Table({ name: "GroupUser" })
export class GroupUser extends orm.IEntity {

    @orm.FieldNumber()
    groupID: number

    @orm.FieldNumber()
    userID: number

    @orm.FieldString()
    alias: string

    @orm.FieldNumber()
    roleLevel: number

    @orm.FieldNumber()
    muteExpireAt: number

    @orm.FieldNumber()
    createdAt: number

    @orm.FieldNumber()
    updatedAt: number

    @orm.FieldNumber()
    deletedAt: number

    @orm.FieldString()
    extra: string

}


@orm.Table({ name: "GroupUserHash" })
export class GroupUserHash extends orm.IEntity {

    @orm.FieldNumber({unique:true})
    groupID: number

    @orm.FieldNumber()
    createdAt: number

    @orm.FieldNumber()
    expireAt: number

    @orm.FieldString()
    hash: string

}

@orm.Table({ name: "KVTable" })
export class KVTable extends orm.Entity {
    @orm.FieldString({ primary: true })
    key: string

    @orm.FieldString()
    value: string
}


@orm.Table({ name: "Meeting" })
export class Meeting extends orm.IEntity {

    @orm.FieldString()
    roomID: string

    @orm.FieldNumber()
    mediaMode: number

    @orm.FieldNumber()
    chatType: number

    @orm.FieldString()
    sessionID: string

    @orm.FieldNumber()
    createdAt: number

    @orm.FieldNumber()
    status: number

    @orm.FieldNumber()
    reason: number

    @orm.FieldString()
    extra: string
}

@orm.Table({ name: "ApplyJoinGroup" })
export class ApplyJoinGroup extends orm.IEntity {
    // 申请ID
    @orm.FieldString()
    applyID: string

    // 申请要加入的群ID
    @orm.FieldNumber()
    groupID: number

    // 申请者ID
    @orm.FieldNumber()
    applyUserID: number

    // 群申请附带消息
    @orm.FieldString()
    applyMsg: string

    //  创建时间
    @orm.FieldNumber()
    createdAt: number

    //  过期时间
    @orm.FieldNumber()
    expiredAt: number

    // 处理结果附带信息
    @orm.FieldString()
    processMsg: string

    //  状态
    @orm.FieldNumber()
    result: number
}