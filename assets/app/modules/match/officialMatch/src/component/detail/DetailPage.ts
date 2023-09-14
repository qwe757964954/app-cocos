import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { NetImageEx } from 'app/components/NetImageEx';
import { RichText } from 'cc';
import { Label } from 'cc';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { MatchConfig } from 'app/domain/match/config/MatchConfig';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { isValid } from 'cc';
import { Log, uiMgr } from 'bos/exports';
import { macro } from 'cc';
import { Color } from 'cc';
import { MatchSign } from './MatchSign';
import { App } from 'app/App';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { ResultView } from './ResultView';
import { PrizeView } from './PrizeView';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';

@ccclass('DetailPage')
export class DetailPage extends XComponent {
    @property(NetImageEx)
    matchPoster : NetImageEx

    @property(Sprite)
    gameTag : Sprite

    @property(Node)
    revivalTag : Node

    @property(Node)
    delayTag : Node

    @property(RichText)
    signLabel : RichText

    @property(Label)
    tipsLabel : Label

    @property(Label)
    timeLabel : Label

    @property(Node)
    tipNode : Node

    @property(Node)
    cutNode : Node

    @property(Node)
    inviteNode : Node

    @property(MatchSign)
    btnSign : MatchSign

    @property(Node)
    centerNode : Node

    @property(Prefab)
    resultPrefab : Prefab

    @property(Prefab)
    prizePrefab : Prefab

    @property(SpriteFrame)
    landlordSpriteFrame : SpriteFrame

    @property(SpriteFrame)
    landlord4SpriteFrame : SpriteFrame

    @property(SpriteFrame)
    mahjongSpriteFrame : SpriteFrame

    preMatchKey : string
    handler: MatchHandler
    roomInfo : RoomInfo
    config : MatchConfig

    timeClock = null

    start() {
        this.tipsLabel.node.active = false
    }

    onEnable() {
        console.debug("DetailPage onEnable and register event")
        this.addMatchEventListener()
    }

    onDisable() {
        console.debug("DetailPage onDisable and unregister event")
        this.removeMatchEventListener()
    }

    addMatchEventListener(){
        if (this.handler){
            this.handler.on(MatchHandler.EventType.UserSignedNumChange, this.onUserSignedNumChange, this)
            this.handler.on(MatchHandler.EventType.UsersSigned, this.onUserSigned, this)
            this.handler.on(MatchHandler.EventType.UsersCancelSigned, this.onUserCancelSigned, this)
            this.handler.on(MatchHandler.EventType.MatchStatusChange, this.onMatchStatusChange, this)
        }
    }

    removeMatchEventListener(){
        if (this.handler){
            this.handler.off(MatchHandler.EventType.UserSignedNumChange, this.onUserSignedNumChange, this)
            this.handler.off(MatchHandler.EventType.UsersSigned, this.onUserSigned, this)
            this.handler.off(MatchHandler.EventType.UsersCancelSigned, this.onUserCancelSigned, this)
            this.handler.off(MatchHandler.EventType.MatchStatusChange, this.onMatchStatusChange, this)
        }
    }

    onUserSignedNumChange(enterUserNum : number){
        this.updateSignNum()
    }

    onUserSigned(uids){
        console.debug("DetailPage onUserSigned", uids)
        if (uids && uids.length == 1 && uids[0] == App.userMgr.loginUid) {
            this.updateBtnSign()
        }
    }

    onUserCancelSigned(uids){
        console.debug("DetailPage onUserCancelSigned", uids)
        if (uids && uids.length == 1 && uids[0] == App.userMgr.loginUid) {
            this.updateBtnSign()
        }
    }

    onMatchStatusChange(newStatus, oldStatus : number){
        this.updateMatchTips()
        this.updateBtnSign()

        if (oldStatus <= PBRegularCommon.MatchStatusInit) {
            this.updateInvite()
            this.updateTips()
        }

        if (oldStatus <= PBRegularCommon.MatchStatusRunning && newStatus == PBRegularCommon.MatchStatusOver) {
            this.updateCenter()
        }
    }

    updateView(handler: MatchHandler) {
        console.warn("DetailPage updateView")

        this.handler = handler

        this.roomInfo = this.handler.roomInfo
        this.config = this.roomInfo.config
        this.preMatchKey = this.handler.preMatchKey

        this.addMatchEventListener()

        this.updateMatchImage()
        this.updateGameByGameID()
        this.updateSignNum()
        this.updateMatchTips()
        this.updateTags()
        this.updateInvite()
        this.updateTips()
        this.updateCenter()
        this.updateBtnSign()
    }

    //比赛展示图
    updateMatchImage(){
        let url = this.config.getNewViewImgURL()
        this.matchPoster.setUrl(url)
    }

    //比赛类型
    updateGameByGameID() {
        let gameID = this.config.getGameID()
        if (gameID === "landlord-tysanrenddz") {// 三人斗地主
            this.gameTag.spriteFrame = this.landlordSpriteFrame
        } else if (gameID === "landlord-hnxinxiang") { // 四人斗地主
            this.gameTag.spriteFrame = this.landlord4SpriteFrame
        } else if (gameID === "mahjong-hnxinxiang") {// 新乡麻将
            this.gameTag.spriteFrame = this.mahjongSpriteFrame
        }
    }

    //标签（复活、延迟入场）
    updateTags(){
        this.revivalTag.active = false
        let stages = this.config.getMatchStages()
        for (let index = 0; index < stages.length; index++) {
            const stage = stages[index];
            if (stage.revival?.isEnabled){
                this.revivalTag.active = true
                break
            }
        }

        let delayCfg = this.config.getDelayMatchCfg()
        if (delayCfg && delayCfg.isEnabled) {
            this.delayTag.active = true
        }else {
            this.delayTag.active = false
        }
    }

    //报名人数
    updateSignNum(){
        let minUserNum = this.config.getMatchMinUserNum()
        let signNum = this.roomInfo.preBaseInfo.getEntryUserNum()
        this.signLabel.string = `<size=45><color=#FF743B>${signNum}</color></size><size=45><color=#FFFFFF>/${minUserNum}</color></size>`
    }

    isSameDay(date1: Date, date2: Date): boolean {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }
    
    isTomorrow(timestamp: number): boolean {
        const date = new Date(timestamp);
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        return date.getFullYear() === tomorrow.getFullYear()
          && date.getMonth() === tomorrow.getMonth()
          && date.getDate() === tomorrow.getDate();
    }

    unScheduleTimeClock(){
        if (this.timeClock){
            this.unschedule(this.timeClock)
            this.timeClock = null
        }
    }

    //开赛提示
    updateMatchTips(){
        this.tipsLabel.node.active = false
        this.cutNode.active = false

        this.unScheduleTimeClock()

        let status = this.roomInfo.preBaseInfo.getStatus()
        if (status <= PBRegularCommon.MatchStatusInit) {
            let matchType = this.config.getMatchType()
            if (matchType == PBRegularCommon.MatchTypeTiming) {
                const startTimes = this.roomInfo.preBaseInfo.getMatchStartAt();
                const startDate = new Date(startTimes);
                const curTimes = Math.floor(Date.now() / 1000);
                const curDate = new Date(curTimes);
                const delta = startTimes - curTimes;
                if (delta < 10 * 60) {
                    this.cutNode.active = true
                    this.timeClock = ()=>{
                        if (isValid(this.node) && this.roomInfo){
                            const startTimes = this.roomInfo.preBaseInfo.getMatchStartAt();
                            const curTimes = Math.floor(Date.now() / 1000);
                            const delta = startTimes - curTimes;
                            this.setViewTimes(delta)
                            if (delta <= 0) {
                                this.unScheduleTimeClock()
                            }
                        } else{
                            Log.e("updateMatchTips schedule err=======")
                        }
                    }
                    this.schedule(this.timeClock, 1, macro.REPEAT_FOREVER, 0)
                    this.setViewTimes(delta)
                } else if (this.isSameDay(startDate, curDate)) {
                    this.timeLabel.color = new Color('#FFFFFF');
                    this.timeLabel.string = `${this.twoDigit(startDate.getHours())}:${this.twoDigit(startDate.getMinutes())}`
                } else {
                    if (this.isTomorrow(startTimes)){
                        this.tipsLabel.node.active = true
                        this.tipsLabel.string = "明日"
                        this.timeLabel.color = new Color('#FFFFFF');
                        this.timeLabel.string = `${this.twoDigit(startDate.getHours())}:$${this.twoDigit(startDate.getMinutes())}`
                    } else {
                        this.tipsLabel.node.active = true
                        this.tipsLabel.string = `${startDate.getMonth()}月${startDate.getDay()}日 ${this.twoDigit(startDate.getHours())}`
                        this.timeLabel.color = new Color('#FFFFFF');
                        this.timeLabel.string = ` ${this.twoDigit(startDate.getHours())}:${this.twoDigit(startDate.getMinutes())}`
                    }
                }
            } else {
                this.timeLabel.color = new Color('#FFFFFF');
                this.timeLabel.string = "人满即开</color></size>"
            }
        } else if (status == PBRegularCommon.MatchStatusRunning) {
            this.timeLabel.color = new Color('#FFFFFF');
            this.timeLabel.string = "已开赛"
        } else if (status == PBRegularCommon.MatchStatusOver) {
            this.timeLabel.color = new Color('#FFFFFF');
            this.timeLabel.string = "比赛结束"
        } else if (status == PBRegularCommon.MatchStatusAbort) {
            this.timeLabel.color = new Color('#FF5B35');
            this.timeLabel.string = "开赛失败"
        }
    }

    twoDigit(num: number): string {
        if (num < 10) {
          return "0" + num.toString();
        } else {
          return num.toString();
        }
    }

    setViewTimes(delta : number) {
        if (delta > 0) {
            let min = Math.floor(delta / 60)
            let sec = delta - min * 60
            const str: string = `${this.twoDigit(min)}:${this.twoDigit(sec)}`
            this.timeLabel.color = new Color('#FF5B35');
            this.timeLabel.string = str 
        } else {
            this.timeLabel.color = new Color('#FF5B35');
            this.timeLabel.string = "00:00"
        }
    }

    updateInvite(){
        let status = this.roomInfo.preBaseInfo.getStatus()
        this.inviteNode.active = status <= PBRegularCommon.MatchStatusInit
    }

    updateTips(){
        let status = this.roomInfo.preBaseInfo.getStatus()
        this.tipNode.active = status <= PBRegularCommon.MatchStatusInit
    }

    updateBtnSign(){
        this.btnSign.updateView(this.handler)
    }

    updateCenter() {
        let status = this.roomInfo.preBaseInfo.getStatus()
        if (status == PBRegularCommon.MatchStatusOver) {
            this.centerNode.destroyAllChildren()
            let node = instantiate(this.resultPrefab)
            this.centerNode.addChild(node)
            node.getComponent(ResultView).updateView(this.handler)
        } else {
            this.centerNode.destroyAllChildren()
            let node = instantiate(this.prizePrefab)
            this.centerNode.addChild(node)
            node.getComponent(PrizeView).updateView(this.handler)
        }
    }

    onInviteTouch(){
        uiMgr.showToast("敬请期待!" + this.roomInfo.preBaseInfo.getRoomNo())
    }

    onTipTouch(){
        console.debug("DetailPage onTipTouch!")

        let readyTimes = this.roomInfo.preBaseInfo.getMatchReadyAt()
        uiMgr.loadPopup("match@matchModules/prefab/MatchTipsDialog", {params : {showCheckBox : false, start_ts : readyTimes * 1000}})
    }

    onDestroy(): void {
        console.debug("DetailPage onDestroy!")
        this.removeMatchEventListener()
        this.unscheduleAllCallbacks()
    }
}