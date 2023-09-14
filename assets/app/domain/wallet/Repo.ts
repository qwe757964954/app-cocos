import { MemCache } from "bos/exports";
import { Wallet } from "./Wallet";

class Repo {
    private cache: MemCache<number, Wallet>

    constructor() {
        this.cache = new MemCache()
    }

    get(uid: number) {
        return this.cache.get(uid)
    }

    set(uid: number, data: Wallet) {
        this.cache.set(uid, data)
    }
}

export {Repo}