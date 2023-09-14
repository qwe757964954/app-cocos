import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Feed } from 'qsdk/feed/Feed';
import { IListUnreadNoticesReq } from 'idl/mpff/social/feed.v1';
import { FeedEvent } from 'qsdk/feed/define';
import { Decorator, eventSystem } from 'bos/exports';
import { SocialFeedEvent } from 'app/modules/social/common/src/Define';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';

const noticeDesc = "%d条消息"

@ccclass('Notices')
export class Notices extends XComponent {
    @property(Avatar)
    avatar: Avatar = null;

    @property(Label)
    noticeLabel: Label = null;

    private notices;

    start(): void {
        Feed.getInstance().on(FeedEvent.ON_NOTIFY_NEW_NOTICE, this.onNotifyNewNotice, this)
        this.node.active = false
        this.listUnreadNotices()
    }

    onNotifyNewNotice(): void {
        this.listUnreadNotices();
    }

    listUnreadNotices(): void {
        let req: IListUnreadNoticesReq = {}
        Feed.getInstance().listUnreadNotices(req).then(({ err, resp }) => {
            if (!err) {
                console.log("listUnreadNotices callback", resp)
                this.updateNotice(resp.notices);
            } else {
                this.updateNotice([]);
            }
        })

    }

    updateNotice(notices: any[]): void {
        this.notices = notices
        this.node.active = notices.length > 0 ? true : false
        // this.node.active = true
        if (notices.length > 0) {
            this.noticeLabel.string = `${notices.length}条消息`;
            const noticeData = notices[0];
            this.avatar.setUserID(noticeData.fromUserID)
        }

    }


    // @Decorator.FunctionIntervalDelay(1000)
    onClickNotices() {
        console.log("onClickNotices", this.notices)
        eventSystem.emit(SocialFeedEvent.ON_SHOW_NOTICE_VIEW, { count: this.notices?.length || 1 })
        this.updateNotice([]);
    }


}