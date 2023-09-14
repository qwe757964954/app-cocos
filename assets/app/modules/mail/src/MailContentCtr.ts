import { Label } from 'cc';
import { Widget } from 'cc';
import { UITransform } from 'cc';
import { RichText } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IMailBriefData } from 'idl/tss/hall/mail.v2';
const { ccclass, property } = _decorator;

@ccclass('MailContentCtr')
export class MailContentCtr extends Component {
    @property({
        visible: true,
        type: Label,
    })
    private title: Label = null!;

    @property({
        visible: true,
        type: Label,
    })
    private time: Label = null!;

    @property({
        visible: true,
        type: RichText,
    })
    private richText: RichText = null!;
    getTimeStrToMail(msgTime: number) {
        return this.formatData2(msgTime);
    }

    formatDate(timeStamp: number) {
        return new Date(timeStamp * 1000).toLocaleString("zh-CN", { hour12: false, timeZone: "Asia/Shanghai", era: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", formatMatcher: "basic" }).replace(/\u200E/g, "").replace(/,/g, "");
    }

    formatData2(timeStamp: number) {
        const now = new Date(timeStamp * 1000);
        const year = now.getFullYear().toString().padStart(4, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${year}/${month}/${day} ${hours}:${minutes}`;
        return formattedTime;
    }

    updateView(data: IMailBriefData) {
        this.node.getComponent(Widget).updateAlignment();
        this.richText.maxWidth = this.node.getComponent(UITransform).contentSize.x - 84;
        this.richText.getComponent(Widget).updateAlignment();
        this.title.string = data.title;
        this.time.string = this.getTimeStrToMail(data.createdAt || 0);
        let text = data.content || "";
        // 都使用富文本实现
        this.richText.node.active = true;
        this.richText.string = text;
        this.richText.getComponent(Widget).updateAlignment();
        this.node.getComponent(UITransform).height = this.richText.getComponent(UITransform).height + 300;
    }
    updateChildAlinement(parentNode: Node) {
        this.visit(parentNode, (node: Node) => {
            let widget = node.getComponent(Widget);
            if (widget) {
                widget.updateAlignment();
            }
        });
    }

    /*
    * 递归搜索节点
    */
    visit(node: Node, call: Function) {
        if (call(node)) {
            return node;
        }
        // 遍历子节点
        for (var i = 0; i < node.children.length; ++i) {
            var childNode = node.children[i];
            this.visit(childNode, call);
        }
    }
}


