import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchInfo } from 'app/domain/match/matchList/data/MatchInfo';
import { Label } from 'cc';
import { Sprite } from 'cc';
import { SpriteFrame } from 'cc';
import { MatchConfig } from 'app/domain/match/config/MatchConfig';
import { Utils } from 'app/utils/Utils';
import { isValid } from 'cc';
import { Decorator, resLoader, uiMgr } from 'bos/exports';
import { App } from 'app/App';
import { Prefab } from 'cc';
import { PBMatchList } from 'app/domain/match/code/code';

@ccclass('NoticeItem')
export class NoticeItem extends XComponent {
    
    @property(Label)
    matchName : Label

    @property(Sprite)
    matchTag : Sprite

    @property([Label])
    timesLabels : Label[] = []

    @property(Label)
    btnLabel : Label

    matchInfo : MatchInfo
    preMatchKey : string
    config : MatchConfig
    timeClock : any
    type : number


    async checkPromiseOne(one: Promise<any>, key : string) {
        return new Promise<any>((resolve, reject)=>{
            one.then((value)=>{
                if (key == this.preMatchKey && isValid(this.node)){
                    resolve(value)
                }else {
                    reject()
                }
            })
        })
    }

    @Decorator.TryAsync()
    async updateView(matchInfo : MatchInfo, type : number) {
        this.matchInfo = matchInfo
        this.preMatchKey = this.matchInfo.getPreMatchKey()
        this.type = type

        this.config = await this.checkPromiseOne(this.matchInfo.getMatchConfig(), this.preMatchKey)

        if (this.config) {
            this.updateName()
            this.updateGameByGameID()
            this.updateTimes()
        }
    }

    updateName() {
        this.matchName.string = this.config.getMatchName()
        if (this.type == PBMatchList.ListGuideTypePreView) {
            this.btnLabel.string = "前往报名"
        } else {
            this.btnLabel.string = "已报名"
        }
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

    updateTimes() {
        const startTimes = this.matchInfo.getMatchStartAt();
        const curTimes = Math.floor(Date.now() / 1000);
        const delta = startTimes - curTimes;
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
                console.error("NoticeItem updateTimes schedule err=======")
            }
        }
        this.schedule(this.timeClock, 1)
        this.setViewTimes(delta)
    }

    setViewTimes(delta : number) {
        if (delta > 0) {
            let min = Math.floor(delta / 60)
            let sec = delta - min * 60
            this.timesLabels[0].string = `${Utils.twoDigit(min)}`
            this.timesLabels[1].string = `${Utils.twoDigit(sec)}`
        } else {
            this.timesLabels[0].string = "00"
            this.timesLabels[1].string = "00"
        }
    }
    
    enterChatRoom(matchInfo : MatchInfo){
        try {
            let loadPromise = new Promise<Prefab>((resolve, reject)=>{
                resLoader.loadPrefab("match@officialMatch/res/prefab/ChatRoom", (err, prefab : Prefab)=>{
                    if (!err) {
                        resolve(prefab)
                    } else {
                        reject(err)
                    }
                })
            })
    
            let preMatchKey = matchInfo.getPreMatchKey()
            let schedulerID = matchInfo.getSchedulerID()
            uiMgr.showLoading()
            Promise.all([loadPromise, App.matchMgr.join({preMatchKey : preMatchKey, schedulerID : schedulerID})]).then((data)=>{
                uiMgr.hideLoading()
            
                //TODO(临时处理，删除弹窗)
                uiMgr.popPopup()
    
                let prefab = data[0]
                let matchHandler = data[1]
                if (matchHandler && prefab) {
                    uiMgr.pushPage(prefab, {params : {preMatchKey : preMatchKey, handler : matchHandler}})
                }
           })
        } catch (error) {
            console.error("NoticeItem enterChatRoom", error)
        }

    }
    
    onEnter() {
        this.enterChatRoom(this.matchInfo)
    }

    onDestroy(): void {
        this.unscheduleAllCallbacks()
    }
}