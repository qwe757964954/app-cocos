import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizePoolInfo, ShowRank } from 'app/domain/match/config/MatchConfig';
import { TableView } from 'bos/exports';
import { Prefab } from 'cc';
import { Pool } from 'cc';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { instantiate } from 'cc';
import { RewardItem } from './RewardItem';
import { Vec3 } from 'cc';
import { Label } from 'cc';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { Widget } from 'cc';
import { JackpotItem } from './JackpotItem';

@ccclass('RewardPage')
export class RewardPage extends XComponent {
    @property(TableView)
    tableView: TableView;

    @property(Prefab)
    itemPrefab : Prefab

    @property(Node)
    rewardNode : Node

    @property(Node)
    jackpotNode : Node

    @property(Node)
    jackpotContent : Node

    @property(Prefab)
    jackpotItemPrefab : Prefab

    @property(Node)
    dynamicNode : Node

    @property(Node)
    fixedNode : Node

    @property(Label)
    fixedLabel : Label

    private _pool: Pool<Node> = null;
    private _data: ShowRank[] = [];

    rankPrizes : PrizePoolInfo

    onLoad(): void {
        this.initPool()
    }

    updateView(rankPrizes : PrizePoolInfo) {
        this.rankPrizes = rankPrizes

        this.updateHead()
        this.updateJackpot()

        let ranks = rankPrizes.ranks
        this.setData(ranks)
    }

    updateHead() {
        if (this.rankPrizes.mixPrize) {
            this.dynamicNode.active = true
            this.dynamicNode.setPosition(new Vec3(-249.5,0,0))

            this.fixedNode.active = true
            this.fixedNode.setPosition(new Vec3(265.5,0,0))
        } else {
            this.dynamicNode.active = false

            this.fixedNode.active = true
            this.fixedNode.setPosition(new Vec3(0,0,0))
            this.fixedLabel.string = "奖励"
        }
    }

    updateJackpot() {
        let poolType = this.rankPrizes.type
        if (poolType == PBRegularCommon.PrizeTypeDynamic || poolType == PBRegularCommon.PrizeTypeFixedAndDynamic){
            this.jackpotNode.active = true

            this.rewardNode.getComponent(Widget).top = 296

            let totalPool = this.rankPrizes.totalPool ?? []
            this.jackpotContent.destroyAllChildren()
            for (let index = 0; index < totalPool.length; index++) {
                const element = totalPool[index];
                let item = instantiate(this.jackpotItemPrefab)
                this.jackpotContent.addChild(item)
                item.getComponent(JackpotItem).updateView(element, this.rankPrizes.basePool)
            }

        } else {
            this.jackpotNode.active = false
            this.rewardNode.getComponent(Widget).top = 0
        }
    }

    initPool(){
        this._pool = new Pool(() => {
            return instantiate(this.itemPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    setData(data) {
        console.debug("ObserverDialog setData", data)
        this._data = data

        this.tableView.delegate = this
        this.tableView.refresh();
    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this._pool.alloc();
        let com = cell.getComponent(RewardItem)
        com.updateView(this._data[index], this.rankPrizes.mixPrize)
        return cell;
    }

    releaseCell(tableView: TableView, cell: Node) {
        cell.removeFromParent();
        this._pool.free(cell)
    }

    rowCount(tableView: TableView, section: number) {
        return this._data.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableView: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    onDestroy(): void {
        this._pool.destroy()
    }
}