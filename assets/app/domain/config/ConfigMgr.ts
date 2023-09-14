import { Log } from "bos/exports";
import Config from "./Config";
import { Gateway } from "./Gateway";
import { keys } from "./Keys";
import { Picture } from "qsdk/exports";

class ConfigMgr {
    public config: Config;
    private gateway: Gateway

    constructor() {
        this.gateway = new Gateway()

        switch (AppConfig.channel) {
            default:
                this.config = new Config(this);
        }

        Picture.setUrlConvertor((url: string) => {
            if (url.indexOf("://") < 0) {
                return this.config.cmsPre + url;
            }
            return url
        })
    }

    setUid(uid: any) {
        this.batchLoadConfig([
            keys.tss_hall_theme_gray, 
            keys.tss_hall_chat_voice, 
            keys.tss_hall_cdn_info_v1
        ])
    }

    async loadConfig(key: string) {
        let ret = await this.gateway.getAppConfValue(key)
        if (ret) {
            this.config.set(ret.key, ret.content)
        }
    }

    async batchLoadConfig(keys: string[]) {
        let ret = await this.gateway.batchGetAppConfValue(keys)
        if (ret) {
            ret.forEach((e)=>{
                this.config.set(e.key, e.content)
            })
            Log.i("batchLoadConfig...", ret)
        }
    }
}

export {ConfigMgr}