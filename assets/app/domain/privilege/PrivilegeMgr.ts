import { App } from "app/App";
import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { PBPremiumCardPrivilege } from "./code/code"
import { MemCache } from "bos/exports";
import { Premiumcardprivilege } from "idl/tss/hall/premiumcardprivilege.v1";

export class PrivilegeMgr extends EventTargetExtends(EmptyClass) {

    privilegeCache = new MemCache<number, number>();

    init(){
    }

    //TODO(缓存更新)
    onNotifyAfterDelivery(){

    }

    cleanAllCache(){
        this.privilegeCache.reset()
    }

    cleanCacheByType(type){
        this.privilegeCache.delete(type)
    }

    async getUserPrivilege(type, uid?: number){
        let req = {
            uid : uid ?? App.userMgr.loginUser.uid,
            type : type
        }

        return await Premiumcardprivilege.GetUserPrivilege(req)
    }

    async getHasPrivilege(type : number) : Promise<number> {
        let cacheTimes = this.privilegeCache.get(type)
        if (cacheTimes) {
            return cacheTimes
        } else {
            let result = await this.getUserPrivilege(type)
            if (result.err == null) {
                let remainderTimes = result.resp?.user?.remainderTimes
                let strategyType = result.resp?.user?.conf?.type
                if (strategyType == PBPremiumCardPrivilege.PrivilegeStrategyIdentityVerification) {
                    //TODO(待实现，根据推送更新)
                    // this.privilegeCache.set(type, remainderTimes)
                }
    
                return remainderTimes
            } else {
                return 0
            }
        }
    }
}