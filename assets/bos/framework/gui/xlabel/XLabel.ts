import { _decorator } from 'cc';
import { JSB } from 'cc/env';
import { ByLabelImpBase } from './imp/ByLabelImpBase';
import { TekstoLabelImp } from './imp/TekstoLabelImp';
import { RichTextLabelImp } from './imp/RichTextLabelImp';
import { Component } from 'cc';
import { UITransform } from 'cc';
import { Font } from 'cc';
import { FontSlant, FontWeight, HorizontalAlignment, LayoutAlignment, LineBreakMode, LineTruncateMode, VerticalAlignment } from './imp/TekstoEnum';
import { CCInteger } from 'cc';
import { CCString } from 'cc';
import { CCBoolean } from 'cc';
import { Color, Node } from 'cc';
import { DirtyFlag } from './XLabelEnum';
import { SpriteFrame } from 'cc';
import { CURSOR_IMAGE_PNG } from './LabelCursorPng';
import { Texture2D } from 'cc';
import { assert } from 'cc';
import { ImageAsset } from 'cc';
import { Margin, PlaceHoldCache } from './PlaceHoldCache';
import { FontRegisterCache } from './FontRegisterCache';
import { Size } from 'cc';
const { ccclass, property, menu, executeInEditMode, requireComponent, disallowMultiple } = _decorator;

export enum XLabelEvent {
    STRING_CHANGE = "xlabel_change_string",
    SIZE_ATTRIBUTE_CHANGE = "xlabel_size_attribute_change", //所有会影响size的属性变化都会触发
}

const ZeroSize = new Size(0, 0)

@ccclass('XLabel')
@menu('2D/XLabel')
@requireComponent(UITransform)
@disallowMultiple
@executeInEditMode
export class XLabel extends Component {
    public static EventType = XLabelEvent;
    //static member
    private static _cursorSpriteFrame: SpriteFrame = null;
    public static getCursorSpriteFrame() {
        if (this._cursorSpriteFrame != null) {
            return this._cursorSpriteFrame
        }

        let width = CURSOR_IMAGE_PNG.width
        let height = CURSOR_IMAGE_PNG.height;
        let channel = CURSOR_IMAGE_PNG.channels;
        let data = new Uint8Array(width * height * channel);
        assert(data.length == CURSOR_IMAGE_PNG.data.length);

        for (let i = 0; i < width * height * channel; i++) {
            data[i] = CURSOR_IMAGE_PNG.data[i];
        }

        let imageSource = {
            width: width,
            height: height,
            _compressed: false,
            format: Texture2D.PixelFormat.RGBA8888,
            _data: data,
        }
        const imgAsset = new ImageAsset(imageSource);
        const texture = new Texture2D();
        texture.image = imgAsset
        this._cursorSpriteFrame = new SpriteFrame;
        this._cursorSpriteFrame.texture = texture
        this._cursorSpriteFrame.addRef();

        this._cursorSpriteFrame.insetLeft = 13
        this._cursorSpriteFrame.insetRight = 13
        this._cursorSpriteFrame.insetTop = 29
        this._cursorSpriteFrame.insetBottom = 1
        this._cursorSpriteFrame.packable = true;
        return this._cursorSpriteFrame
    }
    //static member end

    get RichText() {
        return this._richText;
    }

    set RichText(value: boolean) {
        if (value == this._richText) return;
        this._richText = value;
        this._dirtyFlag |= value ? DirtyFlag.HTML_TEXT : DirtyFlag.TEXT;
    }

    @property({
        multiline: true,
        visible: function () {
            return this._richText
        }
    })
    get HtmlString() {
        return this._htmlString;
    }
    set HtmlString(value) {
        if (this._htmlString === value) {
            return;
        }
        this._htmlString = value;
        this._dirtyFlag |= DirtyFlag.HTML_TEXT;

        this.node.emit(XLabelEvent.SIZE_ATTRIBUTE_CHANGE)
    }

    @property({
        multiline: true,
        visible: function () {
            return !this._richText
        }
    })
    get string() {
        return this._string;
    }
    set string(value) {
        if (this._string === value) {
            return;
        }

        this._string = value;
        this._dirtyFlag |= DirtyFlag.TEXT;
        this.node.emit(XLabelEvent.STRING_CHANGE, this, value)
    }

    @property({
        type: CCInteger,
        step: 1,
    })
    get FontSize() {
        return this._fontSize;
    }
    set FontSize(value: number) {
        if (value == this._fontSize) return;
        this._fontSize = value;
        this._dirtyFlag |= DirtyFlag.FONT_SIZE;
    }

    @property({
        type: CCInteger,
        step: 1,
    })
    get LineSpace() {
        return this._lineSpace
    }
    set LineSpace(value: number) {
        if (value == this._lineSpace) return;
        this._lineSpace = value;
        this._dirtyFlag |= DirtyFlag.LINE_SPACE;
    }

    @property({
        type: CCInteger,
        step: 1,
    })
    get LetterSpace() {
        return this._letterSpace
    }
    set LetterSpace(value: number) {
        if (value == this._letterSpace) return;
        this._letterSpace = value;
        this._dirtyFlag |= DirtyFlag.LETTER_SPACE;
    }

    @property({
        type: CCString,
        visible: function () {
            return this._useSystemFont;
        }
    })
    get FontFamily() {
        return this._fontFamily
    }
    set FontFamily(value: string) {
        if (value == this._fontFamily) return;
        this._fontFamily = value;
        this._dirtyFlag |= DirtyFlag.FONT_FAMILY;
    }

    get CustomFontFamily(): string {
        return this._customFontFamily
    }

    @property({
        type: CCBoolean,
    })
    get UseSystemFont() {
        return this._useSystemFont;
    }
    set UseSystemFont(value: boolean) {
        if (value == this._useSystemFont) return;
        this._useSystemFont = value;
        this._dirtyFlag |= DirtyFlag.USE_SYSTEM_FONT;
    }

    @property({
        type: Font,
        visible: function () {
            return !this._useSystemFont;
        }
    })
    get Font() {
        return this._font;
    }
    set Font(value: Font) {
        if (value == this._font) return;
        this._font = value;
        this._dirtyFlag |= DirtyFlag.FONT;
        this._customFontFamily = XLabel.register_font(this._font, false)
    }

    @property({
        type: CCInteger,
        step: 1,
    })
    get MaxWidth() {
        return this._maxWidth
    }
    set MaxWidth(value: number) {
        if (value == this._maxWidth) return;
        this._maxWidth = value;
        this._dirtyFlag |= DirtyFlag.MAX_WIDTH;
    }

    @property({
        type: FontSlant,
    })
    get FontSlant() {
        return this._fontSlant;
    }
    set FontSlant(value: FontSlant) {
        if (value == this._fontSlant) return;
        this._fontSlant = value;
        this._dirtyFlag |= DirtyFlag.FONT_SIZE;
    }

    @property({
        type: FontWeight,
    })
    get FontWeight() {
        return this._fontWeight;
    }
    set FontWeight(value: FontWeight) {
        if (value == this._fontWeight) return;
        this._fontWeight = value;
        this._dirtyFlag |= DirtyFlag.FONT_WEIGHT;
    }

    @property({
        type: LineTruncateMode,
    })
    get LineTruncateMode() {
        return this._lineTruncateMode
    }
    set LineTruncateMode(value: LineTruncateMode) {
        if (value == this._lineTruncateMode) return;
        this._lineTruncateMode = value;

        this._dirtyFlag |= DirtyFlag.LINE_TRUNCATE_MODE;
    }

    @property({
        type: LineBreakMode,
    })
    get LineBreakMode() {
        return this._lineBreakMode;
    }
    set LineBreakMode(value: LineBreakMode) {
        if (value == this._lineBreakMode) return;
        this._lineBreakMode = value;
        this._dirtyFlag |= DirtyFlag.LINE_BREAK_MODE;
    }

    @property({
        type: HorizontalAlignment,
    })
    get HorizontalAlignment() {
        return this._horizontalAlignment
    }
    set HorizontalAlignment(value: HorizontalAlignment) {
        if (value == this._horizontalAlignment) return;
        this._horizontalAlignment = value;
        this._dirtyFlag |= DirtyFlag.HORIZONTAL_ALIGNMENT;
    }

    @property({
        type: VerticalAlignment,
    })
    get VerticalAlignment() {
        return this._verticalAlignment
    }
    set VerticalAlignment(value: VerticalAlignment) {
        if (value == this._verticalAlignment) return;
        this._verticalAlignment = value;
        this._dirtyFlag |= DirtyFlag.VERTICAL_ALIGNMENT;
    }

    @property({
        type: LayoutAlignment,
    })
    get LayoutAlignment() {
        return this._layoutAlignment
    }
    set LayoutAlignment(value: LayoutAlignment) {
        if (value == this._layoutAlignment) return;
        this._layoutAlignment = value;
        this._dirtyFlag |= DirtyFlag.LAYOUT_ALIGNMENT;
    }

    @property({
        type: Color,
    })
    get FontColor(): Readonly<Color> {
        return this._fontColor;
    }
    set FontColor(value: Color) {
        if (this._fontColor.equals(value)) return;
        this._fontColor.set(value);
        this._dirtyFlag |= DirtyFlag.FONT_COLOR;
    }

    @property({
        type: CCBoolean,
    })
    get UnderLine() {
        return this._underline
    }
    set UnderLine(value: boolean) {
        if (this._underline == value) return;
        this._underline = value;
        this._dirtyFlag |= DirtyFlag.UNDER_LINE;
    }

    @property({
        type: Color,
        visible: function () {
            return this._underline;
        }
    })
    get UnderLineColor(): Readonly<Color> {
        return this._underlineColor
    }
    set UnderLineColor(value: Color) {
        if (this._underlineColor.equals(value)) return;
        this._underlineColor.set(value);
        this._dirtyFlag |= DirtyFlag.UNDER_LINE;
    }

    get DirtyFlag() {
        return this._dirtyFlag;
    }
    public clearDirtyFlag() {
        return this._dirtyFlag = 0;
    }

    private _labelImpl: ByLabelImpBase = null!;

    @property({
        serializable: true
    })
    private _string: string = "ByLabel";

    private _htmlString: string = "";

    @property({
        serializable: true
    })
    private _fontSize: number = 28;
    @property({
        serializable: true
    })
    private _lineSpace: number = 1;

    @property({
        serializable: true,
    })
    private _letterSpace: number = 0;

    @property({
        serializable: true
    })
    private _fontFamily = "Arial";

    @property({
        serializable: true
    })
    private _useSystemFont = true;
    @property({
        serializable: true
    })
    private _font: Font = null!;
    private _customFontFamily = "";

    @property({
        serializable: true
    })
    private _maxWidth: number = 0;
    @property({
        serializable: true
    })
    private _fontSlant: FontSlant = FontSlant.Normal;
    @property({
        serializable: true
    })
    private _fontWeight: FontWeight = FontWeight.Normal;
    @property({
        serializable: true
    })
    private _lineTruncateMode: LineTruncateMode = LineTruncateMode.Clipping;
    @property({
        serializable: true
    })
    private _lineBreakMode: LineBreakMode = LineBreakMode.WordWrapping;
    @property({
        serializable: true
    })
    private _horizontalAlignment: HorizontalAlignment = HorizontalAlignment.Left;
    @property({
        serializable: true
    })
    private _verticalAlignment: VerticalAlignment = VerticalAlignment.Top;
    @property({
        serializable: true
    })
    private _layoutAlignment: LayoutAlignment = LayoutAlignment.Top;

    @property({
        serializable: true,
    })
    private _fontColor: Color = Color.WHITE.clone();

    @property({
        serializable: true,
    })
    private _underline: boolean = false;
    @property({
        serializable: true,
    })
    private _underlineColor: Color = Color.BLACK.clone();
    @property({
        serializable: true,
    })
    private _richText: boolean = false;

    private _dirtyFlag: number = DirtyFlag.ALL;
    private _labelSetSize: Size = new Size(0, 0)
    private _labelSetSizeEnable: boolean = false;

    get LabelSize(): Readonly<Size> {
        if (!this._labelSetSizeEnable) return ZeroSize;
        return this._labelSetSize
    }

    get CursorImage(): SpriteFrame {
        return XLabel.getCursorSpriteFrame();
    }

    setLabelSizeEnable(enable: boolean) {
        this._labelSetSizeEnable = enable;
        this._dirtyFlag |= DirtyFlag.MAX_WIDTH;
    }

    onLoad() {
        if (!this._useSystemFont && this._font != null) {
            this._customFontFamily = XLabel.register_font(this._font, false)
        }

        if (JSB) {
            this._labelImpl = new TekstoLabelImp(this.node, this);
        } else {
            this._labelImpl = new RichTextLabelImp(this.node, this);
        }
        this._dirtyFlag = DirtyFlag.ALL;

        this._labelImpl?.onLoad();
    }

    onEnable() {
        this._labelImpl?.onEnable();
    }

    onDisable() {
        this._labelImpl?.onDisable();
    }
    protected onDestroy(): void {
        this._labelImpl?.onDestroy();
    }


    public getLabelImp() {
        return this._labelImpl;
    }

    update(dt: number) {
        if (this._dirtyFlag != 0) {
            this._labelImpl.applySetting(this._string)
            if ((this._dirtyFlag & DirtyFlag.SIZE_CHANGE_ATTR) != 0) {
                this.node.emit(XLabelEvent.SIZE_ATTRIBUTE_CHANGE)
            }
            this._labelImpl.updateLabelTextStatus(this._string)
            this.clearDirtyFlag();
        }
    }

    public measureSize(out: Size, maxWidth?: number) {
        this._labelImpl.measureSize(out, maxWidth)
    }

    public setLabelSize(width: number, height: number) {
        this._labelSetSize.width = width
        this._labelSetSize.height = height
        this._labelImpl.onSetLabelSize(width, height)
        this._dirtyFlag |= DirtyFlag.MAX_WIDTH;
    }

    public static register_place_hold(key: string, spriteFrame: SpriteFrame, margin?: Margin) {
        let success = PlaceHoldCache.getInstance().add(key, spriteFrame, margin)
        if (success) {
            let size = PlaceHoldCache.getInstance().getItemSize(key)
            this.getLabelImp().register_place_holder(key, size.width, size.height)
        }
    }

    public static unregister_place_hold(key: string) {
        let success = PlaceHoldCache.getInstance().remove(key)
        if (success) {
            this.getLabelImp().unregister_place_holder(key)
        }
    }

    public static register_font(font: Font, systemFont: boolean = true) {
        let tag = undefined
        let path = font.nativeUrl
        console.log("register_font", font, path)
        if (!systemFont) {
            tag = FontRegisterCache.getInstance().check_register_font_custom(path)
        }

        let fontFamily = this.getLabelImp().register_font(path, tag);

        if (tag != null) {
            return tag
        }

        return fontFamily
    }

    public static getLabelImp(): typeof ByLabelImpBase {
        if (JSB) {
            return TekstoLabelImp
        } else {
            return RichTextLabelImp;
        }
    }
}


