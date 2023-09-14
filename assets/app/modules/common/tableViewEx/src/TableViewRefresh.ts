import { _decorator, Component, EventTouch, instantiate, Node, NodeEventType, Prefab, ScrollView, Tween, tween, UITransform, Vec2, Vec3 } from 'cc';
import { TableView, TableViewEvent } from 'bos/framework/gui/tableview/TableView';
import { TopViewOperate } from './TopViewOperate';
const { ccclass, property } = _decorator;
export interface TableViewRefreshDelegate {
    // 预先加载数据
    reloadPageData(): void;
    // 根据数据更新UI
    refreshPageView(): void;
    // 检测是否需要下载下一页数据
    checkHasLoadNextPageData(): boolean;
    // 下载下一页数据
    loadNextPageData(): void;
}
let DefaultTableViewRefreshDelegate: TableViewRefreshDelegate = {
    reloadPageData() { },
    refreshPageView() { },
    checkHasLoadNextPageData(): boolean {
        return false;
    },
    loadNextPageData() { },
};
@ccclass('TableViewRefresh')
export class TableViewRefresh extends Component {
    @property({
        visible: true,
        type: TableView,
    })
    private _tableView: TableView;

    @property({
        visible: true,
        type: Prefab,
    })
    private topPrefab: Prefab;

    @property({
        visible: true,
        type: Prefab,
    })
    private buttonPrefab: Prefab;

    private _delegate: TableViewRefreshDelegate = null!;
    private scrollView: ScrollView;
    private scrollViewContent: Node;

    // 显示顶部loading相关字段
    private loadingView: Node;
    private topViewOperate: TopViewOperate;
    private hasStartTopLoading: boolean = false;
    private tween: Tween<Node>;

    private buttonCell: Node;
    private tailCell: Node;
    private buttonPos: Vec3 = new Vec3(0, 0, 0);

    // 是否是顶部显示loading
    private isTopShowLoading: boolean = true;
    /**
     * 是否是下载下一页数据
    */
    private isLoadNextPageData: boolean = false;

    get delegate() {
        if (this._delegate == null) return DefaultTableViewRefreshDelegate;
        return this._delegate;
    }
    set delegate(value: TableViewRefreshDelegate) {
        this._delegate = value;
    }

    protected onLoad(): void {
        this.scrollView = this._tableView.node.getComponent(ScrollView);
        this.initLayout();
    };
    initLayout() {
        this.loadingView = instantiate(this.topPrefab);
        let view: Node = this._tableView.node.getChildByName("view");
        view.addChild(this.loadingView);
        this.scrollViewContent = view.getChildByName("content");
        this.loadingView.active = false;
        this.topViewOperate = this.loadingView.getComponent(TopViewOperate);

        // 创建底部tips节点 并隐藏
        this.buttonCell = instantiate(this.buttonPrefab);
        this.tailCell = this.scrollViewContent.getChildByName("$tail_layout$");
        view.addChild(this.buttonCell);
        this.buttonCell.active = false;
    }

    onEnable() {
        this._tableView.node.on(TableViewEvent.REFRESH_DATA_BOTTOM, this.onToBottom, this);
        this._tableView.node.on('scroll-to-top', this.onToTop, this);
        this._tableView.node.on('scroll-ended', this.onScrollEnded, this);
        this._tableView.node.on('scrolling', this.onScrolling, this);
        this.scrollViewContent.on(Node.EventType.TRANSFORM_CHANGED, this.onTransformChange, this);
    }
    onDisable() {
        if (this._tableView && this._tableView.node) {
            this._tableView.node.off(TableViewEvent.REFRESH_DATA_BOTTOM, this.onToBottom, this);
            this._tableView.node.off('scroll-to-top', this.onToTop, this);
            this._tableView.node.off('scroll-ended', this.onScrollEnded, this);
            this._tableView.node.off('scrolling', this.onScrolling, this);
            this.scrollViewContent.on(Node.EventType.TRANSFORM_CHANGED, this.onTransformChange, this);
        }
        else {
            console.warn("this._tableView && this._tableView.node 不存在");
        }
        this.cancel();
        this.delegate = null;
    }

    onTransformChange(type: number) {
        if (type & Node.TransformBit.POSITION) {
            this.onChangePosition();
        }
    }

    /**
     * 服务器加载数据
    */
    loadMessage() {
        this.delegate.reloadPageData();
    }
    /**
     * 刷新界面
    */
    refreshPageView() {
        this.delegate.refreshPageView();
    }

    cancel() {
        this.cancelTopLoading();
        this.cancelButtonLoading();
        this.cancelButtonTips();
    }

    /************************************以下逻辑为动态显示顶端节点逻辑***************************************/

    onToTop() {
        if (this.isLoadNextPageData) {
            return;
        }
        this.removeButtonElement();
        this.isTopShowLoading = true;
        this.addLoading();
    }

    onScrollEnded() {
        let pos = this.scrollView.getContentPosition();
        if (pos.y >= 0) {
            this.removeLoading();
        }
    }
    /**
     * 监听滑动回调
    */
    onScrolling() {
        // 检测是移动状态下关闭缓动
        if (this.checkCancelTopLoading()) {
            this.cancelTopLoading();
        }
        // 惯性滚动状态下，且是在最大化显示loading的情况下
        if (this.checkStartTopLoading()) {
            this.startTopLoading();
        }
    }

    /**
     * 检测是否需要关闭当前顶部loading状态
    */
    checkCancelTopLoading() {
        // 已经启动顶部loading数据加载的情况下
        if (this.hasStartTopLoading) {
            // 是否是在拖拽状态下
            if (this.scrollView.isScrolling()) {
                return true;
            }
            // 是否是在惯性滚动状态下 且 loading状态不是完全体
            if (this.scrollView.isAutoScrolling() && !this.topViewOperate.checkIsShowing()) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检测是否可以正式启动显示loading状态
    */
    checkStartTopLoading() {
        if (this.scrollView.isAutoScrolling() && this.topViewOperate.checkIsShowing() && this.hasStartTopLoading == false) {
            return true;
        }
        return false;
    }

    /**
     * content节点pos坐标改变时触发
    */
    onChangePosition() {
        this.updateTopCell();
        this.updateButtonCell();
    }
    /**
     * 刷新顶部loading节点坐标位置
    */
    updateTopCell() {
        let pos = this.scrollViewContent.getPosition().clone();
        if (pos.y <= 0) {
            if (this.isTopShowLoading) {
                this.loadingView.setPosition(pos);
                this.topViewOperate.setHeight(pos.y * -1);
            }
        } else {
            if (!this.isTopShowLoading && this.loadingView.active) {
                this.updateButtonLoading();
            }
        }
    }

    getButtonOffsetY(): number {
        let pos: Vec3;
        let height: number = 0;
        if (this.tailCell) {
            pos = this.tailCell.getPosition().clone();
        } else {
            pos = this.scrollViewContent.getPosition().clone();
            height = this.scrollViewContent.getComponent(UITransform).height;
        }
        let contentPosition = this.scrollViewContent.getPosition().clone();
        let value: number = contentPosition.y + pos.y + height;
        return value;
    }

    updateButtonLoading() {
        let value = this.getButtonOffsetY();
        this.buttonPos.y = value - 40;
        this.loadingView.setPosition(this.buttonPos);
    }
    /**
     * 刷新底部节点的坐标位置
    */
    updateButtonCell() {
        let value = this.getButtonOffsetY();
        this.buttonPos.y = value;
        this.buttonCell.setPosition(this.buttonPos);
    }

    // 移动到顶端并显示TopCell
    moveTo(pos: Vec3, offsetY: number, callback: Function) {
        this.cancelTween();
        this.scrollView.stopAutoScroll();
        let py = pos.y;
        let position: Vec3 = new Vec3(pos.x, pos.y, pos.z);
        let value = Math.abs(py) - offsetY;
        this.tween = tween(this.node).to(0.2, {}, {
            onUpdate: (target, ratio) => {
                let t = value * ratio + py;
                position.y = t;
                this.scrollView.setContentPosition(position);
            },
        }).call(() => {
            this.cancelTween();
            callback();
        }).start();
    }
    /**
     * 结束顶部loading状态
    */
    cancelTopLoading() {
        this.cancelTween();
        this.hasStartTopLoading = false;
    }

    /**
     * 启动顶部loading状态显示
    */
    startTopLoading() {
        let pos = this.scrollView.getContentPosition();
        this.hasStartTopLoading = true;
        let ht: number = this.topViewOperate.getCellHeight();
        this.moveTo(pos, ht, () => {
            // 加载数据
            this.loadMessage();
            this.scheduleOnce(this.endTopLoading, 1);
        });
    }

    /**
     * 结束顶部loading状态显示
    */
    endTopLoading() {
        let ht: number = this.topViewOperate.getCellHeight() * -1;
        let pos = new Vec3(0, ht, 0);
        this.moveTo(pos, 0, () => {
            this.scrollView.scrollToTop();
            this.hasStartTopLoading = false;
            this.refreshPageView();
        });
    }


    addLoading() {
        if (!this.loadingView.active) {
            this.loadingView.active = true;
        }
    }
    removeLoading() {
        if (this.loadingView.active) {
            this.loadingView.active = false;
        }
    }
    /**
     * 停止缓动、定时器回调、检测是否是缓动状态字段
    */
    cancelTween() {
        if (this.tween) {
            this.tween.stop();
        }
        this.tween = null;
        this.unschedule(this.endTopLoading);
    }

    removeTopElement() {
        this.cancelTopLoading();
        this.removeLoading();
    }


    // 滑动到最低端时触发
    onToBottom() {
        if (this.isLoadNextPageData) {
            return;
        }
        this.isTopShowLoading = false;
        // 先删除顶端显示
        this.removeTopElement();
        // 检测是否需要显示底端cell
        if (this.checkShowButtonCell()) {
            this.startButtonCell();
        } else {
            this.startButtonLoading();
        }
    }

    checkShowButtonCell() {
        if (!this.delegate.checkHasLoadNextPageData()) {
            return true;
        }
        return false;
    }

    removeButtonElement() {
        this.removeButtonCell();
        this.unschedule(this.endButtonCell);
    }

    removeButtonCell() {
        this.buttonCell.active = false;
    }

    addButtonCell() {
        this.buttonCell.active = true;
    }

    startButtonCell() {
        this.addButtonCell();
        this.unschedule(this.endButtonCell);
        this.scheduleOnce(this.endButtonCell, 1);
    }

    // 结束
    endButtonCell() {
        this.removeButtonElement();
    }

    // 销毁底端
    cancelButtonTips() {
        this.removeButtonElement();
    }

    startButtonLoading() {
        this.isLoadNextPageData = true;
        this.delegate.loadNextPageData();
        this.addLoading();
        this.topViewOperate.setHeight(80);
        this.unschedule(this.endButtonLoading);
        this.scheduleOnce(this.endButtonLoading, 1);
    }
    endButtonLoading() {
        this.delegate.refreshPageView();
        this.cancelButtonLoading();
    }
    /**
     * 销毁底端loading
    */
    cancelButtonLoading() {
        this.removeLoading();
        this.isLoadNextPageData = false;
        this.unschedule(this.endButtonLoading);
    }
}
