import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { uiMgr } from 'bos/exports';

@ccclass('NavBar')
export class NavBar extends XComponent {
    @property(Node)
    backBtn: Node = null;

    onLoad() {
        console.log("NavBar.onLoad", uiMgr.getPageNum())
        this.backBtn.active = uiMgr.getPageNum() > 1
    }

    onClickBack() {
        uiMgr.popPage()
    }
}