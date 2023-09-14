import { _decorator, Component, Node, sys } from 'cc';
const { ccclass, property } = _decorator;
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { Label } from 'cc';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { App } from 'app/App';
import { Utils } from 'app/utils/Utils';
import { uiMgr } from 'bos/exports';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { MUser } from 'app/domain/match/match/data/UserInfo';

@ccclass('ObView')
export class ObView extends BaseMatchView {
    @property(Label)
    rankLabel: Label

    @property(Label)
    tipsLabel: Label

    @property(Label)
    uidLabel: Label

    uid: number
    rank: number
    table: MTable

    onDisable(): void {
        this.removeMatchEventListener()
    }

    onDestroy(): void {
        this.removeMatchEventListener()
    }

    addMatchEventListener() {
        if (this.handler) {
            this.handler.on(MatchHandler.EventType.RankChange, this.onRankChange, this)
        }
    }

    removeMatchEventListener() {
        if (this.handler) {
            this.handler.off(MatchHandler.EventType.RankChange, this.onRankChange, this)
        }
    }

    @Utils.throttle(500)
    onRankChange() {
        this.updateRank()
    }

    async updateView(handler: MatchHandler, params?) {
        super.updateView(handler)

        this.uid = params?.uid
        this.table = params?.table

        if (this.uid) {
            if (sys.isBrowser) {
                this.uidLabel.string = this.uid.toString()
            }

            this.updateTips()
            this.updateRank()
        }
    }

    async updateTips() {
        let model = await App.userMgr.getUserByID(this.uid).finish()
        this.tipsLabel.string = `正在观战[${model.nickname}]中...`
    }

    updateRank() {
        let user = this.handler.roomInfo.userInfo.findUser(this.uid)
        if (!user) {
            console.error("ObView updateRank can not find user", this.uid, this.handler.roomInfo)
            return
        }

        let rank = 0
        let totalNum = 0
        if (this.handler.roomInfo.getHasGroup()) {
            totalNum = this.handler.roomInfo.getPlayingNumByGroupID(user.groupID)
            let userRanks = this.handler.roomInfo.userInfo.getRankUsers()
            for (let index = 0; index < userRanks.length; index++) {
                const element = userRanks[index];
                if (element.groupID == user.groupID) {
                    rank++
                }

                if (element == user) {
                    break
                }
            }
        } else {
            rank = user.rank ?? 1
            totalNum = this.handler.roomInfo.getPlayingNum()
        }

        this.rankLabel.string = `${rank}/${totalNum}`
    }

    onGiftTouch() {
        uiMgr.showToast("正在开发中...")
    }

    async onSwitchTouch() {
        if (this.table && this.table.status == PBRegularCommon.TableStatusPlaying) {
            let uids = this.table?.uids ?? []
            let index = uids.indexOf(this.uid)
            if (index == -1) {
                index = 0
                console.warn("ObView onSwitchTouch not find uid in uids", this.table, this.uid)
            }
            let nextIndex = index + 1
            if (nextIndex >= uids.length) {
                nextIndex = 0
            }
            let newUid = uids[nextIndex]
            if (newUid) {
                let err = await this.handler.switchObserver(newUid)
                console.debug("switchObserve result", err)
                if (!err) {
                    this.uid = newUid
                    this.updateTips()
                    this.updateRank()
                } else {
                    uiMgr.showToast("切换视角失败")
                }
            } else {
                console.error("ObView onSwitchTouch uids in empty", this.table, this.uid, nextIndex)
            }
        } else {
            uiMgr.showToast("桌子已结束")
        }
    }

    onLeaveTouch() {
        this.handler.leaveTableObserver(!this.handler.isRealTime)
    }

    onRankTouch() {
        let index = this.handler.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let dynamicID = this.handler.roomInfo.baseInfo.getDynamicStageId()
        let promotionType = this.handler.roomInfo.config.getPromotionType(index, dynamicID)
        if (promotionType === PBRegularCommon.PromotionTypeTableRank) {
            // 更新玩家信息
            const rankUsers: MUser[] = [];
            for (let i = 1; i <= this.table.uids.length; i++) {
                const v = this.table.uids[i];
                const user = this.handler.roomInfo.userInfo.findUser(v);
                if (user) {
                    let newUser = user.clone()
                    newUser.rank = user.rankTable
                    rankUsers.push(newUser);
                } else {
                    console.error("ObView:onRankTouch 没有找到玩家", v, this.handler);
                }
            }
            rankUsers.sort((a, b) => a.rank - b.rank);

            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {
                params: {
                    handler: this.handler,
                    users: rankUsers,
                    rankPrizes: this.handler.roomInfo.config.getRankPrize(this.handler.roomInfo.getPrizePool(), dynamicID, false),
                    isObserver: true,
                }
            })
        } else {
            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {
                params: {
                    handler: this.handler,
                    users: this.handler.roomInfo.userInfo.getRankUsers(),
                    rankPrizes: this.handler.roomInfo.config.getRankPrize(this.handler.roomInfo.getPrizePool(), dynamicID, false),
                    isObserver: true,
                }
            })
        }
    }
}