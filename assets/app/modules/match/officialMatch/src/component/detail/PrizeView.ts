import { _decorator, Component, Node, Pool } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { NetImageEx } from 'app/components/NetImageEx';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { PrizeConfigItem } from './PrizeConfigItem';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Log, resLoader, TableView } from 'bos/exports';
import { Utils } from 'app/utils/Utils';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { isValid } from 'cc';
import { PoolItem } from './PoolItem';
import { ShowRank } from 'app/domain/match/config/MatchConfig';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';

enum ContentType {
    Type_None,
    Type_Pool,
    Type_TopPrize,
    Type_Normal,
}

@ccclass('PrizeView')
export class PrizeView extends XComponent {
    @property(Prefab)
    priceItemPrefab : Prefab

    @property(Prefab)
    poolViewPrefab : Prefab

    @property(Prefab)
    topPrizePrefab : Prefab

    @property(TableView)
    tableView : TableView

    roomInfo : RoomInfo
    handler : MatchHandler

    _data : any[] = []
    _pool: Pool<Node> = null;
    _poolView : Node
    _topPrizeView : Node

    onLoad(): void {
        this.initPool()
    }

    onEnable() {
        console.debug("PrizeView onEnable and register event")
        this.addMatchEventListener()
    }

    onDisable() {
        console.debug("PrizeView onDisable and unregister event")
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
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.priceItemPrefab)
        }, 4, (node: Node) => {
            node.destroy();
        });
    }

    updateView(handler : MatchHandler) {
        this.handler = handler
        this.roomInfo = handler.roomInfo
        
        this.addMatchEventListener()

        let rankPrize = this.roomInfo.config.getRankPrize(this.roomInfo.getPrizePool(), this.roomInfo.baseInfo.getDynamicStageId(), true)

        this._data = []

        let poolType = this.roomInfo.config.getPrizeType()
        if (poolType == PBRegularCommon.PrizeTypeFixedAndDynamic) {
            this._data.push({type : ContentType.Type_Pool})
        }
        this._data.push({type : ContentType.Type_TopPrize})

        let ranks = rankPrize.ranks ?? []

        for (let index = 3; index < ranks.length; index++) {
            const info = ranks[index];
            this._data.push({type : ContentType.Type_Normal, data : info, index : index + 1})
        }

        this.tableView.delegate = this
        this.tableView.refresh()
    }


    allocNode(data) {
        if (data.type == ContentType.Type_Pool) {
            if (!this._poolView) {
                return instantiate(this.poolViewPrefab)
            } else {
                let node = this._poolView
                this._poolView = null
                return node
            }
        } else if (data.type == ContentType.Type_TopPrize) {
            if (!this._topPrizeView) {
                return instantiate(this.topPrizePrefab)
            } else {
                let node = this._topPrizeView
                this._topPrizeView = null
                return node
            }
        } else {
            return this._pool.alloc()
        }
    }

    freeNode(node : Node) {
        let com = node.getComponent(BaseMatchView)
        let data = com.getData()
        if (data) {
            if (data.type == ContentType.Type_Pool){
                this._poolView = node
            }else if (data.type == ContentType.Type_TopPrize){
                this._topPrizeView = node                
            } else {
                this._pool.free(node)
            }
        }
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let data = this._data[index]
        let cell = this.allocNode(data)
        if (cell){
            cell.getComponent(BaseMatchView).updateView(this.handler, data)
            return cell
        }else {
            console.error("ChatView createCell not have valid cell")
        }
    }

    releaseCell(tableView: TableView, cell: Node) {
        cell.removeFromParent()
        this.freeNode(cell)
    }

    rowCount(tableView: TableView, section: number) {
        return this._data.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(){

    }

    onDestroy(): void {
        this.removeMatchEventListener()
    }
}