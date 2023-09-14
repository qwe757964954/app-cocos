import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/pdk/Room';
import { instantiate } from 'cc';
import { Prefab } from 'cc';
import { Score } from './Score';
import { IUser, User } from 'idl/tss/match_v2/common_matematch';
import { ExtendTable } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { MateMgr } from 'app/domain/mate/MateMgr';
import { IMsgOneGameResult, MsgOneGameResult } from 'idl/tss/match_v2/matematch.v1';
import { Table } from 'idl/tss/game/table.v2';


@ccclass('FlyScore')
export class FlyScore extends XComponent {

    @property(Prefab)
    public scorePre: Prefab;
    @property(Node)
    public bgNode: Node;
    @property(Node)
    public contentNode: Node;
    

    private scoreList: Node[] = [];
    private playerMap: Map<number, number>;

    onLoad() {
        this.playerMap = new Map();
        Room.matchMgr.on(MateMgr.EventType.ON_READY_DESK, this.hideView, this);
        Room.matchMgr.on(MateMgr.EventType.ON_JOIN_DESK, this.hideView, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onGameStart, this);
        Room.eventSystem.on(ExtendTable.NotifyGameStart.name, this.onGameStart, this);
        Room.matchMgr.on(MateMgr.EventType.ON_GAME_RESULT, this.onGameResultData, this);
    }

    protected start(): void {
        this.bgNode.active = false;
        this.onGameStart();
    }
    
    onDestroy() {
        Room.matchMgr?.removeAll(this);
        Room.eventSystem?.removeAll(this);
    }

    onGameStart() {
        this.playerMap.clear();
        for (const v of Room.gameData.getAllPlayer()) {
            this.playerMap.set(v.uid, v.localSeat);
        }
        this.hideView();
        console.log('==FlyScore==onGameStart', this.playerMap);
    }

    hideView() {
        this.bgNode.active = false;
        this.contentNode.children?.forEach(v => {
            this.scoreList.push(v);
            v.removeFromParent();
        });
    }

    onGameResultData(msg: IMsgOneGameResult) {
        let data = {...msg}
        console.log('==FlyScore==onGameResultData', data);
        this.bgNode.active = true;
        this.scheduleOnce(()=>{
            this.bgNode.active = false;
        }, 1.5);
        for (let i = 0; i < data.users.length; i++) {
            let node = this.contentNode.children[i];
            if(!node) {
                node = this.scoreList[i] || instantiate(this.scorePre);
                this.contentNode.addChild(node);
            }
            let user: IUser = data.users[i];
            let score = user.changeScore || 0;
            let seat = this.playerMap.get(user.uid);
            let info = {seat: seat - 1, score: score, isLimit: false};
            info.isLimit = user.changeScore < 0 && Math.abs(user.changeScore) >= data.over?.LoseLimit;
            node.getComponent(Score).setup(info);
        }
    }

    onClickTest() {
        this.bgNode.active = true;
        this.scheduleOnce(()=>{
            this.bgNode.active = false;
        }, 1.5);
        let data: MsgOneGameResult = new MsgOneGameResult({});
        data.users = [
            new User({
                uid: 1,
                changeScore: -1000,
            }),
            new User({
                uid: 2,
                changeScore: -1000,
            }),
            new User({
                uid: 3,
                changeScore: -1000,
            }),
        ]

        for (let i = 0; i < data.users.length; i++) {
            let node = this.contentNode.children[i];
            if(!node) {
                node = this.scoreList[i] || instantiate(this.scorePre);
                this.contentNode.addChild(node);
            }
            let user: IUser = data.users[i];
            let score = user.changeScore || 0;
            let info = {seat: i, score: score, isLimit: true};
            node.getComponent(Score).setup(info);
        }
    }
}