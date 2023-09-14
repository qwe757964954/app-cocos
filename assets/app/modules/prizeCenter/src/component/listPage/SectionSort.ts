import { _decorator, Component, Node ,Prefab,instantiate,EventHandler} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SortItem } from './SortItem';
import { Log } from 'bos/exports';
@ccclass('Item')
export class Item {
    @property
    sortType = 0;
    @property
    itemName = '';

}


@ccclass('SectionSort')
export class SectionSort extends XComponent {
    @property([Item])
    items: Item[] = [];

    @property(Prefab)
    itemPrefab: Prefab = null!;

    @property(Node)
    itemPanel: Node = null!;

    @property(EventHandler)
    callEvents: EventHandler[] = [];

    commonItems: Node[] = [];

    start() {
        this.itemPanel.removeAllChildren();
        for (var i = 0; i < this.items.length; ++i) {
            var item = instantiate(this.itemPrefab);
            var data = this.items[i];
            this.itemPanel.addChild(item);
            this.commonItems.push(item);
            (item.getComponent(SortItem) as SortItem)!.init(data,this);
        }
        this.updateItemStatus(0);
    }
    
    itemClickEvent(index:number){
        this.updateItemStatus(index);
        EventHandler.emitEvents(this.callEvents,index);
    }

    updateItemStatus(index:number){
        for (let i = 0; i < this.commonItems.length; ++i) {
            let item = this.commonItems[i];
            (item.getComponent(SortItem) as SortItem)!.setSelect( i == index);
        }
    }

    update(deltaTime: number) {

    }
}