import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { ScrollView } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IMailBriefData } from 'idl/tss/hall/mail.v2';
import { MailContentCtr } from './MailContentCtr';
import { UITransform } from 'cc';
import { DetailGoods } from './DetailGoods';
const { ccclass, property } = _decorator;

@ccclass('AnnexContent')
export class AnnexContent extends Component {
    @property({
        visible: true,
        type: Prefab,
    })
    private goodsPrefab: Prefab = null!;

    @property({
        visible: true,
        type: Prefab,
    })
    private contentPrefab: Prefab = null!;


    @property({
        visible: true,
        type: ScrollView,
    })
    private contentScroll: ScrollView = null!;

    @property({
        visible: true,
        type: ScrollView,
    })
    private goodsScroll: ScrollView = null!;

    private contentNode: Node;

    updateView(data: IMailBriefData) {
        this.updateContent(data);
        this.updateGoods(data);
    }

    /**
     * 显示详情内容
    */
    updateContent(data: IMailBriefData) {
        if (!this.contentNode) {
            this.contentNode = instantiate(this.contentPrefab);
        }
        this.contentNode.removeFromParent();
        this.contentScroll.content.addChild(this.contentNode);
        // 更新内容
        this.contentNode.getComponent(MailContentCtr).updateView(data);
        this.contentScroll.content.getComponent(UITransform).height = this.contentNode.getComponent(UITransform).height;
    }

    /**
     * 显示奖励信息
    */
    updateGoods(data: IMailBriefData) {
        // 奖励内容
        if (data.assetItems && data.assetItems.length > 0) {
            this.goodsScroll.getComponent(DetailGoods).updateView(data.assetItems);
        }
    }
}


