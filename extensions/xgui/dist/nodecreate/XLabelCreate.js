"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_xLabel_node = void 0;
async function create_xLabel_node() {
    let uuids = Editor.Selection.getSelected("node");
    for (let uuid of uuids) {
        let params = {
            parent: uuid,
            name: 'XLabel',
            canvasRequired: true,
            dump: {
                layer: 1 << 25,
            }
        };
        console.log("create param", params);
        let nuuid = await Editor.Message.request("scene", "create-node", params);
        Editor.Message.request("scene", 'create-component', {
            uuid: nuuid,
            component: 'XLabel'
        });
        console.log("result node", nuuid);
    }
}
exports.create_xLabel_node = create_xLabel_node;
