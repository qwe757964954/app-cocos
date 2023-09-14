import { _decorator, Component, Node,Prefab,Label,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SpecValue } from './SpecValue';
import { Log } from 'bos/exports';
import { SpecSelect } from './SpecSelect';
import {IProductVariant} from 'idl/tss/hall/prizemall.v2';

@ccclass('SpecItem')
export class SpecItem extends XComponent {
    @property(Label)
    nameCN:Label = null!;

    @property(Node)
    valuePanel:Node = null!;

    @property(Prefab)
    valueItem:Prefab = null!;

    valueItems:Node[] = [];

    delegate:SpecSelect = null!;

    init(productVariant:IProductVariant,selectSpecUI:SpecSelect) {
        this.delegate = selectSpecUI;
        this.nameCN.string = productVariant.nameCN;
        this.valuePanel.removeAllChildren();
        this.valueItems = [];
        for (const value of productVariant.values) {
            let item = instantiate(this.valueItem);
            this.valuePanel.addChild(item);
            (item.getComponent(SpecValue) as SpecValue)!.init(value,this);
            this.valueItems.push(item);
        }
    }

    setSelectItem(value:string){
        Log.w('setSelectItem value',value);
        for (const item of this.valueItems) {
            let specValueCmp = (item.getComponent(SpecValue) as SpecValue)
            let itemValue =  specValueCmp!.getItemValue();
            specValueCmp!.setSelect(value == itemValue);
        }
    }

    //item回调
    onEventValue(value:string){
        Log.w('specificValue',value);
        this.delegate.onEventValue(value);
    }

    start() {

    }

    update(deltaTime: number) {

    }
}