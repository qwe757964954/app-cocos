import { TimeUtil, XComponent } from "bos/exports";
import { EventTouch, Vec2, find } from "cc";
import { Vec3 } from "cc";
import { tween } from "cc";
import { Node, _decorator, view } from "cc";
import { CardView } from "game/room/module/card/src/CardView";
import { UITransform } from "cc";
import { Room } from "game/pdk/Room";
import { ObjectPool } from "game/room/component/ObjectPool";
import { Widget } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('HandCardView')
export class HandCardView extends XComponent {
	@property(Node)
	managedNode : Node

    @property(Node)
    public cardsView: Node;
    @property(Node)
    public otherTouch: Node;


    private objectPool: ObjectPool;
    private otherTouchTime: number = 0;
    public popupCard: Map<string, Node> = new Map();

    onLoad(): void {
        this.bindTouch();
        this.managedNode.active = false;
        this.objectPool = find('Canvas').getComponent(ObjectPool);
        this.otherTouch.on(Node.EventType.TOUCH_END, this.onOtherTouch, this);
    }
    
    setup(botH: number = 0): void {
        let managedBg = this.managedNode.getChildByName('managedBg');
        managedBg.getComponent(Widget).bottom = -botH - 170;
        let dx = view.getVisibleSize().height - botH - 1920;
        if (botH > 0 && dx < 0) {
            this.node.getComponent(Widget).bottom = 170 + dx;
        }
    }


    onDisable(): void {
        this.unbindTouch();
        this.resetPopupCard();
        this.otherTouch?.off(Node.EventType.TOUCH_END, this.onOtherTouch, this);
    }

    onOtherTouch() {
        let nowTime = TimeUtil.getTimestamp();
        if (nowTime - this.otherTouchTime <= 1000) {
            this.resetHandCard();
        }
        this.otherTouchTime = nowTime;
    }

    /**
     * 添加手牌
     * @param data {
            cards = {0x1,0x2....},  要插入的牌
            isReverse = ,  是否创建背面handCard
        }
     */
    addCards(cards: number[], isReverse?: boolean): Node[] {
        let cardArr: Node[] = [];
        for (const byte of cards) {
            let param = { cardByte: byte, isReverse: isReverse, scale: 1.05 };
            let cardView = this.objectPool.get({param: param, name: 'CardView'});
            cardArr.push(cardView);
        }
        return cardArr;
    }

    // 添加手牌
    addHandCards(cards: Node[]) {
        if (cards?.length == 0) { return; }
        cards.sort((cardA, cardB) => cardA.getComponent(CardView).cardByte - cardB.getComponent(CardView).cardByte);
        cards.forEach(node => {
            this.cardsView.addChild(node);
        });
    }

    /**
     * 移除手牌
     * @param values 
     */
    removeHandCards(values?: number[]) {
        let children = this.getHandCards();
        let mine = Room.gameData.getMySelf();
        if (values?.length > 0) {
            for (const byte of values) {
                for (const node of children) {
                    if (node.getComponent(CardView).cardByte == byte) {
                        this.objectPool.put(node);
                        break;
                    }
                }
            }
            mine.removeCards(values);
            this.resetPopupCard();
        } else {
            for (let i = children.length - 1; i >= 0; i--) {
                this.objectPool.put(children[i]);
            }
            mine.cleanCard();
        }
    }

    resetHandCard() {
        let children = this.getHandCards();
        for (let i = 0; i < children.length; i++) {
            this.playTakeTrack(children[i], i);
        }
    }

    // 获取手牌
    getHandCards(): Node[] {
        return this.cardsView.children;
    }

    // 获取手牌数量
    getHandCardsCount(): number {
        return this.cardsView.children.length;
    }

    // 给手牌绑定触摸事件
    bindTouch() {
        this.unbindTouch();
        this.cardsView.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.cardsView.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.cardsView.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    // 解绑touch事件
    unbindTouch() {
        this.cardsView.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.cardsView.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.cardsView.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchCancel() {
        this.resetHandCard();
    }
    onTouchMove(event: EventTouch) {
        let endIndex = -1;
        let startIndex = -1;
        let touchPos = event.getUILocation();
        let startPos = event.getUIStartLocation();
        let children = this.cardsView.children;
        if (!children[0]) { return };
        let uiComp = this.cardsView.getComponent(UITransform);
        let endPos = uiComp.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y));
        let startPos2 = uiComp.convertToNodeSpaceAR(new Vec3(startPos.x, startPos.y));

        for (let i = children.length - 1; i >= 0; i--) {
            let boundingBox = children[i]?.getComponent(UITransform)?.getBoundingBox();
            if (!boundingBox) { continue };
            if (startIndex < 0 && boundingBox.contains(new Vec2(startPos2.x, startPos2.y))) {
                startIndex = i;
            }
            if (endIndex < 0 && boundingBox.contains(new Vec2(endPos.x, endPos.y))) {
                endIndex = i;
            }
        }
        let index = [Math.min(endIndex, startIndex), Math.max(endIndex, startIndex)];
        for (let i = 0; i < children.length; i++) {
            children[i].getComponent(CardView).isSelected = index[0] <= i && index[1] >= i;
        }
    }
    onTouchEnd(event: EventTouch) {
        let endIndex = -1;
        let startIndex = -1;
        let touchPos = event.getUILocation();
        let startPos = event.getUIStartLocation();
        let children = this.cardsView.children;
        if (!children[0]) { return };
        let uiComp = this.cardsView.getComponent(UITransform);
        let endPos = uiComp.convertToNodeSpaceAR(new Vec3(touchPos.x, touchPos.y));
        let startPos2 = uiComp.convertToNodeSpaceAR(new Vec3(startPos.x, startPos.y));

        for (let i = children.length - 1; i >= 0; i--) {
            let boundingBox = children[i]?.getComponent(UITransform)?.getBoundingBox();
            if (!boundingBox) { continue };
            if (startIndex < 0 && boundingBox.contains(new Vec2(startPos2.x, startPos2.y))) {
                startIndex = i;
            }
            if (endIndex < 0 && boundingBox.contains(new Vec2(endPos.x, endPos.y))) {
                endIndex = i;
            }
        }
        console.log(`onTouchEnd_${event.target.name}, startIndex is ${startIndex}, endIndex is ${endIndex}`);
        let index = [Math.min(endIndex, startIndex), Math.max(endIndex, startIndex)];
        this.setCardPopByIndex(index);
    }

    setCardPopByIndex(index: number[]) {
        let children = this.getHandCards();
        for (let i = 0; i < children.length; i++) {
            if (index[0] <= i && index[1] >= i) {
                const node = children[i];
                this.playTakeTrack(node, i, !node?.getComponent(CardView).isPopup);
            }
        }
    }

    playTakeTrack(node: Node, index: number, isPopup: boolean = false) {
        let dy = isPopup ? 60 : 0;
        let pos = this.getCardPosByIndex(index);
        tween(node).to(0.1, { position: new Vec3(pos.x, pos.y + dy) }).call(() => {
            node.getComponent(CardView).isPopup = isPopup;
            node.getComponent(CardView).isSelected = false;
            if (isPopup) {
                this.popupCard.set(node.uuid, node);
            } else {
                this.popupCard.delete(node.uuid);
            }
            this.node.emit('NotifyCardPopup');
        }).start();
    }

    /**
     * 根据索引号获取手牌坐标
     * @param i 卡牌序号
     * @returns 
     */
    getCardPosByIndex(i: number): Vec3 {
        let mine = Room.gameData.getMySelf();
        let length = mine.getHandCardNum();
        let CardSize = { width: 219.5, height: 310.8 };
        let max = length > 10 ? Math.ceil(length / 2) : length;
        let rowList = [max, Math.max(length - max, 0)];
        let parentSize = this.cardsView.getComponent(UITransform);
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

    // 点击提示，设置要提起的牌的状态
    setPromptCards(map: Map<number, boolean>) {
        console.log('==setPromptCards==', map);
        let children = this.getHandCards();
        for (let i = 0; i < children.length; i++) {
            const node = children[i];
            let ret = map.get(node.getComponent(CardView).cardByte);
            this.playTakeTrack(node, i, ret);
        }
    }

    // 获取提起的牌
    getPopUpCard(): Map<string, Node> {
        return this.popupCard;
    }

    resetPopupCard() {
        this.popupCard.clear();
    }
}


