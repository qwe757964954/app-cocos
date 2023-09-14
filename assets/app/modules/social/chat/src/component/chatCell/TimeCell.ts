import { _decorator, Component, Node } from 'cc';
import { Message } from 'qsdk/im/core/Message';
import { Label } from 'cc';
import { Log, TimeUtil } from 'bos/exports';
const { ccclass, property } = _decorator;

interface YMDTime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}


@ccclass('TimeCell')
export class TimeCell extends Component {

    @property(Label)
    timeLabel: Label = null!;
    start() {

    }

    updateView(message: Message) {
        if (this.timeLabel == null) {
            return
        }
        let t: YMDTime = this.FormatUnixTime2Date(message.createdAt)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 将小时、分钟、秒、毫秒都设为0
        // 获取今天凌晨的时间戳
        const dayTime = today.getTime();
        if (message.createdAt < dayTime) {
            this.timeLabel.string = `${t.month}月${t.day}日${t.day} ${t.hour}:${t.minute}`
        } else {
            // self.msg:props({ text = string.format("%02s:%02s", t.hour, t.minute) })
            this.timeLabel.string = `${t.hour}:${t.minute}`
        }
    }

    FormatUnixTime2Date(unixTime: number): YMDTime {
        if (unixTime && unixTime >= 0) {
            let time = new Date(unixTime * 1000);
            const tb: YMDTime = {
                year: time.getFullYear(),
                month: time.getMonth() + 1,
                day: time.getDay(),
                hour: time.getHours(),
                minute: time.getMinutes(),
                second: time.getSeconds(),
            };
            return tb;
        }
    }

    testMessage(message:Message){
        Log.w("testMessage",message)
    }
}


