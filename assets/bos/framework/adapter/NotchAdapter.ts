
import { Rect, UITransform, Vec2, math, rect, screen, sys, view } from 'cc';
import { _decorator, Component, Node, Enum, Size } from 'cc';
import { YogaFlex } from '../yoga/YogaFlex';
import { CCBoolean } from 'cc';
import { NATIVE } from 'cc/env';
import { Log, Screen } from 'bos/exports';
import { DeviceInfo } from 'platform/exports';
const { ccclass, property } = _decorator;

export enum NotchPosition {
    Top = 0,
    Bottom = 1,
    Left = 2,
    Right = 3,
}

type NotchInfo = {
    SafeInsetBottom: number,
    SafeInsetLeft?: number,
    SafeInsetRight?: number,
    hasCutout: boolean,
    cutoutHeight: number,
}

@ccclass('NotchAdapter')
export class NotchAdapter extends Component {
    @property({
        displayName: "是否开启刘海屏适配",
    })
    isNotchScreen = true;

    @property({
        displayName: "刘海位置",
        type: Enum(NotchPosition),
    })
    position: NotchPosition = NotchPosition.Top;

    private static _notchInfo: NotchInfo
    private static _notchSize = new Map<number, number>()
    private _contentSize: math.Size

    start() {

    }

    onLoad(): void {
        this._contentSize = this.node.getComponent(UITransform).contentSize
        this.adapt()
        Screen.screenMgr.on(Screen.EventType.orientation_changed, ()=>{
            this.adapt()
        }, this)
    }

    protected onDestroy(): void {
        Screen.screenMgr.targetOff(this)
    }

    static setNotchInfo(notchInfo: NotchInfo) {
        NotchAdapter._notchInfo = notchInfo
        NotchAdapter.updateNotchSize()
    }

    private static updateNotchSize() {
        const notchInfo = NotchAdapter._notchInfo
        NotchAdapter._notchSize.set(Screen.Orientation.PORTRAIT, notchInfo.hasCutout ? notchInfo.cutoutHeight : 0)
        NotchAdapter._notchSize.set(Screen.Orientation.LANDSCAPE_LEFT, notchInfo.SafeInsetRight ? notchInfo.SafeInsetRight : 0)
        NotchAdapter._notchSize.set(Screen.Orientation.LANDSCAPE_RIGHT, notchInfo.SafeInsetLeft ? notchInfo.SafeInsetLeft : 0)
        NotchAdapter._notchSize.set(Screen.Orientation.PORTRAIT_UPSIDE_DOWN, notchInfo.SafeInsetBottom ? notchInfo.SafeInsetBottom : 0)
        NotchAdapter._notchSize.set(-Screen.Orientation.PORTRAIT_UPSIDE_DOWN, NotchAdapter._notchSize.get(Screen.Orientation.PORTRAIT_UPSIDE_DOWN))
        NotchAdapter._notchSize.set(360-Screen.Orientation.LANDSCAPE_LEFT, NotchAdapter._notchSize.get(Screen.Orientation.LANDSCAPE_LEFT))
    }

    async getNotchInfo() {
        if (NotchAdapter._notchInfo) {
            return NotchAdapter._notchInfo
        }
        NotchAdapter._notchInfo = await new Promise((resolve)=>{
            DeviceInfo.getCutoutInfo((data)=>{
                Log.i("NotchAdapter.getCutoutInfo...", data, sys.getSafeAreaRect())
                resolve && resolve(data)
                resolve = undefined
            })
        })
        NotchAdapter.updateNotchSize()
        return NotchAdapter._notchInfo
    }

    private async getNotchSize() {
        await this.getNotchInfo()
        let key = 0
        switch (this.position) {
            case NotchPosition.Top:
                key = Screen.Orientation.PORTRAIT
                break
            case NotchPosition.Left:
                key = Screen.Orientation.LANDSCAPE_LEFT
                break
            case NotchPosition.Bottom:
                key = Screen.Orientation.PORTRAIT_UPSIDE_DOWN
                break
            case NotchPosition.Right:
                key = Screen.Orientation.LANDSCAPE_RIGHT
                break
        }
        let notchSize = NotchAdapter._notchSize.get((Screen.screenMgr.orientation + key)%360)
        return notchSize
    }

    private async adapt() {
        let notchSize = await this.getNotchSize()
        Log.d("NotchAdapter.doAdapter", this.position, notchSize)
        if (this.isValid && this.isNotchScreen) {
            if (this.position == NotchPosition.Top || this.position == NotchPosition.Bottom) {
                let flex = this.node.getComponent(YogaFlex);
                if (flex) {
                    // flex.setSize()
                    flex.setSize("100%", notchSize)
                    flex.updateRootLayout()
                } else {
                    let ui = this.node.getComponent(UITransform)
                    if (ui) {
                        let size = this._contentSize
                        ui.setContentSize(new Size(size.width, notchSize))
                    }
                }
            } else if (this.position == NotchPosition.Left || this.position == NotchPosition.Right) {
                let flex = this.node.getComponent(YogaFlex);
                if (flex) {
                    flex.setSize(notchSize, "100%")
                } else {
                    let ui = this.node.getComponent(UITransform)
                    if (ui) {
                        let size = this._contentSize
                        ui.setContentSize(new Size(notchSize, size.height))
                    }
                }
            }
        }
    }
}


