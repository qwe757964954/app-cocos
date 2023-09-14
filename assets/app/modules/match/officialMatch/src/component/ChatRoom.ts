import { _decorator, Component, isValid, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Prefab } from 'cc';
import { Navigation } from './Navigation';
import { MatchMgr } from 'app/domain/match/MatchMgr';
import { App } from 'app/App';
import { instantiate } from 'cc';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Log, uiMgr } from 'bos/exports';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { DetailPage } from './detail/DetailPage';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { ChatPage } from './chat/ChatPage';
import { ObserverPage } from './observer/ObserverPage';
import { Utils } from 'app/utils/Utils';
import { OfficialController } from 'app/domain/match/match/controller/OfficialController';
import { sys } from 'cc';
import { Widget } from 'cc';

@ccclass('ChatRoom')
export class ChatRoom extends XComponent {

    @property(Prefab)
    detailPagePrefab : Prefab

    @property(Prefab)
    chatPagePrefab : Prefab

    @property(Prefab)
    observerPagePrefab : Prefab

    @property(Navigation)
    navigation : Navigation

    @property(Label)
    matchName : Label

    @property(Label)
    keyLabel : Label

    @property(Label)
    matchKeyLabel : Label
    
    @property(Label)
    roomNoLabel : Label

    @property(Node)
    contentNode : Node

    private detailPageNode : Node
    private chatPageNode : Node
    private observerPageNode : Node
    private handler :MatchHandler
    private roomInfo : RoomInfo
    private preMatchKey : string
    private isInit : boolean = false

    onLoad() {
    }

    onEnable() {
        console.warn("ChatRoom onEnable and register event")
        this.addMatchListener()
        
        if (this.handler) {
            this.checkAutoReady()
            this.checkPageShow()
        }
    }

    onDisable() {
        console.warn("ChatRoom onDisable and register event")
        this.removeMatchListener()
    }

    addMatchListener(){
        if (this.handler) {
            console.warn("ChatRoom addMatchListener")
            this.handler.on(MatchHandler.EventType.MatchCanReady, this.onMatchCanReady, this)
            this.handler.on(MatchHandler.EventType.MatchAboutToStart, this.onMatchAboutToStart, this)
            this.handler.on(MatchHandler.EventType.MatchStart, this.onMatchStart, this)
            this.handler.on(MatchHandler.EventType.MatchStartFailed, this.onMatchStartFailed, this)
            this.handler.on(MatchHandler.EventType.MatchConfigUpdate, this.onMatchConfigUpdate, this)
            this.handler.on(MatchHandler.EventType.PreMatchDisband, this.onPreMatchDisband, this)
            this.handler.on(MatchHandler.EventType.UsersReady, this.onUsersReady, this)
            this.handler.on(MatchHandler.EventType.ChangeObserverView, this.onChangeObserverView, this)
            this.handler.on(MatchHandler.EventType.MatchEnd, this.onMatchEnd, this)
            this.handler.on(MatchHandler.EventType.ReconnectSuccess, this.onReconnectSuccess, this)
            this.handler.on(MatchHandler.EventType.ReconnectFail, this.onReconnectFail, this)
        }
    }

    removeMatchListener(){
        if (this.handler) {
            console.warn("ChatRoom removeMatchListener")
            this.handler.off(MatchHandler.EventType.MatchCanReady, this.onMatchCanReady, this)
            this.handler.off(MatchHandler.EventType.MatchAboutToStart, this.onMatchAboutToStart, this)
            this.handler.off(MatchHandler.EventType.MatchStart, this.onMatchStart, this)
            this.handler.off(MatchHandler.EventType.MatchStartFailed, this.onMatchStartFailed, this)
            this.handler.off(MatchHandler.EventType.MatchConfigUpdate, this.onMatchConfigUpdate, this)
            this.handler.off(MatchHandler.EventType.PreMatchDisband, this.onPreMatchDisband, this)
            this.handler.off(MatchHandler.EventType.UsersReady, this.onUsersReady, this)
            this.handler.off(MatchHandler.EventType.ChangeObserverView, this.onChangeObserverView, this)
            this.handler.off(MatchHandler.EventType.MatchEnd, this.onMatchEnd, this)
            this.handler.off(MatchHandler.EventType.ReconnectSuccess, this.onReconnectSuccess, this)
            this.handler.off(MatchHandler.EventType.ReconnectFail, this.onReconnectFail, this)

        }
    }

    setup(data : {preMatchKey : string, handler : MatchHandler}) {
        console.warn("ChatRoom setup and preMatchKey is", data.preMatchKey)
        this.preMatchKey = data.preMatchKey
        if (data.handler) {
            if (data.handler.isValid) {
                this.init(data.handler)
            } else {
                this.scheduleOnce(()=>{
                    if (isValid(this.node)) {
                        uiMgr.popPage()
                        uiMgr.showToast("比赛不存在了")
                    }
                })
            }
        } else {
            App.matchMgr.on(MatchMgr.EventType.JoinPreMatchSuccess, this.onJoinSuccess, this)
            App.matchMgr.on(MatchMgr.EventType.JoinPreMatchFail, this.onJoinFail, this)
        }
    }

    onJoinSuccess(handler : MatchHandler){
        console.warn("ChatRoom onJoinSuccess and preMatchKey is", this.preMatchKey)
        let preMatchKey = handler.preMatchKey
        if (preMatchKey == this.preMatchKey) {
            this.init(handler)
        }
    }

    onJoinFail(preMatchKey : string){
        console.warn("ChatRoom onJoinFail and preMatchKey is", preMatchKey, this.preMatchKey)
        if (preMatchKey == this.preMatchKey) {
            uiMgr.popPage()
        }
    }

    init(handler : MatchHandler) {
        this.isInit = true
        this.handler = handler
        this.roomInfo = this.handler.roomInfo

        this.matchName.string = this.roomInfo.config.getMatchName()

        if (sys.isBrowser) {
            this.keyLabel.string = this.preMatchKey
            this.roomNoLabel.string = this.roomInfo.preBaseInfo.getRoomNo()
            this.matchKeyLabel.string = this.handler.matchKey
        }

        this.initController()
        this.checkAutoReady()
        this.checkPageShow()
        this.addMatchListener()
    }

    initController() {
        // let user = this.roomInfo.userInfo.getMySelf()
        // if (user.isSigned() && Date.now() / 1000 >= this.roomInfo.preBaseInfo.getMatchReadyAt()){
            if (!this.handler.matchController) {
                this.handler.matchController = new OfficialController(this.handler)
            }
        // }
    }

    checkAutoReady() {
        let user = this.roomInfo.userInfo.getMySelf()
        if (user.isSigned() && (Date.now() / 1000 >= this.roomInfo.preBaseInfo.getMatchReadyAt())){
            MatchApi.readyPreMatch(this.preMatchKey)

            //本地先把状态改过来，防止临界情况调用退出聊天室
            user.updateStatus(PBRegularCommon.UserStatusReady)
        }
    }

    checkPageShow() {
        // let user = this.roomInfo.userInfo.getMySelf()
        // let status = this.roomInfo.preBaseInfo.getStatus()
        // if (user.isTakePartInMatch() && status < PBRegularCommon.MatchStatusRunning) {
            this.showChatPage()
        // } else if (status == PBRegularCommon.MatchStatusRunning && !this.handler.isRealTime){
        //     this.showObserverPage()
        // } else {
        //     this.showDetailPage()
        // }
    }

    refreshChatRoom(){
        this.checkPageShow()
    }

    addDetailPage() {
        if (!this.detailPageNode) {
            this.detailPageNode = instantiate(this.detailPagePrefab)
            this.contentNode.addChild(this.detailPageNode)
        }
    }

    showDetailPage(){
        this.hideChatPage()
        this.hideObserverPage()

        this.addDetailPage()
        this.detailPageNode.active = true
        this.detailPageNode.getComponent(DetailPage).updateView(this.handler)
    }

    hideDetailPage(){
        if (this.detailPageNode) {
            this.detailPageNode.active = false
        }
    }

    addChatPage(onLoaded: Function) {
        if (!this.chatPageNode) {
            this.chatPageNode = instantiate(this.chatPagePrefab)

            this.chatPageNode.getComponent(ChatPage).addChatView(onLoaded)

            this.contentNode.addChild(this.chatPageNode)
        }
    }      

    showChatPage(){
        console.log("showChatPage========================")
        this.hideDetailPage()
        this.hideObserverPage()

        this.addChatPage(() => {
            this.chatPageNode.active = true
            this.chatPageNode.getComponent(ChatPage).updateView(this.handler)
        })
    }

    hideChatPage(){
        if (this.chatPageNode) {
            this.chatPageNode.active = false
        }
    }

    addObserverPage() {
        if (!this.observerPageNode) {
            this.observerPageNode = instantiate(this.observerPagePrefab)
            this.contentNode.addChild(this.observerPageNode)
        }
    }

    showObserverPage(){
        this.hideDetailPage()
        this.hideChatPage()

        this.addObserverPage()
        this.observerPageNode.active = true
        this.observerPageNode.getComponent(ObserverPage).updateView(this.handler)
    }

    hideObserverPage(){
        if (this.observerPageNode) {
            this.observerPageNode.active = false
        }
    }

    onMatchCanReady(){
        let user = this.roomInfo.userInfo.getMySelf()
        if (user.isSigned()){
            MatchApi.readyPreMatch(this.preMatchKey)

            //本地先把状态改过来，防止临界情况调用退出聊天室
            user.updateStatus(PBRegularCommon.UserStatusReady)
        }
    }

    onMatchAboutToStart(){
        Log.d("ChatRoom onMatchAboutToStart")
        //TODO(倒计时动画)
    }

    onMatchStart(){
        Log.d("ChatRoom onMatchStart")
        //TODO(开赛动画)
    }

    onMatchStartFailed(){
        uiMgr.pushAlert({
            title : "温馨提示",
            content : "由于参赛人数不足，开赛失败。",
            ok : {
                title : "确定",
                callback : ()=>{}
            }
        })
    }

    onMatchConfigUpdate(){
        this.refreshChatRoom()
    }

    onPreMatchDisband(){
        // uiMgr.removePage(this.node)
        uiMgr.popPage()
    }

    onUsersReady(uids){
        if (uids && uids.length > 0 && uids[0] == App.userMgr.loginUid) {
            this.showChatPage()
        }
    }

    onChangeObserverView() {
        this.showObserverPage()
    }

    onMatchEnd(){
        this.showDetailPage()
    }

    onReconnectSuccess() {
        this.checkAutoReady()
        this.checkPageShow()
    }

    onReconnectFail() {
        // uiMgr.removePage(this.node)
        uiMgr.popPage()
    }

    onBackTouch(){
        if (!this.roomInfo) {
            uiMgr.popPage()
            return
        }

        let matchType = this.roomInfo.config.getMatchType()
        let user = this.roomInfo.userInfo.getMySelf()
        let matchStatus = this.roomInfo.preBaseInfo.getStatus()
        // if (matchType == PBRegularCommon.MatchTypeTiming) {
        //TODO(先统一退出房间，即退出比赛)
        if (false){
            if (user.isReady() && matchStatus < PBRegularCommon.MatchStatusRunning) {
                uiMgr.pushAlert({
                    title : "温馨提示",
                    content : "此时离开房间相当于退赛,你可以选择暂时离开保留参赛状态，赛事开始后会自动将你拉回赛场",
                    ok : {
                        title : "暂时离开",
                        callback : ()=>{
                            uiMgr.popPage()
                        }
                    },
                    cancel : {
                        title : "我要退赛",
                        callback : ()=>{
                            uiMgr.showLoading()
                            MatchApi.cancelSign(this.preMatchKey).then(()=>{
                                uiMgr.hideLoading()
                                App.matchMgr.leave(this.preMatchKey)
                                uiMgr.popPage()
                            })
                        }
                    }
                })
            } else {
                App.matchMgr.leave(this.preMatchKey)
                uiMgr.popPage()
            }
        } else {
            if ((user.isReady() || user.isSigned()) && matchStatus < PBRegularCommon.MatchStatusRunning) {
                uiMgr.pushAlert({
                    title : "温馨提示",
                    content : "此时离开房间相当于退赛,确定要退出么？",
                    ok : {
                        title : "留在房间",
                        callback : ()=>{
                        }
                    },
                    cancel : {
                        title : "我要退赛",
                        callback : ()=>{
                            uiMgr.showLoading()
                            MatchApi.cancelSign(this.preMatchKey).then(()=>{
                                uiMgr.hideLoading()
                                App.matchMgr.leave(this.preMatchKey)
                                uiMgr.popPage()
                            })
                        }
                    }
                })
            } else {
                App.matchMgr.leave(this.preMatchKey)
                uiMgr.popPage()
            }
        }
    }

    @Utils.debounce(500)
    async onExtraTouch(){
        // uiMgr.showToast("开发中...")


        uiMgr.showLoading()
        let rule = await App.matchMgr.getMatchRule(this.roomInfo.config.getSchedulerID())
        uiMgr.hideLoading()

        uiMgr.loadPopup("match@matchModules/prefab/RuleDialog", {params : rule})

        if(sys.isBrowser) {
            // this.testSettle()
            // this.testRevival()
            // this.testTableSettle();
        }
    }

    @Utils.debounce(500)
    onAddRobot(){
        if (AppConfig.appID != "1025") {
            uiMgr.loadPopup("match@officialMatch/res/prefab/AddRobot", {params : {preMatchKey : this.preMatchKey}})
        }
    }

    onDestroy() {
        Log.d("ChatRoom onDestroy and off event")
        App.matchMgr.off(MatchMgr.EventType.JoinPreMatchSuccess, this.onJoinSuccess, this)
        App.matchMgr.off(MatchMgr.EventType.JoinPreMatchFail, this.onJoinFail, this)

        this.removeMatchListener()
    }

    testRevival() {
        let user = this.roomInfo.userInfo.getUsers()[0]
        if (!user) {
            return
        }

        let revival = {
            waitTime : 30,
            currentRank : 10,
            scoreWhenRevival : 1000,
            rankWhenRevival : 5,
            type : PBRegularCommon.RevivalTypeAsset,
            costAsset : this.roomInfo.getPrizePool(),
            ownAsset : this.roomInfo.getPrizePool(),
            isCanRevival : true,
            userCurRevivalNum : 1,
            ownVipRevival : 10,
            scoreBeforeRevival : 100,
        }
        if (true) {
            (this.handler.matchController as OfficialController).showView(4, {uid : user.uid, revival : revival})
        } 
    }

    async testSettle() {
        let roomInfo = this.roomInfo
        let handler = this.handler

        let user = roomInfo.userInfo.getRankUsers()[0]
        if (!user) {
            return
        }

        await App.gameMgr.enterGame({
            gameID: this.roomInfo.config.getGameID(),
            matchType: this.roomInfo.config.getMatchType(),
            playWay: this.roomInfo.config.getPlayOpt(),
            playerNum: this.roomInfo.config.getSeatNum(),
            matchKey: this.handler.preMatchKey,
        })

        if (true) {
            (handler.matchController as OfficialController).showView(5, {uid : user.uid, user : user})
        } 
    }

    testPromotion() {
        let user = this.roomInfo.userInfo.getUsers()[0]
        if (!user) {
            return
        }


        if (true) {
            (this.handler.matchController as OfficialController).showView(3, {uid : user.uid})
        } 
    }

    testWait() {
        let user = this.roomInfo.userInfo.getUsers()[0]
        if (!user) {
            return
        }


        if (true) {
            (this.handler.matchController as OfficialController).showView(2, {uid : user.uid, isEmpty : true})
        }
    }


    async testTableSettle() {

        let tables = this.roomInfo.tableInfo.getTables();
        let table
        for (let index = 0; index < tables.length; index++) {
            const element = tables[index];
            if (element.uids.length >= 3) {
                table = element
                break
            }
        }
        if (!table) {
            return
        }
        

        let uids = table.uids
        let uid = uids[0]
        let user = this.roomInfo.userInfo.findUser(uid)
        user.TableRole = 1
        user.gameResult = 1
        user.changeScore = 1000
        user.rank = 1
        user.score = 1000000

        let user1 = this.roomInfo.userInfo.findUser(uids[1])
        user1.TableRole = 1
        user1.gameResult = 1
        user1.changeScore = 10000
        user1.rank = 2
        user1.score = 1000000

        let user2 = this.roomInfo.userInfo.findUser(uids[2])
        user2.TableRole = 0
        user2.gameResult = 2
        user2.changeScore = -10000000
        user2.rank = 2
        user2.score = 1000000

        let testGameData = {
            results: [
                {scoreInfo: [{key: 8, value: 4}], uid: 1028638},
                {scoreInfo: [{key: 8, value: 1}], uid: 1024250},
                {scoreInfo: [{key: 8, value: 4}], uid: 1022698},
            ],
            scoreInfo: [
                {key: 0, value: 4},
                {key: 3, value: 2},
                {key: 7, value: 5},
                {key: 12, value: 6},
            ]
        }
        let handler = (this.handler.matchController as OfficialController);
        await App.gameMgr.enterGame({
            gameID: this.roomInfo.config.getGameID(),
            matchType: this.roomInfo.config.getMatchType(),
            playWay: this.roomInfo.config.getPlayOpt(),
            playerNum: this.roomInfo.config.getSeatNum(),
            matchKey: this.handler.preMatchKey,
        })
        handler.showView(1, {
            uid : uid,

            test: true,
            table : table,
            tableGameData: testGameData,
        })
    }
}