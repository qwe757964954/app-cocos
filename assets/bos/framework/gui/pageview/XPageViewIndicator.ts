import { Component, Node } from "cc";
import { Enum } from "cc";
import { Layout } from "cc";
import { Size } from "cc";
import { SpriteFrame } from "cc";
import { Color } from "cc";
import { _decorator } from "cc"
import { XPageView } from "./XPageView";
import { Sprite } from "cc";
import { UIRenderer } from "cc";
import { EDITOR } from "cc/env";
import { builtinResMgr } from "cc";
import { Button } from "cc";
import { EventHandler } from "cc";
import { EventTouch } from "cc";
const { ccclass, property, executeInEditMode } = _decorator;

const _color = new Color();

enum IndicatorDirection {
    /**
     * @en The horizontal direction.
     *
     * @zh 水平方向。
     */
    HORIZONTAL = 0,

    /**
     * @en The vertical direction.
     *
     * @zh 垂直方向。
     */
    VERTICAL = 1,
}
Enum(IndicatorDirection);

interface XPageViewInterface {
    getCurPageIndex(): number;
    getPageCount(): number,
    gotoPage(idx: number, timeInSecond: number);
}

class EditorPageView {
    getCurPageIndex(): number {
        return 0;
    }

    getPageCount(): number {
        return 5;
    }
    gotoPage(idx: number, timeInSecond: number) {

    }
};
/**
 * @en
 * The Page View Indicator Component.
 *
 * @zh
 * 页面视图每页标记组件。
 */
@ccclass('XPageViewIndicator')
@executeInEditMode
export class XPageViewIndicator extends Component {
    /**
     * @en
     * The spriteFrame for each element.
     *
     * @zh
     * 每个页面标记显示的图片。
     */
    @property({
        type: SpriteFrame
    })
    get spriteFrame() {
        return this._spriteFrame;
    }

    set spriteFrame(value) {
        if (this._spriteFrame === value) {
            return;
        }
        this._spriteFrame = value;
        this.handleUpdateSpriteFrame()
    }

    /**
     * @en
     * The location direction of PageViewIndicator.
     *
     * @zh
     * 页面标记摆放方向。
     *
     * @param direction @en The direction of the PageViewIndicator. @zh 页面标记的摆放方向。
     */
    @property({
        type: IndicatorDirection
    })
    get direction() {
        return this._direction;
    }

    set direction(value) {
        if (this._direction === value) {
            return;
        }
        this._direction = value;
        this._updateLayout()
    }

    /**
     * @en
     * The cellSize for each element.
     *
     * @zh
     * 每个页面标记的大小。
     */
    @property({
        type: Size
    })
    get cellSize() {
        return this._cellSize;
    }

    set cellSize(value) {
        if (this._cellSize === value) {
            return;
        }
        this._cellSize = value;
    }

    /**
     * @en Enum for PageView Indicator direction.
     * @zh 页面视图指示器的摆放方向。
     * @enum PageViewIndicator.Direction
     */
    public static Direction = IndicatorDirection;

    /**
     * @en
     * The distance between each element.
     *
     * @zh
     * 每个页面标记之间的边距。
     */
    @property({
        tooltip: "每个页面标记之间的边距。",
    })
    get spacing() {
        return this._spacing
    }

    set spacing(value: number) {
        if (this._spacing == value) return;
        this._spacing = value;
        this._updateLayout()
    }

    @property({
        tooltip: "indicator 是否可点击跳转对应page",
    })
    get ClickEnable() {
        return this._isClicked;
    }
    set ClickEnable(value: boolean) {
        this._isClicked = value;
    }

    @property({
        tooltip: "点击跳转page 的滑动动画时间",
        visible: function () {
            return this._isClicked
        }
    })
    get JumpDuration() {
        return this._jumpDuration;
    }
    set JumpDuration(value: number) {
        this._jumpDuration = value;
    }



    @property({
        serializable: true,
    })
    protected _spriteFrame: SpriteFrame | null = null;
    @property({
        serializable: true,
    })
    protected _direction: IndicatorDirection = IndicatorDirection.HORIZONTAL;
    @property({
        serializable: true,
    })
    protected _cellSize = new Size(20, 20);
    @property({
        serializable: true,
    })
    protected _spacing = 0;
    @property({
        serializable: true,
    })
    protected _isClicked: boolean = false;

    @property({
        serializable: true,
    })
    protected _jumpDuration: number = 0.5;
    protected _layout: Layout | null = null;
    protected _pageView: XPageViewInterface | null = null;
    protected _indicators: Node[] = [];


    public onLoad() {
        this._updateLayout();
        this.node.removeAllChildren();
        if (EDITOR) {
            if (!this._pageView) this._pageView = new EditorPageView();
            this._refresh()
        }
    }

    /**
     * @en
     * Set Page View.
     *
     * @zh
     * 设置页面视图。
     *
     * @param target @en The page view which is attached with this indicator.  @zh 当前标记对象附着到的页面视图对象。
     */
    public setPageView(target: XPageViewInterface) {
        if (this._pageView === target) return;
        this._pageView = target;
        this._refresh();
    }

    /**
     * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
     */
    public _updateLayout() {
        this._layout = this.getComponent(Layout);
        if (!this._layout) {
            this._layout = this.addComponent(Layout);
        }

        const layout = this._layout!;
        if (this.direction === IndicatorDirection.HORIZONTAL) {
            layout.type = Layout.Type.HORIZONTAL;
            layout.spacingX = this.spacing;
            layout.spacingY = 0;
            layout.alignHorizontal = true;
        } else if (this.direction === IndicatorDirection.VERTICAL) {
            layout.type = Layout.Type.VERTICAL;
            layout.spacingY = this.spacing;
            layout.spacingX = 0
            layout.alignVertical = true;
        }
        layout.resizeMode = Layout.ResizeMode.CONTAINER;
    }

    protected handleUpdateSpriteFrame() {
        for (let indicator of this._indicators) {
            let sprite = indicator.getComponent(Sprite)
            sprite.spriteFrame = this.spriteFrame
        }
    }

    handleClickIndicator(event: EventTouch) {
        let page = event.target.getSiblingIndex()
        this._pageView.gotoPage(page, this._jumpDuration)
    }

    public _createIndicator() {
        const node = new Node();
        node.layer = this.node.layer;
        const sprite = node.addComponent(Sprite);
        sprite.spriteFrame = this.spriteFrame;
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        node.parent = this.node;
        node._uiProps.uiTransformComp!.setContentSize(this._cellSize);

        if (this._isClicked) {
            let classname = XPageViewIndicator.name
            let funcname = this.handleClickIndicator.name
            let button = node.addComponent(Button)
            let eventHandler = new EventHandler();
            eventHandler.target = this.node;
            eventHandler.component = classname;
            eventHandler.handler = funcname;
            button.clickEvents.push(eventHandler)
        }

        return node;
    }

    public _changedState() {
        const indicators = this._indicators;
        if (indicators.length === 0 || !this._pageView) { return; }
        const idx = this.getCurPageIndex();
        if (idx >= indicators.length) { return; }
        for (let i = 0; i < indicators.length; ++i) {
            const node = indicators[i];
            if (!node._uiProps.uiComp) {
                continue;
            }

            const uiComp = node._uiProps.uiComp as UIRenderer;
            _color.set(uiComp.color);
            _color.a = 255 / 2;
            uiComp.color = _color;
        }

        if (indicators[idx]._uiProps.uiComp) {
            const comp = indicators[idx]._uiProps.uiComp as UIRenderer;
            _color.set(comp.color);
            _color.a = 255;
            comp.color = _color;
        }
    }

    protected getCurPageIndex() {
        return this._pageView.getCurPageIndex()
    }
    protected getPageCount() {
        return this._pageView.getPageCount();
    }

    public _refresh() {
        if (!this._pageView) { return; }
        const indicators = this._indicators;
        const pageCount = this.getPageCount();
        if (pageCount === indicators.length) {
            return;
        }
        let i = 0;
        if (pageCount > indicators.length) {
            for (i = 0; i < pageCount; ++i) {
                if (!indicators[i]) {
                    indicators[i] = this._createIndicator();
                }
            }
        } else {
            const count = indicators.length - pageCount;
            for (i = count; i > 0; --i) {
                const node = indicators[i - 1];
                this.node.removeChild(node);
                indicators.splice(i - 1, 1);
            }
        }
        if (this._layout && this._layout.enabledInHierarchy) {
            this._layout.updateLayout();
        }
        this._changedState();
    }
}
