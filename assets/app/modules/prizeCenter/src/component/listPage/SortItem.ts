import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Item } from "./SectionSort";
import { SectionSort } from "./SectionSort";
import { Color } from 'cc';

@ccclass('SortItem')
export class SortItem extends XComponent {
    @property(Label)
    itemName : Label = null!;

    @property(Node)
    selectFlag : Node = null!;

    delegate:SectionSort = null!;
    itemData:Item = null!;

    init(item:Item,delegate:SectionSort){ 
        this.itemData = item;
        this.itemName.string = item.itemName;
        this.delegate = delegate;
    }
    
    setSelect(select:boolean) {
        this.selectFlag.active = select;
        this.itemName.color = select? new Color(152, 144, 232, 255):new Color(195, 208, 237, 255);
        this.itemName.isBold = select;
    }


    onClickItem() {
        if (this.delegate){
            this.delegate.itemClickEvent?.(this.itemData?.sortType);
        }
    }

}