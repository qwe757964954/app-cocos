import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { EditBox } from 'cc';
import { ApplyMutualFollowReq, IApplyMutualFollowReq } from 'idl/mpff/social/relation.v1';
import { uiMgr } from 'bos/exports';

@ccclass('AddFriendViewCtr')
export class AddFriendViewCtr extends XComponent {
    @property(EditBox)
    editBox;

    start() {

    }

    update(deltaTime: number) {

    }

    onClickBack() {
        uiMgr.popPage()
    }


    onClickSearch() {
        let page = "social@contacts/res/prefab/SearchUserView"
        uiMgr.loadPage(page)
    }

    onClickApply() {
        let req: IApplyMutualFollowReq = {
            uidList: [Number(this.editBox.string)],
            uid: 0
        }
        console.log("onClickApply:req=", req)
        StrongRelation.getInstance().apply(req)
        // .then(({ err, resp }) => {
        //     console.log("onClickApply:callback=", err, resp)
        // })
    }

    // 我的二维码
    onClickQRcode() {
        console.log("onClickQRcode")
    }


    onClickFace2Face() {

    }


    onClickContacts() {

    }

    onClickScan() {

    }

}