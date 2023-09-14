import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SessionCell } from './SessionCell';
import { eventSystem, NodeUtil } from 'bos/exports';
import { Label } from 'cc';
import { UITransform } from 'cc';
import { Size } from 'cc';
import { Layout } from 'cc';
import { log } from 'console';

@ccclass('SessionOpt')
export class SessionOpt extends XComponent {

    sessionCell: Node = null!;

    @property(Label)
    topRank: Label = null!;

    @property(Label)
    DND: Label = null!;

    start() {

    }

    updateView(node: Node) {
        this.sessionCell = node;
        if (this.session) {
            if (this.session.topRank > 0) {
                this.topRank.string = '取消置顶'
            } else {
                this.topRank.string = '置顶'
            }

            if (this.session.isDND == true) {
                this.DND.string = '取消免打扰'
            } else {
                this.DND.string = '免打扰'
            }
            // this.DND.updateRenderData(true)
            // // this.DND.node.getComponent(UITransform).contentSize
            // if (this.DND.node.getComponent(UITransform).contentSize.width > 180) {
            //     let size = this.DND.node.getComponent(UITransform).contentSize
            //     let parentSize = this.DND.node.parent.getComponent(UITransform).contentSize
            //     this.DND.node.parent.getComponent(UITransform).contentSize = new Size(size.x + 40, parentSize.y)
            //     this.DND.node.parent.parent.getComponent(Layout).updateLayout()
            // } else {
            //     let size = this.DND.node.getComponent(UITransform).contentSize
            //     let parentSize = this.DND.node.parent.getComponent(UITransform).contentSize
            //     this.DND.node.parent.getComponent(UITransform).contentSize = new Size(180, parentSize.y)
            //     this.DND.node.parent.parent.getComponent(Layout).updateLayout()
            // }
            this.node.getComponent(Layout).updateLayout(true)
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


    onItemClick(event: Event, customEventData: string) {
        let session = this.sessionCell.getComponent(SessionCell).session
        // console.log("sessiononItemClick", session)
        eventSystem.emit(customEventData, session)
        // this.showPages(parseInt(customEventData)-1)
    }

    get session() {
        return this.sessionCell.getComponent(SessionCell).session
    }
}

