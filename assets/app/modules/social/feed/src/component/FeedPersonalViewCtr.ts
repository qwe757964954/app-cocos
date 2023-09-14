import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { FeedPersonalTableView } from './FeedPersonalTableView';
import { uiMgr } from 'bos/exports';
import { Label } from 'cc';
import { App } from 'app/App';

@ccclass('FeedPersonalViewCtr')
export class FeedPersonalViewCtr extends XComponent {

    @property(Label)
    titleLabel: Label = null

    @property(FeedPersonalTableView)
    tableView: FeedPersonalTableView = null

    private userID: number = 0;

    setup(params: { userID: number }) {
        console.log("FeedPersonalViewCtr setup", params)
        this.userID = params.userID
    }

    protected start(): void {
        console.log("FeedPersonalViewCtr start")

        if (this.userID != 0) {
            this.updateView(this.userID)
        }
        if (this.userID != App.userMgr.loginUid) {
            App.userMgr.getUserByID(this.userID).finish().then((user) => {
                this.titleLabel.string = user.nickname
            })
        } else {
            this.titleLabel.string = "我的"
        }


    }

    updateView(userID: number) {
        if (this.tableView && userID) {
            this.tableView.loadData(userID)
        }
    }

    onClickClose() {
        uiMgr.popPage()
    }
}