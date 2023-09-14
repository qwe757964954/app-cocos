import { Enum } from "cc";

export enum XPageViewSizeMode {
    /**
     * @en Each page is unified in size.
     * @zh 每个页面统一大小。
     */
    Unified = 0,
    /**
     * @en Each page is in free size.
     * @zh 每个页面大小随意。
     */
    Free = 1,
}
Enum(XPageViewSizeMode);

/**
 * @en Enum for Page View Direction.
 *
 * @zh 页面视图滚动类型。
 */
export enum XPageViewDirection {
    /**
     * @en Horizontal scroll.
     * @zh 水平滚动。
     */
    Horizontal = 0,
    /**
     * @en Vertical scroll.
     * @zh 垂直滚动。
     */
    Vertical = 1,
}

Enum(XPageViewDirection);

/**
 * @en Enum for ScrollView event type.
 *
 * @zh 滚动视图事件类型。
 */
export enum XPageViewEventType {
    PAGE_TURNING = 'page-turning',
    SCROLL_ENDED = 'scroll-ended',
}