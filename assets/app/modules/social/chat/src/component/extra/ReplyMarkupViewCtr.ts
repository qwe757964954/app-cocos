import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Message } from 'qsdk/im/core/Message';
import { NodeUtil } from 'bos/exports';

@ccclass('ReplyMarkupViewCtr')
export class ReplyMarkupViewCtr extends XComponent {
    @property(Prefab)
    RowPrefab: Prefab = null

    @property(Prefab)
    ItemPrefab: Prefab = null

    @property(Prefab)
    OutTimePrefab: Prefab = null


    updateView(message: Message) {

        this.node.removeAllChildren()

        const replyMarkup = message.replyMarkup;
        if (!replyMarkup) {
            return;
        }

        const inlineKeyboardMarkup = replyMarkup.inlineKeyboardMarkup;
        if (!inlineKeyboardMarkup) {
            return;
        }

        let expireAt = 0;
        if (inlineKeyboardMarkup.expireAt) {
            expireAt = parseInt(inlineKeyboardMarkup.expireAt);
        }

        if (expireAt <= 0 || Date.now() < expireAt) {
            if (inlineKeyboardMarkup && inlineKeyboardMarkup.list) {
                for (const rowData of inlineKeyboardMarkup.list) {
                    const view = this.createRowView();
                    this.node.addChild(view);

                    for (const colData of rowData.list) {
                        const itemExpiredAt = parseInt(colData.expireAt);
                        if (itemExpiredAt <= 0 || Date.now() < itemExpiredAt) {
                            const itemView = instantiate(this.ItemPrefab);
                            view.addChild(itemView);
                            const data = {
                                parentObj: this.node,
                                message: message,
                                item: colData
                            };
                            NodeUtil.sendMessage(itemView, "_updateView", data)
                        }
                    }
                }
            }
        } else {
            const outTime = instantiate(this.OutTimePrefab);
            this.node.addChild(outTime);
        }

    }

    createRowView() {
        let rowView = instantiate(this.RowPrefab)
        return rowView
    }
}