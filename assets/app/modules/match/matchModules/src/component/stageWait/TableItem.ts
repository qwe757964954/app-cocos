import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { HeadItem } from './HeadItem';
import { Label } from 'cc';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { uiMgr } from 'bos/exports';

@ccclass('TableItem')
export class TableItem extends XComponent {

    @property([HeadItem])
    headItems: HeadItem[] = []

    @property(Label)
    tipsLabel: Label

    table: MTable
    handler: MatchHandler

    onDisable(): void {
        this.removeMatchEventListener()
    }

    onDestroy(): void {
        this.removeMatchEventListener()
    }

    addMatchEventListener() {
        if (this.handler) {
            // this.handler.on(MatchHandler.EventType.TableStatusChange, this.onTableStatusChange, this)
        }
    }

    removeMatchEventListener() {
        if (this.handler) {
            // this.handler.off(MatchHandler.EventType.TableStatusChange, this.onTableStatusChange, this)
        }
    }

    onTableStatusChange(table) {
        if (table.key == this.table.key) {
            this.updateTips()
        }
    }

    updateView(handler: MatchHandler, table: MTable) {
        this.handler = handler
        this.table = table

        this.addMatchEventListener()

        this.updateUsers()
        this.updateTips()
    }

    updateUsers() {
        let uids = this.table.uids
        for (let index = 0; index < 3; index++) {
            const uid = uids[index];
            let user = this.handler.roomInfo.userInfo.findUser(uid)
            if (user) {
                this.headItems[index].updateView(this.handler, user)
            } else {
                console.error("TableItem updateView not find user", uids, index, this.handler.roomInfo)
            }
        }
    }

    updateTips() {
        if (this.table.status == PBRegularCommon.TableStatusPlaying) {
            this.tipsLabel.string = "点击观战"
        } else {
            this.tipsLabel.string = "已结束"
        }
    }

    onObserverTouch() {
        let obConfig = this.handler.roomInfo.config.getObConfig()
        if (!obConfig.isEnabled) {
            uiMgr.showToast("比赛不允许围观")
            return
        }

        if (!this.handler.isRealTime) {
            let startTimes = this.handler.roomInfo.preBaseInfo.getMatchStartAt()
            let delayDuration = obConfig.delayDuration
            let curTimes = Date.now() / 1000
            let time = startTimes + delayDuration - curTimes
            if (time > 0) {
                let min = Math.ceil(time / 60)
                uiMgr.showToast(`为了公平起见比赛已开启延时围观,请${min}分钟后再来观看`)
                return
            }
        }

        if (this.table.status != PBRegularCommon.TableStatusPlaying) {
            uiMgr.showToast("桌子已结束")
            return
        }

        this.handler.joinTableObserver(this.table)
    }

}