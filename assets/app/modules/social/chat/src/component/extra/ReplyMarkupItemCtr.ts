import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IM } from 'qsdk/im/IM';
import { NodeUtil, uiMgr } from 'bos/exports';
import { AlertParams } from 'bos/framework/gui/UIMgr';

@ccclass('ReplyMarkupItemCtr')
export class ReplyMarkupItemCtr extends XComponent {
    @property(Label)
    descLabel: Label = null

    parentObj;
    message;
    msgID;
    itemData;

    _updateView(data) {
        this.parentObj = data.parentObj
        this.message = data.message
        this.msgID = this.message.msgID

        this.itemData = data.item

        this.descLabel.string = this.itemData.text
    }

    onClick() {
        const itemData = this.itemData;

        // 跳转URL
        if (this.itemData.url && this.itemData.url !== "") {
            // QChat.openUrl(this.itemData.url);
            return;
        }

        const component = itemData.component;
        console.log({ itemData: this.itemData, component }, "ReplyMarkupItemCtr:onClickSelf");
        if (component && component.type === 1) {
            this.showDialog(component.messageBox);
        } else {
            this.query();
        }

    }

    async query() {
        let req = {
            msgID: this.msgID,
            queryData: this.itemData.queryData,
            queryURL: this.itemData.queryURL,
        }

        
        let { err, resp } = await IM.getInstance().itemQuery(req)

        if (resp.toast && resp.toast !== "") {

            uiMgr.showToast(resp.toast);
        }
        if (!err) {
            const messageUpdateTrigger = resp.messageUpdateTrigger;
            if (messageUpdateTrigger) {
                this.message.replyMarkup = messageUpdateTrigger.replyMarkup || {};
            }
            IM.getInstance().getDB().updateMessage(this.message)
            NodeUtil.sendMessage(this.parentObj, "updateView", this.message)

        }
    }


    showDialog(messageBox) {
        let title: string = "提 示";
        if (messageBox.title && messageBox.title !== "") {
            title = messageBox.title;
        }

        const message: string = messageBox.message || "";

        let confirmText: string = "确认";
        if (messageBox.confirmText && messageBox.confirmText !== "") {
            confirmText = messageBox.confirmText;
        }

        let cancelText: string = "取消";
        if (messageBox.cancelText && messageBox.cancelText !== "") {
            cancelText = messageBox.cancelText;
        }

        let alert: AlertParams = {
            title: title,
            content: message,
            cancel: {
                title: confirmText,
                callback: () => {
                    this.query();
                }
            },
            ok: {
                title: cancelText,
                callback: () => { }
            },
        }

        uiMgr.pushAlert(alert)

    }
}
