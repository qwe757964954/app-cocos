import { _decorator, Component, instantiate, isValid, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { resLoader } from 'bos/exports';
import { PoolItem } from './PoolItem';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';

@ccclass('PoolView')
export class PoolView extends BaseMatchView {
    @property(Node)
    poolContentNode : Node
    
    roomInfo : RoomInfo
    handler : MatchHandler
    poolNodes : PoolItem[] = []
    params : any

    getData(): any {
        return this.params
    }

    onEnable() {
        console.debug("PoolView onEnable and register event")
        this.addMatchEventListener()
    }

    onDisable() {
        console.debug("PoolView onDisable and unregister event")
        this.removeMatchEventListener()
    }

    addMatchEventListener(){
        if (this.handler){
            this.handler.on(MatchHandler.EventType.PoolChange, this.onPoolChange, this)
        }
    }

    removeMatchEventListener(){
        if (this.handler){
            this.handler.off(MatchHandler.EventType.PoolChange, this.onPoolChange, this)
        }
    }

    onPoolChange(){
        this.poolChange()
    }

    updateView(handler : MatchHandler, params) {
        this.handler = handler
        this.params = params
        this.roomInfo = this.handler.roomInfo

        this.addMatchEventListener()

        let rankPrize = this.roomInfo.config.getRankPrize(this.roomInfo.getPrizePool(), this.roomInfo.baseInfo.getDynamicStageId(), true)
        this.updatePool(rankPrize)
    }

    updatePool(rankPrizes){
        let totalPool = rankPrizes.totalPool
        this.poolContentNode.destroyAllChildren()
        for (let index = 0; index < 2; index++) {
            if (totalPool && totalPool[index]) {
                resLoader.loadPrefab("match@officialMatch/res/prefab/detail/PoolItem", (err, prefab)=>{
                    if (err || !isValid(this.node)) {
                        return
                    }

                    let item = instantiate(prefab)
                    this.poolContentNode.addChild(item)
                    item.getComponent(PoolItem).updateView(this.handler, {
                        asset : totalPool[index],
                        basePool : rankPrizes.basePool,
                        enterIncPoolSwitch : rankPrizes.enterIncPoolSwitch,
                        enterIncPool : rankPrizes.enterIncPool,
                        revivalIncPoolSwitch : rankPrizes.revivalIncPoolSwitch,
                        revivalIncPool : rankPrizes.revivalIncPool,
                        index : index,
                        needLine : totalPool.length > 1 && index == 1,
                    })

                    this.poolNodes.push(item.getComponent(PoolItem))
                })
            }
        }
    }
    
    poolChange(){
        this.showPoolChange()
    }

    showPoolChange() {
        const totalPool = this.roomInfo.getPrizePool();
        const basePool = this.roomInfo.config.getBasePool();
        const showAssets: { [key: string]: { name: string, amount: number, total: number } } = {};
        if (totalPool && basePool) {
            for (let i = 0; i < 2; i++) {
                const baseAsset = basePool[i];
                if (baseAsset) {
                    for (const v of totalPool) {
                        if (v.id === baseAsset.id && v.type == baseAsset.type) {
                            showAssets[v.id] = {
                                name: baseAsset.name,
                                amount: Math.floor(v.amount) - baseAsset.amount,
                                total: Math.floor(v.amount),
                            };
                            break;
                        }
                    }
                }
            }
        }

        for (const i in this.poolNodes) {
            let asset = this.poolNodes[i].getAsset()
            if (asset && showAssets[asset.id]) {
                this.poolNodes[i].showChange(showAssets[asset.id].total);
            }
        }
    }

    onDestroy(): void {
        this.removeMatchEventListener()
    }
}