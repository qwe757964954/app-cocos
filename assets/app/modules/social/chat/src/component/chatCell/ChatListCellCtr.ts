import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { Message } from 'qsdk/im/core/Message';
import { NodeUtil } from 'bos/exports';

@ccclass('ChatListCellCtr')
export class ChatListCellCtr extends Component {

    @property(Label)
    msg: Label = null

    @property(Prefab)
    ListItemPrefab: Prefab = null

    @property(Node)
    listView: Node = null

    updateView(_message: Message) {
        let message: Message = _message;
        
        const content = message.content;
        const items = content.items;
        
        console.log("ChatListCellCtr:updateView items ", items)
        this.msg.string = content.text || "";

        this.listView.removeAllChildren()
        
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const itemView = instantiate(this.ListItemPrefab);
            this.listView.addChild(itemView);
            if (index === items.length - 1) {
                NodeUtil.sendMessage(itemView, "_updateView", { item: item, msgID: message.msgID, isLast: true })
            } else {
                NodeUtil.sendMessage(itemView, "_updateView", { item: item, msgID: message.msgID, isLast: false })
            }
        }
    }

}