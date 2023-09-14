import { _decorator, Component, Node,Prefab,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {IImage} from 'idl/tss/hall/prizemall.v2';
import { Log ,NodeUtil} from 'bos/exports';

@ccclass('PrizeDetailLayout')
export class PrizeDetailLayout extends XComponent {
    @property(Prefab)
    imageCell:Prefab = null!;

    updateView(introduce?: IImage[]){
        introduce.forEach((item)=>{
            if (item.imgURL != '') {
                let  cell = instantiate(this.imageCell);
                this.node.addChild(cell);
                NodeUtil.sendMessage(cell,'setUrl',item.imgURL);
            }
        })
    }

}