import { isValid, Label, macro, Prefab } from 'cc'
import { RichText } from 'cc'
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { IMsgUserMatchPrepare } from 'idl/tss/match_v2/prematch.v1';
import { Utils } from 'app/utils/Utils';
import { resLoader, uiMgr } from 'bos/exports';
import { App } from 'app/App';

@ccclass('MatchReadyDialog')
export class MatchReadyDialog extends XComponent {
	@property(Label)
	timesLabel : Label

	@property(RichText)
	contentRichText : RichText

    timeClock : any
    startTimes : number
    preMatchKey : string
    schedulerID : number

    @Utils.background()
    onLoad(): void {
        
    }
    
    start() {

    }

    setup(data : IMsgUserMatchPrepare){
        let matchName = data.matchName ?? ""
        this.contentRichText.string = `<size=42><color=#CCCCCC>你报名的</color></size><size=42><color=#CCCCCC>${matchName}</color></size><size=42><color=#CCCCCC>已经进入准备阶段,是否立即进入赛事房间?</color></size>`

        this.startTimes = data.startTime ?? 0
        this.preMatchKey = data.preMatchKey
        this.schedulerID = data.schedulerID

        this.updateTimes()
    }

    unScheduleTimeClock() {
        if (this.timeClock) {
            this.unschedule(this.timeClock)
            this.timeClock = null
        }
    }

    updateTimes() {
        this.unScheduleTimeClock()
        const startTimes = this.startTimes
        this.timeClock = () => {
            if (isValid(this.node)) {
                const curTimes = Math.floor(Date.now() / 1000);
                const delta = startTimes - curTimes;
                this.setViewTimes(delta)
                if (delta <= 0) {
                    this.unScheduleTimeClock()
                }
            }
        }
        this.schedule(this.timeClock, 1, macro.REPEAT_FOREVER, 0)
        const curTimes = Math.floor(Date.now() / 1000);
        const delta = this.startTimes - curTimes;
        this.setViewTimes(delta)
    }

    setViewTimes(delta: number) {
        if (delta > 0) {
            let min = Math.floor(delta / 60)
            let sec = delta - min * 60
            const str: string = `${Utils.twoDigit(min)}:${Utils.twoDigit(sec)}`
            this.timesLabel.string = str
        } else {
            this.timesLabel.string = "00:00"
        }
    }

    onClose() {
        uiMgr.removePopup(this.node)
    }

    onJoin(){
        let hasKey = App.matchMgr.getReadyMatch()
        if (hasKey != "" && hasKey != this.preMatchKey) {
            uiMgr.showToast("不允许同时进入多场比赛")
            return
        }

        App.gameMgr.exitGame()
        let handler = App.matchMgr.getHandlerByPreMatchKey(this.preMatchKey)
        if (handler) {
            uiMgr.showLoading()
            uiMgr.loadPage("match@officialMatch/res/prefab/ChatRoom", {params : {preMatchKey : this.preMatchKey, handler : handler}})
            uiMgr.hideLoading()
        } else {
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
        
                uiMgr.showLoading()
                Promise.all([loadPromise, App.matchMgr.join({preMatchKey : this.preMatchKey, schedulerID : this.schedulerID})]).then((data)=>{
                    uiMgr.hideLoading()
                
                    let prefab = data[0]
                    let matchHandler = data[1]
                    if (matchHandler && prefab) {
                        uiMgr.pushPage(prefab, {params : {preMatchKey : this.preMatchKey, handler : matchHandler}})
                    }
               })
            } catch (error) {
                console.error("MatchSign enterChatRoom", error)
            }
        }

        this.onClose()
    }

    onDestroy(): void {
        this.unscheduleAllCallbacks()
    }
}