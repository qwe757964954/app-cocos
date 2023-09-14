import { QueryQueue } from "bos/base/queryqueue/QueryQueue"
import { Log } from "bos/exports"
import { AssetType } from "idl/tss/common/common_define"
import { BatchGetUserAssetReq, BatchGetUserAssetResp_AssetAmount, Wallet } from "idl/tss/hall/wallet.v2"

export class Gateway {
    private queryQueue = new QueryQueue({
        delegate: {
            batchQuery: async (keys: number[])=>{
                let userAssets = await this.batchGetUserAssets(keys)
                if (userAssets) {
                    let result = new Map()
                    userAssets.forEach(user => {
                        result.set(user.uid, user.asset)
                    })
                    return result
                }
            }
        },
        intervalMs: 100,
    })

    constructor() {
        this.queryQueue.run()
    }

    async getUserAsset(uid: number) : Promise<BatchGetUserAssetResp_AssetAmount[]> {
        return new Promise((resolve)=>{
            this.queryQueue.add({
                key: uid,
                cb: resolve,
            })
        })
    }

    async batchGetUserAssets(uids: number[]) {
        let ret = await Wallet.BatchGetUserAsset(new BatchGetUserAssetReq({
            uids: uids,
            assetType: [
                AssetType.AssetTypeDiamond,
                AssetType.AssetTypeMung,
                AssetType.AssetTypeCoin,
            ]
        }))
        Log.d("batchGetUserAssets...", ret, uids)
        if (ret.err) {
            return
        }
        return ret.resp.userAsset
    }
}