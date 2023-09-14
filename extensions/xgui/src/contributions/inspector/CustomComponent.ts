'use strict';

import { CustomComponentEx } from "./CustomComponentEx";
import { updatePropByDump } from "./prop";
type Selector<$> = { $: Record<keyof $, any | null>; };
export type PanelThis = Selector<typeof $> & { dump: any; };

//接收拖拽类型
const dragTypes = [
    "cc.Node",
    "cc.Scene",
];

let str: string = dragTypes.join(",");

export const template = `
<ui-drag-area class="dragNode" style="background_color: #ff0000 width = "100%" height = "100%" " droppable="${str}">
    <div class="component-container">
    </div>
</ui-drag-area>
`;

export const $ = {
    componentContainer: '.component-container',
    dragNode: ".dragNode",
    headerDragNode: ".headerDragNode"
};

export function update(this: PanelThis, dump: any) {
    updatePropByDump(this, dump);
}

export function ready(this: any) {
    let exportNode = new CustomComponentEx(this);
    exportNode.init();
}