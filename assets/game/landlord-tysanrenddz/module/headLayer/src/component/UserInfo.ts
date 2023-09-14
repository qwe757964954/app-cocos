import { XComponent } from 'bos/exports';
import { Node } from 'cc';
import { UIOpacity } from 'cc';
import { Label } from 'cc';
import { _decorator} from 'cc';
import { GameStage, Identity } from 'game/pdk/model/GameConst';
import { GamePlayer } from 'game/pdk/model/GamePlayer';
import { Room } from 'game/pdk/Room';
import { Player } from 'game/room/model/Player';
import { HeadPre } from 'game/room/module/head/src/component/HeadPre';
import { NamePre } from 'game/room/module/head/src/component/NamePre';
import { ScorePre } from 'game/room/module/head/src/component/ScorePre';
import { MsgManaged, Table } from 'idl/tss/game/table.v2';
import { ExtendTable, MsgDealCard, MsgGameResult, PlayCardResult, RaiseScoreResult } from 'game/pdk/idl/tss/pdk/extendtable.v3';


const { ccclass, property } = _decorator;



@ccclass('UserInfo')
export class UserInfo extends XComponent {
    
    @property(HeadPre)
    public HeadPre: HeadPre;
    @property(NamePre)
    public NamePre: NamePre;
    @property(ScorePre)
    public ScorePre: HeadPre;
    @property(Node)
    public cardNum: Node;
    @property(Label)
    public doubleLab: Label;
    @property(Node)
    public lordIcon: Node;
    @property(Node)
    public deposit: Node;
    
    
    
    myPlayer: GamePlayer;



    start() {
    }
    
    bindPlayerBySeat(seat: number) {
        this.myPlayer = Room.gameData.getPlayerByLocalSeat(seat);
        console.log('==UserInfo.bindPlayBySeat==', seat, this.myPlayer);

        this.onUpdateUid(this.myPlayer);
        this.updateDeposit();
        this.updateLordIcon();
        this.updateDoubleCode();
        this.updateCardNum();
        this.HeadPre.bindPlayerBySeat(seat);
        this.NamePre.bindPlayerBySeat(seat);
        this.ScorePre.bindPlayerBySeat(seat);

        Room.eventSystem.removeAll(this);
        Room.eventSystem.on('NotifyBanker', this.onNotifyBanker, this);
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        this.myPlayer.on(Player.EventType.UPDATE_USERINFO, this.onUpdateUid, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyDealCard.name, this.onNotifyDealCard, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayCard.name, this.onNotifyPlayCard, this);
        Room.eventSystem.on(ExtendTable.NotifyGameResult.name, this.onNotifyGameResult, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreResult.name, this.onNotifyRaiseScoreResult, this);
    }

    onNotifyBanker(uid: number) {
        this.updateLordIcon();
    }

    onNotifyReconnect() {
        this.updateLordIcon();
    }

    unbindPlayer() {
        if (this.myPlayer) {
            this.myPlayer.removeAll(this);
            this.HeadPre.unbindPlayer();
            this.NamePre.unbindPlayer();
            this.ScorePre.unbindPlayer();
        }
        Room.eventSystem.removeAll(this);
    }

    onUpdateUid(user: GamePlayer) {
        this.node.active = user && user.uid > 0;
    }

    onNotifyDealCard(data: MsgDealCard) {
        for (const v of data.dealCards) {
            if (this.myPlayer.uid == v.uid) {
                this.updateCardNum();
                break;
            }
        }
    }

    onNotifyRaiseScoreResult(data: RaiseScoreResult) {
        if (this.myPlayer.uid == data.uid) {
            this.updateDoubleCode(data.opcode);
        }
    }

    onNotifyPlayCard(data: PlayCardResult) {
        if (this.myPlayer.uid == data.uid) {
            this.updateCardNum();
        }
    }

    onNotifyManaged(msg: MsgManaged) {
        if (this.myPlayer.uid == msg.uid) {
            this.updateDeposit();
        }
    }

    onNotifyGameResult(data: MsgGameResult) {
        this.resetView();
    }

    resetView() {
        this.deposit.active = false;
        this.lordIcon.active = false;
        this.doubleLab.node.parent.active = false;
        this.cardNum.getComponent(UIOpacity).opacity = 0;
    }

    updateCardNum() {
        let num = this.myPlayer.getHandCardNum();
        if (this.myPlayer.uid != Room.gameData.getMyID() && num > 0) {
            this.cardNum.getComponent(UIOpacity).opacity = 255;
            this.cardNum.getChildByName('num').getComponent(Label).string = num.toString();
        } else{
            this.cardNum.getComponent(UIOpacity).opacity = 0;
        }
    }

    updateDoubleCode(code: number = 0) {
        this.doubleLab.node.parent.active = code > 0;
        if (code == 1) {
            this.doubleLab.string = '加倍';
        } else if (code == 2) {
            this.doubleLab.string = '超级加倍';
        }
    }

    updateDeposit() {
        this.deposit.active = this.myPlayer.isAI;
    }

    updateLordIcon() {
        this.lordIcon.active = this.myPlayer.identity == Identity.Dealer;
    }

}