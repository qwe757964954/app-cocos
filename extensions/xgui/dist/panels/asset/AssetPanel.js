"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetPanel = void 0;
const Util_1 = require("../../utils/Util");
const package_json_1 = __importDefault(require("../../../package.json"));
class AssetPanel {
    constructor(_element) {
        this.assetMap = new Map();
        this.winKey = "asset";
        this.okHandler = this.ok.bind(this);
        this.noHandler = this.no.bind(this);
        this.onChangeHandler = this.onChange.bind(this);
        this.onSelectHandler = this.onSelect.bind(this);
        this.element = _element;
    }
    async init(uuid) {
        var _a, _b, _c;
        this.removeEvent();
        let info = await (0, Util_1.getAssetInfo)(uuid);
        if (info) {
            (_a = this.element.$.ipt) === null || _a === void 0 ? void 0 : _a.setAttribute("value", (0, Util_1.getFileName)(info.name));
            (_b = this.element.$.dragNode) === null || _b === void 0 ? void 0 : _b.setAttribute("droppable", info.type);
            (_c = this.element.$.dragNode) === null || _c === void 0 ? void 0 : _c.setAttribute("value", uuid);
            this.initSubAssets(info);
        }
        this.addEvent();
    }
    removeAllChild() {
        var _a, _b;
        var childNodes = (_a = this.element.$.selectList) === null || _a === void 0 ? void 0 : _a.childNodes;
        if (childNodes) {
            for (var i = childNodes.length - 1; i >= 0; i--) {
                (_b = this.element.$.selectList) === null || _b === void 0 ? void 0 : _b.removeChild(childNodes[i]);
            }
        }
    }
    createOption(value) {
        let option = document.createElement("option");
        option.setAttribute("value", value);
        option.innerText = value;
        return option;
    }
    initSubAssets(info) {
        var _a, _b, _c;
        this.assetMap.clear();
        this.removeAllChild();
        let option = this.createOption(info.type);
        (_a = this.element.$.selectList) === null || _a === void 0 ? void 0 : _a.appendChild(option);
        this.assetMap.set(info.type, (0, Util_1.getFileName)(info.name));
        for (let key in info.subAssets) {
            let sub = info.subAssets[key];
            let option = this.createOption(sub.type);
            (_b = this.element.$.selectList) === null || _b === void 0 ? void 0 : _b.appendChild(option);
            this.assetMap.set(sub.type, (0, Util_1.getFileName)(sub.name));
        }
        (_c = this.element.$.selectList) === null || _c === void 0 ? void 0 : _c.setAttribute("value", info.type);
    }
    removeEvent() {
        var _a, _b, _c, _d;
        (_a = this.element.$.btnOk) === null || _a === void 0 ? void 0 : _a.removeEventListener('confirm', this.okHandler);
        (_b = this.element.$.btnNo) === null || _b === void 0 ? void 0 : _b.removeEventListener('confirm', this.noHandler);
        (_c = this.element.$.ipt) === null || _c === void 0 ? void 0 : _c.removeEventListener("confirm", this.onChangeHandler);
        (_d = this.element.$.selectList) === null || _d === void 0 ? void 0 : _d.removeEventListener("confirm", this.onSelectHandler);
    }
    addEvent() {
        var _a, _b, _c, _d;
        (_a = this.element.$.btnOk) === null || _a === void 0 ? void 0 : _a.addEventListener('confirm', this.okHandler);
        (_b = this.element.$.btnNo) === null || _b === void 0 ? void 0 : _b.addEventListener('confirm', this.noHandler);
        (_c = this.element.$.ipt) === null || _c === void 0 ? void 0 : _c.addEventListener("confirm", this.onChangeHandler);
        (_d = this.element.$.selectList) === null || _d === void 0 ? void 0 : _d.addEventListener("confirm", this.onSelectHandler);
    }
    onSelect() {
        var _a, _b;
        let value = (_a = this.element.$.selectList) === null || _a === void 0 ? void 0 : _a.getAttribute("value");
        let name = this.assetMap.get(value);
        (_b = this.element.$.ipt) === null || _b === void 0 ? void 0 : _b.setAttribute("value", name);
    }
    // 检测属性的有效性
    checkName(name) {
        const [ret, errMsg] = (0, Util_1.checkPropsNameValidity)(name);
        return ret;
    }
    ok() {
        var _a, _b;
        let name = (_a = this.element.$.ipt) === null || _a === void 0 ? void 0 : _a.getAttribute("value");
        let ret = this.checkName(name);
        this.updateErrorTips(ret);
        if (ret) {
            let assetType = (_b = this.element.$.selectList) === null || _b === void 0 ? void 0 : _b.getAttribute("value");
            (0, Util_1.sendNodeType)(assetType, name, undefined);
            this.no();
        }
    }
    no() {
        this.removeEvent();
        Editor.Message.send(package_json_1.default.name, 'hide-panel', this.winKey);
    }
    updateErrorTips(ret) {
        if (ret) {
            this.element.$.errTips.setAttribute("style", "display:none");
        }
        else {
            this.element.$.errTips.setAttribute("style", "display:block");
        }
    }
    onChange() {
        var _a;
        let name = (_a = this.element.$.ipt) === null || _a === void 0 ? void 0 : _a.getAttribute("value");
        let ret = this.checkName(name);
        this.updateErrorTips(ret);
    }
}
exports.AssetPanel = AssetPanel;
