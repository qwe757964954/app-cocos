import { App } from 'app/App';
import { EmptyClass, EventTargetExtends } from 'bos/utils/ClassUtils';
import { PropType } from 'idl/tss/common/common_define';
import {
    ActivateUserBuffReq, BuffService, BuffType, GetUserBuffReq, IBatchGetUserBuffReq,
    ICalcItemsAddByBuffReq, IGetUserBuffReq, IListBuffReq, IListUserBuffForAdminReq, ISearchUserBuffReq, IUpdateBuffReq, SearchUserBuffReq, UserBuff
} from 'idl/tss/hall/buff.v3';
import { BuffCondition } from 'idl/tss/hall/common/buff';
import { IActivateUserBuffReq, IListUserMergedPropReq, PropService } from 'idl/tss/hall/prop.v4';
class BuffMgr extends EventTargetExtends(EmptyClass) {
    tryCallBack(data: any, ...args: any[]): void {
        if (data == null) {
            console.log("data is nil");
            return;
        }
        if (data.callback == null) {
            console.log("callback is nil");
            return;
        }
        data.callback(...args);
    }

    /**
     * 使用道具
    */
    async UseUserBuff(params: any) {
        let req: GetUserBuffReq = new GetUserBuffReq({
            buffType: BuffType.BuffTypeTracker
        });
        let ret = await this.GetUserBuff(req);
        if (params.cb) {
            params.cb(ret.resp);
        }
    };
    /**
     * 查询道具看底牌buff
    */
    async UseUserPriorityCardBuff(params: any) {
        let req: GetUserBuffReq = new GetUserBuffReq({
            buffType: BuffType.BuffTypePriorityCard
        });
        let ret = await this.GetUserBuff(req);
        if (params.cb) {
            params.cb(ret.resp);
        }
    }
    /**
     * 查询道具记牌器buff
    */
    async UseUserCountCardBuff(params: any) {
        let req: GetUserBuffReq = new GetUserBuffReq({
            buffType: BuffType.BuffTypeTracker
        });
        let ret = await this.GetUserBuff(req);
        if (params.cb) {
            params.cb(ret.resp);
        }
    }
    /**
     * 列出玩家背包buff道具(公共房间buff使用，不要轻易改动)
    */
    async ListUserBuff(params: any) {
        let req: IListUserMergedPropReq = {
            uid: App.userMgr.loginUid,
            types: [
                PropType.PropTypeBuffTracker, PropType.PropTypeMungAddBuffCard
            ]
        };
        let ret = await PropService.ListUserMergedProp(req);
        if (params.cb) {
            params.cb(ret.resp);
        }
    }
    /**
     * 判断buff道具是否立即生效(公共房间buff使用，不要轻易改动)
    */
    propIsImmediateEffect(prop: any) {
        if (prop && prop.type && prop.type == PropType.PropTypeMungAddBuffCard) {
            return true;
        }
        return false;
    }
    /**
     * 主动使用Buff(公共房间buff使用，不要轻易改动)
    */
    async ActivateUserBuff(params: any) {
        if (!params) {
            return;
        }
        if (!params.prop) {
            return;
        }
        let prop = params.prop;
        let req: IActivateUserBuffReq = {
            pType: prop.type,
            propID: prop.propID,
            expireAt: prop.expireAt,
            uid: App.userMgr.loginUid
        };
        let ret = await PropService.ActivateUserBuff(req);
        let vt: boolean = false;
        let isBuffTypeTracker: boolean = false;
        if (ret.resp) {
            vt = true;
            if (prop.type == BuffType.BuffTypeTracker) {
                isBuffTypeTracker = true;
            }
        }
        if (params.cb) {
            params.cb(vt, isBuffTypeTracker);
        }
    }
    /**
     * 判断用户是否有忘记用的buff道具（绿豆加成卡多种数值的只算一种）(公共房间buff使用，不要轻易改动)
    */
    isBuffAvailable(params: any) {
        let checkList = {
            [BuffType.BuffTypeTracker]: {
                using: false, propType: PropType.PropTypeBuffTracker, gameIDs: ["landlord"]
            },
            [BuffType.BuffTypeMungAddCard]: {
                using: false, propType: PropType.PropTypeMungAddBuffCard
            }
        };
        // 需要等GameMgr 存在接口时再实现
    }
    /**
     * 跟进道具类型请求用户buff(公共房间buff使用，不要轻易改动)
    */
    async getUserBuffByPorpType(params: any) {
        const config: { [key: string]: any; } = {
            [PropType.PropTypeBuffTracker]: BuffType.BuffTypeTracker,
            [PropType.PropTypeMungAddBuffCard]: BuffType.BuffTypeMungAddCard
        };
        const buffType = config[params.type];
        let req: ISearchUserBuffReq = {};
        let ret = await this.SearchUserBuff(req);
        if (ret.resp) {
            let result = [];
            for (const [index, value] of ret.resp.buffs.entries()) {
                if (value.type === buffType) {
                    result.push(value);
                }
            }
            params.cb(result);
        } else {
            params.cb([]);
        }
    }
    /**
     * 获取用户当前的buffers
    */
    async getUserBuffer(cb: Function) {
        let req: ISearchUserBuffReq = {};
        let ret = await this.SearchUserBuff(req);
        let def: UserBuff[] = [];
        if (cb) {
            cb(ret.resp ? true : false, ret.resp ? ret.resp.buffs : def);
        }
    }
    /**
     * 是否有适用匹配赛的加成卡buffer
    */
    hasMatchingBalanceAddCardBuffer(cb: Function) {
        this.getUserBuffer((value: boolean, buffers: UserBuff[]) => {
            if (value) {
                let buff: UserBuff;
                for (const [i, v] of Object.entries(buffers || {})) {
                    if (v.type == BuffType.BuffTypeBalanceAddCard) {
                        const buffExtraConf = v.buffExtraConf;
                        if (buffExtraConf) {
                            const buffConditions = buffExtraConf.buffCondition;
                            if (buffConditions) {
                                let has = false;
                                for (const [i1, v1] of Object.entries(buffConditions)) {
                                    if (v1 === BuffCondition.BuffConditionMateMatch) {
                                        has = true;
                                        break;
                                    }
                                }
                                if (has) {
                                    buff = v;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (cb) {
                    cb(buff);
                }
            }
        });
    }
    /**
     * 是否有适用大奖赛的加成卡buffer
    */
    hasRegularBalanceAddCardBuffer(cb: Function) {
        this.getUserBuffer((value: boolean, buffers: UserBuff[]) => {
            if (value) {
                let buff: UserBuff;
                for (const [i, v] of Object.entries(buffers || {})) {
                    if (v.type == BuffType.BuffTypeBalanceAddCard) {
                        const buffExtraConf = v.buffExtraConf;
                        if (buffExtraConf) {
                            const buffConditions = buffExtraConf.buffCondition;
                            if (buffConditions) {
                                let has = false;
                                for (const [i1, v1] of Object.entries(buffConditions)) {
                                    if (v1 === BuffCondition.BuffConditionMatch) {
                                        has = true;
                                        break;
                                    }
                                }
                                if (has) {
                                    buff = v;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (cb) {
                    cb(buff);
                }
            }
        });
    }

    async hasBuff(buffType: number, cb: Function) {
        let req: IGetUserBuffReq = {
            buffType: buffType
        };
        let def: UserBuff[] = [];
        let ret = await this.GetUserBuff(req);
        if (cb) {
            cb(ret.resp ? true : false, ret.resp.buff || def);
        }
    }

    // 拉取用户buff列表
    async SearchUserBuff(req: ISearchUserBuffReq) {
        return await BuffService.SearchUserBuff(req);
    }

    // 获取buff
    async GetUserBuff(req: IGetUserBuffReq) {
        return await BuffService.GetUserBuff(req);
    }

    // 激活用户buff
    async activateUserBuff(req: ActivateUserBuffReq) {
        return await BuffService.ActivateUserBuff(req);
    }

    async UpdateBuff(req: IUpdateBuffReq) {
        return await BuffService.UpdateBuff(req);
    }

    async ListBuff(req: IListBuffReq) {
        return await BuffService.ListBuff(req);
    }

    async ListUserBuffForAdmin(req: IListUserBuffForAdminReq) {
        return await BuffService.ListUserBuffForAdmin(req);
    }

    async BatchGetUserBuff(req: IBatchGetUserBuffReq) {
        return await BuffService.BatchGetUserBuff(req);
    }

    async CalcItemsAddByBuff(req: ICalcItemsAddByBuffReq) {
        return await BuffService.CalcItemsAddByBuff(req);
    }

}

const buffMgr = new BuffMgr();
export { buffMgr };
