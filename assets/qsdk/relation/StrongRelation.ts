
import { IAcceptMutualFollowReq, IApplyMutualFollowReq, IDelApplyMutualFollowReq, IRejectMutualFollowReq } from "idl/mpff/social/relation.v1";
import { DB } from "./db/DB";
import { RelateType, RelationEvent } from "./define";
import { Relation } from "./Relation";

export class StrongRelation extends Relation {

    private static instance: StrongRelation = null
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new (StrongRelation)
        }
        return this.instance
    }

    async apply(req: IApplyMutualFollowReq) {
        return this.applyMutualFollow(req)
    }

    async accept(req: IAcceptMutualFollowReq) {
        return this.acceptMutualFollow(req)
    }

    async reject(req: IRejectMutualFollowReq) {
        return this.rejectMutualFollow(req)
    }

    async delApplyHistory(req: IDelApplyMutualFollowReq) {
        return this.delApplyMutualFollow(req)
    }

    async getApplyList() {
        return this.getApplyMutualFollowList()
    }

    async getFriendList() {
        return this.getMutualFollowList()
    }

}