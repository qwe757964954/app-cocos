import { _decorator, Button, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { GraphicMaskRounded } from 'bos/framework/effect/components/GraphicMaskRounded';

export type AlertParams = {
    title: string,
    content: string,
    cancel?: {
        title: string
        callback?: () => void
    }
    ok?: {
        title: string
        callback?:  () => void
    }
}

@ccclass('AlertView')
export class AlertView extends XComponent {
    @property(Label)
    titleLabel: Label

    @property(Label)
    contentLabel: Label

    @property(GraphicMaskRounded)
    mask: GraphicMaskRounded

    @property(Button)
    cancelBtn: Button

    @property(Button)
    okBtn: Button

    @property(Node)
    div: Node

    @property(Node)
    bottom: Node

    private params:AlertParams
    
    start() {

    }

    setup(params: AlertParams) {
        this.params = params
        this.titleLabel.string = params.title
        this.contentLabel.string = params.content

        if (params.cancel) {
            this.cancelBtn.getComponentInChildren(Label).string = params.cancel.title
        } else {
            this.cancelBtn.node.active = false
            this.div.active = false
        }

        if (params.ok) {
            this.okBtn.getComponentInChildren(Label).string = params.ok.title
        } else {
            this.okBtn.node.active = false
            this.div.active = false
        }

        if (params.ok || params.cancel) {
            this.bottom.active = true
        } else {
            this.bottom.active = false
        }
    }

    onClickOk() {
        this.params.ok?.callback?.apply(null)
        this.node.destroy()
    }

    onClickCancel() {
        this.params.cancel?.callback?.apply(null)
        this.node.destroy()
    }
    
    onCloseTouch(){
        this.node.destroy()
    }
}