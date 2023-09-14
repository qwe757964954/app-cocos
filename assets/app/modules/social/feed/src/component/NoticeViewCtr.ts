import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SimpleTableViewEx } from 'app/modules/social/common/src/component/SimpleTableViewEx';
import { Feed } from 'qsdk/feed/Feed';
import { uiMgr } from 'bos/exports';

@ccclass('NoticeViewCtr')
export class NoticeViewCtr extends XComponent {
    @property(SimpleTableViewEx)
    tableView = null;

    start() {

    }

    setup(params) {
        let count = params?.count || 1
        console.log("NoticeViewCtr:count", count)
        let req = {
            count: count
        }
        Feed.getInstance().listNotices(req).then((noticeList) => {
            this.tableView.setData(noticeList)
        })
    }

    onClickClear() {

    }

    onClickClose() {
        uiMgr.popPage()
    }

}