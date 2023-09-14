import fs from 'fs';
import { join } from 'path';
import packageJSON from "../../../package.json";
import { AssetPanel } from './AssetPanel';
import { NodePanel } from './NodePanel';
let assetMap: Map<string, AssetPanel | NodePanel> = new Map();
let winKey = "asset";
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: fs.readFileSync(join(__dirname, '../../../static/template/asset/index.html'), 'utf-8'),
    style: fs.readFileSync(join(__dirname, '../../../static/style/asset/index.css'), 'utf-8'),
    $: {
        app: '#app',
        dragNode: "#dragNode",
        btnOk: "#btnOk",
        btnNo: "#btnNo",
        ipt: "#ipt",
        errTips: "#errTips",
        selectList: "#selectList",
        dragName: "#dragName",
        dragTypeName: "#dragTypeName"
    },
    methods: {
        initPanel(uuid: string, hasAsset: boolean): void {
            this.updateView(hasAsset);
            let key = "Node";
            if (hasAsset) {
                key = "Asset";
            }
            let panel = assetMap.get(key);
            if (!panel) {
                if (hasAsset) {
                    let assetPanel = new AssetPanel(this);
                    assetMap.set(key, assetPanel);
                    panel = assetPanel;
                } else {
                    let nodePanel = new NodePanel(this);
                    assetMap.set(key, nodePanel);
                    panel = nodePanel;
                }
            }
            panel?.init(uuid);
            Editor.Message.send(packageJSON.name, 'show-panel', winKey);
        },
        createNode() {
            let node = document.createElement("ui-node");
            node.setAttribute("droppable", "cc.Node");
            node.setAttribute("placeholder", "cc.Node");
            node.setAttribute("id", "dragNode");
            node.setAttribute("disabled", "true");
            return node;
        },
        createAsset() {
            let node = document.createElement("ui-asset");
            node.setAttribute("droppable", "cc.ImageAsset");
            node.setAttribute("id", "dragNode");
            node.setAttribute("disabled", "true");
            return node;
        },
        updateView(hasAsset: Boolean) {
            if (hasAsset) {
                if (this.$.dragNode?.nodeName == "UI-NODE") {
                    let parentNode = this.$.dragNode.parentNode;
                    parentNode?.removeChild(this.$.dragNode);
                    let node = this.createAsset();
                    parentNode?.appendChild(node);
                    this.$.dragNode = node;
                    this.$.dragName?.setAttribute("value", "Asset");
                    this.$.dragTypeName?.setAttribute("value", "subAssets");
                }
            } else {
                if (this.$.dragNode?.nodeName == "UI-ASSET") {
                    let parentNode = this.$.dragNode.parentNode;
                    parentNode?.removeChild(this.$.dragNode);
                    let node = this.createNode();
                    parentNode?.appendChild(node);
                    this.$.dragNode = node;
                    this.$.dragName?.setAttribute("value", "Node");
                    this.$.dragTypeName?.setAttribute("value", "Component");
                }
            }
        }
    },
    ready() {
        setTimeout(() => {
            Editor.Message.send(packageJSON.name, 'hide-panel', winKey, true);
        }, 300);
    },
    beforeClose() {
        assetMap.clear();
        Editor.Message.send(packageJSON.name, 'delete-panel', winKey);
    },
    close() {

    }
});
