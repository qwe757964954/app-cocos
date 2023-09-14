import { _decorator, Node } from 'cc';
import { ScrollView } from 'cc';
import { Vec2 } from 'cc';
import { PageViewIndicator } from 'cc';
import { CCFloat } from 'cc';
import { UITransform } from 'cc';
import { XPageViewCell } from './XPageViewCell';
import { ScrollBar } from 'cc';
import { EventHandler } from 'cc';
import { DEBUG, EDITOR } from 'cc/env';
import { Mask } from 'cc';
import { Layout } from 'cc';
import { size } from 'cc';
import { v2 } from 'cc';
import { XPageViewDirection, XPageViewEventType, XPageViewSizeMode } from './XPageViewEnum';
import { EventTouch } from 'cc';
import { Vec3 } from 'cc';
import { v3 } from 'cc';
import { XPageViewIndicator } from './XPageViewIndicator';
import { CCBoolean } from 'cc';
const { ccclass, property, requireComponent, disallowMultiple, executeInEditMode } = _decorator;

const _tempVec2 = new Vec2();

const VIEW_NODE_NAME: string = "view";
const CONTENT_NODE_NAME: string = "content";
const HEAD_NODE_NAME: string = "$head_layout$";
const TAIL_NODE_NAME: string = "$tail_layout$";
const INDICATOR_NODE_NAME = "indicator";

export interface PageViewDelegate {
    createPage(pageView: XPageView, index: number): Node;
    releasePage(pageView: XPageView, page: Node, index: number);
    pageCount(pageView: XPageView);
}

@ccclass('XPageView')
@requireComponent(UITransform)
@disallowMultiple
@executeInEditMode
export class XPageView extends ScrollView {
    public static Direction = XPageViewDirection;
    public static SizeMode = XPageViewSizeMode;
    public static PageViewEventType = XPageViewEventType;

    // ------------- hide scroll property begin ------------------
    @property({
        override: true,
        visible: false,
        type: ScrollBar
    })
    get horizontalScrollBar() {
        return super.horizontalScrollBar;
    }
    set horizontalScrollBar(value) {
        super.horizontalScrollBar = value;
    }

    @property({
        override: true,
        visible: false,
        type: ScrollBar
    })
    get verticalScrollBar() {
        return super.verticalScrollBar;
    }

    set verticalScrollBar(value) {
        super.verticalScrollBar = value;
    }

    @property({
        override: true,
        visible: false,
        serializable: true,
    })
    public vertical = true;

    @property({
        override: true,
        visible: false,
        serializable: true,
    })
    public horizontal = true;

    @property({
        override: true,
        visible: false,
        serializable: true,
    })
    public cancelInnerEvents = true;

    @property({
        override: true,
        visible: false,
        serializable: true,
        type: EventHandler
    })
    public scrollEvents: EventHandler[] = [];
    // ------------- hide scroll property end ------------------
    get Delegate() {
        return this._delegate
    }
    set Delegate(value: PageViewDelegate) {
        this._delegate = value;
    }

    @property({
        type: XPageViewSizeMode,
        visible: true,
        serializable: true,
    })
    public SizeMode = XPageViewSizeMode.Unified;

    @property({
        type: XPageViewDirection,
        visible: true,
        serializable: true,
    })
    public Direction = XPageViewDirection.Horizontal;

    /*
    * 滚动临界值，默认单位百分比，当拖拽超出该数值时，松开会自动滚动下一页，小于时则还原。
    */
    @property({
        type: CCFloat,
        visible: true,
        slide: true,
        range: [0, 1, 0.01],
        serializable: true,
    })
    get scrollThreshold() {
        return this._scrollThreshold;
    }

    set scrollThreshold(value) {
        if (this._scrollThreshold === value) {
            return;
        }

        this._scrollThreshold = value;
    }

    protected _scrollThreshold = 0.5;

    @property({
        type: CCFloat,
        visible: true,
        slide: true,
        range: [0, 1, 0.01],
        serializable: true,
    })
    protected _pageTurningEventTiming = 0.1;

    @property({
        type: CCFloat,
        visible: true,
        serializable: true,
        tooltip: 'i18n:pageview.pageTurningSpeed',
    })
    public pageTurningSpeed = 0.3; //每个页面翻页时所需时间，单位：秒。

    /*
     * 快速滑动翻页临界值。
     * 当用户快速滑动时，会根据滑动开始和结束的距离与时间计算出一个速度值，
     * 该值与此临界值相比较，如果大于临界值，则进行自动翻页。
    */
    @property({
        type: CCFloat,
        visible: true,
        serializable: true,
        tooltip: 'i18n:pageview.autoPageTurningThreshold',
    })
    public autoPageTurningThreshold = 100;

    @property({
        type: CCBoolean,
        visible: true,
    })
    get HaveIndicator(): boolean {
        return this._indicator != null && this._indicator.node.active;
    }

    set HaveIndicator(value: boolean) {
        if (value) {
            this.createIndicator();
        } else {
            this.removeIndicator()
        }
    }

    @property({
        serializable: true
    })
    protected _indicator: XPageViewIndicator = null!;
    protected _delegate: PageViewDelegate = null!;
    protected _curPageIdx = -1;
    protected _lastPageIdx = 0;
    protected _uiTransform: UITransform = null!;
    protected _contentTransform: UITransform = null!;
    protected _viewTransform: UITransform = null!;
    protected _contentLayout: Layout = null!;
    private _headTransform: UITransform = null!;
    private _tailTransform: UITransform = null!;
    protected _pages: Map<number, XPageViewCell> = new Map();
    private _tempPages: Map<number, XPageViewCell> = new Map();

    protected _touchBeganPosition = new Vec2();
    protected _touchEndPosition = new Vec2();
    protected _moveTempPage: XPageViewCell = null;
    protected _tempMoveOffset: number = 0;

    protected createIndicator() {
        if (this._indicator) {
            this._indicator.node.active = true;
        } else {
            let nodeIndicator = new Node(INDICATOR_NODE_NAME)
            nodeIndicator.parent = this.node;
            nodeIndicator.layer = this.node.layer;
            this._indicator = nodeIndicator.addComponent(XPageViewIndicator)
        }
    }

    protected removeIndicator() {
        if (this._indicator == null) return;
        this._indicator.node.active = false;
    }

    protected updateContentLayout() {
        this._contentLayout.updateLayout(true);
    }

    protected initControl() {
        this._uiTransform = this.getComponent(UITransform)

        let view = this.node.getChildByName(VIEW_NODE_NAME)
        if (view == null) {
            view = new Node(VIEW_NODE_NAME)
            view.layer = this.node.layer
            this.node.addChild(view)
        }
        let mask = view.getComponent(Mask) || view.addComponent(Mask)
        mask.type = Mask.Type.GRAPHICS_RECT;

        this._viewTransform = view.getComponent(UITransform) || view.addComponent(UITransform);
        this._viewTransform.setAnchorPoint(0.5, 0.5)

        let content = this.content
        if (null == content) {
            content = new Node(CONTENT_NODE_NAME);
            content.layer = this.node.layer;
            content.addComponent(UITransform)
            view.addChild(content)
            this.content = content
        }
        this._contentTransform = content.getComponent(UITransform)

        if (!EDITOR) {
            content.removeAllChildren()
        }

        if (EDITOR) {
            this._contentTransform.setContentSize(this._uiTransform.contentSize)
        }

        this._contentLayout = content.getComponent(Layout) || content.addComponent(Layout);
        this._contentLayout.affectedByScale = true;
        this._contentLayout.resizeMode = Layout.ResizeMode.CONTAINER;
        this._contentLayout.alignHorizontal = false;
        this._contentLayout.alignVertical = false;

        if (!EDITOR) {
            let headNode = content.getChildByName(HEAD_NODE_NAME);
            if (headNode == null) {
                headNode = new Node(HEAD_NODE_NAME);
                headNode.layer = this.node.layer;
                content.addChild(headNode)
            }
            this._headTransform = headNode.getComponent(UITransform) || headNode.addComponent(UITransform);
            this._headTransform.contentSize = size(0, 0)

            let tailNode = content.getChildByName(TAIL_NODE_NAME);
            if (tailNode == null) {
                tailNode = new Node(TAIL_NODE_NAME);
                tailNode.layer = this.node.layer;
                content.addChild(tailNode)
            }
            this._tailTransform = tailNode.getComponent(UITransform) || tailNode.addComponent(UITransform);
            this._tailTransform.contentSize = size(0, 0)
        }

        this.onUpdateDirection();
        this.onSizeChange()
        this.setContentOffset(0)
        this.ajustViewPos();
    }

    onSizeChange() {
        this._viewTransform.setContentSize(this._uiTransform.contentSize)
        let content_size = this._contentTransform.contentSize.clone();
        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    content_size.height = this._uiTransform.height;
                    if (EDITOR) content_size.width = this._uiTransform.width;
                    break;
                }
            case XPageViewDirection.Vertical:
                {
                    content_size.width = this._uiTransform.width;
                    if (EDITOR) content_size.height = this._uiTransform.height;
                    break;
                }
        }
        this._contentTransform.setContentSize(content_size);
        this.ajustViewPos();

        // let view_length = this.getItemLength(this._viewTransform)
    }

    private setContentOffset(offset: number) {
        let pos = v2(0, 0);

        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    pos.x = -offset;
                    pos.y = 0;
                    break;
                }
            case XPageViewDirection.Vertical:
                {
                    pos.x = 0;
                    pos.y = offset;
                    break;
                }
        }
        this.content.setPosition(pos.x, pos.y);
    }

    private getContentOffset(): number {
        let pos = this._contentTransform.node.position;

        let offset = 0;
        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    offset = -pos.x;
                    break;
                }
            case XPageViewDirection.Vertical:
                {
                    offset = pos.y
                    break;
                }
        }

        return offset;
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

    private onUpdateDirection() {
        let anchor = v2(0.5, 0.5);

        //设置按轴对齐
        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    anchor.x = 0;
                    anchor.y = 0.5;
                    this._contentLayout.type = Layout.Type.HORIZONTAL;
                    this.vertical = false;
                    this.horizontal = true;
                    break;
                }

            case XPageViewDirection.Vertical:
                {
                    anchor.x = 0.5;
                    anchor.y = 1;
                    this._contentLayout.type = Layout.Type.VERTICAL;
                    this.horizontal = false;
                    this.vertical = true;
                    break;
                }
        }

        this._viewTransform.setAnchorPoint(anchor)
        this._contentTransform.setAnchorPoint(anchor)
    }

    protected onLoad(): void {
        //super.onLoad()
        this.initControl();
    }

    public refreshPageControl() {

    }

    protected getPageOffset(index: number): number {
        let defaultLength = this.getDefaultLength();
        let offset = index * defaultLength
        let addOffset = 0
        for (let page of this._pages.values()) {
            if (page.PageIndex < index) {
                let pageLength = page.getLength(this.Direction)
                addOffset += pageLength - defaultLength
            }
        }

        offset -= addOffset

        return offset;
    }

    protected _moveOffsetValue(idx: number) {
        const offset = new Vec2();
        if (this.SizeMode === XPageViewSizeMode.Free) {
            if (this.Direction === XPageViewDirection.Horizontal) {
                offset.x = this.getPageOffset(idx)
            } else if (this.Direction === XPageViewDirection.Vertical) {
                offset.y = this.getPageOffset(idx)
            }
        } else {
            const viewTrans = this.view;
            if (!viewTrans) {
                return offset;
            }
            if (this.Direction === XPageViewDirection.Horizontal) {
                offset.x = idx * viewTrans.width;
            } else if (this.Direction === XPageViewDirection.Vertical) {
                offset.y = idx * viewTrans.height;
            }
        }

        // console.log("_moveOffsetValue", offset)
        return offset;
    }

    protected getOffsetPos(offset: number) {
        const offsetPos = new Vec2();
        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    offsetPos.x = offset
                    break;
                }
            case XPageViewDirection.Vertical:
                {
                    offsetPos.y = offset;
                    break;
                }
        }

        return offsetPos
    }

    public gotoPage(idx: number, timeInSecond: number = 0) {
        let pageCount = this.getPageCount()
        if (idx < 0 || idx >= pageCount) {
            return;
        }

        if (this._curPageIdx == -1) {
            this._curPageIdx = idx;
            this.setContentOffset(this.updatePages(this._curPageIdx, false))
        } else {
            let offset = (idx - this._curPageIdx)
            if (offset == 0) { //没翻页
                this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);
            } else if (Math.abs(offset) == 1) { //跳转的是邻近页
                let nextPage = this.getPage(idx)
                let nexNexIndex = idx + offset
                let addLength = 0
                let deleteLength = 0
                if (nexNexIndex >= 0 && nexNexIndex < pageCount) { //下一页是存在的则创建
                    let insertIndex = nextPage.node.getSiblingIndex()
                    if (offset > 0) {
                        insertIndex += 1;
                    }
                    let page = this.createPageAndInsert(nexNexIndex, insertIndex)
                    addLength += page.getLength(this.Direction)
                }

                let beforeIndex = this._curPageIdx - offset
                if (beforeIndex >= 0 && beforeIndex < pageCount) {  //将之前那页释放
                    deleteLength += this.releasePageByIndex(beforeIndex)
                }

                if (offset > 0) { //向后翻页
                    this.addItemLength(this._headTransform, deleteLength)
                    this.addItemLength(this._tailTransform, -addLength)
                } else { //向前翻页
                    this.addItemLength(this._tailTransform, deleteLength)
                    this.addItemLength(this._headTransform, -addLength)
                }
                this.updateContentLayout()
                this._lastPageIdx = this._curPageIdx
                this._curPageIdx = idx;

                this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);
            } else { //跳转的是跨越的好几页
                if (timeInSecond > 0) {
                    this._moveTempPage = this.getPage(this._curPageIdx)
                    this._moveTempPage.node.removeFromParent()
                    this._pages.delete(this._curPageIdx)
                }
                this.updatePages(idx, false);

                if (this._moveTempPage) {
                    let tempOffset = this.getPageOffset(offset > 0 ? idx - 1 : idx + 1)
                    let curOffset = this.getPageOffset(this._curPageIdx)
                    let itemSize = this._moveTempPage.getUITransform().contentSize
                    let itemAnchor = this._moveTempPage.getUITransform().anchorPoint
                    let viewSize = this._viewTransform.contentSize
                    let viewAnchor = this._viewTransform.anchorPoint
                    this._moveTempPage.node.parent = this._viewTransform.node
                    let newPos = v3()
                    if (this.Direction == XPageViewDirection.Horizontal) {
                        let left = curOffset
                        let top = viewSize.height - itemSize.height
                        newPos.x = left - (viewAnchor.x * viewSize.width) + itemSize.width * itemAnchor.x;
                        newPos.y = -top + ((1 - viewAnchor.y) * viewSize.height) - itemSize.height * (1 - itemAnchor.y);
                    } else {
                        let left = viewSize.width - itemSize.width
                        let top = curOffset
                        newPos.x = left - (viewAnchor.x * viewSize.width) + itemSize.width * itemAnchor.x;
                        newPos.y = -top + ((1 - viewAnchor.y) * viewSize.height) - itemSize.height * (1 - itemAnchor.y);
                    }
                    this._moveTempPage.node.setPosition(newPos)

                    this.setContentOffset(tempOffset)
                    this._tempMoveOffset = tempOffset
                }

                this._lastPageIdx = this._curPageIdx
                this._curPageIdx = idx;

                this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);
            }
        }
        this.updateIndicator()
    }

    public removePage(index: number) {

    }

    public resetPage(index: number) {

    }

    public currentPage() {

    }

    protected getPage(index: number): XPageViewCell {
        let page = this._pages.get(index)

        return page
    }

    protected createPage(index: number): XPageViewCell {
        let cell = this._pages.get(index);
        if (cell != null) return cell;

        let node = this._delegate.createPage(this, index);
        cell = node.getComponent(XPageViewCell) || node.addComponent(XPageViewCell)
        cell.PageIndex = index
        cell.node.active = true;
        this._pages.set(index, cell)
        return cell
    }

    private insertNodeToContent(nodeUi: UITransform, insertIndex: number) {
        let node = nodeUi.node
        nodeUi.node.active = true;
        if (insertIndex < 0) {
            let count = this.content.children.length;
            insertIndex = count + insertIndex + 1;
        }
        if (node.parent != this.content) {
            this.content.insertChild(node, insertIndex)
        } else if (node.getSiblingIndex() != insertIndex) {
            let oldIndex = node.getSiblingIndex()
            if (oldIndex < insertIndex) {
                insertIndex--;
            }
            node.setSiblingIndex(insertIndex)
        }
    }

    protected createPageAndInsert(index: number, insertIndex: number) {
        let cell = this.createPage(index)
        this.insertNodeToContent(cell.getUITransform(), insertIndex)

        if (DEBUG) {
            cell.node.name = `${index}`
        }
        return cell
    }

    protected releasePage(cell: XPageViewCell, del: boolean = true) {
        let cellLength = cell.getLength(this.Direction)
        let index = cell.PageIndex
        if (del) this._pages.delete(index)
        cell.node.active = false;
        this._delegate.releasePage(this, cell.node, index)

        return cellLength
    }

    protected releasePageByIndex(index: number) {
        let page = this._pages.get(index)
        if (page == null) return 0;

        let cellLength = page.getLength(this.Direction)
        this._pages.delete(index)
        this._delegate.releasePage(this, page.node, index)

        return cellLength
    }

    public getPageCount() {
        if (this._delegate == null) return 0;

        return this._delegate.pageCount(this)
    }

    protected setItemLength(uiTransform: UITransform, length: number) {
        if (length < 0) length = 0;

        let curSize = uiTransform.contentSize.clone()
        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    curSize.width = length
                    break;
                }
            case XPageViewDirection.Vertical:
                {
                    curSize.height = length
                    break;
                }
        }
        uiTransform.setContentSize(curSize)
    }

    protected addItemLength(uiTransform: UITransform, offset: number) {
        let size = uiTransform.contentSize.clone()

        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    size.width += offset;
                    break;
                }
            case XPageViewDirection.Vertical:
                {
                    size.height += offset
                    break;
                }
        }
        uiTransform.setContentSize(size)
    }

    protected getItemLength(uiTransform: UITransform) {
        switch (this.Direction) {
            case XPageViewDirection.Horizontal:
                {
                    return uiTransform.width
                }
            case XPageViewDirection.Vertical:
                {
                    return uiTransform.height
                }
        }
    }
    protected getDefaultLength() {
        return this.getItemLength(this._uiTransform)
    }

    protected getBeforeCount(index: number) {
        if (index < 0) return 0;

        return index
    }

    protected getAfterCount(index: number) {
        let count = this.getPageCount();
        let AfterCount = count - 1 - index
        if (AfterCount < 0) AfterCount = 0;

        return AfterCount;
    }

    protected copyPageTemps() {
        this._tempPages.clear();
        this._pages.forEach((value: XPageViewCell, key: number) => {
            this._tempPages.set(key, value)
        })
    }

    protected removeTempPage(index: number) {
        this._tempPages.delete(index)
    }

    protected freeTempPages() {
        this._tempPages.forEach((cell: XPageViewCell) => {
            this.releasePage(cell)
        })
    }

    protected freePages() {
        for (let page of this._pages.values()) {
            this.releasePage(page, false)
        }
        this._pages.clear();
    }

    protected updatePages(newIndex: number, forceUpdate: boolean = true) {
        let count = this.getPageCount();
        let defaultLength = this.getDefaultLength();
        let insertIndex = 1
        let beforeCount = this.getBeforeCount(newIndex)
        let afterCount = this.getAfterCount(newIndex)
        let headLength = beforeCount * defaultLength
        let tailLength = afterCount * defaultLength;
        let offset = headLength

        if (forceUpdate) {
            this.freePages();
        } else {
            this.copyPageTemps();
        }

        //pre cell
        if (newIndex > 0) {
            if (!forceUpdate) this.removeTempPage(newIndex - 1)
            let preCell = this.createPageAndInsert(newIndex - 1, insertIndex++)
            headLength -= preCell.getLength(this.Direction)
        }

        let viewLength = this.getItemLength(this._viewTransform) * 2
        let curLength = 0
        let curIndex = newIndex
        while (curLength < viewLength && curIndex < count) {
            if (!forceUpdate) this.removeTempPage(curIndex)
            let cell = this.createPageAndInsert(curIndex, insertIndex++)
            let cellLength = cell.getLength(this.Direction)
            curLength += cellLength
            if (curIndex != newIndex) {
                tailLength -= cellLength
            }
            curIndex++;
        }

        this.setItemLength(this._headTransform, headLength)
        this.setItemLength(this._tailTransform, tailLength)

        if (!forceUpdate) {
            this.freeTempPages()
        }
        this.updateContentLayout();
        return offset
    }

    protected onAnchorChange() {
        this.ajustViewPos();
    }

    protected onContentSizeChange() {

    }

    protected updateIndicator() {
        if (this._indicator) {
            this._indicator.setPageView(this)
            this._indicator._changedState();
        }
    }

    protected _getDragDirection(moveOffset: Vec2) {
        if (this.Direction === XPageViewDirection.Horizontal) {
            if (moveOffset.x === 0) {
                return 0;
            }

            return (moveOffset.x > 0 ? 1 : -1);
        } else {
            // 由于滚动 Y 轴的原点在在右上角所以应该是小于 0
            if (moveOffset.y === 0) {
                return 0;
            }

            return (moveOffset.y < 0 ? 1 : -1);
        }
    }


    protected getPageCenterOffset(index: number) {
        if (index < this._curPageIdx) {

        }
        let page = this.getPage(index)
        if (page != null) {
            return page.getLength(this.Direction)
        }

        return this.getDefaultLength()
    }

    // 是否超过自动滚动临界值
    protected _isScrollable(offset: Vec2, index: number, nextIndex: number) {
        const viewTrans = this._viewTransform;
        if (!viewTrans) {
            return false;
        }
        if (this.Direction === XPageViewDirection.Horizontal) {
            return Math.abs(offset.x) >= viewTrans.width * this.scrollThreshold;
        } else if (this.Direction === XPageViewDirection.Vertical) {
            return Math.abs(offset.y) >= viewTrans.height * this.scrollThreshold;
        }
    }

    // 快速滑动
    protected _isQuicklyScrollable(touchMoveVelocity: Vec3) {
        if (this.Direction === XPageViewDirection.Horizontal) {
            if (Math.abs(touchMoveVelocity.x) > this.autoPageTurningThreshold) {
                return true;
            }
        } else if (this.Direction === XPageViewDirection.Vertical) {
            if (Math.abs(touchMoveVelocity.y) > this.autoPageTurningThreshold) {
                return true;
            }
        }
        return false;
    }

    protected _autoScrollToPage() {
        const bounceBackStarted = this._startBounceBackIfNeeded();
        let pageCount = this.getPageCount()
        if (bounceBackStarted) { //滑动出边界了
            const bounceBackAmount = this._getHowMuchOutOfBoundary();
            this._clampDelta(bounceBackAmount);
            //如果超出右边界
            if (bounceBackAmount.x > 0 || bounceBackAmount.y < 0) {
                this._curPageIdx = pageCount === 0 ? 0 : pageCount - 1;
            }
            //如果超出左边界
            if (bounceBackAmount.x < 0 || bounceBackAmount.y > 0) {
                this._curPageIdx = 0;
            }

            this.updateIndicator()
        } else {
            const moveOffset = new Vec2();
            Vec2.subtract(moveOffset, this._touchBeganPosition, this._touchEndPosition);
            const index = this._curPageIdx;
            const nextIndex = index + this._getDragDirection(moveOffset);
            const timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);
            if (nextIndex < pageCount) {
                if (this._isScrollable(moveOffset, index, nextIndex)) {
                    this.gotoPage(nextIndex, timeInSecond);
                    return;
                } else {
                    const touchMoveVelocity = this._calculateTouchMoveVelocity();
                    if (this._isQuicklyScrollable(touchMoveVelocity)) {
                        this.gotoPage(nextIndex, timeInSecond);
                        return;
                    }
                }
            }
            this.gotoPage(index, timeInSecond);
        }
    }

    protected _handleReleaseLogic() {
        this._autoScrollToPage();
        if (this._scrolling) {
            this._scrolling = false;
            if (!this._autoScrolling) {
                this._dispatchEvent(XPageView.PageViewEventType.SCROLL_ENDED);
            }
        }
    }

    protected _onTouchBegan(event: EventTouch, captureListeners: any) {
        event.touch!.getUILocation(_tempVec2);
        Vec2.set(this._touchBeganPosition, _tempVec2.x, _tempVec2.y);
        super._onTouchBegan(event, captureListeners);
    }

    protected _onTouchMoved(event: EventTouch, captureListeners: any) {
        super._onTouchMoved(event, captureListeners);
    }

    protected _onTouchEnded(event: EventTouch, captureListeners: any) {
        event.touch!.getUILocation(_tempVec2);
        Vec2.set(this._touchEndPosition, _tempVec2.x, _tempVec2.y);
        super._onTouchEnded(event, captureListeners);
    }

    protected _onTouchCancelled(event: EventTouch, captureListeners: any) {
        event.touch!.getUILocation(_tempVec2);
        Vec2.set(this._touchEndPosition, _tempVec2.x, _tempVec2.y);
        super._onTouchCancelled(event, captureListeners);
    }

    protected _onMouseWheel() { }
    handleScrollEnd() {
        //console.log("handleScrollEnd", new Error().stack)
        if (this._moveTempPage) {
            this.releasePage(this._moveTempPage)
            this._moveTempPage = null;
        }
    }

    getCurPageIndex() {
        if (this._delegate == null) return 0;
        return this._curPageIdx
    }

    update(dt: number) {
        super.update(dt)

        if (this._moveTempPage) {
            let contentOffset = this.getContentOffset()
            let offset = contentOffset - this._tempMoveOffset;
            this._tempMoveOffset = contentOffset
            let oldPos = this._moveTempPage.node.position.clone()
            switch (this.Direction) {
                case XPageViewDirection.Horizontal:
                    {
                        oldPos.x -= offset
                        break;
                    }
                case XPageViewDirection.Vertical:
                    {
                        oldPos.y += offset
                        break;
                    }
            }
            this._moveTempPage.node.setPosition(oldPos)
        }
    }
    onEnable(): void {
        super.onEnable();
        this.node.on(Node.EventType.SIZE_CHANGED, this.onSizeChange, this)
        this.node.on(Node.EventType.ANCHOR_CHANGED, this.onAnchorChange, this)

        this.content.on(Node.EventType.SIZE_CHANGED, this.onContentSizeChange, this)
        this.node.on(ScrollView.EventType.SCROLL_ENDED, this.handleScrollEnd, this)
    }

    onDisable(): void {
        super.onDisable();
        this.node.off(Node.EventType.SIZE_CHANGED, this.onSizeChange, this)
        this.node.off(Node.EventType.ANCHOR_CHANGED, this.onAnchorChange, this)
        this.content.off(Node.EventType.SIZE_CHANGED, this.onContentSizeChange, this)
        this.node.off(ScrollView.EventType.SCROLL_ENDED, this.handleScrollEnd, this)
    }
}


