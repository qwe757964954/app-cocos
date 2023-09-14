import { _decorator, Component, Node,Label } from 'cc';
const { ccclass, property,menu } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { uiMgr } from 'bos/exports';

@ccclass('PrizeCenterComHeadRoot')
@menu('prizeCenter/common/PrizeCenterComHeadRoot')

export class PrizeCenterComHeadRoot extends XComponent {
    @property(Label)
    titleLabel:Label = null!;

    @property(String)
    titleStr = '';

    onLoad(): void {
        if (this.titleStr != ''){
            this.titleLabel.string = this.titleStr;
        }
    }
    
    setTitle(title:string){ 
        this.titleLabel.string = title;
    }

    onClickBack() {
        uiMgr.popPage();
    }
}