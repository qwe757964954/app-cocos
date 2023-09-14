import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { App } from 'app/App';
import { SpriteFrame } from 'cc';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Utils } from 'app/utils/Utils';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';

@ccclass('ResultItem')
export class ResultItem extends XComponent {
    @property(Sprite)
    rankIcon : Sprite

    @property(Label)
    rankLabel : Label

    @property(Label)
    levelLabel : Label

    @property(Label)
    nameLabel : Label

    @property(Label)
    prizeLabel : Label

    @property(Avatar)
    avatarNode : Avatar

    @property([SpriteFrame])
    topRankSpriteFrame1 : SpriteFrame[] = []

    user : MUser
    handler : MatchHandler

    updateView(handler : MatchHandler, user : MUser) {
        this.user = user
        this.handler = handler

        this.updateUser()
        this.updateRank()
        this.updatePrize()
        this.updatePrizeLevel()
    }

    async updateUser() {
        let model = await App.userMgr.getUserByID(this.user.getUID()).finish()
        this.nameLabel.string = model.nickname

        //头像
        this.avatarNode.setUserID(this.user.getUID())
    }

    updateRank() {
        let rank = this.user.rank
        if (rank >= 1 && rank <= 3) {
            this.rankLabel.node.active = false

            this.rankIcon.node.active = true
            this.rankIcon.spriteFrame = this.topRankSpriteFrame1[rank - 1]
        } else {
            this.rankIcon.node.active = false
            this.rankLabel.node.active = true

            this.rankLabel.string = rank.toString()
        }
    }

    updatePrize() {
        let prize = this.user.getMergePrizes()
        if (prize.length > 0) {
            let asset = prize[0].asset
            if (asset) {
                this.prizeLabel.string = `${asset.name}${Utils.formatNumWithX(asset.amount)}`
            } else {
                this.prizeLabel.string = "未获奖"
            } 
        } else {
            this.prizeLabel.string = "未获奖"
        }
    }

    updatePrizeLevel(){
        let prize = this.user.getMergePrizes()
        if (prize.length > 0) {
            let prizePool = this.handler.roomInfo.config.getRankPrize(this.handler.roomInfo.getPrizePool(), this.handler.roomInfo.baseInfo.getDynamicStageId(), true)
            let ranks = prizePool.ranks
            if(ranks) {
                const chineseNumeralMap: string[] = ['一', '二', '三', '四', '五', '六', '七', '八','九', '十']
                let rank = this.user.rank
                for (let index = 0; index < ranks.length; index++) {
                    const info = ranks[index];
                    if (rank >= info.startNum && rank <= info.endNum) {
                        if (index < 10) {
                            this.levelLabel.string = `${chineseNumeralMap[index]}等奖`
                        } else {
                            this.levelLabel.string = `${index + 1}等奖`
                        }
                        return
                    }
                }

                this.levelLabel.string = ""
            } else {
                this.levelLabel.string = ""
            }
        } else {
            this.levelLabel.string = ""
        }

    }
}