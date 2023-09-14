import { QueryQueue } from "bos/exports";
import { AppConf, Conf } from "idl/tss/hall/appconf.v1";
import { keys } from "./Keys";

export class Gateway {
    private queryQueue: QueryQueue

    constructor() {
        this.queryQueue = new QueryQueue({
            delegate: {
                batchQuery: async (keys)=>{
                    let ret = await this.batchGetAppConfValue(keys)
                    let map = new Map()
                    if (!ret) {
                        ret.forEach((e)=>{
                            map[e.key] = e.content
                        })
                    }
                    return map
                }
            },
        })
    }
    async getCdnData() {
        return await this.getAppConfValue(keys.tss_hall_cdn_info_v1)
    }

    async getAppConfValue(key: string) : Promise<AppConf> {
        return new Promise((resolve)=>{
            this.queryQueue.add({
                key: resolve
            })
        })
    }

    async batchGetAppConfValue(keys: string[]) {
        let ret = await Conf.BatchGetAppConf({key: keys})
        return !ret.err && ret.resp.conf
    }
}