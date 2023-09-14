
export * from "./Camera";
export * from "./Contacts";
export * from "./DeviceInfo";
export * from "./NativeUI";
export * from "./Sensor";
export * from "./NetworkInfo";
export * from "./PowerInfo";
export * from "./Permission";
export * from "./Location";
export * from "./QRcode";
export * from "./Gallery";

import { NativeDevice } from "./NativeDevice";

/**
 * 当游戏退出时需要调用此接口释放资源.
 */
export function onGameExit(){
    NativeDevice.onGameExit();
}







