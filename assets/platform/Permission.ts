import { NativeDevice } from "./NativeDevice";

export class Permission {
    
    /**
     * 相机访问权限
     */
    static TYPE_CAMERA: number = 1;

    /**
     * 相册访问权限
     */
    static TYPE_PHOTO_LIBRARY: number = 2;

    /**
     * 联系人访问权限
     */
    static TYPE_CONTACTS: number = 3;
    
    /**
     * 读取手机状态权限
     */
    static TYPE_PHONE_STATE: number = 4;

    /**
     * 麦克风录音权限
     */
    static TYPE_AUDIO_RECORD: number = 5;

    /**
     * 位置访问权限
     */
    static TYPE_GEO_LOCATION: number = 6;

    /**
     * 文件读写权限
     */
    static TYPE_EXTERNAL_STORAGE: number = 7;

    /**
     * 日历读写权限
     */
    static TYPE_CALENDAR: number = 8;

    /**
     * 有权限
     */
    static STATUS_GRANTED: number = 1;

    /**
     * 没有权限
     */
	static STATUS_DENIED: number = 2;
    
    /**
     * 获取权限状态
     * @param type number,取以下值之一:
     * 
     * Permission.TYPE_CAMERA 相机权限
     * 
     * Permission.TYPE_PHOTO_LIBRARY 相册权限
     * 
     * Permission.TYPE_CONTACTS 联系人权限
     * 
     * Permission.TYPE_PHONE_STATE 读取手机状态权限
     * 
     * Permission.TYPE_AUDIO_RECORD 麦克风录音权限
     * 
     * Permission.TYPE_GEO_LOCATION 位置访问权限
     * 
     * Permission.TYPE_EXTERNAL_STORAGE 文件读写权限
     * 
     * Permission.TYPE_CALENDAR 日历读写权限
     * 
     * @returns boolean,true有权限,false没有权限.
     */
    static getStatus(type :number): boolean{
        return NativeDevice.getStatus(type);
    }
    
    /**
     * 申请权限
     * @param type number,取以下值之一:
     * 
     * Permission.TYPE_CAMERA 相机权限
     * 
     * Permission.TYPE_PHOTO_LIBRARY 相册权限
     * 
     * Permission.TYPE_CONTACTS 联系人权限
     * 
     * Permission.TYPE_PHONE_STATE 读取手机状态权限
     * 
     * Permission.TYPE_AUDIO_RECORD 麦克风录音权限
     * 
     * Permission.TYPE_GEO_LOCATION 位置访问权限
     * 
     * Permission.TYPE_EXTERNAL_STORAGE 文件读写权限
     * 
     * Permission.TYPE_CALENDAR 日历读写权限
     * 
     * @param listener (granted :boolean) => void类型.
     * 
     * 回调:granted,boolean类型,true拥有此权限,false没有此权限.
     */
    static request(type :number,listener :(granted :boolean) => void): void{
        NativeDevice.request(type,listener);
    }
    
    /**
     * 
     * @param type number,取以下值之一:
     * 
     * Permission.TYPE_CAMERA 相机权限
     * 
     * Permission.TYPE_PHOTO_LIBRARY 相册权限
     * 
     * Permission.TYPE_CONTACTS 联系人权限
     * 
     * Permission.TYPE_PHONE_STATE 读取手机状态权限
     * 
     * Permission.TYPE_AUDIO_RECORD 麦克风录音权限
     * 
     * Permission.TYPE_GEO_LOCATION 位置访问权限
     * 
     * Permission.TYPE_EXTERNAL_STORAGE 文件读写权限
     * 
     * Permission.TYPE_CALENDAR 日历读写权限
     * @param reason string,真正申请权限之前弹出的询问dialog中的message.
     * @param ok string,真正申请权限之前弹出的询问dialog中的PositiveButton文字内容.
     * @param cancel string,真正申请权限之前弹出的询问dialog中的NegativeButton文字内容.
     * @param listener (granted :boolean) => void类型.
     * 
     * 回调:granted,boolean类型,true拥有此权限,false没有此权限.
     */
    static requestReason(type :number,reason :string,ok :string,cancel :string,listener :(granted :boolean) => void): void{
        NativeDevice.requestReason(type,reason,ok,cancel,listener);
    }
}


