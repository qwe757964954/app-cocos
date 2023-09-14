import { _decorator, Node, Tween } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/pdk/Room';
import { ExtendTable, MsgDealCard, MsgTableInfo, PlayCardResult } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { MsgManaged, Table } from "idl/tss/game/table.v2";
import { CardView } from 'game/room/module/card/src/CardView';
import { Vec3 } from 'cc';
import { UITransform } from 'cc';
import { tween } from 'cc';
import { GameStage, Identity } from 'game/pdk/model/GameConst';
import { AnimLayer } from 'game/pdk/module/animLayer/src/component/AnimLayer';
import { find } from 'cc';
import { Animation } from 'cc';
import { MateMgr } from 'app/domain/mate/MateMgr';
import { HandCardView } from 'game/room/module/handCardView/src/component/HandCardView';

const CardSize = {
    width: 219.5,
    height: 310.8
}


@ccclass('HandCard')
export class HandCard extends XComponent {

    @property(HandCardView)
    public handCardView: HandCardView;
    @property(Node)
    public managedNode: Node;
    @property(Node)
    public cardBack: Node;
    @property(Animation)
    public autoPlay: Animation;

    public animLayer: Node;

    onLoad() {
        this.cardBack.active = false;
        this.managedNode.active = false;
        Room.eventSystem.on('NotifyBanker', this.onNotifyBanker, this);
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyDealCard.name, this.onNotifyDealCard, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayCard.name, this.onNotifyPlayCard, this);
        Room.matchMgr.on(MateMgr.EventType.ON_GAME_RESULT, this.onNotifyGameResult, this);
        Room.eventSystem.on(ExtendTable.NotifyGameStart.name, this.onNotifyGameStart, this);
    }

    protected start(): void {
        let iPhoneBot = find('Canvas/SceneBg/iPhoneBot');
        let botH = iPhoneBot?.getComponent(UITransform)?.height || 0;
        this.handCardView.setup(botH);
    }

    onDisable() {
        Room.matchMgr.removeAll(this);
        Room.eventSystem.removeAll(this);
    }

    onNotifyGameResult() {
        this.updateAutoPlay();
        this.managedNode.active = false;
        this.handCardView.removeHandCards();
    }

    onNotifyManaged(msg: MsgManaged) {
        let cardNum = Room.gameData.getMySelf().getHandCardNum();
        let isManaged = Room.gameData.curStage != GameStage.Default && msg.isManaged;
        this.managedNode.active = isManaged && cardNum > 1;
    }

    onNotifyPlayCard(data: PlayCardResult) {
        if (data.uid == Room.gameData.getMyID()) {
            if (data.cards?.length > 0) {
                this.removeHandCards(data.cards);
                this.updateAutoPlay();
            } else {
                this.handCardView.resetHandCard();
            }
        }
    }

    onNotifyGameStart() {
        this.updateAutoPlay();
        this.managedNode.active = false;
    }

    onNotifyReconnect(msg: MsgTableInfo) {
        console.log('=handCard.onNotifyReconnect===', msg)
        for (const v of msg.users) {
            let player = Room.gameData.getPlayerByID(v.uid);
            if (v.handCards?.uint32s_value) {
                let value = v.handCards.uint32s_value.value;
                if (v.uid == Room.gameData.getMyID()) {
                    this.managedNode.active = false;
                    if (Room.gameData.curStage == GameStage.DealCard) {
                        this.playHandCardAnim(value);
                    } else {
                        this.updateHandCard(value);
                    }
                    this.updateAutoPlay();
                } else {
                    player.setCards(value);
                }
            } else {
                player.setCards([]);
            }
        }
    }

    onNotifyDealCard(data: MsgDealCard) {
        console.log('=handCard.onNotifyDealCard=', data)
        for (const v of data.dealCards) {
            if (v.uid == Room.gameData.getMyID()) {
                this.cardBack.active = true;
                this.playHandCardAnim(v.value?.uint32s_value?.value);
                break;
            }
        }
    }

    onNotifyBanker(uid: number) {
        Room.gameData.getMyID() == uid && this.addHandCards(Room.gameData.bottomCards);
    }
    
    updateAutoPlay() {
        if (Room.gameData.curStage == GameStage.PlayCard && Room.gameData.getMySelf().getHandCardNum() == 1) {
            this.autoPlay.node.active = true;
            this.autoPlay.play();
        } else {
            this.autoPlay.node.active = false;
        }
    }

    /**
     * 根据索引号获取手牌坐标
     * @param length 手牌总数量
     * @param i 卡牌序号
     * @returns 
     */
    getCardPosByIndex(length: number, i: number): Vec3 {
        // TODO 暂时只考虑三人斗地主
        let max = length > 10 ? Math.ceil(length / 2) : length;
        let rowList = [max, Math.max(length - max, 0)];
        let parentSize = this.handCardView.cardsView.getComponent(UITransform);
        let lastW = parentSize.width - CardSize.width;

        let row = i < rowList[0] ? 1 : 2;
        let rowMaxNum = rowList[row - 1];
        let column = (i + 1) % rowList[0];
        column == 0 && (column = rowList[0]);
        let dx = Math.min(82, Math.ceil(lastW / (rowMaxNum - 1)));
        let contentW = dx * (rowMaxNum - 1) + CardSize.width;
        let left = (parentSize.width - contentW) / 2;
        let y = (1 - row) * 140 + parentSize.height / 2 - CardSize.height / 2;
        let x = left + (column - 1) * dx - parentSize.width / 2 + CardSize.width / 2;
        return new Vec3(x, y - 60);
    }

    /**
     *  手牌插入
     * @param values 
     */
    addHandCards(values: number[]) {
        let insertChildren = new Map();
        let nodes = this.handCardView.addCards(values);
        let children = this.handCardView.cardsView.children;
        this.sortCards(nodes);
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            insertChildren.set(node.uuid, true);
            let startIndex = 0;
            for (let j = startIndex; j < children.length; j++) {
                const child = children[j];
                let nodeValue = node.getComponent(CardView).cardValue
                let childValue = child.getComponent(CardView).cardValue;
                if (nodeValue > childValue) {
                    startIndex = j;
                    this.handCardView.cardsView.insertChild(node, j);
                    break;
                } else if (nodeValue == childValue) {
                    let index = child.getComponent(CardView).cardColor > node.getComponent(CardView).cardColor ? (j + 1) : j;
                    this.handCardView.cardsView.insertChild(node, index);
                    startIndex = index;
                    break;
                } else if (nodeValue < childValue && j == children.length - 1) {
                    this.handCardView.cardsView.insertChild(node, j + 1);
                    startIndex = j + 1;
                }
            }
            if (children.length == 0) {
                this.handCardView.cardsView.insertChild(node, 0);
            }
        }
        for (let i = 0; i < children.length; i++) {
            let node = children[i];
            node.getComponent(CardView).isLord = true;
            let pos = this.getCardPosByIndex(children.length, i);
            if (insertChildren.get(node.uuid)) {
                node.setPosition(pos);
            } else {
                tween(node).to(0.1, { position: pos }).start();
            }
        }
        this.handCardView.resetPopupCard();
    }

    /**
     * 移除手牌
     * @param values 
     */
    removeHandCards(values: number[]) {
        this.handCardView.removeHandCards(values);
        let children = this.handCardView.cardsView.children;
        for (let i = 0; i < children.length; i++) {
            let node = children[i];
            node.getComponent(CardView).isPopup = false;
            tween(node).to(0.1, { position: this.getCardPosByIndex(children.length, i) }).start();
        }
    }

    updateHandCard(values: number[]) {
        this.handCardView.removeHandCards();
        if (!values || values?.length == 0) { return }
        let mine = Room.gameData.getMySelf();
        mine.setCards(values);
        let nodes = this.handCardView.addCards(values);
        this.sortCards(nodes);

        let isLord = mine.identity == Identity.Dealer;
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            this.handCardView.cardsView.addChild(node);
            node.getComponent(CardView).isLord = isLord;
            node.setPosition(this.getCardPosByIndex(nodes.length, i));
        }
        this.handCardView.resetPopupCard();
    }

    /**
     * 发牌动画
     * @param values 
     */
    playHandCardAnim(values: number[]) {
        if (values?.length > 0) {
            this.handCardView.removeHandCards();
            let mine = Room.gameData.getMySelf();
            mine.setCards(values);
            Room.msgHandler.stopMsgQueue();
            let nodes = this.handCardView.addCards(values, true);
            this.sortCards(nodes);
            let cardNum = Math.ceil(nodes.length / 3);
            this.animLayer = this.animLayer || find('Canvas/contentLayer/AnimLayer');
            let worldPos = this.cardBack.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO);
            let backPos = this.handCardView.cardsView.getComponent(UITransform).convertToNodeSpaceAR(worldPos);

            for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i];
                node.setPosition(backPos);
                node.scale = new Vec3(0.67, 0.67);
                this.handCardView.cardsView.addChild(node);
                let pos = this.getCardPosByIndex(nodes.length, i);
                let delayTime = 0.4 / cardNum * i + Math.floor((i + 1) / cardNum) * 0.4;

                let func = () => { node.getComponent(CardView).isReverse = false };
                if (i == nodes.length - 1) {
                    func = () => {
                        this.cardBack.active = false;
                        node.getComponent(CardView).isReverse = false;
                        this.animLayer.getComponent(AnimLayer).playBotCardAnim();
                        Room.msgHandler.startMsgQueue();
                    }
                }

                Tween.stopAllByTarget(node);
                tween(node).delay(delayTime).to(0.4, { position: pos, scale: new Vec3(1, 1) }).call(func).start();
            }
        }
    }

    /**
     * 手牌排序
     * @param cardArr 
     */
    sortCards(cardArr: Node[]) {
        cardArr.sort((cardA, cardB) => {
            let ret = cardB.getComponent(CardView).cardValue - cardA.getComponent(CardView).cardValue;
            if (ret == 0) {
                ret = cardB.getComponent(CardView).cardColor - cardA.getComponent(CardView).cardColor;
            }
            return ret;
        });
    }

    /**
     * 取消托管
     */
    onClickCancelManaged() {
        this.managedNode.active = false;
        Table.StopManaged({}, { ext: Room.msgHandler.tableKey });
    }
}