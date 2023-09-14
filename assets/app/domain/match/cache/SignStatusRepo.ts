import { MemCache } from "bos/exports"; 
import { MatchMgr } from "../MatchMgr";
import { App } from "app/App";
import { PBRegularCommon } from "../code/code";
import { MatchApi } from "../api/MatchApi";
import { Log } from "bos/base/log/Log";

export class SignStatusRepo {
    private configCache = new MemCache<string, number>();

    _isInit = false

    /*处理重复请求问提 */
    _isReq = false
    _reqCb = []

    init(){
        App.matchMgr.on(MatchMgr.EventType.MatchSignEvent,(data : {isSigned : boolean, preMatchKey : string})=>{
            if (data.isSigned) {
                this.setSignStatus(data.preMatchKey, PBRegularCommon.UserStatusEntry)
            } else {
                this.setSignStatus(data.preMatchKey)
            }
        })
    }

    async initSignStatus(){
        if (!this._isInit) {
            if (this._isReq) {
                return new Promise((resolve, reject)=>{
                    this._reqCb.push({
                        cb : resolve,
                    })
                })
            } else {
                this._isReq = true
                let result = await MatchApi.getUserSignInfo()
                this._isReq = false
                if (result.err == null) {
                    this._isInit = true
                    let preMatchKeys = result.resp?.preMatchKeys
                    if (preMatchKeys){
                        for (let index = 0; index < preMatchKeys.length; index++) {
                            this.setSignStatus(preMatchKeys[index], PBRegularCommon.UserStatusEntry)                        
                        }
                    }
                } else {
                    console.error("initSignStatus getUserSignInfo err", result)
                }

                for (let index = 0; index < this._reqCb.length; index++) {
                    const req = this._reqCb[index];
                    if (req.cb){
                        req.cb()
                    }
                }
            }
        }
    }

    async getSignStatus(key : string) {
        if (!this._isInit) {
            await this.initSignStatus()
        }

        let status = this.configCache.get(key)
        if (status) {
            return status
        }
        return null
    }

    setSignStatus(key : string, status ?: number) {
        if (status) {
            this.configCache.set(key, status)
        } else {
            this.configCache.delete(key)
        }
    }
}