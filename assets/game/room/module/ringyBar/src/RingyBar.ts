import { _decorator, Color, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';

interface SecondInfo {
    color: string, 
    time: number
}

@ccclass('RingyBar')
export class RingyBar extends XComponent {

    @property(Sprite)
    public fillSprite: Sprite | null;

    startTime: number;
    countTime: number = 0;
    secondInfo: SecondInfo;
    
    start() {

    }

    //hexColor：进度条颜色   secondInfo：可选，倒计时到达某一限值后，变换颜色
    setColor(hexColor: string, secondInfo?: SecondInfo) {
        this.fillSprite.color = new Color(hexColor);
        if (secondInfo) {
            this.secondInfo = secondInfo;
        }
    }

    //设置倒计时起始值
    setStartTime(time: number) {
        this.startTime = time;
        this.countTime = time;
        this.fillSprite.fillRange = 1;
    }

    //结束环形进度条
    setEnd(){
        this.fillSprite.fillRange = 0;
        this.startTime = 0;
        this.countTime = 0;
    }

    update(deltaTime: number) {
        if (this.countTime == 0 || this.fillSprite.fillRange == 0) {
            return;
        }
        this.countTime = this.countTime - deltaTime;
        if (this.secondInfo && this.countTime <= this.secondInfo.time) {
            this.fillSprite.color = new Color(this.secondInfo.color);
        }
        let leftRange = this.countTime / this.startTime;
        if (leftRange >= 0) {
            this.fillSprite.fillRange = leftRange;
        } else {
            this.fillSprite.fillRange = 0;
            this.countTime = 0;
        }
    }
}