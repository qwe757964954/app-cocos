"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_yogaflex_node = exports.create_xpageview_node = exports.create_tableview_node = exports.create_xLabel_node = void 0;
async function create_node(name, components) {
    let uuids = Editor.Selection.getSelected("node");
    for (let uuid of uuids) {
        let params = {
            parent: uuid,
            name: name,
            canvasRequired: true
        };
        let nuuid = await Editor.Message.request("scene", "create-node", params);
        for (let com of components) {
            await Editor.Message.request("scene", 'create-component', {
                uuid: nuuid,
                component: com
            });
        }
    }
}
async function create_xLabel_node() {
    await create_node("XLabel", ["XLabel"]);
}
exports.create_xLabel_node = create_xLabel_node;
async function create_tableview_node() {
    await create_node("TableView", ["TableView"]);
}
exports.create_tableview_node = create_tableview_node;
async function create_xpageview_node() {
    await create_node("XPageView", ["XPageView"]);
}
exports.create_xpageview_node = create_xpageview_node;
async function create_yogaflex_node() {
    await create_node("YogaFlex", ["YogaFlex"]);
}
exports.create_yogaflex_node = create_yogaflex_node;
