import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Color } from 'cc';


export interface ICharSideBarCell {
    char: string,
    selected: boolean,
    isTouch: boolean,
}

@ccclass('CharSideBarCellCtr')
export class CharSideBarCellCtr extends XComponent {
    @property(Label)
    bubbleText: Label = null
    @property(Node)
    selectBubble: Node = null
    @property(Node)
    selectedView: Node = null
    @property(Label)
    charLabel: Label = null

    start() {
        this.selectedView.active = false

    }

    updateView(data: any) {
        console.log("updateView---->", data)
        if (data.char) {
            this.charLabel.string = data.char;
            this.bubbleText.string = data.char;
        }

        this.selectedView.active = data.selected ?? false;

        if (data.selected) {
            this.charLabel.color = new Color("#FFFFFF")
        } else {
            this.charLabel.color = new Color("#9E9E9E")
        }

        this.selectBubble.active = data.isTouch ?? false;
    }
}