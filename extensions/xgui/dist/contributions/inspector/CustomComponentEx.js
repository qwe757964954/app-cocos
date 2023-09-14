"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomComponentEx = void 0;
const Util_1 = require("../../utils/Util");
function getFileName(file) {
    return file.replace(/\.[^/.]+$/, "");
}
class CustomComponentEx {
    constructor(_element) {
        this.dragList = [];
        this.selectedUuid = null;
        this.element = _element;
    }
    findSubChildByType(node, _type) {
        let items = [];
        node.childNodes.forEach((subItem) => {
            if (subItem.localName == _type) {
                items.push(subItem);
            }
        });
        return items.length == 1 ? items[0] : null;
    }
    addDragAreaElement(self) {
        let dragItem = this.findSubChildByType(self.$this.previousElementSibling, "ui-drag-item");
        if (dragItem) {
            let area = document.createElement('ui-drag-area');
            let spanDiv = document.createElement('div');
            area.setAttribute("droppable", "cc.Node");
            area.setAttribute('class', 'headerDragNode');
            area.setAttribute('style', 'background_color: #ff0000 width = "100%" height = "100%"');
            let span = this.findSubChildByType(dragItem, "span");
            if (span) {
                dragItem.removeChild(span);
                dragItem.appendChild(area);
                area.appendChild(spanDiv);
                spanDiv.appendChild(span);
                self.$.headerDragNode = area;
            }
        }
    }
    init() {
        this.dragList = [];
        let dragNode = this.element.$.dragNode;
        this.dragList.push(dragNode);
        if (!this.element.$.headerDragNode) {
            this.addDragAreaElement(this.element);
        }
        if (this.element.$.headerDragNode) {
            this.dragList.push(this.element.$.headerDragNode);
        }
        this.initEvent();
        let nodes = Editor.Selection.getSelected("node");
        if (nodes.length == 1) {
            this.selectedUuid = nodes[0];
        }
    }
    initEvent() {
        this.dragList.forEach((item) => {
            item.addEventListener('drop', this.onDragHandler.bind(this), this);
        });
    }
    async onDragHandler(event) {
        const value = event.dataTransfer.getData('value');
        let nodeInfo = await (0, Util_1.getInfo)(value);
        let assetInfo = await (0, Util_1.getAssetInfo)(value);
        let uuid = this.element.dump.value.__scriptAsset.value.uuid;
        let cid = this.element.dump.cid;
        if (uuid) {
            let componentInfo = await (0, Util_1.getAssetInfo)(uuid);
            if (componentInfo) {
                if (nodeInfo) {
                    this.onDragNode(componentInfo, nodeInfo, cid, value);
                }
                else if (assetInfo) {
                    this.onDragAsset(componentInfo, assetInfo, cid, value);
                }
            }
        }
    }
    /**
    name: 'Node.prefab',
    uuid: '21eda923-a6a4-4900-9e1c-d8e6e884e537',
    type: 'cc.Prefab',
    */
    onDragAsset(componentInfo, assetInfo, cid, uuid) {
        let data = {
            nodeUuid: assetInfo.uuid,
            exportType: assetInfo.type,
            nodeName: getFileName(assetInfo.name),
            scriptName: componentInfo.name,
            scriptCid: cid,
            scriptUuid: componentInfo.uuid,
            exportScriptUuid: uuid,
            selectedUuid: this.selectedUuid,
            hasAsset: true
        };
        if (data.exportType != "cc.Script") {
            this.exportCom(data);
        }
    }
    onDragNode(componentInfo, nodeInfo, cid, uuid) {
        let data = {
            nodeUuid: nodeInfo.uuid.value,
            exportType: nodeInfo.__type__,
            nodeName: nodeInfo.name.value,
            scriptName: componentInfo.name,
            scriptCid: cid,
            scriptUuid: componentInfo.uuid,
            exportScriptUuid: nodeInfo.uuid.value,
            selectedUuid: this.selectedUuid,
            hasAsset: false
        };
        this.exportCom(data);
    }
    exportCom(data) {
        (0, Util_1.openPanel)(data);
    }
}
exports.CustomComponentEx = CustomComponentEx;
