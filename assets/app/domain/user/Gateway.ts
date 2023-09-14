import { User } from "./User";
import { Log } from "bos/exports";
import { QueryQueue } from "bos/exports";
import { Appbff, IGetProfileGameReq } from "idl/tss/hall/appbff.v1";
import { BatchGetUserReq, IFuzzySearchUsersReq, IUser, Userinfo } from "idl/tss/hall/userinfo.v1";

export class Gateway {
    private queryQueue = new QueryQueue({
        delegate: {
            batchQuery: async (keys: number[])=>{
                let values = await this.batchGetUserInfo(keys)
                if (values) {
                    let t = new Map()
                    values.forEach(e => {
                        t.set(e.uid, e)
                    })
                    return t
                }
            }
        },
        intervalMs: 100,
    })

    constructor() {
        this.queryQueue.run()
    }

    async getUserInfo(user: User) {
        return new Promise((resolve)=>{
            this.queryQueue.add({
                key: user.uid,
                cb: resolve,
            })
        })
    }

    async batchGetUserInfo(users: number[]) {
        let ret = await Userinfo.BatchGetUser(({
            uids: users,
        }))
        Log.d("batchGetUserInfo...", ret)
        if (ret.err) {
            return
        }
        return ret.resp.users
    }

    async getRandNicknameReq(gender: number) {
        let ret = await Userinfo.GetRandNickname(({
            gender
        }))
        Log.d("getRandNicknameReq...", ret)
        if (ret.err) {
            return
        }
        return ret.resp.nickname
    }

    async fuzzySearchUser(req: IFuzzySearchUsersReq) {
        let ret = await Userinfo.FuzzySearchUsers(req)
        Log.d("fuzzySearchUser...", ret)
        if (ret.err) {
            return []
        }
        return ret.resp?.users ?? []
    }

    async getProfileGame(req: IGetProfileGameReq) {
        let ret = await Appbff.GetProfileGame(req);
        Log.d("getProfileGame...", ret)
        if (ret.err) {
            return []
        }
        return ret.resp?.items ?? []
    }
}