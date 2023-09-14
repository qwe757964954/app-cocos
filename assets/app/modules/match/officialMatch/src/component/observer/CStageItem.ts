import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import StageConfig from 'app/domain/match/config/StageConfig';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { Color } from 'cc';
import { LabelOutline } from 'cc';
import { SpriteFrame } from 'cc';

@ccclass('CStageItem')
export class CStageItem extends XComponent {

    @property(Sprite)
    bgSprite : Sprite

    @property(Label)
    numLabel : Label

    @property(Node)
    curTag : Node

    @property(Node)
    finallyTag : Node

    @property(Sprite)
    lineView : Sprite

    @property(SpriteFrame)
    completeSpriteFrame : SpriteFrame

    @property(SpriteFrame)
    unCompleteSpriteFrame : SpriteFrame

    @property(SpriteFrame)
    inProgressSpriteFrame : SpriteFrame

    handler: MatchHandler 
    stageInfo : StageConfig

    updateView(handler: MatchHandler, info : {stage : StageConfig, isFirst, inProgress, complete, isFinally : boolean}) {
        this.handler = handler
        this.stageInfo = info.stage

        this.curTag.active = info.inProgress
        this.finallyTag.active = info.isFinally

        this.lineView.node.active = !info.isFirst

        if (info.inProgress || info.complete) {
            if (info.inProgress) {
                this.bgSprite.spriteFrame = this.inProgressSpriteFrame
            } else {
                this.bgSprite.spriteFrame = this.completeSpriteFrame
            }
            this.numLabel.color = new Color("#FEFABC")
            this.numLabel.getComponent(LabelOutline).enabled = true
            this.lineView.color =new Color("#FFBF4E") 
        } else {
            this.bgSprite.spriteFrame = this.unCompleteSpriteFrame

            this.numLabel.color = new Color("#C7C7D8")
            this.numLabel.getComponent(LabelOutline).enabled = false
            this.lineView.color =new Color("#1A1926") 
        }

        if (info.isFinally) {
            this.numLabel.string = "决胜"
        } else {
            let promotionNum = this.stageInfo.promotion.promotionNum
            this.numLabel.string = promotionNum.toString()
        }
    }
}