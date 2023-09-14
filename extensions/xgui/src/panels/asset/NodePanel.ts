import { checkPropsNameValidity, getInfo, getFileName, sendNodeType } from '../../utils/Util';
import packageJSON from "../../../package.json";

export class NodePanel {
    private element: any;
    private comMap: Map<string, any> = new Map();
    private winKey: string = "asset";

    private okHandler: Function = this.ok.bind(this);
    private noHandler: Function = this.no.bind(this);
    private onChangeHandler: Function = this.onChange.bind(this);
    constructor(_element: any) {
        this.element = _element;
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
    async init(uuid: string) {
        this.removeEvent();
        let info = await getInfo(uuid);
        if (info) {
            this.initComponent(info);
            this.element.$.ipt?.setAttribute("value", info.name.value);
            this.element.$.dragNode?.setAttribute("value", uuid);
        }
        this.addEvent();
    }
    initComponent(info: any): void {
        this.removeAllChild();
        let option = this.createOption(info.__type__);
        this.element.$.selectList?.appendChild(option);
        info.__comps__?.forEach((component: any) => {
            let option = this.createOption(component.type);
            this.element.$.selectList?.appendChild(option);
            this.comMap.set(component.type, component);
        });
        this.element.$.selectList?.setAttribute("value", info.__type__);
    }
    removeEvent() {
        this.element.$.btnOk?.removeEventListener('confirm', this.okHandler);
        this.element.$.btnNo?.removeEventListener('confirm', this.noHandler);
        this.element.$.ipt?.removeEventListener("confirm", this.onChangeHandler);
    }
    addEvent() {
        this.element.$.btnOk?.addEventListener('confirm', this.okHandler);
        this.element.$.btnNo?.addEventListener('confirm', this.noHandler);
        this.element.$.ipt?.addEventListener("confirm", this.onChangeHandler);
    }
    // 检测属性的有效性
    checkName(name: string) {
        const [ret, errMsg] = checkPropsNameValidity(name);
        return ret;
    }
    async ok() {
        let name = this.element.$.ipt?.getAttribute("value");
        let ret = this.checkName(name!);
        this.updateErrorTips(ret);
        if (ret) {
            let value = this.element.$.selectList?.getAttribute("value");
            let component = this.comMap.get(value!);
            let spriteUuid = component?.value?.__scriptAsset?.value?.uuid;
            sendNodeType(value!, name!, spriteUuid!);
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