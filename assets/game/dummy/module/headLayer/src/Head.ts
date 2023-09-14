import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/dummy/src/component/Room';
import { Event } from 'game/dummy/config/Event';
import { GamePlayer } from 'game/dummy/model/GamePlayer';
import { ExtendTable, MsgUserScoreChange, PlayCardInfo } from 'game/dummy/idl/tss/thailand/dummy';
import { Player } from 'game/room/model/Player';
import { HeadPre } from 'game/room/module/head/src/component/HeadPre';
import { RingyBar } from 'game/room/module/ringyBar/src/RingyBar';

@ccclass('Head')
export class Head extends XComponent {

    @property(HeadPre)
    public headPre: HeadPre | null = null;

    @property(RingyBar)
    public ringyBar: RingyBar | null = null;

    @property(Label)
    public score: Label | null = null;  //分数

    @property(Label)
    public leftNum: Label | null = null;  //剩余牌张数

    @property(Label)
    public nickName: Label | null = null;  //剩余牌张数

    myPlayer: GamePlayer;

    onLoad(): void {
        Room.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
    }

    start() {

    }

    update(deltaTime: number) {

    }

    //初始化
    init(seat: number): void {
        this.headPre.bindPlayerBySeat(seat);
        this.myPlayer = Room.gameData.getPlayerByLocalSeat(seat);
        //玩家信息改变，更新玩家数据
        this.myPlayer.on(Player.EventType.UPDATE_USERINFO, this.onPlayerInfoChange, this);
        this.myPlayer.on(this.myPlayer.EventType.PLAYER_CARDS_CHANGE, this.onPlayerCardsChange, this);
        Room.gameData.on(ExtendTable.NotifyPlayStart.name, this.onOpStart, this);
        Room.gameData.on(ExtendTable.NotifyOpResult.name, this.onOpResult, this);
    }

    onDestroy(): void {
        this.myPlayer.removeAll(this);
    }

    onPlayerInfoChange() {
        this.nickName.string = this.myPlayer.nickname;
    }

    onPlayerCardsChange() {
        let leftCount = this.myPlayer.localSeat == 1 ? this.myPlayer.getCards().length : this.myPlayer.getCardCount(); //剩余的手牌数
        if (leftCount >= 0) {
            this.leftNum.string = leftCount.toLocaleString(); 
        }
    }

    onOpStart(data: PlayCardInfo) {
        let downStart = data.time + data.extraTime;
        let seat = Room.gameData.getLocalSeatByID(data.uid);
        if (this.myPlayer.getLocalSeat() == seat && downStart > 0) {
            this.ringyBar.setColor("#FFD03F");
            this.ringyBar.setStartTime(downStart);
        }
    }

    onOpResult() {
        this.ringyBar.setEnd();
    }

    setScoreChange(change: MsgUserScoreChange) {

    }

    resetView() {
        
    }
}