import {AppConfig} from './AppConfig';
import { Audio, Log, Screen, resLoader, uiMgr } from 'bos/exports';
import { NotchAdapter } from 'bos/framework/adapter/NotchAdapter';
import { AudioSource, macro, sys } from 'cc';
import { Prefab } from 'cc';
import { director } from 'cc';
import { instantiate } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIDelegate')
export class UIDelegate extends Component {
    private loadingPrefab = undefined
    private alertPrefab = undefined
    private toastPrefab = undefined

    @property(Prefab)
    private notch: Prefab

    @property(AudioSource)
    private bgmSource: AudioSource

    @property(AudioSource)
    private effectSource: AudioSource

    async loadModules() {
        return new Promise(resolve=>{
            this.schedule(()=>{
                if (this.loadingPrefab && this.alertPrefab && this.toastPrefab) {
                    resolve(true)
                    this.unscheduleAllCallbacks()
                }
            }, 0, macro.REPEAT_FOREVER)
        })
    }
    
    onLoad() {
        Log.d("UIDelegate.onLoad")

        Screen.screenMgr.init({
            orientation: Screen.Orientation.PORTRAIT,
            orientationPolicy: sys.isBrowser ? Screen.OrientationPolicy.Auto : Screen.OrientationPolicy.Portrait,
        })

        if (!sys.isNative) {
            NotchAdapter.setNotchInfo(AppConfig.debug?.notchInfo)

            let node = instantiate(this.notch)
            this.node.addChild(node)
        }

        director.addPersistRootNode(this.node)

        resLoader.loadBundle("common", (err, bundle)=>{
            console.log("load common bundle", err, bundle)
            bundle.getBundle().load("loading/res/prefab/Loading", (err, asset)=>{
                console.log("load loading prefab", err, asset)
                this.loadingPrefab = asset
            })

            bundle.getBundle().load("toast/res/prefab/Toast", (err, asset)=>{
                console.log("load toast prefab", err, asset)
                this.toastPrefab = asset
            })

            bundle.getBundle().load("alertview/res/prefab/AlertView", (err, asset)=>{
                console.log("load alert prefab", err, asset)
                this.alertPrefab = asset
            })
        })

        uiMgr.setDelegate({
            getLoadingView: ():Node=>{
                return instantiate(this.loadingPrefab)
            },
            getToastView: ():Node=>{
                return instantiate(this.toastPrefab)              
            },
            getAlertView: ():Node=>{
                return instantiate(this.alertPrefab)
            },
            getPersistRootNode: ():Node=>{
                return this.node
            },
        })

        Audio.init({
            BGM: this.bgmSource,
            Effect: this.effectSource,
        })
    }
}

