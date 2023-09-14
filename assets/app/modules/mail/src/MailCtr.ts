import { _decorator, Component, Node } from 'cc';
import { MailTableView } from './MailTableView';
import { mailMgr } from 'app/domain/mail/MailMgr';
import { IBatchAwardData, IListSysMailsReq, IListSysMailsResp, IMailBriefData, SenderType } from 'idl/tss/hall/mail.v2';
import { App } from 'app/App';
import { Log } from 'bos/exports';
import { js } from 'cc';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Widget } from 'cc';
import { TableViewRefresh } from 'app/modules/common/tableViewEx/src/TableViewRefresh';
import { IAsset } from 'idl/tss/common/common_define';
import { Prefab } from 'cc';
import { RewardCtr } from 'app/modules/common/reward/src/RewardCtr';
const { ccclass, property } = _decorator;

@ccclass('MailCtr')
export class MailCtr extends Component {
    @property({
        visible: true,
        type: Node,
    })
    private tableView: Node = null!;

    @property({
        visible: true,
        type: Node,
    })
    private buttonArea: Node = null!;

    @property({
        visible: true,
        type: Node,
    })
    private middleArea: Node = null!;

    /**
     * 是否存在未读邮件
    */
    haveAsset: boolean = false;

    /**
     * 页数 读取邮件使用分页技术来读取
    */
    curPage: number = 0;

    /**
     * 每页最大数量
    */
    pageSize: number = 30;

    /**
     * 总的邮件数量
    */
    totalSize: number = 0;

    /**
     * 邮件数据
    */
    listData: IMailBriefData[] = [];

    /**
     * 是否加载下一页数据
    */
    isLoadLastPage: boolean = false;

    @property({
        visible: true,
        type: Prefab,
    })
    private reward: Prefab = null!;
    // 是否实时刷新
    private isRefresh: boolean = true;

    @property({
        visible: true,
        type: Node,
    })
    private emptyView: Node = null!;

    // 初始索引值
    private startCellIndex: number = 0;

    protected onLoad(): void {
        let widget = this.middleArea.getComponent(Widget);
        if (widget) {
            widget.top = 226;
            widget.bottom = 0;
            widget.updateAlignment();
        }
        this.buttonArea.active = false;
        // 默认隐藏
        this.emptyView.active = false;
    }

    start() {
        this.initUI();
    }

    initUI() {
        this.initData();
        this.reqData();
    }

    initData() {
        this.haveAsset = false;
        this.curPage = 0;
        this.totalSize = 0;
        this.listData = [];
    }

    resetData() {
        this.initData();
        // 清理tableView内数据 数据置空
        this.setData(this.listData);
    }

    async reqData() {
        if (this.isRefresh) {
            UIMgr.getInstance().showLoading();
        }
        this.curPage = this.curPage + 1;
        let req: IListSysMailsReq = {
            UID: App.userMgr.loginUid,
            page: this.curPage,
            pageSize: this.pageSize,
            senderType: SenderType.SenderTypeSystem
        };
        let ret = await mailMgr.GetMailList(req);
        if (ret.resp) {
            let resp: IListSysMailsResp = ret.resp;
            this.totalSize = resp.total;
            let dataList: IMailBriefData[] = resp.data;
            dataList.forEach((data: IMailBriefData) => {
                this.listData.push(data);
            });
            this.haveAsset = resp.unAcceptNum > 0 ? true : false;
            // 关闭上拉加载
            if (this.listData.length >= this.totalSize) {
                this.setTableViewIsLastPage(false);
            } else {
                this.setTableViewIsLastPage(true);
            }
            this.setData(this.listData);
        } else {
            Log.e("加载GetMailList消息失败：", ret.err);
        }
        if (this.isRefresh) {
            UIMgr.getInstance().hideLoading();
        }
    }

    /**
     * 设置下拉显示加载loading是否显示
    */
    setTableViewIsLastPage(value: boolean) {
        this.isLoadLastPage = value;
    }

    setData(list: IMailBriefData[]) {
        this.updateBatchGetBtn();
        UIMgr.getInstance().hideLoading();
        let tableView = this.tableView.getComponent(MailTableView);
        tableView.refreshMail = () => { this.refreshView(); };
        if (this.isRefresh) {
            this.refreshTableView();
            tableView.updateTableView(list);
        }
    }

    updateBgView() {
        this.emptyView.active = this.listData.length == 0 ? true : false;
    }

    refreshTableView() {
        let refreshView = this.tableView.getComponent(TableViewRefresh);
        refreshView.cancel();
        refreshView.delegate = this;
    }

    /**
     * 判断是否需要显示一键领取按钮
    */
    updateBatchGetBtn() {
        let ret: boolean = false;
        this.listData.forEach((data: IMailBriefData) => {
            if (data.isExistAward && !data.isAccept) {
                ret = true;
            }
        });
        this.buttonArea.active = ret;
        let widget = this.middleArea.getComponent(Widget);
        if (widget) {
            if (ret) {
                widget.bottom = 193;
                widget.top = 226;
            } else {
                widget.top = 226;
                widget.bottom = 0;
            }
            widget.updateAlignment();
        }
        let node = this.middleArea.getChildByName("tableView");
        node.getComponent(Widget).updateAlignment();
    }

    updateView() {
        this.initData();
        // 先使用缓存
        let cacheList = mailMgr.getCache({ page: 1, pageSize: this.pageSize });
        if (cacheList && cacheList.length > 0) {
            this.setData(cacheList);
        }
        this.reqData();
    }

    async deleteAll() {
        let ret = await mailMgr.DeleteAllUserMail(SenderType.SenderTypeSystem);
        if (ret.resp) {
            if (ret.resp.deleteCnt == 0) {
                UIMgr.getInstance().showToast("暂无可删除的已读邮件");
            } else {
                let msg: string = js.formatStr("已成功删除%d条已读邮件", ret.resp.deleteCnt);
                UIMgr.getInstance().showToast(msg);
            }
            mailMgr.ClearUserNewMailFlag(SenderType.SenderTypeSystem);
            this.updateView();
        }
    }

    onDelete() {
        this.deleteAll();
    }

    /**
     * 一键领取
    */
    async onBatchGet() {
        let ret = await mailMgr.BatchAcceptAward();



        console.log("onBatchGet:", ret);
        if (ret.resp) {
            mailMgr.ClearUserNewMailFlag(SenderType.SenderTypeSystem);
            this.updateView();
            if (ret.resp.bData && ret.resp.bData[0]) {
                let data: IBatchAwardData = ret.resp.bData[0];
                if (data.asset) {
                    this.openInviteReward(data.asset);
                } else {
                    UIMgr.getInstance().showToast("领取失败");
                }
            }
        } else {
            UIMgr.getInstance().showToast("领取失败");
        }
    }

    /**
     * 显示领取物品列表
    */
    openInviteReward(asset: IAsset) {
        let t = UIMgr.getInstance().pushPopup(this.reward);
        t.getComponent(RewardCtr).updateView(asset);
    }

    onBack() {
        UIMgr.getInstance().popPage();
    }

    refreshView() {
        this.updateView();
    }

    /********************************************以下接口用于处理tableView扩展内刷新回调逻辑**********************************************************/

    reloadPageData() {
        this.isRefresh = false;
        this.initUI();
    }
    refreshPageView() {
        this.isRefresh = true;
        this.setData(this.listData);
    }
    /**
     * 检测是否加载下一页的数据
    */
    checkHasLoadNextPageData(): boolean {
        return this.isLoadLastPage;
    }

    // 下载下一页数据
    loadNextPageData() {
        let tableView = this.tableView.getComponent(MailTableView);
        tableView.initStartIndex();
        this.isRefresh = false;
        this.reqData();
    }
}


