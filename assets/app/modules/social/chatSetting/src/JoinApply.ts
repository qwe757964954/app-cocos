import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { JoinApplyCell } from './JoinApplyCell';
import { uiMgr } from 'bos/exports';
import { IM } from 'qsdk/im/IM';
import { GroupManager } from './GroupManager';
const { ccclass, property } = _decorator;

@ccclass('JoinApply')
export class JoinApply extends Component {

    @property(Label)
    title: Label = null

    @property(Node)
    center: Node = null

    @property(Node)
    noApply: Node = null

    @property(Prefab)
    joinApplyCell: Prefab = null

    start() {

        this.updateView()
    }

    async updateView() {
        if (this.title) {
            this.title.string = "邀请进群申请"
        }
        let applyList = await IM.getInstance().queryGroupApplyList({ sessionID: GroupManager.getInstance().session.sessionID })

        if (!applyList || applyList.length == 0) {
            this.noApply.active = true
            return
        }

        for (let i = 0; i < applyList.length; i++) {
            let message = applyList[i]
            let data = message.content.body
            let node = instantiate(this.joinApplyCell)
            this.center.addChild(node)
            let params = { userID: data.inviterID, inventedUserID: data.userIDList, isAgree: data.isAgree }//构造参数
            node.getComponent(JoinApplyCell).updateView(params)
        }
    }

    clickBack() {//返回上级
        uiMgr.popPage()
    }

}