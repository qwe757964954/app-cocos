import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IItemQueryReq } from 'idl/mpff/social/im.v2';
import { IM } from 'qsdk/im/IM';
import { Util } from 'qsdk/im/Util';
import { StringUtil } from 'bos/exports';

@ccclass('ChatListItemCtr')
export class ChatListItemCtr extends Component {

    @property(Node)
    line: Node = null

    @property(Label)
    desLabel: Label = null

    msgID = null
    item = null
    _updateView(data) {
        console.log("ChatListItemCtr:updateView", data)
        this.item = data.item
        this.msgID = data.msgID

        this.line.active = !data.isLast

        this.desLabel.string = this.item.text
    }


    async onClickItem() {
        let req = {
            msgID: this.msgID,
            queryData: this.item.queryData,
            queryURL: this.item.queryURL
        }

        let { err, resp } = await IM.getInstance().itemQuery(req)
        console.log(err, resp)
    }
}