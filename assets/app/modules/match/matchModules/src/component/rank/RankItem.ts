import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { NetImageEx } from 'app/components/NetImageEx';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { Utils } from 'app/utils/Utils';
import { resLoader } from 'bos/exports';
import { isValid } from 'cc';
import { App } from 'app/App';

@ccclass('RankItem')
export class RankItem extends XComponent {

    @property(Sprite)
    rankIcon : Sprite

    @property(Label)
    rankLabel : Label

    @property(Label)
    nameLabel : Label

    @property(Node)
    scoreNode : Node

    @property(Label)
    scoreLabel : Label

    @property(Node)
    quitTag : Node

    @property(Node)
    scoreSprite : Node

    @property(Avatar)
    avatarNode : Avatar
    
    user : MUser

    updateView(user : MUser) {
        this.user = user

        this.avatarNode.setUserID(this.user.uid)

        if (this.user.isStageQuitFlag) {
            this.quitTag.active = true
            this.scoreNode.active = false
        } else {
            this.quitTag.active = false
            this.scoreNode.active = true
            if (this.user.isOut()) {
                this.scoreSprite.active = false
                this.scoreLabel.string = "已淘汰"
            } else {
                this.scoreSprite.active = true
                this.scoreLabel.string = Utils.formatNumWithUnit(this.user.score)
            }
        }

        this.updateRank()

        this.updateName()
    }

    async updateName() {
        let user = this.user
        let model = await App.userMgr.getUserByID(this.user.uid).finish()
        if (!isValid(this.node) || user.uid != this.user.uid){
            return
        }
        this.nameLabel.string = model.nickname
    }

    updateRank() {
        let user = this.user
        if (this.user.rank >= 1 && this.user.rank <= 3) {
            this.rankIcon.node.active = true
            this.rankLabel.node.active = false

            this.rankIcon.spriteFrame = null
            resLoader.loadSpriteFrame("match@matchModules/image/rank/ResApp_Game_Com_icon_no" + this.user.rank.toString(), (err, spriteFrame)=>{
                if (!isValid(this.node) || err || user.uid != this.user.uid){
                    return
                }
                this.rankIcon.spriteFrame = spriteFrame
            })
        } else {
            this.rankIcon.node.active = false
            this.rankLabel.node.active = true
            this.rankLabel.string = this.user.rank.toString()
        }
    }
}