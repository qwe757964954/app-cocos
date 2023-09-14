import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UserCellCtr } from './UserCellCtr';
import { eventSystem, NodeUtil } from 'bos/exports';


@ccclass('UserCellOptCtr')
export class UserCellOptCtr extends XComponent {
    onClickItem(event: Event, customEventData: string) {
        let ctr = this.node.parent.getComponent(UserCellCtr)
        if (ctr){
            let userID = ctr.userID
            if (customEventData == "1"){
                eventSystem.emit("IM_UNMUTUALFOLLOW_USER", userID)
            }else if(customEventData =="2"){
                eventSystem.emit("IM_BLACK_USER", userID)
    
            }
        }
        
    }
    followMove(offset: number) {
        let children = this.node.children
        let totalSize = NodeUtil.getContentSize(this.node)
        offset = Math.abs(offset)
        for (let i = 0; i < children.length; i++) {
            if (i > 0) {
                let x = 0
                for (let index = 0; index < i; index++) {
                    const child = children[index];
                    let size = NodeUtil.getContentSize(child)
                    x += size.width
                }
                x = offset * (x / totalSize.width)
                children[i].setPosition(x, 0)
            }
        }
    }
}