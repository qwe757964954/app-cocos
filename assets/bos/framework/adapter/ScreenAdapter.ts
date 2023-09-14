import { Log } from "bos/exports";
import { ResolutionPolicy, screen } from "cc";

import { _decorator, Component, Node, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ScreenAdapter")
export class ScreenAdapter extends Component {

    onLoad() {
        view.setResizeCallback((...args: any[]) => {
            Log.w("ScreenAdapter.onViewResize", ...args)
            this.adapt()
        });
        this.adapt();
    }

    private adapt() {
        let winSize = screen.windowSize;
        let winRatio = winSize.width / winSize.height;
        let designSize = view.getDesignResolutionSize();
        let designRatio = designSize.width / designSize.height;
        const visibleSize = view.getVisibleSize();
        const visibleRatio = visibleSize.x/visibleSize.y
        Log.i(`ScreenAdapter.adapt...winSize:${winSize}, visibleSize:${view.getVisibleSize()}, designSize:${designSize}`)
        const policy = winRatio <= designRatio ? ResolutionPolicy.FIXED_WIDTH : ResolutionPolicy.FIXED_HEIGHT
        this.updateResolutionPolicy(policy)
    }

    private updateResolutionPolicy(policy: number) {
        view.setResolutionPolicy(policy);
        Log.w("ScreenAdapter.updateResolutionPolicy...", policy, view.getVisibleSize())
    }
}
