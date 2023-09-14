import { Size } from "cc";
import { BitmapFont } from "cc";
import { Label, js } from "cc";
import { MeasureData } from "./MeasureData";

const _horizontalKerning: number[] = [];
let _bmFontScale = 1
let _spacingX = 0;
let _margin = 0;

export class MeasureBitmapFont {
    private computeHorizontalKerningForText(value: string, fntConfig: any) {
        const string = value;
        const stringLen = string.length;

        const kerningDict = fntConfig!.kerningDict;
        const horizontalKerning = _horizontalKerning;

        if (!kerningDict) {
            return;
        }

        let prev = -1;
        for (let i = 0; i < stringLen; ++i) {
            const key = string.charCodeAt(i);
            const kerningAmount = kerningDict[(prev << 16) | (key & 0xffff)] || 0;
            if (i < stringLen - 1) {
                horizontalKerning[i] = kerningAmount;
            } else {
                horizontalKerning[i] = 0;
            }
            prev = key;
        }
    }

    private measureLineSize(value: string, fontAtlas: any, maxWidth: number, measureData: MeasureData) {
        const textLen = value.length;
        for (let index = 0; index < textLen;) {
            let character = value.charAt(index);

            let letterDef = fontAtlas!.getLetterDefinitionForChar(character);
            if (letterDef) {
                let curWidth = letterDef.w * _bmFontScale
                if (measureData.lineOffset + curWidth < maxWidth) {
                    measureData.lineOffset += curWidth
                } else {
                    measureData.lineCount++;
                    measureData.lineOffset = curWidth;
                    measureData.width = maxWidth
                }
            }
        }
    }
    //计算label 的宽度指，如果指定最大宽度则限制 width 不会超过 maxWidth
    public getLabelWidth(lbl: Label, value: string, maxWidth: number, out?: Size) {
        const fontAsset = lbl.font as BitmapFont;
        const fntConfig = fontAsset.fntConfig;
        const fontAtlas = fontAsset.fontDefDictionary;
        const fontSize = lbl.fontSize
        const originFontSize = fntConfig ? fntConfig.fontSize : fontSize
        const _linespace = 0;
        const margin = 0;

        _bmFontScale = fontSize / originFontSize;
        _spacingX = lbl.spacingX

        const paragraphedStrings = value.split('\n');
        let measureData: MeasureData = {
            width: 0,
            lineCount: 1,
            lineOffset: 0,
        }

        for (let i = 0; i < paragraphedStrings.length; ++i) {
            this.computeHorizontalKerningForText(paragraphedStrings[i], fntConfig)
            this.measureLineSize(paragraphedStrings[i], fontAtlas, maxWidth, measureData);
        }

        if (measureData.width <= 0) {
            measureData.width = measureData.lineOffset
        }

        if (out) {
            out.width = measureData.width

            let height = measureData.lineCount * (lbl.lineHeight * _bmFontScale)
            if (measureData.lineCount > 0) {
                height += (measureData.lineCount - 1) * _linespace;
            }
            out.height = parseFloat(height.toFixed(2)) + margin * 2
        }

        return measureData.width
    }
}