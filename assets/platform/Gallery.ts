import { NativeDevice } from "./NativeDevice";

export class Gallery {

    /**
     * 图片
     */
    static TYPE_IMAGE = 1;
    
    /**
     * 视频
     */
    static TYPE_VIDEO = 2;
    
    /**
     * 图片和视频
     */
    static TYPE_ALL = 3;
    
    /**
     * png格式
     */
    static IMAGE_PNG: number = 0;

    /**
     * jpg格式
     */
    static IMAGE_JPG: number = 1;
    
    /**
     * 打开系统相册,成功.
     */
    static OPEN_SUCCESS: number = 1;

    /**
     * 打开系统相册,取消.
     */
    static OPEN_CANCEL: number = 0;

    /**
     * 监听系统截屏事件成功.
     */
    static SCREENSHOT_OBSERVER_SUCCESS: number = 0;

    /**
     * 监听系统截屏事件失败.
     */
    static SCREENSHOT_OBSERVER_FAILED: number = 1;

    /**
     * 没有授权
     */
    static NO_PERMISSION_STRING: string = NativeDevice.NO_PERMISSION_STRING;

        /**
     * 没有授权
     */
    static NO_PERMISSION_INT: number = NativeDevice.NO_PERMISSION_INT;

    /**
     * 从系统相册选择图片
     * @param width number,返回图片宽,如果 width height 其中一个为0,则为0的值会自动按原始图片的长宽比计算.
     * @param height number,返回图片高,如果 width height 其中一个为0,则为0的值会自动按原始图片的长宽比计算.
     * @param format number,Gallery.IMAGE_PNG:png格式,Gallery.IMAGE_JPG:jpg格式.
     * @param quality number,图片质量,取值为0-100,默认值为80,越高质量越好.
     * @param path string,	图片存储路径,不包含图片名,推荐使用应用私有目录,不需要权限,
     *             如:"/storage/emulated/0/Android/data/com.boyaa.cocos.devicedemo/cache/",如果不是应用私有目录则需要自行申请写SDK权限
     * @param edit boolean,图片是否可编辑,true可编辑,false,不可编辑.
     * @param title string,当有多个应用可以打开系统相册界面时的选择界面的标题.
     * @param listener (status: number,result: string) => void 类型,监听器.
     * 
     * 回调:
     * 
     * status,number类型,取值
     * 
     * Gallery.OPEN_SUCCESS 成功
     * 
     * Gallery.OPEN_CANCEL 取消
     * 
     * Gallery.OPEN_ERROR 错误
     * 
     * Gallery.OPEN_NO_PERMISSION 没有权限.
     * 
     * result,string类型,只有status为Gallery.OPEN_SUCCESS时result才是有效图片路径,当用户没有同意权限时
     *               status为Gallery.NO_PERMISSION_INT,result为Gallery.NO_PERMISSION_STRING,其它值result为空字符"".
     * 
     * 示例:
     * 
     * import { Gallery } from "./platform/exports";
     * 
     *  Gallery.openGallery(400,400,Gallery.IMAGE_PNG,80,appCachPath,true,"这是系统图库",(status :number,result :string) => {
     * 
            let callbackInfo = "status: " + status + ", result: " + result;

            console.log(callbackInfo);

        });
     * 
     */
    static openGallery(width :number,height :number,format :number,quality :number,
        path :string,edit :boolean,title :string,listener :(status :number,result :string) => void): void{
        NativeDevice.openGallery(width,height,format,quality,path,edit,title,listener);
    }
    
    /**
     * 
     * @param type number
     * 
     * 取值:
     * 
     * Gallery.TYPE_IMAGE 图片
     * 
     * Gallery.TYPE_VIDEO 视频
     * 
     * Gallery.TYPE_ALL 图片和视频
     * 
     * @param limit number,最多选几张.
     * 
     * @param edit boolean,是否可编辑,true:可编辑,false:不可编辑,只有limit为1时才有效,limit大于1时此参数无效图片不可编辑.
     * 
     * @param listener (status :number,result :string[]) => void 类型,监听器.
     * 
     * 回调:
     * 
     * result,string[]类型,只有status为Gallery.OPEN_SUCCESS时result中才是有效图片路径,其它值result为空数组[].当用户没有同意权限时
     *               status为Gallery.NO_PERMISSION_INT.
     * 
     * 示例:
     * 
     * import { Gallery } from "./platform/exports";
        Gallery.openCustomGallery(Gallery.TYPE_IMAGE,2,false,(status :number,result :string[]) => {

            let callbackInfo = "status: " + status + ", result: " + result;

            console.log(callbackInfo);

        });
     * 
     */
    static openCustomGallery(type :number , limit :number,edit :boolean,listener :(status :number,result :string[]) => void){
        NativeDevice.openCustomGallery(type, limit, edit, listener);
    }
    
    /**
     * 监听用户通过按键截屏等通过系统截屏的操作.
     * @param listener (status: number,result: string) => void类型
     * 
     * 回调:
     * 
     * status,number类型
     * 
     * 取值:
     * 
     * Gallery.SCREENSHOT_OBSERVER_SUCCESS 截屏时监听成功
     * 
     * Gallery.SCREENSHOT_OBSERVER_FAILED 截屏时监听出现错误
     * 
     * result,string类型,只有status为Gallery.SCREENSHOT_OBSERVER_SUCCESS时result才是有效图片路径,当用户没有同意权限时
     *               status为Gallery.NO_PERMISSION_INT,result为Gallery.NO_PERMISSION_STRING,其它值result为空字符"".
     */
    static setScreenShotEvent(listener :(status :number,result :string) => void): void {
        NativeDevice.setScreenShotEvent(listener);
    }
 
}


