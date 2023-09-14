import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { Sprite } from 'cc';
import { Utils } from 'app/utils/Utils';
import { Label } from 'cc';
import { App } from 'app/App';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { Color } from 'cc';
import { User } from 'app/domain/user/User';
import { Decorator, uiMgr } from 'bos/exports';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';

@ccclass('TableSettleItem')
export class TableSettleItem extends XComponent {

    @property(Node)
    roleTag : Node

    @property(Label)
    nameLabel : Label

    @property(Label)
    multiLabel : Label
    
    @property(Label)
    scoreLabel : Label

    @property(Avatar)
    avatarNode : Avatar

    handler: MatchHandler
    uid : number
    table : MTable

    updateView(handler: MatchHandler, table : MTable, uid : number) {
        this.handler = handler
        this.table = table
        this.uid = uid

        let user = this.handler.roomInfo.userInfo.findUser(this.uid)
        if (user) {
            this.updateRoleTag(user)
            this.updateUser()
            this.updateScoreAndMulti(user)
        } else {
            console.error("TableSettleItem updateResult not find user", this.handler.roomInfo, this.uid)
        }
    }   

    updateRoleTag(user : MUser){
        this.roleTag.active = false
        if (user.TableRole == 1) {
            this.roleTag.active = true
            if (this.handler.roomInfo.config.getGameID() == "mahjong-hnxinxiang"){
                Utils.loadSpriteFromBundle(this.roleTag.getComponent(Sprite), "match@matchModules/image/tableSettle/ResApp_Game_MJ_bg_Zhuang")
            } else {
                Utils.loadSpriteFromBundle(this.roleTag.getComponent(Sprite), "match@matchModules/image/tableSettle/ResApp_Game_Ftl_icon_dizhumao")
            }
        }
    }

    @Decorator.TryAsync()
    async updateUser() {
        let model = await this.promiseOne<User>(App.userMgr.getUserByID(this.uid).finish())
        this.nameLabel.string = model.nickname

        //头像
        this.avatarNode.setUserID(this.uid)
    }

    updateScoreAndMulti(user){
        let baseScore = this.table.baseScore
        let changeScore = Math.abs(user.changeScore)
        let multi = Math.ceil(changeScore / baseScore)
        let str = `+${changeScore}`
        if (user.changeScore < 0) {
            `-${changeScore}`
        }
        if (this.handler.roomInfo.config.getGameID() == "mahjong-hnxinxiang"){
            this.multiLabel.string = `${multi}番`
        } else {
            this.multiLabel.string = `${multi}倍`
        }

        if (user.changeScore < 0) {
            this.scoreLabel.string = `-${Utils.formatNumWithUnit(changeScore)}`
            this.scoreLabel.color = new Color("#8AA6C7")
        } else {
            this.scoreLabel.string = `+${Utils.formatNumWithUnit(changeScore)}`
            this.scoreLabel.color = new Color("#E3C286")
        }
    }

    @Utils.debounce(200)
    onReportTouch(){
        console.debug("TableSettleItem onReportTouch")
        uiMgr.showToast("开发中...")
    }
}