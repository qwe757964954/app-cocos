import { _decorator, Component, Node, Sprite } from 'cc';
let { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MahjongRoom } from 'game/mahjong/Room';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { Log, resLoader } from 'bos/exports';
import { Event } from 'game/mahjong/config/Event';
import { Prefab } from 'cc';
import { TingCard, TingCardInfo } from './TingCard';
import { instantiate } from 'cc';
import { TingInfo, TingItem } from 'game/mahjong/idl/tss/mahjong/extendtable';

@ccclass('TipCards')
export class TipCards extends XComponent {

    @property(Sprite)
    public tipIcon: Sprite | null = null;

    @property(Sprite)
    public tipCardsBg: Sprite | null = null;

    mPlayer: GamePlayer;
    tingList: TingItem[];
    cardPrefab: Prefab;

    onLoad(): void {
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        MahjongRoom.eventSystem.on(Event.TOUCH_TABLE, this.hideTips, this);
        MahjongRoom.eventSystem.on(Event.SHOW_TING_CARDS_INFO, this.updateTingOpInfo, this);
        this.mPlayer = MahjongRoom.gameData.getMySelf();
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_SET_TING_INFO, this.updateTingOpInfo, this);
        this.mPlayer.on(this.mPlayer.EventType.PLAYER_OP_RESULT, this.onPlayerOpResult, this);
    }

    start() {
        
    }

    resetView() {
        this.tingList = [];
        this.tipCardsBg.node.removeAllChildren();
    }

    onDestroy(): void {
        this.mPlayer?.removeAll(this);
    }

    update(deltaTime: number) {

    }

    hideTips() {
        this.tipCardsBg.node.active = false;
    }

    onPlayerOpResult() {
        this.hideTips();
    }

    //获取停牌的剩余牌张数
    getCardRemainCount(tByte: number): number {
        let cardCount = 4;
        let byte = tByte >> 8;
        return cardCount - this.getShowCountByByte(byte);
    }

    getShowCountByByte(byte: number): number {
        let count = 0;
        let playerList = MahjongRoom.gameData.getAllPlayer();

        // 找出牌区时需要过滤已被操作的牌，因而需先找操作牌区
        let checkedCardMap: { [key: number]: boolean } = {};
        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            // 找操作牌区
            let opDataList = player.getOpDataList();
            for (let j = 0; j < opDataList.length; j++) {
                let opData = opDataList[j];
                let opCards = opData.opCards;
                if (opCards && opCards.length > 0) {
                    for (let k = 0; k < opCards.length; k++) {
                        let card = opCards[k];
                        if ((card >> 8) === byte) {
                            count += 1;
                            checkedCardMap[card] = true;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < playerList.length; i++) {
            let player = playerList[i];
            if (player.getLocalSeat() === 1) {
                // 找自己的手牌
                let handCards = player.getCards();
                for (let j = 0; j < handCards.length; j++) {
                    let card = handCards[j];
                    if ((card >> 8) === byte && !checkedCardMap[card]) {
                        count += 1;
                        checkedCardMap[card] = true;
                    }
                }
            }
            // 找玩家摆出的牌
            let exposeCards = player.getExposeCards();
            for (let j = 0; j < exposeCards.length; j++) {
                let card = exposeCards[j];
                if ((card >> 8) === byte && !checkedCardMap[card]) {
                    count += 1;
                    checkedCardMap[card] = true;
                }
            }
            // 找出牌区
            let outCards = player.getOutCards();
            for (let j = 0; j < outCards.length; j++) {
                let card = outCards[j];
                // 过滤已操作的牌
                if ((card >> 8) === byte && !checkedCardMap[card]) {
                    count += 1;
                    checkedCardMap[card] = true;
                }
            }
            // 找胡牌区
            let huInfos = player.getHuOpInfos();
            for (let j = 0; j < huInfos.length; j++) {
                let huInfo = huInfos[j];
                let card = huInfo.opCard;
                // 过滤已查找过的牌
                if ((card >> 8) === byte && !checkedCardMap[card]) {
                    count += 1;
                    checkedCardMap[card] = true;
                }
            }
        }
        return count;
    }

    updateTingOpInfo(tingList: TingItem[]) {
        Log.d("==updateTingOpInfo==", tingList);
        this.tipCardsBg.node.active = false;
        if (tingList) {
            if (tingList.length > 0) {
                this.tingList = tingList.sort((a, b) => a.card - b.card);
                this.tipIcon.node.active = true;
            } else {
                this.tingList = [];
                this.tipIcon.node.active = false;
            }
        }
        else {
            this.tipIcon.node.active = false;
        }
    }

    async tingIconClick() {
        //显示听牌信息，创建要听的牌
        this.tipCardsBg.node.removeAllChildren();

        if (!this.cardPrefab) {
            this.cardPrefab = await new Promise((resolver, reject) => {
                resLoader.loadPrefab('mahjong@module/tipCards/res/prefab/TingCard', function (err, prefab) {
                    if (!err && prefab) {
                        resolver(prefab);
                    } else {
                        console.warn('==resLoader.loadPrefab==', err)
                    }
                })
            });
        }

        Log.d("==tingIconClick==", this.tingList)
        if (this.tingList && this.tingList.length > 0) {
            for (let index = 0; index < this.tingList.length; index++) {
                let tingCard = instantiate(this.cardPrefab);
                let card = this.tingList[index].card;
                let info: TingCardInfo = {
                    cardTByte: card,
                    count: this.getCardRemainCount(card),
                };
                Log.d("==tingIconClick==", index, info)
                tingCard.getComponent(TingCard).init(info);
                this.tipCardsBg.node.addChild(tingCard);
            }
            this.tipCardsBg.node.active = true;
        }

    }
}