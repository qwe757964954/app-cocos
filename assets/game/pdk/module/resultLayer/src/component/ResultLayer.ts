import { _decorator, EventTouch, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { Room } from 'game/pdk/Room';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { ExtendTable, MsgGameResult } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { Log, uiMgr } from 'bos/exports';
import { Color } from 'cc';
import { PdkGameEnd } from 'game/pdk/module/gameEnd/src/component/GameEnd';
import { PdkResultItem } from './item';
import { App } from 'app/App';
import { MateMgr } from 'app/domain/mate/MateMgr';
import { IMsgOneGameResult } from 'idl/tss/match_v2/matematch.v1';
import { Identity, ScoreType } from 'game/pdk/model/GameConst';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { find } from 'cc';
import { Table } from 'idl/tss/game/table.v2';
import { MatchInfo } from 'game/room/model/GameData';

interface ResultPlayer {
    uid: number,
    avatar: string,
    gender: number,
    isWin?: boolean;
    isLord?: boolean,
    nickname: string,
    multiple?: number;
    changeScore?: number,
    scoreInfo?: Map<number, number>,
}

@ccclass('PdkResultLayer')
export class PdkResultLayer extends XComponent {
    @property(Node)
    public resultViews: Node[] = [];

    @property(Node)
    public settleNode: Node | null = null;

    @property(Sprite)
    public bg: Sprite | null = null;

    @property(Sprite)
    public guang: Sprite | null = null;

    @property(Sprite)
    public titleBg: Sprite | null = null;

    @property(Label)
    public scoreLab: Label | null = null;

    @property(Label)
    public multiple: Label | null = null;

    @property(Sprite)
    public resultTitle: Sprite | null = null;

    @property(Sprite)
    public line1: Sprite | null = null;

    @property(Sprite)
    public line2: Sprite | null = null;

    @property(Sprite)
    public continueBtn: Sprite | null = null;

    @property(Avatar)
    public myHead: Avatar | null = null;

    @property(Label)
    public myName: Label | null = null;

    @property(Node)
    public itemInfo: Node | null = null;

    @property(Prefab)
    public itemPrefab: Prefab;
    
    @property(Node)
    public isLord: Node;
    
    @property(Node)
    public scoreInfo: Node;
    
    private gameEnd: Node;
    private isWin: boolean;
    private matchInfo: MatchInfo;
    private tableInfo: MsgGameResult;
    private playerList: Map<number, ResultPlayer>;

    onLoad() {
        Room.matchMgr.on(MateMgr.EventType.ON_GAME_RESULT, this.onNotifyGameResult, this);
        Room.matchMgr.on(MateMgr.EventType.ON_READY_DESK, this.hideView, this);
        Room.matchMgr.on(MateMgr.EventType.ON_JOIN_DESK, this.hideView, this);
        Room.eventSystem.on(ExtendTable.NotifyGameStart.name, this.onGameStart, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onGameReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyGameResult.name, this.packageData, this);
    }

    protected start(): void {
        this.playerList = null;
        this.resultViews.forEach(v=>{v.active = false});
    }
        
    onDisable() {
        Room.matchMgr.removeAll(this);
        Room.eventSystem.removeAll(this);
    }

    onGameStart() {
        this.playerList = null;
        this.matchInfo = {...Room.gameData.getMatchInfo()};
        this.hideView();
    }

    onGameReconnect() {
        this.matchInfo = {...Room.gameData.getMatchInfo()};
        this.hideView();
    }


    packageData(data: MsgGameResult) {
        this.tableInfo = data;
        this.playerList = new Map();
        for (const v of Room.gameData.getAllPlayer()) {
            let info: ResultPlayer = {
                uid: v.uid,
                multiple: 0,
                isWin: false,
                avatar: v.avatar,
                gender: v.gender,
                nickname: v.nickname,
                scoreInfo: new Map(),
                isLord: v.identity == Identity.Dealer,
            }
            for (let i = 0; i < data.results.length; i++) {
                let obj = data.results[i];
                if(v.uid == obj.uid) {
                    info.isWin = obj.result == 1;
                    info.multiple = Math.abs(obj.totalScore);
                    info.scoreInfo.set(ScoreType.RaiseScore, v.scoreInfo.get(ScoreType.RaiseScore));
                    if (v.uid == Room.gameData.getMyID()) {
                        this.tableInfo.scoreInfo.forEach(k => info.scoreInfo.set(k.key, k.value));
                    }
                    break;
                }
            }
            this.playerList.set(v.uid, info);
        }
        Log.d("==packageData==", this.matchInfo, this.tableInfo, this.playerList)
    }

    onClickBack() {
        this.gameEnd = this.gameEnd || find('Canvas/contentLayer/GameEnd/GameEnd');
        if(this.gameEnd) {
            this.gameEnd.getComponent(PdkGameEnd).setup();
            this.hideView();
        } else {
            Room.eventSystem.emit(Room.Event.EXIT_GAME);
            console.warn(' this.gameEnd is null, find it fail');
        }
    }

    showResult() {
        let dir = 0;
        for (let i = 0; i < this.resultViews.length; i++) {
            const view = this.resultViews[i];
            view.active = i == dir;
        }
    }

    //根据结算信息，展示结算
    onNotifyGameResult(data: IMsgOneGameResult) {
        if (!this.playerList) {
            this.packageData(MsgGameResult.decode(data.tableGameData));
        }
        this.scheduleOnce(()=>{
            // 延迟两秒显示结算，先显示飘分
            this.updateSettleInfo(data);
            this.showResult();
        }, 2)
    }

    updateSettleInfo(data: IMsgOneGameResult) {
        Log.d("==onShowSettle data==", data.users)
        let resultInfo = [];
        for (const v of data.users) {
            let info = this.playerList.get(v.uid);
            info.changeScore = v.changeScore
            this.playerList.set(v.uid, info);

            if (v.uid == Room.gameData.getMyID()) {
                resultInfo.unshift(info);
            } else {
                resultInfo.push(info);
            }
        }
        this.isWin = resultInfo[0].isWin;
        this.myHead.setUserID(resultInfo[0].uid);
        this.isLord.active = resultInfo[0].isLord;
        this.myName.string = resultInfo[0].nickname;
        Log.d("==updateSettleInfo==", resultInfo);
        this.updateResultTitle();
        this.updateTitleBg(resultInfo[0].multiple, resultInfo[0].changeScore);

        this.itemInfo.removeAllChildren();
        for (let index = 1; index < resultInfo.length; index++) {
            let info = resultInfo[index];
            let item = instantiate(this.itemPrefab);
            this.itemInfo.addChild(item);
            item.getComponent(PdkResultItem).init({
                uid: info.uid,
                isLord: info.isLord,
                avatar: info.avatar,
                gender: info.gender,
                nickname: info.nickname,
                curScore: info.curScore,
                multiple: info.multiple,
                changeScore: info.changeScore,
            });
        }
    }

    //根据输赢，更新title
    updateResultTitle() {
        let endNum = this.isWin ? '1' : '3';
        let titleSprite = this.resultTitle.getComponent(BundleSprite);
        if (titleSprite) {
            titleSprite.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_img_title${endNum}`;
        };

        let lSprite1 = this.line1.getComponent(BundleSprite);
        if (lSprite1) {
            lSprite1.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_img_line${endNum}`;
        };

        let lSprite2 = this.line2.getComponent(BundleSprite);
        if (lSprite2) {
            lSprite2.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_img_line${endNum}`;
        };
    }

    updateTitleBg(multiple: number, score: number) {
        let endStr = this.isWin ? 'win' : 'fail';
        let bgSprite = this.titleBg.getComponent(BundleSprite);
        if (bgSprite) {
            bgSprite.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_bg_${endStr}`;
        };

        this.scoreLab.string = score.toLocaleString();
        this.multiple.string = multiple.toLocaleString().concat("倍");
        this.scoreLab.color = new Color(this.isWin ? '#6F5140' : '#4C565E');
        this.multiple.color = new Color(this.isWin ? '#6F5140' : '#4C565E');
    }

    /**
     * 继续
     */
    onClickContinue() {
        App.mateMgr.readyDesk();
    }

    onClickScoreInfo(event: EventTouch){
        let lordUid = 0;
        for (const [k, v] of this.playerList) {
            if (v?.isLord) {
                lordUid = v.uid;
                break;
            }
        }
        uiMgr.loadPopup("common@game/res/prefab/ScoreInfo", {params : {
            lordUid: lordUid,
            target: event.target,
            tableInfo: this.tableInfo,
            uid: Room.gameData.getMyID(),
            baseMulti: Room.gameData.baseScore,
            baseScore: this.matchInfo?.baseScore,
            isPopup : true,
        }})
    }

    hideView() {
        this.resultViews.forEach(v=>{v.active = false});
    }

}