import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export interface IApp {
    appID?: number|null
}
@protobuf.Type.d("mp_v1_App")
export class App extends protobuf.Message<IApp> {
    constructor(properties: Properties<IApp>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
}
export interface IAccount {
    accountID?: number|null
}
@protobuf.Type.d("mp_v1_Account")
export class Account extends protobuf.Message<IAccount> {
    constructor(properties: Properties<IAccount>) {
        super(properties);
        if (properties) {
            if (properties.accountID) { this.accountID = properties.accountID }
        }
	}
    @protobuf.Field.d(2, "int64", "optional", 0)
    public accountID?: number|null = 0
}
export interface IAppUser {
    appID?: number|null
    userID?: number|null
}
@protobuf.Type.d("mp_v1_AppUser")
export class AppUser extends protobuf.Message<IAppUser> {
    constructor(properties: Properties<IAppUser>) {
        super(properties);
        if (properties) {
            if (properties.appID) { this.appID = properties.appID }
            if (properties.userID) { this.userID = properties.userID }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public appID?: number|null = 0
    @protobuf.Field.d(2, "int64", "optional", 0)
    public userID?: number|null = 0
}