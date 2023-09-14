import { Size } from "cc";
import { assert } from "cc";
import { SpriteFrame } from "cc";

export interface Margin {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
};

export interface PlaceHoldItem {
    spriteFrame: SpriteFrame;
    margin: Margin;
    size: Size,
}

const SizeZero: Size = new Size(0, 0)

export class PlaceHoldCache {
    protected constructor() { }
    private static _instance: PlaceHoldCache = new PlaceHoldCache();
    public static getInstance() {
        return this._instance;
    }

    private _cache: Map<string, PlaceHoldItem> = new Map();

    private checkMargin(margin: Margin) {
        if (margin == null) {
            margin = {
                left: 0, right: 0, top: 0, bottom: 0,
            }
        }

        if (margin.left == null) margin.left = 0;
        if (margin.right == null) margin.right = 0;
        if (margin.top == null) margin.top = 0;
        if (margin.bottom == null) margin.bottom = 0;

        return margin
    }
    public add(key: string, frame: SpriteFrame, margin?: Margin) {
        let old = this._cache.get(key)
        if (old != null) return false;
        frame.addRef()

        margin = this.checkMargin(margin)

        let size = new Size(frame.width + margin.left + margin.right, frame.height + margin.top + margin.bottom);

        this._cache.set(key, { spriteFrame: frame, margin: margin, size: size })

        return true;
    }

    public getSpriteFrame(key: string): SpriteFrame {
        let item = this._cache.get(key)
        if (item) {
            return item.spriteFrame;
        }
    }

    public getItemSize(key: string): Readonly<Size> {
        let item = this._cache.get(key)
        if (item == null) {
            return SizeZero
        }

        return item.size
    }

    public getItem(key: string): PlaceHoldItem {
        return this._cache.get(key);
    }

    public remove(key: string) {
        let item = this._cache.get(key)
        if (item == null) return false;
        item.spriteFrame.decRef();
        this._cache.delete(key)

        return true;
    }

    public clear() {
        this._cache.forEach((item: PlaceHoldItem) => {
            item.spriteFrame.decRef()
        })
        this._cache.clear();
    }
}