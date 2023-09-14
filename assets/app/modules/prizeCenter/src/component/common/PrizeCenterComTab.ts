import { _decorator, Component, Node, Prefab, ScrollView,instantiate,EventHandler} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { CommonTab,CommonTabItem} from '../../interfaceData/define';
import { PrizeCenterComTabItem } from './PrizeCenterComTabItem';
import { Log } from 'bos/exports';

@ccclass('PrizeCenterComTab')
export class PrizeCenterComTab extends XComponent {
    @property(ScrollView)
    scrollView: ScrollView = null!;

    @property(Prefab)
    tabItem:Prefab = null!;

    @property(EventHandler)
    callEvents: EventHandler[] = [];
    
    commonItems: Node[] = [];

    selectIndex = 0;

    start() {

    }

    initData(commonTab:CommonTab) {
        let tabs = commonTab?.tabs;
        this.selectIndex = commonTab?.defaultIndex;
        this.scrollView.content!.removeAllChildren();
        for (let i = 0; i < tabs.length; ++i) {
            let item = instantiate(this.tabItem);
            let data:CommonTabItem = {
                tabTitle:tabs[i].tabTitle,
                index:i,
            };
            this.scrollView.content!.addChild(item);
            this.commonItems.push(item);
            (item.getComponent('PrizeCenterComTabItem') as PrizeCenterComTabItem)!.init(data,this);
        }
        this.scrollView.scrollToLeft(0.1);
        this.updateItemStatus();
        this.tabItemCallFunc(this.selectIndex);
    }

    updateItemStatus(){
        for (let i = 0; i < this.commonItems.length; ++i) {
            let item = this.commonItems[i];
            (item.getComponent('PrizeCenterComTabItem') as PrizeCenterComTabItem)!.setSelect( i == this.selectIndex);
        }
    }

    tabItemCallFunc(index:number){
        //Log.w('tabItemCallFunc index',index);
        this.selectIndex = index;
        this.updateItemStatus();
        EventHandler.emitEvents(this.callEvents,index);
    }


}