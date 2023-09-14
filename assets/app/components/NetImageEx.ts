import { CCString, _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, NetImage } from 'bos/exports';
import { Enum } from 'cc';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { Sprite } from 'cc';
import { App } from 'app/App';
import { Vec2 } from 'cc';
import { math } from 'cc';

enum AspectFit {
    Raw = 0,
    Fill = 1,
    FitWidth = 2,
    FitHeight = 3,
    FixWidth = 4,
    FixHeight = 5,
}

@ccclass('NetImageEx')
export class NetImageEx extends XComponent {
    private _netImage: NetImage;

    @property({ type: Enum(AspectFit) })
    fitType: AspectFit;

    private _rawSize: math.Size;


    @property(CCString)
    private url = "";

    private get netImage() {
        if (!this._netImage) {
            let node = new Node();
            node.addComponent(Sprite);
            node.getComponent(Sprite).sizeMode = Sprite.SizeMode.RAW;
            node.addComponent(NetImage);
            node.active = false;
            this._netImage = node.getComponent(NetImage);
            this._netImage.node.on(NetImage.EVENT_IMAGE_LOADED, this.onLoadImage, this);
            this.node.addChild(node);
        }
        return this._netImage;
    }

    static EventType = {
        ON_COMPLETE: "onComplete",
    };

    async setUrl(url: string) {
        if (!url.startsWith("http")) {
            url = App.config.cmsPre + url;
        }
        return this.netImage.setUrl(url);
    }

    onLoad(): void {
        // this.url = "/pic/app_1/20219/V7UDfJKmVn_1631786369.png"
        this._rawSize = this.node.getComponent(UITransform).contentSize;
        this.netImage.onLoad();
        if (this.url) {
            this.setUrl(this.url);
        }
    }

    onDestroy(): void {
        this._netImage?.node?.targetOff(this);
    }

    onLoadImage() {
        if (!this._rawSize) {
            this._rawSize = this.node.getComponent(UITransform).contentSize;
        }

        Log.d("onLoadImage", this.fitType);
        let imageSize = this.netImage.node.getComponent(UITransform).contentSize;
        let nodeSize = this._rawSize;
        let scaleW = nodeSize.width / imageSize.width;
        let scaleH = nodeSize.height / imageSize.height;
        switch (this.fitType) {
            case AspectFit.Raw:
                this.node.getComponent(UITransform).setContentSize(imageSize);
                break;
            case AspectFit.Fill:
                if (scaleW > scaleH) {
                    this.netImage.node.scale = new Vec3(scaleW, scaleW, scaleW);
                } else {
                    this.netImage.node.scale = new Vec3(scaleH, scaleH, scaleH);
                }
                break;
            case AspectFit.FitWidth:
                this.netImage.node.scale = new Vec3(scaleW, scaleW, scaleW);
                break;
            case AspectFit.FitHeight:
                this.netImage.node.scale = new Vec3(scaleH, scaleH, scaleH);
                break;
            case AspectFit.FixWidth:
                this.node.getComponent(UITransform).setContentSize(math.size(nodeSize.width, imageSize.width * scaleW));
                break;
            case AspectFit.FixHeight:
                this.node.getComponent(UITransform).setContentSize(math.size(imageSize.height * scaleH, nodeSize.height));
                break;
        }
        this.node.getComponent(Sprite).enabled = false;
        this.netImage.node.active = true;
        this.node.emit(NetImageEx.EventType.ON_COMPLETE);
    }

    clear() {
        this.netImage.getComponent(Sprite).spriteFrame = null;
    }
}
