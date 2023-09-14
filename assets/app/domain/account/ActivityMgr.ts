import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { ActivityHub,IGetUserActivityByTypeReq } from 'idl/tss/hall/activityhub.v2';
import { Conf, GetAppConfReq, IGetAppConfReq } from 'idl/tss/hall/appconf.v1';
import { ActivityType } from 'idl/tss/hall/common/activity';
import { Log, StorageUtil } from 'bos/exports';
export class ActivityMgr extends EventTargetExtends(EmptyClass){
    private static instance: ActivityMgr | null = null;
    public constructor() { 
        super()
        // this.resetBindInfo();
        // this.ErrorCode = Account.getInstance().service.Code;
    }
    public static getInstance(): ActivityMgr {
        if (!ActivityMgr.instance) {
            ActivityMgr.instance = new ActivityMgr();
        }
        return ActivityMgr.instance;
    }
    async getUserActivityByType(activityType:ActivityType){
        Log.w(activityType)
        let req: IGetUserActivityByTypeReq = {
            activityType: activityType,
        }
        return await ActivityHub.GetUserActivityByType(req);
    }

    async getAppConf(key:string){
        let updatedAt = StorageUtil.get("UPDATE_AT",false);
        let req: IGetAppConfReq = {
            key:key,
            updatedAt:updatedAt || 0
        }
        Log.w(req);
        let {err,resp} =  await Conf.GetAppConf(req);
        if (err === null || err === 0) {
            Log.w(resp?.conf?.createdAt);
            StorageUtil.set("UPDATE_AT",resp?.conf?.createdAt);
        }
        return {err,resp};
    }
}