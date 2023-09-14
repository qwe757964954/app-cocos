import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { GameData } from 'game/mahjong/model/GameData';
import { MahjongRoom } from 'game/mahjong/Room';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { Audio, Log } from 'bos/exports';
import { Event } from 'game/mahjong/config/Event';
import { Table } from 'idl/tss/game/table.v2';
import { AudioUtils } from 'game/mahjong/AudioUtils';
import { AudioConfig } from 'game/mahjong/config/AudioConfig';

@ccclass('TuoGuan')
export class TuoGuan extends XComponent {

    @property(Node)
    public bg: Node | null = null; 

    @property(Sprite)
    public aiBtn: Sprite | null = null;

    myPlayer: GamePlayer;

    onLoad(): void {
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        this.myPlayer = MahjongRoom.gameData.getMySelf();
        this.myPlayer.on(this.myPlayer.EventType.PLAYER_SET_AI_STATUS, this.setAIStatus, this);
    }

    start() {
        this.bg.active = false;
    }

    onDestroy(): void {
        this.myPlayer?.removeAll(this);
    }

    update(deltaTime: number) {

    }

    resetView(deltaTime: number) {
        this.bg.active = false;
    }

    setAIStatus(isAi: boolean) {
        Log.d("==setAIStatus==", isAi);
        isAi && Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_tg));
        this.bg.active = isAi;
    }

    //取消托管
    onCancel() {
        Table.StopManaged({},{ext: MahjongRoom.msgHandler.tableKey});
        this.bg.active = false;
    }

    switchDir(dir: number) {

    }
}