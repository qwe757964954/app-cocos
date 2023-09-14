import { _decorator, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { MahjongRoom } from 'game/mahjong/Room';
import { Event } from 'game/mahjong/config/Event';
import { GameData } from 'game/mahjong/model/GameData';
import { BetData, OperateOption } from 'game/mahjong/idl/tss/mahjong/extendtable';
import { Player } from 'game/room/model/Player';
import { Room } from 'game/room/Room';
import { RingyBar } from 'game/room/module/ringyBar/src/RingyBar';
import { HeadPre } from 'game/room/module/head/src/component/HeadPre';

@ccclass('Head')
export class Head extends XComponent {

    @property(Label)
    public moneyNum: Label | null = null;

    @property(Sprite)
    public zhuangIcon: Sprite | null = null;

    @property(Sprite)
    public xiaPaoIcon: Sprite | null = null;

    @property(Label)
    public xiaNum: Label | null = null;

    @property(Node)
    public aiIcon: Node | null = null;

    @property(HeadPre)
    public headPre: HeadPre | null = null;

    mPlayer: GamePlayer;

    //初始化
    init(seat: number): void {
        this.headPre.bindPlayerBySeat(seat);
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        MahjongRoom.gameData.on(MahjongRoom.gameData.EventType.OP_START, this.onOpStart, this);
        this.mPlayer = MahjongRoom.gameData.getPlayerByLocalSeat(seat);
        //玩家信息改变，更新玩家数据
        this.mPlayer.on(Player.EventType.UPDATE_USERINFO, this.onPlayerInfoChange, this);
        //设置下注icon
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_SET_BETDATA, this.onSetBetData, this);
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_OP_RESULT, this.onPlayerOpResult, this);
        //玩家托管
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_SET_AI_STATUS, (isAI: boolean) => {
            this.aiIcon.active = isAI;
        }, this)
    }

    onDestroy(): void {
        this.mPlayer?.removeAll(this);
    }

    onOpStart(opOption: OperateOption) {
        let downStart = opOption.time + opOption.extTime;
        let seat = MahjongRoom.gameData.getLocalSeatByID(opOption.uid);
        if (this.mPlayer.getLocalSeat() == seat && downStart > 0) {
            this.headPre.setRingyColor("#FFD03F");
            this.headPre.setRingyStart(downStart);
        }
    }

    onPlayerOpResult() {
        this.headPre.setRingyEnd();
    }

    showIcon(info: { isBanker?: boolean }) {
        if (info.isBanker) {
            this.zhuangIcon.node.active = true;
        }
    }

    //设置玩家网络头像, 玩家数值
    onPlayerInfoChange() {
        this.moneyNum.string = this.mPlayer.matchScore.toLocaleString();
    }

    onSetBetData(betData: BetData) {
        let opt = betData.opt;
        if (opt != null && opt.option != null && opt.option != -1 ) {
            this.xiaPaoIcon.node.active = true;
            this.xiaNum.string = opt.option.toLocaleString();
        }
    }

    resetView() {
        this.zhuangIcon.node.active = false;
        this.xiaPaoIcon.node.active = false;
    }

    start() {

    }

    update(deltaTime: number) {

    }
}