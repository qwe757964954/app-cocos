import { Widget } from 'cc'
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { ShowRank } from 'app/domain/match/config/MatchConfig';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { isValid } from 'cc';
import { resLoader } from 'bos/exports';
import { Vec3 } from 'cc';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { RPrizeItem } from './RPrizeItem';

@ccclass('RewardItem')
export class RewardItem extends XComponent {
	@property(Node)
	dynamicRewardNode : Node

    @property(Sprite)
    rankIcon : Sprite

    @property(Label)
    rankLabel : Label

    @property(Node)
    dynamicNode : Node

    @property(Node)
    fixedNode : Node

    @property(Label)
    dynamicLabel : Label

    @property(Label)
    fixedLabel : Label

    @property(Label)
    percentLabel : Label

    @property(Node)
    dynamicContent : Node

    @property(Node)
    fixedContent : Node

    @property(Prefab)
    prizePrefab : Prefab
    

    rankInfo : ShowRank
    mixPrize? : boolean

    updateView(rankInfo : ShowRank, mixPrize? : boolean) {
        this.rankInfo = rankInfo
        this.mixPrize = mixPrize

        this.updateRank()
        this.updatePrize()
    }   

    updateRank(){
        let rankInfo = this.rankInfo
        let startNum = rankInfo.startNum
        let endNum = rankInfo.endNum
        if (endNum <= 3) {
            this.rankIcon.node.active = true
            this.rankLabel.node.active = false

            this.rankIcon.spriteFrame = null
            resLoader.loadSpriteFrame("match@matchModules/image/rank/ResApp_Game_Com_icon_no" + endNum.toString(), (err, spriteFrame)=>{
                if (!isValid(this.node) || err || rankInfo != this.rankInfo){
                    return
                }
                this.rankIcon.spriteFrame = spriteFrame
            })
        } else {
            this.rankIcon.node.active = false
            this.rankLabel.node.active = true
            this.rankLabel.string = `${startNum}-${endNum}`
        }
    }

    updatePrize(){
        let dynamicAssets = this.rankInfo.dynamicAssets ?? []
        let hasDynamic = dynamicAssets.length > 0
        let isZeroDynamic = true
        for (let index = 0; index < dynamicAssets.length; index++) {
            const element = dynamicAssets[index];
            if (element.amount > 0) {
                isZeroDynamic = false
            }
        }

        let fixedAssets = this.rankInfo.fixedAssets ?? []
        let hasFixed = fixedAssets.length > 0
        let isZeroFixed = true
        for (let index = 0; index < fixedAssets.length; index++) {
            const element = fixedAssets[index];
            if (element.amount > 0) {
                isZeroFixed = true
            }
        }

        if (this.mixPrize) {
            this.dynamicNode.active = true
            this.dynamicNode.setPosition(new Vec3(-249.5,0,0))

            this.fixedNode.active = true
            this.fixedNode.setPosition(new Vec3(265.5,0,0))
        } else {
            if(hasDynamic) {
                this.dynamicNode.active = true
                this.dynamicNode.setPosition(new Vec3(0,0,0))
            } else {
                this.dynamicNode.active = false
            }

            if(hasFixed) {
                this.fixedNode.active = true
                this.fixedNode.setPosition(new Vec3(0,0,0))
            } else {
                this.fixedNode.active = false
            }
        }

        if (hasDynamic) {
            if (isZeroDynamic) {
                this.dynamicLabel.node.active = true
                this.dynamicRewardNode.active = false
            } else {
                this.dynamicLabel.node.active = false
                this.dynamicRewardNode.active = true

                let rate = this.rankInfo.rate ?? 0
                const tempRate: number = rate / 10;
                if (Math.ceil(tempRate) !== tempRate) {
                  this.percentLabel.string = `${tempRate.toFixed(1)}%\n奖池`;
                } else {
                  this.percentLabel.string = `${tempRate.toFixed()}%\n奖池`;
                }
    
                this.dynamicContent.destroyAllChildren()
                for (let index = 0; index < dynamicAssets.length; index++) {
                    const element = dynamicAssets[index];
                    let item = instantiate(this.prizePrefab)
                    this.dynamicContent.addChild(item)
                    item.getComponent(RPrizeItem).updateView(element)
                }
            }
        }

        if (hasFixed) {
            if (isZeroFixed) {
                this.fixedLabel.node.active = true
                this.fixedContent.active = false
            } else {
                this.fixedLabel.node.active = false
                this.fixedContent.active = true

                this.fixedContent.destroyAllChildren()
                for (let index = 0; index < fixedAssets.length; index++) {
                    const element = fixedAssets[index];
                    let item = instantiate(this.prizePrefab)
                    this.fixedContent.addChild(item)
                    item.getComponent(RPrizeItem).updateView(element)
                }
            }
        }
    }
}