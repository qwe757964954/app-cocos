import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { uiMgr } from 'bos/exports';
import { SimpleTableView } from 'bos/framework/gui/tableview/SimpleTableView';
import { App } from 'app/App';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { EditBox } from 'cc';
import { IFuzzySearchUsersReq } from 'idl/tss/hall/userinfo.v1';

@ccclass('SearchUserViewCtr')
export class SearchUserViewCtr extends XComponent {

    @property(EditBox)
    inputView: EditBox = null

    @property(SimpleTableView)
    tableView: SimpleTableView = null

    start() {

    }

    onClickClose() {
        uiMgr.popPage()
    }

    onEditTextChange(args) {
        console.log("onEditTextChange", args)
    }

    onEditReturn(args) {
        console.log("onEditReturn", args)

        this.onSearchText(this.inputView.string)
    }

    async onSearchText(text: string) {

        let req: IFuzzySearchUsersReq = {
            page: { index: 1, size: 30 },
            keyword: text
        }
        let users = await App.userMgr.fuzzySearchUser(req)
        if (users?.length > 0) {
            this.tableView.setData(users)
        } else {
            console.log("onSearchText2222")
            uiMgr.showToast("查找不到该用户")
        }
    }


}