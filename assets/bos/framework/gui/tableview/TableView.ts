import { _decorator, UITransform, Node, ScrollView, Component, Enum, Layout, director, Widget } from 'cc';
import { TableViewCell, TableViewIndex, TableViewSection } from './TableViewCell';
import { TableViewDirection } from './TablewViewEnum';
import { EventHandler, Mask, size, v2, Size } from 'cc';
import { DEBUG, EDITOR } from 'cc/env';
import { TransformBit } from 'cc';
import { v3 } from 'cc';
import { Vec3 } from 'cc';
import { Vec2 } from 'cc';
import { assert } from 'cc';
const { ccclass, property, requireComponent, disallowMultiple, executeInEditMode } = _decorator;

export interface TableViewDelegate {
    createCell(tableview: TableView, index: number, section: number): Node;
    releaseCell(tableview: TableView, cell: Node, index: number, section: number);
    rowCount(tableview: TableView, section: number);
    createSection(tableview: TableView, section: number): Node;
    releaseSection(tableview: TableView, sectionnode: Node, section: number);
}

enum ScrollEvent {
    ScrollToTop = 0,
    scrollToBottom = 1,
    scrollToLeft = 2,
    scrollToRight = 3,
    scrolling = 4,
    bounceBottom = 6,
    bounceLeft = 7,
    bounceRight = 8,
    bounceTop = 5,
    scrollEnded = 9,
    touchUp = 10,
    scrollEndedWithThreshold = 11,
    scrollBegan = 12,
};

enum ScollDir {
    UP,
    DOWN,
}

export type TableViewRefreshParam = {
    index?: number; // [default = 0] 刷新的 index 
    section?: number; //[default = 0] 刷新的 section
    isFromEnd?: boolean; //[default = false] 控制刷新的 index， section 是指定的是 beginIndex, 还是 EndIndex
    forceUpdate?: boolean; //[default = true] 强制刷新，所有的cell 会重新创建
    keepIndex?: boolean; //[default=false] 是否保留原先的 index，如果true，则不需要传递 index 和 section，使用保留的index
}


let DefaultTableViewDelegate: TableViewDelegate = {
    createCell(tableview: TableView, index: number, section: number): Node {
        return new Node("cell item")
    },
    releaseCell(tableview: TableView, cell: Node, index: number, section: number) {
        cell.removeFromParent();
        cell.destroy();
    },
    rowCount(tableview: TableView, section: number) {
        return 0;
    },
    createSection(tableview: TableView, section: number) {
        return new Node("section item");
    },
    releaseSection(tableview: TableView, sectionNode: Node, section: number) {
        sectionNode.removeFromParent()
        sectionNode.destroy();
    }
};

export enum TableViewEvent {
    REFRESH_DATA_BOTTOM = "tableview-request-data-bottom",
    REFRESH_DATA_TOP = "tableview-request-data-top",
    SCROLLING = "scrolling",
    SCROLL_ENG_WITH_THRESHOLD = "scroll-ended-with-threshold",
    TOUCH_UP = "table_view-touch-up",
    UPDATE_FLOAT_SECTION = "table-view-update-float-section",
};

let TempTableIndex1 = new TableViewIndex(0, 0)
let TempTableIndex2 = new TableViewIndex(0, 0)
let TempTableIndex3 = new TableViewIndex(0, 0)
let GetEndIndex = new TableViewIndex(0, 0)
let NextIndex = new TableViewIndex(0, 0)
let BeforeIndex = new TableViewIndex(0, 0)
let removeBeginIndex = new TableViewIndex(0, 0)
let removeEndIndex = new TableViewIndex(0, 0)
let insertBeginIndex = new TableViewIndex(0, 0)
let insertEndIndex = new TableViewIndex(0, 0)
let updateBeginIndex = new TableViewIndex(0, 0)
let updateEndIndex = new TableViewIndex(0, 0)


function handleCellTransformChange(changeBit: number) {
    if (changeBit & TransformBit.POSITION) {
        console.log("tableview debug handleCellTransformChange", this.name, new Error().stack, this.position)
    }
}

@ccclass('TableView')
@requireComponent(ScrollView)
@requireComponent(UITransform)
@executeInEditMode
@disallowMultiple
export class TableView extends Component {
    public static DirectionType = TableViewDirection;
    public static EventType = TableViewEvent;
    static HEAD_NODE_NAME: string = "$head_layout$";
    static TAIL_NODE_NAME: string = "$tail_layout$";
    static OTHER_NODE_NAME: string = "$other_layout$";
    static VIEW_NODE_NAME: string = "view";
    static CONTENT_NODE_NAME: string = "content";

    @property({
        serializable: true,
    })
    private _direction: TableViewDirection = TableViewDirection.Vertical;
    @property({
        displayName: "direction",
        type: Enum(TableViewDirection),
    })
    get direction() {
        return this._direction;
    }
    set direction(value: TableViewDirection) {
        this._direction = value;
        this.onUpdateDirection();
    }

    @property({
        serializable: true,
        tooltip: "预估cell高"
    })
    private defaultLenght: number = 100;

    @property({
        serializable: true,
        tooltip: "预估section高"
    })
    private defaultSectionLength: number = 0; // 预估 section 高度

    @property({
        serializable: true,
        tooltip: "section view 是否显示在顶部"
    })
    private floatSection: boolean = true; //section view 是否停靠在顶部

    @property({
        displayName: "refreshNeedOffset",
        tooltip: "向下|向上 拉取多长offset 触发 刷新事件",
    })
    public refreshNeedOffset = 0;
    // @property({
    //     serializable: true,
    //     tooltip: "如果设置为true, 当size变化是, 自动滚动到底部不变"
    // })
    // private fixBottom: boolean = false; // size

    @property({
        serializable: true,
        tooltip: "section 数量"
    })
    public sectionCount: number = 1; // section 数量

    private _scrollEanble: boolean = true;
    @property({
        displayName: "scrollable"
    })
    get scrollEanble() {
        return this._scrollEanble;
    }
    set scrollEnable(value: boolean) {
        this._scrollEanble = value;
    }

    @property({
        serializable: true,
        tooltip: "头部空白占位"
    })
    public headGap: number = 0;

    @property({
        serializable: true,
        tooltip: "尾部空白占位"
    })
    public tailGap: number = 0;

    private _delegate: TableViewDelegate = null!;
    get delegate() {
        if (this._delegate == null) return DefaultTableViewDelegate;
        return this._delegate;
    }
    set delegate(value: TableViewDelegate) {
        this._delegate = value;
    }
    private _scrollView: ScrollView = null!;
    private _uiTransform: UITransform = null!;
    private _viewTransform: UITransform = null!;
    private _contentNode: Node = null!;
    private _contentUITransform: UITransform = null!;
    private _contentLayout: Layout = null!;
    private _headTransfrom: UITransform = null!;
    private _tailTranform: UITransform = null!;
    private _otherTransform: UITransform = null!; //当content size < view size 时候填充 contentsize 使 scrollview 能滚动

    private _beginIndex: TableViewIndex = new TableViewIndex(0, 0);
    private _endIndex: TableViewIndex = new TableViewIndex(-1, -1);
    private _lastOffset: number = 0;
    private _cells: Map<number, TableViewCell> = new Map();
    private _sections: Map<Number, TableViewSection> = new Map();

    private _tempCells: Map<number, TableViewCell> = new Map();
    private _tempSections: Map<Number, TableViewSection> = new Map();

    private _fixedSection: TableViewSection = null!;
    private _requestDataEvent: TableViewEvent = null!;
    private _forceUpdateLayout: number = -1;
    private _isUpdating: boolean = false;
    private _isInBottom: boolean = false;
    //----- debug data
    private _contentLastPos: Vec3 = null;
    private _contentLastSize: Size = null;

    get FixedBottom() {
        return this._fixedBottom
    }
    set FixedBottom(value: boolean) {
        this._fixedBottom = value
    }
    private _fixedBottom: boolean = false;

    private updateLayout() {
        // console.log("tableview debug updateLayout")
        this._isUpdating = true;
        this._contentLayout.updateLayout(true);
        this._isUpdating = false;
    }

    private initControls() {
        this._scrollView = this.node.getComponent(ScrollView);
        this._uiTransform = this.node.getComponent(UITransform);

        let findEvent = false;
        let classname = TableView.name
        let funcname = this.scrollViewDidScroll.name
        for (let event of this._scrollView.scrollEvents) {
            if (event.target == this.node &&
                event.component == classname &&
                event.handler == funcname) {
                findEvent = true;
            }
        }
        if (!findEvent) {
            let eventHandler = new EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = classname;
            eventHandler.handler = funcname;
            this._scrollView.scrollEvents.push(eventHandler);
        }

        let view = this.node.getChildByName(TableView.VIEW_NODE_NAME)
        if (view == null) {
            view = new Node(TableView.VIEW_NODE_NAME)
            view.layer = this.node.layer;
            this.node.addChild(view);
        }
        let mask = view.getComponent(Mask) || view.addComponent(Mask)
        mask.type = Mask.Type.GRAPHICS_RECT;

        this._viewTransform = view.getComponent(UITransform) || view.addComponent(UITransform);
        this._viewTransform.setAnchorPoint(0.5, 0.5)

        let content = this._scrollView.content

        if (content == null) {
            content = new Node(TableView.CONTENT_NODE_NAME);
            content.layer = this.node.layer;
            let ui = content.addComponent(UITransform);
            view.addChild(content);
            this._scrollView.content = content
        }
        this._contentNode = content
        this._contentUITransform = content.getComponent(UITransform);

        if (!EDITOR) {
            content.removeAllChildren();
        }

        //console.log("_uiTransform size", this._uiTransform.contentSize)
        if (EDITOR) {
            this._contentUITransform.setContentSize(this._uiTransform.contentSize)
        }

        this._contentLayout = content.getComponent(Layout) || content.addComponent(Layout);
        this._contentLayout.affectedByScale = true;
        this._contentLayout.resizeMode = Layout.ResizeMode.CONTAINER;
        this._contentLayout.alignHorizontal = false;
        this._contentLayout.alignVertical = false;

        if (!EDITOR) {
            let headNode = content.getChildByName(TableView.HEAD_NODE_NAME);
            if (headNode == null) {
                headNode = new Node(TableView.HEAD_NODE_NAME);
                headNode.layer = this.node.layer;
                this._contentNode.addChild(headNode)
            }
            this._headTransfrom = headNode.getComponent(UITransform) || headNode.addComponent(UITransform);
            this._headTransfrom.contentSize = size(0, 0)
            this.updateNodeByDirectionAlgin(this._headTransfrom)
            //  this.addCellNodeEvent(this._headTransfrom)

            let tailNode = content.getChildByName(TableView.TAIL_NODE_NAME);
            if (tailNode == null) {
                tailNode = new Node(TableView.TAIL_NODE_NAME);
                tailNode.layer = this.node.layer;
                this._contentNode.addChild(tailNode)
            }
            this._tailTranform = tailNode.getComponent(UITransform) || tailNode.addComponent(UITransform);
            this._tailTranform.contentSize = size(0, 0)
            this.updateNodeByDirectionAlgin(this._tailTranform)
            //  this.addCellNodeEvent(this._tailTranform)

            let otherNode = content.getChildByName(TableView.OTHER_NODE_NAME)
            if (otherNode == null) {
                otherNode = new Node(TableView.OTHER_NODE_NAME)
                otherNode.layer = this.node.layer
                this._contentNode.addChild(otherNode)
            }
            this._otherTransform = otherNode.getComponent(UITransform) || otherNode.addComponent(UITransform)
            this._otherTransform.contentSize = size(0, 0)
            this.updateNodeByDirectionAlgin(this._otherTransform)
            // this.addCellNodeEvent(this._otherTransform)
        }

        this.onUpdateDirection();
        this.onSizeChange();
        this.setContentOffset(0)
        this.ajustViewPos();

        //this._scrollView.inertia = false
    }

    private updateOtherContent() {
        if (this._contentUITransform == null || this._otherTransform == null || this._viewTransform == null) return;

        let contentLength = this.getItemLength(this._contentUITransform) - this.getItemLength(this._otherTransform)
        let viewLength = this.getItemLength(this._viewTransform)

        let newOtherLength = 0
        if (contentLength < viewLength) {
            newOtherLength = viewLength - contentLength
        } else {
            newOtherLength = 0
        }
        this.setItemSize(this._otherTransform, newOtherLength)
    }

    private onUpdateDirection() {
        let anchor = v2(0.5, 0.5);

        //设置按轴对齐
        switch (this._direction) {
            case TableViewDirection.Horizontal:
                {
                    anchor.x = 0;
                    anchor.y = 0.5;
                    this._contentLayout.type = Layout.Type.HORIZONTAL;
                    this._scrollView.vertical = false;
                    this._scrollView.horizontal = this._scrollEanble;
                    break;
                }

            case TableViewDirection.Vertical:
                {
                    anchor.x = 0.5;
                    anchor.y = 1;
                    this._contentLayout.type = Layout.Type.VERTICAL;
                    this._scrollView.horizontal = false;
                    this._scrollView.vertical = this._scrollEanble;
                    break;
                }
        }

        this._viewTransform.setAnchorPoint(anchor)
        this._contentUITransform.setAnchorPoint(anchor)
    }

    private ajustViewPos() {
        let parentAnchor = this._uiTransform.anchorPoint
        let parentSize = this._uiTransform.contentSize
        let viewSize = this._viewTransform.contentSize
        let anchor = this._viewTransform.anchorPoint

        let left = 0;
        let top = 0;
        let x = left - (parentAnchor.x * parentSize.width) + viewSize.width * anchor.x;
        let y = -top + ((1 - parentAnchor.y) * parentSize.height) - viewSize.height * (1 - anchor.y);
        this._viewTransform.node.setPosition(x, y)
    }

    private moveContentOffset(offset: number) {
        if (offset == 0) return;
        let curOffset = this.getContentOffset()
        this.setContentOffset(curOffset + offset)
    }

    public getContentOffset(): number {
        let pos = this._contentUITransform.node.position;

        let offset = 0;
        switch (this._direction) {
            case TableViewDirection.Horizontal:
                {
                    offset = -pos.x;
                    break;
                }
            case TableViewDirection.Vertical:
                {
                    offset = pos.y
                    break;
                }
        }

        return offset;
    }
    private setContentOffset(offset: number) {
        //     console.log("setContentOffset", offset, new Error().stack)
        let viewSize: Size = this._viewTransform.contentSize;

        let pos = v2(0, 0);

        switch (this._direction) {
            case TableViewDirection.Horizontal:
                {
                    pos.x = -offset;
                    pos.y = 0;
                    break;
                }
            case TableViewDirection.Vertical:
                {
                    pos.x = 0;
                    pos.y = offset;
                    break;
                }
        }
        this._contentUITransform.node.setPosition(pos.x, pos.y);
        this._scrollView.stopAutoScroll()
    }

    protected handleScrollViewScrolling(force: boolean) {
        // if (!this._scrollView.isScrolling() && !force) return;

        let offset = this.getContentOffset();
        if (offset == this._lastOffset) return;
        let scolldir = (offset - this._lastOffset) > 0 ? ScollDir.UP : ScollDir.DOWN;
        this._lastOffset = offset;
        this._isUpdating = true;
        this.scrollUpdateContent(scolldir);
        this._isUpdating = false;
    }

    // protected update(dt: number): void {
    //     this.handleScrollViewScrolling(false)
    // }

    protected scrollViewDidScroll(scrollview: ScrollView, event: number) {
        if (this._delegate == null) return;
        if (event == ScrollEvent.scrollBegan) {
            this._requestDataEvent = null!;
            this._lastOffset = this.getContentOffset();
        } else if (event == ScrollEvent.scrolling) {
            this.handleScrollViewScrolling(true)
        }
    }

    private isSectionCreate(section: number) {
        if (this.defaultSectionLength <= 0) return true;

        return this.getSection(section) != null;
    }

    private updateScollDown() {
        let contentLength = this.getItemLength(this._contentUITransform) - this.getItemLength(this._otherTransform)
        let viewLength = this.getItemLength(this._viewTransform)
        //if (contentLength <= viewLength) return;

        let headLength = this.getItemLength(this._headTransfrom) - this.headGap
        let tailLength = this.getItemLength(this._tailTranform) - this.tailGap

        let offset = this.getContentOffset();
        let dirtyContent = false;

        let newContentLength = headLength - offset + this.headGap
        if (newContentLength > 0) { // 有空白位置 在 head 插入 新 item
            if (this.isFirstIndex(this._beginIndex) && this.getCell(this._beginIndex) != null && this.isSectionCreate(this._beginIndex.section)) {
                if (headLength > 0) {
                    this.setItemSize(this._headTransfrom, this.headGap)
                    dirtyContent = true;
                    this.setContentOffset(0)
                }
                if (this.refreshNeedOffset >= 0 && Math.abs(newContentLength) > this.refreshNeedOffset) {
                    this._requestDataEvent = TableViewEvent.REFRESH_DATA_TOP;
                }
            } else {
                let newcelllength = 0
                let addCount = 0;
                let maxLoop = this.getMaxLoopCount()
                while (newcelllength < newContentLength) {
                    addCount++;
                    if (addCount > maxLoop) {
                        console.log("error!@!!");
                        break;
                    }
                    let curAdd = 0;

                    let cell = this.getCell(this._beginIndex)
                    if (cell == null) //index 对应cell 还未创建则创建插入
                    {
                        cell = this.createCellAndInsert(this._beginIndex, 1)
                        let celllength = cell.getLength(this._direction)
                        newcelllength += celllength
                        curAdd += celllength
                    }

                    if (newcelllength >= newContentLength) break; //已经不够空间了添加section 了
                    if (this._beginIndex.index == 0) //section begin index
                    {
                        let needSection = this.defaultSectionLength > 0
                        let comsection = this.getSection(this._beginIndex.section);
                        if (needSection && comsection == null) // 有 section 且还未添加section
                        {
                            //float section 
                            if (this.floatSection) {
                                if (this._fixedSection && this._fixedSection.section == this._beginIndex.section) {
                                    let floatLength = this._fixedSection.getLength(this._direction);
                                    if (newcelllength + floatLength <= newContentLength) //够显示整个 section
                                    {
                                        newcelllength += floatLength;
                                        curAdd += floatLength
                                        //console.log("update fixd section to insert:", this._fixedSection.section)
                                        { // 将fixedSection 放回 content
                                            this.releaseSection(this._sections.get(this._fixedSection.section))
                                            this._sections.set(this._fixedSection.section, this._fixedSection)
                                            this.insertNodeToContent(this._fixedSection.getUITransform(), 1);
                                            this._fixedSection = null;
                                        }
                                        {
                                            if (this._beginIndex.section > 0)
                                                this.updateFixedSection(this.createSection(this._beginIndex.section - 1, false)) //显示新的 fixed section
                                        }
                                    }
                                    else { // 还不够完整显示sectoin 则继续 float 显示
                                        //console.log("wait to add section!!", this._fixedSection.section);
                                        break; //跳出循环等待下次更多内容继续更新section
                                    }
                                }
                                else { //按理不应该走这里的
                                    if (this._beginIndex.section > 0)
                                        this.updateFixedSection(this.createSection(this._beginIndex.section - 1, false)) //显示新的 fixed section
                                    comsection = this.createSectionAndInsert(this._beginIndex.section, 1)
                                }
                            }
                            else { // 不需要float section 则只要有空间则立即插入section
                                comsection = this.createSectionAndInsert(this._beginIndex.section, 1)
                                if (comsection) {
                                    let sectionLength = comsection.getLength(this._direction);
                                    newcelllength += sectionLength;
                                    curAdd += sectionLength;
                                }
                            }
                        }
                    }

                    let { newIndex, isFirst } = this.getBeforeIndex(this._beginIndex)
                    if (isFirst) {
                        newcelllength = headLength
                        break; //到顶了
                    } else {
                        this._beginIndex.setValue(newIndex);
                    }
                }
                if (headLength < newcelllength)
                    newcelllength = headLength;

                dirtyContent ||= newcelllength > 0;
                this.addItemLength(this._headTransfrom, -newcelllength) //更新head
            }
        }

        let hideLength = (contentLength - tailLength - this.tailGap) - (offset + viewLength)
        //如果前面没有 headLength 没有变化，则代表没有size 可变化，不需要隐藏久的内容
        if (offset > 0 && hideLength > 0) // 有隐藏的tail item
        {
            let canDeleteLength = 0
            let hideCount = 0;
            let maxLoop = this.getMaxLoopCount()
            while (canDeleteLength < hideLength) {
                hideCount++;
                if (hideCount > maxLoop) {
                    console.log("loop to much error");
                    break;
                }

                let cell = this.getCell(this._endIndex);
                if (cell) {
                    let curDelete = cell.getLength(this._direction);
                    let curDeleteSection = null
                    if (this._endIndex.index == 0) {
                        curDeleteSection = this.getSection(this._endIndex.section)
                        if (curDeleteSection) {
                            curDelete += curDeleteSection.getLength(this._direction)
                        }
                    }
                    if (canDeleteLength + curDelete <= hideLength) {
                        this.releaseCell(cell);
                        if (curDeleteSection) {
                            this.releaseSection(curDeleteSection)
                        }
                        canDeleteLength += curDelete;
                    }
                    else //当前 cell 还未完全看不见
                    {
                        break;
                    }
                }

                let { newIndex, isFirst } = this.getBeforeIndex(this._endIndex)
                this._endIndex.setValue(newIndex);
                if (isFirst) { //到顶了
                    break;
                }
            }
            dirtyContent ||= canDeleteLength > 0;
            this.addItemLength(this._tailTranform, canDeleteLength);
        }

        if (dirtyContent)
            this.updateLayout();

        this._isInBottom = this.getItemLength(this._tailTranform) <= this.tailGap
    }

    private isEmptyData() {
        if (this.sectionCount <= 0) return true;

        let count = 0;
        for (let i = 0; i < this.sectionCount; i++) {
            count += this.getSectionCount(i);
            if (count > 0) return false;
        }

        return count <= 0
    }

    private updateScrollUp() {
        let contentLength = this.getItemLength(this._contentUITransform) - this.getItemLength(this._otherTransform)
        let viewLength = this.getItemLength(this._viewTransform)

        // if (contentLength <= viewLength) return;

        let offset = this.getContentOffset();

        let headLength = this.getItemLength(this._headTransfrom) - this.headGap
        let tailLength = this.getItemLength(this._tailTranform) - this.tailGap
        let dataLenght = contentLength - headLength - tailLength - this.headGap - this.tailGap
        let newContentLength = offset + viewLength - headLength - dataLenght - this.headGap;

        let dirtyContent = false;
        if (newContentLength > 0) { // tail 有空白位置需要添加新item
            if (!this.isLastIndex(this._endIndex) || this.getCell(this._endIndex) == null) {
                let insertIndex = this._tailTranform.node.getSiblingIndex(); //
                let newcelllength = 0
                let maxLoop = this.getMaxLoopCount()
                let newCount = 0;
                while (newcelllength < newContentLength) {
                    newCount++;
                    if (newCount > maxLoop) {
                        console.log("loop to much error!");
                        break;
                    }

                    let curAddLenght = 0;
                    if (this.getCell(this._endIndex) != null) { //切换到新添加 cell index
                        let { newIndex, isLast } = this.getNextIndex(this._endIndex)
                        if (isLast) {//到底了
                            newcelllength = tailLength;
                            break;
                        }
                        this._endIndex.setValue(newIndex)
                    }

                    if (this._endIndex.index == 0) { //section begin 
                        let exist = this.getSection(this._endIndex.section) != null
                        let comsection = this.createSectionAndInsert(this._endIndex.section, insertIndex)
                        if (comsection) {
                            insertIndex++;
                            let sectionLength = comsection.getLength(this._direction);
                            if (!exist) {
                                curAddLenght += sectionLength
                                newcelllength += sectionLength
                            }
                        }
                    }

                    let exist = this.getCell(this._endIndex) != null
                    let newcell = this.createCellAndInsert(this._endIndex, insertIndex++)
                    let celllength = newcell.getLength(this._direction)
                    if (!exist) {
                        curAddLenght += celllength
                        newcelllength += celllength
                    }
                }

                if (newcelllength > tailLength)
                    newcelllength = tailLength;

                dirtyContent ||= newcelllength > 0;
                this.addItemLength(this._tailTranform, -newcelllength) //更新head
            } else {
                if (tailLength > 0) {
                    this.setItemSize(this._tailTranform, this.tailGap) //更新head
                    dirtyContent = true;
                }

                if (this.refreshNeedOffset >= 0 && Math.abs(newContentLength) > this.refreshNeedOffset) {
                    this._requestDataEvent = TableViewEvent.REFRESH_DATA_BOTTOM
                }
            }
        }

        let hideLength = offset - headLength - this.headGap
        if (hideLength > 0) { // head 有隐藏部分需要处理
            let canDeleteLength = 0
            let hideCount = 0
            let maxLoop = this.getMaxLoopCount()
            while (canDeleteLength < hideLength) {
                hideCount++;
                if (hideCount > maxLoop) {
                    console.log("loop to much error!");
                    break;
                }
                let curDelete = 0
                let comSection = null;

                if (this._beginIndex.index == 0) { // section begin
                    comSection = this.getSection(this._beginIndex.section);
                    if (comSection) { // section 还未删除则先删除section
                        if (this.floatSection) //浮动section 则将 fixed section 更新成这个删除的section
                        {
                            canDeleteLength += comSection.getLength(this._direction);
                            this._sections.delete(comSection.section);
                            this.updateFixedSection(comSection);
                            comSection = null;
                        }
                        else //不 float 的时候需要等整个 section 看不见才能删除
                        {
                            curDelete += comSection.getLength(this._direction);
                        }
                    }
                }
                if (canDeleteLength + curDelete > hideLength) break; //已经没有空余位置删除 cell 了

                let cell = this.getCell(this._beginIndex);
                if (cell) curDelete += cell.getLength(this._direction);

                if (canDeleteLength + curDelete > hideLength) break; // 还有显示部分还不能回收 beginIndex

                canDeleteLength += curDelete

                if (comSection) this.releaseSection(comSection)
                if (cell) this.releaseCell(cell)

                let { newIndex, isLast } = this.getNextIndex(this._beginIndex)
                if (isLast) // 到底了
                {
                    break
                }
                this._beginIndex.setValue(newIndex)
            }
            dirtyContent ||= canDeleteLength > 0;
            this.addItemLength(this._headTransfrom, canDeleteLength);
        }

        if (dirtyContent)
            this.updateLayout();

        this._isInBottom = this.getItemLength(this._tailTranform) <= this.tailGap
    }
    private scrollUpdateContent(scolldir: ScollDir) {
        if (this.isEmptyData()) return;

        switch (scolldir) {
            case ScollDir.UP:
                return this.updateScrollUp();
            case ScollDir.DOWN:
                return this.updateScollDown();
        }
    }

    onSizeChange() {
        this._viewTransform.setContentSize(this._uiTransform.contentSize)
        let content_size = this._contentUITransform.contentSize.clone();
        switch (this._direction) {
            case TableViewDirection.Horizontal:
                {
                    content_size.height = this._uiTransform.height;
                    if (EDITOR) content_size.width = this._uiTransform.width;
                    break;
                }
            case TableViewDirection.Vertical:
                {
                    content_size.width = this._uiTransform.width;
                    if (EDITOR) content_size.height = this._uiTransform.height;
                    break;
                }
        }
        this._contentUITransform.setContentSize(content_size);
        this.ajustViewPos();

        let view_length = this.get_view_length();
        if (this._fixedBottom) {
            this.update_view_content_from_end(view_length)
            this.resetOffsetToBottom()
        } else {
            this.update_view_content(view_length);
        }

    }

    onContentTransformChange(changeBit: number) {
        if (changeBit & TransformBit.POSITION) {
            let curpos = this._contentNode.position.clone()
            //console.log("debug tableview position", curpos, new Error().stack)
            if (this._contentLastPos != null) {
                let offset = Math.abs(curpos.y - this._contentLastPos.y)
                if (offset > 500) {
                    let stack = (new Error()).stack
                    console.log("debug tableview position", director.getTotalFrames(), offset, curpos, this._contentLastPos, stack)
                }
            }
            this._contentLastPos = curpos;
        }
    }

    onContentSizeChange() {
        // let curSize = this._contentUITransform.contentSize.clone();
        // if (this._contentLastSize != null) {
        //     let offset = curSize.height - this._contentLastSize.height
        //     if (Math.abs(offset) > 100) {
        //         let stack = (new Error()).stack
        //         console.log("debug tableview size", director.getTotalFrames(), offset, curSize, this._contentLastSize, stack)
        //     }
        // }
        // this._contentLastSize = curSize

        //只处理由于 cell size变化的情况非自己内部逻辑触发的size变化不需要处理
        if (!this._isUpdating && this._isInBottom) {
            this.resetOffsetToBottom();
        }
        this.updateOtherContent()
    }

    onAnchorChange() {
        this.ajustViewPos();
    }

    handleTouchUp() {
        if (this._requestDataEvent != null) {
            this.node.emit(this._requestDataEvent)
            this._requestDataEvent = null!;
        }
        this.node.emit(TableViewEvent.TOUCH_UP)
    }

    protected onEnable(): void {
        this.node.on(Node.EventType.SIZE_CHANGED, this.onSizeChange, this)
        this.node.on(Node.EventType.ANCHOR_CHANGED, this.onAnchorChange, this)

        this.node.on(Node.EventType.TOUCH_END, this.handleTouchUp, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.handleTouchUp, this)
        // this._contentNode.on(Node.EventType.TRANSFORM_CHANGED, this.onContentTransformChange, this)
        this._contentNode.on(Node.EventType.SIZE_CHANGED, this.onContentSizeChange, this)

    }

    protected onDisable(): void {
        this.node.off(Node.EventType.SIZE_CHANGED, this.onSizeChange, this)
        this.node.off(Node.EventType.ANCHOR_CHANGED, this.onAnchorChange, this)
        this.node.off(Node.EventType.TOUCH_END, this.handleTouchUp, this)
        this.node.off(Node.EventType.TOUCH_CANCEL, this.handleTouchUp, this)
        //  this._contentNode.off(Node.EventType.TRANSFORM_CHANGED, this.onContentTransformChange, this)
        this._contentNode.off(Node.EventType.SIZE_CHANGED, this.onContentSizeChange, this)
    }

    private removeComponent() {
        if (this._viewTransform) {
            this._viewTransform.node.getComponent(Widget)?.destroy();
        }

        if (this._contentUITransform) {
            this._contentUITransform.node.getComponent(Widget)?.destroy();
        }
    }

    protected onLoad(): void {
        this.initControls();
        this.removeComponent();
    }

    private get_view_length() {
        let size = this._viewTransform.contentSize
        switch (this._direction) {
            case TableViewDirection.Horizontal:
                return size.width;
            case TableViewDirection.Vertical:
                return size.height;
        }
    }

    //不包含启动和终点
    getDefaultLengthBetweenIndex(beginIndex: Readonly<TableViewIndex>, endIndex: Readonly<TableViewIndex>, containBegin: boolean = false) {
        let length = 0;
        let sectionLength = this.defaultSectionLength
        if (sectionLength < 0) sectionLength = 0;

        if (beginIndex.section != endIndex.section) {
            let curSectionCount = this.getSectionCount(beginIndex.section);
            let beginCount = curSectionCount - beginIndex.index - 1
            if (beginCount < 0) beginCount = 0;
            if (containBegin) beginCount++;
            length += beginCount * this.defaultLenght
            length += (endIndex.index) * this.defaultLenght
            if (endIndex.index > 0)
                length += sectionLength

            for (let section = beginIndex.section + 1; section < endIndex.section; section++) {
                let count = this.getSectionCount(section);
                length += count * this.defaultLenght + sectionLength;
            }
        }
        else {
            let count = endIndex.index - beginIndex.index - 1;
            if (containBegin)
                count++;

            if (count < 0) {
                count = 0;
            }
            length = count * this.defaultLenght
        }

        return length
    }

    getCellCountBetweenIndex(beginIndex: Readonly<TableViewIndex>, endIndex: Readonly<TableViewIndex>) {
        let allCount = 0;
        let sectionAddCount = 1
        if (this.defaultSectionLength <= 0) sectionAddCount = 0;

        if (beginIndex.section != endIndex.section) {
            let curSectionCount = this.getSectionCount(beginIndex.section);
            let beginCount = curSectionCount - beginIndex.index - 1
            allCount += beginCount
            allCount += (endIndex.index) + sectionAddCount

            for (let section = beginIndex.section + 1; section < endIndex.section; section++) {
                let count = this.getSectionCount(section);
                allCount += count + sectionAddCount;
            }
        }
        else {
            let count = endIndex.index - beginIndex.index - 2;
            if (count < 0) {
                count = 0;
            }
            allCount = count;
        }

        return allCount
    }

    private getCell(index: Readonly<TableViewIndex>) {
        let hash_index = index.hash_index;
        let cell = this._cells.get(hash_index)
        if (cell) return cell;

        return null;
    }

    private releaseCell(cell: TableViewCell, del: boolean = true) {
        if (del) {
            let hash_index = cell.index.hash_index
            this._cells.delete(hash_index)
        }
        cell.node.active = false;
        this.removeCellNodeEvent(cell.getUITransform())
        //console.log("debug tableview releaseCell", director.getTotalFrames(), cell.getUITransform().contentSize)
        this.delegate.releaseCell(this, cell.node, cell.index.index, cell.index.section)
    }

    private createCell(index: Readonly<TableViewIndex>): TableViewCell {
        // console.log("tableview debug createCell", index.index, index.section)
        let hash_index = index.hash_index;
        let cell = this._cells.get(hash_index)
        if (cell) return cell;
        let cellnode = this.delegate.createCell(this, index.index, index.section);
        if (cellnode == null) {
            throw new Error("delegate create cell return null")
        }
        cellnode.active = true;
        cell = cellnode.getComponent(TableViewCell) || cellnode.addComponent(TableViewCell)
        cell.index.index = index.index;
        cell.index.section = index.section;
        this._cells.set(hash_index, cell);
        return cell
    }

    private getSectionMaxIndex(section: number) {
        let sectionCount = this.getSectionCount(section)
        if (sectionCount <= 0) return 0;

        return sectionCount - 1;
    }

    private getBeforeIndex(index: Readonly<TableViewIndex>): { newIndex: Readonly<TableViewIndex>, isFirst: boolean } {
        BeforeIndex.index = index.index;
        BeforeIndex.section = index.section;
        let isFirst = false;
        if (BeforeIndex.index > 0) {
            BeforeIndex.index--;
        }
        else {
            if (BeforeIndex.section > 0) {
                BeforeIndex.section -= 1;
                BeforeIndex.index = this.getSectionCount(BeforeIndex.section) - 1;
                if (BeforeIndex.index < 0)
                    BeforeIndex.index = 0;
            } else {
                isFirst = true;
            }
        }

        return { newIndex: BeforeIndex, isFirst: isFirst };
    }

    private getNextIndex(index: Readonly<TableViewIndex>, removeCount: number = 0): { newIndex: Readonly<TableViewIndex>, isLast: boolean } {
        NextIndex.index = index.index;
        NextIndex.section = index.section;
        let isLast = false;
        let count = this.getSectionCount(NextIndex.section) - removeCount
        if (NextIndex.index < count - 1) {
            NextIndex.index++;
        } else {
            if (NextIndex.section < this.sectionCount - 1) {
                NextIndex.section++;
                NextIndex.index = 0;
            }
            else {
                isLast = true;
            }
        }

        return { newIndex: NextIndex, isLast: isLast }
    }

    private isFirstIndex(index: Readonly<TableViewIndex>) {
        return index.section == 0 && index.index == 0;
    }

    private isLastIndex(index: Readonly<TableViewIndex>) {
        let maxIndex = this.getSectionMaxIndex(index.section)
        return index.section == this.sectionCount - 1 && index.index == maxIndex;
    }

    private createCellAndInsert(index: Readonly<TableViewIndex>, insertIndex: number): TableViewCell {
        // console.log("tableview debug createCellAndInsert", index, insertIndex)
        let cell = this.createCell(index);
        this.insertNodeToContent(cell.getUITransform(), insertIndex);

        if (DEBUG) {
            cell.node.name = `${index.section}-${index.index}`
        }

        return cell;
    }

    private updateFixedSection(sectioncom: TableViewSection) {
        if (this._fixedSection) {
            this._fixedSection.node.active = false;
            this.delegate.releaseSection(this, this._fixedSection.node, this._fixedSection.section)
            this._fixedSection = null;
        }

        this._fixedSection = sectioncom

        if (this._fixedSection == null) return;
        this._fixedSection.node.active = true;
        this._viewTransform.node.addChild(this._fixedSection.node);
        let viewSize = this._viewTransform.contentSize
        let anchorview = this._viewTransform.anchorPoint
        let nodeAnchor = sectioncom.getUITransform().anchorPoint;
        let sectionsize = sectioncom.getUITransform().contentSize;

        let x = 0;
        let y = 0;

        switch (this._direction) {
            case TableViewDirection.Horizontal:
                {
                    x = -(anchorview.x * viewSize.width) + sectionsize.width * nodeAnchor.x;
                    y = viewSize.height / 2 - (anchorview.y * viewSize.height) - sectionsize.height / 2 + sectionsize.height * nodeAnchor.y;
                    break;
                }
            case TableViewDirection.Vertical:
                {
                    x = viewSize.width / 2 - (anchorview.x * viewSize.width) - sectionsize.width / 2 + sectionsize.width * nodeAnchor.x;
                    y = viewSize.height - (anchorview.y * viewSize.height) - sectionsize.height + sectionsize.height * nodeAnchor.y;
                    break;
                }
        }
        this._fixedSection.node.setPosition(x, y);
        this.updateNodeByDirectionAlgin(this._fixedSection.getUITransform())
        this.node.emit(TableViewEvent.UPDATE_FLOAT_SECTION, this._fixedSection.section)
    }

    private releaseSection(comsection: Readonly<TableViewSection>, del: boolean = true) {
        if (comsection == null) return;
        if (del) {
            this._sections.delete(comsection.section)
        }

        comsection.node.active = false;
        this.removeCellNodeEvent(comsection.getUITransform())
        this.delegate.releaseSection(this, comsection.node, comsection.section)
    }

    private getSection(section: number): Readonly<TableViewSection> {
        if (this.defaultSectionLength <= 0) return null;

        let uisection = this._sections.get(section)
        if (uisection != null) return uisection;

        return null;
    }

    private createSection(section: number, addcache: boolean = true): TableViewSection {
        if (this.defaultSectionLength <= 0)
            return null;

        let uisection = this._sections.get(section)
        if (uisection != null) {
            if (!addcache) {
                this._sections.delete(section);
            }
            return uisection;
        }

        let sectionnode = this.delegate.createSection(this, section)
        if (sectionnode == null) {
            throw new Error("delegate create section return null")
        }
        sectionnode.active = true;
        uisection = sectionnode.getComponent(TableViewSection) || sectionnode.addComponent(TableViewSection)
        uisection.setSection(section);

        if (addcache) {
            this._sections.set(section, uisection)
        }

        return uisection;
    }

    private updateNodeByDirectionAlgin(nodeui: UITransform) {
        let node = nodeui.node;
        let viewsize = this._viewTransform.contentSize;
        let curpos = node.position
        let viewanchor = this._viewTransform.anchorPoint
        let nodeanchor = nodeui.anchorPoint
        let nodesize = nodeui.contentSize

        switch (this._direction) {
            case TableViewDirection.Horizontal:
                {
                    let y = viewsize.height * (1 - viewanchor.y) - nodesize.height * (1 - nodeanchor.y)
                    node.setPosition(curpos.x, y)
                    break;
                }
            case TableViewDirection.Vertical:
                {
                    let x = nodesize.width * nodeanchor.x - viewsize.width * viewanchor.x
                    node.setPosition(x, curpos.y)
                    break;
                }
        }
    }

    private handleCellItemSizeChange() {

    }



    private addCellNodeEvent(nodeui: UITransform) {
        let node = nodeui.node
        let nodecallback = (node as any).nodecallback
        if (nodecallback == null) {
            let self = this;
            //let lastSize = nodeui.contentSize.clone();
            (node as any).nodecallback = function () {
                self.updateNodeByDirectionAlgin(nodeui)
                // let cursize = nodeui.contentSize.clone();
                // let offset = cursize.height - lastSize.height
                // console.log("debug tableview size change", director.getTotalFrames(), node.name, offset, lastSize, nodeui.contentSize, new Error().stack)
                // lastSize = cursize
            }
        }
        node.on(Node.EventType.SIZE_CHANGED, (node as any).nodecallback, nodeui)

        // node.on(Node.EventType.TRANSFORM_CHANGED, handleCellTransformChange, node)
    }

    private removeCellNodeEvent(nodeui: UITransform) {
        let node = nodeui.node
        let nodecallback = (node as any).nodecallback
        if (nodecallback == null) return;
        node.off(Node.EventType.SIZE_CHANGED, nodecallback, nodeui)
        // node.off(Node.EventType.TRANSFORM_CHANGED, handleCellTransformChange, node)
    }

    private insertNodeToContent(nodeui: UITransform, insertIndex: number) {
        let node = nodeui.node
        nodeui.node.active = true;
        if (insertIndex < 0) {
            let count = this._contentNode.children.length;
            insertIndex = count + insertIndex + 1;
        }
        if (node.parent != this._contentNode) {
            this._contentNode.insertChild(node, insertIndex)
        } else if (node.getSiblingIndex() != insertIndex) {
            let oldindex = node.getSiblingIndex()
            if (oldindex < insertIndex) {
                insertIndex--;
            }
            node.setSiblingIndex(insertIndex)
        }
        this.addCellNodeEvent(nodeui)
        this.updateNodeByDirectionAlgin(nodeui)
    }

    private createSectionAndInsert(section: number, index: number): Readonly<TableViewSection> {
        let comSection = this.createSection(section)
        if (comSection == null) return;

        this.insertNodeToContent(comSection.getUITransform(), index);
        if (DEBUG)
            comSection.node.name = `section:${section}`
        return comSection;
    }

    private getSectionCount(sesction: number) {
        if (sesction == -1) return 0;
        return this.delegate.rowCount(this, sesction)
    }

    private freeAllCells() {
        for (let cell of this._cells.values()) {
            //不在当前显示方位则回收
            this.releaseCell(cell, false)
        }
        this._cells.clear();
        for (let comsection of this._sections.values()) {
            this.releaseSection(comsection, false)
        }
        this._sections.clear();
    }

    private update_view_content(data_length: number, headLength: number = -1, tailLength: number = -1, forceUpdate: boolean = false): number {
        if (this._delegate == null) return 0;
        //data length 增加一个 item length 因为可能cell 会存在部分没隐藏而没删除的问题，导致尾部留空了
        data_length += this.defaultLenght
        if (forceUpdate) {
            this.freeAllCells();
        } else {
            this.copyCellItems()
        }
        this._isUpdating = true;
        let cur_length = 0;
        if (headLength == -1) {
            //自动计算从 firstIndex 到 beginIndex 的 default length
            TempTableIndex1.section = 0
            TempTableIndex1.index = 0
            headLength = this.getDefaultLengthBetweenIndex(TempTableIndex1, this._beginIndex, true)
        }

        this.setItemSize(this._headTransfrom, headLength + this.headGap) // 更新head length
        TempTableIndex1.section = this._beginIndex.section;
        TempTableIndex1.index = this._beginIndex.index;
        // let offset_lenght = 0; //实际大小和预计大小的差值
        let insertIndex = 1;

        while (true) {
            let cur_section_count = this.getSectionCount(TempTableIndex1.section);
            while (TempTableIndex1.index <= cur_section_count - 1) {
                if (TempTableIndex1.index == 0) {
                    if (!forceUpdate) this.removeTempSection(TempTableIndex1.section);
                    let comSection = this.createSectionAndInsert(TempTableIndex1.section, insertIndex);
                    if (comSection) {
                        insertIndex++;
                        let section_length = comSection.getLength(this._direction)
                        cur_length += section_length
                        //  offset_lenght += section_length - this.defaultSectionLength
                    }
                }
                if (!forceUpdate) this.removeTempCell(TempTableIndex1)
                let cell = this.createCellAndInsert(TempTableIndex1, insertIndex++);
                let cell_lenght = cell.getLength(this._direction);
                cur_length += cell_lenght
                //  offset_lenght += cell_lenght - this.defaultLenght

                if (cur_length >= data_length) {
                    break;
                } else {
                    if (TempTableIndex1.index < cur_section_count - 1) {
                        TempTableIndex1.index++;
                    } else {
                        break;
                    }
                }
            }

            if (this.sectionCount - 1 > TempTableIndex1.section && cur_length < data_length) {
                TempTableIndex1.section++;
                TempTableIndex1.index = 0;
            } else {
                break;
            }
        }
        this._endIndex.section = TempTableIndex1.section
        this._endIndex.index = TempTableIndex1.index;

        if (tailLength == -1) {
            //自动计算从 endIndex 到 lastIndex 的default length
            TempTableIndex2.section = this.sectionCount
            TempTableIndex2.index = 0
            tailLength = this.getDefaultLengthBetweenIndex(this._endIndex, TempTableIndex2)
        }
        this.update_float_fixed_section();
        this.freeTempCellItems()
        this.setItemSize(this._tailTranform, tailLength + this.tailGap)

        this.updateLayout();

        let newContentLength = this.getItemLength(this._contentUITransform) - this.getItemLength(this._otherTransform)
        let viewLength = this.getItemLength(this._viewTransform)
        this._isInBottom = newContentLength > viewLength && tailLength <= 0;
        this._isUpdating = false;

        return headLength
    }

    private copyCellItems() {
        this._tempCells.clear();
        this._tempSections.clear();

        this._cells.forEach((value: TableViewCell, key: number) => {
            this._tempCells.set(key, value)
        })

        this._sections.forEach((value: TableViewSection, key: number) => {
            this._tempSections.set(key, value);
        })
    }

    private removeTempCell(index: Readonly<TableViewIndex>) {
        let hash_index = index.hash_index;
        this._tempCells.delete(hash_index)
    }

    private removeTempSection(section: number) {
        this._tempSections.delete(section);
    }

    private freeTempCellItems() {
        this._tempSections.forEach((section: TableViewSection, key: number) => {
            this.releaseSection(section);
        })
        this._tempSections.clear();

        this._tempCells.forEach((cell: TableViewCell) => {
            this.releaseCell(cell)
        })
        this._tempCells.clear();
    }

    private update_view_content_from_end(data_length: number, headLength: number = -1, tailLength: number = -1, forceUpdate: boolean = false): number {
        if (this._delegate == null) return 0;
        this._isUpdating = true;
        //data length 增加一个 item length 因为可能cell 会存在部分没隐藏而没删除的问题，导致尾部留空了
        data_length += this.defaultLenght

        if (tailLength == -1) {
            //自动计算从 endIndex 到 lastIndex 的default length
            TempTableIndex2.section = this.sectionCount
            TempTableIndex2.index = 0
            tailLength = this.getDefaultLengthBetweenIndex(this._endIndex, TempTableIndex2)
        }
        if (forceUpdate) {
            this.freeAllCells()
        } else {
            this.copyCellItems();
        }

        this.setItemSize(this._tailTranform, tailLength + this.tailGap)

        this._beginIndex.section = this._endIndex.section;
        this._beginIndex.index = this._endIndex.index;
        // let offset_lenght = 0; //实际大小和预计大小的差值
        let insertIndex = this._tailTranform.node.getSiblingIndex();

        let cur_length = 0;
        while (true) {
            let cur_section_count = this.getSectionCount(TempTableIndex1.section);
            if (this._beginIndex.index >= 0 && this._beginIndex.index < cur_section_count) {
                if (!forceUpdate) this.removeTempCell(this._beginIndex)
                let cell = this.createCellAndInsert(this._beginIndex, insertIndex);
                insertIndex = cell.node.getSiblingIndex()
                //console.log("cell index", cell.node.name, insertIndex)
                let cell_lenght = cell.getLength(this._direction);
                cur_length += cell_lenght

                if (this._beginIndex.index == 0) {
                    if (!forceUpdate) this.removeTempSection(this._beginIndex.section)
                    let comSection = this.createSectionAndInsert(this._beginIndex.section, insertIndex);
                    if (comSection) {
                        insertIndex = comSection.node.getSiblingIndex()
                        let section_length = comSection.getLength(this._direction)
                        cur_length += section_length
                        //  offset_lenght += section_length - this.defaultSectionLength
                    }
                }
            }

            //  offset_lenght += cell_lenght - this.defaultLenght
            if (cur_length >= data_length) {
                break;
            } else {
                let { newIndex, isFirst } = this.getBeforeIndex(this._beginIndex)
                if (isFirst) break;
                this._beginIndex.setValue(newIndex)
            }
        }

        if (headLength == -1) {
            //自动计算从 firstIndex 到 beginIndex 的 default length
            TempTableIndex1.section = 0
            TempTableIndex1.index = 0
            headLength = this.getDefaultLengthBetweenIndex(TempTableIndex1, this._beginIndex, true)
        }

        this.setItemSize(this._headTransfrom, headLength + this.headGap) // 更新head length
        this.update_float_fixed_section();
        this.freeTempCellItems()
        this.updateLayout();

        let newContentLength = this.getItemLength(this._contentUITransform) - this.getItemLength(this._otherTransform)
        let viewLength = this.getItemLength(this._viewTransform)

        //console.log("headLenght", headLength, cur_length, viewLength, this._beginIndex, this._endIndex)
        let newContentOffset = 0
        if (newContentLength > viewLength) {
            this._isInBottom = tailLength <= 0
            if (tailLength <= 0)
                newContentOffset = newContentLength - viewLength
            else
                newContentOffset = newContentLength - tailLength - this.tailGap - viewLength
        } else {
            this._isInBottom = false;
        }
        this._isUpdating = false;
        return newContentOffset
    }

    private update_float_fixed_section() {
        if (this.defaultSectionLength <= 0 || !this.floatSection) return;
        if (!this.isSectionCreate(this._beginIndex.section)) { //当前需要显示 fixed section
            //当前显示的section 和需要的是一致的则不需要操作
            if (this._fixedSection && this._fixedSection.section == this._beginIndex.section) {
                this.updateNodeByDirectionAlgin(this._fixedSection.getUITransform());// 更新下节点的对齐位置
                return; //
            } else {//需要更新 fixed section
                this.removeTempSection(this._beginIndex.section);
                this.updateFixedSection(this.createSection(this._beginIndex.section, false));
            }
        } else { //当前不需要显示float fixed section
            this.updateFixedSection(null)
        }
    }

    private resetCellIndex(oldIndex: Readonly<TableViewIndex>, newIndex: Readonly<TableViewIndex>) {
        let hash_index = oldIndex.hash_index
        let cell = this._cells.get(hash_index);
        if (cell == null) return;

        cell.index.setValue(newIndex)
        this._cells.delete(hash_index)
        this._cells.set(newIndex.hash_index, cell)

        if (DEBUG) {
            cell.node.name = `${newIndex.section}-${newIndex.index}`
        }
    }

    private getValidContentLength() {
        return this.getItemLength(this._contentUITransform) - this.getItemLength(this._otherTransform);
    }

    /*
    *   desc : update visible cell  index if section == set section
    *   param section: update section 
    *   param offsetIndex:  index change offset
    *   param updateHead: update from head or tail
    */
    public refreshCellIndex(param: { section: number, offsetIndex: number, updateHead: boolean }) {
        let { section, offsetIndex, updateHead } = param;

        if (offsetIndex == 0) return;

        let resetIndex: { oldIndex: number, newIndex: number }[] = []
        for (let cell of this._cells.values()) {
            if (cell.index.section == section) {
                resetIndex.push({ oldIndex: cell.index.index, newIndex: cell.index.index + offsetIndex })
            }
        }

        if (offsetIndex < 0) {
            resetIndex.sort((a, b) => {
                return a.newIndex - b.newIndex
            })
        } else {
            resetIndex.sort((a, b) => {
                return b.newIndex - a.newIndex
            })
        }

        if (this._beginIndex.section == section) {
            this._beginIndex.index += offsetIndex;
        }

        if (this._endIndex.section == section) {
            this._endIndex.index += offsetIndex;
        }

        let newIndex = TempTableIndex1
        let oldIndex = TempTableIndex2

        for (let item of resetIndex) {
            newIndex.setValue2(section, item.newIndex)
            oldIndex.setValue2(section, item.oldIndex)
            this.resetCellIndex(oldIndex, newIndex)
        }

        let length = offsetIndex * this.defaultLenght
        let offset = this.getContentOffset()
        if (updateHead) {
            this.addItemLength(this._headTransfrom, length)
            this.setContentOffset(offset + length)
        } else {
            this.addItemLength(this._tailTranform, length)
        }

        this.updateLayout()
    }

    protected updateFromEndEmptyLength(emptyLength: number) {
        let addLength = 0
        insertBeginIndex.setValue(this._endIndex)
        let lastCell = this.getCell(this._endIndex)
        let insertIndex = lastCell.node.getSiblingIndex() + 1
        while (addLength < emptyLength) {
            let { newIndex, isLast } = this.getNextIndex(this._endIndex)
            if (isLast) break;
            let newCell = this.createCellAndInsert(newIndex, insertIndex++)
            addLength += newCell.getLength(this._direction)
        }

        return addLength
    }

    protected resetCellIndexList(section: number, beginIndex: Readonly<TableViewIndex>, endIndex: Readonly<TableViewIndex>, offset: number) {
        if (beginIndex.cmp(endIndex) > 0) return;
        if (offset == 0) return;

        if (offset > 0) {
            let curIndex = TempTableIndex3
            let updateIndex = updateBeginIndex
            curIndex.setValue(endIndex)
            while (curIndex.cmp(beginIndex) >= 0) {
                if (section != curIndex.section) continue;
                updateIndex.setValue(curIndex)
                updateIndex.index += offset;
                this.resetCellIndex(curIndex, updateIndex)
                let { newIndex, isFirst } = this.getBeforeIndex(curIndex)
                if (isFirst) break;
                curIndex.setValue(newIndex)
            }
        } else {
            let curIndex = TempTableIndex3
            let updateIndex = updateBeginIndex
            curIndex.setValue(beginIndex)
            while (curIndex.cmp(endIndex) <= 0) {
                if (section != curIndex.section) continue;
                updateIndex.setValue(curIndex)
                updateIndex.index += offset;
                this.resetCellIndex(curIndex, updateIndex)
                let { newIndex, isLast } = this.getNextIndex(curIndex)
                if (isLast) break;
                curIndex.setValue(newIndex)
            }
        }
    }

    /**
     * @zh 将指定位置 cell 移动到指定 toIndex 位置，移动前需要提前将数据移动完成
    */
    public moveSectionRow(section: number, fromIdx: number, toIdx: number) {
        let fromIndex = TempTableIndex1
        let toIndex = TempTableIndex2
        fromIndex.setValue2(section, fromIdx)
        toIndex.setValue2(section, toIdx)
        let defaultLenght = this.defaultLenght
        if (fromIndex.cmp(this._beginIndex) < 0) {
            if (toIndex.cmp(this._beginIndex) < 0) {
                //删除和插入都在 头部不可见区域 不需要处理
            } else if (toIndex.cmp(this._endIndex) > 0) {
                //从头部删除 插入 到尾部不可见区域
                this.addItemLength(this._headTransfrom, -defaultLenght)
                this.addItemLength(this._tailTranform, defaultLenght)
                this.moveContentOffset(-defaultLenght)
                this.resetCellIndexList(section, this._beginIndex, this._endIndex, -1)
                if (this._beginIndex.section == section) {
                    this._beginIndex.index--;
                }
                if (this._endIndex.section == section) {
                    this._endIndex.index--;
                }
            } else {
                //从头部不可见区域 插入可见区域  beginIndex <= toIndex <= endIndex
                let cell = this.getCell(toIndex)
                let insertIndex = cell.node.getSiblingIndex()

                this.resetCellIndexList(section, toIndex, this._endIndex, 1)
                assert(toIndex.index > 0)
                toIndex.index -= 1; // toIndex 之前那个
                this.resetCellIndexList(section, this._beginIndex, toIndex, -1)
                toIndex.index += 1;

                if (this._beginIndex.section == section && this._beginIndex.cmp(toIndex) < 0) {
                    this._beginIndex.index -= 1
                }

                if (this._endIndex.section == section) {
                    let offsetIndex = this._endIndex.cmp(toIndex) < 0 ? -1 : 1
                    this._endIndex.index += offsetIndex
                }

                //因为因为在前面删了一个cell，左右最新的toIndex 需要 -1
                toIndex.index--;
                let newcell = this.createCellAndInsert(toIndex, insertIndex)
                let newLength = newcell.getLength(this._direction)
                if (newLength < defaultLenght) {
                    this.updateFromEndEmptyLength(defaultLenght - newLength)
                }
                this.addItemLength(this._headTransfrom, -defaultLenght)
                this.moveContentOffset(-defaultLenght)
                this.updateLayout()
            }
        } else if (fromIndex.cmp(this._endIndex) > 0) {
            if (toIndex.cmp(this._beginIndex) < 0) {
                //从尾部不可见区域插入 头部不可见区域
                this.addItemLength(this._tailTranform, -defaultLenght)
                this.addItemLength(this._headTransfrom, defaultLenght)
                this.resetCellIndexList(section, this._beginIndex, this._endIndex, 1)
                if (this._beginIndex.section == section) {
                    this._beginIndex.index++;
                }
                if (this._endIndex.section == section) {
                    this._endIndex.index++;
                }
                this.moveContentOffset(defaultLenght)
            } else if (toIndex.cmp(this._endIndex) > 0) {
                //从尾部不可见区域插入 尾部不可见区域
            } else {
                //从尾部不可见区域插入可见区域
                let cell = this.getCell(toIndex)
                let insertIndex = cell.node.getSiblingIndex()
                this.resetCellIndexList(section, toIndex, this._endIndex, 1)

                if (this._endIndex.section == section) {
                    this._endIndex.index++;
                }
                let newcell = this.createCellAndInsert(toIndex, insertIndex)
                let newLength = newcell.getLength(this._direction)
                this.addItemLength(this._tailTranform, -newLength)
            }
        } else {
            //  begin_index <= fromIndex <= end_index 
            if (toIndex.cmp(this._beginIndex) < 0) {
                //从可见区域删除 添加到头部不可见区域 
                let cell = this.getCell(fromIndex)
                let cellLength = cell.getLength(this._direction)
                this.releaseCell(cell)

                //begin - fromindex 之前的cell index reset
                fromIndex.index--;
                this.resetCellIndexList(section, this._beginIndex, fromIndex, 1)
                fromIndex.index++;

                if (section == this._beginIndex.section && this._beginIndex.cmp(fromIndex) <= 0) {
                    this._beginIndex.index++;
                }

                //当 endindex == fromIndex 则代表最后一个 cell 被移走了 则 endIndex 需要向前移动
                if (this._endIndex.cmp(fromIndex) == 0) {
                    this._endIndex.index--;
                }
                this.addItemLength(this._headTransfrom, cellLength)
                this.updateFromEndEmptyLength(cellLength)
                this.moveContentOffset(cellLength)
            } else if (toIndex.cmp(this._endIndex) > 0) {
                //从可见区域删除 添加到尾部不可见区域
                let cell = this.getCell(fromIndex)
                let cellLength = cell.getLength(this._direction)
                this.releaseCell(cell)

                fromIndex.index++;
                this.resetCellIndexList(section, fromIndex, this._endIndex, -1)
                fromIndex.index--;

                let needMove = false;
                if (section == this._beginIndex.section && this._beginIndex.cmp(fromIndex) >= 0) {
                    this._beginIndex.index++;
                    needMove = true;
                }

                if (section == this._endIndex.section && this._endIndex.cmp(fromIndex) >= 0) {
                    this._endIndex.index--;
                }

                this.addItemLength(this._tailTranform, cellLength)
                this.updateFromEndEmptyLength(cellLength)
                if (needMove) this.moveContentOffset(-cellLength)
            } else {
                //在可见区域交换
                let result = fromIndex.cmp(toIndex)
                if (result > 0) {//从后向前
                    let cell = this.getCell(toIndex)
                    let insertIndex = cell.node.getSiblingIndex()

                    let fromCell = this.getCell(fromIndex)
                    this.releaseCell(fromCell)

                    fromIndex.index--;
                    this.resetCellIndexList(section, toIndex, fromIndex, 1)
                    fromIndex.index++;
                    this.createCellAndInsert(toIndex, insertIndex)
                    this.updateLayout()
                } else if (result < 0) { //从前向后
                    let fromCell = this.getCell(fromIndex)
                    this.releaseCell(fromCell)

                    let cell = this.getCell(toIndex)
                    let insertIndex = cell.node.getSiblingIndex()

                    fromIndex.index++;
                    toIndex.index--; //重制  from_index 下一个 到 toIndex 前一个
                    this.resetCellIndexList(section, fromIndex, toIndex, -1)
                    toIndex.index++;
                    fromIndex.index--;

                    toIndex.index--;// 由于从前面删除了 cell 左右创建的时候 toIndex 实际数据需要 -1
                    this.createCellAndInsert(toIndex, insertIndex)
                    this.updateLayout()
                } else {//更新同一个位置
                    this.updateRow(fromIdx, section, 1)
                }
            }
        }
    }

    /**
     * @zh 向 TableView 指定位置插入[count]行，插入前需要先将数据插入好
    */
    public insertRow(index: number, section: number, count: number) {
        insertBeginIndex.setValue2(section, index)
        insertEndIndex.setValue(this.getEndIndex(index, section, count))
        let contentLength = this.getValidContentLength()
        let viewLength = this.getItemLength(this._viewTransform)

        if (this._beginIndex.cmp(insertBeginIndex) > 0) {
            //在 begin index 之前插入数据则直接刷新可见 cell index 即可
            let updateIndeIndex = TempTableIndex2
            let curNewIndex = TempTableIndex3
            updateIndeIndex.setValue(this._endIndex)

            //从后往前更新index
            while (updateIndeIndex.cmp(this._beginIndex) >= 0) {
                if (updateIndeIndex.section == section) {
                    curNewIndex.setValue2(section, updateIndeIndex.index + count)
                    this.resetCellIndex(updateIndeIndex, curNewIndex)
                }
                let { newIndex, isFirst } = this.getBeforeIndex(updateIndeIndex)
                if (isFirst) break;
                updateIndeIndex.setValue(newIndex)
            }

            if (this._beginIndex.section == section) { // 更新 beginindex
                this._beginIndex.index += count;
            }

            if (this._endIndex.section == section) { // 更新 endindex
                this._endIndex.index += count;
            }

            if (viewLength <= contentLength) {
                let addLength = count * this.defaultLenght
                this.addItemLength(this._headTransfrom, addLength)
                let curOffset = this.getContentOffset()
                this.setContentOffset(curOffset + addLength)
            } else { //当前内容还没填满
                let emptyLenght = viewLength - contentLength
                let insertIndex = 1
                let addCount = 0
                while (emptyLenght > 0) {
                    let { newIndex, isFirst } = this.getBeforeIndex(this._beginIndex)
                    if (isFirst) break;
                    addCount++;
                    this._beginIndex.setValue(newIndex)
                    let cell = this.createCellAndInsert(this._beginIndex, insertIndex)
                    emptyLenght -= cell.getLength(this._direction)
                }

                let remainCount = count - addCount
                if (remainCount < 0) remainCount = 0;
                let addLength = remainCount * this.defaultLenght
                this.addItemLength(this._headTransfrom, addLength)
                let curOffset = this.getContentOffset()
                this.setContentOffset(curOffset + addLength)
            }
        } else if (this._endIndex.cmp(insertBeginIndex) < 0) {

            if (viewLength <= contentLength) {
                let addLength = count * this.defaultLenght
                this.addItemLength(this._tailTranform, addLength)
            } else { // 当前内容还未填满view
                let emptyLenght = viewLength - contentLength
                let insertIndex = this.getCell(this._endIndex).node.getSiblingIndex() + 1
                let addCount = 0
                while (emptyLenght > 0) {
                    let { newIndex, isLast } = this.getNextIndex(this._endIndex)
                    if (isLast) break;
                    addCount++;
                    this._endIndex.setValue(newIndex)
                    let cell = this.createCellAndInsert(this._endIndex, insertIndex)
                    emptyLenght -= cell.getLength(this._direction)
                }

                let remainCount = count - addCount
                if (remainCount < 0) remainCount = 0;
                let addLength = remainCount * this.defaultLenght
                this.addItemLength(this._tailTranform, addLength)
            }
            return; //在 endindex 之后插入直接return
        } else {  //   beginindex <= index < endindex
            let updateIndex = TempTableIndex2
            updateIndex.setValue(insertBeginIndex)

            let oldSectionCount = this.getSectionCount(insertBeginIndex.section) - count

            let insertIndex = 1
            if (oldSectionCount > 0) {
                let cell = this.getCell(insertBeginIndex)
                insertIndex = cell.node.getSiblingIndex()

                //将insertindex 之后的 cell 重置 index
                {
                    let oldMaxIndex = oldSectionCount - 1
                    if (oldMaxIndex < 0) oldMaxIndex = 0;
                    if (this._endIndex.section == section) {
                        oldMaxIndex = this._endIndex.index
                    }

                    //必须从最后一个开始更新
                    for (let i = oldMaxIndex; i >= insertBeginIndex.index; i--) {
                        TempTableIndex3.setValue2(insertBeginIndex.section, i);
                        TempTableIndex2.setValue2(insertBeginIndex.section, i + count)
                        this.resetCellIndex(TempTableIndex3, TempTableIndex2)
                    }

                    if (this._endIndex.section == section) {
                        this._endIndex.index += count;
                    }
                }
            }

            //插入新的 cell，并计算增加的长度
            let addLength = 0
            while (insertBeginIndex.cmp(insertEndIndex) <= 0) {
                let cell = this.createCellAndInsert(insertBeginIndex, insertIndex++);
                addLength += cell.getLength(this._direction)
                let { newIndex, isLast } = this.getNextIndex(insertBeginIndex)
                if (isLast) break;
                insertBeginIndex.setValue(newIndex)
            }

            if (viewLength >= contentLength + addLength) { //当前内容还没满，则不需要删除
                addLength = 0;
            }

            //从尾开始删除增加长度的cell
            let maxLoop = this.getMaxLoopCount()
            let deleteLength = 0
            while (addLength > deleteLength && maxLoop > 0) {
                maxLoop--;
                let cell = this.getCell(this._endIndex)
                let curlength = cell.getLength(this._direction)

                let section = null
                if (this._endIndex.index == 0) {
                    section = this.getSection(this._endIndex.section)
                    if (section) {
                        curlength += section.getLength(this._direction)
                    }
                }

                if (deleteLength + curlength > addLength) {
                    break;
                }
                deleteLength += curlength;
                this.releaseCell(cell);
                if (section)
                    this.releaseSection(section)

                let { newIndex, isFirst } = this.getBeforeIndex(this._endIndex)
                if (isFirst) break;
                this._endIndex.setValue(newIndex)
            }
            this.addItemLength(this._tailTranform, deleteLength)
        }

        this.updateLayout()
    }

    private getMaxLoopCount() { //避免死循环，计算最多循环的次数
        return Math.ceil(this.get_view_length() / this.defaultLenght) * 2
    }

    //要删除 的index
    public removeRow(index: number, section: number, count: number) {
        // console.log("tableview debug removeRow", index, section, count)
        removeBeginIndex.setValue2(section, index)
        removeEndIndex.setValue(this.getEndIndex(index, section, count))

        //再 beginIndex 之前删除，直接更新当前cell index即可
        if (this._beginIndex.cmp(removeEndIndex) > 0) {
            let updateIndeIndex = TempTableIndex2
            let curNewIndex = TempTableIndex3
            updateIndeIndex.setValue(this._beginIndex)
            //从后往前更新index
            while (updateIndeIndex.cmp(this._endIndex) <= 0) {
                if (updateIndeIndex.section == section) {
                    curNewIndex.setValue2(section, updateIndeIndex.index - count)
                    this.resetCellIndex(updateIndeIndex, curNewIndex)
                }
                let { newIndex, isLast } = this.getNextIndex(updateIndeIndex)
                if (isLast) break;
                updateIndeIndex.setValue(newIndex)
            }

            // 更新 beginindex
            if (this._beginIndex.section == section)
                this._beginIndex.index -= count;

            if (this._endIndex.section == section)
                this._endIndex.index -= count;

            let deleteLength = count * this.defaultLenght
            this.addItemLength(this._headTransfrom, -deleteLength)
            let curOffset = this.getContentOffset()
            this.setContentOffset(curOffset - deleteLength)
        } else if (this._endIndex.cmp(removeBeginIndex) < 0) {
            let validRemoveCount = 0
            let updateIndeIndex = TempTableIndex2
            updateIndeIndex.setValue(removeBeginIndex)
            //需要计算有效的删除 count，防止删除的 index 是超出数据范围的。导致错误删除
            let sectionCount = this.getSectionCount(removeEndIndex.section)
            let maxIndex = sectionCount - 1
            while (updateIndeIndex.cmp(removeEndIndex) <= 0) {
                if (updateIndeIndex.index <= maxIndex) {
                    validRemoveCount++;
                }
                let { newIndex, isLast } = this.getNextIndex(updateIndeIndex)
                if (isLast) break;
                updateIndeIndex.setValue(newIndex)
            }
            let deleteLength = validRemoveCount * this.defaultLenght
            this.addItemLength(this._tailTranform, -deleteLength)
            return; //在 endindex 之后删除直接return
        } else {  //   beginindex <= index <= endindex
            let curIndex = TempTableIndex3
            let cell = this.getCell(removeBeginIndex)

            //获得当前删除元素到最后的length
            curIndex.setValue(removeBeginIndex)
            let maxLoop = this.getMaxLoopCount()
            //将删除的元素释放
            let deleteLength = 0

            while (curIndex.cmp(removeEndIndex) <= 0 && maxLoop > 0) {
                maxLoop--;
                let cell = this.getCell(curIndex)
                deleteLength += cell.getLength(this._direction)
                this.releaseCell(cell)
                let { newIndex, isLast } = this.getNextIndex(curIndex)
                if (isLast) break;
                curIndex.setValue(newIndex)
            }

            //将删除元素之后的 cell index 更新
            let sectionCount = this.getSectionCount(removeEndIndex.section)
            if (sectionCount > 0) {
                let maxIndex = sectionCount - 1
                if (this._endIndex.section == section) {
                    maxIndex = this._endIndex.index;
                }

                for (let i = removeEndIndex.index + 1; i <= maxIndex; i++) {
                    TempTableIndex2.setValue2(removeEndIndex.section, i)
                    TempTableIndex3.setValue2(removeEndIndex.section, i - count)
                    this.resetCellIndex(TempTableIndex2, TempTableIndex3)
                }

                if (this._endIndex.section == section) {
                    this._endIndex.index -= count;
                }
            }

            if (sectionCount - count > 0) { //删完后还有 cell 
                let addLength = 0
                cell = this.getCell(this._endIndex)
                let insertIndx = cell.node.getSiblingIndex() + 1
                while (addLength < deleteLength) {
                    let { newIndex, isLast } = this.getNextIndex(this._endIndex, count) //这里需要计算删除掉的cell 计算 next
                    if (isLast) break;
                    this._endIndex.setValue(newIndex)

                    if (this._endIndex.index == 0) {
                        let section = this.createSectionAndInsert(this._endIndex.section, insertIndx)
                        if (section) {
                            insertIndx++;
                            addLength += section.getLength(this._direction);
                        }
                    }
                    cell = this.createCellAndInsert(this._endIndex, insertIndx++)
                    addLength += cell.getLength(this._direction)
                }
                let deleteTailLength = addLength
                let tailLenght = this.getItemLength(this._tailTranform)
                if (deleteTailLength > tailLenght)
                    deleteTailLength = tailLenght;
                this.addItemLength(this._tailTranform, -deleteTailLength)
            }
        }
        this.updateLayout()
    }

    public updateRow(index: number, section: number, count: number) {
        updateEndIndex.setValue(this.getEndIndex(index, section, count))
        if (this._beginIndex.cmp(updateEndIndex) > 0 && this._endIndex.cmp2(section, index) < 0) {
            return; //更新内容不在返回则直接返回
        }

        updateBeginIndex.setValue2(section, index)

        let refreshBegin = this._beginIndex.cmp2(section, index) >= 0 ? this._beginIndex : updateBeginIndex;
        let refreshEnd = this._endIndex.cmp(updateEndIndex) <= 0 ? this._endIndex : updateEndIndex;

        let updateIndex = TempTableIndex3
        updateIndex.setValue(refreshBegin)

        while (refreshEnd.cmp(updateIndex) >= 0) {
            let cell = this.getCell(updateIndex)
            let index = cell.node.getSiblingIndex();
            this.releaseCell(cell);
            this.createCellAndInsert(updateIndex, index)
            let { newIndex, isLast } = this.getNextIndex(updateIndex)
            if (isLast) break;
            updateIndex.setValue(newIndex)
        }
        this.updateLayout()
    }

    //只能计算当前section 的endIndex
    private getEndIndex(index: number, section: number, count: number): Readonly<TableViewIndex> {
        GetEndIndex.index = index;
        GetEndIndex.section = section;

        let maxIndex = this.getSectionCount(section) - 1
        if (maxIndex < 0) maxIndex = 0;

        GetEndIndex.index += count - 1;

        if (GetEndIndex.index > maxIndex)
            GetEndIndex.index = maxIndex;

        return GetEndIndex
    }

    /**
        param : TableViewRefreshParam = {
            index?: number; // [default = 0] 刷新的 index 
            section?: number; //[default = 0] 刷新的 section
            isFromEnd?: boolean; //[default = false] 控制刷新的 index， section 是指定的是 beginIndex, 还是 EndIndex
            forceUpdate?: boolean; //[default = true] 强制刷新，所有的cell 会重新创建
            keepIndex?: boolean; //[default=false] 是否保留原先的 index，如果true，则不需要传递 index 和 section，使用保留的index
        }
    */
    public refresh(param?: TableViewRefreshParam) {
        let isFromEnd: boolean = false;
        let index: number = 0;
        let section: number = 0;
        let forceUpdate: boolean = true;
        let keepIndex: boolean = false;

        if (param) {
            if (param.isFromEnd != undefined) isFromEnd = param.isFromEnd
            if (param.index != undefined) index = param.index
            if (param.section != undefined) section = param.section;
            if (param.forceUpdate != undefined) forceUpdate = param.forceUpdate
            if (param.keepIndex != undefined) keepIndex = param.keepIndex
        }

        let view_length = this.get_view_length();
        let offset = 0
        if (isFromEnd) {
            if (!keepIndex) {
                this._endIndex.index = index;
                this._endIndex.section = section;
            }
            offset = this.update_view_content_from_end(view_length, -1, -1, forceUpdate);
        } else {
            if (!keepIndex) {
                this._beginIndex.index = index;
                this._beginIndex.section = section;
            }
            offset = this.update_view_content(view_length, -1, -1, forceUpdate);
        }
        //console.log("refresh", offset)
        if (!keepIndex)
            this.setContentOffset(offset)

    }

    private getItemLength(item: UITransform) {
        switch (this._direction) {
            case TableViewDirection.Vertical:
                return item.contentSize.height;
            case TableViewDirection.Horizontal:
                return item.contentSize.width
        }
    }

    private addItemLength(item: UITransform, length: number) {
        if (length == 0) return;
        let oldSize = item.contentSize
        switch (this._direction) {
            case TableViewDirection.Vertical:
                {
                    let newHeight = oldSize.height + length
                    if (newHeight < 0) newHeight = 0;
                    item.setContentSize(size(oldSize.width, newHeight))
                    break;
                }
            case TableViewDirection.Horizontal:
                {
                    let newWidth = oldSize.width + length
                    if (newWidth < 0) newWidth = 0;
                    item.setContentSize(size(newWidth, oldSize.height))
                    break;
                }
        }
    }
    private setItemSize(item: UITransform, length: number): boolean {
        if (length < 0) length = 0;
        let viewSize = this._viewTransform.contentSize;

        switch (this._direction) {
            case TableViewDirection.Vertical:
                {
                    if (length == viewSize.height) return false;
                    item.setContentSize(size(viewSize.width, length))
                    return true;
                }
            case TableViewDirection.Horizontal:
                {
                    if (length == viewSize.width) return false;
                    item.setContentSize(size(length, viewSize.height))
                    return true;
                }
        }
    }

    private resetOffsetToBottom() {
        if (this._scrollView.isScrolling() || this._isUpdating) return;
        let contentLength = this.getItemLength(this._contentUITransform)
        let view_length = this.get_view_length()

        let tailLenght = this.getItemLength(this._tailTranform) - this.tailGap
        // if (tailLenght > 0) return;

        if (contentLength > view_length) {
            this.setContentOffset(contentLength - view_length)
            return true;
        }
        return false;
    }

    public scrollToOffset(offset: number) {
        this._lastOffset = this.getContentOffset();
        this.setContentOffset(offset)
        this.handleScrollViewScrolling(true);
    }
}