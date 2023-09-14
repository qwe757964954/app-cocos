import { Prize } from "./Prize";
import { MemCache } from "bos/exports"; 

export class PrizeRepo {
    private prizeCache = new MemCache<number, Prize>();

    addPrize(u: Prize) {
        this.prizeCache.set(u.skuId, u)
    }

    getPrize(skuId: number) : Prize {
        let u = this.prizeCache.get(skuId)
        if (u)  {
            return u
        } else {
            return null
        }
    }
}