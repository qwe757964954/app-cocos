import { resLoader, uiMgr } from "bos/exports";
import { NavConfig, NavItem } from "./NavConfig";
import { UIParams } from "bos/framework/gui/UIMgr";

export class NavMgr {

    private _config = new NavConfig()

    async loadConfig() {

    }

    get config() { return this._config }

    navTo(item: NavItem, params?: UIParams, callback?) {
        if (item.scene) {
            uiMgr.loadScene(item.scene, item.params || params, callback)
        } else {
            uiMgr.loadPage(item.page, item.params || params, callback)
        }
    }

    init() {
        console.log("NavMgr.init...", Object.keys(this._config))
        Object.keys(this._config).forEach(key => {
            const value = this._config[key]
            if (value.preload) {
                const pkg = value.page || value.scene
                const arr = pkg.split("@")
                resLoader.loadBundle(arr[0], (err, bundle) => {
                    console.log(`preload ${arr[0]} bundle complete`)
                    value.preload.forEach(path => {
                        let tips = `preload ${arr[0]} bundle ${path} dir finish`
                        console.time(tips)
                        bundle.getBundle().preloadDir(path, (finished: number, total: number, item: any) => {
                            // console.log("preload -> ", path, finished, total,item.uuid)
                            // console.log("preload -> ", path, finished / total)
                        }, (err, assets) => {
                            console.timeEnd(tips)
                        })
                    })
                })
            }
        })
    }
}