import { _decorator, Component, isValid, Label, macro, Node, RichText, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchInfo } from 'app/domain/match/matchList/data/MatchInfo';
import { MatchConfig } from 'app/domain/match/config/MatchConfig';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { Decorator, Log, NetImage } from 'bos/exports';
import { MatchMgr } from 'app/domain/match/MatchMgr';
import { App } from 'app/App';
import { MatchSign } from './MatchSign';
import { NetImageEx } from 'app/components/NetImageEx';
import { SpriteFrame } from 'cc';
import { Utils } from 'app/utils/Utils';

@ccclass('MatchItem')
export class MatchItem extends XComponent {
    @property(Sprite)
    bgView : Sprite

    @property(Label)
    matchName : Label

    @property(Sprite)
    matchTag : Sprite

    @property(Node)
    revivalTag : Node

    @property(Node)
    delayTag : Node

    @property(RichText)
    signLabel : RichText

    @property(RichText)
    timesLabel : RichText

    @property(MatchSign)
    btnSign : MatchSign

    @property(NetImageEx)
    matchImage : NetImageEx

    @property(SpriteFrame)
    landlordSpriteFrame : SpriteFrame

    @property(SpriteFrame)
    landlord4SpriteFrame : SpriteFrame

    @property(SpriteFrame)
    mahjongSpriteFrame : SpriteFrame

    /**属性 */
    matchInfo : MatchInfo
    config : MatchConfig
    isSigned : boolean
    preMatchKey : string
    timeClock : any

    start() {
        Log.d("MatchItem start=======")
    }

    onEnable(){
        Log.d("MatchItem onEnable=======")
        App.matchMgr.on(MatchMgr.EventType.MatchSignEvent, this.onSignEvent.bind(this))
        if (this.matchInfo && this.config) {
            this.updateMatchTips()
        }
    }

    onDisable(){
        Log.d("MatchItem onDisable=======")
        App.matchMgr.off(MatchMgr.EventType.MatchSignEvent, this.onSignEvent.bind(this))
        this.unscheduleAllCallbacks()
    }

    onSignEvent(data){
        let key = data.preMatchKey
        if (this.preMatchKey && this.preMatchKey == key) {
            this.isSigned = data.isSigned
            this.btnSign.updateView(this.matchInfo, this.config, this.isSigned)
        }
    }

    async checkPromiseAll(promises: PromiseLike<any>[], key : string) {
        return new Promise<any>((resolve, reject)=>{
            Promise.all(promises).then((values)=>{
                if (key == this.preMatchKey && isValid(this.node)){
                    resolve(values)
                }else {
                    reject()
                }
            })
        })
    }


    getData() {
        return this.matchInfo
    }

    getPreMatchKey(){
        return this.preMatchKey
    }

    @Decorator.TryAsync()
    async updateView(matchInfo : MatchInfo) {
        Log.d("MatchItem updateView", matchInfo)
        this.matchInfo = matchInfo
        this.preMatchKey = this.matchInfo.getPreMatchKey()

        this.checkPromiseAll([this.matchInfo.getMatchConfig(), this.matchInfo.getSigned()], this.preMatchKey).then((data : any[])=>{
            this.config = data[0]
            this.isSigned = data[1]
    
            if (this.config) {
                this.updateMatchName()
                this.updateMatchImage()
                this.updateGameByGameID()
                this.updateTags()
                this.updateSignNum()
                this.updateMatchTips()

                this.btnSign.updateView(this.matchInfo, this.config, this.isSigned)
            }
        })
    }

    //比赛名字
    updateMatchName(){
        this.matchName.string = this.config.getMatchName()
    }

    //比赛展示图
    updateMatchImage(){
        let url = this.config.getNewViewImgURL()
        this.matchImage.setUrl(url)
    }

    //比赛类型
    updateGameByGameID() {
        let gameID = this.config.getGameID()
        if (gameID === "landlord-tysanrenddz") {// 三人斗地主
            Utils.loadSpriteFromResources(this.matchTag, "common/match/ResApp_Details_Img_Label_Ddz")
        } else if (gameID === "landlord-hnxinxiang") { // 四人斗地主
            Utils.loadSpriteFromResources(this.matchTag, "common/match/ResApp_List_Img_Label_SRDDZ")
        } else if (gameID === "mahjong-hnxinxiang") {// 新乡麻将
            Utils.loadSpriteFromResources(this.matchTag, "common/match/ResApp_List_Img_Label_XXMJ")
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
        let signNum = this.matchInfo.getSignNum()
        this.signLabel.string = `<size=36><color=#FF743B>${signNum}</color></size><size=36><color=#1B1B1B>/${minUserNum}</color></size>`
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

    //开赛提示
    updateMatchTips(){
        let status = this.matchInfo.getStatus()
        if (status <= PBRegularCommon.MatchStatusInit) {
            let matchType = this.config.getMatchType()
            if (matchType == PBRegularCommon.MatchTypeTiming) {
                const startTimes = this.matchInfo.getMatchStartAt();
                const startDate = new Date(startTimes);
                const curTimes = Math.floor(Date.now() / 1000);
                const curDate = new Date(curTimes);
                const delta = startTimes - curTimes;
                if (delta < 10 * 60) {
                    this.unschedule(this.timeClock)
                    this.timeClock = ()=>{
                        if (isValid(this.node) && this.matchInfo){
                            const startTimes = this.matchInfo.getMatchStartAt();
                            const curTimes = Math.floor(Date.now() / 1000);
                            const delta = startTimes - curTimes;
                            this.setViewTimes(delta)
                            if (delta <= 0) {
                                this.unschedule(this.timeClock)
                            }
                        } else{
                            Log.e("updateMatchTips schedule err=======")
                        }
                    }
                    this.schedule(this.timeClock, 1, macro.REPEAT_FOREVER, 0)
                    this.setViewTimes(delta)
                } else if (this.isSameDay(startDate, curDate)) {
                    this.timesLabel.string = `<size=42><color=#FF743B>今日 ${Utils.twoDigit(startDate.getHours())}:${Utils.twoDigit(startDate.getMinutes())}</color></size>`
                } else {
                    if (this.isTomorrow(startTimes)){
                        this.timesLabel.string = `<size=42><color=#FF743B>今日 ${Utils.twoDigit(startDate.getHours())}:${Utils.twoDigit(startDate.getMinutes())}</color></size>`
                    } else {
                        this.timesLabel.string = `<size=42><color=#FF743B>${startDate.getMonth()}月${startDate.getDay()}日 ${Utils.twoDigit(startDate.getHours())}:${Utils.twoDigit(startDate.getMinutes())}</color></size>`
                    }
                }
            } else {
                this.timesLabel.string = `<size=42><color=#FF743B>人满即开</color></size>`
            }
        } else {
            this.timesLabel.string = `<size=42><color=#FF743B>已开赛</color></size>`
        }
    }

    setViewTimes(delta : number) {
        if (delta > 0) {
            let min = Math.floor(delta / 60)
            let sec = delta - min * 60
            const str: string = `${Utils.twoDigit(min)}:${Utils.twoDigit(sec)}`
            this.timesLabel.string = `<b><size=42><color=#ffffff>距开赛: </color></size></b><b><size=42><color=#ff3f3e>${str}</color></size></b>`
        } else {
            this.timesLabel.string = `<b><size=42><color=#ffffff>距开赛: </color></size></b><b><size=42><color=#ff3f3e>00:00</color></size></b>`
        }
    }
}