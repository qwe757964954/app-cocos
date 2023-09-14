import { Sprite } from 'cc';
import { color } from 'cc';
import { Label } from 'cc';
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestPageItem')
export class TestPageItem extends Component {
    @property(Label)
    public lbl_name: Label = null!;

    @property(Sprite)
    public sprite: Sprite = null!;

    set name(value: string) {
        this.lbl_name.string = value
    }

    start() {
        this.sprite.color = color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 200);
    }
}


