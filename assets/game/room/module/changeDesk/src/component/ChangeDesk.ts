import { _decorator, Button, Label, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log } from 'bos/exports';
import { Room } from 'game/room/Room';
import { Player, PlayerState } from 'game/room/model/Player';
import { MateMgr } from 'app/domain/mate/MateMgr';
import { MatchMgr } from 'app/domain/match/MatchMgr';
import { App } from 'app/App';
import { Desk } from 'app/domain/mate/Desk';


interface GameUser {
    uid: number,
    isReady: boolean
}

@ccclass('ChangeDesk')
export class ChangeDesk extends XComponent {
    @property(Node)
    public btnContent: Node;
    @property(Label)
    public timeLab: Label;
    @property(Button)
    public changeBtn: Button;
    @property(Node)
    public tipsAnim: Node;


    readyHandler: Function = null;
    countHandler: Function = null;
    onReadyTimer: Function = null;
    myPlayer: Player;

    onLoad() {
        Room.matchMgr.on(MateMgr.EventType.ON_JOIN_DESK, this.onEnterDesk, this);
    }

    protected start(): void {
        this.initUI();
        this.myPlayer = Room.gameData.getPlayerByLocalSeat(1);
        this.myPlayer.on(Player.EventType.UPDATE_USERINFO, this.onNotifyState, this);
    }

    onDestroy() {
        this.stopTimer();
        this.myPlayer?.removeAll(this);
    }

    initUI() {
        if (Room.gameData.getMyState() == PlayerState.Playing) {
            this.setContentActive();
        } else {
            this.timeLab.string = "";
            this.setContentActive(true);
        }
    }

    /**
     * 执行准备操作
     */
    doReadyAction() {
        Log.d("==doReadyAction==")
        App.mateMgr.readyDesk();
    }

    onClick_changeDesk() {
        Log.d("==onClick_changeDesk==");
        App.mateMgr.changeDesk();
        this.showChangeView();
    }

    onEnterDesk(data: Desk) {
        this.doChangeDesk(data.users);
    }

    /**
     * 第一次进来就直接是准备好的状态(后端自动准备)，点换桌就更新倒计时
     */
    doChangeDesk(users: Array<GameUser> = []) {
        for (const v of users) {
            if (v.uid == Room.gameData.getMyID() && !v.isReady) {
                this.doReadyAction();
                break;
            }
        }
        this.showChangeView();
    }

    showChangeView() {
        let time = 4;
        this.stopCountTimer();
        this.countHandler = () => {
            time = time - 1;
            this.changeBtn.interactable = time <= 0;
            this.timeLab.string = (time > 0) ? ("(" + time + ")") : "";
            this.changeBtn.node.getComponent(Sprite).grayscale = time > 0;
            Log.d("==onClick_changeDesk==", time);
        }
        this.countHandler();
        this.schedule(this.countHandler, 1, 3);
    }

    stopReadyTimer() {
        if (this.readyHandler) {
            this.unschedule(this.readyHandler);
            this.readyHandler = null;
        }
    }

    stopCountTimer() {
        if (this.countHandler) {
            this.unschedule(this.countHandler);
            this.countHandler = null;
        }
    }

    stopTimer() {
        this.stopCountTimer();
        this.stopReadyTimer();
    }

    setContentActive(bool: boolean = false) {
        Log.d("==setContentActive==", bool)
        this.btnContent.active = bool;
        this.changeBtn.interactable = bool;
        this.changeBtn.node.getComponent(Sprite).grayscale = !bool;
    }

    onNotifyState() {
        let state = this.myPlayer.state
        Log.d("=changeDesk=onNotifyState==", state)
        if (state == PlayerState.Ready) {
            this.setContentActive(!Room.gameData.checkAllPlayer());
        } else if (state == PlayerState.Playing || state == PlayerState.Result) {
            this.setContentActive();
        } else if (state == PlayerState.Default) {
            this.setContentActive(true);
            this.doReadyAction();
        }
    }


}