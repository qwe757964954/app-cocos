import { _decorator, Component, Node } from 'cc';
import { BagData, BoxData } from '../../config/config';
import { propMgr } from 'app/domain/props/PropMgr';
import { AlertParams } from 'bos/framework/gui/alertview/src/AlertView';
import util from '../../util';
import { PropCategory, PropType } from 'idl/tss/common/common_define';
import { buffMgr } from 'app/domain/props/BuffMgr';
import { BuffType, GetUserBuffReq } from 'idl/tss/hall/buff.v3';
import { ActivatePremiumCardReq, ActivatePremiumCardResp, ActivateUserBuffReq, ActivateUserBuffResp, ActivateVipReq, ActivateVipResp, OpenGiftReq, OpenGiftResp, UsageType, UserProp } from 'idl/tss/hall/prop.v4';
import { App } from 'app/App';
import { Log } from 'bos/exports';
import { Prefab } from 'cc';
import { ModifyNameCtr } from '../ModifyNameCtr';
import { UIMgr } from 'bos/framework/gui/UIMgr';
const { ccclass, property } = _decorator;
// 使用物品处理逻辑
@ccclass('UseGoods')
export class UseGoods extends Component {
    private mData: BoxData;

    @property({
        visible: true,
        type: Prefab,
    })
    private modifyNamePrefab: Prefab = null!;


    useRenameCard() {
        let t = UIMgr.getInstance().pushPopup(this.modifyNamePrefab);
        t.getComponent(ModifyNameCtr).updateView(this.mData.data);
        t.getComponent(ModifyNameCtr).confirmCallBack = (value: boolean) => {
            if (value) {
                this.usePropSuccess();
            }
        };
    }
    // 使用结算加强卡
    useBalanceAddBuffCard() {
        propMgr.activateBalanceAddUserBuff(this.mData.data as UserProp, (value: boolean) => {
            if (value) {
                this.usePropSuccess();
            }
        });
    }
    // 使用折扣券
    useCoupon() {
        UIMgr.getInstance().popPopup();
        App.navMgr.navTo(App.navCfg.PRIZE_CENTER);
    }
    // 使用其他物品
    async useOtherGoods() {
        let doUseAction = () => {
            // 使用物品
            this.useProp();
        };
        if (this.mData.data.type == PropType.PropTypeMungAddBuffCard) {
            let req: GetUserBuffReq = new GetUserBuffReq({
                buffType: BuffType.BuffTypeMungAddCard
            });
            let ret = await buffMgr.GetUserBuff(req);
            if (ret.resp) {
                let resp = ret.resp;
                let content: string;
                if (resp.buff && resp.buff.markupRate == this.mData.data.buff.markupRate) {
                    content = "您已经使用过一张相同的加成卡，再次使用会累积使用时长，是否确认使用？";
                } else {
                    content = "您已经使用过一张加成卡，再次使用会覆盖原先效果，是否确认使用？";
                }
                this.showAlertFormButton(content, doUseAction);
            } else {
                doUseAction();
            }
        } else {
            doUseAction();
        }
    }

    showAlertFormButton(content: string, callback: Function) {
        const alertData: AlertParams = {
            title: "提示",
            content: content,
            ok: {
                title: "确定",
                callback: () => {
                    callback();
                }
            }
        };
        UIMgr.getInstance().pushAlert(alertData);
    }

    onUseTouch(data: BoxData) {
        this.mData = data;
        let usageType = this.mData.data.usage.Type;
        if (usageType == UsageType.UsageTypeDirectly) {
            if (this.mData.data.type == PropType.PropTypeRenameCard) {
                this.useRenameCard();
            } else if (this.mData.data.type == PropType.PropTypeBalanceAddBuffCard) {
                this.useBalanceAddBuffCard();
            } else if (this.mData.data.type == PropCategory.PropCategoryVoucher) {
                UIMgr.getInstance().showToast("可到奖品中心兑换物品！");
            } else if (this.mData.data.type == PropCategory.PropCategoryCoupon) {
                this.useCoupon();
            } else {
                this.useOtherGoods();
            }
        } else if (usageType == UsageType.UsageTypeJump) { // 重定向
            this.redirect(this.mData.data);
        } else {
            // 京东卡碎片可以跳转奖品中心，id写死，后面优化
            if (this.mData.data.propID == 373) {
                this.gotoPrizeCenterScene({ tabName: "购物" });
            }
        }
    }

    /**
     * 跳转到购物界面
    */
    gotoPrizeCenterScene(data: { tabName: string; }) {
        // import("app.config").FeatureConfig.JIN_DONG_DUMP
        UIMgr.getInstance().popPopup();
        App.navMgr.navTo(App.navCfg.PRIZE_CENTER);
    }

    /**
     * 重定向
    */
    redirect(data: BagData) {
        UIMgr.getInstance().showToast("跳转到网页" + data.usage.Desc);
        // local NoticeManager = import("app.modules.notice").NoticeManager;
        // NoticeManager: redirectByURL(self.data.usage.Desc);
        // self: usePropSuccess();
    }

    async useVipCard() {
        const req: ActivateVipReq = new ActivateVipReq({
            propID: this.mData.data.propID,
            expireAt: this.mData.data.expireAt,
            uid: App.userMgr.loginUid
        });
        let ret = await propMgr.ActivateVip(req);
        if (ret.resp) {
            const hour = ret.resp.hour ?? 0;
            const time = ret.resp.expiredAt ?? 0;
            let vipTime = "";
            if (hour < 24) {
                vipTime = `${hour}小时`;
            } else {
                const line = Math.floor(hour / 24); // 取整数
                const mod = hour % 24; // 取余数
                if (mod === 0) {
                    vipTime = `${line}天`;
                } else {
                    vipTime = `${line}天${mod}小时`;
                }
                let sTime: string = util.formatTime(time);
                let content: string = `您已成功开通${vipTime}会员!\n会员有效期延长至\n${sTime}`;
                const alertData: AlertParams = {
                    title: "提示",
                    content: content,
                    ok: {
                        title: "我知道了",
                        callback: function () { }
                    }
                };
                UIMgr.getInstance().pushAlert(alertData);
                this.usePropSuccess();
                this.refreshVipInfo();
            };
        } else {
            console.error("使用会员卡失败");
        }
    }

    refreshVipInfo() {
        // 未知接口
    }

    // 使用礼包
    async useGiftManuallyOpen() {
        const req: OpenGiftReq = new OpenGiftReq({
            id: this.mData.data.propID,
            expireAt: this.mData.data.expireAt,
            uid: App.userMgr.loginUid
        });
        let ret = await propMgr.OpenGift(req);
        if (ret.resp) {
            this.usePropSuccess();
        }
    }
    // 使用尊享卡
    async usePremiumCard() {
        const req: ActivatePremiumCardReq = new ActivatePremiumCardReq({
            propID: this.mData.data.propID,
            expireAt: this.mData.data.expireAt,
            uid: App.userMgr.loginUid
        });
        let ret = await propMgr.ActivatePremiumCard(req);
        if (ret.resp) {
            UIMgr.getInstance().showToast("使用道具成功");
            this.usePropSuccess();
        }
    }

    async useGoods() {
        let dataType = this.mData.data.type;
        let req: ActivateUserBuffReq = new ActivateUserBuffReq({
            propID: this.mData.data.propID,
            expireAt: this.mData.data.expireAt,
            uid: App.userMgr.loginUid
        });
        let ret = await propMgr.ActivateUserBuff(req);
        if (ret.resp) {
            if (dataType == PropType.PropTypeMungAddBuffCard) {
                const str: string = `您的绿豆收益已增加${Math.floor(ret.resp.markupRate / 100) || 0} %，抓紧时间去获取更多绿豆吧！`;
                UIMgr.getInstance().showToast(str);
            }
            this.usePropSuccess();
        }
    }

    async useProp() {
        let dataType = this.mData.data.type;
        if (dataType == PropType.PropTypeVipCard) { // 会员卡
            this.useVipCard();
        } else if (dataType == PropType.PropTypeGiftManuallyOpen) { // 礼包
            this.useGiftManuallyOpen();
        } else if (dataType == PropType.PropTypePremiumCard) { // 普通道具-尊享卡
            this.usePremiumCard();
        } else if (dataType == PropType.PropTypeBuffTracker || // 记牌器
            dataType == PropType.PropTypeNoDeductionCupBuffCard || // 免扣奖杯卡
            dataType == PropType.PropTypeMungAddBuffCard || // 普通道具-绿豆收益加成卡 buff时效
            dataType == PropType.PropTypePIPBuff // 牌局内交互道具：buff时效 数量消耗
        ) {
            this.useGoods();
        } else {
            Log.e("该类型道具未实现使用功能");
        }
    }
    usePropSuccess() {
        let dataType = this.mData.data.type;
        if (dataType == PropType.PropTypeGiftManuallyOpen) {
            this.showUseGiftSuccessView();
        }
        if (this.mData.delegate && this.mData.delegate.reloadData) {
            this.mData.delegate.reloadData();
        }
        UIMgr.getInstance().popPopup();
    }

    //礼包使用成功提示框
    showUseGiftSuccessView() {
        UIMgr.getInstance().showToast("播放使用礼包动画");
        // local view = import("app.scenes.hall.vip.vipDialog.giftPackageAnim").GiftPackageAnim()
        // view:updateView({id = self.data.propID}, function(...)
        // end)
        // local curScene = SceneManager:get_running_scene()
        // view.zorder = 999
        // curScene:add(view)
    }


}


