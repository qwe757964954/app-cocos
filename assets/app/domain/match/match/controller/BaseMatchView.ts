import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';

@ccclass('BaseMatchView')
export class BaseMatchView extends XComponent {
    handler : MatchHandler

    updateView(handler : MatchHandler, params?) {
        this.handler = handler
    }

    getData() : any {

    }
}