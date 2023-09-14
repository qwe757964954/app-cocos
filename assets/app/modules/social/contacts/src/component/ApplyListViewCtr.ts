import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { SimpleTableView } from 'bos/framework/gui/tableview/SimpleTableView';
import { ApplyMutualFollow } from 'qsdk/relation/db/Model';
import { App } from 'app/App';
import { uiMgr } from 'bos/exports';

@ccclass('ApplyListViewCtr')
export class ApplyListViewCtr extends XComponent {
    @property(SimpleTableView)
    tableview: SimpleTableView = null;

    start() {
        StrongRelation.getInstance().getApplyList()
            .then((applyList: ApplyMutualFollow[]) => {

                let _applyList = []

                for (let index = applyList.length - 1; index >= 0; index--) {
                    let applyInfo = applyList[index]
                    if (applyInfo.status == 1 && applyInfo.fromUid !== App.userMgr.loginUid) {
                        _applyList.unshift(applyInfo)

                    } else {
                        _applyList.push(applyInfo)
                    }
                }
                console.log("_applyList----->", _applyList)
                this.tableview.setData(_applyList)
            })
    }

    update(deltaTime: number) {

    }

    onClickBack() {
        uiMgr.popPage()
    }
}