import { Component, Sprite, SpriteFrame, _decorator, assetManager, resources } from "cc";
import { GIFCache, GIFFrameData } from "./GIF";
import { ResLoader } from "../loader/ResLoader";

const { ccclass, property, requireComponent } = _decorator;

@ccclass("XGIF")
@requireComponent(Sprite)
export default class XGIF extends Component {
    @property(String)
    path: string = '';

    public delays = [];
    public gifSp: Sprite;
    public frames: SpriteFrame[] = [];
    frameIdx = 0;

    onLoad() {
        this.gifSp = this.node.getComponent(Sprite);
        if (this.path != '') {
            this.preload(this.path).then(() => {
                this.play(true);
            });
        }
    }
    async preload(path: string = "") {
        if (path != "") {
            if (this.path == path && this.frames.length > 0) {
                return
            }
            this.path = path;
        }
        GIFCache.getInstance();
        return new Promise<void>((rs, rj) => {
            if (GIFCache.getInstance().has(this.path)) {
                let cache = GIFCache.getInstance().get(this.path);
                this.delays = cache.frameData.delays;
                this.frames = cache.frameData.spriteFrames;
                rs();
                return
            }
            ResLoader.getInstance().loadAsset(this.path, (err, data: any) => {
                if (err) {
                    rj(err);
                    return;
                }
                let delays = data._nativeAsset.delays.map(v => v / 1e2);
                let frames = data._nativeAsset.spriteFrames;

                let gifFrameData:GIFFrameData = {
                    delays: this.delays,
                    spriteFrames :this.frames,
                    length: this.frames.length,
                };
                this.delays = delays;
                this.frames = frames;
                GIFCache.getInstance().addItemFrame(this.path, gifFrameData)
                rs();
            })
        })
    }

    async loadUrl(url) {
        GIFCache.getInstance();
        return new Promise<void>((rs, rj) => {
            assetManager.loadAny({ url: url }, (err, data: any) => {
                console.log(err, data);
                if (err) {
                    rj(err);
                    return;
                }
                this.delays = data.delays.map(v => v / 1e2);
                this.frames = data.spriteFrames;
                this.play(true);
                rs();
            })
        })
    }


    play(loop = false, playNext = false) {
        if (!playNext) {
            this.stop();
        }
        if (this.frames.length) {
            if (this.frameIdx >= this.frames.length) {
                this.frameIdx = 0;
                if (!loop) {
                    return;
                }
            }
            this.gifSp.spriteFrame = this.frames[this.frameIdx];
            let dt = this.delays[this.frameIdx] < 0.1 ? 0.1 : this.delays[this.frameIdx];
            this.scheduleOnce(() => {
                this.play(loop, true);
            }, dt);
            this.frameIdx++;
        }
    }
    stop() {
        this.frameIdx = 0;
        this.unscheduleAllCallbacks();
    }
}