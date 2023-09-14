import { ExportComData, getAssetInfo, getInfo, openPanel } from "../../utils/Util";

function getFileName(file: string) {
    return file.replace(/\.[^/.]+$/, "");
}

export class CustomComponentEx {
    private element: any;
    private dragList: any[] = [];
    private selectedUuid: string = null!;
    constructor(_element: any) {
        this.element = _element;
    }
    findSubChildByType(node: any, _type: string) {
        let items: any[] = [];
        node.childNodes.forEach((subItem: any) => {
            if (subItem.localName == _type) {
                items.push(subItem);
            }
        });
        return items.length == 1 ? items[0] : null;
    }
    addDragAreaElement(self: any) {
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

    public init(): void {
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

    private initEvent() {
        this.dragList.forEach((item: any) => {
            item.addEventListener('drop', this.onDragHandler.bind(this), this);
        });
    }

    private async onDragHandler(event: any) {
        const value = event.dataTransfer.getData('value');
        let nodeInfo = await getInfo(value);
        let assetInfo = await getAssetInfo(value);
        let uuid = this.element.dump.value.__scriptAsset.value.uuid;
        let cid = this.element.dump.cid;
        if (uuid) {
            let componentInfo = await getAssetInfo(uuid);
            if (componentInfo) {
                if (nodeInfo) {
                    this.onDragNode(componentInfo, nodeInfo, cid, value);
                } else if (assetInfo) {
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
    private onDragAsset(componentInfo: any, assetInfo: any, cid: string, uuid: string) {
        let data: ExportComData = {
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

    private onDragNode(componentInfo: any, nodeInfo: any, cid: string, uuid: string) {
        let data: ExportComData = {
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

    private exportCom(data: ExportComData) {
        openPanel(data);
    }
}