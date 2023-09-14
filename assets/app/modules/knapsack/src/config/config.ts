import { Node, Color } from 'cc';
import { PageCellCtr } from '../component/PageCellCtr';
import { IUserBuff } from 'idl/tss/hall/buff.v3';
import { IBuffProp, ICouponProp, IUsage, IUserProp, State, UserProp } from 'idl/tss/hall/prop.v4';
import { IAssetItem, PropCategory, PropType } from 'idl/tss/common/common_define';

const FeatureConfig = {
    // 奖品中心
    IS_OPEN_PRIZE_CENTER: true,
    JIN_DONG_DUMP: true,
    //是否能赠送道具
    IS_OPEN_PROP_GIFT: false
};

export interface Point {
    x: number;
    y: number;
}

export interface LineSegment {
    start: Point;
    end: Point;
}

export interface Circle {
    center: Point;
    radius: number;
}

export interface VgData {
    type: string;
    data: Point;
}

/**
 * 声明初始数据类型
*/
export interface PrimalVgData {
    type: string;
    data: {
        x: number,
        y: number,
        x1?: number,
        y1?: number,
    };
}

// export interface IUserProp {
//     uid?: number|null
//     propID?: number|null
//     num?: number|null
//     expireAt?: number|null
//     category?: tss_common_PropCategory|null
//     type?: tss_common_PropType|null
//     name?: string|null
//     desc?: string|null
//     img?: string|null
//     icon?: string|null
//     grantedAt?: number|null
//     usage?: IUsage
//     showTag?: string|null
//     badgeNum?: number|null
//     state?: State|null
//     objectID?: string|null
//     buff?: IBuffProp
//     coupon?: ICouponProp
//     gitfItems?: tss_common_IAssetItem[]
//     canSend?: boolean|null
//     discardCompensation?: number|null
//     shortcut?: boolean|null
//     numInShortcut?: number|null
//     referMung?: number|null
//     recycleAble?: boolean|null
// }

// export interface IUserBuff {
//     uid?: number|null
//     type?: BuffType|null
//     name?: string|null
//     img?: string|null
//     desc?: string|null
//     expireAt?: number|null
//     markupRate?: number|null
//     buffExtraConf?: tss_hall_common_IBuffExtraConf
// }


// 每个小节点所保存的数据类型
export interface BagData {
    uid?: number | null;
    propID?: number | null;
    num?: number | null;
    expireAt?: number | null;
    category?: PropCategory | null;
    type?: number | null;
    name?: string | null;
    desc?: string | null;
    img?: string | null;
    icon?: string | null;
    grantedAt?: number | null;
    usage?: IUsage;
    showTag?: string | null;
    badgeNum?: number | null;
    state?: State | null;
    objectID?: string | null;
    buff?: IBuffProp;
    coupon?: ICouponProp;
    gitfItems?: IAssetItem[];
    canSend?: boolean | null;
    discardCompensation?: number | null;
    shortcut?: boolean | null;
    numInShortcut?: number | null;
    referMung?: number | null;
    recycleAble?: boolean | null;
    // 前端自定义的字段
    itemType?: string;
    isOpen?: boolean;
    index?: number;
    showShaderBg?: boolean;
    showOpenAnim?: boolean;
    delayTime?: number;
    showHideAnim?: boolean;
    backgroundColor?: Color;
    page?: number;
    pageSize?: number;
    __prop__?: IUserProp;
    __buff__?: IUserBuff;
}

// 文本样式
export type LabelStyle = {
    fontSize: number;
    color: Color;
    isBold: boolean;
};
// 选中样式
const selectedStyle: LabelStyle = {
    fontSize: 48,
    color: new Color(255, 153, 83, 255),
    isBold: true,
};
// 非选中样式
const unSelectedStyle: LabelStyle = {
    fontSize: 40,
    color: new Color(136, 136, 136, 255),
    isBold: false,
};
// 颜色表
const ColorMap = {
    color1: new Color(31, 31, 31, 255), // '#1F1F1F' 
    color2: new Color(24, 24, 24, 255), // '#181818'
    color3: new Color(11, 11, 11, 255), // '#0B0B0B'
    color4: new Color(44, 44, 44, 255), // '#2C2C2CFF'
    color5: new Color(255, 63, 62, 255), // #FF3F3E
    color6: new Color(136, 136, 136, 255), // #888888FF
    color7: new Color(33, 33, 33, 255), // "#212121FF"
    color8: new Color(33, 33, 33, 0), // "#21212100"
    color9: new Color(39, 39, 39, 255), // "#272727FF"
    color10: new Color(39, 39, 39, 0), // "#27272700"
};

// PageViewComponent 显示分页数据
export type PageData = {
    tabType: number; // 类型 道具、兑换券
    delegate: any; // KnapsackCtr组件
    isChecked?: boolean; // 是否显示下标 是否选中
    isShowRedStar?: boolean; // 是否显示小红星
    labelStyle?: LabelStyle;
    amount?: number;
    box?: Node;
};
// 渲染背包内背景节点时使用的数据
export type RenderData = {
    startIndex?: number;
    endIndex?: number;
    fillColor?: Color;
};
// 每个小格子数据类型
export type BoxData = {
    delegate: PageCellCtr,
    data: BagData,
    rowIndex?: number;
};

const list = {

};

export { FeatureConfig, selectedStyle, unSelectedStyle, ColorMap };
