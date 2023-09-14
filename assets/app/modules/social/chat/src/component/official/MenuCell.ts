import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IMenu } from 'idl/mpff/social/officialaccount.v1';
import { eventSystem } from 'bos/exports';

@ccclass('MenuCell')
export class MenuCell extends XComponent {

    @property(Node)
    hasMenuIcon: Node = null

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

        if (menu.functionType == 1) {
            this.hasMenuIcon.active = true
        } else {
            this.hasMenuIcon.active = false
        }

    }

    onClickMenu() {
        if (this._menu && this._delegate) {
            // eventSystem.emit("ON_CLICK_OFFICIAL_MENU_CELL", this._menu)
            this._delegate(this._index)
        }
    }


}