import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';

import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { App } from 'app/App';
import { IRelation } from 'qsdk/relation/db/Model';
import { BlackListCellOptCtr } from './BlackListCellOptCtr';
import { CellButtons } from 'app/modules/social/session/src/component/CellButtons';
import { Decorator } from 'bos/exports';


@ccclass('BlackListCellCtr')
export class BlackListCellCtr extends XComponent {
    @property(Label)
    nameLabel: Label = null;


    @property(Avatar)
    avatarView: Avatar = null

    _relation: IRelation = null
    userID: number = null

    cellButtons: CellButtons = null

    start() {
    }
    
    
    updateView(relation: IRelation, index, tableView) {
        if (!this.cellButtons){
            this.cellButtons = this.node.getComponent(CellButtons)
        }
        
        if (this.cellButtons) {
            this.cellButtons.setScrollView(tableView);
        }

        this._relation = relation
        this.userID = relation.userID
        this.refreshView()
    }

    async refreshView() {
        this.avatarView.setUserID(this._relation.userID)

        let user = await App.userMgr.getUserByID(this._relation.userID).finish()
        this.nameLabel.string = user.nickname
    }


    @Decorator.OnNodeEvent("cellClick")
    public onCellClick() {
        

    }

}