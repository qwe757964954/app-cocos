import { App } from 'app/App';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { MessageType } from 'idl/mp/common/social.im';
import { Picture } from 'qsdk/exports';
import { Message } from 'qsdk/im/core/Message';
const { ccclass, property } = _decorator;

@ccclass('QuoteCell')
export class QuoteCell extends Component {

    @property(Node)
    quoteText: Node = null!

    @property(Node)
    quoteImage: Node = null!

    start() {

    }

    async updateView(message: Message) {
        let quoteMessage = await message.queryQuoteMessage()
        console.warn("updateView", quoteMessage, "QuoteCell")
        if (quoteMessage.type == MessageType.Text || quoteMessage.type == MessageType.Quote) {
            let content = quoteMessage.content
            if (message.type == MessageType.Quote) {
                content = quoteMessage.content.content
            }
            if (this.quoteText) {
                let user = await App.userMgr.getUserByID(quoteMessage.fromID).finish()
                let label = this.quoteText.getComponent(Label)
                if (label) {
                    label.string = user.nickname + ":  " + quoteMessage.content.content
                }
            }
            if (this.quoteImage) {
                this.quoteImage.active = false
            }
        } else if (quoteMessage.type == MessageType.Image) {
            if (this.quoteText) {
                this.quoteText.active = false
            }
            if (this.quoteImage) {
                let picture = this.quoteImage.getComponent(Picture)
                picture.setUrl(quoteMessage.content.url)
            }
        }
    }
}


