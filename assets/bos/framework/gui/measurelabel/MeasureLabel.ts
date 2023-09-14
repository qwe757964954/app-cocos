import { safeMeasureText } from "cc";
import { Label } from "cc";
import { MeasureTTFLabel } from "./imp/MeasureTTFLabel";
import { BitmapFont } from "cc";
import { MeasureBitmapFont } from "./imp/MeasureBitmapFont";
import { Size } from "cc";

export interface MeasureImpBase {
    getLabelWidth(lbl: Label, value: string, maxWidth: number, out?: Size);
}
export class MeasureLabel {
    private static _ttfImp = new MeasureTTFLabel;
    private static _bmfontImp = new MeasureBitmapFont;

    /**
    *  @zh 计算label 的宽度指，如果指定最大宽度则限制 width 不会超过 maxWidth
    */
    public static getLabelWidth(lbl: Label, value: string, maxWidth: number = 0) {
        let imp: MeasureImpBase = this._ttfImp;

        if (lbl.font instanceof BitmapFont) {
            imp = this._bmfontImp;
        }
        return imp.getLabelWidth(lbl, value, maxWidth);
    }

    /**
    *  @zh 计算label 的宽度指，如果指定最大宽度则限制 width 不会超过 maxWidth
    */
    public static getLabelSize(out: Size, lbl: Label, value: string, maxWidth: number = 0) {
        let imp: MeasureImpBase = this._ttfImp;

        if (lbl.font instanceof BitmapFont) {
            imp = this._bmfontImp;
        }

        imp.getLabelWidth(lbl, value, maxWidth, out);
    }
}