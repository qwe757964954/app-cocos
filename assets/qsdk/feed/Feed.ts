import { error, log } from "cc";
import { DB } from "./db/DB";
import { PostTable, CommentTable, KVTable, FeedEntity } from "./db/Model";

import { EmptyClass, EventTargetExtends, ImageUtil, Log, Net, StringUtil } from "bos/exports";
import { StrongRelation } from "qsdk/relation/StrongRelation";
import { ISubmitPostReq, BatchSetForbidVisitUsersReq, BatchSetRejectFeedOfUsersReq, CancelLikePostReq, ClearAllNoticesOfUserReq, DeleteCommentReq, FeedService, GetUserFeedConfigReq, LikePostReq, ListSimpleFollowTimelineReq, ListSimpleNoticesReq, ListSimplePersonalTimelineReq, Notice, SimpleComment, SimpleFeed, SubmitCommentReq, SubmitPostReq, ISimpleFeed, ISimpleComment, ISubmitCommentReq, IDeleteCommentReq, IBatchSetForbidVisitUsersReq, IBatchSetRejectFeedOfUsersReq, IClearAllNoticesOfUserReq, IGetUserFeedConfigReq, IDeletePostReq, ICancelLikePostReq, ILikePostReq, IListSimpleFollowTimelineReq, IListSimpleNoticesReq, IBatchGetPostsReq, IBatchGetCommentsReq, Resource, IResource, IListUnreadNoticesReq, IListNoticesReq, IListSimplePersonalTimelineReq } from "idl/mpff/social/feed.v1";
import { FeedEvent } from "./define";
import { OSS } from "qsdk/storage/OSS";
import { GalleryImage } from "platform/GalleryX";

const ProjectConfig = {
    appid: 1
}


export interface SyncConfig {
    clientLatestNoticeID: number
}

export interface NoticeAndPostComment extends Notice {
    post: PostTable,
    comment: CommentTable,
}

export interface ISubmitImagePostReq {
    content?: string,
    files: GalleryImage[],
}


export class Feed extends EventTargetExtends(EmptyClass) {

    private readonly kFollowFeedCache: string = "FeedFollowCache";
    private readonly KSyncConfigCache: string = "FeedSyncConfig";

    private db: DB = null;
    private uid: number;

    private feedEntityMap: Map<number, FeedEntity>;

    //只用与存储到db的cache
    private followFeedCacheTable: KVTable;
    private followFeeds: FeedEntity[] = [];

    private syncConfigTable: KVTable;
    private syncConfig: SyncConfig;

    private noticeList: NoticeAndPostComment[] = []

    constructor() {
        super()

        FeedService.on("NotifyNewFeed", (resp: any) => {
            console.log("Feed:NotifyNewFeed")
            this.emit(FeedEvent.ON_NOTIFY_NEW_FEED, resp)
        })

        FeedService.on("NotifyNewNotice", (resp: any) => {
            console.log("Feed:NotifyNewNotice")
            this.emit(FeedEvent.ON_NOTIFY_NEW_NOTICE, resp)
        })
    }

    private static instance: Feed = null
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new (Feed)
        }
        return this.instance
    }


    async init(userID: number) {
        this.initDB(userID)

        this.feedEntityMap = new Map<number, FeedEntity>();
        this.followFeeds = []

        this.syncConfig = {
            clientLatestNoticeID: 0
        }

        this.uid = userID

        await this.loadFollowFeedsFromLocalCache()
        await this.loadSyncConfigFromLocalCache()
        // await this.listFollowTimeline({ count: 10 })
    }

    public getUID() {
        return this.uid
    }

    initDB(userID: number) {
        if (!this.db) {
            this.db = new (DB)
            this.db.init(userID)
        }
    }

    getFeedEntity(postID: number) {
        return this.feedEntityMap.get(postID)
    }

    async loadFollowFeedsFromLocalCache() {
        this.followFeedCacheTable = await this.db.getKV(this.kFollowFeedCache);
        this.followFeeds = new Array<FeedEntity>()
        if (this.followFeedCacheTable) {
            let tempList = JSON.parse(this.followFeedCacheTable.value)
            for (let index = 0; index < tempList.length; index++) {
                let temp = tempList[index]

                let feedEntity = new FeedEntity()

                feedEntity.setPost(temp.post)
                feedEntity.setCommentList(temp.commentList)
                feedEntity.setLikeUserIDList(temp.likeUserIDList)

                this.followFeeds.push(feedEntity)
                this.feedEntityMap.set(feedEntity.getPostID(), feedEntity)
            }
        }
        log("loadFollowFeedsFromLocalCache--->", this.followFeeds.length)
    }

    saveFollowFeedsToLocalCache(): void {

        let serializedFeeds = this.followFeeds.slice(0, 20)
        for (let index = 0; index < serializedFeeds.length; index++) {
            let feeds = serializedFeeds[index]
            let resources = feeds.post?.resources
            if (resources) {
                let _resources = []
                for (let index = 0; index < resources.length; index++) {
                    let resource = resources[index];

                    let _resource = {
                        extra: JSON.stringify(resource.extra),
                        url: resource.url,
                        resourceType: resource.resourceType,
                    }
                    _resources.push(_resource)
                }
                // console.log("_resources", _resources)
                feeds.post.resources = _resources
            }
        }

        if (this.followFeedCacheTable) {
            // console.log("stringify111:", serializedFeeds)

            this.followFeedCacheTable.value = JSON.stringify(serializedFeeds)
            // console.log("stringify222:", this.followFeedCacheTable.value)
            this.db.setKV(this.followFeedCacheTable)
        } else {
            this.followFeedCacheTable = new KVTable()
            this.followFeedCacheTable.key = this.kFollowFeedCache
            this.followFeedCacheTable.value = JSON.stringify(serializedFeeds)
            this.db.setKV(this.followFeedCacheTable, true)
        }

    }

    async loadSyncConfigFromLocalCache() {
        const config = await this.db.getKV(this.KSyncConfigCache);
        if (config) {
            this.syncConfigTable = config;
            this.syncConfig = JSON.parse(config.value) as SyncConfig
        }
    }

    saveSyncConfigToLocalCache() {
        if (this.syncConfigTable) {
            this.syncConfigTable.value = JSON.stringify(this.syncConfigTable)
            this.db.setKV(this.syncConfigTable)
        } else {
            this.syncConfigTable = new KVTable()
            this.syncConfigTable.key = this.KSyncConfigCache
            this.syncConfigTable.value = JSON.stringify(this.syncConfigTable)
            this.db.setKV(this.syncConfigTable, true)
        }
    }

    hasFollowPost(postID: number): [boolean, number | undefined] {
        for (let i = 0; i < this.followFeeds.length; i++) {
            const feed = this.followFeeds[i];
            if (feed.getPostID() === postID) {
                return [true, i];
            }
        }
        return [false, undefined];
    }


    async submitPost(req: ISubmitPostReq) {
        let { err, resp } = await FeedService.SubmitPost(req)
        if (!err) {
            let post = new PostTable()
            post.postID = resp.postID;
            post.createdAt = Date.now()
            post.userID = this.uid;

            post.deletedAt = 0;
            post.atUserIDs = req.atUserIDs
            post.content = req.content
            post.extra = req.extra

            post.resources = req.resources

            let feedEntity = new FeedEntity(post)

            if (post.resources) {
                for (let resource of post.resources) {
                    if (resource.extra) {
                        let extra = StringUtil.byteBufferToUTF8String(resource.extra)
                        resource.extra = JSON.parse(extra);
                        console.log("submitPost.resource", resource)
                    }
                }
            }

            if (this.followFeeds) {
                const [hasPost, index] = this.hasFollowPost(post.postID);
                if (!hasPost) {
                    this.followFeeds.unshift(feedEntity);
                }
                this.saveFollowFeedsToLocalCache();
            }

            this.feedEntityMap.set(feedEntity.getPostID(), feedEntity)
        }
        log("Feed:submitPost---", this.followFeeds)
        return { err, resp }
    }

    async submitImagePost(req: ISubmitImagePostReq) {
        let files = req.files
        let resources = []
        for (let index = 0; index < files.length; index++) {
            const file = files[index];

            let ab = await file.arrayBuffer()
            let imageSize = await file.getImageSize()

            let opt_info = {
                width: imageSize.width,
                height: imageSize.height,
                type: 1,
            }

            let ret = await OSS.getInstance().uploadFile(ab, { prefix: "feed_" })
            if (ret.err) {
                return { err: -1 }
            }
            let info = { size: file.fileSize, suffix: "." + file.name.split(".").pop(), name: file.name }
            if (opt_info) {
                for (let key in opt_info) {
                    let value = opt_info[key]
                    if (value != null && value != undefined) {
                        info[key] = value
                    }
                }
            }

            let extra = StringUtil.stringToUint8Array(JSON.stringify({ info: info }))

            let resource: IResource = {
                url: ret.url,
                resourceType: 1,
                extra: extra
            }
            resources.push(resource)
        }

        let submitPostReq: ISubmitPostReq = {
            content: req.content,
            resources: resources,
        }
        console.log("submitPost", submitPostReq)
        return this.submitPost(submitPostReq)
    }


    getFollowPostCache() {
        return this.followFeeds
    }

    async listFollowTimeline(req?) {
        let clientLatestPostID: number;

        if (this.followFeeds.length > 0) {
            clientLatestPostID = this.getClientLatestPostID();
        }

        if (req?.count > 0) {
            req.clientLatestPostID = clientLatestPostID;
            return await this.listSimpleFollowTimeline(req);
        } else {
            const newReq: IListSimpleFollowTimelineReq = {
                count: req?.count,
                basePostID: this.followFeeds[this.followFeeds.length - 1]?.getPostID(),
                clientLatestPostID: clientLatestPostID,
            };

            return await this.listSimpleFollowTimeline(newReq);
        }
    }

    //import { WeakRelation } from './relation';

    async processCommentWithPermission(allCommentList) {
        let commentIDList: number[] = [];

        for (const value of allCommentList || []) {
            commentIDList.push(value.commentID);

            if (value.userID === this.getUID()) {
            } else {
                let relation = await StrongRelation.getInstance().query(value.userID)

                if (relation && relation.isFriend()) {
                    commentIDList.push(value.commentID);
                }
            }

        }
        return commentIDList;
    }


    //
    async processTimeline(simpleFeedList: ISimpleFeed[]): Promise<FeedEntity[]> {
        // 服务器过来的数据先分开处理
        let postIDList: number[] = [];
        let simpleFeedMap: Map<number, ISimpleFeed> = new Map()
        for (const simpleFeed of simpleFeedList) {
            const post = simpleFeed.post
            simpleFeedMap.set(post.postID, simpleFeed)
            postIDList.push(post.postID);
        }
        console.log("processTimeline.postIDList", postIDList)

        // 本地与服务器组合查询帖子数据
        let localPostList = await this.queryPostsSync(postIDList);
        console.log("processTimeline.localPostList", localPostList)


        let feedEntityList: FeedEntity[] = []
        // 遍历帖子，构造feed数据结构
        for (const v of localPostList) {
            let simpleFeed: ISimpleFeed = simpleFeedMap.get(v.postID)

            let feedEntity = new FeedEntity()
            feedEntity.setPost(v)

            // 处理点赞
            let interactive = simpleFeed.interactive
            let likeUserIDList = interactive.likeUserIDs as number[]
            feedEntity.setLikeUserIDList(likeUserIDList)
            //feedEntity.setPre(simpleFeed.permission)
            feedEntityList.push(feedEntity)
        }


        // 获取到所有的评论id，然后查询本地是否有相关评论
        const allCommentList: ISimpleComment[] = [];
        for (const feed of simpleFeedList) {
            const commentList = feed.interactive.comments; // 互动信息里的帖子信息
            if (commentList) {
                for (const comment of commentList) {
                    allCommentList.push(comment);
                }
            }
        }

        let commentIDList = await this.processCommentWithPermission(allCommentList);
        //console.log("commentIDList", commentIDList)

        // 本地与服务器组合查询评论数据
        let localCommentList = await this.queryCommentsSync(commentIDList);

        // 构造索引表
        let commentsMap: Map<number, CommentTable> = new Map();
        for (const comment of localCommentList) {
            commentsMap.set(comment.commentID, comment)
        }

        // 关联到帖子上
        for (let feedEntity of feedEntityList) {
            let postID = feedEntity.getPostID()

            let simpleFeed = simpleFeedMap.get(postID)

            const comments = simpleFeed?.interactive?.comments; // 互动信息里的帖子信息

            if (comments) {
                let tempCommentList: CommentTable[] = []
                for (const comment of comments) {
                    tempCommentList.push(commentsMap.get(comment.commentID));
                }
                feedEntity.setCommentList(tempCommentList)
            }

            this.feedEntityMap.set(feedEntity.getPostID(), feedEntity)
        }
        console.log("processTimeline.feedEntityList", feedEntityList)

        return feedEntityList
    }

    async listSimpleFollowTimeline(req: IListSimpleFollowTimelineReq) {
        let { err, resp } = await FeedService.ListSimpleFollowTimeline(req)
        Log.w("ListSimpleFollowTimeline", { err, resp })
        if (!err) {
            let feeds = resp.feeds
            let feedEntityList = await this.processTimeline(feeds)
            if (feedEntityList.length > 0) {
                if (req.count > 0) {
                    this.followFeeds = feedEntityList;
                    this.saveFollowFeedsToLocalCache();
                } else {
                    for (const v of feedEntityList) {
                        this.followFeeds.push(v);
                    }
                }
            }
            return feedEntityList
        }
    }

    async listSimplePersonalTimeline(req: IListSimplePersonalTimelineReq) {
        req.postCommentCount = req.postCommentCount || 20;
        let { err, resp } = await FeedService.ListSimplePersonalTimeline(req)
        if (!err) {
            let feedEntityList = await this.processTimeline(resp.feeds)
            return feedEntityList
        }
    }


    async batchGetPosts(req: IBatchGetPostsReq) {
        return await FeedService.BatchGetPosts(req);
    }

    async batchGetComments(req: IBatchGetCommentsReq) {
        return await FeedService.BatchGetComments(req);
    }

    getClientLatestPostID(): number | undefined {
        for (let i = 0; i < this.followFeeds.length; i++) {
            const feed = this.followFeeds[i];
            if (!feed.isMyPost()) {
                return feed.getPostID();
            }
        }
    }

    async getFeed(req, target) {
        return FeedService.GetFeed(req, target)
    }


    async deletePost(req: IDeletePostReq) {
        let { err, resp } = await FeedService.DeletePost(req)
        if (!err) {
            const [hasPost, index] = this.hasFollowPost(req.postID);
            if (hasPost && index !== undefined) {
                this.followFeeds.splice(index, 1);
                if (index <= 20) {
                    this.saveFollowFeedsToLocalCache();
                }
            }
            this.feedEntityMap.delete[req.postID];
            this.emit(FeedEvent.ON_NOTIFY_DELETE_POST, req.postID)
        }
        return { err, resp }
    }


    async likePost(req: ILikePostReq) {
        let { err, resp } = await FeedService.LikePost(req)
        return { err, resp }
    }

    async cancelLikePost(req: ICancelLikePostReq) {
        let { err, resp } = await FeedService.CancelLikePost(req)
        return { err, resp }
    }


    async queryPostsSync(postIDs: number[]) {
        Log.w("queryPostsSync")
        let { localPostList, notInDBPostIDList } = await this.db.getPosts(postIDs)
        if (notInDBPostIDList.length > 0) {
            let req: IBatchGetPostsReq = {
                postIDs: notInDBPostIDList
            }
            let { err, resp } = await this.batchGetPosts(req)
            Log.w("batchGetPosts", err, resp)
            if (!err) {
                let tempList: PostTable[] = []
                for (let index = 0; index < resp.posts.length; index++) {
                    let serverPost = resp.posts[index];
                    let localPost = new PostTable()
                    // localPost.postID = serverPost.postID
                    // localPost.userID = serverPost.userID
                    // localPost.content = serverPost.content
                    // localPost.atUserIDs = serverPost.atUserIDs
                    // localPost.location = serverPost.location
                    // localPost.extra = serverPost.extra
                    // localPost.createdAt = serverPost.createdAt
                    // localPost.deletedAt = serverPost.deletedAt


                    let key: (keyof PostTable);
                    for (key in localPost) {
                        localPost[key] = serverPost[key]
                        if (key == "resources") {

                            let resources = serverPost[key]
                            let localResources = localPost[key]

                            for (let index = 0; index < resources.length; index++) {
                                let resource = resources[index]
                                let localResource = localResources[index]
                                let extra = StringUtil.byteBufferToUTF8String(resource.extra)
                                localResource.extra = JSON.parse(extra)
                            }
                        }
                    }
                    tempList.push(localPost)
                    localPostList.push(localPost)
                }
                //入库
                this.db.savePosts(tempList);
            }
        }
        localPostList.sort((a, b) => a.postID > b.postID ? -1 : 1);

        return localPostList
    }


    async queryCommentsSync(commentIDs: number[]) {
        // 查询本地数据
        let { localCommentList, notInDBCommentIDList } = await this.db.getComments(commentIDs)

        // 如果有评论id不在数据库里，则请求远端，同步数据
        if (notInDBCommentIDList.length > 0) {
            // 调用远端接口，查询不再db里面的帖子数据
            const { err, resp } = await this.batchGetComments({ commentIDs: notInDBCommentIDList })
            if (!err) {
                let tempList: CommentTable[] = []
                for (let index = 0; index < resp.comments.length; index++) {
                    let v = resp.comments[index];
                    let obj = new CommentTable()
                    let key: (keyof CommentTable);
                    for (key in obj) {
                        obj[key] = v[key]
                    }
                    tempList.push(obj)
                }
                this.db.saveComments(tempList); // 把远端数据落地
                for (const v of tempList) {
                    localCommentList.push(v);
                }
            }
        }
        return localCommentList
    }
    getNoticeList() {
        return this.noticeList
    }

    async listNotices(req) {
        const newReq: IListSimpleNoticesReq = {
            count: req.count || 20
        };
        console.log("listNotice:req", newReq)

        if (newReq.count < 0) {
            const notice = this.noticeList[this.noticeList.length - 1];
            newReq.baseNoticeID = notice?.noticeID || 0;
        }

        newReq.clientLatestNoticeID = this.syncConfig.clientLatestNoticeID;

        let list = await this.listSimpleNotices(newReq)
        if (list.length > 0) {
            if (newReq.count < 0) {
                for (const v of list) {
                    this.noticeList.push(v);
                }
            } else {
                this.noticeList = list;
            }
        }

        return this.noticeList
    }

    async listSimpleNotices(req) {
        let { err, resp } = await FeedService.ListSimpleNotices(req)
        let noticeAndPostCommentList: NoticeAndPostComment[] = []
        if (!err) {
            let noticeList = resp.notices
            if (noticeList.length > 0 && req.count > 0) {
                this.syncConfig.clientLatestNoticeID = noticeList[0].noticeID;
                this.saveSyncConfigToLocalCache();
            }

            let postIDs = [];

            for (const key in resp.postStatusMap) {
                const value = resp.postStatusMap[key];
                if (value == 1) {
                    postIDs.push(Number(key));
                }
            }

            // 查询db里面的帖子数据
            let localPostList = await this.queryPostsSync(postIDs);

            let postsMap: Map<number, PostTable> = new Map();
            for (let i = 0; i < localPostList.length; i++) {
                let post = localPostList[i]
                postsMap.set(post.postID, post)
            }

            let commentIDs = [];
            for (const key in resp.commentStatusMap) {
                const value = resp.commentStatusMap[key];
                if (value == 1) {
                    postIDs.push(Number(key));
                }
            }

            // 本地与服务器组合查询评论数据
            let localCommentList = await this.queryCommentsSync(commentIDs);

            let commentsMap: Map<number, CommentTable> = new Map();
            for (const comment of localCommentList) {
                commentsMap.set(comment.commentID, comment)
            }
            for (let i = 0; i < resp.notices.length; i++) {
                let v = resp.notices[i] as NoticeAndPostComment;
                v.post = postsMap.get(v.postID)
                v.comment = commentsMap.get(v.commentID)
                noticeAndPostCommentList.push(v)
            }
        }
        return noticeAndPostCommentList
    }


    async submitComment(req: ISubmitCommentReq) {
        return await FeedService.SubmitComment(req)

    }

    async deleteComment(req: IDeleteCommentReq) {
        return await FeedService.DeleteComment(req)
    }


    async clearAllNoticesOfUser(req: IClearAllNoticesOfUserReq) {
        return await FeedService.ClearAllNoticesOfUser(req)
    }


    async getUserFeedConfig(req: IGetUserFeedConfigReq) {
        return await FeedService.GetUserFeedConfig(req)
    }

    async batchSetForbidVisitUsers(req: IBatchSetForbidVisitUsersReq) {
        return await FeedService.BatchSetForbidVisitUsers(req)
    }

    async batchSetRejectFeedOfUsers(req: IBatchSetRejectFeedOfUsersReq) {
        return await FeedService.BatchSetRejectFeedOfUsers(req)
    }


    async listUnreadNotices(req: IListUnreadNoticesReq) {
        return await FeedService.ListUnreadNotices(req)
    }


}