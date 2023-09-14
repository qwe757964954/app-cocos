import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/dummy/src/component/Room';
import { ExtendTable, MsgScoreChange } from 'game/dummy/idl/tss/thailand/dummy';
import { Head } from './Head';

@ccclass('dummy-HeadLayer')
export class HeadLayer extends XComponent {

    @property(Head)
    public head1: Head | null = null;

    @property(Head)
    public head2: Head | null = null;

    @property(Head)
    public head3: Head | null = null;

    @property(Head)
    public head4: Head | null = null;

    onLoad(): void {
        Room.eventSystem.on(ExtendTable.NotifyScoreChange.name, this.onScoreChange, this);
    }

    start() {
        this.head1.init(1);
        this.head2.init(2);
        this.head3.init(3);
        this.head4.init(4);
    }

    update(deltaTime: number) {

    }

    //分值变化
    onScoreChange(msg: MsgScoreChange) {
        let changes = msg.data;
        for (let index = 0; index < changes.length; index++) {
            let change = changes[index];
            let player = Room.gameData.getPlayerByID(change.uid);
            let seat = player.localSeat;
            this[`head${seat}`].setScoreChange(change);
        }
    }
}