import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/dummy/src/component/Room';
import { ExtendTable, MsgGameResult } from 'game/dummy/idl/tss/thailand/dummy';

@ccclass('dummy-Settle')
export class Settle extends XComponent {

    onLoad(): void {
        Room.eventSystem.on(ExtendTable.NotifyGameResult.name, this.onGameResult, this);
    }

    start() {

    }

    update(deltaTime: number) {

    }

    //一局结束
    onGameResult(msg: MsgGameResult) {

    }
}