import { _decorator, Component, Enum, isValid, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchInfo } from 'app/domain/match/matchList/data/MatchInfo';
import { MatchConfig, SignCondition } from 'app/domain/match/config/MatchConfig';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { App } from "app/App"
import { PBPremiumCardPrivilege } from 'app/domain/privilege/code/code';
import { Decorator, Log, resLoader, uiMgr } from 'bos/exports';
import { User } from 'app/domain/user/User';
import { ResLoader } from 'bos/framework/loader/ResLoader';
import { MatchMgr } from 'app/domain/match/MatchMgr';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { Prefab } from 'cc';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Utils } from 'app/utils/Utils';
import { NetImageEx } from 'app/components/NetImageEx';

const SignBtnStyle = {
    Yellow : 1,
    Gray : 2,
}

const BtnSignStatus = {                     //        
    StatusNone: 1,                          //
    StatusSign: 2,                          //报名
    StatusCardSign: 3,                      //报名
    StatusEnter: 4,                         //进入
    StatusAdSign: 5,                        //广告报名
    StatusGotoCard: 6,                      //跳转至尊享卡
    StatusDialogTips: 7,                    //走弹窗提示
};


@ccclass('MatchSign')
export class MatchSign extends XComponent {
    @property(Label)
    actionLabel : Label

    @property(Label)
    tipsLabel : Label

    @property(Node)
    conditionNode : Node

    @property(NetImageEx)
    propIcon : NetImageEx

    @property(Sprite)
    btnSign : Sprite

    @property(SpriteFrame)
    graySprite : SpriteFrame

    @property(SpriteFrame)
    yellowSprite : SpriteFrame

    preMatchKey : string
    matchInfo : MatchInfo
    config : MatchConfig
    isSigned : boolean
    signCondition : SignCondition
    btnSignStatus : number =  BtnSignStatus.StatusNone

    start() {
        this.conditionNode.active = false
    }


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

    updateView(matchInfo : MatchInfo, config : MatchConfig, isSigned : boolean) {
        this.matchInfo = matchInfo
        this.config = config
        this.isSigned = isSigned
        this.preMatchKey = this.matchInfo.getPreMatchKey()

        const status = this.matchInfo.getStatus()
        if (status <= PBRegularCommon.MatchStatusInit){
            if (this.isSigned) {
                this.showSignedStatus()
            } else {
                this.checkSignLimit()
            }
        } else if (status == PBRegularCommon.MatchStatusRunning) {
            if (this.isSigned) {
                this.checkDelay()
            } else {
                this.showRunningStatus()
            }
        } else {
            this.showRunningStatus()
        }
    }

    /**设定按钮样式 */
    showSignBtnStyle(style : number){
        if (style == SignBtnStyle.Yellow) {
            this.btnSign.spriteFrame = this.yellowSprite
        } else {
            this.btnSign.spriteFrame = this.graySprite
        }
    }

    /**检测延迟入场 */
    @Decorator.TryAsync()
    checkDelay(){
        let delayCfg = this.config.getDelayMatchCfg()
        if (delayCfg.isEnabled){
            let now = Date.now() / 1000
            let startTimes = this.matchInfo.getMatchStartAt()
            let delayDuration = delayCfg.delayDuration ?? 0
            let delayTime = delayDuration - (now - startTimes)
            if (delayTime > 0) {
                this.checkPromiseOne(App.privilegeMgr.getHasPrivilege(PBPremiumCardPrivilege.PrivilegeTypeMatchDelayPlayGame), this.preMatchKey).then((value) =>{
                    if (value){
                        this.showDelayEnterStatus()
                    } else {
                        this.showRunningStatus()
                    }
                })
            }
        }
    }

    /**校验报名限制 */
    @Decorator.TryAsync()
    async checkSignLimit(){
        let limitInfo = this.config.getEntryIdentifyLimit()
        if (limitInfo) {
            if (limitInfo.type == PBRegularCommon.EntryUserRuleTypeVip){
                let hasCard = await this.checkPromiseOne(App.premiumMgr.getCardOverLevel(0), this.preMatchKey)
                if (hasCard){
                    this.checkSignCondition()
                } else {
                    this.showCardLimitTips()
                }
            } else if (limitInfo.type == PBRegularCommon.EntryUserRuleTypeNovice){
                let user = await this.checkPromiseOne(App.userMgr.loginUser.finish(), this.preMatchKey) as User
                //TODO(等待User完善)
                let noviceStatus = user.uid
                if (noviceStatus == 1) {
                    this.checkSignCondition()
                } else {
                    this.showNewerLimitTips()
                }
            } else if (limitInfo.type == PBRegularCommon.EntryUserRuleTypeCareerExp){
                //TODO(下阶段补充)
                this.checkSignCondition()
            } else if (limitInfo.type == PBRegularCommon.EntryUserRuleTypeTitleLevel){
                //TODO(下阶段补充)
                this.checkSignCondition()
            } else {
                this.checkSignCondition()
            }
        } else {
            this.checkSignCondition()
        }
    }

    @Decorator.TryAsync()
    async getNormalSignCondition(refresh ?: boolean){
        if (!this.signCondition || refresh) {
            this.signCondition = await this.checkPromiseOne(this.config.getNormalSignInfo(), this.preMatchKey)
        }
        return this.signCondition
    }

    /**检测报名条件 */
    async checkSignCondition(){
        this.checkFreeSign()
    }

    /**检测报名条件 免费*/
    @Decorator.TryAsync()
    async checkFreeSign() {
        let condition : SignCondition = await this.checkPromiseOne(this.getNormalSignCondition(), this.preMatchKey)
        if (condition && condition.isFree) {
            if (condition.isVipCard) {
                this.showCardSelectFree()
            } else {
                this.showFreeSign()
            }
        } else {
            this.checkCardSign()
        }
    }

    /**检测报名条件 免费 尊享卡特权
     * @param foreShow 不满足条件强制显示当前的报名方式
    */
    @Decorator.TryAsync()
    async checkCardSign(foreShow ?: boolean){
        let cardCondition : {remainderTimes : number, isVip : boolean} = await this.checkPromiseOne(this.config.getCardSignInfo(), this.preMatchKey)
        if (cardCondition && cardCondition.remainderTimes > 0){
            if (cardCondition.isVip) {
                this.showPrivilegeSign(cardCondition.remainderTimes)
            } else {
                this.showPrivilegeFreeSign(cardCondition.remainderTimes)
            }
        } else {
            if (foreShow) {
                this.showPrivilegeSign(0)
            } else {
                this.checkAdSign(foreShow)
            }
        }
    }

    /**检测报名条件 免费 看广告特权*/
    @Decorator.TryAsync()
    async checkAdSign(foreShow ?: boolean){
        let adCondition = await this.checkPromiseOne(this.config.getAdSignInfo(), this.preMatchKey)
        if (adCondition && adCondition.activeChanceLeft > 0) {
            this.showAdSign(adCondition.activeChanceLeft)
        } else {
            this.checkAssetSign(foreShow)
        }   
    }

    /**检测报名条件 资产报名
     * @param foreShow 不满足条件强制显示当前的报名方式
    */
    @Decorator.TryAsync()
    async checkAssetSign(foreShow ?: boolean) {
        let condition : SignCondition = await this.checkPromiseOne(this.getNormalSignCondition(), this.preMatchKey)
        if (condition){
            if (condition.asset){
                if (condition.canSign || foreShow) {
                    this.showAssetSign(condition.asset, condition.amount)
                } else{
                    this.checkUnSignCondition() 
                }
            }else{
                Log.e("condition.asset 配置有问题", condition)
            }
       
        } else {
            if (foreShow) {
                this.showInValidSign()
            } else {
                this.checkUnSignCondition()
            }
        }
    }

    /*没有满足的报名条件。显示一个报名方式
    规则
        完全免费＞特权免费＞广告免费＞道具报名＞金币报名＞奖券报名＞钻石报名
        若玩家什么条件都不满足，则操作按钮显示为配置的报名条件中第1优先级条件展示，点击按钮后，相当于玩家进入房间并点击报名按钮，走现有弹框提示流程。
    */
    checkUnSignCondition(){
        this.checkCardSign(true)
    }

    /**显示已报名 */
    showSignedStatus(){
        this.showSignBtnStyle(SignBtnStyle.Gray)

        this.conditionNode.active = false

        this.actionLabel.string = "已报名"
        this.btnSignStatus = BtnSignStatus.StatusEnter
    }

    /**显示延迟入场 */
    showDelayEnterStatus(){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = false

        this.actionLabel.string = "延迟入场"
        this.btnSignStatus = BtnSignStatus.StatusEnter
    }

    /**显示已开赛 */
    showRunningStatus(){
        this.showSignBtnStyle(SignBtnStyle.Gray)

        this.conditionNode.active = false

        this.actionLabel.string = "已开赛"
        this.btnSignStatus = BtnSignStatus.StatusEnter
    }

    /**显示vip限制 */
    showCardLimitTips(){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = true
        this.propIcon.node.active = false
        this.tipsLabel.string = "会员卡可报名"

        this.actionLabel.string = "开通会员卡"
        this.btnSignStatus = BtnSignStatus.StatusGotoCard
    }
    
    /**显示新用户限制 */
    showNewerLimitTips(){
        this.showSignBtnStyle(SignBtnStyle.Gray)

        this.conditionNode.active = false

        this.actionLabel.string = "新用户可报名"
        this.btnSignStatus = BtnSignStatus.StatusEnter
    }

    /**条件选择报名方式，尊享卡免费 */
    showCardSelectFree(){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = true
        this.propIcon.node.active = false
        this.tipsLabel.string = "会员卡免费"

        this.actionLabel.string = "马上报名"
        this.btnSignStatus = BtnSignStatus.StatusSign
    }

    /**免费报名 */
    showFreeSign(){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = true
        this.propIcon.node.active = false
        this.tipsLabel.string = "免费"

        this.actionLabel.string = "马上报名"
        this.btnSignStatus = BtnSignStatus.StatusSign
    }

    /**特权免费->有卡特权 
     * @param times 剩余次数
    */
    showPrivilegeSign(times?: number){
        if (times && times > 0) {
            this.showSignBtnStyle(SignBtnStyle.Yellow)
    
            this.conditionNode.active = true
            this.propIcon.node.active = false
            this.tipsLabel.string = "免费"
    
            this.actionLabel.string = "马上报名"
            this.btnSignStatus = BtnSignStatus.StatusCardSign
        } else {
            this.showSignBtnStyle(SignBtnStyle.Yellow)
    
            this.conditionNode.active = true
            this.propIcon.node.active = false
            this.tipsLabel.string = "会员卡免费"
    
            this.actionLabel.string = "开通会员"
            this.btnSignStatus = BtnSignStatus.StatusGotoCard
        }
    }

    /**特权免费->无卡特权（后台也可以配置无卡用户的报名免费特权） 
     * @param times 剩余次数
    */
    showPrivilegeFreeSign(times?: number){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = true
        this.propIcon.node.active = false
        this.tipsLabel.string = "免费"

        this.actionLabel.string = "马上报名"
        this.btnSignStatus = BtnSignStatus.StatusSign
    }

    /**看广告报名 
     * @param times 剩余次数
    */
    showAdSign(times ?: number){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = true
        this.propIcon.node.active = false
        this.tipsLabel.string = "免费"

        this.actionLabel.string = "看广告"
        this.btnSignStatus = BtnSignStatus.StatusAdSign 
    }

    /**资产报名 
     * @param signAsset 展示的资产
     * @param count 拥有的资产数量
    */
    showAssetSign(signAsset, count){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = true
        this.propIcon.node.active = true
        this.propIcon.setUrl(signAsset.icon)
        this.tipsLabel.string = Utils.formatNumWithX(signAsset.amount)

        if (count >= signAsset.amount) {
            this.actionLabel.string = "马上报名"
            this.btnSignStatus = BtnSignStatus.StatusSign 
        } else {
            this.actionLabel.string = "马上报名"
            this.btnSignStatus = BtnSignStatus.StatusDialogTips
        }
    }

    showInValidSign(){
        this.showSignBtnStyle(SignBtnStyle.Yellow)

        this.conditionNode.active = false

        this.actionLabel.string = "进入"
        this.btnSignStatus = BtnSignStatus.StatusEnter
    }

    async enterChatRoom(matchInfo : MatchInfo) {
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
            
                let prefab = data[0]
                let matchHandler = data[1]
                if (matchHandler && prefab) {
                    uiMgr.pushPage(prefab, {params : {preMatchKey : preMatchKey, handler : matchHandler}})
                }
           })
        } catch (error) {
            console.error("MatchSign enterChatRoom", error)
        }

    }

    checkAutoEnter(matchInfo : MatchInfo, config : MatchConfig) {
        let readyAt = matchInfo.getMatchReadyAt()
        let matchType = config.getMatchType()
        let curTimes = Date.now() / 1000
        let autoEnter = true
        if(matchType == PBRegularCommon.MatchTypeTiming && curTimes < readyAt) {
            autoEnter = false
        }

        if (autoEnter) {
            this.enterChatRoom(matchInfo)
        }
    }

    checkAddStartTips(matchInfo : MatchInfo, config : MatchConfig) {
        //创建日历提醒
        let startTimes = matchInfo.getMatchStartAt()
        let readyTimes = matchInfo.getMatchReadyAt()
        if (startTimes > (Date.now() / 1000 + 3600) && localStorage.getItem("MATCH_CALENDAR_TIPS") == "true") {
            uiMgr.loadPopup("match@matchModules/MatchTipsDialog", {params : {showCheckBox : true, start_ts : readyTimes * 1000}})
        }

        //TODO创建本地推送提醒
    }

    async signMatch(condition : SignCondition, matchInfo : MatchInfo, config : MatchConfig, promptJump?, cardTips?){
        let userRole = config.getEntryIdentifyLimit()
        let preMatchKey = matchInfo.getPreMatchKey()
        let result = await MatchApi.signMatch(preMatchKey, condition.token, promptJump, userRole, cardTips, condition.asset)
        if(!result.err) {
            this.checkAutoEnter(matchInfo, config)
            this.checkAddStartTips(matchInfo, config)
        } else {
            //TODO(报名失败了，刷新一下列表)
        }
    }

    @Decorator.TryAsync()
    async doSignUp(){
        Log.d("MatchSign doSignUp", this.btnSignStatus)
        if (this.btnSignStatus == BtnSignStatus.StatusEnter) {
            this.enterChatRoom(this.matchInfo)
        } else if (this.btnSignStatus == BtnSignStatus.StatusSign) {
            let condition = await this.checkPromiseOne(this.getNormalSignCondition(true), this.preMatchKey)
            if (condition && condition.token) {
                let promptJump = this.config.getPromptJump()
                this.signMatch(condition, this.matchInfo, this.config,  promptJump, condition.cardTips)
            } else {
                Log.e("MatchSign doSignUp condition is err", condition)
            }
        } else if (this.btnSignStatus == BtnSignStatus.StatusCardSign) {
            let condition = await this.checkPromiseOne(this.getNormalSignCondition(true), this.preMatchKey)
            if (condition && condition.token) {
                this.signMatch(condition, this.matchInfo, this.config)
            } else {
                Log.e("MatchSign doSignUp condition is err", condition)
            }
        } else if (this.btnSignStatus == BtnSignStatus.StatusGotoCard) {
            //TODO(跳转会员卡)
        } else if (this.btnSignStatus == BtnSignStatus.StatusAdSign) {
            //TODO(广告报名)   
        } else if (this.btnSignStatus == BtnSignStatus.StatusDialogTips) {
            //TODO(弹窗提示)
        } else {
            Log.e("doSignUp but btnSignStatus is err", this.btnSignStatus)
        }
    }

    onSignTouch(){
        this.doSignUp()
    }

    onEnterChatRoom(){
        if (this.matchInfo && this.config){
            this.enterChatRoom(this.matchInfo)
        }
    }
}