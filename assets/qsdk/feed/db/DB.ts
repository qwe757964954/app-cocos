import * as orm from "bos/framework/orm/exports";
import { PostTable, CommentTable, KVTable } from "./Model";
import { Log } from "bos/exports";

export type TPost = orm.TableConnection<PostTable>
export type TComment = orm.TableConnection<CommentTable>
export type TKVTable = orm.TableConnection<KVTable>

const Version: string = "1.0"

export class DB {
    private db: orm.DB

    public PostTable: TPost;
    public CommentTable: TComment;
    public KVTable: TKVTable;

    constructor() {

    }

    public init(userID: number) {
        this.db = new orm.DB(userID.toString() + "_Feed_" + Version)

        // this.db.dropTable(PostTable)
        // this.db.dropTable(CommentTable)
        // this.db.dropTable(KVTable)

        this.db.register(PostTable)
        this.db.register(CommentTable)
        this.db.register(KVTable)

        this.PostTable = this.db.table(PostTable)
        this.CommentTable = this.db.table(CommentTable)
        this.KVTable = this.db.table(KVTable)
    }

    async test() {
        // let u = new PostTable()
        // u.userID = 123
        // this.tRelation.insert(u).then(r => {
        //     Log.i(r)
        // })
    }

    async getKV(key: string): Promise<KVTable | null> {
        let kv = await this.KVTable.select().where(orm.where.and({ key: key })).first()
        if (kv && kv.result) {
            return kv.result
        }
        return null
    }

    setKV(kv: | KVTable, isInsert: boolean = false) {
        if (isInsert == true) {
            this.KVTable.insert(kv).then(r => {
                Log.w("insert kv", r)
            })
        } else {
            this.KVTable.update(kv).then(r => {
                Log.w("update kv", r)
            })
        }
    }


    async getPosts(postIDList: number[]) {
        let ret = await this.PostTable.select().where(orm.where.and({ postID__in: postIDList })).all()
        const postMap: Map<number, PostTable> = new Map()
        const localPostList: PostTable[] = [];
        const notInDBPostIDList: number[] = [];

        if (ret.success) {

            for (let i = 0; i < ret.list.length; i++) {
                const v = ret.list[i];
                postMap.set(v.postID as number, v)
                localPostList.push(v);
                // if (!v.deletedAt) {
                //     v.deletedAt = 0;
                // }
                // if (v.deletedAt === 0 || Date.now() < v.deletedAt) {
                // }
            }

            for (let i = 0; i < postIDList.length; i++) {
                let postID = postIDList[i];
                if (!postMap.get(postID)) {
                    notInDBPostIDList.push(postID);
                }
            }
            console.log("Feed:getPost", localPostList, notInDBPostIDList)
        }
        return { localPostList, notInDBPostIDList }
    }

    async getComments(commentIDList: number[]) {
        let ret = await this.CommentTable.select().where(orm.where.and({ commentID__in: commentIDList })).all()
        if (ret.success) {
            let localCommentList = ret.list
            const commentMap: Map<number, CommentTable> = new Map();
            for (let i = 0; i < localCommentList.length; i++) {
                const v = localCommentList[i];
                commentMap.set(v.commentID, v)
            }
            const notInDBCommentIDList: number[] = [];
            for (let i = 0; i < commentIDList.length; i++) {
                let commentID = commentIDList[i];
                if (!commentMap.get(commentID)) {
                    notInDBCommentIDList.push(commentID);
                }
            }
            return { localCommentList, notInDBCommentIDList }
        }
    }

    savePosts(postList: PostTable[]): void {
        let _postList = postList.slice()
        for (let i = 0; i < _postList.length; i++) {
            let post = _postList[i];

            let resources = post.resources
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
            post.resources = _resources

            this.PostTable.insert(post)
        }
    }

    saveComments(commentList: CommentTable[]): void {
        for (let i = 0; i < commentList.length; i++) {
            const v = commentList[i];
            this.CommentTable.insert(v)
        }
    }


}
