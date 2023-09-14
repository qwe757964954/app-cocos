import { _decorator, Component, Label, Node, NodeEventType, Sprite, tween, UITransform, Vec3 } from 'cc';
import { BoxData, ColorMap } from '../config/config';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import util from '../util';
import { PropDetail } from './PropDetail';
import { NetImageEx } from 'app/components/NetImageEx';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Utils } from 'app/utils/Utils';
import { Log } from 'bos/exports';
const { ccclass, property } = _decorator;

enum AnimType {
    OPEN_ANIM = 0,
    OPEN_MAIN_ANIM = 1,
    HIDE_ANIM = 2
};

@ccclass('GoodsCellCtr')
export class GoodsCellCtr extends Component {
    private mData: BoxData;
    private goodsName: Node;
    private goodsIcon: Node;
    private endTime: Node;
    private goodsNum: Node;
    private useView: Node;
    private kindView: Node;
    private redView: Node;
    private bgView1: Node;
    private bgView2: Node;
    private mainView: Node;
    private kindNum: Node;
    private openView: Node;
    private bgView3: Node;
    private overstayed: Node;

    @property({
        visible: true,
        type: Prefab,
        tooltip: "绑定显示详情弹窗"
    })
    private detailPrefab: Prefab = null!;

    // 背包内节点详情弹窗
    private detailNode: Node = null;

    onLoad() {
        this.node.on("PropCellClick", this.onClick, this);
    }

    start() {
    }
    onDestroy() {
        if (this.node) {
            this.node.off("PropCellClick", this.onClick, this);
        }
    };

    getDetailNode() {
        if (!this.detailNode) {
            this.detailNode = instantiate(this.detailPrefab);
        }
        return this.detailNode;
    }

    initNode() {
        this.goodsName = util.getNodeByName(this.node, "goodsName");
        this.goodsIcon = util.getNodeByName(this.node, "goodsIcon");
        this.endTime = util.getNodeByName(this.node, "endTime");
        this.goodsNum = util.getNodeByName(this.node, "goodsNum");
        this.useView = util.getNodeByName(this.node, "useView");
        this.kindView = util.getNodeByName(this.node, "kindView");
        this.redView = util.getNodeByName(this.node, "redView");
        this.bgView1 = util.getNodeByName(this.node, "bgView1").getChildByName("Sprite");
        this.bgView2 = util.getNodeByName(this.node, "bgView2").getChildByName("Sprite");
        this.bgView3 = util.getNodeByName(this.node, "bgView3").getChildByName("Sprite");
        this.mainView = util.getNodeByName(this.node, "mainView");
        this.kindNum = util.getNodeByName(this.node, "kindNum");
        this.openView = util.getNodeByName(this.node, "openView");
        this.overstayed = util.getNodeByName(this.node, "overstayed");
    }

    updateView(data: BoxData) {
        this.mData = data;
        this.showCellView();
    }

    onClick() {
        if (this.mData.data.shortcut) {
            if (this.mData.delegate.getGoodsDetails) {
                this.mData.delegate.getGoodsDetails(this.mData.data.index, this.mData.rowIndex);
            }
        } else {
            let t = UIMgr.getInstance().pushPopup(this.detailPrefab);
            t.getComponent(PropDetail).updateView(this.mData);
            // 点击新的道具时关闭新的数据
            this.redView.active = false;
            this.mData.delegate.cleanPropBadge(this.mData.data);
        }
    }

    showCellView() {
        if (!this.goodsName) {
            this.initNode();
        }
        this.goodsName.getComponent(Label).string = this.mData.data.name;
        this.updateExpire(this.mData.data.expireAt);
        if (this.mData.data.itemType == "buff") {
            this.endTime.getComponent(Label).color = ColorMap.color5;
            this.goodsIcon.getComponent(NetImageEx).setUrl(this.mData.data.img || "");
            this.goodsNum.active = false;
            this.useView.active = true;
        } else {
            this.goodsIcon.getComponent(NetImageEx).setUrl(this.mData.data.icon || "");
            this.endTime.getComponent(Label).color = ColorMap.color6;
            this.goodsNum.active = true;
            this.useView.active = false;
            this.goodsNum.getComponent(Label).string = Utils.formatNumWithX(this.mData.data.num);
        }
        let shortcut: boolean = this.mData.data.shortcut;
        this.kindView.active = shortcut;
        this.redView.active = this.mData.data.badgeNum && this.mData.data.badgeNum > 0 ? true : false;

        this.bgView1.getComponent(Sprite).color = shortcut ? ColorMap.color7 : ColorMap.color8;
        this.bgView2.getComponent(Sprite).color = shortcut ? ColorMap.color9 : ColorMap.color10;

        if (shortcut) {
            this.mainView.scale = new Vec3(1, 1, 1);
            this.kindNum.getComponent(Label).string = (this.mData.data.numInShortcut).toString();
            if (this.mData.data.showOpenAnim) {

            } else if (this.mData.data.showHideAnim) {
                this.openView.scale = new Vec3(1, 1, 1);
            } else {
                this.openView.scale = this.mData.data.isOpen ? new Vec3(1, 1, 1) : new Vec3(0, 0, 0);
            }
        } else {
            this.openView.scale = new Vec3(0, 0, 0);
            this.mainView.scale = this.mData.data.showOpenAnim ? new Vec3(0, 0, 0) : new Vec3(1, 1, 1);
        }
    }

    time(): number {
        let date = new Date();
        return Math.floor(date.getTime() / 1000);
    }

    updateExpire(expireAt: number) {
        let overstayed: boolean = expireAt <= this.time() ? true : false;
        this.overstayed.active = overstayed;
        let color = this.node.getComponent(Sprite).color.clone();
        let opacity = overstayed ? 0.5 : 1;
        color.a = opacity * 255;
        this.node.getComponent(Sprite).color = color;
        this.bgView3.getComponent(Sprite).color = overstayed ? ColorMap.color3 : ColorMap.color4;
        this.endTime.getComponent(Label).string = overstayed ? "已过期" : this.expireAtString(expireAt);
    }

    expireAtString(expireAt: number) {
        if (expireAt === 9999999999) {
            return "永久";
        }

        const remainingTime = expireAt - this.time();
        const day = Math.floor(remainingTime / (60 * 60 * 24));
        let timeStr = this.mData.data.itemType === "buff" ? "剩余" : "";

        if (day === 0) {
            if (this.mData.data.shortcut) {
                timeStr = "部分即将过期";
            } else {
                const hr = Math.floor(remainingTime / (60 * 60));

                if (hr > 0) {
                    timeStr = timeStr + hr + "小时";
                } else {
                    const min = Math.floor(remainingTime / 60);
                    timeStr = timeStr + Math.max(min, 1) + "分钟";
                }
            }
        } else {
            const hr = Math.floor((remainingTime - day * 60 * 60 * 24) / (60 * 60));
            timeStr = timeStr + day + "天" + (hr > 0 ? hr + "小时" : "");
        }

        return timeStr;
    }

    playAnim() {
        let shortcut = this.mData.data.shortcut;
        if (shortcut) {
            if (this.mData.data.showOpenAnim) {
                this.mData.data.showOpenAnim = false;
                this.mData.delegate.showOpenAnimBack(this.mData.data.index);
                tween(this.openView).delay(1 / 24).to(3 / 24, {
                    scale: new Vec3(1.1, 1.1, 1.1)
                }).to(1 / 24, {
                    scale: new Vec3(1, 1, 1)
                }).call(() => {
                    this.openView.scale = new Vec3(1, 1, 1);
                }).start();
            } else if (this.mData.data.showHideAnim) {
                tween(this.openView).to(3 / 24, { scale: new Vec3(0, 0, 0) }).call(() => {
                    this.openView.scale = new Vec3(0, 0, 0);
                }).start();
                // 动画过程 播放动画从1-0耗时3/24
                this.mData.delegate.showHideAnimBack(this.mData.data.index);
                this.mData.data.showHideAnim = false;
            }
        } else {
            if (this.mData.data.showOpenAnim) {
                this.mData.data.showOpenAnim = false;
                this.mData.delegate.showOpenAnimBack(this.mData.data.index);
                tween(this.mainView).delay(this.mData.data.delayTime).to(5 / 24, {
                    scale: new Vec3(1.1, 1.1, 1.1)
                }).to(3 / 24, {
                    scale: new Vec3(1, 1, 1)
                }).call(() => {
                    this.mainView.scale = new Vec3(1, 1, 1);
                }).start();
            }
        }
    }

    reset() {
        if (!this.goodsName) {
            this.initNode();
        }
        this.goodsIcon.getComponent(NetImageEx).clear();
        this.goodsName.getComponent(Label).string = "";
        this.goodsNum.active = false;
        this.useView.active = false;
        this.endTime.getComponent(Label).color = ColorMap.color6;
        this.kindView.active = false;
        this.redView.active = false;
        this.bgView1.getComponent(Sprite).color = ColorMap.color8;
        this.bgView2.getComponent(Sprite).color = ColorMap.color10;
        this.openView.scale = new Vec3(0, 0, 0);
        this.mainView.scale = new Vec3(1, 1, 1);
        this.overstayed.active = false;
    }

}
