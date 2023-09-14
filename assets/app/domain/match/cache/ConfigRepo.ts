import {MatchConfig} from "../config/MatchConfig";
import { MemCache } from "bos/exports"; 

export class ConfigRepo {
    private configCache = new MemCache<string, MatchConfig>();

    getConfig(key : string, updateAt ?: number) : MatchConfig {
        let config = this.configCache.get(key)
        if (config) {
            if (!updateAt || config.getUpdateAt() == updateAt){
                return config
            }
        }
        return null
    }

    setConfig(key : string, config : MatchConfig) {
        if (config) {
            this.configCache.set(key, config)
        } else {
            this.configCache.delete(key)
        }
    }
}