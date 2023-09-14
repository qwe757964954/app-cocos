import { _decorator, CCInteger, Component, EventTouch, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum RecognizerState {
    Possible,  // 初始
    Begin,     // 连续手势 开始
    Changed,   // 连续手势 变化
    Ended,     // 成功
    Failed,    // 失败
};

export const GesRecognizerEvent = {
    TapEvent: "TapEvent",
    LongPressEvent: "LongPressEvent",
    EdgePanEvent: "EdgePanEvent",
}


@ccclass('GestureRecognizer')
export class GestureRecognizer extends Component {
    protected state: RecognizerState = RecognizerState.Possible;

}


