import { _decorator, Component, Node,Sprite} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, NodeUtil } from 'bos/exports';
import { Utils } from 'app/utils/Utils';

@ccclass('CancelReasonItem')
export class CancelReasonItem extends XComponent {
    @property(Sprite)
    selectView:Sprite = null!;

    private _index = 0;
    private _on = false;

    updateView(index:number) {
        this._index = index;
    }
    
    updateStatus(select:boolean) {
        this._on = select;
        let path = select ? 'common/button/Res_ResApp_Com_Btn_Checkbox_2':'common/button/Res_ResApp_Com_Btn_Checkbox_01';
        Utils.loadSpriteFromResources(this.selectView, path);
    }

    onClickSelect(){
        NodeUtil.sendMessageUpwards(this.node,'onEventChangeReason',this._index)
    }
}