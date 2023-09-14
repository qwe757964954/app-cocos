import { IFuzzySearchUsersReq } from "idl/tss/hall/userinfo.v1";
import { Gateway } from "./Gateway";
import { UserRepo } from "./Repo";
import { User } from "./User";
import { Log } from "bos/exports";
import { IProfileGameItem } from "idl/tss/hall/appbff.v1";

class UserMgr {
    private _loginUser:User;
    private _userRepo = new UserRepo();
    private _userGateway = new Gateway()

    get loginUser() { return this._loginUser }

    get loginUid() { return this._loginUser ? this._loginUser.uid : 0}

    setUid(id: number) : User {
        let u = this.getUserByID(id);
        this._loginUser = u;
        return u
    }

    private __getUserByID__(id: number) {
        let u = this._userRepo.getUser(id)
        if (!u) {
            u = new User(id, this)
            this._userRepo.addUser(u)
        }
        return u
    }

    getUserByID(id: number) : User {
        // Log.d("getUserByID", id)
        let u = this.__getUserByID__(id)
        if (!u.isValid() || u.isExpired()) {
            this.refreshUser(u)
        }
        return u
    }

    async refreshUser(user: User) {
        let t = await this._userGateway.getUserInfo(user)
        if (t) {
            user.update(t)
        }
        return user
    }

    async getRandomName(gender: number) {
        let ret = await this._userGateway.getRandNicknameReq(gender)
        return ret
    }

    async fuzzySearchUser(req: IFuzzySearchUsersReq) {
        let ret = await this._userGateway.fuzzySearchUser(req)
        return ret.map((u)=>{
            let user = this.__getUserByID__(u.uid)
            user.update(u)
            return user
        })
    }

    async getProfileGame(uid: number) {
        let ret = await this._userGateway.getProfileGame({uid: uid});
        return ret;
    }
}

export default UserMgr