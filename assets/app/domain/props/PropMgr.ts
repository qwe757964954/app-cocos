import { EmptyClass, EventTargetExtends } from 'bos/utils/ClassUtils';
import { App } from 'app/App';
import { AlertParams } from 'bos/framework/gui/alertview/src/AlertView';
import { SpriteFrame } from 'cc';
import { resources } from 'cc';
import {
    BuffProp,
    CountCurrentUserPropByCategoryReq,
    IActivatePremiumCardReq, IActivateUserBuffReq, IActivateUserBuffResp, IActivateVipReq, IBatchGetPropReq, ICleanUpUserBadgeReq, ICleanUpUserGiftReq, ICleanUpUserPropBadgeReq, ICleanUpUserPropReq, ICleanUpUserPropV2Req, ICountCurrentUserPropByCategoryReq, ICountUserPropReq, IExpandPropDetailsReq, IGetPropReq, IHasExpiredResReq, IListUserBadgeReq, IListUserResReq, IListUserResV2Req, IOpenGiftReq, IRenameReq, ISendServiceBroadcastReq, ListUserBadgeReq, ListUserResReq, ListUserResResp, ListUserResV2Req,
    PropService, UserProp
} from 'idl/tss/hall/prop.v4';
import { BuffCondition, BuffExtraConf } from 'idl/tss/hall/common/buff';
import { AssetType, PropCategory, PropType } from 'idl/tss/common/common_define';
import { Log } from 'bos/exports';
import { buffMgr } from './BuffMgr';
import { BuffType, UserBuff } from 'idl/tss/hall/buff.v3';
import { UIMgr } from 'bos/framework/gui/UIMgr';
class PropMgr extends EventTargetExtends(EmptyClass) {
    private _propCache = {};
    private coinUnit: SpriteFrame;
    private diamondUnit: SpriteFrame;
    private mungUnit: SpriteFrame;
    constructor() {
        super();
        this.loadDefaultUnit();
    }
    loadDefaultUnit() {
        // resources.load('prop/img_coin', SpriteFrame, null, (err, spriteFrame) => {
        //     if (err) {
        //         console.error(err.message || err);
        //         return;
        //     }
        //     this.coinUnit = spriteFrame;
        // });
        // resources.load('prop/img_diamond', SpriteFrame, null, (err, spriteFrame) => {
        //     if (err) {
        //         console.error(err.message || err);
        //         return;
        //     }
        //     this.diamondUnit = spriteFrame;
        // });
        // resources.load('prop/img_mung', SpriteFrame, null, (err, spriteFrame) => {
        //     if (err) {
        //         console.error(err.message || err);
        //         return;
        //     }
        //     this.mungUnit = spriteFrame;
        // });
    }
    //获取用户道具数量
    async getUserPropNum() {
        let types: number[] = [
            PropType.PropTypeExclusiveVoucher,
            PropType.PropTypeCommonVoucher,
            PropType.PropTypeTopUpVoucher,
            PropType.PropTypeCoupon,
            PropType.PropTypeDeductionCoupon,
            PropType.PropTypeDiscountCoupon,
            PropType.PropTypeRegularMatchTicket,
            PropType.PropTypeFastMatchTicket,
        ];
        const categories: number[] = [
            PropCategory.PropCategoryNormal,
            PropCategory.PropCategoryInteraction,
            PropCategory.PropCategoryDress,
            PropCategory.PropCategoryGift,
            PropCategory.PropCategoryTicket,
        ];
        const req: CountCurrentUserPropByCategoryReq = new CountCurrentUserPropByCategoryReq({
            uid: this.getMyUID(),
            types: types,
            categories: categories,
        });
        let ret =
            await this.CountCurrentUserPropByCategory(req);
        if (ret.err) {
            return;
        }
        return ret.resp;
    }


    /**
         批量获取道具信息
    @param     table    params
    @param     table    params.props   {id=xxx,assetType=xxx}
    @param     table    params.obj     回调坐落点
    @param     function params.cb      回调函数
    @usage
    local propApi = import("app.srvApi.prop").Api
    propApi:getPropByIDAndType{
        props = {{id=2, assetType=1}},
        obj = self,
        cb = function( props )
        end
    }
    */
    async getPropByIDAndType(params: any) {
        const result: any[] = [];
        const len = params.props.length;
        for (let i = len - 1; i >= 0; i--) {
            const findProp = params.props[i];
            for (const key in this._propCache) {
                const prop = this._propCache[key];
                if (findProp.id === prop.id && findProp.assetType === prop.assetType) {
                    Object.assign(findProp, prop);
                    result.push(findProp);
                    params.props.splice(i, 1);
                }
            }
        }
        const mungData = [];
        const diamondData = [];
        const propData = [];
        const coinData = [];
        const reqPropData = [];
        params.props.forEach((prop) => {
            switch (prop.assetType) {
                case AssetType.AssetTypeMung:
                    mungData.push(prop);
                    break;
                case AssetType.AssetTypeDiamond:
                    diamondData.push(prop);
                    break;
                case AssetType.AssetTypeCoin:
                    coinData.push(prop);
                    break;
                case AssetType.AssetTypeProp:
                    propData.push(prop);
                    reqPropData.push(prop.id);
                    break;
            }
        });

        if (coinData.length > 0) {
            const data = {
                id: -2,
                assetType: AssetType.AssetTypeCoin,
                name: "金币",
                icon: null,
                unit: this.coinUnit || "",
                price: 0,
            };
            this._propCache[-2] = data;
            for (const value of coinData) {
                Object.assign(value, data);
                result.push(value);
            }
        }
        console.log("result== ", result);

        if (mungData.length > 0) {
            const data = {
                id: -1,
                assetType: AssetType.AssetTypeMung,
                name: "绿豆",
                icon: null,
                unit: this.mungUnit || "",
                price: 0,
            };
            this._propCache[-1] = data;
            for (const value of mungData) {
                Object.assign(value, data);
                result.push(value);
            }
        }
        if (diamondData.length > 0) {
            const data = {
                id: 0,
                assetType: AssetType.AssetTypeDiamond,
                name: "钻石",
                icon: null,
                unit: this.diamondUnit || "",
                price: 0,
            };
            this._propCache[0] = data;
            for (const value of diamondData) {
                Object.assign(value, data);
                result.push(value);
            }
        }

        if (reqPropData.length > 0) {
            let ret = await this.BatchGetProp({ ids: reqPropData });
            if (ret.resp) {
                const props = ret.resp.props;
                for (let index = 1; index <= props.length; index++) {
                    const prop = props[index];
                    const baseProp = prop.base || {};

                    for (const value of propData) {
                        if (baseProp.propID === value.id) {
                            const data = {
                                id: baseProp.propID,
                                assetType: AssetType.AssetTypeProp,
                                name: baseProp.name,
                                icon: baseProp.icon,
                                unit: null,
                                price: baseProp.price,
                            };

                            this._propCache[data.id] = data;
                            Object.assign(value, data);
                            result.push(value);
                        }
                    }
                }
            } else {
                propData.forEach((value: any) => {
                    const data = {
                        id: value.id,
                        assetType: AssetType.AssetTypeProp,
                        name: "奖励",
                        icon: "",
                        unit: null,
                        price: 0,
                    };
                    Object.assign(value, data);
                    result.push(value);
                });
            }

            params.cb(result);
        }
    }
    // 根据ID获取道具数量
    async getUserPropNumByID(data: { propID: number; cb?: Function; }) {
        let cb = data.cb;
        let req: ICountUserPropReq = {
            propID: data.propID,
            uid: App.userMgr.loginUid
        };
        let ret = await this.CountUserProp(req);
        if (cb) {
            cb(ret.resp ? ret.resp.totalSize : 0);
        }
    }
    /**
     * 获取根据道具类型获取用户道具数量
    */
    async getUserPropNumByTypes(data?: { types?: PropType[]; cb?: Function; }) {
        if (!data) {
            this.tryCallBack(data, {});
            return;
        }
        let req: ICountUserPropReq = {
            types: data.types,
            uid: App.userMgr.loginUid
        };
        let ret = await this.CountUserProp(req);
        this.tryCallBack(data, ret.resp ? ret.resp.totalSize : 0);
    }

    // 根据类型计算用户道具数量
    async getUserPropNumByType(type: number) {
        let req: ICountUserPropReq = {
            types: [type],
            uid: App.userMgr.loginUid
        };
        let ret = await this.CountUserProp(req);
        if (ret.resp) {
            return ret.resp.totalSize;
        }
        return 0;
    }
    getPropCanExchangePrize() { }
    // 获取道具配置
    async getProp(id: number) {
        let req: IGetPropReq = { id: id };
        let ret = await this.GetProp(req);
        return { ret: ret.resp ? true : false, prop: ret.resp ? ret.resp.prop : {} };
    }
    // 发送全服广播
    async SendServiceBroadcast(data: any) {
        if (!data) {
            this.tryCallBack(data, {});
            return;
        }
        let req: ISendServiceBroadcastReq = {
            propID: data.propID,
            chatId: data.chatId,
            content: data.content,
            expireAt: this.time(),
        };
        let ret = await this.SendServiceBroadcastEx(req);
        let code: number = ret.resp ? 0 : -1;
        this.tryCallBack(data, code);
    }

    containValue(list: any[], value: any): boolean {
        for (const v of list) {
            if (v === value) {
                return true;
            }
        }
        return false;
    }
    // 使用结算加成卡
    activateBalanceAddUserBuff(prop: UserProp, cb: Function, showToast: boolean = false) {
        if (!prop) {
            return;
        }
        if (PropType.PropTypeBalanceAddBuffCard != prop.type) {
            return;
        }
        let buff: BuffProp = prop.buff;
        let buffConditions = [];
        if (buff) {
            let buffExtraConf = buff.buffExtraConf;
            if (buffExtraConf) {
                if (buffExtraConf.buffCondition) {
                    buffConditions = buffExtraConf.buffCondition;
                }
            }
        }

        buffMgr.getUserBuffer((ret: boolean, buffers: UserBuff[]) => {
            buffers = buffers || [];
            console.log("buffers:", buffers);
            let needTips = false;
            for (const [i, v] of Object.entries(buffers)) {
                if (v.type === BuffType.BuffTypeBalanceAddCard) {
                    const buffExtraConf1 = v.buffExtraConf;
                    if (buffExtraConf1) {
                        const buffConditions1 = buffExtraConf1.buffCondition;
                        if (buffConditions1) {
                            for (const [i1, v1] of Object.entries(buffConditions1)) {
                                if (this.containValue(buffConditions, v1)) {
                                    needTips = true;
                                }
                            }
                        }
                    }
                }
            }
            let useBuffer = () => {
                this.activateUserBuff({
                    propID: prop.propID, expireAt: prop.expireAt, cb: (ret: boolean, resp: IActivateUserBuffResp) => {
                        if (ret) {
                            if (showToast) {
                                UIMgr.getInstance().showToast("使用成功");
                            }
                        }
                        if (cb) {
                            cb(ret, resp);
                        }
                    }
                });
            };
            if (needTips) {
                const alertData: AlertParams = {
                    title: "提示",
                    content: "您有使用中的加成卡，再次使用会覆盖之前的加成卡，确认使用吗？",
                    ok: {
                        title: "确定",
                        callback: function () {
                            useBuffer();
                        }
                    }
                };
                UIMgr.getInstance().pushAlert(alertData);
            } else {
                useBuffer();
            }
        });
    }
    // 根据propType列举道具
    async getPropsByTypes(params: any) {
        const cb = params.cb;
        const req: ListUserResReq = new ListUserResReq({
            page: 1,
            pageSize: 100,
            uid: this.getMyUID(),
            types: params.types,
        });
        let prom = await this.ListUserRes(req);
        let ret: boolean = prom.resp ? true : false;
        if (cb) {
            cb(ret, prom.resp && prom.resp.props);
        }
    }

    time() {
        let date = new Date();
        return Math.floor(date.getTime() / 1000);
    }
    // 获取匹配晒结算加成卡
    getBalanceAddCountCardWithMatching(callback: Function) {
        this.getPropsByTypes({
            types: [
                PropType.PropTypeBalanceAddBuffCard
            ],
            cb: (ret: boolean, props: UserProp[]) => {
                const matchingAddCards = [];
                for (const v of props) {
                    const expireAt = v.expireAt ?? 0;
                    const remainingTime = expireAt - this.time();
                    let isExpire = true;
                    if (remainingTime > 0) {
                        isExpire = false;
                    }
                    const buff = v.buff;
                    if (
                        v.type === PropType.PropTypeBalanceAddBuffCard &&
                        buff &&
                        !isExpire
                    ) {
                        const buffExtraConf: BuffExtraConf = buff.buffExtraConf;
                        const buffConditions = buffExtraConf.buffCondition ?? [];
                        let has = false;
                        for (const v1 of buffConditions) {
                            if (v1 === BuffCondition.BuffConditionMateMatch) {
                                has = true;
                                break;
                            }
                        }
                        if (has) {
                            matchingAddCards.push(v);
                        }
                    }
                }
                if (callback) {
                    callback(matchingAddCards);
                }
            }
        });
    }
    // 获取官方赛结算加成卡
    getBalanceAddCountCardWithRegular(callback: Function) {
        this.getPropsByTypes({
            types: [
                PropType.PropTypeBalanceAddBuffCard
            ],
            cb: (ret: boolean, props: UserProp[]) => {
                const regularAddCards = [];
                for (const v of props) {
                    const expireAt = v.expireAt ?? 0;
                    const remainingTime = expireAt - this.time();
                    let isExpire = true;
                    if (remainingTime > 0) {
                        isExpire = false;
                    }
                    const buff = v.buff;
                    if (
                        v.type === PropType.PropTypeBalanceAddBuffCard &&
                        buff &&
                        !isExpire
                    ) {
                        const buffExtraConf = buff.buffExtraConf;
                        const buffConditions = buffExtraConf.buffCondition ?? [];
                        let has = false;
                        for (const v1 of buffConditions) {
                            if (v1 === BuffCondition.BuffConditionMatch) {
                                has = true;
                                break;
                            }
                        }
                        if (has) {
                            regularAddCards.push(v);
                        }
                    }
                }
                if (callback) {
                    callback(regularAddCards);
                }
            }
        });
    }




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

    getMyUID() {
        let uid: number = App.userMgr.loginUid;
        return uid;
    }

    /**
    使用buffer类型道具
    params table
        params.object
        params.propID
        params.expireAt
        params.type
        params.cb
    */
    async activateUserBuff(params: { cb?: Function, propID: number, expireAt: number; }) {
        let cb = params.cb;
        let rep: IActivateUserBuffReq = {
            propID: params.propID,
            expireAt: params.expireAt,
            uid: App.userMgr.loginUid
        };
        UIMgr.getInstance().showLoading();
        let ret = await this.ActivateUserBuff(rep);
        UIMgr.getInstance().hideLoading();
        if (ret.err) {
            Log.e("使用道具失败");
        }
        if (ret.resp) {
            if (cb) {
                cb(true, ret.resp);
            }
        }
        return ret;
    }


    async CountCurrentUserPropByCategory(req: ICountCurrentUserPropByCategoryReq) {
        return await PropService.CountCurrentUserPropByCategory(req);
    }

    // 根据概况物品拉取展开数据
    async getGoodsDetails(req: IExpandPropDetailsReq) {
        return await PropService.ExpandPropDetails(req);
    }

    async ActivateUserBuff(req: IActivateUserBuffReq) {
        return await PropService.ActivateUserBuff(req);
    }
    // 清理用户过期礼包
    async cleanUpUserGift(req: ICleanUpUserGiftReq) {
        return await PropService.CleanUpUserGift(req);
    }
    // 清理用户过期道具
    async cleanUpUserProp(req: ICleanUpUserPropReq) {
        return await PropService.CleanUpUserProp(req);
    }
    //检查过期门票
    async checkExpiredRes(req: IHasExpiredResReq) {
        return await PropService.HasExpiredRes(req);
    }
    // 清楚背包单个物品红点
    async cleanUpPropBadge(req: ICleanUpUserPropBadgeReq) {
        return await PropService.CleanUpUserPropBadge(req);
    }
    // 清除用户背包红点
    async cleanUpUserBadge(req: ICleanUpUserBadgeReq) {
        return await PropService.CleanUpUserBadge(req);
    }
    //拉取用户背包红点数据
    async listUserBadge(req: IListUserBadgeReq) {
        return await PropService.ListUserBadge(req);
    }
    // 拉取用户道具、兑换券列表
    async listUserProps(req: IListUserResV2Req) {
        return await PropService.ListUserResV2(req);
    }
    // 开通会员
    async ActivateVip(req: IActivateVipReq) {
        return await PropService.ActivateVip(req);
    }
    // 打开礼包
    async OpenGift(req: IOpenGiftReq) {
        return await PropService.OpenGift(req);
    }

    // 激活尊享卡
    async ActivatePremiumCard(req: IActivatePremiumCardReq) {
        return await PropService.ActivatePremiumCard(req);
    }

    // 清理用户过期道具
    async CleanUpUserPropV2(req: ICleanUpUserPropV2Req) {
        return await PropService.CleanUpUserPropV2(req);
    }

    //列举用户道具和礼包
    async ListUserRes(req: IListUserResReq) {
        return await PropService.ListUserRes(req);
    }
    // 发送全服广播
    async SendServiceBroadcastEx(req: ISendServiceBroadcastReq) {
        return await PropService.SendServiceBroadcast(req);
    }
    // 获取道具
    async GetProp(req: IGetPropReq) {
        return await PropService.GetProp(req);
    }

    // 计数用户道具
    async CountUserProp(req: ICountUserPropReq) {
        return await PropService.CountUserProp(req);
    }
    // 批量获取道具
    async BatchGetProp(req: IBatchGetPropReq) {
        return await PropService.BatchGetProp(req);
    }
    /**
     * 改名
    */
    async Rename(req: IRenameReq) {
        return await PropService.Rename(req);
    }
}

const propMgr = new PropMgr();
export { propMgr };
