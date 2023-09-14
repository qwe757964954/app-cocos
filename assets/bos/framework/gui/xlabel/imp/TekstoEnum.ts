import { Texture2D, Enum } from "cc";
import { Size } from "cc";
import { ImageAsset } from "cc";

export enum FontSlant {
    Normal = 0,
    Italic,
    Oblique,
};

Enum(FontSlant)

export enum FontWeight {
    Thin = 0x10,
    Normal,
    Bold,
    Heavy,
};
Enum(FontWeight)

export enum LineTruncateMode { //当 size 不够显示label 内容的裁剪方式
    Clipping = 0, //直接正常截断超出的部分
    ByHead,  //字符从尾到头显示，最前面超出的字符显示 ...
    ByTail,  //字符从头到尾显示，最后超出的字符显示 ...
    ByMiddle, //字符显示 两端内容 中间 显示 ...
}
Enum(LineTruncateMode)

export enum LineBreakMode {
    WordWrapping = 0,
    CharWrapping,
};
Enum(LineBreakMode)

export enum HorizontalAlignment {
    // Natual = 0,
    Left = 0,
    Right,
    Center,
    Justified, //多余的空间平均分给每个字符之间的空隙
};
Enum(HorizontalAlignment)

export enum VerticalAlignment {
    Top = 0,
    Bottom,
    Center,
    Baseline,
};
Enum(VerticalAlignment)

export enum LayoutAlignment {
    Top = 0,
    Bottom,
    Center,
};
Enum(LayoutAlignment)

export enum MessageType {
    Text = 0,
    Pic,
    Unkonw
};

export enum PaceHolderMode {
    Inline = 0,  // 行内
    SingleLine,  // 单独一行
    Encircle,    // 环绕
};
Enum(PaceHolderMode)

export enum AttributeType {
    FontFamily = 0,
    FontWeight,
    FontSize,
    FontSlant,
    Color,
    BackgroundColor,
    ShadowColor,
    ShadowOffset,
    Underline,
    Middleline,
    Overline,
    Outline,
    PaceHolder,
    Null,
};
Enum(AttributeType)

export class TekstoMessage {
    type: MessageType;
    msg: string;


    //pic
    x: number;
    y: number;
    width: number;
    height: number;
    mode: PaceHolderMode;

    //text
    family?: string;
    size?: number;
    color?: number;
    slan?: FontSlant;
    weight?: FontWeight;
    bg_color?: number;
    outline_color?: number;
    underline_color?: number;
    middleline_color?: number;
};

export enum LabelChildType {
    BITMAP,
    VECTOR,
    PACE_HOLDER,
    CURSOR,
}

export interface IMemoryImageSource {
    _data: ArrayBufferView | null;
    _compressed: boolean;
    width: number;
    height: number;
    format: number;
    mipmapLevelDataSize?: number[];
}
