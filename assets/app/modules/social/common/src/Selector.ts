import { EmptyClass, EventTargetExtends, uiMgr } from 'bos/exports';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum SelectorType {
    Comment = 0,
    User = 1,
    MAX = 2,
}

let pageList = [
    "social@common/res/prefab/selectors/select/SelectCommon",
    "social@common/res/prefab/selectors/select/SelectUser",
]


@ccclass('Selector')
export class Selector extends EventTargetExtends(EmptyClass) {
    private static instance: Selector = null
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new (Selector)
        }
        return this.instance
    }


    loadSelector(type: SelectorType, data: any) {
        if (type >= 0 && type < SelectorType.MAX) {
            let page = pageList[type]
            uiMgr.loadPage(page, { params: data })
        }
    }

}


