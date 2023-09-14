import { Label } from 'cc';
import { EditBox } from 'cc';
import { _decorator, Component, Node } from 'cc';

import { App } from 'app/App';
import { StringUtil } from 'bos/exports';
import { propMgr } from 'app/domain/props/PropMgr';
import { PropType } from 'idl/tss/common/common_define';
import { Sprite } from 'cc';
import { BagData } from '../config/config';
import { IRenameReq } from 'idl/tss/hall/prop.v4';
import { UIMgr } from 'bos/framework/gui/UIMgr';
const { ccclass, property } = _decorator;

@ccclass('ModifyNameCtr')
export class ModifyNameCtr extends Component {
    @property({ type: EditBox })
    nickName: EditBox | null = null;

    @property({ type: Label })
    propNum: Label | null = null;

    @property({ type: Label })
    tips: Label | null = null;

    @property({ type: Sprite })
    codeView: Node | null = null;

    User = App.userMgr.loginUser;
    /**
     * 关闭回调
    */
    cancelCallBack: Function;
    /**
     * 点击修改回调
    */
    confirmCallBack: Function;

    /**
     * 改名卡数据源
    */
    data: BagData;

    start() {
        this.propNum.string = 'x' + this.getPropNum();//获取改名卡道具数量
        this.tips.node.active = false;
    }

    /**
     * 刷新信息
    */
    updateView(data: BagData) {
        this.data = data;
    }

    getNickName() {
        return this.nickName.string;
    }
    clickBg() {
        this.nickName?.blur();
    }

    clickConfirm() {
        let newNickName = this.getNickName();
        if (newNickName == '') {
            UIMgr.getInstance().showToast('昵称不能为空');
            return;
        }
        //判断敏感词Toast.show('名字不可含有敏感词汇')
        //检查特殊字符Toast.show('不支持特殊字符')
        if (newNickName == this.User.nickname) {
            UIMgr.getInstance().showToast('新昵称不能与旧昵称相同');
            return;
        }
        let propNum = 0; //获取改名卡道具数量
        if (propNum == 0) {
            UIMgr.getInstance().showToast('改名卡数量不足');
            return;
        }

        if (StringUtil.stringLen(newNickName) > 14) {
            UIMgr.getInstance().showToast('新昵称不能超过14个字符');
        }

        this.userProp();
    }

    closePopUp() {
        UIMgr.getInstance().popPopup();
    }

    clickCancel() {
        this.closePopUp();
        if (this.cancelCallBack) {
            this.cancelCallBack();
        }
    }

    getPropNum() {//获取改名卡道具数量
        return propMgr.getUserPropNumByType(PropType.PropTypeRenameCard);
    }

    async userProp() {
        let req: IRenameReq = {
            propID: this.data.propID,
            expireAt: this.data.expireAt,
            name: this.getNickName(),
            uid: App.userMgr.loginUid,
        };
        let ret = await propMgr.Rename(req);
        if (ret) {
            if (ret.err) {
                UIMgr.getInstance().showToast("修改昵称失败, 有疑问请联系客服咨询详情");
                return;
            }
            UIMgr.getInstance().showToast("修改成功");
            this.closePopUp();
            if (this.confirmCallBack) {
                this.confirmCallBack(true);
            }
        }
    }
}


