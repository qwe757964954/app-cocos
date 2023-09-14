import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/pdk/Room';
import { PdkResultLayer } from 'game/pdk/module/resultLayer/src/component/ResultLayer';
import { MateMgr } from 'app/domain/mate/MateMgr';
import { App } from 'app/App';
import { ExtendTable } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { find } from 'cc';

@ccclass('PdkGameEnd')
export class PdkGameEnd extends XComponent {

    @property(Node)
    public contentNode: Node;

    public resultLayer: Node;


    onLoad() {
        Room.matchMgr.on(MateMgr.EventType.ON_READY_DESK, this.hideView, this);
        Room.matchMgr.on(MateMgr.EventType.ON_JOIN_DESK, this.hideView, this);
        Room.eventSystem.on(ExtendTable.NotifyGameStart.name, this.hideView, this);
    }

    protected start(): void {
        this.hideView();
    }
    
    onDisable() {
        Room.matchMgr.removeAll(this);
        Room.eventSystem.removeAll(this);
    }

    setup() {
        this.showView();
    }

    showView() {
        this.contentNode.active = true;
    }

    hideView() {
        this.contentNode.active = false;
    }

    onClickContinue() {
        App.mateMgr.readyDesk();
        this.contentNode.active = false;
    }
    
    onClickResultInfo() {
        this.resultLayer = this.resultLayer || find('Canvas/contentLayer/ResultLayer/ResultLayer');
        if(this.resultLayer) {
            this.resultLayer.getComponent(PdkResultLayer).showResult();
            this.hideView();
        } else {
            console.warn(' this.resultLayer is null, find it fail');
        }
    }
    onClickExit() {
        this.contentNode.active = false;
        Room.eventSystem.emit(Room.Event.EXIT_GAME);
    }
}