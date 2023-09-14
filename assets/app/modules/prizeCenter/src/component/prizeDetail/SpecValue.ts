import { _decorator, Component, Node,Label,Sprite,Color} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import {SpecItem} from './SpecItem';
import { Log } from 'bos/exports';
import * as PrizeMallPKG from 'idl/tss/hall/prizemall.v2';

@ccclass('SpecValue')
export class SpecValue extends XComponent {
    @property(Label)
    valueLab:Label = null!;

    @property(Sprite)
    rootBg:Sprite = null!;

    specificValue:PrizeMallPKG.ISpecificValue = null!;
    delegate:XComponent = null!;
    selectFlag:boolean = false;

    init(specificValue:PrizeMallPKG.ISpecificValue,delegate:XComponent){
        this.valueLab.string = specificValue.valueCN;
        this.specificValue = specificValue;
        this.delegate = delegate;
    }

    getItemValue(){
        return this.specificValue.value;
    }

    setSelect(select:boolean) {
        this.selectFlag = select;
        this.rootBg.color = select? new Color(189, 157, 102, 255): new Color(232, 232, 232, 255);
        this.valueLab.color = select? new Color(255, 255, 255, 255): new Color(136, 136, 136, 255);
    }

    onClickValue(){
        if (this.selectFlag) return;
        (this.delegate as SpecItem)!.onEventValue(this.specificValue.value);
    }
}