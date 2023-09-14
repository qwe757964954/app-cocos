import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Toggle } from 'cc';
import { uiMgr } from 'bos/exports';
import { Utils } from 'app/utils/Utils';

@ccclass('MatchTipsDialog')
export class MatchTipsDialog extends XComponent {
    @property(Node)
    checkBox : Node

    @Utils.background()
    onLoad(): void {
        
    }

    setup(params){
        this.checkBox.active = params?.showCheckBox == true
    }

    onCancelTouch(){
        uiMgr.removePopup(this.node)
    }

    onOkTouch(){
        uiMgr.removePopup(this.node)

        //TODO(待添加)
        uiMgr.showToast("正在开发中...")
    }

    onCheckChange(toggle: Toggle){
        if (toggle.isChecked){
            localStorage.setItem("MATCH_CALENDAR_TIPS", "true")
        } else {
            localStorage.setItem("MATCH_CALENDAR_TIPS", "false")
        }
    }

    onCloseTouch(){
        uiMgr.removePopup(this.node)
    }
}