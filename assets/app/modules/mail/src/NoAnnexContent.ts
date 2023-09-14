import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { ScrollView } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IMailBriefData } from 'idl/tss/hall/mail.v2';
import { MailContentCtr } from './MailContentCtr';
import { UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NoAnnexContent')
export class NoAnnexContent extends Component {
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
    private contentNode: Node;

    updateView(data: IMailBriefData) {
        if (!this.contentNode) {
            this.contentNode = instantiate(this.contentPrefab);
        }
        this.contentNode.removeFromParent();
        this.contentScroll.content.addChild(this.contentNode);
        // 更新内容
        this.contentNode.getComponent(MailContentCtr).updateView(data);
        this.contentScroll.content.getComponent(UITransform).height = this.contentNode.getComponent(UITransform).height;
    }
}


