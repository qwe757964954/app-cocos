import * as cc from 'cc';
import Yoga from '@react-pdf/yoga';
import { yoga_node_to_string } from "./YogaPrint"
import { Align, Direction, Edge, EdgeBox, FlexDirection, Justify, MeasureMode, PostionType, Wrap, YoGaNodeInfo, YoGaNodeType } from './YogaEnum';
import { PropEdgeBox, PropSize, PropValue, UnitType } from './YogaProperty';
import { EDITOR } from 'cc/env';
import { view } from 'cc';
import { Layout } from 'cc';
import { Widget } from 'cc';
import { _decorator } from 'cc';
import { RichText } from 'cc';
import { Size } from 'cc';
import { YogaLabelEvent, YogaMeasureLabel } from './YogaMeasureLabel';
import { MeasureFunction, YogaMeasureImp } from './YogaMeasureImp';
import { YogaMeasureXLabel } from './YogaMeasureXLabel';
import { XLabel } from '../gui/xlabel/XLabel';
const { ccclass, property, executeInEditMode, disallowMultiple, playOnFocus } = cc._decorator;

function is_valid_number(value: number) {
    return !isNaN(value) && value != null && value != undefined;
}

function yogalog(...args) {
    return;
    args.unshift("yoga log:")
    console.log.apply(null, args)
    // let stack = (new Error()).stack
    // console.log(stack)
}

type YogaValue = number | 'auto' | `${number}%`
const EXPEND_LABEL_NODE_NAME = "$__yoga_expand_label_node__$"

@ccclass('YogaFlex')
@executeInEditMode
@disallowMultiple
export class YogaFlex extends cc.Component {
    private _node_type: YoGaNodeType = YoGaNodeType.Unsupport;
    private _is_dirty: boolean = true;
    private _is_update_new_layouting = false;
    private _is_root: boolean = false;

    get isCanvas() {
        return this._node_type == YoGaNodeType.Canvas
    }

    get isLabel() {
        return this._node_type == YoGaNodeType.Label;
    }

    get isXLabel() {
        return this._node_type == YoGaNodeType.XLabel;
    }

    get isRichText() {
        return this._node_type == YoGaNodeType.RichText;
    }
    // get isTextNode() {
    //     switch (this._node_type) {
    //         case YoGaNodeType.Label:
    //         case YoGaNodeType.RichText:
    //             {
    //                 return true;
    //             }
    //     }
    //     return false;
    // }

    @property({
        type: YoGaNodeInfo,
        serializable: true,
        visible: false,
    })
    private _yoga_node_info: YoGaNodeInfo = new YoGaNodeInfo();

    @property({
        displayName: "isRoot",
        type: cc.CCBoolean,
        group: { name: "info", displayOrder: 1 },
    })
    get isRoot() { return this._is_root; }

    private setIsRoot(isroot: boolean) {
        if (this._is_root === isroot) return;
        this._is_root = isroot

        if (this.isCanvas) return;
        if (this._is_root) {
            this.set_yoga_node_parent(this.yoga_root_node, 0)
        } else {
            this.set_yoga_node_parent(null, 0)
        }
    }

    @property({
        visible: true,
        tooltip: "debug 使用，查看当前的 parent flex",
        type: cc.Node,
        group: { name: "debug", displayOrder: 2 },
    })
    get parentFlex() {
        let parentflex = this.get_parent_flex()
        if (parentflex == null) return null

        return parentflex.node
    }

    @property({
        visible: true,
        tooltip: "debug 使用查看当前的child flex",
        type: [cc.Component],
        group: { name: "debug" },
    })
    get AllChildFlexs() {
        return this._child_flexs
    }

    private _forceUpdate: boolean = false;
    @property({
        visible: true,
        tooltip: "debug 使用，强制刷新当前界面",
        group: { name: "debug", displayOrder: 2 },
    })
    get forceUpdate() {
        return this._forceUpdate
    }
    set forceUpdate(value: boolean) {
        if (value) {
            value = false;
            this.updateRootLayout();
        }
    }
    @property({
        type: cc.Enum(YoGaNodeType),
        readonly: true,
        group: { name: "debug", displayOrder: 2 },
    })
    get YogaNodeType() {
        return this._node_type;
    }

    set YogaNodeType(type: YoGaNodeType) {
        this._node_type = type
    }

    @property({
        serializable: true,
    })
    private _isLeaf: boolean = true;
    @property({
        displayName: "isLeaf",
        tooltip: "是否是叶子节点，叶子结点不会自动给下面子节点自动添加 flex 组件",
        type: cc.CCBoolean,
        group: { name: "info", displayOrder: 1 },
        visible: function () {
            return !this.isExpandNode
        }
    })
    get isLeaf() {
        return this._isLeaf
    }
    set isLeaf(value: boolean) {
        if (this._isLeaf === value) return;

        if (this.is_force_leaf_node()) {
            console.warn(this.node.name, "node is force leaf node!!");
            value = true;
        }

        this._isLeaf = value;

        if (value) { //节点变成叶子节点，则子节点都变成root节点
            for (let child of this._child_flexs) {
                child.setIsRoot(true);
            }
        } else {
            this.init_child_flex_node();
        }
    }

    @property({
        serializable: true,
    })
    private _isAffectedByVisible: boolean = false;
    @property({
        displayName: "Affected by visible",
        tooltip: " true 则当 节点 不可见后 size 会变为 0 ",
        group: { name: "info", displayOrder: 1 },
        visible: function () {
            return !this.isExpandNode;
        }
    })
    get AffectedByVisible() {
        return this._isAffectedByVisible;
    }
    set AffectedByVisible(value: boolean) {
        this._isAffectedByVisible = value;
        this.onNodeActiveChange()
    }

    private set_node_content_size(size: cc.Size) {
        //节点不可见且不可见会更新size的时候会将node设置size(0, 0)不需要更新content size
        if (!this.node.activeInHierarchy && this._isAffectedByVisible) return;

        if (!is_valid_number(size.width)) {
            size.width = 0;
            console.warn("set_node_content_size width invalid", this.node.name)
        }

        if (!is_valid_number(size.height)) {
            console.warn("set_node_content_size height invalid", this.node.name)
            size.height = 0;
        }


        size = this.checkRichTextMaxWidthChange(size)

        //yogalog("set_node_content_size:", this.node.name, size, width, height)
        this._transform.setContentSize(size)
    }

    private set_node_position(x: number, y: number) {
        if (!is_valid_number(x)) {
            console.warn("set_node_position x invalid", this.node.name)
            x = 0;
        }

        if (!is_valid_number(y)) {
            y = 0;
            console.warn("set_node_position x invalid", this.node.name)
        }

        this.node.setPosition(x, y)
    }

    //---------- layout group ------------------
    @property({
        displayName: "Size",
        group: { name: "layout", id: "layout", },
        type: PropSize,
        visible: function () {
            return this.getComponent(cc.UITransform) != null;
        },
    })
    get size() {
        return this._yoga_node_info.size;
    }

    set size(value: Readonly<PropSize>) {
        this._yoga_node_info.size = value;
        //console.log("value size", value)
        this.set_yoga_node_width(value.width_value)
        this.set_yoga_node_height(value.height_value)
        this.set_dirty();
        //yogalog("nodeInfo:", yoga_node_to_string(this._yoga_node))
    }

    @property({
        displayName: "Max-Size",
        group: { name: "layout", id: "layout", },
        visible: function () {
            return !this._is_canvas && !this.isExpandNode && this.getComponent(cc.UITransform) != null;
        },
    }) get maxSize() { return this._yoga_node_info.max_size; }
    set maxSize(value: PropSize) {
        this._yoga_node_info.max_size = value;

        this._yoga_node.setMaxWidth(value.width_value.get_edge_value(NaN));
        this._yoga_node.setMaxHeight(value.height_value.get_edge_value(NaN));
    }

    @property({
        displayName: "Min-Size",
        group: { name: "layout", id: "layout" },
        visible: function () {
            return !this._is_canvas && !this.isExpandNode && this.getComponent(cc.UITransform) != null;
        },
    }) get minSize() { return this._yoga_node_info.min_size; }
    set minSize(value: PropSize) {
        this._yoga_node_info.min_size = value;

        this._yoga_node.setMinWidth(value.width_value.get_edge_value(NaN));
        this._yoga_node.setMinHeight(value.height_value.get_edge_value(NaN));
    }

    @property({
        displayName: "Aspect ratio",
        group: { name: "layout", id: "layout" },
        tooltip: "设置0则代表 auto ",
        visible: function () {
            return !this._is_canvas && !this.isExpandNode && this.getComponent(cc.UITransform) != null;
        },
        type: cc.CCFloat
    }) get aspectRatio() {
        if (!is_valid_number(this._yoga_node_info.aspect_ratio))
            return 0;
        return this._yoga_node_info.aspect_ratio;
    }
    set aspectRatio(value: number) {
        if (!is_valid_number(value)) {
            return;
        }

        if (value == 0) {
            value = NaN;
        }
        this._yoga_node_info.aspect_ratio = value;
        this._yoga_node.setAspectRatio(value);
    }

    @property({
        displayName: "Padding",
        group: { name: "layout", id: "layout" },
        type: PropEdgeBox,
        tooltip: "设置 auto 或者空 则为auto",
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get Padding() {
        return this._yoga_node_info.padding;
    }
    set Padding(value: PropEdgeBox) {
        this._yoga_node_info.padding = value;
        //yogalog("Padding ", value)

        this._yoga_node.setPadding(Edge.Top, value.top_value.get_edge_value(NaN));

        this._yoga_node.setPadding(Edge.Bottom, value.bottom_value.get_edge_value(NaN));

        this._yoga_node.setPadding(Edge.Left, value.left_value.get_edge_value(NaN));

        this._yoga_node.setPadding(Edge.Right, value.right_value.get_edge_value(NaN));
    }

    @property({
        displayName: "Border",
        group: { name: "layout", id: "layout" },
        tooltip: "设置 auto 或者空 则为auto",
        type: PropEdgeBox,
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get Border() { return this._yoga_node_info.border; }
    set Border(value: PropEdgeBox) {
        this._yoga_node_info.border = value;

        this._yoga_node.setBorder(Edge.Top, value.top_value.get_edge_value(NaN));
        this._yoga_node.setBorder(Edge.Bottom, value.bottom_value.get_edge_value(NaN));
        this._yoga_node.setBorder(Edge.Left, value.left_value.get_edge_value(NaN));
        this._yoga_node.setBorder(Edge.Right, value.right_value.get_edge_value(NaN));
    }

    @property({
        displayName: "Margin",
        group: { name: "layout", id: "layout" },
        tooltip: "设置 auto 或者空 则为auto",
        type: PropEdgeBox,
        visible: function () {
            return !this._is_root && this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        }
    })
    get Margin() { return this._yoga_node_info.margin; }
    set Margin(value: PropEdgeBox) {
        this._yoga_node_info.margin = value;

        this._yoga_node.setMargin(Edge.Top, value.top_value.get_edge_value(NaN));
        this._yoga_node.setMargin(Edge.Bottom, value.bottom_value.get_edge_value(NaN));
        this._yoga_node.setMargin(Edge.Left, value.left_value.get_edge_value(NaN));
        this._yoga_node.setMargin(Edge.Right, value.right_value.get_edge_value(NaN));
    }

    @property({
        displayName: "布局方式",
        group: { name: "layout", id: "layout" },
        type: cc.Enum(PostionType),
        visible: function () {
            return !this._is_root && this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        }
    })
    get PositionType() {
        return this._yoga_node_info.position_type;
    }
    set PositionType(value: PostionType) {
        this._yoga_node.setPositionType(value);
        this._yoga_node_info.position_type = value;
        if (value == PostionType.Absolute) {
            this._yoga_node_info.position.showCenterOffset = true;
            this.update_postion_absolute()
        } else {
            this._yoga_node_info.position.showCenterOffset = false;
            this._yoga_node_info.position.reset()
            this.Position = this._yoga_node_info.position
            this.set_dirty()
        }
    }

    @property({
        displayName: "Position",
        group: { name: "layout", id: "layout" },
        tooltip: "设置 auto 或者空 则为auto",
        type: PropEdgeBox,
        visible: function () {
            return !this._is_root && this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        }
    })
    get Position() {
        return this._yoga_node_info.position;
    }
    set Position(value: PropEdgeBox) {
        //yogalog("Position", this.node.name, value)
        this._yoga_node_info.position = value;

        this._yoga_node.setPosition(Edge.Top, value.top_value.get_edge_value(NaN));
        this._yoga_node.setPosition(Edge.Bottom, value.bottom_value.get_edge_value(NaN));
        this._yoga_node.setPosition(Edge.Left, value.left_value.get_edge_value(NaN));
        this._yoga_node.setPosition(Edge.Right, value.right_value.get_edge_value(NaN));
        this.set_dirty()
    }

    //---------- alginment group ------------------
    @property({
        displayName: "Justify Content",
        tooltip: "设置子节点在容器中主轴的对齐方式",
        type: cc.Enum(Justify),
        group: { name: "Alignment", id: "Alignment", },
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get JustifyContent() {
        return this._yoga_node_info.justify_content;
    }
    set JustifyContent(value: Justify) {
        this._yoga_node.setJustifyContent(value);
        this._yoga_node_info.justify_content = value;
    }

    @property({
        displayName: "Align Items",
        type: cc.Enum(Align),
        tooltip: "设置子节点在容器中纵轴的对齐方式",
        group: { name: "Alignment", id: "Alignment", },
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get AlignItems() {
        return this._yoga_node_info.algin_items;
    }
    set AlignItems(value: Align) {
        this._yoga_node.setAlignItems(value);
        this._yoga_node_info.algin_items = value;
    }

    @property({
        displayName: "Align Self",
        type: cc.Enum(Align),
        group: { name: "Alignment", id: "Alignment", },
        visible: function () {
            return !this._is_root && this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        }
    })
    get AlignSelf() {
        return this._yoga_node_info.algin_self;
    }
    set AlignSelf(value: Align) {
        this._yoga_node.setAlignSelf(value);
        this._yoga_node_info.algin_self = value;
    }

    @property({
        displayName: "Align content",
        type: cc.Enum(Align),
        group: { name: "Alignment", id: "Alignment", },
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get AlignContent() {
        return this._yoga_node_info.algin_content;
    }
    set AlignContent(value: Align) {
        this._yoga_node.setAlignContent(value);
        this._yoga_node_info.algin_content = value;
    }

    //---------- flex group ------------------
    @property({
        displayName: "Direction",
        type: cc.Enum(Direction),
        group: { name: "Flex", id: "Flex", },
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get Direction() { return this._yoga_node_info.direction; }
    set Direction(value: Direction) {
        this._yoga_node_info.direction = value;
        this.set_dirty()
    }

    @property({
        displayName: "Flex Direction",
        type: cc.Enum(FlexDirection),
        group: { name: "Flex", id: "Flex", },
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get FlexDirection() {
        return this._yoga_node_info.flex_direction;
    }
    set FlexDirection(value: FlexDirection) {
        this._yoga_node.setFlexDirection(value);
        this._yoga_node_info.flex_direction = value;
    }

    @property({
        displayName: "GRow",
        type: cc.CCInteger,
        group: { name: "Flex", id: "Flex", },
        tooltip: "0 则代表auto",
        visible: function () {
            return !this._is_root && this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get GROW() {
        return this._yoga_node_info.grow;
    }
    set GROW(value: number) {
        this._yoga_node.setFlexGrow(value);
        this._yoga_node_info.grow = value;
    }

    @property({
        displayName: "Shrink",
        type: cc.CCInteger,
        group: { name: "Flex", id: "Flex", },
        tooltip: "0 则代表auto",
        visible: function () {
            return !this._is_root && this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get Shrink() {
        return this._yoga_node_info.shrink;
    }
    set Shrink(value: number) {
        this._yoga_node.setFlexShrink(value);
        this._yoga_node_info.shrink = value;
    }

    @property({
        displayName: "Flex Wrap",
        type: cc.Enum(Wrap),
        group: { name: "Flex", id: "Flex", },
        visible: function () {
            return this.getComponent(cc.UITransform) != null && !this.isExpandNode;
        },
    })
    get FlexWrap() {
        return this._yoga_node_info.flex_wrap;
    }
    set FlexWrap(value: Wrap) {
        this._yoga_node.setFlexWrap(value);
        this._yoga_node_info.flex_wrap = value;
    }

    private _root_flex: YogaFlex = null!;
    private _parent_flex: YogaFlex = null!;
    private _yoga_root_node: Yoga.Node = null!;
    private _isHideYogaNodeSize: boolean = false; //当前是否实施过size 强制hide
    private _measure_impl: YogaMeasureImp = null!;

    get yoga_root_node() {
        if (this.isCanvas) {
            return this._yoga_node
        }

        if (this._is_root && this._yoga_root_node == null) {
            this._yoga_root_node = Yoga.Node.create();
        }

        if (this._yoga_root_node && this._yoga_root_node.getChildCount() <= 0) {
            let parent = this._yoga_node.getParent();
            parent?.removeChild(this._yoga_node);
            this._yoga_root_node.insertChild(this._yoga_node, 0)
        }
        return this._yoga_root_node
    }

    private _yoga_node: Yoga.Node = Yoga.Node.create();
    private _parent_transform: cc.UITransform = null!;
    private _transform: cc.UITransform = null!;
    private _child_flexs: YogaFlex[] = [];
    private _is_inited: boolean = false;

    public get_yoga_compute_layout() {
        return this._yoga_node.getComputedLayout();
    }

    public set_measure_func(func: MeasureFunction) {
        this._yoga_node.setMeasureFunc(func)
    }

    private set_yoga_node_width(width: number | PropValue) {
        let set_width: number | `${number}%` | 'auto' = 0;

        if (!this.node.activeInHierarchy && this._isAffectedByVisible) {
            this.set_yoga_node_hide()
        } else {
            if (width instanceof PropValue) {
                this._yoga_node_info.size.width_value.set_value(width)
                if (width.is_auto_value())
                    set_width = this.get_node_auto_width()
                else
                    set_width = width.get_real_value()
            } else {
                if (this._yoga_node_info.size.width_value.is_auto_value()) {
                    set_width = this.get_node_auto_width()
                } else {
                    this._yoga_node_info.size.width_value.set_value(width);
                    set_width = (this._yoga_node_info.size.width_value.get_real_value())
                }
            }
        }

        if (typeof (set_width) == "number")
            set_width = Math.ceil(set_width)
        this._yoga_node.setWidth(set_width)

        return set_width
    }

    private set_yoga_node_height(height: number | PropValue) {
        let set_height: number | `${number}%` | 'auto' = 0;

        if (!this.node.activeInHierarchy && this._isAffectedByVisible) {
            this.set_yoga_node_hide()
        } else {
            if (height instanceof PropValue) {
                this._yoga_node_info.size.height_value.set_value(height)
                if (height.is_auto_value())
                    set_height = this.get_node_auto_height()
                else
                    set_height = (height.get_real_value())
            } else {
                if (this._yoga_node_info.size.height_value.is_auto_value()) {
                    set_height = this.get_node_auto_height()
                } else {
                    this._yoga_node_info.size.height_value.set_value(height);
                    set_height = (this._yoga_node_info.size.height_value.get_real_value())
                }
            }
        }
        if (typeof (set_height) == "number")
            set_height = Math.ceil(set_height)
        this._yoga_node.setHeight(set_height)
    }

    private set_dirty() {
        let root_flex = this.get_root_flex();
        if (root_flex) {
            root_flex._is_dirty = true;
        }
    }

    get_parent_flex(): YogaFlex | null {
        if (this.node.parent == null) return null;
        let flex = this.node.parent.getComponent(YogaFlex);
        return flex;
    }

    private reset_root_flex(flex: YogaFlex) {
        this._root_flex = flex
        for (let child of this._child_flexs) {
            child.reset_root_flex(flex)
        }
    }

    public get_root_flex(forceUpdate: boolean = false) {
        //yogalog("get_root_flex", this.node.name)
        if (this._is_root) return this;

        if (!forceUpdate && this._root_flex) {
            return this._root_flex;
        }

        let parent_flex = this.get_parent_flex();
        while (parent_flex != null) {
            if (!forceUpdate && parent_flex._root_flex != null) {
                this._root_flex = parent_flex._root_flex;
                break;
            }

            if (parent_flex.isRoot) {
                this._root_flex = parent_flex;
                break;
            }
            parent_flex = parent_flex.get_parent_flex();
        }

        return this._root_flex;
    }

    private is_force_leaf_node() {
        switch (this._node_type) {
            case YoGaNodeType.RichText:
            case YoGaNodeType.Label:
            case YoGaNodeType.XLabel:
                return true;
        }

        return false;
    }

    private is_leaf_node_type() {
        switch (this._node_type) {
            case YoGaNodeType.Unsupport:
            case YoGaNodeType.RichText:
            case YoGaNodeType.ScrollView:
            case YoGaNodeType.EditorBox:
            case YoGaNodeType.Button:
            case YoGaNodeType.PageView:
            case YoGaNodeType.ProgressBar:
            case YoGaNodeType.Silder:
            case YoGaNodeType.Toggle:
            case YoGaNodeType.XPageView:
            case YoGaNodeType.XLabel:
                return true;
        }

        return false;
    }
    private is_child_filter_init_flex() {
        if (this._isLeaf) return true;

        return this.is_leaf_node_type()
    }

    private init_child_flex_node() {
        this._child_flexs = [];
        if (this.is_child_filter_init_flex()) return;

        let root_flex = this.get_root_flex()
        for (let child of this.node.children) {
            let flex = child.getComponent(YogaFlex) || child.addComponent(YogaFlex);
            flex.initControl();
            flex._root_flex = root_flex;
            flex._parent_flex = null;
            flex.set_flex_node_parent(this)
            flex.init_child_flex_node();
        }
    }

    //不包含 uitransfrom 的节点需要设置为空节点，因为需要依赖node的 index，不得以非ui也得保留flex节点
    private set_as_empty_node() {
        this.size = new PropSize(0, 0);
    }

    private get_node_type() {
        if (this._node_type != YoGaNodeType.Unsupport)
            return this._node_type;

        //不存在 ui transfrom 的节点则为非法 UI 节点不支持
        if (null == this.node.getComponent(cc.UITransform))
            return YoGaNodeType.Unsupport;

        if (null != this.node.getComponent(cc.Canvas)) {
            return YoGaNodeType.Canvas;;
        }

        if (null != this.node.getComponent(cc.Label)) {
            return YoGaNodeType.Label;
        }

        if (null != this.node.getComponent(cc.RichText)) {
            return YoGaNodeType.RichText;;
        }

        if (null != this.node.getComponent(cc.PageView))
            return YoGaNodeType.PageView;

        if (null != this.node.getComponent("XPageView"))
            return YoGaNodeType.XPageView;

        if (null != this.node.getComponent(cc.ScrollView))
            return YoGaNodeType.ScrollView;

        if (null != this.node.getComponent(cc.EditBox))
            return YoGaNodeType.EditorBox;

        if (null != this.node.getComponent(cc.Button))
            return YoGaNodeType.Button;

        if (null != this.node.getComponent(cc.ProgressBar))
            return YoGaNodeType.ProgressBar;

        if (null != this.node.getComponent(cc.Slider))
            return YoGaNodeType.Silder;

        if (null != this.node.getComponent(cc.Toggle))
            return YoGaNodeType.Toggle;

        if (null != this.node.getComponent("XLabel"))
            return YoGaNodeType.XLabel;
        return YoGaNodeType.Normal;
    }

    private init_width_save_info() {
        //console.log("init_width_save_info:", this.node.name, this._yoga_node_info)
        let size = this._yoga_node_info.size;
        //兼容老的为保存数据的将数据补回
        if (this._yoga_node_info.beforeSize == null) {
            this._yoga_node_info.beforeSize.set_value(size.width_value, size.height_value)
        }

        if (this._isAffectedByVisible && !this.node.activeInHierarchy) {
            this.set_yoga_node_hide()
        } else {
            this.set_yoga_node_width(size.width_value)
            this.set_yoga_node_height(size.height_value)
            if (!this.isRoot)
                this.Margin = this._yoga_node_info.margin;
        }

        this.maxSize = this._yoga_node_info.max_size;
        this.minSize = this._yoga_node_info.min_size;
        this.aspectRatio = this._yoga_node_info.aspect_ratio;
        this.Padding = this._yoga_node_info.padding;
        this.Border = this._yoga_node_info.border;
        if (!this.isRoot) {

            this.Position = this._yoga_node_info.position;
            this._yoga_node.setPositionType(this._yoga_node_info.position_type);
        }

        this.JustifyContent = this._yoga_node_info.justify_content;
        this.AlignItems = this._yoga_node_info.algin_items;
        if (!this.isRoot)
            this.AlignSelf = this._yoga_node_info.algin_self;

        this.AlignContent = this._yoga_node_info.algin_content;

        this.Direction = this._yoga_node_info.direction;
        this.FlexDirection = this._yoga_node_info.flex_direction;

        if (!this.isRoot) {
            this.GROW = this._yoga_node_info.grow;
            this.Shrink = this._yoga_node_info.shrink;
        }

        this.FlexWrap = this._yoga_node_info.flex_wrap;
    }

    onDestroy(): void {
        this.un_init_event();
        if (this._parent_flex) {
            this._parent_flex.remove_child_flex_node(this.node)
        }

        if (this._yoga_root_node) {
            Yoga.Node.destroy(this._yoga_root_node)
            this._yoga_root_node = null;
        }

        if (this._yoga_node) {
            Yoga.Node.destroy(this._yoga_node)
            this._yoga_node = null
        }

    }

    private check_do_first_init() {
        //yogalog("check_do_first_init()", this.node.name, this._yoga_node_info)
        if (!this._yoga_node_info.first_init) return;
        this._yoga_node_info.first_init = false;

        //初始默认设置 默认size，方便编辑器使用
        this._yoga_node_info.size.width_value.set_value(this.get_node_init_width())
        this._yoga_node_info.size.height_value.set_value(this.get_node_init_height())
        let size = this._yoga_node_info.size
        this._yoga_node_info.beforeSize.set_value(size.width_value, size.height_value)

        //默认根据节点类型设置是否是叶子节点
        //this._isLeaf = this.is_leaf_node_type();

        //yogalog("check_do_first_init done", this.node.name, this._yoga_node_info)
    }

    private removeComponents() {
        let layout = this.getComponent(Layout)
        if (layout) layout.destroy();

        let widget = this.getComponent(Widget)
        if (widget) widget.destroy();
    }

    private isParentIsLeaf() {
        let parent = this.node.parent
        if (parent == null) return true;

        let parentFlex = parent.getComponent(YogaFlex)
        if (parentFlex == null) return true;

        return parentFlex.isLeaf
    }

    onLoad() {
        this.initControl();
    }

    private remove_old_label_expand_node() {
        let node = this.node.getChildByName(EXPEND_LABEL_NODE_NAME)
        if (node) {
            node.removeFromParent();
            node.destroy();
        }
    }

    private check_add_measure() {
        switch (this._node_type) {
            case YoGaNodeType.Label:
                {
                    this._measure_impl = new YogaMeasureLabel();
                    this._measure_impl.init(this);
                    break;
                }
            case YoGaNodeType.XLabel:
                {
                    this._measure_impl = new YogaMeasureXLabel();
                    this._measure_impl.init(this);
                    break;
                }
        }
    }

    private initControl() {
        if (this._is_inited) return;
        this._is_inited = true;
        this.removeComponents()
        this.remove_old_label_expand_node();
        this._node_type = this.get_node_type();
        // yogalog("node type", this._node_type)

        if (!this.isCanvas)
            this._parent_transform = this.node.parent?.getComponent(cc.UITransform)!;
        this._transform = this.node.getComponent(cc.UITransform)!;
        this.check_add_measure()
        this.check_do_first_init()
        this.setIsRoot(this.isParentIsLeaf());

        this._root_flex = this._is_root ? this : null!;

        if (this._transform == null) {
            this.set_as_empty_node();
        } else {
            this.init_width_save_info();
        }

        if (!this._is_root)
            this.set_flex_node_parent(this.get_parent_flex())

        //console.log("this._yoga_node", this.node.name, this._is_root, this._yoga_node)
        //yogalog(yoga_node_to_string(this._yoga_node))


        this._yoga_node.setDirtiedFunc(() => {
            this.set_dirty();
        })

        this.init_child_flex_node();
        this.init_event();
    }

    public set_flex_node_parent(parent_flex: YogaFlex) {
        if (this._parent_flex == parent_flex) return false;

        this.setIsRoot(parent_flex == null)

        if (this._parent_flex) {
            this._parent_flex.remove_child_flex_node(this.node);
        }
        this._parent_flex = parent_flex

        if (parent_flex) {
            this.reset_root_flex(parent_flex.get_root_flex())

            let index = this.node.getSiblingIndex();
            //console.log("set_flex_node_parent", this.node.name, index)
            this.set_yoga_node_parent(parent_flex._yoga_node, index)
            parent_flex._child_flexs.push(this);
            parent_flex.isLeaf = false;

            return true;
        } else {
            this.reset_root_flex(this)
        }

        this.set_dirty()

        return false;
        //yogalog("onload create yoga node", this.node.name, this._yoga_node, index)
    }

    private get_parent_size(defSize?: Readonly<cc.Size>): Readonly<cc.Size> {
        if (this.isCanvas) return this._transform.contentSize;
        if (this._parent_transform == null && this.node.parent != null) {
            this._parent_transform = this.node.parent.getComponent(cc.UITransform)
        }

        if (this._parent_transform)
            return this._parent_transform.contentSize;

        if (defSize != undefined)
            return defSize;

        return view.getVisibleSize()
    }

    private get_parent_anchor(): cc.Vec2 {
        if (this.isCanvas) return cc.v2(0.5, 0.5);
        return this._parent_transform.anchorPoint;
    }

    public update_flex_node_layout(setParentSize?: Size) {
        if (!this._is_root || !this._is_dirty || this._yoga_node == null)
            return;
        //console.log("update_flex_node_layout")

        this._is_dirty = false;
        let parent_size = this.get_parent_size(setParentSize)

        let root_yoga_node = null
        if (this._is_root) {
            root_yoga_node = this.yoga_root_node
        } else {
            root_yoga_node = this._yoga_node;
            //this.set_yoga_node_parent(s_yaga_temp_root_node, 0)
        }

        //yogalog("update_flex_node_layout", root_yoga_node, visibleSize, yoga_node_to_string(root_yoga_node))
        let width = undefined
        let height = undefined
        if (this.isCanvas) {
            width = parent_size.width
            height = parent_size.height
        } else {
            if (this.size.width_value.is_percent_value()) {
                //root_yoga_node.setWidth(parent_size.width)
                width = parent_size.width
            }

            if (this.size.height_value.is_percent_value()) {
                //root_yoga_node.setHeight(parent_size.height)
                height = parent_size.height
            }
        }

        //console.log("calculateLayout", width, height)
        root_yoga_node.calculateLayout(width, height, this._yoga_node_info.direction);
        this.update_new_layout(parent_size, true);
    }

    private update_node_size_from_yoga() {

        let layout = this._yoga_node.getComputedLayout();
        let cur_size = cc.size(layout.width, layout.height)
        this.set_node_content_size(cur_size)

        return cur_size
    }

    private update_new_layout(parent_size: cc.Size, updateChild: boolean) {
        if (this._transform == null) return;
        //yogalog("update_new_layout", this.node.name, parent_size, this._child_flexs)
        this._is_update_new_layouting = true;
        let cur_size;
        if (!this.isCanvas) {
            let layout = this._yoga_node.getComputedLayout();
            cur_size = cc.size(layout.width, layout.height)
            this.set_node_content_size(cur_size)
            if (!this._is_root) {
                let parent_anchor = this.get_parent_anchor();
                let anchor = this._transform.anchorPoint;
                let x = layout.left - (parent_anchor.x * parent_size.width) + layout.width * anchor.x;
                let y = -layout.top + ((1 - parent_anchor.y) * parent_size.height) - layout.height * (1 - anchor.y);

                let yogaPosition = this._yoga_node_info.position
                if (this.PositionType == PostionType.Absolute && yogaPosition.left_value.is_auto_value() && yogaPosition.right_value.is_auto_value()) {
                    if (yogaPosition.center_offset_x_value.is_number_value()) {
                        let offset = yogaPosition.center_offset_x_value.get_real_value();
                        if (typeof (offset) == "number") {
                            x = x + parent_size.width / 2 + offset - layout.width / 2
                        } else {
                            cc.assert(false, "offset x type is not number", typeof (offset), offset)
                        }
                    }
                }

                if (this.PositionType == PostionType.Absolute && yogaPosition.top_value.is_auto_value() && yogaPosition.bottom_value.is_auto_value()) {
                    if (yogaPosition.center_offset_y_value.is_number_value()) {
                        let offset = yogaPosition.center_offset_y_value.get_real_value()
                        if (typeof (offset) == "number") {
                            y = y - parent_size.height / 2 + 0.5 * layout.height - offset
                        } else {
                            cc.assert(false, "offset y type is not number", typeof (offset), offset)
                        }
                    }
                }

                this.set_node_position(x, y);
                //console.log(this.node.name, "update_new_layout:", layout, "x:", x, " y:", y);
            }
        } else {
            cur_size = this._transform.contentSize;
        }

        for (let child_flex of this._child_flexs) {
            child_flex.update_new_layout(cur_size, true);
        }
        this._is_update_new_layouting = false;
    }

    protected onChildAdded(child: cc.Node) {
        //yogalog("onChildAdded", this.node.name, child.name);
        if (this.is_child_filter_init_flex())
            return;

        if (child == null) return;
        let flex = child.getComponent(YogaFlex);
        if (null == flex) { //如果新家的节点不存在 Yoga 则添加组件，已经存在的不需要处理，由 onChangeParent 处理
            flex = child.addComponent(YogaFlex)
            flex.set_flex_node_parent(this)
            this.set_dirty()
        }
    }

    private remove_child_flex_node(child: cc.Node) {
        let flex = child.getComponent(YogaFlex);
        if (flex == null) return;
        this._yoga_node.removeChild(flex._yoga_node);
        let index = this._child_flexs.indexOf(flex);
        this._child_flexs.splice(index, 1);
        this.set_dirty();
    }

    onChildRemoved(child: cc.Node) {
        //不需要处理由 onChangeParent 处理

    }

    onParentAnchorChange() {
        if (this._is_update_new_layouting) return;
        let parent_size = this._parent_transform.contentSize;
        this.update_new_layout(parent_size, false);
    }

    onSelfAnchorChange() {
        if (this._is_update_new_layouting) return;
        let parent_size = this._parent_transform.contentSize;
        this.update_new_layout(parent_size, false);
    }

    private checkRichTextMaxWidthChange(setSize: cc.Size): cc.Size {
        if (!this.isRichText) return setSize;

        let richtext = this.node.getComponent(RichText)
        if (richtext == null) return setSize;
        let size = this.size;
        if (size.width_value.is_auto_value()) {
            richtext.maxWidth = 0
        }
        else
            richtext.maxWidth = setSize.width

        setSize.width = (richtext as any)._labelWidth
        setSize.height = (richtext as any)._labelHeight

        //console.log("checkRichTextMaxWidthChange", setSize)

        return setSize
    }

    onLabelStringChange() {
        if (!this.isLabel) return;
        this._yoga_node.markDirty();
        this.set_dirty();
    }

    onXLabelSizeAttrChange() {
        if (!this.isXLabel) return;
        this._yoga_node.markDirty();
        this.set_dirty();
    }

    onSelfSizeChange() {
        //update_new_layout 触发的 size change 直接返回
        if (this._is_update_new_layouting) return;
        if (this._measure_impl != null) {
            // 有 measure 实现的 节点不需要处理 size change
        } else if (this.isRichText) {
            let size = this._transform.contentSize
            if (this.size.width_value.is_auto_value()) {
                this.set_yoga_node_width(size.width)
            }
            this.set_yoga_node_height(size.height)
            //console.log("onSelfSizeChange 111")
        } else {
            this.update_node_size_from_yoga()
            //console.log("onSelfSizeChange 222")
        }
        //console.log("size change:", this.node.name, this._transform.contentSize)

    }

    set_yoga_node_hide() {
        if (this._isHideYogaNodeSize) return;
        this._isHideYogaNodeSize = true;
        let value = this._yoga_node_info.size
        this._yoga_node_info.beforeSize.set_value(value.width_value, value.height_value)
        this.set_yoga_node_width(0)
        this.set_yoga_node_height(0)

        if (!this.isRoot) {
            this._yoga_node.setMargin(Edge.Top, NaN);
            this._yoga_node.setMargin(Edge.Bottom, NaN);
            this._yoga_node.setMargin(Edge.Left, NaN);
            this._yoga_node.setMargin(Edge.Right, NaN);
        }
    }

    set_yoga_node_visible() {
        if (!this._isHideYogaNodeSize) return;
        this._isHideYogaNodeSize = false;
        let size = this._yoga_node_info.beforeSize
        this.set_yoga_node_width(size.width_value)
        this.set_yoga_node_height(size.height_value)
        if (!this.isRoot)
            this.Margin = this._yoga_node_info.margin
    }

    onNodeActiveChange() {
        //yogalog("onNodeActiveChange", this.node.name)
        if (this.node.activeInHierarchy) {
            if (this._isAffectedByVisible) {
                this.set_yoga_node_visible();
            }
        } else {
            if (this._isAffectedByVisible)
                this.set_yoga_node_hide()
        }

        this._child_flexs.forEach((childFlex: YogaFlex) => {
            childFlex.onNodeActiveChange();
        })
    }

    private get_node_init_width() {
        let width: number | 'auto' = this._transform.contentSize.width
        if (this._measure_impl != null)
            width = 'auto'

        return width;

    }

    private get_node_init_height() {
        let height: number | 'auto' = this._transform.contentSize.height
        if (this._measure_impl != null)
            height = 'auto'

        return height;
    }

    private get_node_auto_width() {
        let width: number | 'auto' = 'auto'
        if (this.isRichText) {
            return this._transform.contentSize.width;
        }
        return width
    }

    private get_node_auto_height() {
        let height: number | 'auto' = 'auto'
        if (this.isRichText) {
            return this._transform.contentSize.height;
        }
        return height
    }

    update_postion_absolute() {
        if (this.PositionType != PostionType.Absolute) return;
        if (!this._is_root) {
            let curpos = this.node.position;
            let layout = this._yoga_node.getComputedLayout();
            let nodesize = this._transform.contentSize
            let parent_size = this.get_parent_size()
            let parent_anchor = this.get_parent_anchor();
            let anchor = this._transform.anchorPoint;

            let width = is_valid_number(layout.width) ? layout.width : nodesize.width
            let height = is_valid_number(layout.height) ? layout.height : nodesize.height

            //yogalog("update_postion_absolute", layout)

            let left = curpos.x + (parent_anchor.x * parent_size.width) - width * anchor.x;
            let top = (parent_anchor.y * parent_size.height) - height * anchor.y - curpos.y
            let right = parent_size.width - (left + width)
            let bottom = (top - height)


            let centerOffsetX = true;
            let centerOffsetY = true;
            if (this._yoga_node_info.position.left_value.is_number_value()) {
                this._yoga_node_info.position.left_value.set_value(left)
                centerOffsetX = false;
            }

            if (this._yoga_node_info.position.right_value.is_number_value()) {
                this._yoga_node_info.position.right_value.set_value(right)
                centerOffsetX = false;
            }

            if (centerOffsetX && this._yoga_node_info.position.center_offset_x_value.is_auto_value()) {
                centerOffsetX = false;
            }

            if (this._yoga_node_info.position.top_value.is_number_value()) {
                this._yoga_node_info.position.top_value.set_value(top)
                centerOffsetY = false;
            }


            if (this._yoga_node_info.position.bottom_value.is_number_value()) {
                this._yoga_node_info.position.bottom_value.set_value(bottom)
                centerOffsetY = false;
            }

            if (centerOffsetY && this._yoga_node_info.position.center_offset_x_value.is_auto_value()) {
                centerOffsetY = false;
            }

            this.Position = this._yoga_node_info.position
            this.set_dirty();
        }
    }
    transfrom_change(tranformbit: number) {
        // 再编辑器模式下，方式随便拖动位置
        if (tranformbit & cc.TransformBit.POSITION) {
            if (this._is_update_new_layouting) return;

            if (this.PositionType == PostionType.Absolute) {
                this.update_postion_absolute()
            } else {
                this.set_dirty();
            }
        }
    }

    private set_yoga_node_parent(parent_node: Yoga.Node, insertIndex: number) {
        let oldParent = this._yoga_node.getParent();
        if (oldParent != parent_node) {
            oldParent?.removeChild(this._yoga_node)

            if (parent_node) {
                let count = parent_node.getChildCount()
                if (insertIndex > count) {
                    insertIndex = count;
                }
                parent_node.insertChild(this._yoga_node, insertIndex)
            }
        }
    }
    on_sibling_order_change() {
        //console.log("on_sibling_order_change", this.node.name, this.node.getSiblingIndex())

        // let parentFlex = this.get_parent_flex();
        // if (parentFlex) {
        //     let index = this.node.getSiblingIndex()
        //     this.set_yoga_node_parent(parentFlex._yoga_node, index)
        // }

        {//目前节点 order 变化的时候 是父节点派发的事件，应该是bug，先兼容处理
            type sortItem = { item: YogaFlex, index: number };

            let temparray: sortItem[] = []
            for (let child of this._child_flexs) {
                temparray.push({ item: child, index: child.node.getSiblingIndex() })
            }

            temparray.sort((a: sortItem, b: sortItem) => {
                return a.index - b.index;
            })

            for (let item of temparray) {
                let flex = item.item
                flex.set_yoga_node_parent(this._yoga_node, item.index)
                //console.log("flex index", flex.node.name, item.index)
            }
        }

        this.set_dirty();
    }


    on_add_component(component: cc.Component) {
        if (this._node_type == YoGaNodeType.Unsupport) {
            this._transform = this.getComponent(cc.UITransform)
            this._node_type = this.get_node_type();
            this.isLeaf = this.is_leaf_node_type();
        }
    }

    on_remove_compoent(component: cc.Component) {
        if (this._node_type != YoGaNodeType.Unsupport && component instanceof cc.UITransform) {
            if (this.node.getComponent(cc.UITransform) == null) {
                this._node_type = YoGaNodeType.Unsupport;
                this.isLeaf = true;
                for (let child of this._child_flexs) {
                    this._yoga_node.removeChild(child._yoga_node)
                    child.destroy()
                }
                this._child_flexs = []
            }
        }
    }

    private onChangeParent() {
        let curIsRoot = false;
        curIsRoot = this.isParentIsLeaf()
        //console.log("onChangeParent", this.node.name, this.node.parent.name)

        if (curIsRoot != this._is_root) {
            this.setIsRoot(curIsRoot);
            this.reset_root_flex(this.get_root_flex(true))
        }
        this.set_flex_node_parent(this.get_parent_flex())
    }

    onRootParentSizeChange() {
        if (!this._is_root) return;
        this.set_dirty()
    }

    private init_event(): void {

        this.node.on(cc.Node.EventType.CHILD_ADDED, this.onChildAdded, this)
        this.node.on(cc.Node.EventType.CHILD_REMOVED, this.onChildRemoved, this)

        this.node.on(YogaLabelEvent.STRING_CHANGE, this.onLabelStringChange, this)
        this.node.on(XLabel.EventType.SIZE_ATTRIBUTE_CHANGE, this.onXLabelSizeAttrChange, this)
        this.node.on(cc.Node.EventType.PARENT_CHANGED, this.onChangeParent, this)

        if (EDITOR) {
            this.node.on(cc.Node.EventType.TRANSFORM_CHANGED, this.transfrom_change, this)
        }

        this.node.parent?.on(cc.Node.EventType.ANCHOR_CHANGED, this.onParentAnchorChange, this)
        this.node.parent?.on(cc.Node.EventType.SIZE_CHANGED, this.onRootParentSizeChange, this);

        this.node.on(cc.Node.EventType.SIBLING_ORDER_CHANGED, this.on_sibling_order_change, this)
        this.node.on(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this.onNodeActiveChange, this)
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.onSelfSizeChange, this)
        this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.onSelfAnchorChange, this)
        this.node.on(cc.Node.EventType.COMPONENT_ADDED, this.on_add_component, this)
        this.node.on(cc.Node.EventType.COMPONENT_REMOVED, this.on_remove_compoent, this)
    }

    private un_init_event() {
        if (this.node == null) return;

        this.node.off(cc.Node.EventType.CHILD_ADDED, this.onChildAdded, this)
        this.node.off(cc.Node.EventType.CHILD_REMOVED, this.onChildRemoved, this)

        this.node.off(cc.Node.EventType.PARENT_CHANGED, this.onChangeParent, this)
        this.node.off(YogaLabelEvent.STRING_CHANGE, this.onLabelStringChange, this)
        this.node.off(XLabel.EventType.STRING_CHANGE, this.onXLabelSizeAttrChange, this)
        if (EDITOR) {
            this.node.off(cc.Node.EventType.TRANSFORM_CHANGED, this.transfrom_change, this)
        }

        this.node.off(cc.Node.EventType.SIBLING_ORDER_CHANGED, this.on_sibling_order_change, this)
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this.onSelfSizeChange, this)
        this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.onSelfAnchorChange, this)
        this.node.off(cc.Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this.onNodeActiveChange, this)
        this.node.off(cc.Node.EventType.COMPONENT_ADDED, this.on_add_component, this)
        this.node.off(cc.Node.EventType.COMPONENT_REMOVED, this.on_remove_compoent, this)

        this.node.parent?.off(cc.Node.EventType.ANCHOR_CHANGED, this.onParentAnchorChange, this);
        this.node.parent?.off(cc.Node.EventType.SIZE_CHANGED, this.onRootParentSizeChange, this);

        // if (this._is_root) {
        //     for (let child of this.node.children) {
        //         if (child.components) {
        //             let flex = child.getComponent(YogaFlex);
        //             if (flex == null) continue;
        //             flex._is_root = true;
        //             flex.init_child_flex_node();
        //         }
        //         else {
        //             console.warn("child null!", child.name)
        //         }
        //     }
        // }
    }

    update(deltaTime: number) {
        this.update_flex_node_layout();
    }

    // 此接口为强刷接口，默认 mustRoot = true 只允许root 刷新
    // parent_size 如果节点size 受父节点影响，但是此时节点还未加入父节点的时候可以传此参数作为刷新节点的参考大小
    public updateRootLayout(parent_size?: Size) {
        this.initControl();
        if (this._is_root) {
            this.set_dirty();
            this.update_flex_node_layout(parent_size)
        } else {
            this.set_dirty();
            this.get_root_flex().update_flex_node_layout(parent_size)
        }
    }

    public updateLayout(parent_size?: Size) {
        this.initControl();
        if (this._is_root) {
            this._is_dirty = true;
            this.update_flex_node_layout(parent_size)
        } else {
            let width = undefined
            let height = undefined
            if (parent_size) {
                width = parent_size.width
                height = parent_size.height
            }

            this._yoga_node.calculateLayout(width, height, this._yoga_node_info.direction);
            parent_size = this.get_parent_size(parent_size)
            this.update_new_layout(parent_size, true);
        }
    }

    public setSize(width?: YogaValue, height?: YogaValue) {
        if (width === undefined && height == undefined) return;

        let size = this._yoga_node_info.size
        if (width != undefined) {
            size.width_value.set_value(width)
        }
        if (height != undefined) {
            size.height_value.set_value(height)
        }

        this.size = size
    }

    public setMaxSize(width?: YogaValue, height?: YogaValue) {
        if (width === undefined && height == undefined) return;

        let size = this._yoga_node_info.max_size
        if (width != undefined) {
            size.width_value.set_value(width)
        }
        if (height != undefined) {
            size.height_value.set_value(height)
        }

        this.maxSize = size
    }

    public setMinSize(width?: YogaValue, height?: YogaValue) {
        if (width === undefined && height == undefined) return;

        let size = this._yoga_node_info.min_size
        if (width != undefined) {
            size.width_value.set_value(width)
        }
        if (height != undefined) {
            size.height_value.set_value(height)
        }

        this.minSize = size
    }

    public setAspectRatio(ratio: number) {
        this.aspectRatio = ratio;
    }

    public setPadding(left?: YogaValue, right?: YogaValue, top?: YogaValue, bottom?: YogaValue) {
        let haveValue = false;
        let padding = this._yoga_node_info.padding;

        if (left !== undefined) {
            padding.left_value.set_value(left);
            haveValue = true;
        }

        if (right !== undefined) {
            padding.right_value.set_value(right);
            haveValue = true;
        }

        if (top !== undefined) {
            padding.top_value.set_value(top);
            haveValue = true;
        }

        if (bottom !== undefined) {
            padding.bottom_value.set_value(bottom);
            haveValue = true;
        }

        if (!haveValue) return;
        this.Padding = padding;
    }

    public setBorder(left?: YogaValue, right?: YogaValue, top?: YogaValue, bottom?: YogaValue) {
        let haveValue = false;
        let border = this._yoga_node_info.border;

        if (left !== undefined) {
            border.left_value.set_value(left);
            haveValue = true;
        }

        if (right !== undefined) {
            border.right_value.set_value(right);
            haveValue = true;
        }

        if (top !== undefined) {
            border.top_value.set_value(top);
            haveValue = true;
        }

        if (bottom !== undefined) {
            border.bottom_value.set_value(bottom);
            haveValue = true;
        }

        if (!haveValue) return;
        this.Border = border;
    }

    public setMargin(left?: YogaValue, right?: YogaValue, top?: YogaValue, bottom?: YogaValue) {
        let haveValue = false;
        let margin = this._yoga_node_info.margin;

        if (left !== undefined) {
            margin.left_value.set_value(left);
            haveValue = true;
        }

        if (right !== undefined) {
            margin.right_value.set_value(right);
            haveValue = true;
        }

        if (top !== undefined) {
            margin.top_value.set_value(top);
            haveValue = true;
        }

        if (bottom !== undefined) {
            margin.bottom_value.set_value(bottom);
            haveValue = true;
        }

        if (!haveValue) return;
        this.Margin = margin;
    }

    public setPositionType(type: PostionType) {
        this.PositionType = type;
    }

    public setPosition(left?: YogaValue, right?: YogaValue, top?: YogaValue, bottom?: YogaValue) {
        let haveValue = false;
        let position = this._yoga_node_info.position;

        if (left !== undefined) {
            position.left_value.set_value(left);
            haveValue = true;
        }

        if (right !== undefined) {
            position.right_value.set_value(right);
            haveValue = true;
        }

        if (top !== undefined) {
            position.top_value.set_value(top);
            haveValue = true;
        }

        if (bottom !== undefined) {
            position.bottom_value.set_value(bottom);
            haveValue = true;
        }

        if (!haveValue) return;
        this.Position = position;
    }

    public setJusityContent(justify: Justify) {
        this.JustifyContent = justify;
    }

    public setAlignItems(align: Align) {
        this.AlignItems = align;
    }

    public setAlignSelf(align: Align) {
        this.AlignSelf = align;
    }

    public setAlignContent(align: Align) {
        this.AlignContent = align;
    }

    public setDirection(direct: Direction) {
        this.Direction = direct;
    }

    public setFlexDirection(flexDir: FlexDirection) {
        this.FlexDirection = flexDir;
    }

    public setGRow(grow: number) {
        this.GROW = grow;
    }

    public setShrink(shrink: number) {
        this.Shrink = shrink;
    }

    public setFlexWrap(wrap: Wrap) {
        this.FlexWrap = wrap;
    }

    protected onEnable(): void {
        this._measure_impl?.onEnable();
    }

    protected onDisable(): void {
        this._measure_impl?.onDisable();
    }
}


