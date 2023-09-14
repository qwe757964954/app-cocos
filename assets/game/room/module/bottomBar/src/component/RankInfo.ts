import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Room } from 'game/room/Room';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { Sprite } from 'cc';
import { Table } from 'idl/tss/game/table.v2';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { SpriteFrame } from 'cc';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { uiMgr } from 'bos/exports';
import { App } from 'app/App';

@ccclass('RankInfo')
export class RankInfo extends XComponent {

    @property(Label)
    public rankLab: Label;
    @property(Sprite)
    public statusImg: Sprite;
    @property(SpriteFrame)
    public statusFrame: SpriteFrame[] = [];

    private lastRank: number;
    private updateTime: number;
    private timerCall: Function;
    
    onLoad() {
        this.lastRank = 0;
        this.updateTime = 0;
        Room.matchMgr.on(MatchHandler.EventType.RankChange, this.onRankChange, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.matchMgr.on(MatchHandler.EventType.MatchTableStart, this.onMatchTableStart, this);
    }

    protected start(): void {
        this.updateRank();
    }

    onDisable(): void {
        this.clearTimer();
        Room.matchMgr.removeAll(this);
        Room.eventSystem.removeAll(this);
    }

    clearTimer() {
        if (this.timerCall) {
            this.unschedule(this.timerCall);
            this.timerCall = null;
        }
    }

    onMatchTableStart(table : MTable, isMeIn : boolean) {
        isMeIn && this.updateRank();
    }

    onNotifyReconnect() {
        this.updateRank();
    }

    onRankChange() {
        this.updateRank();
    }
    
    /**
     * 一秒内只刷新一次排行榜，防止频率过高
     */
    updateRank() {
        let now = Date.now();
        if (now - this.updateTime >= 1) {
            this.clearTimer();
            this.setRank();
            this.updateTime = now;
        } else {
            if (!this.timerCall) {
                this.timerCall = ()=>{
                    this.setRank();
                    this.clearTimer();
                }
                this.scheduleOnce(this.timerCall, 1);
            }
        }
    }

    setRank() {
        let roomInfo = Room.matchMgr.getRoomInfo();
        let userInfo = Room.matchMgr.getShowUserInfo();
        if(!userInfo || !roomInfo) {return};
        let ID = roomInfo.baseInfo.getDynamicStageId();
        let index = roomInfo.baseInfo.getStageInfo().getStageIndex();
        let promotionType = roomInfo.config.getPromotionType(index, ID);
        if (promotionType == PBRegularCommon.PromotionTypeTableRank) {
            this.lastRank = userInfo.rankTable || 0;
            this.rankLab.string = `本桌第${userInfo.rankTable || 0}名`;
        } else {
            this.rankLab.string = `${userInfo.rank}/${userInfo.totalNum}`;
        }
        let isDown = this.lastRank && this.lastRank > 0 && userInfo.rank > this.lastRank;
        this.statusImg.spriteFrame = isDown ? this.statusFrame[1] : this.statusFrame[0];
    }


    onClickRankBtn() {
        let uid = Room.gameData.getMyID();
        let roomInfo = Room.matchMgr.getRoomInfo();
        let handler = Room.matchMgr.getRegularHandler();
        let dynamicID = roomInfo.baseInfo.getDynamicStageId();
        let index = roomInfo.baseInfo.getStageInfo().getStageIndex();
        let promotionType = roomInfo.config.getPromotionType(index, dynamicID);
        if (promotionType === PBRegularCommon.PromotionTypeTableRank) {
            // 更新玩家信息
            let table = roomInfo.tableInfo.findTableByUID(uid);
            if (!table) {
                console.error("StageWaitView onRankTouch not find table")
                return
            }
            const rankUsers: MUser[] = [];
            for (let i = 1; i <= table.uids.length; i++) {
                const v = table.uids[i];
                const user = roomInfo.userInfo.findUser(v);
                if (user) {
                    let newUser = user.clone()
                    newUser.rank = user.rankTable
                    rankUsers.push(newUser);
                } else {
                    console.error("ObView:onRankTouch 没有找到玩家", v, handler);
                }
            }
            rankUsers.sort((a, b) => a.rank - b.rank);
            
            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {params : {
                handler : handler,
                users : rankUsers,
                rankPrizes : roomInfo.config.getRankPrize(roomInfo.getPrizePool(), dynamicID, false),
                isObserver : uid == App.userMgr.loginUid,
            }})
        } else {
            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {params : {
                handler : handler,
                users : roomInfo.userInfo.getRankUsers(),
                rankPrizes : roomInfo.config.getRankPrize(roomInfo.getPrizePool(), dynamicID, false),
                isObserver : uid == App.userMgr.loginUid,
            }})
        }
    }
}