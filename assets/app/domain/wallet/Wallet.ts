import { AssetType } from "idl/tss/common/common_define"
import { BatchGetUserAssetResp_AssetAmount } from "idl/tss/hall/wallet.v2"

const EXPIRE_AT = 3*1000

interface WalletDelegate {
    refreshWallet(wallet: Wallet)
}

export class Wallet {
    public uid = 0
    private assetInfo = new Map<number, number>()
    private updateAt = 0
    private delegate: WalletDelegate

    constructor(uid, delegate) {
        this.uid = uid
        this.delegate = delegate
    }

    get coin() {
        return this.assetInfo.get(AssetType.AssetTypeCoin) || 0
    }

    get mung() {
        return this.assetInfo.get(AssetType.AssetTypeMung) || 0
    }

    get diamond() {
        return this.assetInfo.get(AssetType.AssetTypeDiamond) || 0
    }
    
    update(assets: BatchGetUserAssetResp_AssetAmount[]) {
        assets.forEach((asset)=>{
            this.assetInfo.set(asset.assetType, asset.amount)
        })
        this.updateAt = Date.now()
    }

    isValid() {
        return Date.now() - this.updateAt < EXPIRE_AT
    }

    async finish() {
        if (this.isValid()) {
            return this
        }
        return this.delegate.refreshWallet(this)
    }
}