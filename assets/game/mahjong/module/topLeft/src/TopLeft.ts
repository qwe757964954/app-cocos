import { _decorator, Component, Label, } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MahjongRoom } from 'game/mahjong/Room';
import { GameData } from 'game/mahjong/model/GameData';
import { Event } from 'game/mahjong/config/Event';
import { uiMgr } from 'bos/exports';

@ccclass('TopLeft')
export class TopLeft extends XComponent {

    @property(Label)
    public leftNum: Label | null = null; //剩余牌张数

    onLoad(): void {
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        MahjongRoom.gameData.on(MahjongRoom.gameData.EventType.REMAIN_CHANGE, this.onRemainChange, this);
    }

    start(): void {
        this.leftNum.string = " ";
    }

    onDestroy(): void {
        MahjongRoom.gameData?.removeAll(this);
    }

    update(deltaTime: number) {

    }

    onRemainChange(wallCnt: number) {
        this.leftNum.string = wallCnt.toLocaleString();
        if (wallCnt == 25) {
            uiMgr.showToast("还剩25张牌！")
        }
    }

    resetView() {
        this.leftNum.string = " ";
    }
}