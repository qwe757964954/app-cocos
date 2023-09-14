import { NativeDevice } from "./NativeDevice";

export class Location {
   
    /**
     * 定位精度100米以内
     */
    static ACCURACY_FOR_NAVIGATION: number = 0;

    /**
     * 定位精度100米以内
     */
	static ACCURACY_BEST: number = 1;

    /**
     * 定位精度100米以内
     */    
	static ACCURACY_TEN_METERS: number = 2;

    /**
     * 定位精度是100-500米
     */
	static ACCURACY_HUNDRED_METERS: number = 3;

    /**
     * 定位精度超过500米
     */
	static ACCURACY_KM: number = 4;

    /**
     * 定位精度超过500米
     */
	static ACCURACY_THREE_KMS: number = 5;
    
    /**
     * 提供定位服务的Provider可用并有回调数据
     */
	static STATUS_AVAILABLE_WITH_DATA: number = 0;

    /**
     * 提供定位服务的Provider可用但没有回调数据
     */
	static STATUS_AVAILABLE: number = 1;

    /**
     * 提供定位服务的Provider暂时不可用
     */
	static STATUS_TEMPORARILY_UNAVAILABLE: number = 2;

    /**
     * 提供定位服务的Provider没有服务
     */
	static STATUS_OUT_OF_SERVICE: number = 3;

    /**
     * 提供定位服务的Provider被开启,比如GPS被打开.
     */
	static STATUS_ENABLE: number = 4;

    /**
     * 提供定位服务的Provider被关闭,比如GPS被关闭.
     */
	static STATUS_DISABLE: number = 5;

    /**
     * 没有授权
     */
    static NO_PERMISSION_INT: number = NativeDevice.NO_PERMISSION_INT;

    /**
     * 设备未开启定位服务
     */
    static LOCATION_SERVICE_UNAVAILABLE: number = 6;
    
    /**
     * 设备是否开启定位服务
     * @returns boolean,true开启,false没有开启,没有开启定位服务时,可能需要引导用户去位置服务设置界面去开启位置服务.
     */
    static isLocationServiceEnable(): boolean{
        return NativeDevice.isLocationServiceEnable();
    }

    /**
     * 去位置服务设置界面去开启位置服务
     */
    static showLocationSettings(): void{
        NativeDevice.showLocationSettings();
    }

    /**
     * 调用android原生方法单次定位
     * @param accuracy number,
     * Location.ACCURACY_FOR_NAVIGATION,Location.ACCURACY_BEST,Location.ACCURACY_TEN_METERS定位精度是100米以内
       Location.ACCURACY_HUNDRED_METERS定位精度是100-500米内
       Location.ACCURACY_KM,ACCURACY_THREE_KMS定位精度超过500米

     * @param listener (result :any) => void类型,监听器.

        回调:

        result是一个json对象可直接读取字段,只有status的值为Location.STATUS_AVAILABLE_WITH_DATA时才有其它字段的值.

        {
            "status": 0, //number,取值为:
            STATUS_AVAILABLE_WITH_DATA,STATUS_AVAILABLE,STATUS_TEMPORARILY_UNAVAILABLE,STATUS_OUT_OF_SERVICE,
            STATUS_ENABLE,STATUS_DISABLE,LOCATION_SERVICE_UNAVAILABLE,NO_PERMISSION_INT.

            "longitude": 113.922655, //number,经度.

            "latitude": 22.573587, //number,纬度.

            "accuracy": 39, //number,精度,米.

            "altitude": 0, //number,海拔,米.

            "timestamp": 1684468295990, //number,时间戳,毫秒.

            "gps": false, //boolean,定位的结果是否来源于gps,取值 true or false.

            "city": "深圳市", //string,城市.

            "province": "广东省", //string,省.

            "country": "中国", //string,国家.

            "subLocality": "南山区", //string,区.

            "thoroughfare": "", //string,街道.

            "subThoroughfare": "", //string,子街道.

            "localName": "TCL科学园国际E城E1TCL高科技工业园" //string,	地方名.
        }

        示例:

        import { Location } from "../script/export";
        Location.setLocationSingleEvent(Location.ACCURACY_KM,(result :any) => {

            let locationInfo = result.status;

            if (result.status === Location.STATUS_AVAILABLE_WITH_DATA) {
                    locationInfo += "是GPS定位么: " + result.gps + ", 经度: " + result.longitude + ", 纬度: " 
                + result.latitude + ", 海拔,米: " + result.altitude + ", 精度,米: " + result.accuracy 
                + ", 时间戳,毫秒: " + result.timestamp + ", 国家: " + result.country + ", 省: " + result.province 
                + ", 城市: " + result.city + ", 区: " + result.subLocality + ", 街道: " + result.thoroughfare 
                + ", 子街道: " + result.subThoroughfare + ", 地方名: " + result.localName;
                this.label.string = locationInfo;

            }

        });
     */
    static setLocationSingleEvent(accuracy :number,listener :(result :any) => void): void{
        NativeDevice.setLocationSingleEvent(accuracy,listener);
    }

    /**
     * 调用android原生方法持续定位
     * @param enable boolean,是否开启持续定位,true开启,false关闭.
     * @param accuracy number.
     * 
     * Location.ACCURACY_FOR_NAVIGATION,Location.ACCURACY_BEST,Location.ACCURACY_TEN_METERS定位精度是100米以内
     * 
       Location.ACCURACY_HUNDRED_METERS定位精度是100-500米内

       Location.ACCURACY_KM,ACCURACY_THREE_KMS定位精度超过500米

     * @param minTime number,单位毫秒,更新位置的最小时间差.
     * @param minDistance number,单位米,更新位置的最小距离.
     * @param listener (result :any) => void类型,监听器.
     * 
        回调:

        result是一个json对象可直接读取字段,只有status的值为Location.STATUS_AVAILABLE_WITH_DATA时才有其它字段的值.

        {
            "status": 0, //number,取值为:
            STATUS_AVAILABLE_WITH_DATA,STATUS_AVAILABLE,STATUS_TEMPORARILY_UNAVAILABLE,STATUS_OUT_OF_SERVICE,
            STATUS_ENABLE,STATUS_DISABLE,LOCATION_SERVICE_UNAVAILABLE,NO_PERMISSION_INT.

            "longitude": 113.922655, //number,经度.

            "latitude": 22.573587, //number,纬度.

            "accuracy": 39, //number,精度,米.

            "altitude": 0, //number,海拔,米.

            "timestamp": 1684468295990, //number,时间戳,毫秒.

            "gps": false, //boolean,定位的结果是否来源于gps,取值 true or false.

            "city": "深圳市", //string,城市.

            "province": "广东省", //string,省.

            "country": "中国", //string,国家.

            "subLocality": "南山区", //string,区.

            "thoroughfare": "", //string,街道.

            "subThoroughfare": "", //string,子街道.

            "localName": "TCL科学园国际E城E1TCL高科技工业园" //string,	地方名.
        }

        示例:

        import { Location } from "../script/export";
        Location.setLocationUpdateEvent(true,Location.ACCURACY_HUNDRED_METERS,10000,20,(result :any) => {

            let locationInfo = result.status;

            if (result.status === Location.STATUS_AVAILABLE_WITH_DATA) {
                    locationInfo += "是GPS定位么: " + result.gps + ", 经度: " + result.longitude + ", 纬度: " 
                + result.latitude + ", 海拔,米: " + result.altitude + ", 精度,米: " + result.accuracy 
                + ", 时间戳,毫秒: " + result.timestamp + ", 国家: " + result.country + ", 省: " + result.province 
                + ", 城市: " + result.city + ", 区: " + result.subLocality + ", 街道: " + result.thoroughfare 
                + ", 子街道: " + result.subThoroughfare + ", 地方名: " + result.localName;
                this.label.string = locationInfo;

            }

        });
     */
    static setLocationUpdateEvent(enable :boolean,accuracy :number,minTime :number,minDistance :number,listener :(result :string) => void): void{
        NativeDevice.setLocationUpdateEvent(enable,accuracy,minTime,minDistance,listener);
    }


    /**
     * 调用第三方库获取当前位置
     * 
     * @param listener (result :any) => void类型,监听器.
     * 
        回调:

        result是一个json对象可直接读取字段,只有status的值为Location.STATUS_AVAILABLE_WITH_DATA时才有其它字段的值.

        {
            "status": 0, //number,取值为:
            STATUS_AVAILABLE_WITH_DATA,STATUS_TEMPORARILY_UNAVAILABLE,NO_PERMISSION_INT

            "longitude": ""//number,经度.

            "latitude": "" //number,纬度.

            "adCode": "" //string,行政区编码.

            "adName": "" //string,行政区名称.

            "cityCode": "", //string,城市编码.

            "cityName": "", //string,城市名称.

            "email": "深圳市", //string,电子邮箱.

            "distance": "", //number,全程距离,单位:千米.

            "direction": "中国", //string,逆地理编码查询时POI坐标点相对于地理坐标点的方向.

            "title": "南山区", //string,POI的名称.

            "snippet": "", //string,POI的地址.

            "provinceCode": "", //string,省份编码.

            "provinceName": "" //string,省份名称.

            "businessArea": ""//string,所在商圈.
        }

        示例:

        import { Location } from "../script/export";
        Location.getMyLocation((result :any) => {

            let locationInfo = result.status;

            if (result.status === Location.STATUS_AVAILABLE_WITH_DATA) {
                    locationInfo += "行政区编码: " + result.adCode + ", 行政区名称: " + result.adName +", 经度: " + result.longitude + ", 纬度: " 
                + result.latitude + ", 城市编码: " + result.cityCode + ", 城市名称: " + result.cityName 
                + ", 电子邮箱: " + result.email + ", 全程距离,单位:千米: " + result.distance + ", 逆地理编码查询时POI坐标点相对于地理坐标点的方向: " + result.direction 
                + ", POI的名称: " + result.title + ", POI的地址: " + result.snippet + ", 省份编码: " + result.provinceCode 
                + ", 省份名称: " + result.provinceName + ", 所在商圈: " + result.businessArea;
                this.label.string = locationInfo;

            }
        });
     */
    static getMyLocation(listener :(result :any) => void): void{
        NativeDevice.getMyLocation(listener);
    }
    
    /**
     * 跳转到获取我的位置界面
     * @param param string,是一个json 数组字符串,字段如下:
     * 
     * [
           
           {

                "title":"",//string,商家名称

                "latitude":"22.12",//number,纬度

                "longitude":"54.76",//number,经度

                "detailAddress":"广东省深圳市南山区详细地址",//详细地址

                "extra":"",//string,额外字段.

                "phoneNumber":"15595934321"//string,电话号码

            }

        ]
     */
    static gotoStorePage(param: string) {
        NativeDevice.gotoStorePage(param);
    }
  
}


