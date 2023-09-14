import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { SelectCellParams } from '../select/SelectUserCtr';
import { eventSystem } from 'bos/exports';
import { App } from 'app/App';

@ccclass('SelectUserCellCtr')
export class SelectUserCellCtr extends XComponent {
    @property(Node)
    select: Node = null;

    @property(Label)
    nameLabel: Label = null

    private params: SelectCellParams;

    updateView(params: SelectCellParams) {
        this.params = params
        this.refreshView()
    }

    start() {
        eventSystem.on("SELECT_USER_ONCLICK", this.onSelectUser, this)

    }

    onDestroy(): void {
        eventSystem.off("SELECT_USER_ONCLICK", this.onSelectUser, this)        
    }


    onClickCell() {
        this.params.isSelect = !this.params.isSelect
        this.refreshView()

    
        eventSystem.emit("SELECT_USER_ONCLICK", this.params)
        
    }

    refreshView() {
        let params = this.params
        App.userMgr.getUserByID(params.userID).finish().then((user) => {
            if (user.uid === params.userID) {
                this.nameLabel.string = user.nickname + ""
            }
        })
        this.select.active = params.isSelect
    }


    onSelectUser(params: SelectCellParams) {
        if (this.params.isSingleSelect){
            if (params?.userID != this.params.userID) {
                this.params.isSelect = false
            }
            this.refreshView()
        }
        
    }

}