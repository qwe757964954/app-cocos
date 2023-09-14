import { _decorator, Component, Node,EventHandler, Label} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { CommonNumSelect } from '../../interfaceData/define';

@ccclass('PrizeCenterComNumSelect')
export class PrizeCenterComNumSelect extends XComponent {
    @property
    min = 1;

    @property
    max = 1;

    @property
    step = 1;

    @property
    curValue = 1;

    @property(Label)
    numLab:Label = null!;

    @property(EventHandler)
    callEvents: EventHandler[] = [];

    start() {
        this.numLab.string = this.curValue.toString();
    }

    update(deltaTime: number) {

    }    
    
    init(conf:CommonNumSelect) {
        this.min = conf.min;
        this.max = conf.max;
        this.step = conf?.step;
        this.curValue = conf?.default;
        this.numLab.string = this.curValue.toString();
    }

    checkValidNum(value:number){
        if (value > this.max){
            value = this.max;
        }
        if (value < this.min){
            value = this.min;
        }
        return value;
    }

    setCurValue(value:number) {
        this.setChangeNum(value);
    }

    setChangeNum(value:number) {
        this.curValue = this.checkValidNum(value);
        this.numLab.string = this.curValue.toString();
    }

    onClickAdd() {
        if (this.curValue >= this.max){
            return
        }
        let num = this.curValue + this.step;
        this.setChangeNum(num);
        EventHandler.emitEvents(this.callEvents,num);
    }

    onClickSub() {
        if (this.curValue <= this.min){
            return
        }
        let num = this.curValue - this.step;
        this.setChangeNum(num);
        EventHandler.emitEvents(this.callEvents,num);
    }
}