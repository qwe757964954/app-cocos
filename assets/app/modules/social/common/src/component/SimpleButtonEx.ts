import { Label } from 'cc';
import { Sprite } from 'cc';
import { color } from 'cc';
import { Button } from 'cc';
import { Color } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SimpleButtonEx')
export class SimpleButtonEx extends Component {
    @property(Color)
    buttonNormalColor = new Color("#316ED0")

    @property(Color)
    buttonDisableColor = new Color("#DDDDDD")

    @property(Color)
    labelNormalColor = new Color("#FFFFFF")

    @property(Color)
    labelDisableColor = new Color("#9e9e9e")

    @property(Label)
    label;

    private __enabled: boolean;
    public getEnabled(): boolean {
        return this.__enabled;
    }
    public setEnabled(value: boolean) {
        this.__enabled = value;
        this.refresh()
    }

    start() {
        this.refresh()
    }

    refresh() {
        let sprite = this.getComponent(Sprite)
        if (!this.label) {
            this.label = this.node.getChildByName("Label")?.getComponent(Label)
        }
        let label = this.label

        sprite.color = this.getEnabled() ? this.buttonNormalColor : this.buttonDisableColor
        label.color = this.getEnabled() ? this.labelNormalColor : this.labelDisableColor
    }

}


