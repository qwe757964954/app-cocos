import { RichText, Node, CCObject, _decorator } from "cc";
import { ByLabelImpBase, ByLabelInterface } from "./ByLabelImpBase";
import { Vec2 } from "cc";
import { UITransform } from "cc";
import { DirtyFlag } from "../XLabelEnum";
import { FontSlant, FontWeight, HorizontalAlignment, VerticalAlignment } from "./TekstoEnum";
import { HorizontalTextAlignment } from "cc";
import { VerticalTextAlignment } from "cc";
import { Size } from "cc";
import { Label } from "cc";
import { Sprite } from "cc";
import { Margin, PlaceHoldCache, PlaceHoldItem } from "../PlaceHoldCache";
import { warnID } from "cc";
import { LabelOutline } from "cc";
import { BASELINE_RATIO } from "cc";
import { Color } from "cc";
import { IHtmlTextParserStack } from "cc";
import { CacheMode } from "cc";
import { Font } from "cc";
import { DEBUG, DEV } from "cc/env";
import { assert } from "cc";
import { js } from "cc";
import { cclegacy } from "cc";
import { SpriteFrame } from "cc";
import { fragmentText, getEnglishWordPartAtFirst, getEnglishWordPartAtLast, isUnicodeCJK, isUnicodeSpace } from "../../measurelabel/imp/text-uitls"
import { MeasureLabel } from "../../measurelabel/MeasureLabel";
const { ccclass } = _decorator;

const RichTextChildSelectName = 'RICHTEXT_SELECT_CHILD_BY';
const STRING_PATTERN = /\[([^\]]+)\]/gm
interface ISegment {
    node: Node;
    comp: Label | Sprite | null;
    lineCount: number;
    styleIndex: number;
    imageMargin?: {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
    };
    clickParam: string;
    clickHandler: string;
    type: string,
}

interface IXLabelParserStack {
    color?: string;
    size?: number;
    event?: {
        [k: string]: string;
    };
    isNewLine?: boolean;
    isImage?: boolean;
    src?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageMargin?: {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
    };
    imageAlign?: string;
    underline?: boolean;
    italic?: boolean;
    bold?: boolean;
    outline?: {
        color: string;
        width: number;
    };
}
interface IXLabelParserResultObj {
    text?: string;
    style?: IXLabelParserStack;
}

function equalMargin(a: Margin, b: Margin): boolean {
    if (a == null && b == null) return true;


    if (a != null && b != null) {
        return (a.left == b.left) && a.right == b.right && a.top == b.top && a.bottom == b.bottom
    } else {
        return false;
    }
}

function cloneMargin(margin: Margin, scale: number = 1): Margin {
    let left = (margin && margin.left != null) ? margin.left * scale : 0
    let right = (margin && margin.right != null) ? margin.right * scale : 0
    let top = (margin && margin.top != null) ? margin.top * scale : 0
    let bottom = (margin && margin.bottom != null) ? margin.bottom * scale : 0

    return {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
    }
}
const RichTextChildName = 'RICHTEXT_CHILD';
const RichTextChildImageName = 'RICHTEXT_Image_CHILD';

const _tempSize = new Vec2();
const _tempSizeLeft = new Vec2();

/**
 * 富文本池。<br/>
 */
const labelPool = new js.Pool((seg: ISegment) => {
    if (DEV) {
        assert(!seg.node.parent, 'Recycling node\'s parent should be null!');
    }
    if (!cclegacy.isValid(seg.node)) {
        return false;
    } else {
        const outline = seg.node.getComponent(LabelOutline);
        if (outline) {
            outline.width = 0;
        }
    }
    return true;
}, 20);

const imagePool = new js.Pool((seg: ISegment) => {
    if (DEV) {
        assert(!seg.node.parent, 'Recycling node\'s parent should be null!');
    }
    return cclegacy.isValid(seg.node) as boolean;
}, 10);


function getSegmentByPool(type: string, content: string | SpriteFrame) {
    let seg;
    if (type === RichTextChildName) {
        seg = labelPool._get();
    } else if (type === RichTextChildImageName) {
        seg = imagePool._get();
    }
    seg = seg || createSegment(type);
    let node = seg.node as Node;
    if (!node) {
        node = new Node(type);
    }
    node.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;
    if (type === RichTextChildImageName) {
        seg.comp = node.getComponent(Sprite) || node.addComponent(Sprite);
        seg.comp.spriteFrame = content as SpriteFrame;
        seg.comp.type = Sprite.Type.SLICED;
        seg.comp.sizeMode = Sprite.SizeMode.CUSTOM;
    } else { // RichTextChildName
        seg.comp = node.getComponent(Label) || node.addComponent(Label);
        seg.comp.string = content as string;
        seg.comp.horizontalAlign = HorizontalTextAlignment.LEFT;
        seg.comp.verticalAlign = VerticalTextAlignment.TOP;
        seg.comp.underlineHeight = 2;
    }
    node.setPosition(0, 0, 0);
    const trans = node._uiProps.uiTransformComp!;
    trans.setAnchorPoint(0.5, 0.5);

    seg.node = node;
    seg.lineCount = 0;
    seg.styleIndex = 0;
    seg.imageMargin = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    };
    seg.clickParam = '';
    seg.clickHandler = '';
    return seg as ISegment | null;
}

//
function createSegment(type: string): ISegment {
    return {
        node: new Node(type),
        comp: null,
        lineCount: 0,
        styleIndex: 0,
        imageMargin: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        clickParam: '',
        clickHandler: '',
        type,
    };
}

export class RichTextLabelImp extends ByLabelImpBase {
    protected _textArray: IXLabelParserResultObj[] = [];
    protected _segments: ISegment[] = [];
    protected _labelSegmentsCache: ISegment[] = [];
    protected _linesWidth: number[] = [];
    protected _lineCount = 1;
    protected _labelWidth = 0;
    protected _labelHeight = 0;
    protected _layoutDirty = true;
    protected _lineOffsetX = 0;
    protected _labelChildrenNum = 0; // only ISegment

    private _horizontalAlign = HorizontalTextAlignment.LEFT;
    private _verticalAlign = VerticalTextAlignment.TOP;

    get horizontalAlign() {
        return this._horizontalAlign;

    }

    get verticalAlign() {
        return this._verticalAlign
    }
    get lineHeight() {
        return this._byLabel.LineSpace * this._byLabel.FontSize
    }

    get maxWidth() {
        if (this._byLabel.LabelSize.width > 0) {
            return this._byLabel.LabelSize.width
        }
        return this._byLabel.MaxWidth
    }

    get maxHeight() {
        return 0;
        return this._byLabel.LabelSize.height
    }

    get fontSize() {
        return this._byLabel.FontSize
    }

    get font() {
        return this._byLabel.Font
    }

    get useSystemFont() {
        return this._byLabel.UseSystemFont
    }

    get fontFamily() {
        return this._byLabel.FontFamily
    }

    constructor(node: Node, labelOwner: ByLabelInterface) {
        super(node, labelOwner)
        this._uiTransform = node.getComponent(UITransform);
    }

    protected _needsUpdateTextLayout(newTextArray: IXLabelParserResultObj[]) {
        if (this._layoutDirty || !this._textArray || !newTextArray) {
            return true;
        }

        if (this._textArray.length !== newTextArray.length) {
            return true;
        }

        for (let i = 0; i < this._textArray.length; i++) {
            const oldItem = this._textArray[i];
            const newItem = newTextArray[i];
            if (oldItem.text !== newItem.text) {
                return true;
            } else {
                const oldStyle = oldItem.style; const newStyle = newItem.style;
                if (oldStyle) {
                    if (newStyle) {
                        if (!!newStyle.outline !== !!oldStyle.outline) {
                            return true;
                        }
                        if (oldStyle.size !== newStyle.size
                            || oldStyle.italic !== newStyle.italic
                            || oldStyle.isImage !== newStyle.isImage) {
                            return true;
                        }
                        if (oldStyle.src !== newStyle.src
                            || oldStyle.imageAlign !== newStyle.imageAlign
                            || oldStyle.imageHeight !== newStyle.imageHeight
                            || oldStyle.imageWidth !== newStyle.imageWidth
                            || !equalMargin(oldStyle.imageMargin, newStyle.imageMargin)
                        ) {
                            return true;
                        }
                    } else if (oldStyle.size || oldStyle.italic || oldStyle.isImage || oldStyle.outline) {
                        return true;
                    }
                } else if (newStyle) {
                    if (newStyle.size || newStyle.italic || newStyle.isImage || newStyle.outline) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    protected _resetLabelState(label: Label) {
        label.fontSize = this._byLabel.FontSize;
        label.color = Color.WHITE;
        label.isBold = false;
        label.isItalic = false;
        label.isUnderline = false;
    }

    protected _convertLiteralColorValue(color: string) {
        const colorValue = color.toUpperCase();
        if (Color[colorValue]) {
            const colorUse: Color = Color[colorValue];
            return colorUse;
        } else {
            const out = new Color();
            return out.fromHEX(color);
        }
    }

    protected _applyTextAttribute(labelSeg: ISegment) {
        const label = labelSeg.node.getComponent(Label);
        if (!label) {
            return;
        }
        this._resetLabelState(label);

        const index = labelSeg.styleIndex;

        let textStyle: IHtmlTextParserStack | undefined;
        if (this._textArray[index]) {
            textStyle = this._textArray[index].style;
        }

        if (textStyle) {
            label.color = this._convertLiteralColorValue(textStyle.color || 'white');
            label.isBold = !!textStyle.bold;
            label.isItalic = !!textStyle.italic;
            // TODO: temporary implementation, the italic effect should be implemented in the internal of label-assembler.
            // if (textStyle.italic) {
            //     labelNode.skewX = 12;
            // }

            label.isUnderline = !!textStyle.underline;
            if (textStyle.outline) {
                let labelOutline = labelSeg.node.getComponent(LabelOutline);
                if (!labelOutline) {
                    labelOutline = labelSeg.node.addComponent(LabelOutline);
                }

                labelOutline.color = this._convertLiteralColorValue(textStyle.outline.color);
                labelOutline.width = textStyle.outline.width;
            }

            label.fontSize = textStyle.size || this.fontSize;

            labelSeg.clickHandler = '';
            labelSeg.clickParam = '';
            const event = textStyle.event;
            if (event) {
                labelSeg.clickHandler = event.click || '';
                labelSeg.clickParam = event.param || '';
            }
        }

        label.cacheMode = CacheMode.BITMAP;

        const isAsset = this.font instanceof Font;
        if (isAsset && !this.useSystemFont) {
            label.font = this.font;
        } else {
            label.fontFamily = this.fontFamily;
        }
        label.useSystemFont = this.useSystemFont;
        label.lineHeight = this.lineHeight;

        label.updateRenderData(true);
    }

    protected _updateLabelSegmentTextAttributes() {
        this._segments.forEach((item) => {
            this._applyTextAttribute(item);
        });
    }

    //将 节点回收准备复用
    protected _resetState() {
        const children = this.node.children;

        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
                if (DEBUG) {
                    assert(child.parent === this.node);
                }
                child.parent = null;

                const segment = createSegment(child.name);
                segment.node = child;
                if (child.name === RichTextChildName) {
                    segment.comp = child.getComponent(Label);
                    labelPool.put(segment);
                } else {
                    segment.comp = child.getComponent(Sprite);
                    imagePool.put(segment);
                }
                this._labelChildrenNum--;
            }
        }

        this._segments.length = 0;
        this._labelSegmentsCache.length = 0;
        this._linesWidth.length = 0;
        this._lineOffsetX = 0;
        this._lineCount = 1;
        this._labelWidth = 0;
        this._labelHeight = 0;
        this._layoutDirty = true;
    }

    protected _updateLineInfo() {
        this._linesWidth.push(this._lineOffsetX);
        this._lineOffsetX = 0;

        let maxHeight = this.maxHeight
        if (maxHeight > 0 && (this._lineCount + 1 + BASELINE_RATIO) * this.lineHeight > maxHeight) {
            return true;
        }

        this._lineCount++;
        return false
    }

    protected _createFontLabel(str: string): ISegment {
        return getSegmentByPool(RichTextChildName, str)!;
    }

    protected _createImage(spriteFrame: SpriteFrame): ISegment {
        return getSegmentByPool(RichTextChildImageName, spriteFrame)!;
    }

    protected _addRichTextImageElement(richTextElement: IXLabelParserResultObj) {
        if (!richTextElement.style) {
            return;
        }

        const style = richTextElement.style;

        const holdItem = PlaceHoldCache.getInstance().getItem(style.src)
        const spriteFrame = holdItem.spriteFrame
        if (!spriteFrame) {
            warnID(4400);
        } else {
            const spriteRect = spriteFrame.rect.clone();
            let scaleFactor = 1;
            let spriteWidth = spriteRect.width;
            let spriteHeight = spriteRect.height;
            const expectWidth = style.imageWidth || 0;
            const expectHeight = style.imageHeight || 0;
            const margin = style.imageMargin

            if (expectHeight > 0) {
                scaleFactor = expectHeight / spriteHeight;
                spriteWidth *= scaleFactor;
                spriteHeight *= scaleFactor;
            } else {
                scaleFactor = this.lineHeight / spriteHeight;
                spriteWidth *= scaleFactor;
                spriteHeight *= scaleFactor;
            }

            if (expectWidth > 0) {
                spriteWidth = expectWidth;
            }

            let marginWidth = margin.left + margin.right
            if (this.maxWidth > 0) {
                if (this._lineOffsetX + spriteWidth + marginWidth > this.maxWidth) {
                    if (this._updateLineInfo()) { //如果已经超出最大高度则直接返回
                        return;
                    }
                }
                this._lineOffsetX += spriteWidth + marginWidth;
            } else {
                this._lineOffsetX += spriteWidth + marginWidth;
                if (this._lineOffsetX > this._labelWidth) {
                    this._labelWidth = this._lineOffsetX;
                }
            }

            const segment = this._createImage(spriteFrame);
            const sprite = segment.comp;
            switch (style.imageAlign) {
                case 'top':
                    segment.node._uiProps.uiTransformComp!.setAnchorPoint(0, 1);
                    break;
                case 'center':
                    segment.node._uiProps.uiTransformComp!.setAnchorPoint(0, 0.5);
                    break;
                default:
                    segment.node._uiProps.uiTransformComp!.setAnchorPoint(0, 0);
                    break;
            }

            if (style.imageMargin) {
                segment.imageMargin.left = style.imageMargin.left;
                segment.imageMargin.right = style.imageMargin.right;
                segment.imageMargin.top = style.imageMargin.top;
                segment.imageMargin.bottom = style.imageMargin.bottom;
            }

            segment.node.layer = this.node.layer;
            this.node.insertChild(segment.node, this._labelChildrenNum++);
            this._segments.push(segment);


            segment.node._uiProps.uiTransformComp!.setContentSize(spriteWidth, spriteHeight);
            segment.lineCount = this._lineCount;

            segment.clickHandler = '';
            segment.clickParam = '';
            const event = style.event;
            if (event) {
                segment.clickHandler = event.click;
                segment.clickParam = event.param;
            }
        }
    }

    protected _calculateSize(out: Vec2, styleIndex: number, s: string) {
        let label: ISegment;
        if (this._labelSegmentsCache.length === 0) {
            label = this._createFontLabel(s);
            this._labelSegmentsCache.push(label);
        } else {
            label = this._labelSegmentsCache[0];
            label.node.getComponent(Label)!.string = s;
        }
        label.styleIndex = styleIndex;
        this._applyTextAttribute(label);
        const size = label.node._uiProps.uiTransformComp!.contentSize;
        Vec2.set(out, size.x, size.y);
        return out;
    }

    protected splitLongStringOver2048(text: string, styleIndex: number) {
        const partStringArr: string[] = [];
        const longStr = text;

        let curStart = 0;
        let curEnd = longStr.length / 2;
        let curString = longStr.substring(curStart, curEnd);
        let leftString = longStr.substring(curEnd);
        const curStringSize = this._calculateSize(_tempSize, styleIndex, curString);
        const leftStringSize = this._calculateSize(_tempSizeLeft, styleIndex, leftString);
        let maxWidth = this.maxWidth;
        if (this.maxWidth === 0) {
            maxWidth = 2047.9; // Callback when maxWidth is 0
        }

        // a line should be an unit to split long string
        const lineCountForOnePart = 1;
        const sizeForOnePart = lineCountForOnePart * maxWidth;

        // divide text into some pieces of which the size is less than sizeForOnePart
        while (curStringSize.x > sizeForOnePart) {
            curEnd /= 2;
            // at least one char can be an entity, step back.
            if (curEnd < 1) {
                curEnd *= 2;
                break;
            }

            curString = curString.substring(curStart, curEnd);
            leftString = longStr.substring(curEnd);
            this._calculateSize(curStringSize, styleIndex, curString);
        }

        // avoid too many loops
        let leftTryTimes = 1000;
        // the minimum step of expansion or reduction
        let curWordStep = 1;
        while (leftTryTimes && curStart < text.length) {
            while (leftTryTimes && curStringSize.x < sizeForOnePart) {
                const nextPartExec = getEnglishWordPartAtFirst(leftString);
                // add a character, unless there is a complete word at the beginning of the next line
                if (nextPartExec && nextPartExec.length > 0) {
                    curWordStep = nextPartExec[0].length;
                }
                curEnd += curWordStep;

                curString = longStr.substring(curStart, curEnd);
                leftString = longStr.substring(curEnd);
                this._calculateSize(curStringSize, styleIndex, curString);

                leftTryTimes--;
            }

            // reduce condition：size > maxwidth && curString.length >= 2
            while (leftTryTimes && curString.length >= 2 && curStringSize.x > sizeForOnePart) {
                curEnd -= curWordStep;
                curString = longStr.substring(curStart, curEnd);
                this._calculateSize(curStringSize, styleIndex, curString);
                // after the first reduction, the step should be 1.
                curWordStep = 1;

                leftTryTimes--;
            }

            // consider there is a part of a word at the end of this line, it should be moved to the next line
            if (curString.length >= 2) {
                const lastWordExec = getEnglishWordPartAtLast(curString);
                if (lastWordExec && lastWordExec.length > 0
                    // to avoid endless loop when there is only one word in this line
                    && curString !== lastWordExec[0]) {
                    curEnd -= lastWordExec[0].length;
                    curString = longStr.substring(curStart, curEnd);
                }
            }

            // curStart and curEnd can be float since they are like positions of pointer,
            // but step must be integer because we split the complete characters of which the unit is integer.
            // it is reasonable that using the length of this result to estimate the next result.
            partStringArr.push(curString);
            const partStep = curString.length;
            curStart = curEnd;
            curEnd += partStep;

            curString = longStr.substring(curStart, curEnd);
            leftString = longStr.substring(curEnd);
            this._calculateSize(leftStringSize, styleIndex, leftString);
            this._calculateSize(curStringSize, styleIndex, curString);

            leftTryTimes--;

            // Exit: If the left part string size is less than 2048, the method will finish.
            if (leftStringSize.x < 2048 && curStringSize.x < sizeForOnePart) {
                partStringArr.push(curString);
                curStart = text.length;
                curEnd = text.length;
                curString = leftString;
                if (leftString !== '') {
                    partStringArr.push(curString);
                }
                break;
            }
        }

        return partStringArr;
    }

    protected splitLongStringApproximatelyIn2048(text: string, styleIndex: number) {
        const approxSize = text.length * this.fontSize;
        const partStringArr: string[] = [];
        // avoid that many short richtext still execute _calculateSize so that performance is low
        // we set a threshold as 2048 * 0.8, if the estimated size is less than it, we can skip _calculateSize precisely
        if (approxSize <= 2048 * 0.8) {
            partStringArr.push(text);
            return partStringArr;
        }

        this._calculateSize(_tempSize, styleIndex, text);
        if (_tempSize.x < 2048) {
            partStringArr.push(text);
        } else {
            const multilineTexts = text.split('\n');
            for (let i = 0; i < multilineTexts.length; i++) {
                this._calculateSize(_tempSize, styleIndex, multilineTexts[i]);
                if (_tempSize.x < 2048) {
                    partStringArr.push(multilineTexts[i]);
                } else {
                    const thisPartSplitResultArr = this.splitLongStringOver2048(multilineTexts[i], styleIndex);
                    partStringArr.push(...thisPartSplitResultArr);
                }
            }
        }
        return partStringArr;
    }

    protected _isLastComponentCR(stringToken) {
        return stringToken.length - 1 === stringToken.lastIndexOf('\n');
    }

    protected _measureText(styleIndex: number, string?: string) {
        const func = (s: string) => {
            const width = this._calculateSize(_tempSize, styleIndex, s).x;
            return width;
        };
        if (string) {
            return func(string);
        } else {
            return func;
        }
    }

    protected _getFirstWordLen(text: string, startIndex: number, textLen: number) {
        let character = text.charAt(startIndex);
        if (isUnicodeCJK(character) || isUnicodeSpace(character)) {
            return 1;
        }

        let len = 1;
        for (let index = startIndex + 1; index < textLen; ++index) {
            character = text.charAt(index);
            if (isUnicodeSpace(character) || isUnicodeCJK(character)) {
                break;
            }

            len++;
        }

        return len;
    }

    protected _addLabelSegment(stringToken: string, styleIndex: number) {
        let labelSegment: ISegment;
        if (this._labelSegmentsCache.length === 0) {
            labelSegment = this._createFontLabel(stringToken);
        } else {
            labelSegment = this._labelSegmentsCache.pop()!;
            const label = labelSegment.node.getComponent(Label);
            if (label) {
                label.string = stringToken;
            }
        }

        // set vertical alignments
        // because horizontal alignment is applied with line offsets in method "_updateRichTextPosition"
        const labelComp: Label = labelSegment.comp as Label;
        if (labelComp.verticalAlign !== this.verticalAlign) {
            labelComp.verticalAlign = this.verticalAlign;
        }

        labelSegment.styleIndex = styleIndex;
        labelSegment.lineCount = this._lineCount;
        labelSegment.node._uiProps.uiTransformComp!.setAnchorPoint(0, 0);
        labelSegment.node.layer = this.node.layer;
        this.node.insertChild(labelSegment.node, this._labelChildrenNum++);
        this._applyTextAttribute(labelSegment);
        this._segments.push(labelSegment);

        return labelSegment;
    }

    protected _updateRichTextWithMaxWidth(labelString: string, labelWidth: number, styleIndex: number) {
        let fragmentWidth = labelWidth;
        let labelSegment: ISegment;

        let overHeight = false;
        if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this.maxWidth) {
            // concat previous line
            let checkStartIndex = 0;
            while (this._lineOffsetX <= this.maxWidth) {
                const checkEndIndex = this._getFirstWordLen(labelString, checkStartIndex, labelString.length);
                const checkString = labelString.substr(checkStartIndex, checkEndIndex);
                const checkStringWidth = this._measureText(styleIndex, checkString) as number;

                if (this._lineOffsetX + checkStringWidth <= this.maxWidth) {
                    this._lineOffsetX += checkStringWidth;
                    checkStartIndex += checkEndIndex;
                } else {
                    if (checkStartIndex > 0) {
                        const remainingString = labelString.substr(0, checkStartIndex);
                        this._addLabelSegment(remainingString, styleIndex);
                        labelString = labelString.substr(checkStartIndex, labelString.length);
                        fragmentWidth = this._measureText(styleIndex, labelString) as number;
                    }
                    overHeight = this._updateLineInfo();
                    break;
                }
            }
        }
        if (fragmentWidth > this.maxWidth) {
            const fragments = fragmentText(labelString, fragmentWidth, this.maxWidth,
                this._measureText(styleIndex) as unknown as (s: string) => number);
            for (let k = 0; k < fragments.length; ++k) {
                const splitString = fragments[k];
                labelSegment = this._addLabelSegment(splitString, styleIndex);
                const labelSize = labelSegment.node._uiProps.uiTransformComp!.contentSize;
                this._lineOffsetX += labelSize.width;
                if (fragments.length > 1 && k < fragments.length - 1) {
                    overHeight = this._updateLineInfo();
                    if (overHeight) break;
                }
            }
        } else {
            this._lineOffsetX += fragmentWidth;
            this._addLabelSegment(labelString, styleIndex);
        }

        return overHeight
    }

    protected _updateRichText() {
        if (!this.enabledInHierarchy) {
            return;
        }

        const newTextArray = this.split_string_value(this._byLabel.string)
        // let dirtyFlag = this._byLabel.DirtyFlag;
        // let forceUpdate = ((dirtyFlag & DirtyFlag.SIZE_CHANGE_ATTR) != 0);

        // if (!forceUpdate && !this._needsUpdateTextLayout(newTextArray)) {
        //     this._textArray = newTextArray.slice();
        //     this._updateLabelSegmentTextAttributes();
        //     return;
        // }

        this._textArray = newTextArray; //newTextArray.slice();
        this._resetState();

        let lastEmptyLine = false;
        let label: ISegment;
        let maxHeight = this.maxHeight

        for (let i = 0; i < this._textArray.length; ++i) {
            const richTextElement = this._textArray[i];
            let text = richTextElement.text;
            if (text === undefined) {
                continue;
            }

            // handle <br/> <img /> tag
            if (text === '') {
                if (richTextElement.style && richTextElement.style.isNewLine) {
                    if (this._updateLineInfo()) { //如果已经超出最大高度直接跳出
                        break;
                    }
                    continue;
                }
                if (richTextElement.style && richTextElement.style.isImage) {
                    this._addRichTextImageElement(richTextElement);
                    continue;
                }
            }

            const splitArr: string[] = this.splitLongStringApproximatelyIn2048(text, i);
            text = splitArr.join('\n');

            const multilineTexts = text.split('\n');

            for (let j = 0; j < multilineTexts.length; ++j) {
                const labelString = multilineTexts[j];
                if (labelString === '') {
                    // for continues \n
                    if (this._isLastComponentCR(text) && j === multilineTexts.length - 1) {
                        continue;
                    }
                    let isOverHeight = this._updateLineInfo()
                    lastEmptyLine = true;

                    if (isOverHeight) break;
                    else continue;
                }
                lastEmptyLine = false;

                if (this.maxWidth > 0) {
                    const labelWidth = this._measureText(i, labelString) as number;
                    let overHeight = this._updateRichTextWithMaxWidth(labelString, labelWidth, i);
                    if (overHeight) break;
                    if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
                        if (this._updateLineInfo()) break;
                    }
                } else {
                    label = this._addLabelSegment(labelString, i);

                    this._lineOffsetX += label.node._uiProps.uiTransformComp!.width;
                    if (this._lineOffsetX > this._labelWidth) {
                        this._labelWidth = this._lineOffsetX;
                    }

                    if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
                        if (this._updateLineInfo()) break;
                    }
                }
            }
        }
        if (!lastEmptyLine) {
            this._linesWidth.push(this._lineOffsetX);
        }

        if (this.maxWidth > 0) {
            this._labelWidth = this.maxWidth;
        }

        this._labelHeight = (this._lineCount + BASELINE_RATIO) * this.lineHeight;
        if (this.maxHeight > 0) {
            this._labelHeight = this.maxHeight
        }

        // trigger "size-changed" event
        this.node._uiProps.uiTransformComp!.setContentSize(this._labelWidth, this._labelHeight);

        this._updateRichTextPosition();
        this._layoutDirty = false;
    }

    protected _applyLayer() {
        for (const seg of this._segments) {
            seg.node.layer = this.node.layer;
        }
    }

    protected _updateRichTextPosition() {
        let nextTokenX = 0;
        let nextLineIndex = 1;
        const totalLineCount = this._lineCount;
        const trans = this.node._uiProps.uiTransformComp!;
        const anchorX = trans.anchorX;
        const anchorY = trans.anchorY;
        for (let i = 0; i < this._segments.length; ++i) {
            const segment = this._segments[i];
            const lineCount = segment.lineCount;
            if (lineCount > nextLineIndex) {
                nextTokenX = 0;
                nextLineIndex = lineCount;
            }

            let lineOffsetX = this._labelWidth * (this.horizontalAlign * 0.5 - anchorX);
            switch (this.horizontalAlign) {
                case HorizontalTextAlignment.LEFT:
                    break;
                case HorizontalTextAlignment.CENTER:
                    lineOffsetX -= this._linesWidth[lineCount - 1] / 2;
                    break;
                case HorizontalTextAlignment.RIGHT:
                    lineOffsetX -= this._linesWidth[lineCount - 1];
                    break;
                default:
                    break;
            }

            const pos = segment.node.position;
            segment.node.setPosition(nextTokenX + lineOffsetX,
                this.lineHeight * (totalLineCount - lineCount) - this._labelHeight * anchorY,
                pos.z);

            if (lineCount === nextLineIndex) {
                nextTokenX += segment.node._uiProps.uiTransformComp!.width;
            }

            const sprite = segment.node.getComponent(Sprite);
            if (sprite) {
                const position = segment.node.position.clone();
                // adjust img align (from <img align=top|center|bottom>)
                const lineHeightSet = this.lineHeight;
                const lineHeightReal = this.lineHeight * (1 + BASELINE_RATIO); // single line node height
                switch (segment.node._uiProps.uiTransformComp!.anchorY) {
                    case 1:
                        position.y += (lineHeightSet + ((lineHeightReal - lineHeightSet) / 2));
                        break;
                    case 0.5:
                        position.y += (lineHeightReal / 2);
                        break;
                    default:
                        position.y += ((lineHeightReal - lineHeightSet) / 2);
                        break;
                }
                // adjust img offset (from <img offset=12|12,34>)
                if (segment.imageMargin) {
                    const offsetX = segment.imageMargin.left
                    const offsetY = segment.imageMargin.top
                    position.x += offsetX;
                    position.y -= offsetY;

                }
                segment.node.position = position;
            }

            // adjust y for label with outline
            const outline = segment.node.getComponent(LabelOutline);
            if (outline) {
                const position = segment.node.position.clone();
                position.y -= outline.width;
                segment.node.position = position;
            }
        }
    }

    public onLoad() {
        this.node.on(Node.EventType.LAYER_CHANGED, this._applyLayer, this);
        this.node.on(Node.EventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
    }
    public onEnable() {

    }
    public onDisable() {

    }
    public onDestroy() {

    }

    private new_label_item(text: string) {
        let item: IXLabelParserResultObj = {}
        item.text = text;
        item.style = {
            color: this._byLabel.FontColor.toCSS("#rrggbb"),
            size: this._byLabel.FontSize,
            italic: this._byLabel.FontSlant > FontSlant.Normal,
            bold: this._byLabel.FontWeight > FontWeight.Normal,
            underline: this._byLabel.UnderLine,
        }

        return item
    }

    private new_image_item(key: string, holdItem: PlaceHoldItem) {
        let scale = this.lineHeight / holdItem.size.height
        let rect = holdItem.spriteFrame.rect
        let spWidth = rect.width * scale
        let spHeight = rect.height * scale

        let item: IXLabelParserResultObj = {}
        item.text = ''
        item.style = {
            isImage: true,
            src: key,
            imageWidth: spWidth,
            imageHeight: spHeight,
            imageAlign: 'center',
            imageMargin: cloneMargin(holdItem.margin, scale)
        }

        return item
    }

    private split_string_value(value: string): IXLabelParserResultObj[] {
        let result = value.split(STRING_PATTERN)

        let ret: IXLabelParserResultObj[] = [];
        let curValue = ''
        for (let i = 0; i < result.length; i++) {
            if (i % 2 == 0) { //normal value
                curValue = curValue + result[i];
            } else { // [value]
                if (curValue != '') {
                    ret.push(this.new_label_item(curValue))
                    curValue = ''
                }

                let key = result[i];
                let holdItem = PlaceHoldCache.getInstance().getItem(key)
                if (holdItem) {
                    ret.push(this.new_image_item(key, holdItem))
                } else {
                    curValue += `[${key}]`
                }
            }
        }

        if (curValue != '') {
            ret.push(this.new_label_item(curValue))
            curValue = ''
        }

        return ret
    }

    public applySetting(value: string) {
        let dirtyFlag = this._byLabel.DirtyFlag
        if ((dirtyFlag & DirtyFlag.HORIZONTAL_ALIGNMENT) != 0) {
            switch (this._byLabel.HorizontalAlignment) {
                case HorizontalAlignment.Left:
                    {
                        this._horizontalAlign = HorizontalTextAlignment.LEFT;
                        break;
                    }

                case HorizontalAlignment.Right:
                    {
                        this._horizontalAlign = HorizontalTextAlignment.RIGHT;
                        break;
                    }
                case HorizontalAlignment.Center:
                case HorizontalAlignment.Justified:
                    {
                        this._horizontalAlign = HorizontalTextAlignment.CENTER;
                        break;
                    }
            }
        }

        if ((dirtyFlag & DirtyFlag.VERTICAL_ALIGNMENT) != 0) {
            switch (this._byLabel.VerticalAlignment) {
                case VerticalAlignment.Top:
                    {
                        this._verticalAlign = VerticalTextAlignment.TOP;
                        break;
                    }
                case VerticalAlignment.Center:
                    {
                        this._verticalAlign = VerticalTextAlignment.CENTER;
                        break;
                    }
                case VerticalAlignment.Baseline:
                case VerticalAlignment.Bottom:
                    {
                        this._verticalAlign = VerticalTextAlignment.BOTTOM;
                        break;
                    }
            }
        }
    }

    public updateLabelTextStatus(value: string) {
        this._updateRichText()
    }

    public showSelectLayer() {

        let parentSize = this._uiTransform.contentSize
        let parentAnchor = this._uiTransform.anchorPoint
        let lineHeight = this.lineHeight

        let selectChild = this.create_select_layer(RichTextChildSelectName, parentSize.width, parentSize.height);
        this.setLabelPos(selectChild.node, 0, 0, parentSize, parentAnchor, selectChild.contentSize, selectChild.anchorPoint);
        this.node.addChild(selectChild.node);

        let beginNode = this.create_select_begin(RichTextChildSelectName, lineHeight);
        this.setLabelPos(beginNode.node,
            -beginNode.contentSize.width * 0.5,
            -29,
            parentSize,
            parentAnchor,
            beginNode.contentSize,
            beginNode.anchorPoint);
        this.node.addChild(beginNode.node);

        let endNode = this.create_select_end(RichTextChildSelectName, lineHeight);
        this.setLabelPos(endNode.node,
            parentSize.width - endNode.contentSize.width * 0.5,
            parentSize.height - lineHeight - endNode.contentSize.height,
            parentSize,
            parentAnchor,
            endNode.contentSize,
            endNode.anchorPoint);

        this.node.addChild(endNode.node);

        this.setBeginSelect(beginNode)
        this.setEndSelect(endNode)
    }

    public hideSelectLayer() {
        let children = this.node.children;
        let count = children.length;
        this.setBeginSelect(null)
        this.setEndSelect(null)
        for (let i = count - 1; i >= 0; i--) {
            let node = children[i];
            if (node && node.name == RichTextChildSelectName) {
                node.removeFromParent();
                node.destroy();
            }
        }
    }

    public updateSelectLayer(begin: boolean, offset: Readonly<Vec2>) {
        let beginUI = this.beginSelect
        let endUI = this.endSelect

        if (begin) {

        } else {

        }
    }

    public onSetLabelSize(width: number, height: number) {
        console.log("onSetLabelSize", this.node.name, width, height)
    }

    public measureSize(out: Size, maxWidth?: number) {
        let segments: ISegment[] = this._segments

        maxWidth = maxWidth == undefined ? 0 : maxWidth
        let width = 0;
        let lineWidth = 0
        let lineCount = 1
        for (const seg of segments) {
            if (seg.comp instanceof Label) {
                let curWidth = MeasureLabel.getLabelWidth(seg.comp, seg.comp.string, 0)
                lineWidth += curWidth
                if (maxWidth > 0) {
                    if (lineWidth > maxWidth) {
                        width = maxWidth
                        lineCount += 1
                        lineWidth -= maxWidth
                    } else {
                        width = lineWidth
                    }
                } else {
                    width += curWidth
                    lineWidth += curWidth
                }
            }
        }

        out.width = Math.ceil(width)
        out.height = Math.ceil((lineCount + BASELINE_RATIO) * this.lineHeight)
    }

    public static register_place_holder(key: string, width: number, height: number): boolean {
        return true;
    }

    public static unregister_place_holder(key: string): boolean {
        return true;
    }

    public static register_font(path: string, tag?: string): string {
        return ""
    }

    public static unregister_font(path: string): boolean {
        return true;
    }
}