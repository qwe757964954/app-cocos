import { IDynamicAssetItems } from "idl/tss/hall/common/assets";
import { GameResultType } from "idl/tss/match_v2/common/common";
import { IDeskUser, IProp, IUser } from "idl/tss/match_v2/common_matematch";
import UserMgr from "../user/UserMgr";
import { App } from "app/App";

export class User implements IDeskUser, IUser {
    uid: number;
    joinTime: number;
    isRobot: boolean;
    isReady: boolean;
    deskID: number;
    sessionID: string;
    seatNo: number;
    ownProp: IProp;
    cup: number
    changeScore?: number|null
    isPrivilege?: boolean|null
    assets?: IDynamicAssetItems[]
    isPunishment?: boolean|null

    constructor(uid: number) {
        this.uid = uid
    }
    
    update(props: Properties<User>) {
        Object.assign(this, props)
    }
}