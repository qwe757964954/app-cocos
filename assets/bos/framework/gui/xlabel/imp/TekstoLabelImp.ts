import { Node } from "cc";
import { ByLabelImpBase, ByLabelInterface } from "./ByLabelImpBase";
import { AttributeType, FontSlant, FontWeight, HorizontalAlignment, IMemoryImageSource, LabelChildType, LayoutAlignment, LineTruncateMode, MessageType, PaceHolderMode, TekstoMessage, VerticalAlignment } from "./TekstoEnum"
import { SpriteFrame } from "cc";
import { Texture2D } from "cc";
import { ImageAsset } from "cc";
import { Rect } from "cc";
import { UITransform } from "cc";
import { Sprite } from "cc";
import { builtinResMgr } from "cc";
import { Color } from "cc";
import { Size } from "cc";
import { DirtyFlag } from "../XLabelEnum";
import { Vec2 } from "cc";
import { v2 } from "cc";

const RichTextChildName = 'RICHTEXT_CHILD_BY';
const RichTextChildPlaceHoldName = 'RICHTEXT_PlaceHold_CHILD_BY';
const RichTextChildVectorName = 'RICHTEXT_Vector_CHILD_BY';
const RichTextChildSelectName = 'RICHTEXT_SELECT_CHILD_BY';
const RichTextChildCursorName = 'RICHTEXT_Cursor_CHILD_BY';


const SELECT_ALL_BEGIN = v2(0, 0)
const SELECT_ALL_END = v2(-1, -1)

let CUR_SELECT_BEGIN = v2(0, 0)
let CUR_SELECT_END = v2(0, 0)

declare class NativeLabelChild {
    type: LabelChildType;
    x: number;
    y: number;
    width: number;
    height: number;
    color?: number;
    bg_color?: number;
    imageAsset?: ImageAsset;
    imageSource?: IMemoryImageSource;
    path?: string;
    node?: Node;
};

interface IntColor {
    int: number;
    color: number;
}
type AttrValue = string | number | PaceHolder | Vec2 | IntColor;

declare class Attribute {
    type: AttributeType;
    start_index: number;
    end_index: number;
    value: AttrValue;
};

export interface Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;
    offsetX?: number,
    offsetY?: number,
};

export interface MessageString {
    strs: string;
    attrs: Attribute[];
    rects: Rectangle[];
};

export interface PaceHolder {
    x: number,
    y: number,
    width: number,
    height: number,
    image: string,
    mode: PaceHolderMode,
};

declare class NativeTekstoLabel {
    constructor();
    static register_place_holder(key: string, width: number, height: number): boolean;
    static unregister_place_holder(key: string): boolean;
    static register_font(path: string, tag?: string): string;
    static unregister_font(path: string): boolean;

    set_html_text(text: string);
    set_text(texts: TekstoMessage[]): boolean;
    display(width: number, height: number): Size;
    measure(width: number, height: number): Size;
    set_max_lines(lines: number);
    max_lines(): number;
    set_line_space(line_space: number): boolean;
    line_space(): number;
    set_letter_spacing(letter_spacing: number): boolean;
    letter_spacing(): number;

    ellipsis_char(): number;
    set_ellipsis_char(char: number);

    set_line_truncate_mode(mode: LineTruncateMode): boolean;
    line_truncate_mode(): LineTruncateMode;

    set_horizontal_alignment(mode: HorizontalAlignment);
    horizontal_alignment(): HorizontalAlignment;

    set_vertical_alignment(mode: VerticalAlignment);
    vertical_alignment(): VerticalAlignment;

    set_layout_alignment(mode: LayoutAlignment);
    layout_alignment(): LayoutAlignment;

    get_childrens(): NativeLabelChild[];

    set_cursor(x: number, y: number);
    select(from: Vec2, to: Vec2, copy: boolean): MessageString;
    remove(n: number);
    insert(str: string);
    get_cursor_child(): NativeLabelChild;
}

function convert_to_teksto_color(color: Readonly<Color>): number {
    return color.a << 24 | color.r << 16 | color.g << 8 | color.b;
}

function convert_from_teksto_color(value: number) {
    let a = (value & 0xFF000000) >>> 24;
    let r = (value & 0x00FF0000) >> 16;
    let g = (value & 0x0000FF00) >> 8;
    let b = (value & 0x000000FF);

    return new Color(r, g, b, a);
}

export class TekstoLabelImp extends ByLabelImpBase {

    private _tekstoLabel: NativeTekstoLabel = null!;
    private _tekstoMessage: TekstoMessage[] = [];

    private _selectNodes: UITransform[] = [];
    private _beginRect: Rectangle = null!;
    private _endRect: Rectangle = null!;

    private _curChildrens: NativeLabelChild[] = [];

    constructor(node: Node, labelOwner: ByLabelInterface) {
        super(node, labelOwner)
        this._tekstoLabel = new NativeTekstoLabel;
        this._tekstoLabel.set_max_lines(0);
    }

    public applySetting(value: string): boolean {
        let dirtyFlag = this._byLabel.DirtyFlag;
        let forceUpdate: boolean = false;
        if ((dirtyFlag & DirtyFlag.LINE_SPACE) != 0) {
            this._tekstoLabel.set_line_space(this._byLabel.LineSpace);
            forceUpdate = true;
        }


        if ((dirtyFlag & DirtyFlag.LETTER_SPACE) != 0) {
            this._tekstoLabel.set_letter_spacing(this._byLabel.LetterSpace)
            forceUpdate = true;
        }


        if ((dirtyFlag & DirtyFlag.LINE_TRUNCATE_MODE) != 0) {
            this._tekstoLabel.set_line_truncate_mode(this._byLabel.LineTruncateMode)
            forceUpdate = true;
        }


        if ((dirtyFlag & DirtyFlag.HORIZONTAL_ALIGNMENT) != 0) {
            this._tekstoLabel.set_horizontal_alignment(this._byLabel.HorizontalAlignment)
            forceUpdate = true;
        }


        if ((dirtyFlag & DirtyFlag.VERTICAL_ALIGNMENT) != 0) {
            this._tekstoLabel.set_vertical_alignment(this._byLabel.VerticalAlignment)
            forceUpdate = true;
        }


        if ((dirtyFlag & DirtyFlag.LAYOUT_ALIGNMENT) != 0) {
            this._tekstoLabel.set_layout_alignment(this._byLabel.LayoutAlignment)
            forceUpdate = true;
        }



        if ((dirtyFlag & DirtyFlag.TEXT_GROUP) != 0) {
            if (!this._byLabel.RichText) {
                this._tekstoMessage = [];
                let textItem: TekstoMessage = new TekstoMessage();

                if (!this._byLabel.UseSystemFont && this._byLabel.Font != null) {
                    textItem.family = this._byLabel.CustomFontFamily
                } else {
                    textItem.family = this._byLabel.FontFamily
                }
                textItem.type = MessageType.Text;
                textItem.msg = value;
                textItem.size = this._byLabel.FontSize;
                textItem.color = convert_to_teksto_color(this._byLabel.FontColor);
                textItem.slan = this._byLabel.FontSlant;
                textItem.weight = this._byLabel.FontWeight;
                if (this._byLabel.UnderLine) {
                    textItem.underline_color = convert_to_teksto_color(this._byLabel.UnderLineColor);
                }
                this._tekstoMessage.push(textItem)
            }
        }
        //console.log("label", this._byLabel)
        return forceUpdate;
    }

    public updateLabelTextStatus(value: string) {
        if (!this.enabledInHierarchy) {
            return;
        }
        if (this._byLabel.RichText) {
            this._tekstoLabel.set_html_text(this._byLabel.HtmlString);
        } else {
            if (this._tekstoMessage.length <= 0) return;

            //console.log("set text", this._tekstoMessage)
            // 非 text 属性变化的时候需要强制走 display 刷新view
            this._tekstoLabel.set_text(this._tekstoMessage);
        }

        let maxWidth = this._byLabel.MaxWidth
        let setLabelSize = this._byLabel.LabelSize;
        let displayWidth = maxWidth
        let displayHeight = 0
        if (setLabelSize.width > 0) {
            displayWidth = setLabelSize.width
            displayHeight = setLabelSize.height
        }
        // console.log("measure", size.width, size.height)
        let labelSize = this._tekstoLabel.display(displayWidth, displayHeight);
        console.log("display", displayWidth, displayHeight, labelSize.width, labelSize.height)
        this._uiTransform.setContentSize(labelSize.width, labelSize.height);

        let childrens = this._tekstoLabel.get_childrens()
        this.updateTekstoLabelChildrens(childrens)
    }

    private printImageSource(imageSource: IMemoryImageSource) {
        console.log("imagesource:")
        console.log("width:", imageSource.width)
        console.log("height:", imageSource.height)
        console.log("format:", imageSource.format)

        console.log("_compressed:", imageSource._compressed)
        console.log("byteLength:", imageSource._data.byteLength)
        //console.log("_data:", imageSource._data)
        console.log("mipmapLevelDataSize:", imageSource.mipmapLevelDataSize)
    }

    private printLabelChild(child: NativeLabelChild) {
        switch (child.type) {
            case LabelChildType.BITMAP:
                {
                    console.log("LabelChildType.BITMAP:")
                    console.log("x:", child.x, "y:", child.y)
                    console.log("width:", child.width, "height:", child.height);

                    if (child.color) {
                        let color = convert_from_teksto_color(child.color)
                        console.log(`color ${child.color},  r:${color.r}, g:${color.g} b:${color.b} a:${color.a}`)
                    }

                    //this.printImageSource(child.imageSource)
                    break;
                }
            case LabelChildType.PACE_HOLDER:
                {
                    console.log("LabelChildType.PACE_HOLDER:")
                    console.log("x:", child.x, "y:", child.y)
                    console.log("width:", child.width, "height:", child.height);
                    console.log("path:", child.path);
                    break;
                }
            case LabelChildType.VECTOR:
                {
                    console.log("LabelChildType.VECTOR:")
                    console.log("x:", child.x, "y:", child.y)
                    console.log("width:", child.width, "height:", child.height);
                    if (child.color) {
                        let color = convert_from_teksto_color(child.color)
                        console.log(`color ${child.color}, r:${color.r}, g:${color.g} b:${color.b} a:${color.a}`)
                    }
                }
        }
    }

    private createLabelSprite(child: NativeLabelChild) {
        this.printLabelChild(child)
        let spritenode = null
        let parentSize = this._uiTransform.contentSize
        let parentAnchor = this._uiTransform.anchorPoint
        switch (child.type) {
            case LabelChildType.BITMAP:
                {
                    spritenode = new Node(RichTextChildName);
                    let uitransform = spritenode.addComponent(UITransform)
                    let sprite = spritenode.addComponent(Sprite)
                    let texture = new Texture2D();
                    let imageAsset = new ImageAsset(child.imageSource);
                    texture.image = imageAsset

                    let spriteFrame = new SpriteFrame;
                    spriteFrame.texture = texture
                    spriteFrame.rect = new Rect(0, 0, child.imageSource.width, child.imageSource.height);
                    spriteFrame.packable = false;
                    sprite.spriteFrame = spriteFrame;
                    if (typeof (child.color) == "number") {
                        sprite.color = convert_from_teksto_color(child.color)
                    }
                    uitransform.setContentSize(child.width, child.height)
                    this.setLabelPos(spritenode,
                        child.x,
                        child.y,
                        parentSize,
                        parentAnchor,
                        uitransform.contentSize,
                        uitransform.anchorPoint)
                    break;
                }
            case LabelChildType.PACE_HOLDER:
                {
                    let item = this.get_place_holder(child.path);

                    if (item) {
                        let scale = child.height / item.size.height;
                        let offsetX = item.margin.left * scale
                        let offsetY = item.margin.top * scale
                        let width = item.spriteFrame.width * scale
                        let height = item.spriteFrame.height * scale
                        spritenode = new Node(RichTextChildPlaceHoldName);
                        let uitransform = spritenode.addComponent(UITransform)
                        let sprite = spritenode.addComponent(Sprite)
                        sprite.spriteFrame = item.spriteFrame;
                        uitransform.setContentSize(width, height)
                        this.setLabelPos(spritenode,
                            child.x + offsetX,
                            child.y + offsetY,
                            parentSize,
                            parentAnchor,
                            uitransform.contentSize,
                            uitransform.anchorPoint)
                    }
                    break;
                }
            case LabelChildType.VECTOR:
                {
                    spritenode = new Node(RichTextChildVectorName);
                    let uitransform = spritenode.addComponent(UITransform)
                    let sprite = spritenode.addComponent(Sprite)
                    sprite.spriteFrame = new SpriteFrame;
                    sprite.spriteFrame.texture = builtinResMgr.get("white-texture")
                    if (typeof (child.color) == "number") {
                        sprite.color = convert_from_teksto_color(child.color)
                    }
                    uitransform.setContentSize(child.width, child.height)
                    this.setLabelPos(spritenode,
                        child.x,
                        child.y,
                        parentSize,
                        parentAnchor,
                        uitransform.contentSize,
                        uitransform.anchorPoint);
                    break;
                }
            case LabelChildType.CURSOR:
                {
                    let uiTransform = this.create_cursor_layer(RichTextChildCursorName, child.width, child.height)
                    spritenode = uiTransform.node
                    this.setLabelPos(spritenode,
                        child.x,
                        child.y,
                        parentSize,
                        parentAnchor,
                        uiTransform.contentSize,
                        uiTransform.anchorPoint);
                    break;
                }
        }
        if (spritenode) {
            spritenode.layer = this.node.layer;
            this.node.addChild(spritenode);
        }

        return spritenode
    }

    private cloneRect(from: Rectangle): Rectangle {
        return { x: from.x, y: from.y, w: from.w, h: from.h };
    }

    private updateSelectNode(from: Vec2, to: Vec2, isUpdate: boolean) {
        let message = this._tekstoLabel.select(from, to, false)
        console.log("updateSelectNode", from, to, message.rects)

        let parentSize = this._uiTransform.contentSize
        let parentAnchor = this._uiTransform.anchorPoint

        let index = 0;
        let remainSize = this._selectNodes.length
        if (remainSize > message.rects.length) {
            for (let i = remainSize - 1; i >= message.rects.length; i--) {
                let selectChild = this._selectNodes[i];
                if (selectChild) {
                    selectChild.node.removeFromParent()
                    selectChild.node.destroy();
                }
                this._selectNodes.splice(i, 1);
            }
        }

        for (let rect of message.rects) {
            let selectChild = null
            if (index < remainSize) {
                selectChild = this._selectNodes[index];
                selectChild.setContentSize(rect.w, rect.h)
            } else {
                selectChild = this.create_select_layer(RichTextChildSelectName, rect.w, rect.h);
                this._selectNodes.push(selectChild)
                this.node.addChild(selectChild.node);
            }
            this.setLabelPos(selectChild.node, rect.x, rect.y, parentSize, parentAnchor, selectChild.contentSize, selectChild.anchorPoint);
            index++;
        }

        if (message.rects.length <= 0) return;

        let firstRect = message.rects[0];
        let beginNode = this.beginSelect
        if (beginNode == null) {
            this._beginRect = this.cloneRect(firstRect)
            beginNode = this.create_select_begin(RichTextChildSelectName, firstRect.h);
            this.node.addChild(beginNode.node);
            this.setBeginSelect(beginNode)

            this.setLabelPos(beginNode.node,
                firstRect.x - beginNode.contentSize.width * 0.5,
                firstRect.y - 29,
                parentSize,
                parentAnchor,
                beginNode.contentSize,
                beginNode.anchorPoint);
        }

        let endRect = message.rects[message.rects.length - 1];
        let endNode = this.endSelect
        if (endNode == null) {
            this._endRect = this.cloneRect(endRect)
            endNode = this.create_select_end(RichTextChildSelectName, endRect.h);
            this.node.addChild(endNode.node);
            this.setEndSelect(endNode)

            this.setLabelPos(endNode.node,
                endRect.x + endRect.w - endNode.contentSize.width * 0.5,
                endRect.y - endNode.contentSize.height,
                parentSize,
                parentAnchor,
                endNode.contentSize,
                endNode.anchorPoint);
        }
    }

    public showSelectLayer() {
        this.updateSelectNode(SELECT_ALL_BEGIN, SELECT_ALL_END, false);
    }

    private addRectOffset(rect: Rectangle, offset: Readonly<Vec2>) {
        if (rect.offsetX == null) {
            rect.offsetX = 0
        }
        if (rect.offsetY == null) {
            rect.offsetY = 0;
        }

        rect.offsetX += offset.x;
        rect.offsetY -= offset.y;
    }

    private checkSetSelectRect(pos: Vec2, rect: Readonly<Rectangle>) {
        let offsetx = rect.offsetX == null ? 0 : rect.offsetX
        let offsety = rect.offsetY == null ? 0 : rect.offsetY

        pos.x = rect.x + offsetx
        if (offsety > 0)
            pos.y = rect.y + Math.floor((offsety / rect.h) + 0.5) * rect.h
        else
            pos.y = rect.y - Math.floor((Math.abs(offsety) / rect.h) + 0.5) * rect.h
    }

    public updateSelectLayer(begin: boolean, offset: Readonly<Vec2>) {
        if (begin) {
            this.addRectOffset(this._beginRect, offset)
        } else {
            this.addRectOffset(this._endRect, offset)
        }

        this.checkSetSelectRect(CUR_SELECT_BEGIN, this._beginRect);
        this.checkSetSelectRect(CUR_SELECT_END, this._endRect);
        CUR_SELECT_END.x += this._endRect.w
        this.updateSelectNode(CUR_SELECT_BEGIN, CUR_SELECT_END, true)
    }

    public hideSelectLayer() {
        let beginUI = this.beginSelect
        if (beginUI) {
            beginUI.node.removeFromParent()
            beginUI.node.destroy();
        }
        let endUI = this.endSelect
        if (endUI) {
            endUI.node.removeFromParent()
            endUI.node.destroy();
        }
        this.setBeginSelect(null)
        this.setEndSelect(null)
        for (let selectUI of this._selectNodes) {
            selectUI.node.removeFromParent()
            selectUI.node.destroy();
        }
        this._selectNodes = []
    }

    private updateTekstoLabelChildrens(childrens: NativeLabelChild[]) {
        this.node.removeAllChildren();
        childrens.sort((a, b) => {
            return a.type - b.type;
        })
        this._curChildrens = childrens
        for (let child of childrens) {
            child.node = this.createLabelSprite(child)
        }
        //console.log("childrens", this.node.children.length, this.node)
    }

    public static register_place_holder(key: string, width: number, height: number): boolean {
        return NativeTekstoLabel.register_place_holder(key, width, height)
    }

    public static unregister_place_holder(key: string): boolean {
        return NativeTekstoLabel.unregister_place_holder(key)
    }

    public static register_font(path: string, tag?: string): string {
        return NativeTekstoLabel.register_font(path, tag)
    }

    public static unregister_font(path: string): boolean {
        return NativeTekstoLabel.unregister_font(path)
    }

    _updateRichTextPosition() {
        let parentSize = this._uiTransform.contentSize
        let parentAnchor = this._uiTransform.anchorPoint

        for (let child of this._curChildrens) {
            let spritenode = child.node
            if (spritenode) {
                let uitransform = spritenode.getComponent(UITransform)
                this.setLabelPos(spritenode,
                    child.x,
                    child.y,
                    parentSize,
                    parentAnchor,
                    uitransform.contentSize,
                    uitransform.anchorPoint);
            }
        }
    }

    _applyLayer() {
        let childrens = this.node.children
        for (let child of childrens) {
            child.layer = this.node.layer
        }
    }

    public measureSize(out: Size, maxWidth?: number) {
        let width = maxWidth != undefined ? maxWidth : 0
        let height = 0

        let testSize = this._tekstoLabel.measure(width, height)

        out.width = testSize.width
        out.height = testSize.height
    }


    public onLoad() {
        this.node.on(Node.EventType.LAYER_CHANGED, this._applyLayer, this);
        this.node.on(Node.EventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
    }

    public onEnable() {

    }
    public onDisable() { }
    public onDestroy() {
        this.node.off(Node.EventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
        this.node.off(Node.EventType.LAYER_CHANGED, this._applyLayer, this);
    }
}