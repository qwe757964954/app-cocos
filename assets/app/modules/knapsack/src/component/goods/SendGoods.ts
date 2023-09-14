import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { BagData } from '../../config/config';
import { SendGoodsCtr } from '../SendGoodsCtr';
import { AssetType, PropType } from 'idl/tss/common/common_define';
import { IBatchSendPresentReq, SendPresentService } from 'idl/tss/hall/sendpresent.v1';
import { PropDetail } from '../PropDetail';
import { SelectUserParams } from 'app/modules/social/common/src/component/selectors/select/SelectUserCtr';
import { Selector, SelectorType } from 'app/modules/social/common/src/Selector';
import { StrongRelation } from 'qsdk/relation/StrongRelation';
import { UIMgr } from 'bos/framework/gui/UIMgr';
const { ccclass, property } = _decorator;

@ccclass('SendGoods')
export class SendGoods extends Component {
    @property({
        visible: true,
        type: Prefab,
    })
    private sendPrefab: Prefab = null!;
    start() {

    }

    update(deltaTime: number) {

    }

    async getUidList(callback: Function) {
        let friendList = await StrongRelation.getInstance().getFriendList();
        let userIDList = [];
        for (let index = 0; index < friendList.length; index++) {
            userIDList.push(friendList[index].userID);
        }
        let params: SelectUserParams = {
            userIDList: userIDList,
            onComplete: (list: number[]) => {
                callback(list);
            }
        };

        Selector.getInstance().loadSelector(SelectorType.User, params);
    }

    /**
     * 赠送道具
    */
    onSendTouch(data: BagData) {
        // 先获取好友id列表
        this.getUidList((userIDList: number[]) => {
            // 打开弹窗
            let t = UIMgr.getInstance().pushPopup(this.sendPrefab);
            let behavior = t.getComponent(SendGoodsCtr);
            behavior.confirmCallBack = (value: number) => {
                // 点击确认赠送好友
                this.sendPropToFriend(data, userIDList, value);
            };
            behavior.updateView(data, userIDList.length);
        });
    }

    async sendPropToFriend(data: BagData, uidList: number[], value: number) {
        let type_ = AssetType.AssetTypeProp;
        if (data.type == PropType.PropTypeGiftDirectlyOpen || data.type == PropType.PropTypeGiftManuallyOpen) {
            type_ = AssetType.AssetTypeGift;
        }
        let req: IBatchSendPresentReq = {
            toUids: uidList,
            propId: data.propID,
            num: value,
            assetType: type_
        };
        let ret = await SendPresentService.BatchSendPresent(req);
        if (ret.resp) {
            UIMgr.getInstance().showToast("赠送成功");
            this.node.getComponent(PropDetail).updateItemNum();
        } else {
            UIMgr.getInstance().showToast("赠送失败，请联系开发者");
            UIMgr.getInstance().popPopup();
        }
    }
}


