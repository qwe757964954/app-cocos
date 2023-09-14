import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { SimpleTableView } from 'bos/framework/gui/tableview/SimpleTableView';
import { ApplyMutualFollow, IRelation } from 'qsdk/relation/db/Model';
import { App } from 'app/App';
import { Decorator, uiMgr } from 'bos/exports';
import { IUnBlackReq } from 'idl/mpff/social/relation.v1';

@ccclass('BlackListViewCtr')
export class BlackListViewCtr extends XComponent {
    @property(SimpleTableView)
    tableview: SimpleTableView = null;

    private relationList: IRelation[] = null

    start() {
        StrongRelation.getInstance().getBlackList()
            .then((relationList: IRelation[]) => {
                this.relationList = relationList
                if (relationList.length > 0) {
                    this.tableview.setData(relationList)
                }
            })
    }


    onClickBack() {
        uiMgr.popPage()
    }


    @Decorator.OnAppEvent("IM_UN_BLACKED_USER")//拉黑好友
    onBlackUser(userID: number) {
        console.log("onBlackUser", userID)
        let req: IUnBlackReq = {
            uid: userID
        }
        StrongRelation.getInstance().black(req).then(({ err, resp }) => {
            if (!err) {
                for (let index = 0; index < this.relationList.length; index++) {
                    let relation = this.relationList[index];
                    if (relation.userID == userID) {
                        this.relationList.splice(index, 1)
                        break
                    }
                }
                this.tableview.setData(this.relationList)
            }
        })
    }


}