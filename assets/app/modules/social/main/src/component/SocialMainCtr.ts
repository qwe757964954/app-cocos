import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, uiMgr } from 'bos/exports';

@ccclass('SocialMainCtr')
export class SocialMainCtr extends XComponent {

    @property(Node)
    pageNode: Node = null;

    // @property([Prefab])
    // pagePrefab: Prefab[] = [];

    // private pages: Map<number, Node> = new Map();

    onEnable() {
        // this.showPages(0)
    }

    update(deltaTime: number) {

    }

    // showPages(index:number){
    //     let page = this.pages.get(index)
    //     if (page == null) {
    //         for(let i = 0; i < this.pagePrefab.length; i++) {
    //             if (i == index) {
    //                 let node = instantiate(this.pagePrefab[i])
    //                 this.pageNode.addChild(node)
    //                 this.pages.set(index, node)
    //                 page = node
    //                 break
    //             }
    //         }
    //     }
    //     this.pages.forEach((value, key) => {
    //         if (value == page) {
    //             value.active = true
    //         }else{
    //             value.active = false
    //         }
    //     })
    // }

    // onBottomItemClick(event: Event, customEventData: string) {
    //     console.warn("onBottomItemClick start1111111111111111111111",customEventData)
    //     if (customEventData == "4") {
    //         uiMgr.popScene()
    //         return
    //     }
    //     this.showPages(parseInt(customEventData)-1)
    // }
}