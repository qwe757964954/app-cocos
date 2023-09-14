import { UITransform } from "cc"
import { MeasureMode } from "./YogaEnum"
import { MeasureSize, YogaComponet, YogaMeasureImp } from "./YogaMeasureImp"
import { Size } from "cc";
import { XLabel } from "../gui/xlabel/XLabel";

let TempSize = new Size(0, 0)

export class YogaMeasureXLabel extends YogaMeasureImp {
    private _uiTransform: UITransform = null;
    private _label: XLabel = null!;

    public init(flex: YogaComponet) {
        super.init(flex)
        this._label = this.node.getComponent(XLabel)
        this._uiTransform = this.node.getComponent(UITransform)
    }

    protected on_measure_test(width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode): MeasureSize {

        if (widthMode == MeasureMode.Undefined) {
            width = 0
        }

        if (heightMode == MeasureMode.Undefined) {
            height = 0;
        }

        this._label.measureSize(TempSize, width)
        let retWidth = TempSize.width;
        let retHeight = TempSize.height

        if (widthMode == MeasureMode.Undefined) {
            retWidth = TempSize.width
        } else if (widthMode == MeasureMode.Exactly) {
            retWidth = width
        } else if (widthMode == MeasureMode.AtMost) {
            retWidth = TempSize.width
        }

        if (heightMode == MeasureMode.Undefined) {
            retHeight = TempSize.height
        } else if (heightMode == MeasureMode.Exactly) {
            retHeight = height
        } else if (heightMode == MeasureMode.AtMost) {
            if (retHeight > height) {
                retHeight = height
            }
        }
        console.log(`setMeasureFunc xlabel[${this.node.name} width:${width} height:${height} widthMode:${widthMode} heightMode:${heightMode} retWidth:${retWidth} retHeight:${retHeight}]`)

        this._label.setLabelSize(retWidth, retHeight)
        return { width: retWidth, height: retHeight }
    }

    public onEnable() {
        this._label.setLabelSizeEnable(true)
    }

    public onDisable() {
        this._label.setLabelSizeEnable(false)
    }
};