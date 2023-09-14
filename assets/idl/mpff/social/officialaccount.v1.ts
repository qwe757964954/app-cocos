import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  CallbackAfterSendMsgReq as mpff_social_callback_im_v2_CallbackAfterSendMsgReq,ICallbackAfterSendMsgReq as mpff_social_callback_im_v2_ICallbackAfterSendMsgReq ,  CallbackAfterSendMsgResp as mpff_social_callback_im_v2_CallbackAfterSendMsgResp,ICallbackAfterSendMsgResp as mpff_social_callback_im_v2_ICallbackAfterSendMsgResp ,  CallbackAfterItemQueryReq as mpff_social_callback_im_v2_CallbackAfterItemQueryReq,ICallbackAfterItemQueryReq as mpff_social_callback_im_v2_ICallbackAfterItemQueryReq ,  CallbackAfterItemQueryResp as mpff_social_callback_im_v2_CallbackAfterItemQueryResp,ICallbackAfterItemQueryResp as mpff_social_callback_im_v2_ICallbackAfterItemQueryResp ,  } from "idl/mpff/social/callback/im.v2"
export enum Code {  
    CodeOK = 0,
}
export enum MenuFunctionType {  
    MenuFunctionTypeNone = 0,  
    MenuFunctionTypeSubMenu = 1,  
    MenuFunctionTypeMenuQuery = 2,  
    MenuFunctionTypeURL = 3,
}
export interface IOfficialAccountConfig {
    isSessionTop?: boolean|null
    sendMsgInterval?: number|null
}
@protobuf.Type.d("mpff_social_officialaccount_v1_OfficialAccountConfig")
export class OfficialAccountConfig extends protobuf.Message<IOfficialAccountConfig> {
    constructor(properties: Properties<IOfficialAccountConfig>) {
        super(properties);
        if (properties) {
            if (properties.isSessionTop) { this.isSessionTop = properties.isSessionTop }
            if (properties.sendMsgInterval) { this.sendMsgInterval = properties.sendMsgInterval }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public isSessionTop?: boolean|null = false
    @protobuf.Field.d(2, "int32", "optional", 0)
    public sendMsgInterval?: number|null = 0
}
export interface IOfficialAccountInfo {
    id?: string|null
    chatID?: number|null
    name?: string|null
    avatar?: string|null
    description?: string|null
}
@protobuf.Type.d("mpff_social_officialaccount_v1_OfficialAccountInfo")
export class OfficialAccountInfo extends protobuf.Message<IOfficialAccountInfo> {
    constructor(properties: Properties<IOfficialAccountInfo>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.chatID) { this.chatID = properties.chatID }
            if (properties.name) { this.name = properties.name }
            if (properties.avatar) { this.avatar = properties.avatar }
            if (properties.description) { this.description = properties.description }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "int64", "optional", 0)
    public chatID?: number|null = 0
    @protobuf.Field.d(3, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(4, "string", "optional", )
    public avatar?: string|null = ""
    @protobuf.Field.d(5, "string", "optional", )
    public description?: string|null = ""
}
export interface IOfficialAccount {
    info?: IOfficialAccountInfo
    config?: IOfficialAccountConfig
}
@protobuf.Type.d("mpff_social_officialaccount_v1_OfficialAccount")
export class OfficialAccount extends protobuf.Message<IOfficialAccount> {
    constructor(properties: Properties<IOfficialAccount>) {
        super(properties);
        if (properties) {
            if (properties.info) { this.info = OfficialAccountInfo.create(properties.info) as any }
            if (properties.config) { this.config = OfficialAccountConfig.create(properties.config) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_officialaccount_v1_OfficialAccountInfo", "optional")
    public info?: OfficialAccountInfo|null
    @protobuf.Field.d(2, "mpff_social_officialaccount_v1_OfficialAccountConfig", "optional")
    public config?: OfficialAccountConfig|null
}
export interface IMenu {
    id?: string|null
    index?: number|null
    name?: string|null
    functionType?: MenuFunctionType|null
    url?: string|null
    subMenu?: IMenu[]
}
@protobuf.Type.d("mpff_social_officialaccount_v1_Menu")
export class Menu extends protobuf.Message<IMenu> {
    constructor(properties: Properties<IMenu>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.index) { this.index = properties.index }
            if (properties.name) { this.name = properties.name }
            if (properties.functionType) { this.functionType = properties.functionType }
            if (properties.url) { this.url = properties.url }
            if (properties.subMenu) { this.subMenu = []; properties.subMenu.forEach((value, index)=>{this.subMenu[index] = Menu.create(properties.subMenu[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(4, "int32", "optional", 0)
    public index?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public name?: string|null = ""
    @protobuf.Field.d(6, MenuFunctionType, "optional", MenuFunctionType.MenuFunctionTypeNone)
    public functionType?: MenuFunctionType|null = MenuFunctionType.MenuFunctionTypeNone
    @protobuf.Field.d(7, "string", "optional", )
    public url?: string|null = ""
    @protobuf.Field.d(9, "mpff_social_officialaccount_v1_Menu", "repeated")
    public subMenu?: Menu[] = []
}
export interface IOfficialAccountMenus {
    id?: string|null
    menus?: IMenu[]
}
@protobuf.Type.d("mpff_social_officialaccount_v1_OfficialAccountMenus")
export class OfficialAccountMenus extends protobuf.Message<IOfficialAccountMenus> {
    constructor(properties: Properties<IOfficialAccountMenus>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.menus) { this.menus = []; properties.menus.forEach((value, index)=>{this.menus[index] = Menu.create(properties.menus[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(6, "mpff_social_officialaccount_v1_Menu", "repeated")
    public menus?: Menu[] = []
}
export interface IListReq {
}
@protobuf.Type.d("mpff_social_officialaccount_v1_ListReq")
export class ListReq extends protobuf.Message<IListReq> {
    constructor(properties: Properties<IListReq>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface IListResp {
    list?: IOfficialAccount[]
}
@protobuf.Type.d("mpff_social_officialaccount_v1_ListResp")
export class ListResp extends protobuf.Message<IListResp> {
    constructor(properties: Properties<IListResp>) {
        super(properties);
        if (properties) {
            if (properties.list) { this.list = []; properties.list.forEach((value, index)=>{this.list[index] = OfficialAccount.create(properties.list[index]) as any})}
        }
	}
    @protobuf.Field.d(1, "mpff_social_officialaccount_v1_OfficialAccount", "repeated")
    public list?: OfficialAccount[] = []
}
export interface IGetByChatReq {
    chatID?: number|null
}
@protobuf.Type.d("mpff_social_officialaccount_v1_GetByChatReq")
export class GetByChatReq extends protobuf.Message<IGetByChatReq> {
    constructor(properties: Properties<IGetByChatReq>) {
        super(properties);
        if (properties) {
            if (properties.chatID) { this.chatID = properties.chatID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public chatID?: number|null = 0
}
export interface IGetResp {
    officialAccount?: IOfficialAccount
}
@protobuf.Type.d("mpff_social_officialaccount_v1_GetResp")
export class GetResp extends protobuf.Message<IGetResp> {
    constructor(properties: Properties<IGetResp>) {
        super(properties);
        if (properties) {
            if (properties.officialAccount) { this.officialAccount = OfficialAccount.create(properties.officialAccount) as any }
        }
	}
    @protobuf.Field.d(1, "mpff_social_officialaccount_v1_OfficialAccount", "optional")
    public officialAccount?: OfficialAccount|null
}
export interface IGetMenusByChatReq {
    chatID?: number|null
}
@protobuf.Type.d("mpff_social_officialaccount_v1_GetMenusByChatReq")
export class GetMenusByChatReq extends protobuf.Message<IGetMenusByChatReq> {
    constructor(properties: Properties<IGetMenusByChatReq>) {
        super(properties);
        if (properties) {
            if (properties.chatID) { this.chatID = properties.chatID }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public chatID?: number|null = 0
}
export interface IGetMenusResp {
    menus?: IOfficialAccountMenus
}
@protobuf.Type.d("mpff_social_officialaccount_v1_GetMenusResp")
export class GetMenusResp extends protobuf.Message<IGetMenusResp> {
    constructor(properties: Properties<IGetMenusResp>) {
        super(properties);
        if (properties) {
            if (properties.menus) { this.menus = OfficialAccountMenus.create(properties.menus) as any }
        }
	}
    @protobuf.Field.d(6, "mpff_social_officialaccount_v1_OfficialAccountMenus", "optional")
    public menus?: OfficialAccountMenus|null
}
export interface IMenuQueryReq {
    officialAccountID?: string|null
    chatID?: number|null
    menuID?: string|null
}
@protobuf.Type.d("mpff_social_officialaccount_v1_MenuQueryReq")
export class MenuQueryReq extends protobuf.Message<IMenuQueryReq> {
    constructor(properties: Properties<IMenuQueryReq>) {
        super(properties);
        if (properties) {
            if (properties.officialAccountID) { this.officialAccountID = properties.officialAccountID }
            if (properties.chatID) { this.chatID = properties.chatID }
            if (properties.menuID) { this.menuID = properties.menuID }
        }
	}
    @protobuf.Field.d(3, "string", "optional", )
    public officialAccountID?: string|null = ""
    @protobuf.Field.d(4, "int64", "optional", 0)
    public chatID?: number|null = 0
    @protobuf.Field.d(5, "string", "optional", )
    public menuID?: string|null = ""
}
export interface IMenuQueryResp {
}
@protobuf.Type.d("mpff_social_officialaccount_v1_MenuQueryResp")
export class MenuQueryResp extends protobuf.Message<IMenuQueryResp> {
    constructor(properties: Properties<IMenuQueryResp>) {
        super(properties);
        if (properties) {
        }
	}
}
export interface ICmdReq {
    id?: string|null
    cmd?: string|null
    data?: Uint8Array
}
@protobuf.Type.d("mpff_social_officialaccount_v1_CmdReq")
export class CmdReq extends protobuf.Message<ICmdReq> {
    constructor(properties: Properties<ICmdReq>) {
        super(properties);
        if (properties) {
            if (properties.id) { this.id = properties.id }
            if (properties.cmd) { this.cmd = properties.cmd }
            if (properties.data) { this.data = properties.data }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public id?: string|null = ""
    @protobuf.Field.d(2, "string", "optional", )
    public cmd?: string|null = ""
    @protobuf.Field.d(3, "bytes", "optional", [])
    public data?: Uint8Array
}
export interface ICmdResp {
}
@protobuf.Type.d("mpff_social_officialaccount_v1_CmdResp")
export class CmdResp extends protobuf.Message<ICmdResp> {
    constructor(properties: Properties<ICmdResp>) {
        super(properties);
        if (properties) {
        }
	}
}
class $officialaccountService extends RpcService {
    async List(req: IListReq, params?: RpcParams) : Promise<{err:number, resp:IListResp}> {
        let data = ListReq.create(req)
        this.onBeforeReq("List", data, params)
        const buffer = ListReq.encode(data).finish()
        let [err, pack] = await this.call("List", buffer, params)
        if (err) {
            this.onBeforeResp("List", err)
            return {err: err, resp: null}
        } else {
            let resp = ListResp.decode(pack) as any
            this.onBeforeResp("List", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetByChat(req: IGetByChatReq, params?: RpcParams) : Promise<{err:number, resp:IGetResp}> {
        let data = GetByChatReq.create(req)
        this.onBeforeReq("GetByChat", data, params)
        const buffer = GetByChatReq.encode(data).finish()
        let [err, pack] = await this.call("GetByChat", buffer, params)
        if (err) {
            this.onBeforeResp("GetByChat", err)
            return {err: err, resp: null}
        } else {
            let resp = GetResp.decode(pack) as any
            this.onBeforeResp("GetByChat", err, resp)
            return {err: null, resp: resp}
        }
    }
    async GetMenusByChat(req: IGetMenusByChatReq, params?: RpcParams) : Promise<{err:number, resp:IGetMenusResp}> {
        let data = GetMenusByChatReq.create(req)
        this.onBeforeReq("GetMenusByChat", data, params)
        const buffer = GetMenusByChatReq.encode(data).finish()
        let [err, pack] = await this.call("GetMenusByChat", buffer, params)
        if (err) {
            this.onBeforeResp("GetMenusByChat", err)
            return {err: err, resp: null}
        } else {
            let resp = GetMenusResp.decode(pack) as any
            this.onBeforeResp("GetMenusByChat", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MenuQuery(req: IMenuQueryReq, params?: RpcParams) : Promise<{err:number, resp:IMenuQueryResp}> {
        let data = MenuQueryReq.create(req)
        this.onBeforeReq("MenuQuery", data, params)
        const buffer = MenuQueryReq.encode(data).finish()
        let [err, pack] = await this.call("MenuQuery", buffer, params)
        if (err) {
            this.onBeforeResp("MenuQuery", err)
            return {err: err, resp: null}
        } else {
            let resp = MenuQueryResp.decode(pack) as any
            this.onBeforeResp("MenuQuery", err, resp)
            return {err: null, resp: resp}
        }
    }
    async Cmd(req: ICmdReq, params?: RpcParams) : Promise<{err:number, resp:ICmdResp}> {
        let data = CmdReq.create(req)
        this.onBeforeReq("Cmd", data, params)
        const buffer = CmdReq.encode(data).finish()
        let [err, pack] = await this.call("Cmd", buffer, params)
        if (err) {
            this.onBeforeResp("Cmd", err)
            return {err: err, resp: null}
        } else {
            let resp = CmdResp.decode(pack) as any
            this.onBeforeResp("Cmd", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpffIMCallbackAfterSendMsg(req: mpff_social_callback_im_v2_ICallbackAfterSendMsgReq, params?: RpcParams) : Promise<{err:number, resp:mpff_social_callback_im_v2_ICallbackAfterSendMsgResp}> {
        let data = mpff_social_callback_im_v2_CallbackAfterSendMsgReq.create(req)
        this.onBeforeReq("MpffIMCallbackAfterSendMsg", data, params)
        const buffer = mpff_social_callback_im_v2_CallbackAfterSendMsgReq.encode(data).finish()
        let [err, pack] = await this.call("MpffIMCallbackAfterSendMsg", buffer, params)
        if (err) {
            this.onBeforeResp("MpffIMCallbackAfterSendMsg", err)
            return {err: err, resp: null}
        } else {
            let resp = mpff_social_callback_im_v2_CallbackAfterSendMsgResp.decode(pack) as any
            this.onBeforeResp("MpffIMCallbackAfterSendMsg", err, resp)
            return {err: null, resp: resp}
        }
    }
    async MpffIMCallbackAfterItemQuery(req: mpff_social_callback_im_v2_ICallbackAfterItemQueryReq, params?: RpcParams) : Promise<{err:number, resp:mpff_social_callback_im_v2_ICallbackAfterItemQueryResp}> {
        let data = mpff_social_callback_im_v2_CallbackAfterItemQueryReq.create(req)
        this.onBeforeReq("MpffIMCallbackAfterItemQuery", data, params)
        const buffer = mpff_social_callback_im_v2_CallbackAfterItemQueryReq.encode(data).finish()
        let [err, pack] = await this.call("MpffIMCallbackAfterItemQuery", buffer, params)
        if (err) {
            this.onBeforeResp("MpffIMCallbackAfterItemQuery", err)
            return {err: err, resp: null}
        } else {
            let resp = mpff_social_callback_im_v2_CallbackAfterItemQueryResp.decode(pack) as any
            this.onBeforeResp("MpffIMCallbackAfterItemQuery", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const officialaccountService = new $officialaccountService({
    name: "mpff.social.officialaccount.v1",
})