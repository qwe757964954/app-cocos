import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { ApplyMutualFollow } from 'qsdk/relation/db/Model';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
// import { ApplyStatus } from 'qsdk/relation/define';
import { log } from 'cc';
import { AcceptMutualFollowReq, ApplyStatus, IAcceptMutualFollowReq, IRejectMutualFollowReq, RejectMutualFollowReq } from 'idl/mpff/social/relation.v1';
import { Feed } from 'qsdk/feed/Feed';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { App } from 'app/App';

@ccclass('ApplyListCellCtr')
export class ApplyListCellCtr extends XComponent {
    @property(Label)
    nameLabel: Label = null;

    @property(Label)
    descLabel: Label = null;

    @property(Node)
    statusLabel: Node = null

    @property(Node)
    statusView: Node = null

    @property(Avatar)
    avatarView: Avatar = null

    applyInfo: ApplyMutualFollow = null

    start() {

    }

    update(deltaTime: number) {

    }

    updateView(applyInfo: ApplyMutualFollow) {
        this.applyInfo = applyInfo
        this.refreshView()
    }

    refreshView() {
        let applyInfo = this.applyInfo
        log("updateView", applyInfo)
        let userID = applyInfo.fromUid

        this.avatarView.setUserID(userID)


        let desc: string = applyInfo.desc
        if (applyInfo.fromUid === Feed.getInstance().getUID()) {
            userID = applyInfo.toUid
            desc = "我：" + applyInfo.desc
        }
        this.descLabel.string = desc

        App.userMgr.getUserByID(userID).finish().then((user) => {
            this.nameLabel.string = user.nickname
        })

        let status = applyInfo.status;
        if (status !== ApplyStatus.ApplyStatusWaiting) {
            this.statusLabel.active = true;
            this.statusView.active = false;

            if (status === ApplyStatus.ApplyStatusAccept) {
                this.statusLabel.getComponent(Label).string = "已通过";
            } else if (status === ApplyStatus.ApplyStatusReject) {
                this.statusLabel.getComponent(Label).string = "已拒绝";
            } else if (status === ApplyStatus.ApplyStatusTimeOut) {
                this.statusLabel.getComponent(Label).string = "已过期";
            }
        } else {
            if (applyInfo.fromUid === Feed.getInstance().getUID()) {
                // 自己发出的
                this.statusLabel.active = true;
                this.statusView.active = false;
                this.statusLabel.getComponent(Label).string = "等待验证";
            } else {
                this.statusLabel.active = false;
                this.statusView.active = true;
            }
        }
    }

    // 同意申请
    onClickAccept() {
        let req: IAcceptMutualFollowReq = {
            applyID: this.applyInfo.applyID
        }
        StrongRelation.getInstance().accept(req)
            .then(({ err, resp }) => {
                if (!err) {
                    this.applyInfo.status = ApplyStatus.ApplyStatusAccept
                    this.refreshView()
                }
            })
    }

    onClickReject() {
        let req: IRejectMutualFollowReq = {
            applyID: this.applyInfo.applyID
        }
        StrongRelation.getInstance().reject(req)
            .then(({ err, resp }) => {
                this.applyInfo.status = ApplyStatus.ApplyStatusReject
                this.refreshView()
            })
    }

}