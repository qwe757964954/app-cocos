import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { MatchConfig } from 'app/domain/match/config/MatchConfig';
import { Label } from 'cc';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { CStageItem } from './CStageItem';
import { PageView } from 'cc';
import { Utils } from 'app/utils/Utils';
import { CTablePage } from './CTablePage';
import { TimeUtil, uiMgr } from 'bos/exports';
import { Pool } from 'cc';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { UITransform } from 'cc';

@ccclass('ObserverPage')
export class ObserverPage extends XComponent {

    @property(Label)
    tipsLabel: Label

    @property(Label)
    numLabel: Label

    @property(Label)
    typeLabel: Label

    @property(Node)
    stageNode: Node

    @property(Prefab)
    stageItem: Prefab

    @property(PageView)
    tablePageView: PageView

    @property(Prefab)
    tablePageItem: Prefab

    preMatchKey: string
    handler: MatchHandler
    roomInfo: RoomInfo
    config: MatchConfig
    clockTimes: any
    delayTimesClock: any

    _pool: Pool<Node> = null

    onLoad(): void {
        this.initPool()
    }

    initPool() {
        this._pool = new Pool(() => {
            return instantiate(this.tablePageItem)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    onEnable() {
        console.debug("ObserverPage onEnable and register event")
        this.addMatchEventListener()
    }

    onDisable() {
        console.debug("ObserverPage onDisable and unregister event")
        this.removeMatchEventListener()
    }

    onDestroy(): void {
        console.debug("ObserverPage onDestroy and unregister event")

        this.removeMatchEventListener()
        this.unscheduleAllCallbacks()
        this._pool.destroy()
    }

    addMatchEventListener() {
        if (this.handler) {
            this.handler.on(MatchHandler.EventType.TableStatusChange, this.onTableChange, this)
            this.handler.on(MatchHandler.EventType.MatchStageStart, this.onMatchStageStart, this)
            this.handler.on(MatchHandler.EventType.TableNumChange, this.onTableChange, this)
        }
    }

    removeMatchEventListener() {
        if (this.handler) {
            this.handler.off(MatchHandler.EventType.TableStatusChange, this.onTableChange, this)
            this.handler.off(MatchHandler.EventType.MatchStageStart, this.onMatchStageStart, this)
            this.handler.off(MatchHandler.EventType.TableNumChange, this.onTableChange, this)
        }
    }

    @Utils.throttle(500)
    onTableChange() {
        this.updateTableNumOrCutTimes()
        this.updateTableInfo()
    }

    onMatchStageStart() {
        this.updateTitle()
        this.updateStageInfo()
        this.updateTableNumOrCutTimes(true)
    }

    updateView(handler: MatchHandler) {
        console.warn("ObserverPage updateView")

        this.handler = handler

        this.roomInfo = this.handler.roomInfo
        this.config = this.roomInfo.config
        this.preMatchKey = this.handler.preMatchKey

        this.addMatchEventListener()

        this.updateTableNumOrCutTimes(false)
        this.updateStageInfo()
        this.updateTableInfo()
    }

    updateTitle() {
        let index = this.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let dynamicID = this.roomInfo.baseInfo.getDynamicStageId()
        let stageType = this.roomInfo.config.getStageType(index, dynamicID)
        if (stageType == PBRegularCommon.StageTypeStrike) {
            this.typeLabel.string = "打立出局"
        } else {
            this.typeLabel.string = "定局积分"
        }
    }

    setViewTimes(delta: number) {
        delta = Math.floor(delta)
        if (delta > 0) {
            let min = Math.floor(delta / 60)
            let sec = delta - min * 60
            const str: string = `${Utils.twoDigit(min)}:${Utils.twoDigit(sec)}`
            this.numLabel.string = str
        } else {
            this.numLabel.string = "00:00"
        }
    }

    updateTableNumOrCutTimes(ignoreDelay?: boolean) {
        if (this.delayTimesClock) {
            this.unschedule(this.delayTimesClock)
        }
        if (this.clockTimes) {
            this.unschedule(this.clockTimes)
        }

        let obConfig = this.roomInfo.config.getObConfig()
        if (obConfig && obConfig.isEnabled && obConfig.delayDuration > 0 && !ignoreDelay) {
            let delayDuration = obConfig.delayDuration ?? 0
            let startTimes = this.roomInfo.preBaseInfo.getMatchStartAt()
            let now = Date.now() / 1000
            let delta = (startTimes + delayDuration) - now
            if (delta > 0) {
                this.tipsLabel.string = "延迟围观倒计时:"
                this.delayTimesClock = () => {
                    let now = Date.now() / 1000
                    let delta = (startTimes + delayDuration) - now
                    if (delta > 0) {
                        this.setViewTimes(delta)
                    } else {
                        this.unschedule(this.delayTimesClock)
                    }
                }
                this.schedule(this.delayTimesClock, 1)
                this.setViewTimes(delta)
                return
            }
        }

        let index = this.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let dynamicID = this.roomInfo.baseInfo.getDynamicStageId()
        let stageEndType = this.roomInfo.config.getStageEndType(index, dynamicID)
        if (stageEndType == PBRegularCommon.StageEndTypeByTime || stageEndType == PBRegularCommon.StageEndTypeByUserNumAndTime) {
            this.tipsLabel.string = '剩余时间:'
            let overTimes = this.roomInfo.baseInfo.getStageInfo().getOverTimes()
            let curTimes = TimeUtil.getTime();
            let delta = overTimes - curTimes
            if (delta > 0) {
                this.clockTimes = () => {
                    let curTimes = TimeUtil.getTime()
                    let delta = overTimes - curTimes
                    if (delta > 0) {
                        this.setViewTimes(delta)
                    } else {
                        this.unschedule(this.clockTimes)
                    }
                }
                this.schedule(this.clockTimes, 1)
                this.setViewTimes(delta)
            } else {
                this.numLabel.string = "00:00"
            }
        } else {
            this.tipsLabel.string = '正在进行中的桌子:'
            let tables = this.roomInfo.tableInfo.getTables()
            let num = 0
            for (let index = 0; index < tables.length; index++) {
                const table = tables[index];
                if (table.status == PBRegularCommon.TableStatusPlaying) {
                    num++
                }
            }
            this.numLabel.string = num.toString()
        }
    }

    updateStageInfo() {
        this.stageNode.destroyAllChildren()

        let stageConfigs = this.handler.roomInfo.config.getMatchStages(this.handler.roomInfo.baseInfo.getDynamicStageId())
        let curIndex = this.handler.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let indexInfo = Utils.getRoundIndex(curIndex, stageConfigs.length, 5, 2, 2)

        console.debug("ObserverPage updateStageInfo", indexInfo, curIndex, stageConfigs)

        for (let index = indexInfo.endIndex; index >= indexInfo.startIndex; index--) {
            const stageInfo = stageConfigs[index];
            let item = instantiate(this.stageItem)
            this.stageNode.addChild(item)
            item.getComponent(CStageItem).updateView(this.handler, {
                stage: stageInfo,
                inProgress: index == curIndex,
                isFinally: index == (stageConfigs.length - 1),
                complete: index < curIndex,
                isFirst: index == indexInfo.startIndex
            })
        }
    }

    updateTableInfo() {
        let tables = this.handler.roomInfo.tableInfo.getTables()
        let playingTables = []
        for (let index = 0; index < tables.length; index++) {
            const table = tables[index];
            if (table.status == PBRegularCommon.TableStatusPlaying) {
                playingTables.push(table)
            }
        }

        let infos = Utils.makeCellData(playingTables, 4)
        let children = this.tablePageView.content.children ?? []
        for (let index = 0; index < children.length; index++) {
            const item = children[index];
            this._pool.free(item)
        }
        this.tablePageView.removeAllPages()

        for (let index = 0; index < infos.length; index++) {
            const info = infos[index];
            if (info) {
                let node = this._pool.alloc()
                this.tablePageView.addPage(node)
                node.getComponent(CTablePage).updateView(this.handler, info, this.tablePageView.getComponent(UITransform).width)
            }
        }
    }

    onLeftTouch() {
        let page = Math.max(0, this.tablePageView.getCurrentPageIndex() - 1)
        console.debug("ObserverPage onLeftTouch", page)
        this.tablePageView.scrollToPage(page, 0.2)
    }

    onRightTouch() {
        let page = Math.min(this.tablePageView.getPages().length, this.tablePageView.getCurrentPageIndex() + 1)
        console.debug("ObserverPage onRightTouch", page)
        this.tablePageView.scrollToPage(page, 0.2)
    }
}
