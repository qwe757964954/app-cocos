import { _decorator, Component, EventTouch, Node, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('hasNestedViewGroup')
export class hasNestedViewGroup extends Component {
    onLoad() {
        let scrollView = this.node.getComponent(ScrollView);
        scrollView['_unregisterEvent']();
        const _hasNestedViewGroup = scrollView["_hasNestedViewGroup"];
        // 判断子节点内是否存在ScrollView如果存在会返回true，这样会导致增加事件派发终止，所以需要在此重载此接口并返回false
        scrollView["_hasNestedViewGroup"] = function (event: EventTouch, captureListeners?: Node[]) {
            return false;
        };
        scrollView['_registerEvent']();
    }
}