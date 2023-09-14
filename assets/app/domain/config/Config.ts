import { MemCache } from "bos/exports";
import { keys } from "./Keys";

interface ConfigDelegate {
    loadConfig(key: string) : Promise<string>
}

const EXPIRE_AT = 60 * 1000 * 5

class Config {
    private cache = new MemCache()
    private delegate: ConfigDelegate

    constructor(delegate) {
        this.delegate = delegate
    }

    set(key: string, value: any) {
        console.log("setConfigValue", key, value)
        this.cache.set(key, value, EXPIRE_AT)
        if (key == keys.tss_hall_cdn_info_v1) {
            this.cdnAddr = JSON.parse(value)
            console.log("setCdnAddr", this.cdnAddr)
        }
    }

    async get(key: string, defaultValue: any) {
        let value = this.cache.get(key)
        if (value) {
            return value
        }
        value = await this.delegate.loadConfig(key)
        return value || defaultValue
    }

    cdnAddr = {
        CDNAddr: "http://public-picup.oa.com/",
        CDNCMSPre: "http://public-picup.oa.com:8083/user-upload",
        CDNFileUpAddr: "/266/",
        CDNPre: "http://192.168.203.42:8889/",
        CDNUploadAddr: "http://266-resources.oa.com/",
    };

    get cmsPre() {
        return this.cdnAddr.CDNCMSPre
    }

    get isOpenFreeChat() {
        return this.cache.get(keys.tss_hall_match_MatchChat)
    }
}

export default Config