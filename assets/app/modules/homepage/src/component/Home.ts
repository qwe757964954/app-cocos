import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { uiMgr } from 'bos/exports';

@ccclass('Home')
export class Home extends XComponent {
    setup() {
        console.log("Home.setup")
    }
}