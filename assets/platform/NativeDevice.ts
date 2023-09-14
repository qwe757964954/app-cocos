import { native , ResolutionPolicy, sys } from 'cc';

function IS_ANDROID () :boolean{
    
    return sys.isNative && sys.os === sys.OS.ANDROID;
}

function IS_IOS () :boolean{
    return sys.isNative && sys.os === sys.OS.IOS;
}

function IS_WINDOWS() :boolean{
    return sys.os === sys.OS.WINDOWS;
}

function IS_WEB() :boolean {
    return sys.isBrowser;
}

let INTERFACE :string;
if (IS_ANDROID()) {
    INTERFACE = "com/boyaa/device/adaptercocos/CocosAdapter";
}
if (IS_IOS()) {
    INTERFACE = "CocosAdapter";
}

var callId = 0;

let callbackTable = {
    callId: null
};

window["BYDevice"] = {
    CocosAdapter: function(result: any){
        let json = JSON.parse(result);
        if (callbackTable[json.callId] != null) {
            if ("func" in callbackTable[json.callId]) {
                if(callbackTable[json.callId]["func"] != null) {
                    callbackTable[json.callId]["func"](json.result);
                    if ("needRelease" in callbackTable[json.callId] && callbackTable[json.callId]["needRelease"]){
                        callbackTable[json.callId] = null;
                    }
                }
            }else {
                callbackTable[json.callId](json.result);
                callbackTable[json.callId] = null;
            }
        }
    }
};

export class NativeDevice {
  
    static CURRENT_SCRIPT_VERSION :string = "1.0.0";
    static NO_PERMISSION_STRING :string = "NO PERMISSION";
    static NO_PERMISSION_INT :number = -10;
    
    private static callJavaNoParamReturnMethod(methodName :string,returnType :string){
        return native.reflection.callStaticMethod(INTERFACE, methodName, "()" + returnType);
    }
    private static callJavaNoParamVoidMethod(methodName :string){
        return this.callJavaNoParamReturnMethod(methodName,"V");
    }
    private static callJavaNoParamStringReturnMethod(methodName :string){
        return this.callJavaNoParamReturnMethod(methodName,"Ljava/lang/String;");
    }
    private static callJavaOneParamVoidMethod(methodName :string,paramType :string,param :any){
        native.reflection.callStaticMethod(INTERFACE, methodName, "(" + paramType + ")V",param);
    }
    private static callJavaOneParamReturnMethod(methodName :string,paramType :string,returnType :any,param :any){
        return native.reflection.callStaticMethod(INTERFACE, methodName, "(" + paramType + ")" + returnType,param);
    }
    private static callOCOneParamVoidMethod(methodName :string,param :any){
        native.reflection.callStaticMethod(INTERFACE,methodName + ":",param);
    }
    private static callOCOneParamReturnMethod(methodName :string,param :any){
        return native.reflection.callStaticMethod(INTERFACE,methodName + ":",param);
    }
    private static callOCNoParamReturnMethod(methodName :string){
        return native.reflection.callStaticMethod(INTERFACE,methodName);
    }
    private static callOCNoParamVoidMethod(methodName :string){
        native.reflection.callStaticMethod(INTERFACE,methodName);
    }

    static openCamera(id :number,width :number,height :number,format :number,quality :number,path :string,edit :boolean,listener :(status :number,message :string) => void): void {
        let callback = (result :any) => {
            let status = result.status;
            let data = result.data;
            if (listener != null) {
                listener(status,data);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "openCamera", "(IIIIIILjava/lang/String;Z)V",callId,id,width,height,format,quality,path,edit);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"openCamera:fornt:width:height:format:quality:path:edit:",callId,id,width,height,format,quality,path,edit);
        }else if (IS_WEB()) {
            callback("{\"status\": 1, \"data\": \"来自device的回调.\"}");
        }
    }
   
    static read(start :number,num :number,listener :(message :any) => void): void{
        let callback = (result :any) => {
            if (listener != null) {
                listener(result);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "readContacts", "(III)V",callId,start,num);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"read:start:number:",callId,start,num);
        }else if (IS_WEB()){
            callback(NativeDevice.NO_PERMISSION_STRING);
        }
    }
  
    static search(key :string,listener :(message :any) => void): void{
        let callback = (result :any) => {
            if (listener != null) {
                listener(result);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "searchContactByKey", "(ILjava/lang/String;)V",callId,key);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("searchContactByKey",key);
        }else if (IS_WEB()) {
            callback(NativeDevice.NO_PERMISSION_STRING);
        }
    }

    static getCount(listener :(result :number) => void): void{
        let callback = (callbackResult :number) => {
            if (listener != null) {
                listener(callbackResult);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("getContactsCount","I",callId);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("getContactsCount",callId);
        }else if (IS_WEB()) {
            callback(0);
        }
    }

    static selectContact(listener: (callbackInfo :any) => void) {
        let callback = (result :any) => {
            if (listener != null) {
                listener(result);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("selectContact","I",callId);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("selectContact",callId);
        }else if (IS_WEB()) {
            callback(JSON.parse("{\"status\": -10,\"number\":\"NO PERMISSION\",\"name\":\"\"}"));
        }
    }

    static getSerialNumber(listener: (result :string) => void): void{
        let callback = (callbackResult :string) => {
          if (listener != null) {
             listener(callbackResult);
          }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("getSerialNumber","I",callId);
        }else if (IS_IOS()) {
           this.callOCOneParamVoidMethod("getSerialNumber",callId);
        }else if (IS_WEB()) {
            callback("");
        }
    }

    static getPhoneNumber(listener :(result :string) => void): void{
        let callback = (callbackResult :string) => {
          if (listener != null) {
            listener(callbackResult);
          }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("getPhoneNumber","I",callId);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("getPhoneNumber",callId);
        }else if (IS_WEB()){
            callback("");
        }
    }

    static getImei(listener :(result :string) => void): void{
        let callback = (callbackResult :string) => {
          if (listener != null) {
            listener(callbackResult);
          }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("getImei","I",callId);
        }else if (IS_IOS()) {
            callback("");
        }else if (IS_WEB()) {
            callback("");
        }
    }
    static setScreenBrightness(brightness :number): void{
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("setScreenBrightness","I",brightness);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("setScreenBrightness",brightness);
        }else if (IS_WEB()) {

        }
    }
    static getScreenBrightness(): number{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("getScreenBrightness","I");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getScreenBrightness");
        }else if (IS_WEB()) {
            
        }
    }
    static isNotchScreen(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("isNotchScreen","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("isNotchScreen");
        }else if (IS_WEB()) {
            return false;
        }
    }
    static getModel(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getModel");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getModel");
        }else if (IS_WEB()) {
            return "web";
        }
    }
    static getVersion(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getVersion");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getVersion");
        }else if (IS_WEB()) {
            return "1.0.0";
        }
    }
    static getBrand(): string {
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getBrand");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getBrand");
        }else if (IS_WEB()) {
            return "Chrome";
        }
    }
    static getManufacturer(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getManufacturer");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getManufacturer");
        }else if (IS_WEB()) {
            return "DELL";
        }
    }
    static getUUID(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getUUID");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getUUID");
        }else if (IS_WEB()){
            return "123456";
        }
    }
    static getDeviceName(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getDeviceName");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getDeviceName");
        }else if (IS_WEB()){
            return "boyaa";
        }
    }
    static getPackageName(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getPackageName");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getPackageName");
        }else if (IS_WEB()) {
            return "com.boyaa.cocos.devicedemo";
        }
    }
    static getVersionName(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getVersionName");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getVersionName");
        }else if (IS_WEB()) {
            return "1.0.0";
        }
    }
    static getVersionCode(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getVersionCode");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getVersionCode");
        }else if (IS_WEB()) {
            return "1.0.0";
        }
    }
    static getIPAddress(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getIPAddress");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getIPAddress");
        }else if (IS_WEB()) {
            return "192.168.*.*";
        }
    }
    static getUserAgent(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getUserAgent");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getUserAgent");
        }else if (IS_WEB()) {  
            return "web";
        }
    }
    static getCountry(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getCountry");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getCountry");
        }else if (IS_WEB()) {
            return "CN";
        }
    }
    static getTimeZone(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getTimeZone");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getTimeZone");
        }else if (IS_WEB()) {
            return "CN-BJ";
        }
    }
    static getLocale(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getLocale");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getLocale");
        }else if (IS_WEB()) {
            return "CN-HZ";
        }
    }
    static isTablet(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("getVersionCode","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("isTablet");
        }else if (IS_WEB()) {
            return false;
        }
    }
    static isSimulator(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("isSimulator","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("isSimulator");
        }else if (IS_WEB()) {
            return false;
        }
    }
    static getVolume(): number{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("getVolume","I");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getVolume");
        }else if (IS_WEB()) {
            return 0;
        }
    }
    static setVolume(volume :number,flag :number): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "setVolume", "(II)V" + volume,flag);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setVolume:type:",volume,flag);
        }else if (IS_WEB()) {

        }
    }
    static raiseVolume(flag :number): void{
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("raiseVolume","I",flag);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("raiseVolume",flag);
        }else if (IS_WEB()) {

        }
    }
    static lowerVolume(flag :number): void{
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("lowerVolume","I",flag);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("lowerVolume",flag);
        }else if (IS_WEB()) {

        }
    }
    static keepScreenOn(enable :boolean): void{
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("keepScreenOn","Z",enable);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("keepScreenOn",enable);
        }else if (IS_WEB()) {

        }
    }
    static getInches() :number{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("getInches","F");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getInches");
        }else if (IS_WEB()){
            return 40;
        }
    }
    static getMemoryInfo(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getMemoryInfo");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getMemoryInfo");
        }else if (IS_WEB()){
            return "{}";
        }
    }
    static openUrl(url :string): void{
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("openUrl","Ljava/lang/String;",url);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("openUrl",url);
        }else if (IS_WEB()) {

        }
    }
    static openDialer(phoneNumber :string): void{
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("openDialer","Ljava/lang/String;",phoneNumber);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("openDialer",phoneNumber);
        }else if (IS_WEB()) {
            
        }
    }
    static openSms(phoneNumber :string,message :string): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "openSms", "(Ljava/lang/String;Ljava/lang/String;)V",phoneNumber,message);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"openSmsWithPhoneNumber:andMessage:",phoneNumber,message);
        }else if (IS_WEB()){
            
        }
    }
    static openSysSetting(): void{
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("openSysSetting");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("openSysSetting");
        }else if (IS_WEB()) {
            
        }
    }
    static openAppSettings(): void{
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("openAppSettings");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("openAppSettings");
        }else if (IS_WEB()) {
            
        }
    }
    static openFlashLight(): void{
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("openFlashLight");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("openFlashLight");
        }else if (IS_WEB()) {
            
        }
    }
    static offFlashLight(): void{
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("offFlashLight");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("offFlashLight");
        }else if (IS_WEB()) {
            
        }
    }
    static getBatteryTemperature(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getBatteryTemperature");
        }else if (IS_IOS()) {
            return "25";
        }else if (IS_WEB()) {
            return "25";
        }
    }
    static getCpuData(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getCpuData");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getCpuData");
        }else if (IS_WEB()) {
            return "{\"arch\": \"x86\",\"count\" : 8}";
        }
    }
    static notificationsEnabled(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("notificationsEnabled","Z");
        }else if (IS_IOS()) {
            let r = this.callOCNoParamReturnMethod("notificationsEnabled")
            console.log("notificationsEnabled r = " + r);
            return r;
        }else if (IS_WEB()) {
            return false;
        }
    }
    static openAppNotificationSettings(): void{
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("openAppNotificationSettings");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("openAppNotificationSettings");
        }else if (IS_WEB()) {
        }
    }
    static hasStepCounter(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("hasStepCounter","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("hasStepCounter");
        }else if (IS_WEB()) {
            return false;
        }
    }
    static vibrate(time :number): void{
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("vibrate","I",time);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("vibrate",time);
        }else if (IS_WEB()) {
        }
    }
    static beep(): void{
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("beep");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("beep");
        }else if (IS_WEB()) {
        }
    }

    static getNativeVersion(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getCurrentVersion");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getCurrentVersion");
        }else if (IS_WEB()) {
            return "1.0.0";
        }
    }
    
    static addKeyEventListener(listener :(result :number) => void): void{
        let callback = (callbackResult :number) => {
            if (listener != null) {
                listener(callbackResult);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("addKeyEventListener","I",callId);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("addKeyEventListener",callId);
        }else if (IS_WEB()) {
        }
    }

    static setStepCounterEvent(enable: boolean,listener :(result :number) => void): void{
        let callback = (callbackResult :number) => {
            if (listener != null) {
                listener(callbackResult);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setStepCounterEvent","(IZ)V",callId,enable);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setStepCounterEvent:enable:",callId,enable);
        }else if (IS_WEB()) {
        }
    }

    static finalOrientationResult = 0;
    static setOrientationEvent(enable: boolean,senseAngle: number,listener :(result :number) => void): void{
        let tempOrientationResult = 0
        let callback = (callbackResult :number) => {
            if (listener != null) {
                if (IS_ANDROID()) {
                    if(callbackResult > 359 - senseAngle || callbackResult < senseAngle){
                        tempOrientationResult = 0;
                    }else if(callbackResult > 270 - senseAngle && callbackResult < 270 + senseAngle) {
                        tempOrientationResult = -90;
                    }else if(callbackResult > 180 - senseAngle && callbackResult < 180 + senseAngle) {
                        tempOrientationResult = 180;
                    }else if(callbackResult > 90 - senseAngle && callbackResult < 90 + senseAngle){
                        tempOrientationResult = 90;
                    }else {
                        return;
                    }
                    if (NativeDevice.finalOrientationResult != tempOrientationResult){
                        NativeDevice.finalOrientationResult = tempOrientationResult;
                        listener(NativeDevice.finalOrientationResult);
                    }
                }else {
                    listener(callbackResult);
                }
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setOrientationEvent","(IZ)V",callId,enable);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setOrientationEvent:enable:",callId,enable);
        }else if (IS_WEB()) {
        }
    }

    static setOrientation(orientation: number): void {
        let orientationToSet = 0;
        switch (orientation) {
            case 0:
            case 180:
                orientationToSet = 0;
                break;
            case 90:
            case -90:
                orientationToSet = 1;
                break
        }
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("setOrientation","I",orientationToSet);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("setOrientation",orientationToSet);
        }else if (IS_WEB()) {
        }
    }

    static getCutoutInfo(listener :(result :any) => void): void{
        let callback = (callbackResult :any) => {
            if (listener != null) {
                listener(callbackResult);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("getCutoutInfo","I",callId);
        }else if (IS_IOS()) {
            callback(this.callOCNoParamReturnMethod("getCutoutInfo"));
        }else if (IS_WEB()) {
            callback(JSON.parse("{\"hasCutout\" :false}"));
        }
    }

    static showDialog(title :string,message :string,btn1Text :string,btn2Text :string,listener :(result :number) => void): void {
        let callback = (callbackResult :number) => {
            if (listener != null) {
                listener(callbackResult);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, 
                "showDialog", "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                callId,title,message,btn1Text,btn2Text);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"showDialog:title:message:btn1Text:btn2Text:",callId,title,message,btn1Text,btn2Text);
        }else if (IS_WEB()) {
        }     
    }

    static showToast(text :string,position :number,duration :number): void {
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, 
                "showToast", "(Ljava/lang/String;II)V",text,position,duration,);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"showToastWithText:position:duration:",text,position,duration);
        }else if (IS_WEB()) {
        }
    }

    static getNetworkType(): number{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("getNetworkType","I");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getNetworkType");
        }else if (IS_WEB()) {
            return 2;
        }
    }

    static getNetworkTypeName(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getNetworkTypeName");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getNetworkTypeName");
        }else if (IS_WEB()) {
            return "5G";
        }
    }

    static isNetworkConnected(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("isNetworkConnected","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("isNetworkConnected");
        }else if (IS_WEB()) {
            return true;
        }
    }

    static getNetworkSubType(): number{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("getNetworkSubType","I");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getNetworkSubType");
        }else if (IS_WEB()) {
            return 13;
        }
    }

    static getSSID(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getSSID");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getSSID");
        }else if (IS_WEB()) {
            return "";
        }
    }

    static getMNO(): string{
        if (IS_ANDROID()) {
            return this.callJavaNoParamStringReturnMethod("getMNO");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getMNO");
        }else if (IS_WEB()) {
            return "中国移动";
        }
    }

    static getNetWorkSignalStrength(listener: (result: number) => void){
        let callback = (callbackResult: number) => {
            if (listener != null) {
                listener(callbackResult);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("getNetWorkSignalStrength","I",callId);
        }else if (IS_IOS()) {
            callback(0);
        }else if (IS_WEB()) {
            callback(3);
        }
    }

    static setNetworkConnectivityEvent(enable :boolean,listener :(isConnected :boolean,type :number) => void){
        let callback = (result :any) => {
            let isConnected = result.isConnected;
            let type = result.type;
            if (listener != null) {
                listener(isConnected,type);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setNetworkConnectivityEvent","(IZ)V",callId,enable);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setNetworkConnectivityEvent:enable:",callId,enable);
        }else if (IS_WEB()) {
            callback(JSON.parse("{\"isConnected\" : true,\"type\": 2}"));
        }
    }

    static getBatteryValue(): number{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("getBatteryValue","F");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("getBatteryValue");
        }else if (IS_WEB()) {
            return 25;
        }
    }
    static isCharging(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("isCharging","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("isCharging");
        }else if (IS_WEB()) {
            return true;
        }
    }
    static isPlug(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("isPlug","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("isPlug");
        }else if (IS_WEB()) {
            return true;
        }
    }
    static setChargingEvent(enable :boolean,listener :(isCharging :boolean) => void): void{
        let callback = (result: boolean) => {
            if (listener != null) {
                listener(result);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setChargingEvent","(IZ)V",callId,enable);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setChargingEvent:enable:",callId,enable);
        }else if (IS_WEB()) {
            callback(true);
        }
    }
    static setLowPowerEvent(enable :boolean,listener :(lowPower :boolean) => void): void{
        let callback = (result :boolean) => {
            if (listener != null) {
                listener(result);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setLowPowerEvent","(IZ)V",callId,enable);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setLowPowerEvent:enable:",callId,enable);
        }else if (IS_WEB()) {
            callback(false);
        }
    }
    static setBatteryValueChangedEvent(enable :boolean,listener: (value :number) => void): void{
        let callback = (result :number) => {
            if (listener != null) {
                listener(result);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setBatteryValueChangedEvent","(IZ)V",callId,enable);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setBatteryValueChangedEvent:enable:",callId,enable);
        }else if (IS_WEB()) {
            callback(100);
        }
    }

    static createWebview(id :number,x :number,y :number,width :number,height :number) :void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "createWebview", "(IIIII)V",id,x,y,width,height);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"createWebviewWithX:y:width:height:",x,y,width,height);
        }else if (IS_WEB()) {
        }
    }
    static setWebviewEvent(id :number,listener :(result :number) => void): void{
        let callback = (value :number) => {
            if (listener != null) {
                listener(value);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setWebviewEvent","(II)V",callId,id);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("setWebviewEvent",callId);
        }else if (IS_WEB()){
            callback(1);
        }
    }
    static setWebviewJsCallbackEvent(id :number,listener :(result :string) => void): void{
        let callback = (value :string) => {
            if (listener != null) {
                listener(value);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setWebviewJsCallbackEvent","(II)V",callId,id);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("setWebviewJsCallbackEvent",callId);
        }else if (IS_WEB()) {
            callback("");
        }
    }
    static loadWebviewFile(id :number,path :string): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "loadWebviewFile", "(ILjava/lang/String;)V",id,path);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("loadWebviewFile",path);
        }else if (IS_WEB()) {
        }
    }
    static loadWebviewUrl(id :number,url :string): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "loadWebviewUrl", "(ILjava/lang/String;)V",id,url);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("loadWebviewUrl",url);
        }else if (IS_WEB()) {
        }        
    }
    static setWebviewRect(id :number,x :number,y :number,width :number,height :number): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "setWebviewRect", "(IIIII)V",id,x,y,width,height);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setWebviewRectWithX:y:width:height:",x,y,width,height);
        }else if (IS_WEB()) {
        }
    }
    static setWebviewCloseButton(id :number,position :number,imagePath :string,width :number,height :number): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "setWebviewCloseButton", "(IILjava/lang/String;II)V",id,position,imagePath,width,height);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE, "setWebviewCloseButtonWithPosition:imagePath:width:height:",position,imagePath,width,height);
        }else if (IS_WEB()) {
        }
    }
    static setWebviewLoadingDialog(id :number,imagePath :string,width :number,height :number,text :string,loadingTimeout :number): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, 
                "setWebviewLoadingDialog", "(ILjava/lang/String;IILjava/lang/String;I)V",id,imagePath,width,height,text,loadingTimeout);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE, "setWebviewLoadingDialogWithImage:text:width:height:",imagePath,text,width,height);
        }else if (IS_WEB()) {
        }
    }
    static enableWebviewScrollBar(id :number,bHor :boolean,bVert :boolean): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "enableWebviewScrollBar", "(IZZ)V",id,bHor,bVert);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE, "enableWebviewScrollBarWithHor:andVer",bHor,bVert);
        }else if (IS_WEB()) {
        }
    }
    static enableWebviewCache(id :number,enable :boolean): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "enableWebviewCache", "(IZ)V",id,enable);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("enableWebviewCache",enable);
        }else if (IS_WEB()) {
        }
    }
    static enableWebviewBackOrForward(id :number,enable :boolean): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "enableWebviewBackOrForward", "(IZ)V",id,enable);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("enableWebviewBackOrForward",enable);
        }else if (IS_WEB()) {
        }
    }
    static closeWebview(id: number): void{
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE, "closeWebview", "(IZ)V",id);
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("closeWebview");
        }else if (IS_WEB()) {
        }
    }
    static isLocationServiceEnable(): boolean{
        if (IS_ANDROID()) {
            return this.callJavaNoParamReturnMethod("isLocationServiceEnable","Z");
        }else if (IS_IOS()) {
            return this.callOCNoParamReturnMethod("isLocationServiceEnable");
        }else if (IS_WEB()) {
            return false;
        }
    }
    static showLocationSettings(): void{
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("showLocationSettings");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("showLocationSettings");
        }else if (IS_WEB()) {
        }
    }
    static setLocationSingleEvent(accuracy :number,listener :(callbackInfo :any) => void): void{
        let callback = (result :any) => {
            if (listener != null) {
                listener(result);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setLocationSingleEvent","(II)V",callId,accuracy);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setLocationSingleEvent:accuracy:",callId,accuracy);
        }else if (IS_WEB()) {
            callback(JSON.parse("{\"status\": 5}"));
        }
    }
    static setLocationUpdateEvent(enable :boolean,accuracy :number,minTime :number,minDistance :number,listener :(callbackInfo :any) => void): void{
        let callback = (result :any) => {
            if (listener != null) {
                listener(result);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"setLocationUpdateEvent","(IZIII)V",callId,enable,accuracy,minTime,minDistance);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"setLocationUpdateEvent:enable:accuracy:minTime:minDistance:",callId,enable,accuracy,minTime,minDistance);
        }else if (IS_WEB()) {
            callback(JSON.parse("{\"status\": 5}"));
        }
    }

    static getMyLocation(listener: (result: any) => void) {
        let callback = (result :any) => {
            if (listener != null) {
                listener(result);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("getMyLocation","I",callId);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("getMyLocation",callId);
        }else if (IS_WEB()) {
            callback(JSON.parse("{\"status\": 5}"));
        }
    }

    static gotoStorePage(param: string) {
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("gotoStorePage","Ljava/lang/String;",param);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("gotoStorePage",param);
        }else if (IS_WEB()) {}
    }

    static startScanQRcode(headSize :number,labelSize :number,headColor :string,labelColor :string,backText :string,titleText :string,
        imgText :string, labelText :string,orientation :number,listener :(status :number,result :string) => void): void{
        let callback = (callbackInfo :any) => {
            let status = callbackInfo.status;
            let data = callbackInfo.data;
            if (listener != null) {
                listener(status,data);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"startScanQRcode",
            "(IFFLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V",
            callId,headSize,labelSize,headColor,labelColor,backText,titleText,imgText,labelText,orientation);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"startScanQRcode:headSize:labelSize:headColor:labelColor:backText:titleText:imgText:labelText:orientation:",
            callId,headSize,labelSize,headColor,labelColor,backText,titleText,imgText,labelText,orientation);
        }else if (IS_WEB()) {
            callback("{\"status\": -10,\"data\": \"NO PERMISSION\"}");
        }
    }
    static decodeQRcode(qrcodePath :string,listener :(result :string) => void): void{
        let callback = (callbackInfo :string) => {
            if (listener != null) {
                listener(callbackInfo);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"decodeQRcode","(ILjava/lang/String;)V",callId,qrcodePath);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"decodeQRcode:qrcodePath:",callId,qrcodePath);
        }else if (IS_WEB()) {
            callback("");
        }
    }
    static generateQRcode(encodeInfo :string,path :string,dimension :number,imageName :string,
        format :number,quality :number,ecLevel :number): string{
        if (IS_ANDROID()) {
            return native.reflection.callStaticMethod(INTERFACE,"generateQRcode",
            "(Ljava/lang/String;Ljava/lang/String;ILjava/lang/String;III)V",encodeInfo,path,dimension,imageName,format,quality,ecLevel);
        }else if (IS_IOS()) {
            return native.reflection.callStaticMethod(INTERFACE,"generateQRcodeWithEncodeInfo:path:dimension:imageName:format:quality:ecLevel:",
            encodeInfo,path,dimension,imageName,format,quality,ecLevel);
        }else if (IS_WEB()) {
            return "";
        }
    }
    static generateQRcodeWithLogo(encodeInfo :string,path :string,logoPath :string,dimension :number,imageName :string,
        format :number,quality :number,ecLevel :number): string{
        if (IS_ANDROID()) {
            return native.reflection.callStaticMethod(INTERFACE,"generateQRcodeWithLogo",
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;ILjava/lang/String;III)V",
            encodeInfo,path,logoPath,dimension,imageName,format,quality,ecLevel);
        }else if (IS_IOS()) {
            return native.reflection.callStaticMethod(INTERFACE,"generateQRcodeWithLogoWithEncodeInfo:path:logoPath:dimension:imageName:format:quality:ecLevel:",
            encodeInfo,path,logoPath,dimension,imageName,format,quality,ecLevel);
        }else if (IS_WEB()) {
            return "";
        }
    }

    static openGallery(width :number,height :number,format :number,quality :number,
        path :string,edit :boolean,title :string, listener :(status :number,result :string) => void): void{
        let callback = (result :any) => {
            let status = result.status;
            let data = result.data;
            if (listener != null) {
                listener(status,data);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"openGallery","(IIIIILjava/lang/String;ZLjava/lang/String;)V",
            callId,width,height,format,quality,path,edit,title);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"openGallery:width:height:format:quality:path:edit:title:",callId,width,height,format,quality,path,edit,title);
        }else if (IS_WEB()) {
            callback(JSON.parse("{\"status\" : 0,\"data\": \"\"}"))
        }
    }
    static openCustomGallery(type :number ,limit :number,edit :boolean,listener :(status :number,result :string[]) => void){
        let callback = (callbackInfo :string) => {
            if (listener != null) {
                if (NativeDevice.NO_PERMISSION_STRING === callbackInfo){
                    listener(NativeDevice.NO_PERMISSION_INT,[]);
                }else{
                    listener(1,callbackInfo.split(','));
                }
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"openCustomGallery","(IIIZ)V",callId,type,limit,edit);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"openCustomGallery:type:limit:edit:",callId,type,limit,edit);
        }else if (IS_WEB()) {
            callback(NativeDevice.NO_PERMISSION_STRING);
        }
    }
    static setScreenShotEvent(listener :(status :number,result :string) => void): void {
        let callback = (result :any) => {
            let status = result.status;
            let data = result.data;
            if (listener != null) {
                listener(status,data);
            }
        }
        let table = {
            "func":callback,
            "needRelease":false
        };
        callId ++;
        callbackTable[callId] = table;
        if (IS_ANDROID()) {
            this.callJavaOneParamVoidMethod("setScreenShotEvent","I",callId);
        }else if (IS_IOS()) {
            this.callOCOneParamVoidMethod("userDidTakeScreenshot",callId);
        }else if (IS_WEB()){
            callback(JSON.parse("{\"status\": 1,\"data\": \"\"}"));
        }
    }

    static getStatus(type :number): boolean{
        if (IS_ANDROID()) {
            return this.callJavaOneParamReturnMethod("getStatus","I","Z",type);
        }else if (IS_IOS()) {
            return this.callOCOneParamReturnMethod("getStatus",type);
        }else if (IS_WEB()) {
            return true;
        }
    }
    static request(type :number,listener :(granted :boolean) => void): void{
        let callback = (result :boolean) => {
            if (listener != null) {
                listener(result);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"request","(II)V",callId,type);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"request:type:",callId,type);
        }else if (IS_WEB()) {
            callback(false);
        }
    }
    static requestReason(type :number,reason :string,ok :string,cancel :string,listener :(granted :boolean) => void): void{
        let callback = (result :boolean) => {
            if (listener != null) {
                listener(result);
            }
        }
        callId ++;
        callbackTable[callId] = callback;
        if (IS_ANDROID()) {
            native.reflection.callStaticMethod(INTERFACE,"requestReason","(IILjava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
            callId,type,reason,ok,cancel);
        }else if (IS_IOS()) {
            native.reflection.callStaticMethod(INTERFACE,"requestReason:type:reason:ok:cancel:",callId,type,reason,ok,cancel);
        }else if (IS_WEB()) {
            callback(false);
        }
    }

    static onGameExit() {
        if (IS_ANDROID()) {
            this.callJavaNoParamVoidMethod("onGameExit");
        }else if (IS_IOS()) {
            this.callOCNoParamVoidMethod("onGameExit");
        }else if (IS_WEB()) {
        }
    }

}

export function log(msg:string) {
  console.log(msg);
}




