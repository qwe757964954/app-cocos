import { UITransform } from "cc"
import { MeasureMode } from "./YogaEnum"
import { MeasureSize, YogaComponet, YogaMeasureImp } from "./YogaMeasureImp"
import { Label, Overflow, size } from "cc";
import { Size } from "cc";
import { MeasureLabel } from "../gui/measurelabel/MeasureLabel";


let TempMeasureSize = new Size(0, 0)

export enum YogaLabelEvent {
    STRING_CHANGE = "yoga_string_change",
}

function redefine_label_string(label: Label) {
    Object.defineProperty(label, 'string', {
        get: function () {
            return this._string;
        },
        set: function (value: string) {
            if (value === null || value === undefined) {
                value = '';
            } else {
                value = value.toString();
            }

            if (this._string === value) {
                return;
            }
            this._string = value;
            this.node.emit(YogaLabelEvent.STRING_CHANGE, this, value)
            this.markForUpdateRenderData();
        }
    })
}

export class YogaMeasureLabel extends YogaMeasureImp {
    private _uiTransform: UITransform = null;
    private _label: Label = null!;

    public init(flex: YogaComponet) {
        super.init(flex)
        this._label = this.node.getComponent(Label)
        this._uiTransform = this.node.getComponent(UITransform)
        redefine_label_string(this._label)
    }
    protected on_measure_test(width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode): MeasureSize {
        return this.on_measure_test3(width, widthMode, height, heightMode)
    }

    protected on_measure_test3(width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode): MeasureSize {
        if (widthMode == MeasureMode.Exactly && heightMode == MeasureMode.Exactly) {
            this._label.overflow = Overflow.CLAMP;
            this._uiTransform.setContentSize(width, height)
            return { width: width, height: height }
        } else {
            if (widthMode == MeasureMode.Undefined) {
                width = 0
            }

            if (heightMode == MeasureMode.Undefined) {
                height = 0;
            }

            MeasureLabel.getLabelSize(TempMeasureSize, this._label, this._label.string, width)

            let retWidth = TempMeasureSize.width
            let retHeight = TempMeasureSize.height

            let overflow = Overflow.NONE
            if (widthMode == MeasureMode.Undefined) {
                retWidth = TempMeasureSize.width
                overflow = Overflow.NONE
            } else if (widthMode == MeasureMode.Exactly) {
                overflow = Overflow.RESIZE_HEIGHT
            } else if (widthMode == MeasureMode.AtMost) {
                retWidth = TempMeasureSize.width
                overflow = Overflow.RESIZE_HEIGHT
            }

            if (heightMode == MeasureMode.Undefined) {
                retHeight = TempMeasureSize.height
            } else if (heightMode == MeasureMode.Exactly) {
                if (retHeight != height) {
                    retHeight = height
                    overflow = Overflow.CLAMP;
                }
            } else if (heightMode == MeasureMode.AtMost) {
                if (retHeight > height) {
                    retHeight = height
                    overflow = Overflow.CLAMP;
                }
            }

            retWidth = Math.ceil(retWidth)
            retHeight = Math.ceil(retHeight)
            this._label.overflow = overflow
            this._uiTransform.setContentSize(retWidth, retHeight)
            //console.log(`LabelMeasure measuresize:${TempMeasureSize.width},${TempMeasureSize.height}  width:${width} widthMode:${widthMode} height:${height} heightMode:${heightMode} retWidth:${retWidth} retHeight:${retHeight}`)
            return { width: retWidth, height: retHeight }
        }
    }
    protected on_measure_test2(width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode): MeasureSize {
        if (widthMode == MeasureMode.Undefined) {
            width = 0
        }

        if (heightMode == MeasureMode.Undefined) {
            height = 0;
        }

        MeasureLabel.getLabelSize(TempMeasureSize, this._label, this._label.string, width)

        let retWidth = TempMeasureSize.width
        let retHeight = TempMeasureSize.height

        if (widthMode == MeasureMode.Undefined) {
            retWidth = TempMeasureSize.width
            this._label.overflow = Overflow.NONE
        } else if (widthMode == MeasureMode.Exactly) {
            this._label.overflow = Overflow.RESIZE_HEIGHT
        } else if (widthMode == MeasureMode.AtMost) {
            retWidth = TempMeasureSize.width
            this._label.overflow = Overflow.RESIZE_HEIGHT
        }

        if (heightMode == MeasureMode.Undefined) {
            retHeight = TempMeasureSize.height
        } else if (heightMode == MeasureMode.Exactly) {
            retHeight = height
        } else if (heightMode == MeasureMode.AtMost) {
            if (retHeight > height) {
                retHeight = height
            }
        }
        this._uiTransform.setContentSize(retWidth, retHeight)
        return { width: retWidth, height: retHeight }
    }

    protected on_measure_test1(width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode): MeasureSize {
        this._label.updateRenderData(true);
        if (widthMode == MeasureMode.Exactly) {
            if (this._uiTransform.contentSize.width != width || this._label.overflow != Overflow.RESIZE_HEIGHT) {
                this._uiTransform.setContentSize(size(width, 0))
                this._label.overflow = Overflow.RESIZE_HEIGHT;
                this._label.updateRenderData(true);
            }
        } else if (widthMode == MeasureMode.AtMost) {

            if (this._label.overflow == Overflow.NONE) {
                if (this._uiTransform.contentSize.width > width) {
                    this._uiTransform.setContentSize(width, 0)
                    this._label.overflow = Overflow.RESIZE_HEIGHT;
                    this._label.updateRenderData(true);
                }
            } else if (this._label.overflow == Overflow.RESIZE_HEIGHT) {
                if (this._uiTransform.contentSize.width <= width) {
                    this._label.overflow = Overflow.NONE;
                    this._label.updateRenderData(true);
                }

                if (this._uiTransform.contentSize.width > width) {
                    this._uiTransform.setContentSize(width, 0)
                    this._label.overflow = Overflow.RESIZE_HEIGHT;
                    this._label.updateRenderData(true);
                }
            }
        }
        let retWidth = this._uiTransform.contentSize.width
        let retHeight = this._uiTransform.contentSize.height
        console.log("setMeasureFunc label", this.node.name, width, height, widthMode, heightMode, retWidth, retHeight)

        return { width: retWidth, height: retHeight }
    }
};