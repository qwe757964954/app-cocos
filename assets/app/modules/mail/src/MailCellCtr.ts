import { Label } from 'cc';
import { ScrollView } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { IMailBriefData } from 'idl/tss/hall/mail.v2';
import { MailCellScrollView } from './MailCellScrollView';
import { Color } from 'cc';
import { mailMgr } from 'app/domain/mail/MailMgr';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Prefab } from 'cc';
import { MailDetailCtr } from './MailDetailCtr';
import { Log } from 'bos/exports';
const { ccclass, property } = _decorator;

/**
function MailBriefData:ctor()
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
end
*/

@ccclass('MailCellCtr')
export class MailCellCtr extends Component {
    @property({
        visible: true,
        type: Label,
    })
    private titleNode: Label = null!;

    @property({
        visible: true,
        type: Label,
    })
    private timeNode: Label = null!;

    @property({
        visible: true,
        type: ScrollView,
    })
    private scrollView: ScrollView = null!;

    @property({
        visible: true,
        type: Label,
    })
    private details: Label = null!;

    @property({
        visible: true,
        type: Node,
    })
    private readView: Node = null!;

    @property({
        visible: true,
        type: Node,
    })
    private unReadView: Node = null!;

    @property({
        visible: true,
        type: Prefab,
    })
    private detailPrefab: Prefab = null!;

    @property({
        visible: true,
        type: Node,
    })
    private bgView: Node = null!;

    // 已读颜色
    private readTitleColor: Color = new Color(102, 102, 102, 255);
    // 未读颜色
    private unReadTitleColor: Color = new Color(204, 204, 204, 255);

    // 已读
    private timeNodeReadColor: Color = new Color(102, 102, 102, 255);
    // 未读
    private timeNodeUnReadColor: Color = new Color(136, 136, 136, 255);

    // 当前数据
    private mData: IMailBriefData;

    // 是否是测试状态
    private isTest: boolean = true;

    /**
     * 刷新邮件内容
    */
    refreshMail: Function;
    rowIndex: number = 0;

    start() {
        this.node.on("MailCellClick", this.onTouchCell, this);
    }

    onDestroy() {
        this.refreshMail = null;
        this.node.off("MailCellClick", this.onTouchCell, this);
    }

    /*
    * 获取当前时间
    */
    time() {
        let date = new Date();
        return Math.floor(date.getTime() / 1000);
    }

    getReceiveStrToMail(msgTime: number) {
        let remainingTime: number = this.time() - msgTime;
        if (remainingTime <= 0) {
            return "刚刚";
        }
        else {
            let day = Math.floor(remainingTime / (60 * 60 * 24));
            if (day == 0) {
                let hr = Math.floor(remainingTime / (60 * 60));
                if (hr == 0) {
                    let min = Math.floor(remainingTime / 60);
                    if (min <= 0) {
                        min = 1;
                    }
                    return min + "分钟前";
                } else {
                    return hr + "小时前";
                }
            } else {
                return day + "天前";
            }
        }
    }

    updateView(data: IMailBriefData, rowIndex: number) {
        this.mData = data;
        this.rowIndex = rowIndex;
        // 显示邮件标题
        if (data.title) {
            this.titleNode.string = data.title;
        }
        // 显示邮件时间
        if (data.createdAt) {
            this.timeNode.string = this.getReceiveStrToMail(data.createdAt || 0);
        }
        if (data.isExistAward) { // 存在附件
            this.scrollView.node.active = true;
            this.details.node.active = false;
            if (data.isAccept) {
                this.titleNode.string = this.titleNode.string + " (有附件已领取)";
            } else {
                this.titleNode.string = this.titleNode.string + " (有附件未领取)";
            }
        } else {
            this.scrollView.node.active = false;
            this.details.node.active = true;
            let text = data.content || "";
            this.updateTest(text);
        }
        // 是否是新邮件
        if (data.isNew) {

        }

        // 奖励内容
        if (data.assetItems && data.assetItems.length > 0) {
            this.scrollView.getComponent(MailCellScrollView).updateView(data.assetItems, data.isAccept);
        }

        this.isRead(data.isRead);

    }

    /**
         设置显示文本内容
        if (text.substring(0, 2) === "[{" && text.substring(text.length - 2) === "}]") {
            // 富文本
            this.details.string = "这是一份神秘邮件，请点击查看详情";
        } else {
            if (text.length > 20) {
                text = text.substring(0, 20) + "...";
            }
        this.details.string = text;
        }
    */
    updateTest(text: string) {
        if (text.substring(0, 2) === "[{" && text.substring(text.length - 2) === "}]") {
            // 富文本
            this.details.string = "这是一份神秘邮件，请点击查看详情";
        } else if (text.substring(0, 1) === "<" && text.substring(text.length - 1) === ">") {
            this.details.string = "这是一份神秘邮件，请点击查看详情";
        } else {
            if (text.length > 20) {
                text = text.substring(0, 20) + "...";
            }
            this.details.string = text;
        }
    }

    isRead(value: boolean) {
        // 是否已读
        this.readView.active = value;
        this.unReadView.active = !value;
        // 设置标题颜色
        this.titleNode.color = value ? this.readTitleColor : this.unReadTitleColor;
        // 设置时间颜色
        this.timeNode.color = value ? this.timeNodeReadColor : this.timeNodeUnReadColor;
        // 设置详情文本颜色
        this.details.color = value ? this.timeNodeReadColor : this.timeNodeUnReadColor;
    }

    // 单击显示详情
    async onTouchCell() {
        if (this.mData.isRead) {
            this.createDetailPanel(this.mData);
        } else {
            let ret = await mailMgr.GetSysMail(this.mData.mid);
            if (ret.resp) {
                this.mData.isRead = ret.resp.data.isRead;
                this.createDetailPanel(this.mData);
            } else {
                Log.e("获取详情失败[code]=" + ret.err);
            }
        }

    }

    // 打开详情界面查看
    createDetailPanel(data: IMailBriefData) {
        // 显示详情页面
        let t = UIMgr.getInstance().pushPopup(this.detailPrefab);
        let detail = t.getComponent(MailDetailCtr);
        detail.updateView(data);
        detail.refreshMail = this.refreshMail;
        this.mData.isRead = true;
        this.isRead(true);
    }
}


