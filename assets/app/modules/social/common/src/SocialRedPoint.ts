import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { ApplyStatus } from 'idl/mpff/social/relation.v1';
import { App } from 'app/App';

@ccclass('SocialRedPoint')
export class SocialRedPoint extends XComponent {

    static async getContactsRedPoint() {
        let hasRedPoint = false;
        let applyList = await StrongRelation.getInstance().getApplyList()
        if (applyList && applyList.length > 0) {
            for (const mark of applyList) {
                if (mark.status === ApplyStatus.ApplyStatusWaiting && mark.fromUid !== App.userMgr.loginUid) {
                    hasRedPoint = true;
                    break;
                }
            }
        }
        return hasRedPoint
    }


}