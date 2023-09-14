import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/pdk/Room';
import { ExtendTable, MsgTableInfo, PlayCardInfo, PlayCardResult } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { CardView } from 'game/room/module/card/src/CardView';
import { GameStage } from 'game/pdk/model/GameConst';
import { MsgManaged, Table } from 'idl/tss/game/table.v2';
import { HandCardView } from 'game/room/module/handCardView/src/component/HandCardView';
import { CardStack } from 'game/room/framework/card/CardStack';
import { Log } from 'bos/exports';
import { Label } from 'cc';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';
import { Button } from 'cc';
import { Color } from 'cc';
import { CardInfo } from 'game/room/framework/card/CardInfo';
import { find } from 'cc';

const LabColors = ['#494949', '#713C1F', '#315844'];


@ccclass('OptBtn')
export class OptBtn extends XComponent {

    @property(Node)
    public btnViews: Node;
    @property(Sprite)
    public noPlayBtn: Sprite;
    @property(Sprite)
    public tipsBtn: Sprite;
    @property(Sprite)
    public playBtn: Sprite;
    @property(Label)
    public tipLab: Label;
    @property(SpriteFrame)
    public GrayFrame: SpriteFrame;
    @property(SpriteFrame)
    public YellowFrame: SpriteFrame;
    @property(SpriteFrame)
    public GreenFrame: SpriteFrame;
    @property(Label)
    public noPlayLab: Label;
    @property(Label)
    public tipsBtnLab: Label;
    @property(Label)
    public playLab: Label;

    public handCardView: Node;
    public timerFunc: Function;
    public tipCardInfo: CardInfo;
    public isPrePlayCard: boolean = true;
    public tipIter: IterableIterator<CardInfo>;

    onLoad(): void {
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayCard.name, this.onNotifyPlayCard, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayStart.name, this.onNotifyPlayStart, this);
        Room.eventSystem.on(ExtendTable.NotifyGameResult.name, this.onNotifyGameResult, this);
    }

    start() {
        this.isPrePlayCard = true;
        this.showBtnView();
        this.handCardView = this.handCardView || find('Canvas/contentLayer/HandCard/HandCardView');
        this.handCardView.on('NotifyCardPopup', this.onNotifyCardPopup, this);
    }
    
    onDisable() {
        Room.eventSystem.removeAll(this);
        this.handCardView?.off('NotifyCardPopup',this.onNotifyCardPopup, this);
    }

    onNotifyGameResult() {
        this.hideView();
    }

    onNotifyManaged(data: MsgManaged) {
        this.showBtnView();
    }

    onNotifyReconnect(data: MsgTableInfo) {
        this.showBtnView();
    }

    onNotifyPlayStart(data: PlayCardInfo) {
        this.showBtnView();
    }
    onNotifyPlayCard(data: PlayCardResult) {
        this.hideView();
    }

    onNotifyCardPopup() {
        if (this.btnViews.active) {
            this.updatePlayBtn();
        }
    }

    showBtnView() {
        let mine = Room.gameData.getMySelf();
        let myRound = Room.gameData.optUid == mine.uid;
        let isPlaying = Room.gameData.curStage == GameStage.PlayCard;
        let state = !mine.isAI && myRound && isPlaying;
        this.scheduleOnce(()=>{
            this.showOptBtn(state);
        }, 0.1)
    }

    updatePlayBtn() {
        this.tipLab.node.parent.active = false;
        let popupCards = this.handCardView.getComponent(HandCardView).getPopUpCard();
        this.playBtn.node.getComponent(Button).interactable = popupCards.size > 0;
        this.playLab.color = new Color(popupCards.size > 0 ? LabColors[1] : LabColors[0]);
        this.playBtn.spriteFrame = popupCards.size > 0 ? this.YellowFrame : this.GrayFrame;
    }

    showOptBtn(state: boolean = false) {
        if (!state) {
            this.hideView();
            return;
        }
        let cardInfo: CardInfo;
        this.updatePlayBtn();
        let mine = Room.gameData.getMySelf();
        let lastCards = Room.gameData?.lastCards?.cardInfo;
        if (lastCards) {
            cardInfo = Room.cardEngine.findGreaterCards(mine.cardStack, lastCards, null);
        }
        console.log(' showOptBtn ', lastCards, cardInfo);

        let canPlay = (!lastCards || cardInfo) && true;
        this.tipsBtnLab.string = canPlay ? '提 示' : '要不起';
        
        this.playBtn.node.active = canPlay;
        this.noPlayBtn.node.active = canPlay;
        if (canPlay) {
            this.noPlayBtn.node.getComponent(Button).interactable = lastCards && true;
            this.noPlayLab.color = new Color(lastCards ? LabColors[2] : LabColors[0]);
            this.noPlayBtn.spriteFrame = lastCards ? this.GreenFrame : this.GrayFrame;
        } else {
            this.tipLab.node.parent.active = true;
            this.tipLab.string = '暂无可压制牌型';
            // this.timerFunc = () => {
            //     this.onClickNoPlay();
            //     this.timerFunc = null;
            // }
            this.scheduleOnce(this.onClickNoPlay.bind(this), 3);
        }

        this.btnViews.active = true;
        // if (mine.getHandCardNum() == 1) {
            // TODO 最后一手自动出牌
            // this.scheduleOnce(()=>{
            //     this.onClickPlay();
            // }, 2)
        // }
    }

    onClickNoPlay() {
        Room.msgHandler.sendTableAction(ExtendTable.PlayCard, { opcode: 0, cards: {} });
        this.hideView();
    }

    checkTipCards(): CardInfo {
        let result = this.tipIter?.next()
        console.log(' checkTipsCards result is ', result);
        if (result && !result.done) {
            return result.value;
        }
        let mine = Room.gameData.getMySelf();
        this.tipIter = Room.cardEngine.getPrompts({
            cards: mine.cardStack,
            target: Room.gameData?.lastCards?.cardInfo,
        })
        return this.checkTipCards();
    }

    onClickTips() {
        if (this.tipsBtnLab.string == '要不起') {
            this.hideView();
            Room.msgHandler.sendTableAction(ExtendTable.PlayCard, { opcode: 0, cards: {}});
        } else {
            let mine = Room.gameData.getMySelf();
            console.log('-onClickTips--', mine.cardStack, Room.gameData?.lastCards?.cardInfo);
            let cardInfo = this.checkTipCards();
            if (cardInfo) {
                const map = cardInfo.cards?.reduce((result, value) => {
                    result.set(value.byte, true);
                    return result;
                }, new Map<number, boolean>());
                this.handCardView.getComponent(HandCardView).setPromptCards(map);
            } else {
                this.onClickTips()
            }
        }
    }

    showCardTip(str: string) {
        if (str) {
            this.tipLab.string = str;
            this.tipLab.node.parent.active = true;
        } else {
            this.tipLab.node.parent.active = false;
        }
    }

    onClickPlay() {
        let popupMap = this.handCardView.getComponent(HandCardView).getPopUpCard();
        if (popupMap.size > 0) {
            let cards = [];
            for (const [k, v] of popupMap) {
                cards.push(v.getComponent(CardView).cardByte)
            }
            let outCardStack = new CardStack({bytes: cards });
            console.log('==onClickPlay==', popupMap, outCardStack);
            let outCardInfo = Room.cardEngine.checkCardInfo(outCardStack);
            if (!outCardInfo) {
                this.showCardTip('不符合出牌规范');
                Log.e('onClickPlay outCardInfo is null');
                return;
            }
            Log.d('==outCardStack and outCardInfo===', outCardStack, outCardInfo);
            let cardInfo = Room.gameData?.lastCards?.cardInfo;
            if (cardInfo) {
                let code = Room.cardEngine.compareCardInfo(outCardInfo, cardInfo);
                if (code <= 0) {
                    this.showCardTip('不符合出牌规范');
                    Log.d('--onClickPlay--', code);
                    return
                }
            }
            
            // if (this.isPrePlayCard) {
            //     // 预出牌功能
            //     // this.playCard(outCardInfo);
            // } else {
            // }
            Room.gameData.prePlay = null;
            this.sendDataToServer(cards);
        }
    }

    sendDataToServer(cards: number[]) {
        Room.msgHandler.sendTableAction(ExtendTable.PlayCard, { opcode: 1, cards: cards });
        this.hideView();
    }

    hideView() {
        this.tipIter = null;
        this.btnViews.active = false;
        this.tipLab.node.parent.active = false;
        this.unschedule(this.onClickNoPlay.bind(this));
    }
}