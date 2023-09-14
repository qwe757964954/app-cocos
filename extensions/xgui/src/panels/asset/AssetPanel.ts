import { checkPropsNameValidity, getAssetInfo, getFileName, sendNodeType } from '../../utils/Util';
import packageJSON from "../../../package.json";

export class AssetPanel {
    private element: any;
    private assetMap: Map<string, any> = new Map();
    private winKey: string = "asset";

    private okHandler: Function = this.ok.bind(this);
    private noHandler: Function = this.no.bind(this);
    private onChangeHandler: Function = this.onChange.bind(this);
    private onSelectHandler: Function = this.onSelect.bind(this);
    constructor(_element: any) {
        this.element = _element;
    }
    async init(uuid: string) {
        this.removeEvent();
        let info = await getAssetInfo(uuid);
        if (info) {
            this.element.$.ipt?.setAttribute("value", getFileName(info.name));
            this.element.$.dragNode?.setAttribute("droppable", info.type);
            this.element.$.dragNode?.setAttribute("value", uuid);
            this.initSubAssets(info);
        }
        this.addEvent();
    }
    removeAllChild() {
        var childNodes = this.element.$.selectList?.childNodes;
        if (childNodes) {
            for (var i = childNodes.length - 1; i >= 0; i--) {
                this.element.$.selectList?.removeChild(childNodes[i]);
            }
        }
    }
    createOption(value: string) {
        let option = document.createElement("option");
        option.setAttribute("value", value);
        option.innerText = value;
        return option;
    }
    initSubAssets(info: any) {
        this.assetMap.clear();
        this.removeAllChild();
        let option = this.createOption(info.type);
        this.element.$.selectList?.appendChild(option);
        this.assetMap.set(info.type, getFileName(info.name));
        for (let key in info.subAssets!) {
            let sub = info.subAssets[key];
            let option = this.createOption(sub.type);
            this.element.$.selectList?.appendChild(option);
            this.assetMap.set(sub.type, getFileName(sub.name));
        }
        this.element.$.selectList?.setAttribute("value", info.type);
    }
    removeEvent() {
        this.element.$.btnOk?.removeEventListener('confirm', this.okHandler);
        this.element.$.btnNo?.removeEventListener('confirm', this.noHandler);
        this.element.$.ipt?.removeEventListener("confirm", this.onChangeHandler);
        this.element.$.selectList?.removeEventListener("confirm", this.onSelectHandler);
    }
    addEvent() {
        this.element.$.btnOk?.addEventListener('confirm', this.okHandler);
        this.element.$.btnNo?.addEventListener('confirm', this.noHandler);
        this.element.$.ipt?.addEventListener("confirm", this.onChangeHandler);
        this.element.$.selectList?.addEventListener("confirm", this.onSelectHandler);
    }
    onSelect() {
        let value = this.element.$.selectList?.getAttribute("value");
        let name = this.assetMap.get(value!);
        this.element.$.ipt?.setAttribute("value", name!);
    }
    // 检测属性的有效性
    checkName(name: string) {
        const [ret, errMsg] = checkPropsNameValidity(name);
        return ret;
    }
    ok() {
        let name = this.element.$.ipt?.getAttribute("value");
        let ret = this.checkName(name!);
        this.updateErrorTips(ret);
        if (ret) {
            let assetType = this.element.$.selectList?.getAttribute("value");
            sendNodeType(assetType!, name!, undefined);
            this.no();
        }
    }
    no() {
        this.removeEvent();
        Editor.Message.send(packageJSON.name, 'hide-panel', this.winKey);
    }
    updateErrorTips(ret: boolean) {
        if (ret) {
            this.element.$.errTips!.setAttribute("style", "display:none");
        } else {
            this.element.$.errTips!.setAttribute("style", "display:block");
        }
    }
    onChange() {
        let name = this.element.$.ipt?.getAttribute("value");
        let ret = this.checkName(name!);
        this.updateErrorTips(ret);
    }
}