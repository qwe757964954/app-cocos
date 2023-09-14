'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.update = exports.$ = exports.template = void 0;
const CustomComponentEx_1 = require("./CustomComponentEx");
const prop_1 = require("./prop");
//接收拖拽类型
const dragTypes = [
    "cc.Node",
    "cc.Scene",
];
let str = dragTypes.join(",");
exports.template = `
<ui-drag-area class="dragNode" style="background_color: #ff0000 width = "100%" height = "100%" " droppable="${str}">
    <div class="component-container">
    </div>
</ui-drag-area>
`;
exports.$ = {
    componentContainer: '.component-container',
    dragNode: ".dragNode",
    headerDragNode: ".headerDragNode"
};
function update(dump) {
    (0, prop_1.updatePropByDump)(this, dump);
}
exports.update = update;
function ready() {
    let exportNode = new CustomComponentEx_1.CustomComponentEx(this);
    exportNode.init();
}
exports.ready = ready;
