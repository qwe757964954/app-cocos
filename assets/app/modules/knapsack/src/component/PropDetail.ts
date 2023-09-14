import { _decorator, Component, Node } from 'cc';
import { BoxData } from '../config/config';

import Util from "./../util";
import { Label } from 'cc';
import { UseGoods } from './goods/UseGoods';
import { RemoveGoods } from './goods/RemoveGoods';
import { ICountUserPropReq } from 'idl/tss/hall/prop.v4';
import { NetImageEx } from 'app/components/NetImageEx';
import { SendPresentService } from 'idl/tss/hall/sendpresent.v1';
import { IVoid } from 'idl/tss/hall/premiumcard.v1';
import { Log } from 'bos/exports';
import { State } from 'idl/tss/common/common_define';
import { Button } from 'cc';
import { SendGoods } from './goods/SendGoods';
import { propMgr } from 'app/domain/props/PropMgr';
import { App } from 'app/App';
import { UIMgr } from 'bos/framework/gui/UIMgr';
const { ccclass, property } = _decorator;

type BtnData = {
    btnName: string;
    funcName: string;
};

const BtnStatus = {
    Send: { btnName: "赠送", funcName: "onSendTouch" },
    Cancel: { btnName: "取消", funcName: "onOKTouch" },
    Confirm: { btnName: "确定", funcName: "onOKTouch" },
    UseProp: { btnName: "使用", funcName: "onUseTouch" },
    Remove: { btnName: "丢弃", funcName: "onRemoveTouch" },
    Recovery: { btnName: "回收", funcName: "onRemoveTouch" },
    GoToPrize: { btnName: "前往兑换", funcName: "onClickGotoPrize" },
    OK: { btnName: "好的", funcName: "onOKTouch" },// 默认使用 其他类型都暂时不是用
};

@ccclass('PropDetail')
export class PropDetail extends Component {
    private btnStatus = {};
    private mData: BoxData;
    private recycleTips: Node;
    private propIcon: Node;
    private propNum: Node;
    private propDes: Node;
    private propName: Node;
    private btnLine: Node;
    private leftBtn: Node;
    private rightBtn: Node;
    private lockIcon: Node;
    onLoad() {
        this.btnStatus = {};

    }
    initNode() {
        this.recycleTips = Util.getNodeByName(this.node, "recycleTips");
        this.propIcon = Util.getNodeByName(this.node, "propIcon");
        this.propNum = Util.getNodeByName(this.node, "propNum");
        this.propDes = Util.getNodeByName(this.node, "propDes");
        this.propName = Util.getNodeByName(this.node, "propName");
        this.btnLine = Util.getNodeByName(this.node, "btnLine");
        this.leftBtn = Util.getNodeByName(this.node, "leftBtn");
        this.rightBtn = Util.getNodeByName(this.node, "rightBtn");
        this.lockIcon = Util.getNodeByName(this.node, "lockIcon");
    }
    updateView(data: BoxData) {
        if (!this.recycleTips) {
            this.initNode();
        }
        if (!data) {
            return;
        }


        this.lockIcon.active = false;
        this.rightBtn.getComponent(Button).interactable = true;
        this.mData = data;
        this.btnStatus = {};
        this.recycleTips.active = false;
        if (this.mData.data.itemType == "buff") {
            this.propIcon.getComponent(NetImageEx).setUrl(this.mData.data.img || "");
            this.propNum.active = false;
        } else {
            this.propIcon.getComponent(NetImageEx).setUrl(this.mData.data.icon || "");
            this.propNum.active = true;
            this.propNum.getComponent(Label).string = "x" + this.mData.data.num;
        }
        this.propDes.getComponent(Label).string = this.mData.data.desc;
        this.propName.getComponent(Label).string = this.mData.data.name;

        this.setBtnView(BtnStatus.OK);
        this.setBtnView(BtnStatus.Remove, true);
        // 以下逻辑暂时不是用，提示弹窗只显示两个按钮类型 一个是丢弃一个是好的
        // if (this.mData.data.itemType == "buff") {
        //     this.setBtnView(BtnStatus.Confirm);
        // } else if (this.mData.data.expireAt - Util.time() < 0) {
        //     this.setBtnView(BtnStatus.Remove, true);
        // } else {
        //     this.setBtnView(BtnStatus.Remove, true);
        //     // 正常道具, 可以使用的，显示使用按钮
        //     let usage = this.mData.data.usage;
        //     if (usage.Type == UsageType.UsageTypeJumpExchange) {
        //         this.setBtnView(BtnStatus.GoToPrize);
        //     } else if (usage.Type == UsageType.UsageTypeDirectly || usage.Type == UsageType.UsageTypeJump) {
        //         this.setBtnView(BtnStatus.UseProp);
        //     } else {
        //         if (this.mData.data.propID == 373 && FeatureConfig.JIN_DONG_DUMP) { // 京东卡碎片可以跳转奖品中心，id写死，后面优化
        //             this.setBtnView(BtnStatus.UseProp);
        //         } else {
        //             this.setBtnView(BtnStatus.Confirm);
        //         }
        //     }

        //     // 送礼 背包里面不触发赠送道具功能
        //     if (this.mData.data.canSend && FeatureConfig.IS_OPEN_PROP_GIFT) {
        //         this.setBtnView(BtnStatus.Send);
        //         this.getPropSendConfig();
        //     }

        //     // 回收
        //     if (this.mData.data.recycleAble) {
        //         this.setBtnView(BtnStatus.Recovery, true);
        //         // DICT 本地缓存 需要设置一个本地缓存机制
        //         let ret = sys.localStorage.getItem("EECYCLEABLE_TIPS");
        //         if (ret == "false") {
        //             sys.localStorage.setItem("EECYCLEABLE_TIPS", "true");
        //             this.recycleTips.active = true;
        //         }
        //     }
        // }

        this.btnLine.active = (this.btnStatus["leftBtn"] && this.btnStatus["rightBtn"]) ? true : false;
        this.leftBtn.active = this.btnStatus["leftBtn"] ? true : false;
        this.rightBtn.active = this.btnStatus["rightBtn"] ? true : false;
    }
    // 获取道具赠送开关
    async getPropSendConfig() {
        let req: IVoid = {};
        let ret = await SendPresentService.GetConfig(req);
        Log.d("[收到]道具赠送配置请求数据", ret.resp);
        if (ret.resp && ret.resp.config.state == State.StateOnline) { // 上线
        } else {
            this.lockIcon.active = true;
            this.rightBtn.getComponent(Button).interactable = false;
        }
    }

    setBtnView(data: BtnData, isLeft: boolean = false) {
        const key: string = isLeft ? "leftBtn" : "rightBtn";
        this[key].getChildByName("btnLab").getComponent(Label).string = data.btnName;
        this.btnStatus[key] = data;
    }

    /**
     * 赠送
    */
    onSendTouch() {
        if (this.lockIcon.active) {
            console.log("功能升级中，暂未开放");
            return;
        }
        this.node.getComponent(SendGoods).onSendTouch(this.mData.data);
    }

    // 使用物品
    onUseTouch() {
        this.node.getComponent(UseGoods).onUseTouch(this.mData);
    }
    // 丢弃
    onRemoveTouch() {
        this.node.getComponent(RemoveGoods).onRemoveTouch(this.mData);
    }

    // 前往对话
    onClickGotoPrize() {
        UIMgr.getInstance().popPopup();
        UIMgr.getInstance().showToast("跳转到网页 前往兑换");
        // if not StringLib.is_empty(self.data.usage.url) then
        //     local newUrl = self.data.usage.url.."&fromScene=Backpack"
        //     local NoticeManager = import("app.modules.notice").NoticeManager;
        // NoticeManager: redirectByURL(newUrl);
        // end;
    }

    onCloseBtn() {
        UIMgr.getInstance().popPopup();
    }
    onOKTouch() {
        UIMgr.getInstance().popPopup();
    }

    // 点击右侧按钮
    onClickRightBtn() {
        let funcName = this.btnStatus["rightBtn"] && this.btnStatus["rightBtn"].funcName;
        if (this[funcName]) {
            this[funcName]();
        }
    }
    // 点击左侧按钮
    onClickLeftBtn() {
        let funcName = this.btnStatus["leftBtn"] && this.btnStatus["leftBtn"].funcName;
        if (this[funcName]) {
            this[funcName]();
        }
    }

    async updateItemNum() {
        let req: ICountUserPropReq = {
            uid: App.userMgr.loginUid,
            propID: this.mData.data.propID
        };
        let ret = await propMgr.CountUserProp(req);
        if (ret.resp) {
            let count = ret.resp.totalSize || 0;
            if (count == 0) {
                UIMgr.getInstance().popPopup();
            }
        }
    }
}


;
