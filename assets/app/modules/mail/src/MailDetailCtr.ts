import { _decorator, Component, Node } from 'cc';
import { IMailBriefData, ISysMailData } from 'idl/tss/hall/mail.v2';
import { AnnexContent } from './AnnexContent';
import { NoAnnexContent } from './NoAnnexContent';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { AlertParams } from 'bos/framework/gui/alertview/src/AlertView';
import { mailMgr } from 'app/domain/mail/MailMgr';
import { Label } from 'cc';
import { Button } from 'cc';
import { Sprite } from 'cc';
import { Prefab } from 'cc';
import { IAsset } from 'idl/tss/common/common_define';
import { RewardCtr } from 'app/modules/common/reward/src/RewardCtr';
const { ccclass, property } = _decorator;
/**
    self.mid = "";
    self.origin = ""; -- 邮件来源
    self.title = ""; -- 邮件title
    self.isRead = false; -- 是否已读取
    self.expiredAt = 0;
    self.isExistAward = false; -- 是否有奖励
    self.isAccept = false; -- 是否已领取
    self.createdAt = 0;
    self.content = ""; -- 邮件内容
    self.URL = ""; -- 邮件跳转路径
    self.isShowContent = false; -- 是否打开详情页的开关
    self.btnContent = ""; -- 按钮文字内容配置
    self.senderUid = 0; -- 发件人
    self.isNew = false; -- 是否新邮件
    self.subType = 0; -- 类型: enum SubType, 邮件子类型
    self.assetItem = import("app.idl.tss.common.common_define").messages.AssetItem(); -- 类型: message , 邮件附件@deprecated
    self.assetItems = {}; -- 类型: message[] , 奖励内容
*/
@ccclass('MailDetailCtr')
export class MailDetailCtr extends Component {
    private mData: IMailBriefData;

    @property({
        visible: true,
        type: Node,
    })
    private annexContent: Node = null!;

    @property({
        visible: true,
        type: Node,
    })
    private noAnnexContent: Node = null!;

    @property({
        visible: true,
        type: Node,
    })
    private rightBtn: Node = null!;

    @property({
        visible: true,
        type: Prefab,
    })
    private reward: Prefab = null!;

    /**
     * 刷新邮件内容
    */
    refreshMail: Function;
    onDestroy() {
        this.refreshMail = null;
    }

    updateView(data: IMailBriefData) {
        this.mData = data;
        // 是有有奖励
        this.annexContent.active = data.isExistAward;
        this.noAnnexContent.active = !data.isExistAward;
        if (data.isExistAward) {
            this.updateAnnexContent();
        } else {
            this.updateNoAnnexContent();
        }
        this.updateBtnState();
    }
    /**
     * 更新领取按钮的状态
    */
    updateBtnState() {
        let btnLab: Node = this.rightBtn.getChildByName("btnLab");
        // 有奖品且已经领取
        if (this.mData.isAccept) {
            btnLab.getComponent(Label).string = "已领取";
            // this.rightBtn.getComponent(Button).interactable = false;
            this.rightBtn.getComponent(Sprite).grayscale = true;
        } else {
            if (this.mData.isExistAward) {
                btnLab.getComponent(Label).string = "领取";
            } else {
                btnLab.getComponent(Label).string = "确定";
            }
            // this.rightBtn.getComponent(Button).interactable = true;
            this.rightBtn.getComponent(Sprite).grayscale = false;
        }
    }

    // 更新有奖励的界面
    updateAnnexContent() {
        this.annexContent.getComponent(AnnexContent).updateView(this.mData);
    }

    // 更新没有奖励的界面
    updateNoAnnexContent() {
        this.noAnnexContent.getComponent(NoAnnexContent).updateView(this.mData);
    }

    // 删除
    onDelete() {
        // 有奖励且未领取
        if (this.mData.isExistAward && !this.mData.isAccept) {
            this.pushAlert();
        } else {
            this.deleteMail();
        }
    }


    /**
     * 刷新邮件内容
    */
    refreshMailContent() {
        if (this.refreshMail) {
            this.refreshMail();
        }
    }

    pushAlert() {
        let content: string = "当前还有未领取的附件，确定删除吗";
        const alertData: AlertParams = {
            title: "温馨提示",
            content: content,
            ok: {
                title: "确认",
                callback: () => {
                    this.deleteMail();
                }
            },
            cancel: {
                title: "取消"
            }
        };
        UIMgr.getInstance().pushAlert(alertData);
    }
    onClosePop() {
        UIMgr.getInstance().popPopup();
    }
    /**
     * 删除邮件
    */
    async deleteMail() {
        let ret = await mailMgr.DeleteMail(this.mData.mid);
        if (ret.resp) {
            UIMgr.getInstance().popPopup();
            this.refreshMailContent();
        }
    }

    // 领取
    async onGet() {
        if (this.mData.isExistAward && !this.mData.isAccept) {
            let ret = await mailMgr.AcceptAward(this.mData.mid);
            console.log("onGet:", ret);
            if (ret.resp) {
                UIMgr.getInstance().popPopup();
                this.refreshMailContent();
                this.openInviteReward(ret.resp.asset);
            } else {
                UIMgr.getInstance().showToast("领取失败");
            }
        } else {
            UIMgr.getInstance().popPopup();
        }
    }

    openInviteReward(asset: IAsset) {
        let t = UIMgr.getInstance().pushPopup(this.reward);
        t.getComponent(RewardCtr).updateView(asset);
    }
}


