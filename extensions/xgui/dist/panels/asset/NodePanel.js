"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodePanel = void 0;
const Util_1 = require("../../utils/Util");
const package_json_1 = __importDefault(require("../../../package.json"));
class NodePanel {
    constructor(_element) {
        this.comMap = new Map();
        this.winKey = "asset";
        this.okHandler = this.ok.bind(this);
        this.noHandler = this.no.bind(this);
        this.onChangeHandler = this.onChange.bind(this);
        this.element = _element;
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
    async init(uuid) {
        var _a, _b;
        this.removeEvent();
        let info = await (0, Util_1.getInfo)(uuid);
        if (info) {
            this.initComponent(info);
            (_a = this.element.$.ipt) === null || _a === void 0 ? void 0 : _a.setAttribute("value", info.name.value);
            (_b = this.element.$.dragNode) === null || _b === void 0 ? void 0 : _b.setAttribute("value", uuid);
        }
        this.addEvent();
    }
    initComponent(info) {
        var _a, _b, _c;
        this.removeAllChild();
        let option = this.createOption(info.__type__);
        (_a = this.element.$.selectList) === null || _a === void 0 ? void 0 : _a.appendChild(option);
        (_b = info.__comps__) === null || _b === void 0 ? void 0 : _b.forEach((component) => {
            var _a;
            let option = this.createOption(component.type);
            (_a = this.element.$.selectList) === null || _a === void 0 ? void 0 : _a.appendChild(option);
            this.comMap.set(component.type, component);
        });
        (_c = this.element.$.selectList) === null || _c === void 0 ? void 0 : _c.setAttribute("value", info.__type__);
    }
    removeEvent() {
        var _a, _b, _c;
        (_a = this.element.$.btnOk) === null || _a === void 0 ? void 0 : _a.removeEventListener('confirm', this.okHandler);
        (_b = this.element.$.btnNo) === null || _b === void 0 ? void 0 : _b.removeEventListener('confirm', this.noHandler);
        (_c = this.element.$.ipt) === null || _c === void 0 ? void 0 : _c.removeEventListener("confirm", this.onChangeHandler);
    }
    addEvent() {
        var _a, _b, _c;
        (_a = this.element.$.btnOk) === null || _a === void 0 ? void 0 : _a.addEventListener('confirm', this.okHandler);
        (_b = this.element.$.btnNo) === null || _b === void 0 ? void 0 : _b.addEventListener('confirm', this.noHandler);
        (_c = this.element.$.ipt) === null || _c === void 0 ? void 0 : _c.addEventListener("confirm", this.onChangeHandler);
    }
    // 检测属性的有效性
    checkName(name) {
        const [ret, errMsg] = (0, Util_1.checkPropsNameValidity)(name);
        return ret;
    }
    async ok() {
        var _a, _b, _c, _d, _e;
        let name = (_a = this.element.$.ipt) === null || _a === void 0 ? void 0 : _a.getAttribute("value");
        let ret = this.checkName(name);
        this.updateErrorTips(ret);
        if (ret) {
            let value = (_b = this.element.$.selectList) === null || _b === void 0 ? void 0 : _b.getAttribute("value");
            let component = this.comMap.get(value);
            let spriteUuid = (_e = (_d = (_c = component === null || component === void 0 ? void 0 : component.value) === null || _c === void 0 ? void 0 : _c.__scriptAsset) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.uuid;
            (0, Util_1.sendNodeType)(value, name, spriteUuid);
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
exports.NodePanel = NodePanel;
