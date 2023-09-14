import { EmptyClass, EventTargetExtends } from "bos/exports";
import { Gateway } from "./Gateway";
import { Repo } from "./Repo";
import { Wallet } from "./Wallet";

class WalletMgr extends EventTargetExtends(EmptyClass) {
    gateway: Gateway
    repo: Repo

    constructor() {
        super()
        this.gateway = new Gateway()
        this.repo = new Repo()
    }

    setUid(uid: number) {
        this.getUserWallet(uid)
    }

    getUserWallet(uid: number) {
        let wallet = this.repo.get(uid) 
        if (!wallet) {
            wallet = new Wallet(uid, this)
        }
        if (!wallet.isValid()) {
            this.refreshWallet(wallet)
        }
        return wallet
    }

    async refreshWallet(wallet: Wallet) {
        let t = await this.gateway.getUserAsset(wallet.uid)
        if (t) {
            wallet.update(t)
        }
        return wallet
    }
}

export {WalletMgr}