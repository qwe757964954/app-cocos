import { EmptyClass, EventTargetExtends, Log } from "bos/exports";
import { Vec2, Vec4, macro, math, view, screen, ResolutionPolicy, sys } from "cc";

export enum OrientationPolicy {
    Portrait = macro.ORIENTATION_PORTRAIT, // 1
    Landscape = macro.ORIENTATION_LANDSCAPE, // 2
    Auto = macro.ORIENTATION_AUTO, // 3
}

// 0 indicates no rotation,
// 1 indicates 90 degrees,
// 2 indicates 180 degrees,
// 3 indicates 270 degrees.
// Positive values are counterclockwise; negative values are clockwise.
// https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
export enum Orientation {
    PORTRAIT = 0,
    LANDSCAPE_LEFT = -90,
    PORTRAIT_UPSIDE_DOWN = 180,
    LANDSCAPE_RIGHT = 90
}

type ResolutionData = {
    x: number,
    y: number,
    policy: number,
}

type ScreenParams = {
    // designResolution: { x: number, y: number },
    orientationPolicy: OrientationPolicy,
    orientation: Orientation,
}

export class ScreenMgr extends EventTargetExtends(EmptyClass) {
    private _orientationPolicy: OrientationPolicy;
    private _rawResolution: { x: number; y: number; };
    private _resolutionData: ResolutionData;
    
    public orientation: Orientation;

    get isPortrait() { 
        return this.orientation == Orientation.PORTRAIT || this.orientation == Orientation.PORTRAIT_UPSIDE_DOWN 
    }

    static EventType = {
        orientation_changed: "orientation_changed",
    }

    init(params: ScreenParams) {
        Log.i("ScreenMgr.init", params)
        this._rawResolution = view.getDesignResolutionSize()
        this._orientationPolicy = params.orientationPolicy
        this.orientation = params.orientation
        
        view.setOrientation(this._orientationPolicy)
        view.setResizeCallback((...args: any[]) => {
            Log.i("ScreenMgr.onViewResizeCallback", ...args)
            this.updateOrientation()
            this.updateDesignResolution()
        });

        this.updateOrientation()
        this.updateDesignResolution()
    }

    rotate() {
        Log.w("ScreenMgr.rotate", this.orientation)
        if (this.isPortrait) {
            this.setOrientation(OrientationPolicy.Landscape)
        } else {
            this.setOrientation(OrientationPolicy.Portrait)
        }
    }

    private updateOrientation() {
        const winSize = screen.windowSize
        const orientation = winSize.x < winSize.y ? Orientation.PORTRAIT : Orientation.LANDSCAPE_LEFT
        this.orientation = orientation
        this.emit(ScreenMgr.EventType.orientation_changed, orientation)
        Log.i("ScreenMgr.updateOrientation", this.orientation)
    }

    private updateDesignResolution() {
        let winSize = screen.windowSize;
        let winRatio = winSize.width / winSize.height;
        let designSize = view.getDesignResolutionSize();
        let designRatio = designSize.width / designSize.height;
        const visibleSize = view.getVisibleSize();
        const visibleRatio = visibleSize.x / visibleSize.y
        Log.i(`ScreenMgr.updateDesignResolution...winSize:${winSize}, visibleSize:${view.getVisibleSize()}, designSize:${designSize}`)
        let resolutionData: ResolutionData = undefined
        if (this.isPortrait) {
            resolutionData = {
                x: this._rawResolution.x,
                y: this._rawResolution.y,
                policy: winRatio <= designRatio ? ResolutionPolicy.FIXED_WIDTH : ResolutionPolicy.FIXED_HEIGHT,
            }
        } else {
            resolutionData = {
                x: this._rawResolution.y,
                y: this._rawResolution.x,
                policy: winRatio <= designRatio ? ResolutionPolicy.FIXED_WIDTH : ResolutionPolicy.FIXED_HEIGHT,
            }
        }
        if (!this._resolutionData ||
            resolutionData.x !== this._resolutionData.x ||
            resolutionData.y !== this._resolutionData.y ||
            resolutionData.policy !== this._resolutionData.policy) {
            Log.i("ScreenMgr.updateDesignResolution", resolutionData, this._resolutionData)
            view.setDesignResolutionSize(resolutionData.x, resolutionData.y, resolutionData.policy)
            this._resolutionData = resolutionData
        }
    }

    setOrientation(orientation: OrientationPolicy) {
        view.setOrientation(orientation)
    }
}