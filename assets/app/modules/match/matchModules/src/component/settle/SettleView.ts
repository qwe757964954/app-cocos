import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { App } from 'app/App';
import { isValid } from 'cc';
import { instantiate } from 'cc';
import { PrizeItem } from './PrizeItem';
import { Utils } from 'app/utils/Utils';
import { User } from 'app/domain/user/User';
import { Decorator, resLoader, uiMgr } from 'bos/exports';
import { UITransform } from 'cc';
import { Widget } from 'cc';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';

@ccclass('SettleView')
export class SettleView extends BaseMatchView {

    @property(Sprite)
    cupIcon : Sprite

    @property(Node)
    rankNode : Node

    @property(Label)
    rankLabel : Label

    @property(Label)
    nameLabel : Label

    @property(Node)
    prizeNode : Node

    @property(Node)
    emptyNode : Node

    @property(Node)
    prizeContent : Node

    @property(Node)
    infoNode : Node

    @property(Avatar)
    avatarNode : Avatar

    @property(Node)
    btnNode : Node
    

    uid : number
    user : MUser

    updateView(handler : MatchHandler, params?) {
        console.warn("SettleView updateView=========")
        console.debug("SettleView updateView=========", params)

        super.updateView(handler, params)

        this.uid = params.uid
        this.user = params.user

        if (this.uid && this.user) {
            this.updateCup()
            this.updateRank()
            this.updateUser()
            this.updatePrizes()
        } else {
            console.error("SettleView updateView params is err", params)
        }

        if (this.uid != App.userMgr.loginUid) {
            this.btnNode.active = false
        } else {
            this.btnNode.active = true
        }
    }

    updateCup(){
        this.cupIcon.spriteFrame = null
        let rank = this.user.rank
        if (rank >= 1 && rank <= 3) {
            let path = `match@matchModules/image/settle/ResApp_SettlAccounts_Img_No${rank}`
            Utils.loadSpriteFromBundle(this.cupIcon, path)
            this.infoNode.getComponent(Widget).bottom = 75
        } else {
            let prizes = this.user.getMergePrizes()
            if (prizes.length > 0) {
                Utils.loadSpriteFromBundle(this.cupIcon, "match@matchModules/image/settle/ResApp_SettlAccounts_Img_Other")
                this.infoNode.getComponent(Widget).bottom = 100
            } else {
                Utils.loadSpriteFromBundle(this.cupIcon, "match@matchModules/image/settle/ResApp_SettlAccounts_Img_Disuse1")
                this.infoNode.getComponent(Widget).bottom = 75
            }
        }
    }

    updateRank() {
        let rank = this.user.rank
        if (rank >= 1 && rank <= 3) {
            this.rankNode.active = false
        } else {
            let prizes = this.user.getMergePrizes()
            if (prizes.length > 0) {
                Utils.loadSpriteFromBundle(this.rankNode.getComponent(Sprite), "match@matchModules/image/settle/ResApp_SettlAccounts_Img_MingCi",()=>{
                    this.rankNode.active = true
                })
            } else {
                Utils.loadSpriteFromBundle(this.rankNode.getComponent(Sprite), "match@matchModules/image/settle/ResApp_SettlAccounts_Img_MingCi2",()=>{
                    this.rankNode.active = true
                })
            }
            this.rankLabel.string = rank.toString()
        }
    }

    @Decorator.TryAsync()
    async updateUser() {
        let model = await await this.promiseOne<User>(App.userMgr.getUserByID(this.uid).finish())
        this.nameLabel.string = model.nickname

        //头像
        this.avatarNode.setUserID(this.uid)
    }

    updatePrizes() {
        let prizes = this.user.getMergePrizes()
        if (prizes.length > 0) {
            this.prizeNode.active = true
            this.emptyNode.active = false

            for (let index = 0; index < prizes.length; index++) {
                const prize = prizes[index];
                resLoader.loadPrefab("match@matchModules/prefab/PrizeItem", (err, prefab)=>{
                    if (!isValid(this.node) || err){
                        return
                    }
                    let item = instantiate(prefab)
                    this.prizeContent.addChild(item)
                    item.getComponent(PrizeItem).updateView(prize)
                })
                
            }
        } else {
            this.prizeNode.active = false
            this.emptyNode.active = true
        }
    }

    onShareTouch(){
        console.debug("SettleView onShareTouch")

        uiMgr.showToast("开发中...")
    }

    async onBackTouch(){
        uiMgr.showLoading()
        /**exitGame 会把自己删除掉this.handler会置为空，先给个临时变量存一下*/
        let handler = this.handler
        await App.matchMgr.reJoin(this.handler.preMatchKey)
        await App.gameMgr.exitGame()
        handler.matchController?.destroyNode()
        uiMgr.hideLoading()
    }

    onDestroy(): void {
        console.debug("SettleView onDestroy===============")
    }
}