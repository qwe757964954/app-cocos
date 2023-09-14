import { NativeDevice, log } from "./NativeDevice";
interface CameraCallback{
    (status :number,result: string):void;
}
export class Camera {
    
    /**
     * 拍照成功  默认值1
     */
    static OPEN_SUCCESS: number = 1;
    
    /**
     * 取消拍照  默认值0
     */
    static OPEN_CANCEL: number = 0;

     /**
     * 相机异常  默认值-1
     */
    static OPEN_ERROR: number = -1;

    /**
     * 图片格式 png
     */
    static IMAGE_PNG: number = 0;

    /**
     * 图片格式 jpg
     */
    static IMAGE_JPG : number = 1;

    /**
     * 前置摄像头
     */
    static FRONT_CAMERA: number = 1;

    /**
     * 后置摄像头(默认值)
     */
    static DEFAULT_CAMERA: number = 0;

    /**
     * 没有授权
     */
    static NO_PERMISSION_STRING: string = NativeDevice.NO_PERMISSION_STRING;

     /**
     * 没有授权
     */
    static NO_PERMISSION_INT: number = NativeDevice.NO_PERMISSION_INT;
    
    /**
     * 
     * @param id    number,取值:Camera.DEFAULT_CAMERA后置摄像头,Camera.FRONT_CAMERA前置摄像头.
     * @param width number,图片宽.
     * @param height number,图片高.
     * @param format number,取值:Camera.IMAGE_PNG png格式,Camera.IMAGE_JPG jpg格式.
     * @param quality number,图片质量,取值为0-100.
     * @param path string,图片存储路径.
     * @param edit boolean,知否编辑,true编辑,false不编辑.
     * @param listener (status :number,result:string):void类型,回调函数.
     * status取值:Camera.OPEN_SUCCESS成功,Camera.OPEN_CANCEL取消,
     *            Camera.OPEN_ERROR错误,Camera.NO_PERMISSION_INT没有权限.
     * result:当status的值为Camera.OPEN_SUCCESS时result才是有效的图片路径.
     * 
     * 示例:
     *  import { Camera } from "./platform/exports";
     *  Camera.openCamera(Camera.DEFAULT_CAMERA,400,400,Camera.IMAGE_PNG,80,
            "/data/user/0/com.boyaa.cocos.devicedemo/cache",false,
            (status: number,result: string) => {
                var callbackInfo = `onbtnClick = status: ${status}, result: ${result}`;
                console.log(callbackInfo);
        });
     * 
     */
    static openCamera(id :number,width :number,height :number,format :number,quality :number,path :string,edit :boolean,listener:CameraCallback): void {
        if (format != Camera.IMAGE_PNG && format != Camera.IMAGE_JPG) {
            log("invalide param format .");
            format = Camera.IMAGE_PNG;
        }
        if (id != Camera.FRONT_CAMERA && id != Camera.DEFAULT_CAMERA) {
            log("invalide param id .");
            id = Camera.DEFAULT_CAMERA;
        }
        if (width < 0) {
            width = 0;
        }
        if (height < 0) {
            height = 0;
        }
        if (quality < 0) {
            quality = 0;
        }
        if (quality > 100) {
            quality = 100;
        }
        NativeDevice.openCamera(id,width,height,format,quality,path,edit,listener);
    }
}
 

 