import { _decorator, Component, Node } from 'cc';
import { BoxData } from '../config/config';
import { GoodsCellCtr } from "./GoodsCellCtr";
import util from '../util';
const { ccclass, property } = _decorator;

type GoodData = {
    node: Node;
    active: boolean;
    data?: BoxData | undefined;
};

@ccclass('GoodsItemCtr')
export class GoodsItemCtr extends Component {
    private goodList: GoodData[];
    private dataList: BoxData[];
    private activeList: Node[] = [];
    public rowIndex: number = 0;
    onLoad() {
    }

    start() {
    }

    onEnable() {
        if (this.dataList.length > 0) {
            let item = this.dataList[0];
            if (item.delegate && item.delegate.checkIsNodeAnimPlay()) {
                this.scheduleOnce(this.playAnim);
            }
        }
    }

    initGoodList() {
        this.goodList = [];
        let data: GoodData;
        for (let i = 0; i < 3; i++) {
            let name: string = "goodsCell" + (i + 1);
            let node = util.getNodeByName(this.node, name);
            data = {
                node: node,
                active: true,
            };
            this.goodList[i] = data;
        }
    }

    updateView(dataList: BoxData[], rowIndex: number) {
        if (!this.goodList) {
            this.initGoodList();
        }
        this.rowIndex = rowIndex;
        // 显示的节点先清零
        this.activeList = [];
        this.dataList = dataList;
        let item: BoxData;
        let goodData: GoodData | undefined;
        for (let i = 0; i < 3; i++) {
            item = this.dataList[i];
            goodData = this.goodList[i];
            if (item) {
                item.rowIndex = rowIndex;
                goodData.active = true;
                goodData.data = item;
            } else {
                goodData.active = false;
                goodData.data = undefined;
            }
            this.goodList[i] = goodData;
            this.updateSubItem(goodData);
        }
    }
    updateSubItem(data: GoodData) {
        let node = data.node;
        node.active = data.active;
        if (data.active && data.data) {
            node.getComponent(GoodsCellCtr).updateView(data.data);
            this.activeList.push(node);
        }
    }

    playAnim() {
        this.activeList.forEach((node: Node) => {
            node.getComponent(GoodsCellCtr).playAnim();
        });
    }

    reset() {
        if (!this.goodList) {
            this.initGoodList();
        }
        let goodData: GoodData | undefined;
        for (let i = 0; i < 3; i++) {
            goodData = this.goodList[i];
            goodData.node.getComponent(GoodsCellCtr).reset();
        }
    }
}
