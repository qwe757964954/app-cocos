import { _decorator, Component, Node } from 'cc';
const { ccclass, property, executeInEditMode} = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Tab } from './Tab';

@ccclass('TabBar')
// @executeInEditMode(true)
export class TabBar extends XComponent {
    @property(Node)
    tabRoot: Node

    @property(Node)
    contentRoot: Node

    private selectedTab: Tab

    onLoad() {
        this.tabRoot?.children.forEach((node)=>{
            const t = node.getComponent(Tab)
            t.setDelegate(this)
            if (t.isSelected) {
                this.selectedTab = t
            }
        })
    }

    onSelectTab(tab: Tab) {
        console.log("onSelectTab", tab.node.name)
        if (this.selectedTab && this.selectedTab != tab) {
            this.selectedTab.isSelected = false
        } 
        tab.isSelected = true
        this.selectedTab = tab
    }
}