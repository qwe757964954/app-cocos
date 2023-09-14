import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/dummy/src/component/Room';
import { ExtendTable, MsgFirstCardInfo, PlayOpResult } from 'game/dummy/idl/tss/thailand/dummy';

@ccclass('dummy-ShowCardLayer')
export class ShowCardLayer extends XComponent {  //生牌、下牌、牌堆、弃牌等

    onLoad(): void {
        Room.eventSystem.on(ExtendTable.NotifyFirstCard.name, this.onFirstCard, this);
        Room.eventSystem.on(ExtendTable.NotifyOpResult.name, this.onOpResult, this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    //头牌
    onFirstCard(msg: MsgFirstCardInfo) {

    }

    //操作结果
    onOpResult(msg: PlayOpResult) {
        
    }
    
}