import { UITransform } from "cc";
import { Font } from "cc";
import { SpriteFrame } from "cc";
import { Component, _decorator, Node } from "cc"
import { FontSlant, FontWeight, HorizontalAlignment, LayoutAlignment, LineBreakMode, LineTruncateMode, VerticalAlignment } from "./TekstoEnum";
import { Color } from "cc";
import { Size } from "cc";
import { Vec2 } from "cc";
import { Sprite } from "cc";
import { builtinResMgr } from "cc";
import { v3 } from "cc";
import { v2 } from "cc";
import { PlaceHoldCache, PlaceHoldItem } from "../PlaceHoldCache";

const SELECT_COLOR = new Color(0, 0, 255, 100);
const CURSOR_COLOR = new Color(255, 0, 0, 100);

export interface ByLabelInterface {
    get enabledInHierarchy(): boolean;
    get HtmlString(): string;
    get string(): string;
    get FontSize(): number;
    get LineSpace(): number;
    get LetterSpace(): number;
    get FontFamily(): string;
    get CustomFontFamily(): string;
    get UseSystemFont(): boolean;
    get Font(): Font;
    get MaxWidth(): number;
    get LabelSize(): Readonly<Size>;
    get FontSlant(): FontSlant;
    get FontWeight(): FontWeight;
    get LineTruncateMode(): LineTruncateMode;
    get LineBreakMode(): LineBreakMode;
    get HorizontalAlignment(): HorizontalAlignment;
    get VerticalAlignment(): VerticalAlignment;
    get LayoutAlignment(): LayoutAlignment;
    get FontColor(): Readonly<Color>;
    get DirtyFlag(): number;
    get RichText(): boolean;
    get UnderLine(): boolean;
    get UnderLineColor(): Readonly<Color>;
    get CursorImage(): SpriteFrame;
    clearDirtyFlag(): void;
};

export interface XLabelSelectCompInterface {
    setBeginSelect(begin: UITransform);
    setEndSelect(end: UITransform);
    getBeginSelect(): UITransform;
    getEndSelect(): UITransform;
}

export class ByLabelImpBase {
    get node() {
        return this._node;
    }
    protected _node: Node;
    protected _byLabel: ByLabelInterface;
    protected _selectComp: XLabelSelectCompInterface;
    protected _uiTransform: UITransform;

    get enabledInHierarchy() {
        return this._byLabel.enabledInHierarchy;
    }

    get string() {
        return ""
    }

    get beginSelect() {
        if (this._selectComp == null) return null;
        return this._selectComp.getBeginSelect();
    }

    get endSelect() {
        if (this._selectComp == null) return null;
        return this._selectComp.getEndSelect();
    }

    setBeginSelect(beginUI: UITransform) {
        if (this._selectComp == null) return;
        this._selectComp.setBeginSelect(beginUI)
    }

    setEndSelect(endUI: UITransform) {
        if (this._selectComp == null) return;
        this._selectComp.setEndSelect(endUI)
    }

    setSelectComp(selectCom: XLabelSelectCompInterface) {
        this._selectComp = selectCom
    }

    constructor(node: Node, labelOwner: ByLabelInterface) {
        this._node = node;
        this._byLabel = labelOwner
        this._uiTransform = node.getComponent(UITransform);
    }

    protected getLabelPos(left: number, top: number, parentSize: Readonly<Size>, parentAnchor: Readonly<Vec2>, itemSize: Readonly<Size>, itemAnchor: Readonly<Vec2>) {
        let x = left - (parentAnchor.x * parentSize.width) + itemSize.width * itemAnchor.x;
        let y = -top + ((1 - parentAnchor.y) * parentSize.height) - itemSize.height * (1 - itemAnchor.y);

        return v2(x, y)
    }

    protected setLabelPos(item: Node, left: number, top: number, parentSize: Readonly<Size>, parentAnchor: Readonly<Vec2>, itemSize: Readonly<Size>, itemAnchor: Readonly<Vec2>) {
        console.log("setLabelPos", left, top, parentSize, parentAnchor, itemSize, itemAnchor)

        let x = left - (parentAnchor.x * parentSize.width) + itemSize.width * itemAnchor.x;
        let y = -top + ((1 - parentAnchor.y) * parentSize.height) - itemSize.height * (1 - itemAnchor.y);

        item.setPosition(x, y)
    }

    protected create_select_begin(nodeName: string, height: number) {
        let spriteNode = new Node(nodeName);
        let imgHeight = 29 + height
        let imgWidth = 29
        let uiTransform = spriteNode.addComponent(UITransform)
        let sprite = spriteNode.addComponent(Sprite)
        sprite.spriteFrame = this._byLabel.CursorImage;
        sprite.spriteFrame.packable = false;
        sprite.type = Sprite.Type.SLICED;
        uiTransform.setContentSize(imgWidth, imgHeight)
        spriteNode.layer = this.node.layer
        uiTransform.setAnchorPoint(0.5, 0);

        return uiTransform
    }

    protected create_select_end(nodeName: string, height: number) {
        let spriteNode = new Node(nodeName);
        let imgHeight = 29 + height
        let imgWidth = 29
        let uiTransform = spriteNode.addComponent(UITransform)
        let sprite = spriteNode.addComponent(Sprite)
        sprite.spriteFrame = this._byLabel.CursorImage;
        sprite.spriteFrame.packable = false;
        sprite.type = Sprite.Type.SLICED;
        uiTransform.setContentSize(imgWidth, imgHeight)
        spriteNode.layer = this.node.layer
        spriteNode.setScale(v3(1, -1, 1))
        uiTransform.setAnchorPoint(0.5, 0);
        return uiTransform
    }

    protected create_select_layer(nodeName: string, width: number, height: number) {
        let spriteNode = new Node(nodeName);
        let uiTransform = spriteNode.addComponent(UITransform)
        let sprite = spriteNode.addComponent(Sprite)
        sprite.spriteFrame = new SpriteFrame;
        sprite.spriteFrame.texture = builtinResMgr.get("white-texture")
        sprite.color = SELECT_COLOR;
        sprite.type = Sprite.Type.SLICED;
        sprite.spriteFrame.packable = false;
        uiTransform.setContentSize(width, height)
        spriteNode.layer = this.node.layer
        return uiTransform
    }

    protected create_cursor_layer(nodeName: string, width: number, height: number) {
        let spriteNode = new Node(nodeName);
        let uiTransform = spriteNode.addComponent(UITransform)
        let sprite = spriteNode.addComponent(Sprite)
        sprite.spriteFrame = new SpriteFrame;
        sprite.spriteFrame.texture = builtinResMgr.get("white-texture")
        sprite.color = CURSOR_COLOR;
        sprite.type = Sprite.Type.SLICED;
        spriteNode.layer = this.node.layer
        uiTransform.setContentSize(width, height)
        return uiTransform
    }

    public showSelectLayer() {
        throw new Error("need overwrite!!")
    }

    public updateSelectLayer(begin: boolean, offset: Readonly<Vec2>) {
        throw new Error("need overwrite!!")
    }
    public hideSelectLayer() {
        throw new Error("need overwrite!!")
    }
    public updateLabelTextStatus(value: string) {
        throw new Error("need overwrite!!")
    }

    public static register_place_holder(key: string, width: number, height: number): boolean {
        throw new Error("need overwrite!!")
    }

    public static unregister_place_holder(key: string): boolean {
        throw new Error("need overwrite!!")
    }

    public static register_font(path: string, tag?: string): string {
        throw new Error("need overwrite!!")
    }

    public static unregister_font(path: string): boolean {
        throw new Error("need overwrite!!")
    }

    public measureSize(out: Size, maxWidth?: number) {
        throw new Error("need overwrite!!")
    }

    public get_place_holder(key: string): PlaceHoldItem {
        return PlaceHoldCache.getInstance().getItem(key);
    }

    public onSetLabelSize(width: number, height: number) {
    }

    public applySetting(value: string) {
        throw new Error("need overwrite!!")
    }
    public onLoad() { }
    public onEnable() { }
    public onDisable() { }
    public onDestroy() { }
}