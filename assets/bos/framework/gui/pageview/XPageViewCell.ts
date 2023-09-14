import { UITransform } from "cc";
import { Component, _decorator } from "cc"
import { XPageViewDirection } from "./XPageViewEnum";
import { HeightField } from "cc";

const { ccclass, property, requireComponent, disallowMultiple } = _decorator;

@ccclass("XPageViewCell")
export class XPageViewCell extends Component {

    get PageIndex() {
        return this._pageIndex;
    }
    set PageIndex(value: number) {
        this._pageIndex = value;
    }


    private _uiTransform: UITransform = null!;
    private _pageIndex: number = 0;

    getUITransform() {
        if (this._uiTransform) return this._uiTransform

        this._uiTransform = this.node.getComponent(UITransform)

        return this._uiTransform
    }

    getLength(dir: XPageViewDirection) {
        let uiTransform = this.getUITransform();
        switch (dir) {
            case XPageViewDirection.Horizontal:
                {
                    return uiTransform.width;
                }
            case XPageViewDirection.Vertical:
                {
                    return uiTransform.height;
                }
        }
    }

    onload() {

    }
}