import { _decorator, Component, instantiate, log, Node, Prefab, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { CommentCellCtr } from './CommentCellCtr';
import { FeedEntity } from 'qsdk/feed/db/Model';

@ccclass('CommentViewCtr')
export class CommentViewCtr extends XComponent {
    @property(Prefab)
    commentCellPrefab = null

    updateView(feedEntity: FeedEntity) {
        let commentList = feedEntity.getCommentList()
        this.node.removeAllChildren()
        for (let index = 0; index < commentList.length; index++) {
            const element = commentList[index];
            let cell: Node = instantiate(this.commentCellPrefab)

            cell.getComponent(CommentCellCtr).updateView(feedEntity, index)
            this.node.addChild(cell)
        }
    }

}