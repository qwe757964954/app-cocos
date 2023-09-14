// import { Params } from './../../../../../extensions/hotupdate/source/gen_manifest';
import { assert } from 'cc';
import {_decorator, Component, Label, WebView, TextAsset, Node, sys} from 'cc';
const { ccclass, type } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { ActivityMgr } from 'app/domain/account/ActivityMgr';
import { uiMgr } from 'bos/exports';
import { log } from 'cc';

@ccclass('PrivateUI')
export class PrivateUI extends Component {
    @type(WebView)
    public contentWebview: WebView = null!;
    @type(Label)
    public titleStr: Label = null!;

    private key: string = ""!;
    public constructor() { 
        super();
        
    }
    onLoad(): void {
    }
    start() {
    }
    setup(params:any) {
        this.key = params;
        this.getPrivateConfig();
    }

    async getPrivateConfig(){
        let {err,resp} = await ActivityMgr.getInstance().getAppConf(this.key);
        this.titleStr.string = resp?.conf?.title;
        let htmlStr = resp?.conf?.content;
        let dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlStr);
        log(dataUrl);
        if (this.contentWebview) {
            this.contentWebview.url = dataUrl;
        }
    }

    onBackReturn(){
        uiMgr.popPage();
    }

    update(deltaTime: number) {
         
    }
}