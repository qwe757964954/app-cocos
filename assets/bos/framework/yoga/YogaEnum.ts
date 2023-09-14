import * as cc from 'cc';
import { PropEdgeBox, PropSize } from './YogaProperty';
const { ccclass, property, executeInEditMode, disallowMultiple, menu } = cc._decorator;

export enum PostionType {
    Relative = 1,
    Absolute = 2,
};

export enum MeasureMode {
    Undefined = 0,
    Exactly = 1,
    AtMost = 2,
};

export enum Justify {
    FlexStart = 0,
    Center = 1,
    FlexEnd = 2,
    SpaceBetween = 3,
    SpaceAround = 4,
    SpaceEvenly = 5,
}

export enum Align {
    Auto = 0,
    FlexStart = 1,
    Center = 2,
    FlexEnd = 3,
    Stretch = 4,
    Baseline = 5,
    SpaceBetween = 6,
    SpaceAround = 7,
}

export enum Edge {
    Left = 0,
    Top = 1,
    Right = 2,
    Bottom = 3,
    Start = 4,
    End = 5,
    Horizontal = 6,
    Vertical = 7,
    All = 8,
}

export enum Direction {
    Inherit = 0,
    LTR = 1,
    RTL = 2,
}

export enum FlexDirection {
    Column = 0,
    ColumnReverse = 1,
    Row = 2,
    RowReverse = 3,
}

export enum Wrap {
    NoWrap = 0,
    Wrap = 1,
    WrapReverse = 2,
}

export enum YoGaNodeType {
    Unsupport = 0,
    Canvas,
    Normal,
    Label,
    RichText,
    PageView,
    ScrollView,
    EditorBox,
    Button,
    ProgressBar,
    Silder,
    Toggle,
    XPageView,
    XLabel,
};


@ccclass("EdgeBox")
export class EdgeBox {
    constructor(t: number, b: number, l: number, r: number) {
        this.top = t;
        this.bottom = b;
        this.left = l;
        this.right = r;
    }
    @property({
        type: cc.CCInteger,
        serializable: true,
    })
    public top: number = 0;

    @property({
        type: cc.CCInteger,
        serializable: true,
    })
    public bottom: number = 0;

    @property({
        type: cc.CCInteger,
        serializable: true,
    })
    public left: number = 0;

    @property({
        type: cc.CCInteger,
        serializable: true,
    })
    public right: number = 0;
};

@ccclass("YoGaNodeInfo")
export class YoGaNodeInfo {
    @property({
        serializable: true
    })
    public first_init: boolean = true;

    @property({
        serializable: true,
    })
    public size: PropSize = new PropSize("auto", "auto");

    @property({
        serializable: true,
    })
    public beforeSize: PropSize = new PropSize("auto", "auto");

    @property({
        serializable: true,
    })
    public max_size: PropSize = new PropSize("auto", "auto");
    @property({
        serializable: true,
    })
    public min_size: PropSize = new PropSize("auto", "auto");

    @property({
        type: cc.CCFloat,
        serializable: true,
    })
    public aspect_ratio: number = 0;

    @property({
        type: PropEdgeBox,
        serializable: true,
    })
    public padding: PropEdgeBox = new PropEdgeBox(0, 0, 0, 0);

    @property({
        type: EdgeBox,
        serializable: true,
    })
    public border: PropEdgeBox = new PropEdgeBox(0, 0, 0, 0);

    @property({
        type: PropEdgeBox,
        serializable: true,
    })
    public margin: PropEdgeBox = new PropEdgeBox("auto", "auto", "auto", "auto");

    @property({
        type: cc.Enum(PostionType),
        serializable: true,
    })
    public position_type: PostionType = PostionType.Relative;

    @property({
        type: PropEdgeBox,
        serializable: true,
    })
    public position: PropEdgeBox = new PropEdgeBox("auto", "auto", "auto", "auto");

    @property({
        type: cc.Enum(Justify),
        serializable: true,
    })
    public justify_content: Justify = Justify.FlexStart;

    @property({
        type: cc.Enum(Align),
        serializable: true,
    })
    public algin_items: Align = Align.FlexStart;

    @property({
        type: cc.Enum(Align),
        serializable: true,
    })
    public algin_self: Align = Align.Auto;

    @property({
        type: cc.Enum(Align),
        serializable: true,
    })
    public algin_content: Align = Align.Stretch;

    @property({
        type: cc.Enum(Direction),
        serializable: true,
    })
    public direction: Direction = Direction.LTR;

    @property({
        type: cc.Enum(FlexDirection),
        serializable: true,
    })
    public flex_direction: FlexDirection = FlexDirection.Row;

    @property({
        type: cc.CCInteger,
        serializable: true,
    })
    public grow: number = 0;

    @property({
        type: cc.CCInteger,
        serializable: true,
    })
    public shrink: number = 1;

    @property({
        type: cc.Enum(Wrap),
        serializable: true,
    })
    public flex_wrap: Wrap = Wrap.NoWrap;
}