import { NativeDevice } from "./NativeDevice";

export class NetWorkInfo {
    
    /**
     * 手机移动网络
     */
    static TYPE_MOBILE: number = 0;

    /**
     * wifi网络
     */
    static TYPE_WIFI: number = 1;
    
    /**
     * 以太网
     */
    static TYPE_ETHERNET: number = 2;

    /**
     * 未知网络
     */
    static TYPE_UNK: number = 3;

     /**
     * 2G
     */
     static TYPE_2G: number = 10;

    /**
     * 3G
     */
    static TYPE_3G: number = 11;

    /**
     * 4G
     */
     static TYPE_4G: number = 12;

    /**
     * 5G
     */
    static TYPE_5G: number = 13;
    
    /**
     * 获取网络类型
     * @returns number类型,取值为以下其一:
     * 
     * NetWorkInfo.TYPE_MOBILE //手机移动网络
     * 
     * NetWorkInfo.TYPE_WIFI //wifi网络
     * 
     * NetWorkInfo.TYPE_ETHERNET //以太网
     * 
     * NetWorkInfo.TYPE_UNK //未知网络
     */
    static getNetworkType(): number{
        return NativeDevice.getNetworkType();
    }
    
    /**
     * 获取网络类型名称
     * @returns string,可能的值为"2G","3G","4G","5G","unknown".
     */
    static getNetworkTypeName(): string{
        return NativeDevice.getNetworkTypeName();
    }
    
    /**
     * 网络是否连接
     * @returns boolean,true有网络连接,false没有网络连接.
     */
    static isNetworkConnected(): boolean{
        return NativeDevice.isNetworkConnected();
    }
    
    /**
     * 获取子网类型
    * @returns number类型,取值为以下其一:
     * 
     * NetWorkInfo.TYPE_MOBILE //手机移动网络
     * 
     * NetWorkInfo.TYPE_WIFI //wifi网络
     * 
     * NetWorkInfo.TYPE_ETHERNET //以太网
     * 
     * NetWorkInfo.TYPE_UNK //未知网络
     * 
     * NetWorkInfo.TYPE_2G //2G网络
     * 
     * NetWorkInfo.TYPE_3G //3G网络
     * 
     * NetWorkInfo.TYPE_4G //4G网络
     * 
     * NetWorkInfo.TYPE_5G //5G网络
     */
    static getNetworkSubType(): number{
        return NativeDevice.getNetworkSubType();
    }
    
    /**
     * 获取无线网络标识符
     * @returns string,如果获取不到则为空字符串"".
     */
    static getSSID(): string{
        return NativeDevice.getSSID();
    }
    
    /**
     * 获取运营商名称
     * @returns string,如:"中国移动",当前注册运营商的字母名称,仅当用户注册到网络时才可以使用,如果当前网络在CDMA上得到的结果可能不可靠.
     */
    static getMNO(): string{
        return NativeDevice.getMNO();
    }
    
    /**
     * 获取网络信号强度
     * @param listener (result :number) => void类型,监听器.
     * 
     * 回调:result,int类型,信号强度取值0到5,值越大信号越强,0表示没有信号.
     * ios由于对api的限制暂时只返回0.
     */
    static getNetWorkSignalStrength(listener :(result :number) => void){
        NativeDevice.getNetWorkSignalStrength(listener);
    }
    
    /**
     * 监听网络连接变化
     * @param enable boolean,true开启网络连接监听,false关闭网络连接监听.
     * @param listener (isConnected :boolean,type :number) => void类型
     * 
     * 回调:
     * 
     * isConnected,boolean类型,true:网络已连接,false:网络未连接.
     * 
     * type,number类型,取值为以下其一:
     * 
     * NetWorkInfo.TYPE_MOBILE //手机移动网络
     * 
     * NetWorkInfo.TYPE_WIFI //wifi网络
     * 
     * NetWorkInfo.TYPE_ETHERNET //以太网
     * 
     * NetWorkInfo.TYPE_UNK //未知网络
     * 
     * NetWorkInfo.TYPE_2G //2G网络
     * 
     * NetWorkInfo.TYPE_3G //3G网络
     * 
     * NetWorkInfo.TYPE_4G //4G网络
     * 
     * NetWorkInfo.TYPE_5G //5G网络
     */
    static setNetworkConnectivityEvent(enable :boolean,listener :(isConnected :boolean,type :number) => void){
        NativeDevice.setNetworkConnectivityEvent(enable,listener);
    }
  
}


