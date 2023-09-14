import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchInfo } from 'app/domain/match/matchList/data/MatchInfo';
import { MatchConfig } from 'app/domain/match/config/MatchConfig';
import { isValid } from 'cc';
import { Label } from 'cc';
import { Sprite } from 'cc';
import { SpriteFrame } from 'cc';
import { Prefab } from 'cc';
import { Decorator, resLoader, uiMgr } from 'bos/exports';
import { App } from 'app/App';
import { Utils } from 'app/utils/Utils';

@ccclass('ObserverItem')
export class ObserverItem extends XComponent {

    @property(Label)
    matchName : Label

    @property(Sprite)
    matchTag : Sprite

    @property(Label)
    observerLabel : Label

    @property(SpriteFrame)
    landlordSpriteFrame : SpriteFrame

    @property(SpriteFrame)
    landlord4SpriteFrame : SpriteFrame

    @property(SpriteFrame)
    mahjongSpriteFrame : SpriteFrame
    
    matchInfo : MatchInfo
    preMatchKey : string
    config : MatchConfig

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
    async updateView(matchInfo : MatchInfo) {
        console.debug("MatchItem updateView", matchInfo)

        this.matchInfo = matchInfo
        this.preMatchKey = this.matchInfo.getPreMatchKey()

        this.config = await this.checkPromiseOne(this.matchInfo.getMatchConfig(), this.preMatchKey)

        if (this.config) {
            this.updateName()
            this.updateGameByGameID()
            this.updateObserverNum()
        }
    }

    updateName() {
        this.matchName.string = this.config.getMatchName()
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

    updateObserverNum() {
        this.observerLabel.string = this.matchInfo.getLookerNum().toString()
    }

    onEnterTouch() {
        this.enterChatRoom(this.matchInfo)
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
           console.error("ObserverItem enterChatRoom", error) 
        }
    }
}