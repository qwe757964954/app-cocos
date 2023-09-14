import { NativeDevice } from "./NativeDevice";

export class Sensor{
    
    /**
     * 设备是否有移步传感器
     * @returns boolean,true有,false没有.
     */
    static hasStepCounter(): boolean{
        return NativeDevice.hasStepCounter();
    }
    
    /**
     * 移步监听
     * @param enable boolean,true开启步数监听,false关闭步数监听.
     * @param listener (result :number) => void类型.
     * 回调:result,number从开启监听开始移动的步数.
     */
    static setStepCounterEvent(enable,listener :(result: number) => void): void{
        NativeDevice.setStepCounterEvent(enable,listener);
    }
    
    /**
     * 短暂震动
     * @param time number,单位毫秒,震动的时间.
     */
    static vibrate(time :number): void{
        NativeDevice.vibrate(time);
    }
    
    /**
     * 短暂蜂鸣
     */
    static beep(): void{
        NativeDevice.beep();
    }
}


