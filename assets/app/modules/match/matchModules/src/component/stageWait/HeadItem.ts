import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Label } from 'cc';
import { App } from 'app/App';
import { User } from 'app/domain/user/User';
import { Decorator } from 'bos/exports';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';

@ccclass('HeadItem')
export class HeadItem extends XComponent {

    @property(Label)
    nameLabel : Label

    @property(Node)
    championTag : Node

    @property(Avatar)
    avatarNode : Avatar

    user : MUser
    handler : MatchHandler

    onDisable(): void {
        this.removeMatchEventListener()
    }

    onDestroy(): void {
        this.removeMatchEventListener()
    }

    addMatchEventListener(){
        if (this.handler){
            this.handler.on(MatchHandler.EventType.RankChange, this.onRankChange, this)
        }
    }

    removeMatchEventListener(){
        if (this.handler){
            this.handler.off(MatchHandler.EventType.RankChange, this.onRankChange, this)
        }
    }

    onRankChange(){
        this.handler.roomInfo.userInfo.sort()

        this.championTag.active = this.user.rank == 1
    }

    @Decorator.TryAsync()
    async updateView(handler : MatchHandler, user : MUser) {
        this.user = user
        this.handler = handler

        this.addMatchEventListener()

        this.handler.roomInfo.userInfo.sort()
        this.championTag.active = this.user.rank == 1

        this.nameLabel.string = ""
        let model = await this.promiseOne<User>(App.userMgr.getUserByID(this.user.uid).finish())
        this.nameLabel.string = model.nickname

        //头像
        this.avatarNode.setUserID(this.user.uid)
    }
}