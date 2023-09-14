import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { eventSystem } from 'bos/exports';
import { IMenu } from 'idl/mpff/social/officialaccount.v1';

@ccclass('SubMenuCell')
export class SubMenuCell extends XComponent {
    @property(Node)
    line: Node = null

    @property(Label)
    menuLabel: Label = null

    _menu: any = null
    _delegate: any = null
    _index: any = null

    updateView(data: any) {
        this._menu = data.menu
        this._delegate = data.delegate
        this._index = data.index

        let menu = data.menu

        if (menu.name) {
            this.menuLabel.string = menu.name
        }

        if (data.isLast) {
            this.line.active = false
        }
        else {
            this.line.active = true
        }

    }

    onClickMenu() {
        if (this._menu && this._delegate) {
            this._delegate(this._index)
        }
    }

}