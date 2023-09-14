import { Color } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

function convert_from_teksto_color(value: number) {
    let a = (value & 0xFF000000) >>> 24;
    let r = (value & 0x00FF0000) >> 16;
    let g = (value & 0x0000FF00) >> 8;
    let b = (value & 0x000000FF);

    return new Color(r, g, b, a);
}

@ccclass('Test')
export class Test extends Component {
    protected onLoad(): void {
        let color = convert_from_teksto_color(4294901760);
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


