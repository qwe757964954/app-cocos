"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const package_json_1 = __importDefault(require("../../../package.json"));
const AssetPanel_1 = require("./AssetPanel");
const NodePanel_1 = require("./NodePanel");
let assetMap = new Map();
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
    template: fs_1.default.readFileSync((0, path_1.join)(__dirname, '../../../static/template/asset/index.html'), 'utf-8'),
    style: fs_1.default.readFileSync((0, path_1.join)(__dirname, '../../../static/style/asset/index.css'), 'utf-8'),
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
        initPanel(uuid, hasAsset) {
            this.updateView(hasAsset);
            let key = "Node";
            if (hasAsset) {
                key = "Asset";
            }
            let panel = assetMap.get(key);
            if (!panel) {
                if (hasAsset) {
                    let assetPanel = new AssetPanel_1.AssetPanel(this);
                    assetMap.set(key, assetPanel);
                    panel = assetPanel;
                }
                else {
                    let nodePanel = new NodePanel_1.NodePanel(this);
                    assetMap.set(key, nodePanel);
                    panel = nodePanel;
                }
            }
            panel === null || panel === void 0 ? void 0 : panel.init(uuid);
            Editor.Message.send(package_json_1.default.name, 'show-panel', winKey);
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
        updateView(hasAsset) {
            var _a, _b, _c, _d, _e, _f;
            if (hasAsset) {
                if (((_a = this.$.dragNode) === null || _a === void 0 ? void 0 : _a.nodeName) == "UI-NODE") {
                    let parentNode = this.$.dragNode.parentNode;
                    parentNode === null || parentNode === void 0 ? void 0 : parentNode.removeChild(this.$.dragNode);
                    let node = this.createAsset();
                    parentNode === null || parentNode === void 0 ? void 0 : parentNode.appendChild(node);
                    this.$.dragNode = node;
                    (_b = this.$.dragName) === null || _b === void 0 ? void 0 : _b.setAttribute("value", "Asset");
                    (_c = this.$.dragTypeName) === null || _c === void 0 ? void 0 : _c.setAttribute("value", "subAssets");
                }
            }
            else {
                if (((_d = this.$.dragNode) === null || _d === void 0 ? void 0 : _d.nodeName) == "UI-ASSET") {
                    let parentNode = this.$.dragNode.parentNode;
                    parentNode === null || parentNode === void 0 ? void 0 : parentNode.removeChild(this.$.dragNode);
                    let node = this.createNode();
                    parentNode === null || parentNode === void 0 ? void 0 : parentNode.appendChild(node);
                    this.$.dragNode = node;
                    (_e = this.$.dragName) === null || _e === void 0 ? void 0 : _e.setAttribute("value", "Node");
                    (_f = this.$.dragTypeName) === null || _f === void 0 ? void 0 : _f.setAttribute("value", "Component");
                }
            }
        }
    },
    ready() {
        setTimeout(() => {
            Editor.Message.send(package_json_1.default.name, 'hide-panel', winKey, true);
        }, 300);
    },
    beforeClose() {
        assetMap.clear();
        Editor.Message.send(package_json_1.default.name, 'delete-panel', winKey);
    },
    close() {
    }
});
