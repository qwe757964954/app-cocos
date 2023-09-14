import { _decorator, Component, Node, director, log } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, resLoader, uiMgr } from 'bos/exports';
import { App } from 'app/App';
import { ResLoader } from 'bos/framework/loader/ResLoader';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Prefab } from 'cc';

@ccclass('Homepage')
export class Homepage extends XComponent {
    setup() {
        console.log("Homepage.setup")
    }
}