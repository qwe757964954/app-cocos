import * as orm from "bos/framework/orm/exports";
import { Feed } from "../Feed";
import { Relation } from "qsdk/relation/Relation";
import { StrongRelation } from "qsdk/relation/StrongRelation";
import { StringUtil } from "bos/exports";
import { ISubmitCommentReq, IDeleteCommentReq, ILikePostReq, ICancelLikePostReq } from "idl/mpff/social/feed.v1";
import { Resource } from "idl/base/base";
import { FeedEvent } from "../define";
import { log } from "cc";

/**
DROP TABLE IF EXISTS `Post`
DROP TABLE IF EXISTS `KVTable`
DROP TABLE IF EXISTS `Comment`
 */


@orm.Table({ name: "Post" })
export class PostTable extends orm.IEntity {
    //帖子id
    @orm.FieldNumber({ unique: true })
    postID

    //用户ID
    @orm.FieldNumber()
    userID

    @orm.FieldJson()
    resources

    //状态
    @orm.FieldNumber()
    status

    //创建时间
    @orm.FieldNumber()
    createdAt

    //内容
    @orm.FieldString()
    content

    // @uid 列表
    @orm.FieldJson()
    atUserIDs

    //地理位置信息
    @orm.FieldJson()
    location

    @orm.FieldString()
    extra

    //自动删除时间 update2023年4月13日
    @orm.FieldNumber()
    deletedAt

}


@orm.Table({ name: "Comment" })
//评论id
export class CommentTable extends orm.IEntity {
    @orm.FieldNumber({ unique: true })
    commentID

    //帖子
    @orm.FieldNumber()
    postID

    //用户ID
    @orm.FieldNumber()
    userID

    //状态
    @orm.FieldNumber()
    status

    //创建时间
    @orm.FieldNumber()
    createdAt

    //内容
    @orm.FieldString()
    content

    @orm.FieldJson()
    atUserIDs

    @orm.FieldString()
    extra

    @orm.FieldNumber()
    toCommentID
}


@orm.Table({ name: "KVTable" })
export class KVTable extends orm.Entity {
    @orm.FieldString({ primary: true })
    key: string

    @orm.FieldString()
    value: string
}


// export interface Resource {
//     url: string
//     resourceType: number
//     extra: string
// }

export class FeedEntity {
    // 帖子
    post: PostTable = new PostTable();
    // 评论列表
    private commentList: CommentTable[];
    // 
    private commentMap: Map<number, CommentTable>
    // 点赞ID列表
    private likeUserIDList: number[];

    private isLike: boolean = false

    // private resources

    constructor(post?: PostTable, commentList?: CommentTable[], likeUserIDList?: number[]) {
        this.post = post || new PostTable();
        this.setCommentList(commentList || [])
        this.setLikeUserIDList(likeUserIDList || [])
        this.isLike = false
    }

    isMyPost() {
        return this.getUserID() === Feed.getInstance().getUID()
    }

    getUserID() {
        return this.post.userID
    }

    getPostID() {
        return this.post.postID
    }

    getPost() {
        return this.post
    }

    getCommentList() {
        return this.commentList
    }

    // 获取单条
    getCommentByCommentID(commentID: number) {
        return this.commentMap[commentID]
    }

    getCommentByIndex(index: number) {
        if (index < this.commentList.length) {
            return this.commentList[index]
        }
        return null
    }

    setPost(post: PostTable) {
        this.post = post
        this.processResources()
    }

    processResources() {
        let resources = this.post.resources || []
        let newResources = []
        if (resources?.length > 0) {
            for (let index = 0; index < resources.length; index++) {
                let resource = resources[index]
                let extra = resource.extra
                if (typeof (extra) === "string" && extra != "") {
                    resource.extra = JSON.parse(extra)
                    newResources.push(resource)
                }
            }
        }

        this.post.resources = newResources
    }

    getIsLike() {
        for (let index = 0; index < this.likeUserIDList.length; index++) {
            if (this.likeUserIDList[index] === Feed.getInstance().getUID()) { // 如果是自己
                return true
            }
        }
        return false
    }

    getResources() {
        return this.post?.resources
    }

    setCommentList(commentList: CommentTable[]) {
        this.commentList = commentList

        this.commentMap = new Map()
        for (let index = 0; index < this.commentList.length; index++) {
            let comment = this.commentList[index]
            this.commentMap.set(comment.commentID, comment)
        }

    }

    getLikeUserIDList() {
        return this.likeUserIDList
    }

    async setLikeUserIDList(likeUserIDList: number[]) {
        let list: number[] = []
        for (let index = 0; index < likeUserIDList.length; index++) {
            if (likeUserIDList[index] === Feed.getInstance().getUID()) { // 如果是自己
                list.push(likeUserIDList[index]); // 直接加查询的内容id列表
                likeUserIDList.splice(index, 1);
                this.isLike = true
                break;
            }
        }
        if (likeUserIDList.length > 0) {
            let ret = await StrongRelation.getInstance().batchQuery(likeUserIDList)
            for (const relation of ret ?? []) {
                if (relation && relation.isFriend()) { // 如果是我关注的好友,才有权限看
                    list.push(relation.userID);
                }
            }
        }
        this.likeUserIDList = list
    }

    addComment(comment: CommentTable) {
        this.commentList.push(comment)
        this.commentMap.set(comment.commentID, comment)
    }

    // 发表评论
    async submitComment(content: string, toCommentID?: number) {
        let req: ISubmitCommentReq = {
            postID: this.getPostID(),
            content: content,
            toCommentID: toCommentID,
            atUserIDs: []
        }
        let { err, resp } = await Feed.getInstance().submitComment(req)
        if (!err) {
            let comment = new CommentTable()
            comment.postID = req.postID
            comment.userID = Feed.getInstance().getUID();
            comment.commentID = resp.commentID;
            comment.createdAt = Date.now();
            comment.atUserIDs = req.atUserIDs || [];
            comment.extra = req.extra || "";
            comment.content = content
            this.addComment(comment)
            Feed.getInstance().saveFollowFeedsToLocalCache()
        }

        return { err, resp }
    }

    // 删除评论
    async deleteComment(commentID: number) {
        let req: IDeleteCommentReq = {
            commentID: commentID,
        }
        let { err, resp } = await Feed.getInstance().deleteComment(req)
        if (!err) {
            for (let index = 0; index < this.commentList.length; index++) {
                const comment = this.commentList[index];
                if (comment.commentID === commentID) {
                    this.commentList.splice(index, 1)
                    this.commentMap.delete(commentID)
                    Feed.getInstance().saveFollowFeedsToLocalCache()
                    Feed.getInstance().emit(FeedEvent.ON_NOTIFY_DELETE_COMMENT, this.getPostID())
                    break
                }
            }
        }
        return { err, resp }
    }

    // 
    async likePost() {
        let req: ILikePostReq = {
            postID: this.getPostID(),
        }
        let { err, resp } = await Feed.getInstance().likePost(req)
        if (!err) {
            this.likeUserIDList.push(Feed.getInstance().getUID())
            this.isLike = true
            Feed.getInstance().saveFollowFeedsToLocalCache()

        }
        return { err, resp }
    }

    async cancelLikePost() {
        let req: ICancelLikePostReq = {
            postID: this.getPostID(),
        }
        let { err, resp } = await Feed.getInstance().cancelLikePost(req)
        if (!err) {
            for (let index = 0; index < this.likeUserIDList.length; index++) {
                let userID = this.likeUserIDList[index]
                if (userID === Feed.getInstance().getUID()) {
                    this.likeUserIDList.splice(index, 1)
                    this.isLike = false
                    Feed.getInstance().saveFollowFeedsToLocalCache()
                    break
                }

            }
        }
        return { err, resp }
    }

}   
