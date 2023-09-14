import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { UpdateView } from './UpdateView';

@ccclass('UpdateViewBridge')
export class UpdateViewBridge extends Component {

    @property(UpdateView)
    list: UpdateView[] = []


    updateView(data: any) {
        this.list.forEach((item) => {
            item.updateView(data)
        })
    }
}