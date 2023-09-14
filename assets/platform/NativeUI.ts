import { NativeDevice } from "./NativeDevice";

export class NativeUI {
    
    static Toast = class Toast {
        
        /**
         * 吐司显示在屏幕上方
         */
        static GRAVITY_TOP: number = 0;

        /**
         * 吐司显示在屏幕中间
         */
        static GRAVITY_CENTER: number = 1;

        /**
         * 吐司显示在屏幕下方
         */
        static GRAVITY_BOTTOM: number = 2;

        /**
         * 显示吐司
         * @param text string,吐司显示的文本.
         * @param position number,吐司在屏幕显示的位置,GRAVITY_TOP上方,GRAVITY_CENTER中间,GRAVITY_BOTTOM下方.
         * @param duration number,吐司显示时长,单位毫秒,如果大于3000则为3000否则为1500.
         * 
         * 示例:
         * 
         * import { NativeUI } from "../script/export";
         * 
         * NativeUI.Toast.show("举杯邀明月,对影成三人.",NativeUI.Toast.GRAVITY_BOTTOM,3000);
         */
        static show(text :string,position :number,duration :number): void {
            NativeDevice.showToast(text,position,duration);
        }
    }

    static Dialog = class Dialog {

        /**
         * 点击了PositiveButton回调此值
         */
        static BUTTON_IDX_0: number = 0;

        /**
         * 点击了NegativeButton回调此值
         */
        static BUTTON_IDX_1: number = 1;

        /**
         * 弹出dialog.
         * @param title string,	dialog显示的标题文本.
         * @param message string,dialog显示的内容.
         * @param btn1Text string,PositiveButton显示的文字.
         * @param btn2Text string,NegativeButton显示的文字.
         * @param listener (idx: number) => void)类型,按钮点击事件监听器.
         * 
         * 回调:
         * 
         * 点击了PositiveButton回调NativeUI.Dialog.BUTTON_IDX_0,点击了NegativeButton回调NativeUI.Dialog.BUTTON_IDX_1.
         * 
         * 示例:
         * 
         * import { NativeUI } from "../script/export";
         * 
         * NativeUI.Dialog.show("调研", "年轻人就是得气盛", "说得对", "有点狂",(idx :number) => {
         * 
               console.log("idx: " + idx);

           });
         */
        static show(title :string,message :string,btn1Text :string,btn2Text :string,listener :(idx :number) => void): void {
            NativeDevice.showDialog(title,message,btn1Text,btn2Text,listener);
        }
    }

    private static webviewId: number = 0;

    static Webview = class Webview {

        id: number;
        
        /**
         * 加载成功
         */
        static LOAD_SUCCESS: number = 0;
        
        /**
         * 加载失败
         */
        static LOAD_FAILED: number = 1;
        
        /**
         * 关闭
         */
        static CLOSE: number = 2;
        
        /**
         * 刷新
         */
        static REFRESH: number = 3;

        /**
         * 关闭按钮的位置在webview的左上角.
         */
         static TOP_LEFT: number = 1;

        /**
         * 关闭按钮的位置在webview的右上角.
         */
        static TOP_RIGHT: number = 2;

        /**
         * 创建Webview
         * @param x number,webview左上角顶点x坐标.
         * @param y number,webview左上角顶点y坐标.
         * @param width number,webview宽.
         * @param height number,height高.
         */
        constructor(x :number,y :number,width :number,height :number){
            this.id = NativeUI.webviewId ++;
            NativeDevice.createWebview(this.id,x,y,width,height);
        }
        
        /**
         * 设置webview事件监听
         * @param listener 
         * 
         * 回调:
         * 
         * cmd,number类型取以下其一:
         * 
         * NativeUI.Webview.LOAD_SUCCESS // 加载成功
         * 
         * NativeUI.Webview.LOAD_FAILED // 加载失败
         * 
         * NativeUI.Webview.CLOSE //关闭
         * 
         * NativeUI.Webview.REFRESH //刷新
         */
        setEvent(listener :(cmd :number) => void): void{
            NativeDevice.setWebviewEvent(this.id,listener);
        }

        /**
         * js调用java事件
         * @param listener 
         * 
         * 回调:
         * result,string类型,js调用java时传递的数据.
         */
        setJsCallback(listener :(result :string) => void): void{
            NativeDevice.setWebviewJsCallbackEvent(this.id,listener);
        }
        
        /**
         * 通过文件路径加载网页
         * @param path string类型,文件路径,如果file为设备内的路径需要此文件可访问,如果不是文件路径则会从assets访问该文件.
         */
        loadFile(path :string): void{
            NativeDevice.loadWebviewFile(this.id,path);
        }
        
        /**
         * 通过url加载网页
         * @param url String类型,网址如:https://www.boyaa.com/game.html.
         */
        loadUrl(url :string): void{
            NativeDevice.loadWebviewUrl(this.id,url);
        }

        /**
         * 设置webview的大小.
         * @param x number,webview左上角顶点x坐标.
         * @param y number,webview左上角顶点y坐标.
         * @param width number,webview宽.
         * @param height number,height高.
         */
        setRect(x :number,y :number,width :number,height :number): void{
            NativeDevice.setWebviewRect(this.id,x,y,width,height);
        }

        /**
         * 
         * @param position number,取值:
         * 
         * NativeUI.Webview.TOP_LEFT //关闭按钮的位置在webview的左上角
         * 
         * NativeUI.Webview.TOP_RIGHT //关闭按钮的位置在webview的右上角
         * 
         * @param imagePath string,关闭按钮图片路径,可直接访问.
         * @param width number,关闭按钮宽.
         * @param height number,关闭按钮高.
         */
        setCloseButton(position :number,imagePath: string,width: number,height: number): void{
            NativeDevice.setWebviewCloseButton(this.id,position,imagePath,width,height);
        }

        /**
         * 设置loading视图
         * @param imagePath string,loading动画图片路径,可直接访问.
         * @param width number,loading view的宽.
         * @param height number,loading view的高.
         * @param text string,loading view的文字.
         * @param loadingTimeout number,loading超时关闭时间,单位毫秒.
         */
        setLoadingDialog(imagePath :string,width :number,height :number,text :string,loadingTimeout :number): void{
            NativeDevice.setWebviewLoadingDialog(this.id,imagePath,width,height,text,loadingTimeout);
        }

        /**
         * 设置webview滚动条
         * @param bHor boolean,是否开启横向滚动,true开启,false不开启.
         * @param bVert boolean,是否开启竖向滚动,true开启,false不开启.
         */
        enableScrollBar(bHor :boolean,bVert :boolean): void{
            NativeDevice.enableWebviewScrollBar(this.id,bHor,bVert);
        }

        /**
         * 设置webview缓存
         * @param enable boolean,webview是否开启缓存,true开启,false不开启.
         */
        enableCache(enable :boolean): void{
            NativeDevice.enableWebviewCache(this.id,enable);
        }

        /**
         * 设置webview向前回退
         * @param enable boolean,webview是否允许向前和后退,true允许,false不允许.
         */
        enableBackOrForward(enable :boolean): void{
            NativeDevice.enableWebviewBackOrForward(this.id,enable);
        }

        /**
         * 关闭webview
         */
        close(): void{
            NativeDevice.closeWebview(this.id);
        }
    }
  
}



