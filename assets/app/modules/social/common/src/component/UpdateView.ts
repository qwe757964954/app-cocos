import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UpdateView')
export class UpdateView extends Component {

    private data: any = null;

    updateView(data: any) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}