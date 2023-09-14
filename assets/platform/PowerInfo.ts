import { NativeDevice } from "./NativeDevice";

export class PowerInfo {

    /**
     * 获取设备电量值
     * @returns number类型
     */
    static getBatteryValue(): number{
        return NativeDevice.getBatteryValue();
    }
    
    /**
     * 获取设备电池温度
     * @returns string类型
     */
    static getBatteryTemperature(): string{
        return NativeDevice.getBatteryTemperature();
    }
    
    /**
     * 设备是否在充电
     * @returns boolean,true正在充电,false不在充电.
     */
    static isCharging(): boolean{
        return NativeDevice.isCharging();
    }
    
    /**
     * 设备是否连接电源
     * @returns boolean,true连接了电源,没有连接电源.
     */
    static isPlug(): boolean{
        return NativeDevice.isPlug();
    }
    
    /**
     * 设备充电监听
     * @param enable boolean类型,true开启充电监听,false关闭充电监听.
     * @param listener (isCharging :boolean) => void类型
     * 
     * 回调:
     * 
     * isCharging,boolean类型,true正在充电,false不在充电.
     */
    static setChargingEvent(enable :boolean,listener :(isCharging :boolean) => void){
        NativeDevice.setChargingEvent(enable,listener);
    }
    
    /**
     * 设备低电量监听
     * @param enable boolean类型,true开启低电量事件监听,false关闭低电量事件监听.
     * @param listener (lowPower :boolean) => void类型
     * 
     * 回调:
     * 
     * lowPower,boolean类型,true为低电量,false为不是低电量.
     */
    static setLowPowerEvent(enable: boolean,listener: (lowPower: boolean) => void){
        NativeDevice.setLowPowerEvent(enable,listener);
    }
    
    /**
     * 设备电量变化监听
     * @param enable boolean类型,true开启电量变化监听,false关闭电量变化监听.
     * @param listener (value :number) => void类型
     * 
     * 回调: value,number类型,当前电池电量.
     */
    static setBatteryValueChangedEvent(enable :boolean,listener :(value :number) => void): void{
        NativeDevice.setBatteryValueChangedEvent(enable,listener);
    }
}


