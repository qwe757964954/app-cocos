import { _decorator, Component, Node,Sprite} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Utils } from 'app/utils/Utils';


@ccclass('SupportItem')
export class SupportItem extends XComponent {
    @property(Sprite)
    selectView:Sprite = null;

    updateSelect(on:boolean){
        let path = on ? 'common/button/Res_ResApp_Com_Btn_Checkbox_2':'common/button/Res_ResApp_Com_Btn_Checkbox_01';
        Utils.loadSpriteFromResources(this.selectView, path);
    }
}