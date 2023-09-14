import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { uiMgr } from 'bos/exports';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { EditBox } from 'cc';

@ccclass('AddRobot')
export class AddRobot extends XComponent {

    @property(EditBox)
    editBox : EditBox

    preMatchKey : string

    setup(params){
        this.preMatchKey = params.preMatchKey

        this.editBox.focus()
    }

    onClose(){
        uiMgr.removePopup(this.node)
    }

    async onAdd(){
        let result = await MatchApi.applyRobot(this.preMatchKey, parseInt(this.editBox.textLabel.string))
        if (result.err) {
            uiMgr.showToast("添加失败了", result.err)
        }

        this.onClose()
    }

    onReturn(){
        this.onAdd()
    }
}