import { _decorator, Component, Graphics, Node, ScrollView, Vec3, view } from 'cc';
import { propMgr } from 'app/domain/props/PropMgr';
import { BagData, RenderData, BoxData } from './../config/config';
import { PageData, ColorMap } from './../config/config';
import { GoodTableView } from './ListView/GoodTableView';
import { ICleanUpUserPropBadgeReq, IExpandPropDetailsReq, IListUserResV2Req, QueryTab } from 'idl/tss/hall/prop.v4';
import { buffMgr } from 'app/domain/props/BuffMgr';
import { SearchUserBuffReq } from 'idl/tss/hall/buff.v3';
import { App } from 'app/App';
import { PropType } from 'idl/tss/common/common_define';
import util from '../util';
import { ListItemBackgroundBehavior } from './ListItemBackgroundBehavior';
import { Color } from 'cc';
import { TableViewRefresh } from 'app/modules/common/tableViewEx/src/TableViewRefresh';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { Log } from 'bos/exports';
const { ccclass } = _decorator;


@ccclass('PageCellCtr')
export class PageCellCtr extends Component {
    private curPage: number = 0;
    private pageSize: number = 30;
    private cellData: BoxData[][] = [];
    private buffList: BagData[] = [];
    private buffListLength: number = 0;
    private bagDataList: BagData[] = [];
    private mData: PageData;
    private interval: number;
    private bgView: Node;
    private bgList: RenderData[];

    /**
     * 是否显示最后一个项
    */
    private isLastPage: boolean = false;

    /**
     * 节点是否播放动画
    */
    private isNodeAnim: boolean = true;

    private startCellIndex: number = 0;
    onLoad() {
        this.initLayout();
    }
    // 页签初始化时设置显示隐藏节点
    initLayout() {
        let node = this.node;
        let emptyView = node.getChildByName('emptyView');
        let tableView = node.getChildByName('tableView');
        if (emptyView) {
            emptyView.active = false;
        }
        if (tableView) {
            tableView.active = true;
        }
        if (!this.bgView) {
            this.bgView = util.getNodeByName(this.node, "bgView");
        }
    }
    /**
     * 加载数据
     * isRefresh 是否实时刷新
    */
    reloadData(isRefresh: boolean = true) {
        this.curPage = 0;
        this.buffList = [];
        this.bagDataList = [];
        this.reqData(isRefresh);
    }
    /**
     * 加载服务器背包数据
    */
    async reqData(isRefresh: boolean = true) {
        let ret = await this.reqGoodsByType(isRefresh);
        if (ret && isRefresh) {
            this.refreshView();
        }
        // 暂时不显示，背包功能暂时不支持使用道具操作，所以也不存在buff类型的道具显示
        // if (this.mData.tabType == QueryTab.TabRegular) {
        //     ret = await this.reqBuff();
        //     if (ret && isRefresh) {
        //         this.refreshView();
        //     }
        // }
    }

    // 根据服务器数据bagDataList 生成前端使用的数据
    genData() {
        const sortList: BagData[][] = [[], []];
        const dataList = this.bagDataList;
        this.bagDataList = [];
        // 先分类，然后再合并
        for (let i = 1, len = dataList.length; i <= len; i++) {
            const v = dataList[i - 1];
            if (!v.showShaderBg && v.expireAt <= util.time()) {
                sortList[1].push(v);
            } else {
                sortList[0].push(v);
            }
        }
        // 把第二份数据写入到第一份数据内
        util.copyTo(sortList[0], sortList[1]);
        const bgList = [];
        let lastPropID: number;
        let openedNum = 0;
        for (let i = 1, len = sortList[0].length; i <= len; i++) {
            const v = sortList[0][i - 1];
            v.index = i - 1;
            if (v.isOpen && v.shortcut) {
                openedNum++;
            }
            v.backgroundColor = openedNum % 2 === 1 ? ColorMap.color1 : ColorMap.color2;
            this.bagDataList.push(v);
            // 需要显示shader背景的节点
            if (v.showShaderBg) {
                if (lastPropID === v.propID) {
                    bgList[bgList.length - 1].endIndex = i;
                    bgList[bgList.length - 1].fillColor = v.backgroundColor;
                } else {
                    let bgData: RenderData = {
                        startIndex: i
                    };
                    bgList.push(bgData);
                }
            }
            lastPropID = v.propID;
        }
        for (let i = bgList.length - 1; i >= 0; i--) {
            if (bgList[i].startIndex == null || bgList[i].endIndex == null) {
                bgList.splice(i, 1);
            }
        }
        // 把数据拆分为三个数据为一组 用于刷新tableView的数据
        this.cellData = this.makePropCellData(this.bagDataList);
        // 显示背景区域绘制的数据
        this.bgList = bgList;
    }

    // 数据逻辑处理
    // 第一步把获取的数据分成两份（根据expireAt 过期时间字段把过期的数据分布到第二份数据内）
    // 然后把第二份数据写入到第一分数据内
    // 
    refreshView() {
        this.genData();
        this.updateTableView();
        this.graphicsClear();
        // 需要在下一帧触发才能获取到content容器的大小
        this.scheduleOnce(() => {
            // 背景需要与content布局一致才能正常显示区域
            this.renderTableViewBg(this.bgList);
        });
        this.setEmptyView(this.cellData.length == 0 ? true : false);
    }
    // 根据数据刷新节点
    updateTableView() {
        let tableView = this.node.getChildByName("tableView");
        let goodTableView = tableView.getComponent(GoodTableView);
        let listItemBackgroundBehavior = this.bgView.getComponent(ListItemBackgroundBehavior);
        listItemBackgroundBehavior.setOffsetY(0);
        if (goodTableView && goodTableView.updateTableView) {
            goodTableView.updateTableView(this.cellData);
        }
        let tableViewRefresh = tableView.getComponent(TableViewRefresh);
        tableViewRefresh.delegate = this;
        tableViewRefresh.cancel();
        this.playAnim();
    }

    /**
        清理绘制内容 
    */
    graphicsClear() {
        const graphics = this.bgView.getComponent(Graphics);
        if (graphics) {
            graphics.clear();
        }
    }

    // 渲染背包内节点使用数据，需要使用到shader
    renderTableViewBg(bgList: RenderData[]) {
        let ex: number = (view.getVisibleSize().x - 1011) / 2;
        ex = ex < 0 ? 0 : ex;
        let behavior = this.bgView.getComponent(ListItemBackgroundBehavior);
        if (behavior) {
            behavior.init({
                radius: 20,
                iWidth: 337,
                iHeight: 411,
                iCountMax: 3,
                fillColor: new Color(31, 31, 31, 255),
                offset: [ex, 0]
            });
            behavior.setRange(bgList);
        }
    }

    makePropCellData(srcData: BagData[]) {
        const result: BoxData[][] = [];
        let boxData: BoxData;
        for (let i = 0; i < srcData.length; i += 3) {
            const tmpData = [];
            if (srcData[i] !== undefined) {
                boxData = {
                    delegate: this,
                    data: srcData[i],
                };
                tmpData[0] = boxData;
            }
            if (srcData[i + 1] !== undefined) {
                boxData = {
                    delegate: this,
                    data: srcData[i + 1],
                };
                tmpData[1] = boxData;
            }
            if (srcData[i + 2] !== undefined) {
                boxData = {
                    delegate: this,
                    data: srcData[i + 2],
                };
                tmpData[2] = boxData;
            }
            result.push(tmpData);
        }
        return result;
    }

    setEmptyView(value: boolean) {
        let emptyView = this.node.getChildByName('emptyView');
        if (emptyView) {
            emptyView.active = value;
        }
    }

    async reqGoodsByType(isRefresh: boolean) {
        let size = this.pageSize;
        if (this.curPage === 0 && this.mData.tabType === QueryTab.TabRegular) {
            size = this.pageSize - this.buffListLength;
        }
        if (size <= 0) return;
        if (isRefresh) {
            UIMgr.getInstance().showLoading();
        }
        const req: IListUserResV2Req = {
            pageSize: size,
            page: this.curPage + 1,
            queryTab: this.mData.tabType,
            uid: App.userMgr.loginUid,
        };
        let ret = await propMgr.listUserProps(req);
        if (ret.resp) {
            let resp = ret.resp;
            this.curPage = this.curPage + 1;
            const listData = this.bagDataList;
            for (const v of resp.props || []) {
                listData.push(v);
            }
            this.bagDataList = listData;
            if (resp.totalSize && listData.length >= resp.totalSize) {
                this.setIsLastPage(false);
            } else {
                this.setIsLastPage(true);
            }
        }
        if (isRefresh) {
            UIMgr.getInstance().hideLoading();
        }
        return ret.resp ? true : false;
    }

    updateView(data: PageData) {
        this.mData = data || this.mData;
        this.reloadData();
    }

    getGoodsDetails(index: number, rowIndex: number) {
        const data = this.bagDataList[index];
        if (!data || !data.shortcut) return;
        if (!data.isOpen) {
            // 是概况卡片，且是堆叠状态, 需要展开
            this.insertGoodItem(data, rowIndex);
        } else {
            this.removeGoodsItem(data.propID, index);
        }
    }

    cancelInterval() {
        if (this.interval) {
            clearTimeout(this.interval);
            this.interval = null;
        }
    }
    /**
     * 展开堆叠数据，并且播放动画
    */
    async insertGoodItem(data: BagData, rowIndex: number) {
        this.cancelInterval();
        const curRow = Math.ceil(data.index / 3);
        const oldRow = Math.ceil(this.bagDataList.length / 3);
        let isSlither = this.getIsSlither(data, rowIndex);
        if (isSlither) {
            this.isNodeAnim = false;
        }
        const req: IExpandPropDetailsReq = {
            id: data.propID,
            propType: data.type as PropType,
            page: data.page || 1,
            uid: App.userMgr.loginUid,
            pageSize: data.pageSize || 999,
        };
        const res = await propMgr.getGoodsDetails(req);
        if (res.resp) {
            let resp = res.resp;
            if (resp.props && resp.props.length > 0) {
                for (let [n, v] of this.bagDataList.entries()) {
                    if (v.shortcut && v.propID === data.propID) {
                        v.isOpen = true;
                        v.showShaderBg = true;
                        v.showOpenAnim = true;
                        for (let i = resp.props.length; i > 0; i--) {
                            let cellData = resp.props[i - 1] as BagData;
                            cellData.showOpenAnim = true;
                            cellData.showShaderBg = true;
                            cellData.delayTime = i / 24 + 3 / 24;
                            if (v.badgeNum == 0) {
                                cellData.badgeNum = 0;
                            }
                            this.bagDataList.splice(n + 1, 0, cellData);
                        }
                        v.badgeNum = 0;
                        break;
                    }
                }
                this.refreshView();
                if (isSlither) {
                    let row = this.getCellRow(oldRow, curRow);
                    this.resetToCell(row);
                }
            }
        } else {
            this.cancelInterval();
        }
    }
    /**
     * 收起堆叠节点
    */
    removeGoodsItem(propID: number, index: number) {
        this.bagDataList[index].isOpen = false;
        this.bagDataList[index].showHideAnim = true;
        this.bagDataList[index].showShaderBg = false;
        const listData = this.bagDataList;
        while (
            listData[index + 1] &&
            listData[index + 1].propID === propID &&
            listData[index + 1].showShaderBg
        ) {
            this.cleanPropBadge(listData[index + 1]);
            listData.splice(index + 1, 1);
        }
        this.refreshView();
    }
    /**
     * 清除新道具显示
    */
    async cleanPropBadge(data: BagData) {
        const badgeNum: number = data?.badgeNum ?? 0;
        if (badgeNum < 1) return;
        let req: ICleanUpUserPropBadgeReq = {
            type: data.type,
            expireAt: data.expireAt,
            propId: data.propID,
            uid: App.userMgr.loginUid
        };
        let ret = await propMgr.cleanUpPropBadge(req);
        if (ret.resp) {
            data.badgeNum = 0;
            this.mData.delegate.cleanPropBadge(this.mData.tabType, -badgeNum);
        }
    }

    showOpenAnimBack(index: number) {
        if (this.bagDataList[index]) {
            this.bagDataList[index].showOpenAnim = false;
        }
    }
    showHideAnimBack(index: number) {
        if (this.bagDataList[index]) {
            this.bagDataList[index].showHideAnim = false;
        }
    }

    async reqBuff() {
        const req: SearchUserBuffReq = new SearchUserBuffReq({});
        const ret = await buffMgr.SearchUserBuff(req);
        this.buffList = [];
        if (ret.resp) {
            this.buffList = ret.resp.buffs || [];
        }
        this.buffListLength = this.buffList.length;
        let buffData = this.buffList;
        if (this.buffListLength > 1) {
            // buffData.sort((a, b) => a.expireAt > b.expireAt);
        }
        for (const [i, v] of buffData.entries()) {
            v.itemType = 'buff';
            this.bagDataList.unshift(v);
        }
        return buffData.length > 0 ? true : false;
    }
    // 初始化UI 界面信息
    initView() { }


    /********************************************以下接口用于处理tableView扩展内刷新回调逻辑**********************************************************/
    getGoodTableView() {
        let tableView = this.node.getChildByName("tableView");
        let goodTableView = tableView.getComponent(GoodTableView);
        return goodTableView;
    }

    setIsLastPage(value: boolean) {
        this.isLastPage = value;
    }

    /**
     * 获取新的cell的位置
     * oldRow 旧的总长度
     * curRow 当前索引
    */
    getCellRow(oldRow: number, curRow: number) {
        let dr = Math.ceil(this.bagDataList.length / 3) - oldRow;
        let row = Math.max(curRow - dr, curRow);
        return row;
    }

    // 滑动到某个cell
    resetToCell(row: number) {
        let goodTableView = this.getGoodTableView();
        goodTableView.resetToCell(row, () => {
            this.isNodeAnim = true;
            this.playAnim();
        });
    }

    playAnim() {
        let goodTableView = this.getGoodTableView();
        if (this.isNodeAnim && goodTableView) {
            goodTableView.playAnim();
        }
    }
    /**
     * 检测是否可以播放动画
    */
    checkIsNodeAnimPlay() {
        return this.isNodeAnim;
    }

    getIsSlither(data: BagData, rowIndex: number) {
        let goodTableView = this.getGoodTableView();
        let tab: number[] = goodTableView.getCellIndexList();
        tab.sort((a: number, b: number) => a - b);
        const tab2: { [key: number]: number; } = {};
        tab2[tab[tab.length - 1]] = tab[tab.length - 1];
        if (tab.length > 1) {
            tab2[tab[tab.length - 2]] = tab[tab.length - 2];
        }
        return tab2[rowIndex] ? true : false;
    }

    // 加载;
    reloadPageData() {
        this.reloadData(false);
    };
    // 刷新界面
    refreshPageView() {
        this.refreshView();
    };

    /**
     * 检测是否加载下一页的数据
    */
    checkHasLoadNextPageData(): boolean {
        return this.isLastPage;
    }

    // 下载下一页数据
    loadNextPageData() {
        let tableView = this.getGoodTableView();
        tableView.initStartIndex();
        this.reqData(false);
    }
}
