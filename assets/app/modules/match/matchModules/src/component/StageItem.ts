import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import StageConfig from 'app/domain/match/config/StageConfig';
import { Label } from 'cc';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { Sprite } from 'cc';
import { Utils } from 'app/utils/Utils';
import { Color } from 'cc';
import { resLoader } from 'bos/exports';
import { isValid } from 'cc';
import { instantiate } from 'cc';
import { Vec3 } from 'cc';
import { UITransform } from 'cc';
import { PromotionHead } from './promotion/PromotionHead';

@ccclass('StageItem')
export class StageItem extends XComponent {

    @property(Label)
    promoLabel: Label

    @property(Label)
    numLabel: Label

    @property(Label)
    tipsLabel: Label

    @property(Node)
    moreNode: Node

    @property(Node)
    nextNode: Node

    @property(Sprite)
    bgSprite: Sprite

    @property(Node)
    centerNode: Node

    handler: MatchHandler
    stageInfo: StageConfig

    updateView(handler: MatchHandler, info: { stage: StageConfig, needNext, needMore, inProgress, complete, isFinally, needHead?: boolean, uid?: number }) {

        console.warn("StageItem updateView", info)

        this.handler = handler
        this.stageInfo = info.stage

        this.moreNode.active = info.needMore
        this.nextNode.active = info.needNext

        if (info.isFinally) {
            this.promoLabel.string = "决赛"
        } else {
            let promotionNum = this.stageInfo.promotion.promotionNum
            this.promoLabel.string = `前${promotionNum}晋级`
        }

        if (this.stageInfo.stageType == PBRegularCommon.StageTypeStrike) {
            this.numLabel.string = "打立出局"
        } else {
            let gameNo = this.stageInfo.end.gameNum
            this.numLabel.string = `共${gameNo}局`
        }

        if (info.complete) {
            this.tipsLabel.string = "已结束"
        } else {
            if (this.stageInfo.stageType == PBRegularCommon.StageTypeStrike) {
                let duration = this.stageInfo.end.duration
                let min = Math.ceil(duration / 60)
                this.tipsLabel.string = `约${min}分钟`
            } else {
                let times = 2
                let gameID = this.handler.roomInfo.config.getGameID()
                if (gameID === "landlord-tysanrenddz") {// 三人斗地主
                    times = 1.5
                } else if (gameID === "mahjong-hnxinxiang") {// 新乡麻将
                    times = 2.5
                }
                let gameNo = this.stageInfo.end.gameNum ?? 1
                this.tipsLabel.string = `约${gameNo * times}分钟`
            }
        }

        if (info.complete) {
            Utils.loadSpriteFromBundle(this.bgSprite, "match@matchModules/image/stageWait/ResApp_Contest_Img_FinishGame_1")
            this.promoLabel.color = new Color("#331404")
            this.numLabel.color = new Color("#341607")
            this.tipsLabel.color = new Color("#341607")
        } else if (info.inProgress) {
            Utils.loadSpriteFromBundle(this.bgSprite, "match@matchModules/image/stageWait/ResApp_Contest_Img_FinishGame_2")
            this.promoLabel.color = new Color("#824408")
            this.numLabel.color = new Color("#8C4F13")
            this.tipsLabel.color = new Color("#8C4F13")
        } else {
            Utils.loadSpriteFromBundle(this.bgSprite, "match@matchModules/image/stageWait/ResApp_Contest_Img_FinishGame_3")
            this.promoLabel.color = new Color("#4A1E08")
            this.numLabel.color = new Color("#492513")
            this.tipsLabel.color = new Color("#492513")
        }

        if (info.needHead) {
            resLoader.loadPrefab("match@matchModules/prefab/PromotionHead", (err, prefab) => {
                if (!isValid(this.node) || err) {
                    return
                }

                let item = instantiate(prefab)
                this.centerNode.addChild(item)

                let height = this.centerNode.getComponent(UITransform).height
                let itemHeight = item.getComponent(UITransform).height

                item.setPosition(new Vec3(0, height / 2 + 21 + itemHeight / 2))

                item.getComponent(PromotionHead).updateView(info.uid)
            })
        }
    }
}