import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { App } from 'app/App';
import { AccountMgr } from 'app/domain/account/AccountMgr';

@ccclass('Hall')
export class Hall extends XComponent {

    onLoad() {
        App.sessionMgr.reconnectSession()
    }

    gotoGame() {
        App.navMgr.navTo(App.navCfg.GAME_LIST)
    }

    gotoPrizeCenter() {
        App.navMgr.navTo(App.navCfg.PRIZE_CENTER)
    }

    gotoMatch() {
        App.navMgr.navTo(App.navCfg.MATCH_LIST);
    }
}