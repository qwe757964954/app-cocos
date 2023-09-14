import { _decorator, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Vec3 } from 'cc';
import { UIOpacity } from 'cc';
import { tween } from 'cc';
import { LabelShadow } from 'cc';
import { Color } from 'cc';
import { LabelOutline } from 'cc';
import { Widget } from 'cc';

interface ScoreInfo {
    seat: number,
    score: number,
    isLimit?: boolean,
}


@ccclass('Score')
export class Score extends XComponent {
    @property(Label)
    public scoreLab: Label;
    @property(Node)
    public isLimit: Node;
    @property(Widget)
    public content: Widget;

    private m_PosY = [-580, 240, 240, 350];

    start() {
        this.node.getComponent(UIOpacity).opacity = 0;
    }

    setup(info: ScoreInfo) {
        console.log('==FlyScore==info', info);
        let y = this.m_PosY[info.seat];
        this.isLimit.active = info.isLimit;
        let uiOpacity = this.node.getComponent(UIOpacity);
        uiOpacity.opacity = 0;
        if(info.seat == 1) {
            this.content.isAlignLeft = false;
            this.content.isAlignRight = true;
            this.content.right = 20;
        } else {
            this.content.isAlignLeft = true;
            this.content.isAlignRight = false;
            this.content.left = 0;
            if (info.seat == 0) {
                let pSize = this.node.parent.getComponent(UITransform).contentSize;
                y = this.m_PosY[info.seat] - pSize.height + 1920;
            }
        }
        this.node.setPosition(new Vec3(0, y));
        tween(uiOpacity).to(0.5, {opacity: 255}).start();
        this.scoreLab.color = new Color(info.score >= 0 ? '#FFFDBD' : '#EDEDED');
        this.scoreLab.string = info.score >= 0 ? `+${info.score}` : info.score.toString();
        this.scoreLab.node.getComponent(LabelShadow).color = new Color(info.score >= 0 ? '#d0470b' : '#337cce');
        this.scoreLab.node.getComponent(LabelOutline).color = new Color(info.score >= 0 ? '#CE6734' : '#306CB3');
        tween(this.node).to(0.5, {position: new Vec3(0, y + 100)}).delay(1.5).call(()=>{
            uiOpacity.opacity = 0;
        }).start();
    }
}