import { _decorator, Component, Node } from 'cc';
import { BoxData } from '../../config/config';
import { propMgr } from 'app/domain/props/PropMgr';
import { AlertParams } from 'bos/framework/gui/alertview/src/AlertView';
import util from '../../util';
import { CleanUpOption, CleanUpUserGiftReq, CleanUpUserGiftResp, CleanUpUserPropV2Req, CleanUpUserPropV2Resp } from 'idl/tss/hall/prop.v4';
import { IAsset, PropCategory } from 'idl/tss/common/common_define';
import { App } from 'app/App';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { uiMgr } from 'bos/exports';
import { Prefab } from 'cc';
import { RewardCtr } from 'app/modules/common/reward/src/RewardCtr';
const { ccclass, property } = _decorator;
// 丢弃物品处理逻辑
@ccclass('RemoveGoods')
export class RemoveGoods extends Component {
    private mData: BoxData;
    @property({
        visible: true,
        type: Prefab,
    })
    private invitePrefab: Prefab = null!;

    // 丢弃礼包
    async onRemoveGift(isExpireAt: boolean) {
        const req: CleanUpUserGiftReq = new CleanUpUserGiftReq({
            giftId: this.mData.data.propID,
            expireAt: this.mData.data.expireAt,
            uid: App.userMgr.loginUid,
        });
        let ret = await propMgr.cleanUpUserGift(req);
        if (ret.resp) {
            if (this.mData.delegate && this.mData.delegate.reloadData) {
                this.mData.delegate.reloadData();
            }

            UIMgr.getInstance().popPopup();
            if (isExpireAt) {
                this.getReward();
            }
        } else {
            console.error("丢弃道具失败");
        }
    }

    getReward() {
        let asset: IAsset = {
            props: [{
                icon: "/pic/app_1/20219/YqA1DS6VLv_1631786369.png",
                amount: this.mData.data.num * (this.mData.data.discardCompensation || 0),
                name: "金币"
            }]
        };
        this.showInviteRewardDialog(asset);
    }

    async onRemove(isExpireAt: boolean) {
        let optNum = 0;
        let option = CleanUpOption.CleanUpOptDiscard;
        if (isExpireAt && this.mData.data.recycleAble) {
            optNum = 1;
            option = CleanUpOption.CleanUpOptRecycle;
        }
        const params: CleanUpUserPropV2Req = new CleanUpUserPropV2Req({
            propID: this.mData.data.propID,
            expireAt: this.mData.data.expireAt,
            num: optNum,
            option: option,
            uid: App.userMgr.loginUid
        });
        let ret = await propMgr.CleanUpUserPropV2(params);
        if (ret.resp) {
            if (this.mData.delegate && this.mData.delegate.reloadData) {
                this.mData.delegate.reloadData();
            }
            UIMgr.getInstance().popPopup();
            if (ret.resp.compensate.length > 0) {
                this.showInviteRewardDialog({ props: ret.resp.compensate });
            }
        } else {
            console.error("丢弃道具失败");
        }
    }

    // 显示提示内容
    showInviteRewardDialog(asset: IAsset) {
        let t = UIMgr.getInstance().pushPopup(this.invitePrefab);
        t.getComponent(RewardCtr).updateView(asset);
    }


    // 丢弃物品
    onRemoveGoods(isExpireAt: boolean) {
        if (this.mData.data.category == PropCategory.PropCategoryGift) {
            this.onRemoveGift(isExpireAt);
        }
        else {
            this.onRemove(isExpireAt);
        }
    }
    // 显示可回收物品丢弃先提示
    showRecycleAbleGoodsRemoveAlert() {
        let name: string = this.mData.data.name || "券";
        let num: number = 1;
        let value: number = 1 * (this.mData.data.referMung || 1);
        let content: string = `是否将${name}*${num}兑换为${value}奖券,商品一经回收不可找回,回收奖券将直接退还至账号上`;
        const alertData: AlertParams = {
            title: "提示",
            content: content,
            ok: {
                title: "立即回收",
                callback: () => {
                    this.onRemoveGoods(true);
                }
            }
        };
        UIMgr.getInstance().pushAlert(alertData);
    }
    // 显示图片丢弃前提示
    showGoodsRemoveAlert() {
        let num: number = this.mData.data.num * (this.mData.data.discardCompensation || 1);
        let content: string = `是否确认丢弃该道具？丢弃后可以获得x${num}金币`;
        const alertData: AlertParams = {
            title: "提示",
            content: content,
            ok: {
                title: "确定",
                callback: () => {
                    this.onRemoveGoods(true);
                }
            }
        };
        UIMgr.getInstance().pushAlert(alertData);
    }

    // 触发点击丢弃按钮逻辑
    onRemoveTouch(data: BoxData) {
        this.mData = data;
        // 未过期道具丢弃
        if (this.mData.data.expireAt - util.time() > 0) {
            // 是否可回收物品
            if (this.mData.data.recycleAble) {
                this.showRecycleAbleGoodsRemoveAlert();
            } else {
                this.showGoodsRemoveAlert();
            }
        }
        else {
            this.onRemoveGoods(false);
        }
    }
}


