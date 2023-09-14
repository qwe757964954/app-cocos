import { Size } from "cc";
import { BASELINE_RATIO } from "cc";
import { safeMeasureText } from "cc";
import { Label } from "cc";
import { MeasureData } from "./MeasureData";
import { isUnicodeCJK, isUnicodeSpace } from "./text-uitls";

export class MeasureTTFLabel {
    private sharedLabelData = null!;

    private getFontDesc(lbl: Label) {
        let fonstSize = lbl.fontSize

        let fontFamily = lbl.fontFamily
        if (!lbl.useSystemFont) {
            if (lbl.font) {
                fontFamily = lbl.font._nativeAsset || 'Arial';
            } else {
                fontFamily = 'Arial'
            }
        } else {
            fontFamily = lbl.fontFamily || 'Arial'
        }

        let isBold = lbl.isBold
        let isItalic = lbl.isItalic

        let fontDesc = `${fonstSize.toString()}px `;
        fontDesc += fontFamily;
        if (isBold) {
            fontDesc = `bold ${fontDesc}`;
        }

        if (isItalic) {
            fontDesc = `italic ${fontDesc}`;
        }

        return fontDesc;
    }

    private getSharedLabelData() {
        if (this.sharedLabelData == null) {
            this.sharedLabelData = Label._canvasPool.get();
            this.sharedLabelData.canvas.width = this.sharedLabelData.canvas.height = 1;
        }
        return this.sharedLabelData
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

    private getWidthString(ctx: CanvasRenderingContext2D, labelString: string, fontDesc: string, maxWidth: number) {
        const checkStringWidth = safeMeasureText(ctx, labelString, fontDesc);
        if (checkStringWidth <= maxWidth) return { width: checkStringWidth, count: labelString.length };

        let maxIdex = labelString.length - 1;
        let bIdx = 0;
        let eIdx = maxIdex;
        let curIndex = Math.floor(eIdx / 2);
        let lastWidth = 0
        let lastLength = 0
        while (curIndex > 0 && curIndex <= maxIdex && curIndex > bIdx && curIndex < eIdx && bIdx < eIdx) {
            let substr = labelString.substr(0, curIndex + 1)
            const checkStringWidth = safeMeasureText(ctx, substr, fontDesc);

            if (checkStringWidth > maxWidth) {
                eIdx = curIndex
            } else {
                lastWidth = checkStringWidth
                lastLength = curIndex + 1
                bIdx = curIndex
            }
            curIndex = bIdx + Math.floor((eIdx - bIdx + 1) / 2);

        }

        return { width: lastWidth, count: lastLength }
    }

    private measureTextWidthWithMaxWidth(ctx: CanvasRenderingContext2D, labelString: string, fontDesc: string, maxWidth: number, measureData: MeasureData) {
        let curStringValue = labelString

        let checkStartIndex = 0;
        while (curStringValue.length > 0) {
            if (measureData.lineOffset >= maxWidth) {
                measureData.lineCount++;
                measureData.lineOffset = 0;
                measureData.width = maxWidth
            }
            let remainWidth = maxWidth - measureData.lineOffset
            const { width, count } = this.getWidthString(ctx, curStringValue, fontDesc, remainWidth);
            measureData.lineOffset += width
            checkStartIndex += count
            if (count < curStringValue.length) {
                measureData.lineCount++;
                measureData.lineOffset = 0;
                measureData.width = maxWidth
            } else {
                break;
            }

            curStringValue = curStringValue.substring(checkStartIndex)
            checkStartIndex = 0
        }
    }

    //计算label 的宽度指，如果指定最大宽度则限制 width 不会超过 maxWidth
    public getLabelWidth(lbl: Label, value: string, maxWidth: number, out?: Size) {
        const paragraphedStrings = value.split('\n');
        const sharedLabelData = this.getSharedLabelData();
        const context = sharedLabelData.context
        const fontDesc = this.getFontDesc(lbl)
        context.font = fontDesc

        let measureData: MeasureData = {
            width: 0,
            lineCount: 1,
            lineOffset: 0,
        }

        for (let i = 0; i < paragraphedStrings.length; ++i) {
            if (maxWidth > 0) {
                this.measureTextWidthWithMaxWidth(context, paragraphedStrings[i], fontDesc, maxWidth, measureData);
            } else {
                const curWidth = safeMeasureText(context, paragraphedStrings[i], fontDesc);
                measureData.lineOffset += curWidth
                measureData.width += curWidth
            }
        }

        if (measureData.width <= 0) {
            measureData.width = measureData.lineOffset
        }

        if (out) {
            out.width = measureData.width
            out.height = (measureData.lineCount + BASELINE_RATIO) * lbl.lineHeight
        }

        return measureData.width
    }
}