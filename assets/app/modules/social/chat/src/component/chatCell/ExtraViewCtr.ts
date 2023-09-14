import { _decorator, Component, instantiate, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Message } from 'qsdk/im/core/Message';
import { resLoader, uiMgr } from 'bos/exports';

@ccclass('ExtraViewCtr')
export class ExtraViewCtr extends XComponent {
    private _message: Message = null
    updateView(message: Message) {
        if (this._message?.msgID != message.msgID) {
            this._message = message
            this.node.removeAllChildren()
            if (message?.replyMarkup?.inlineKeyboardMarkup) {
                resLoader.loadPrefab("social@chat/res/prefab/ExtraView", (err, prefab) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    let view = instantiate(prefab)
                    this.node.addChild(view)
                })
            }
        }
    }
}