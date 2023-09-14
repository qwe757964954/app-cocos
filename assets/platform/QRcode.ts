import { NativeDevice } from "./NativeDevice";

export class QRcode {

    /**
     * png格式
     */
    static IMAGE_PNG: number =  0;

    /**
     * jpg格式
     */
    static IMAGE_JPG: number =  1;
    
    /**
     * 竖屏扫描
     */
    static PORTRAIT: number = 0;
    
    /**
     * 横屏扫描
     */
    static LANDSCAPE: number = 1;
    
    /**
     * 扫描成功
     */
    static SCAN_SUCCESS: number = 0;

    /**
     * 扫描失败
     */
    static SCAN_FAILED: number = 1;

    /**
     * 生成二维码的容错率7%
     */
    static EC_LEVEL_L: number = 0;

    /**
     * 生成二维码的容错率15%
     */
    static EC_LEVEL_M: number = 1;

    /**
     * 生成二维码的容错率25%
     */
    static EC_LEVEL_Q: number = 2;

    /**
     * 生成二维码的容错率30%
     */
    static EC_LEVEL_H: number = 3;
    
    /**
     * 没有权限
     */
    static NO_PERMISSION_STRING: string = NativeDevice.NO_PERMISSION_STRING;

    /**
     * 没有权限
     */
    static NO_PERMISSION_INT: number = NativeDevice.NO_PERMISSION_INT;

    /**
     * 扫描二维码
     * @param headSize 	number,设置扫描界面顶部的文字大小,整数或者小数,如16、16.0.
     * @param labelSize number,设置扫描界面扫描框下面的文字大小,整数或者小数,如16、16.0.
     * @param headColor string,设置扫描界面顶部的文字的颜色,表示颜色的16进制字符串,如 "#ffffffff".
     * @param labelColor string,设置扫描界面扫描框下面的文字颜色,表示颜色的16进制字符串,如 "#ffffffff".
     * @param backText string,设置扫描界面顶部左侧的文本,如:"返回".
     * @param titleText string,设置扫描界面顶部中间的文本,如 "扫一扫".
     * @param imgText string,设置扫描界面顶部右侧打开相册按钮的文本,如:"相册".
     * @param labelText string,设置扫描界面扫描框下面的文本,如: "将二维码放入框中,即可扫描".
     * @param orientation number,设置扫描界面横屏或者竖屏,取以下值之一:
     * 
     * QRcode.PORTRAIT 竖屏
     * 
     * QRcode.LANDSCAPE 横屏
     * 
     * @param listener (status :number,result :string) => void类型.
     * 
     * 回调:
     * 
     * status,number类型,取以下值之一:
     * 
     * QRcode.SCAN_SUCCESS 扫描成功,此时result为扫描解析到的信息.
     * 
     * QRcode.SCAN_FAILED 扫描成功,此时result为扫描失败原因.
     * 
     * result,string类型,
     * 
     * status为QRcode.SCAN_SUCCESS时result为扫描解析到的结果
     * 
     * status为QRcode.SCAN_FAILED时result为空字符串""或者异常信息
     * 
     * status为QRcode.NO_PERMISSION_INT时是用户没有授权,result为QRcode.NO_PERMISSION_STRING
     */
    static startScanQRcode(headSize :number,labelSize :number,headColor :string,labelColor :string,backText :string,titleText :string,
        imgText :string, labelText :string,orientation :number,listener :(status :number,result :string) => void): void{
        NativeDevice.startScanQRcode(headSize, labelSize, headColor, labelColor, backText,titleText, 
            imgText, labelText, orientation, listener);
    }
    
    /**
     * 
     * @param qrcodePath string,二维码图片路径,需要可读.
     * @param listener (result :string) => void类型.
     * 
     * 回调:result,string类型,解析的结果,如果出现异常则为空字符串"".
     */
    static decodeQRcode(qrcodePath :string,listener :(result :string) => void): void{
        NativeDevice.decodeQRcode(qrcodePath,listener);
      
    }
    
    /**
     * 
     * @param encodeInfo string,生成二维码图片的信息.
     * @param path string,	生成二维码路径,建议使用使用app私有目录否则需要自行申请写其它目录的权限.
     * @param dimension number,生成二维码图片的宽高.
     * @param imageName string,生成二维码图片名称,如果为空则为时间戳.
     * @param format number,生成二维码图片的格式,取以下值之一:
     * 
     * QRcode.IMAGE_PNG png格式
     * 
     * QRcode.IMAGE_JPG jpg格式.
     * 
     * @param quality number,生成二维码图片的质量,取值0-100,值越大质量越高.
     * @param ecLevel number, 生成二维码的容错率,取以下值之一:
     * 
     * QRcode.EC_LEVEL_L 容错率7%
     * 
     * QRcode.EC_LEVEL_M 容错率15%
     * 
     * QRcode.EC_LEVEL_Q 容错率25%
     * 
     * QRcode.EC_LEVEL_H 容错率30%
     * 
     * @returns string类型,生成的二维码图片名称.
     */
    public static generateQRcode(encodeInfo :string,path :string,dimension :number,imageName :string,
        format :number,quality :number,ecLevel :number): string{
        return NativeDevice.generateQRcode(encodeInfo,path,dimension,imageName,format,quality,ecLevel);
    }
    
    /**
     * 
     * @param encodeInfo string,生成二维码图片的信息.
     * @param path string,生成二维码路径,建议使用使用app私有目录否则需要自行申请写其它目录的权限.
     * @param logoPath string,logo路径,此文件需要可读.
     * @param dimension number,生成二维码图片的宽高.
     * @param imageName string,生成二维码图片名称,如果为空则为时间戳.
     * @param format number,生成二维码图片的格式,取以下值之一:
     * 
     * QRcode.IMAGE_PNG png格式
     * 
     * QRcode.IMAGE_JPG jpg格式.
     * 
     * @param quality number,生成二维码图片的质量,取值0-100,值越大质量越高.
     * @param ecLevel number, 生成二维码的容错率,取以下值之一:
     * 
     * QRcode.EC_LEVEL_L 容错率7%
     * 
     * QRcode.EC_LEVEL_M 容错率15%
     * 
     * QRcode.EC_LEVEL_Q 容错率25%
     * 
     * QRcode.EC_LEVEL_H 容错率30%
     * 
     * @returns string类型,生成的二维码图片名称.
     */
    public static generateQRcodeWithLogo(encodeInfo :string,path :string,logoPath :string,dimension :number,imageName :string,
        format :number,quality :number,ecLevel :number): string{
        return NativeDevice.generateQRcodeWithLogo(encodeInfo,path,logoPath,dimension,imageName,format,quality,ecLevel);
    }

}

