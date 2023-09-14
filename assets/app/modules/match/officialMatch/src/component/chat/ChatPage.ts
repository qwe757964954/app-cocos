import { _decorator, Node, instantiate, Widget } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, resLoader } from 'bos/exports';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { MatchConfig } from 'app/domain/match/config/MatchConfig';
import { Label } from 'cc';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { isValid } from 'cc';
import { macro } from 'cc';
import { RichText } from 'cc';
import { ChatView } from 'app/modules/social/match/src/chat/ChatView';
import { Utils } from 'app/utils/Utils';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';

@ccclass('ChatPage')
export class ChatPage extends XComponent {
    @property(Label)
    timeLabel: Label

    @property(Node)
    needNode: Node

    @property(Label)
    needLabel: Label

    @property(RichText)
    readyLabel: RichText

    @property(Label)
    roomLabel: Label

    @property(ChatView)
    chatView: ChatView

    preMatchKey: string
    handler: MatchHandler
    roomInfo: RoomInfo
    config: MatchConfig

    timeClock = null

    onEnable() {
        console.debug("ChatPage onEnable and register event")
        this.addMatchEventListener()
    }

    onDisable() {
        console.debug("ChatPage onDisable and unregister event")
        this.removeMatchEventListener()
    }

    addMatchEventListener() {
        if (this.handler) {
            this.handler.on(MatchHandler.EventType.UserReadyNumChange, this.onUserSignedNumChange, this)
        }
    }

    removeMatchEventListener() {
        if (this.handler) {
            this.handler.off(MatchHandler.EventType.UserReadyNumChange, this.onUserSignedNumChange, this)
        }
    }

    onUserSignedNumChange() {
        this.updateReadyNum()
    }

    onMatchStatusChange() {

    }

    addChatView(onLoaded: Function)
    {
        resLoader.loadPrefab("social@match/res/prefab/chat/ChatView", (err, loadedPrefab) =>{
            console.log("loadPrefab========================")
            if (err)
            {
                console.warn(err)        
            }
            else
            {
                console.log("chatViewNode========================")
                let chatViewNode = instantiate(loadedPrefab)
                this.chatView = chatViewNode.getComponent(ChatView)
                this.node.addChild(chatViewNode)
                onLoaded()
            }
        })
    } 

    updateView(handler: MatchHandler) {
        console.warn("ChatPage updateView")

        this.handler = handler

        this.roomInfo = this.handler.roomInfo
        this.config = this.roomInfo.config
        this.preMatchKey = this.handler.preMatchKey

        this.addMatchEventListener()

        this.updateReadyNum()
        this.updateRoomNum()
        this.updateTips()

        this.chatView.updateView(this.handler)
    }

    updateReadyNum() {
        let minUserNum = this.config.getMatchMinUserNum()
        let readyNum = this.roomInfo.preBaseInfo.getReadyUserNum()
        this.readyLabel.string = `<b><size=42><color=#FF743B>${readyNum}</color></size></b><b><size=42><color=#FFFFFF>/${minUserNum}</color></size></b>`
    }

    updateRoomNum() {
        this.roomLabel.string = this.roomInfo.preBaseInfo.getRoomNo()
    }

    updateTips() {
        let matchType = this.config.getMatchType()
        if (matchType == PBRegularCommon.MatchTypeTiming) {
            this.timeLabel.node.active = true
            this.needNode.active = false

            this.updateTimes()
        } else {
            this.timeLabel.node.active = false
            this.needNode.active = true

            let readyNum = this.roomInfo.preBaseInfo.getReadyUserNum()
            let minNum = this.config.getMatchMinUserNum()
            this.needLabel.string = Math.max(0, minNum - readyNum).toString()
        }
    }

    unScheduleTimeClock() {
        if (this.timeClock) {
            this.unschedule(this.timeClock)
            this.timeClock = null
        }
    }

    updateTimes() {
        this.unScheduleTimeClock()
        this.timeClock = () => {
            if (isValid(this.node)) {
                const startTimes = this.roomInfo.preBaseInfo.getMatchStartAt();
                const curTimes = Math.floor(Date.now() / 1000);
                const delta = startTimes - curTimes;
                this.setViewTimes(delta)
                if (delta <= 0) {
                    this.unScheduleTimeClock()
                }
            } else {
                Log.e("updateMatchTips schedule err=======")
            }
        }

        this.schedule(this.timeClock, 1, macro.REPEAT_FOREVER, 0)
    }

    setViewTimes(delta: number) {
        if (delta > 0) {
            let min = Math.floor(delta / 60)
            let sec = delta - min * 60
            const str: string = `${Utils.twoDigit(min)}:${Utils.twoDigit(sec)}`
            this.timeLabel.string = str
        } else {
            this.timeLabel.string = "00:00"
        }
    }

    onDestroy(): void {
        this.unscheduleAllCallbacks()
    }
}