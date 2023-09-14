import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/dummy/src/component/Room';
import { ExtendTable, MsgDealCard, PlayOpResult} from 'game/dummy/idl/tss/thailand/dummy';

@ccclass('dummy-HandCard')
export class HandCard extends XComponent {

    @property(Node)
    public handCard: Node | null = null;

    onLoad(): void {
        Room.eventSystem.on(ExtendTable.NotifyDealCard.name, this.onDealCard, this);
        Room.eventSystem.on(ExtendTable.NotifyOpResult.name, this.onOpResult, this);
    }

    start() {

    }

    update(deltaTime: number) {

    }

    //发牌
    onDealCard(msg: MsgDealCard) {
        let dealInfos = msg.dealCards;
        for(let info of dealInfos) {
            let seat = Room.gameData.getLocalSeatByID(info.uid);
            
        }
    }

    //操作结果
    onOpResult(msg: PlayOpResult) {
                
    }

}