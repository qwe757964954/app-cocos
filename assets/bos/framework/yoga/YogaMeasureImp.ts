import { MeasureMode } from "./YogaEnum";
import { Node } from "cc"

export type MeasureSize = {
    width: number,
    height: number,
}
export type MeasureFunction = (
    width: number,
    widthMode: MeasureMode,
    height: number,
    heightMode: MeasureMode,
) => MeasureSize;

export interface YogaComponet {
    set_measure_func(func: MeasureFunction): void;
    node: Node;
}

export class YogaMeasureImp {
    protected node: Node = null!;
    public init(flex: YogaComponet) {
        this.node = flex.node;
        flex.set_measure_func((width: number,
            widthMode: MeasureMode,
            height: number,
            heightMode: MeasureMode) => {
            return this.on_measure_test(width, widthMode, height, heightMode)
        })
    }
    protected on_measure_test(width: number, widthMode: MeasureMode, height: number, heightMode: MeasureMode): MeasureSize {
        throw new Error("need overwrite!!")
    }

    public onEnable() { }
    public onDisable() { }
};