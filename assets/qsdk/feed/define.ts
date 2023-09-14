export enum FeedEvent {
    // 朋友圈改变
    ON_NOTIFY_UPDATE_FEED = "ON_NOTIFY_UPDATE_FEED",
    // 删除帖子
    ON_NOTIFY_DELETE_POST = "ON_NOTIFY_DELETE_POST",
    // 删除评论
    ON_NOTIFY_DELETE_COMMENT = "ON_NOTIFY_DELETE_COMMENT",
    // 新的消息变化
    ON_NOTIFY_NEW_NOTICE = "ON_NOTIFY_NEW_NOTICE",
    // 新的朋友圈通知
    ON_NOTIFY_NEW_FEED = "ON_NOTIFY_NEW_FEED",
}