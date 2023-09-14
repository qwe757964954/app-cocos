import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;
import { ICleanUpUserBadgeReq, ICleanUpUserGiftReq, ICleanUpUserPropReq, IHasExpiredResReq, IListUserBadgeReq, ListUserBadgeReq } from 'idl/tss/hall/prop.v4';
import { propMgr } from 'app/domain/props/PropMgr';
import { KnapsackCtr } from '../KnapsackCtr';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { App } from 'app/App';
/**
 * 操作层面在这个脚本组件内处理
*/
@ccclass('KnapsackOperate')
export class KnapsackOperate extends Component {
    // 检测用户信息
    async checkUserBadge() {
        this.node.getComponent(KnapsackCtr).resetAmount();
        let req: IListUserBadgeReq = {
            uid: App.userMgr.loginUid
        };
        const ret = await propMgr.listUserBadge(req);
        if (ret.resp) {
            let resp = ret.resp;
            const keys = { UserBagBadgeKey: 0, UserBagVoucherKey: 1 };
            if (resp.badges && resp.badges.length > 0) {
                for (const [k, v] of resp.badges.entries()) {
                    this.node.getComponent(KnapsackCtr).updateTabRedDot(keys[v.key], v.amount);
                }
            } else {
                for (const key in keys) {
                    this.node.getComponent(KnapsackCtr).updateTabRedDot(keys[key], 0);
                }
            }
        }
    }
    // 返回到上个场景
    onClickBackBtn() {

        UIMgr.getInstance().popPage();
    }
    // 清理过期道具
    async onClickClearBtn() {
        let req: IHasExpiredResReq = {
            uid: App.userMgr.loginUid
        };
        const ret = await propMgr.checkExpiredRes(req);
        if (ret.resp) {
            let resp = ret.resp;
            let clearTimes: number =
                (resp.hasPropExpired ? 1 : 0) + (resp.hasGiftExpired ? 1 : 0);
            if (clearTimes === 0) {
                UIMgr.getInstance().showToast("没有可清理的过期道具");
            } else {
                const update = function (this: KnapsackOperate, code: number) {
                    clearTimes--;
                    if (code === 0 && clearTimes <= 0) {
                        UIMgr.getInstance().showToast("清理过期道具成功");
                        this.node.getComponent(KnapsackCtr).initPageData();
                    }
                };
                const keyValue: { [key: string]: string; } = {
                    hasGiftExpired: 'cleanUpUserGift',
                    hasPropExpired: 'cleanUpUserProp',
                };

                for (const key in keyValue) {
                    if (resp.hasOwnProperty(key) && resp[key]) {
                        let ret;
                        switch (keyValue[key]) {
                            case "cleanUpUserProp":
                                let propReq: ICleanUpUserPropReq = {
                                    uid: App.userMgr.loginUid
                                };
                                ret = await propMgr.cleanUpUserProp(propReq);
                                break;
                            case "cleanUpUserGift":
                                let giftReq: ICleanUpUserGiftReq = {
                                    uid: App.userMgr.loginUid
                                };
                                ret = await propMgr.cleanUpUserGift(giftReq);
                                break;
                        }
                        if (ret.resp) {
                            update.call(this, 0);
                        }
                    }
                }
            }
        } else {
            UIMgr.getInstance().showToast("请求过期门票列表失败！");
        }
    }
    // 当组件或节点被销毁时，会调用该方法，一般用来进行资源释放和清理操作。
    onDestroy() {
        this.clearRedDot();
    }
    // 清理数据
    clearRedDot() {
        const keys: string[] = ['UserBagBadgeKey', 'UserBagVoucherKey'];
        for (let i = 0; i < keys.length; i++) {
            let req: ICleanUpUserBadgeReq = {
                badgeKey: keys[i],
                uid: App.userMgr.loginUid
            };
            propMgr.cleanUpUserBadge(req);
        }
    }

}
