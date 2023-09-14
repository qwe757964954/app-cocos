import { _decorator, view, screen, Component, Node, animation, AnimationClip, Vec3, Quat, math, MeshRenderer, input, Input, director, game, EventKeyboard, KeyCode, ccenum, geometry, PhysicsSystem, EventTouch, Sprite, SpriteFrame, Vec2 } from 'cc';
import { myPlayerCard } from './myPlayerCard';
import { playerOutCard } from './playerOutCard';
import { PlayerRole, StackInfo, CountDownInfo } from './cardConfigs';
import { opponentPlayerCard } from './opponentPlayerCard';
import { playerOperationArea } from './playerOperationArea';
import { Audio, Log, XComponent, eventSystem, uiMgr } from 'bos/exports';
import { MahjongRoom } from 'game/mahjong/Room';
import { GameData } from 'game/mahjong/model/GameData';
import { Event } from 'game/mahjong/config/Event';
import { OpCode } from 'game/mahjong/config/OpCode';
import { EventMouse } from 'cc';
import { PlayerOpResult, PlayerOutCards, PlayerSpreadCards, SetCardInfo, SetOpGroups } from 'game/mahjong/model/DataModel';
import { Camera } from 'cc';
import { DiceInfo, ExtendTable, OperateInfo, OperateOption, TingData, TingItem } from 'game/mahjong/idl/tss/mahjong/extendtable';
import { CardConf } from 'idl/tss/hall/premiumcard.v1';
import { AudioUtils } from 'game/mahjong/AudioUtils';
import { AudioConfig } from 'game/mahjong/config/AudioConfig';
import { stackToTexture } from './stackToTexture';
const { ccclass, property, executeInEditMode } = _decorator;

type RemoveInfo = {
    indexList: number[],
    isGrab: boolean,
}

// for reference
// type CameraConfig = {
//     hori:{
//         position: {x: 0, y: 31.2, z: 34.8};
//         rotation: {x: -46, y: 0, z: 0};
//         fov: 32; 
//         fovAxis: 0; //vertical
//     },
//     verti:{
//         position: {x: 0, y: 31.2, z: 34.8};
//         rotation: {x: -46, y: 0, z: 0}; 
//         fov: 55;
//         fovAxis: 1; //horizontal
//     }
// }

const CardNodeConfig = {
    hori: {
        playerMe: {
            hand: {
                camDistance: 25,
                paddingLeft: -12,
                paddingBottom: 0,
            },
            out: {
                paddingTop: 1
            },
            stack: {
                paddingLeft: 6,
                paddingBottom: 3,
            }
        },
        playerOppenent: {
            hand: {
                paddingLeft: 6,
                paddingBottom: 4,
            },
            out: {
                paddingTop: 1
            }
        },
    },
    verti: {
        playerMe: {
            hand: {
                camDistance: 16,
                paddingLeft: -5.75,
                paddingBottom: 0,    
            },
            out: {
                paddingTop: 1
            },
            stack: {
                paddingLeft: 9,
                paddingBottom: 0,
            }
        },
        playerOppenent: {
            hand: {
                paddingLeft: 9,
                paddingBottom: 6.5,
            },
            out: {
                paddingTop: 1
            }
        },
    }
}

export enum ScreenDir {
    HORIZONTAL,
    VERTICAL
}

export const MJBLOCK_VERTICAL_SCALE = 0.9

export const DESIGN_RATIO = 16 / 9

const DESIGN_DESK_VERTICAL_SCALE = 1.3

ccenum(ScreenDir)

@ccclass('cardPlayManager')
// @executeInEditMode
export class cardPlayManager extends XComponent {
    @property({ type: ScreenDir })
    get ScreenDirection() {
        return this._currentScreenDirection;
    }
    set ScreenDirection(value: ScreenDir) {
        this._currentScreenDirection = value
        this.onChangeDirection(value)
    }

    @property({ type: ScreenDir, visible: false })
    _currentScreenDirection: ScreenDir = ScreenDir.VERTICAL;

    _cardIndicator: Node;

    _clickedTime: number | null = null;

    _myCurOutCard: number = null; //预出牌，未经过后端校验

    _playerIndicatorList: Node[] = [];

    _countDown10: Node;
    _countDown1: Node;

    _startTime: number;
    _tingDatas: TingData[];

    _screenRatioScale: number;

    onLoad(): void {
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        //for debug
        view.setResizeCallback(() => {
            // console.log("screen.windowSize", screen.windowSize);
            this.switchDesk(this._currentScreenDirection)
        })

        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        this._cardIndicator = cardZone.getChildByName("IndicatorPosNode");

        let desk = currentScene.getChildByName("Desk")
        this._playerIndicatorList.push(desk.getChildByName("Disk1E"))
        this._playerIndicatorList.push(desk.getChildByName("Disk1S"))
        this._playerIndicatorList.push(desk.getChildByName("Disk1W"))
        this._playerIndicatorList.push(desk.getChildByName("Disk1N"))

        this._countDown10 = desk.getChildByName("Number10").getChildByName("Cube.001")
        this._countDown1 = desk.getChildByName("Number1").getChildByName("Cube.001")

        let iconTexcoord = CountDownInfo[0]
        let meshRenderCom = this._countDown10.getComponent(MeshRenderer)
        let material = meshRenderCom.getMaterialInstance(0)
        material.setProperty('tilingOffset', iconTexcoord);

        meshRenderCom = this._countDown1.getComponent(MeshRenderer)
        material = meshRenderCom.getMaterialInstance(0)
        material.setProperty('tilingOffset', iconTexcoord);

        let windowSize = screen.windowSize;
        let windowRatio = windowSize.y / windowSize.x
        this._screenRatioScale = windowRatio / DESIGN_RATIO

        // console.log("windowSize", windowSize);
        // console.log("windowRatio", windowRatio);
        // console.log("screenRatioScale", this._screenRatioScale);

        MahjongRoom.gameData.on(MahjongRoom.gameData.EventType.SET_DICE_INFO, this.setDiceInfo, this);
        MahjongRoom.gameData.on(MahjongRoom.gameData.EventType.OP_START, this.onOpStart, this);
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        MahjongRoom.eventSystem.on(Event.SHOW_OP_GROUPS, this.onShowOpGroups, this);
        let players = MahjongRoom.gameData.getAllPlayer();
        for (let player of players) {
            player.on(player.EventType.PLAYER_SET_CARDS, this.setCards, this);
            player.on(player.EventType.PLAYER_SET_CARD_COUNT, this.setCards, this);
            player.on(player.EventType.PLAYER_OP_RESULT, this.onPlayerOpResult, this);
            player.on(player.EventType.PLAYER_SET_OPGROUPS, this.onPlayerSetOpGroups, this);
            player.on(player.EventType.PLAYER_OUTCARDS, this.onPlayerOutCards, this);
            player.on(player.EventType.PLAYER_SPREAD_CARD, this.onPlayerSpreadCards, this);
            player.on(player.EventType.PLAYER_OP_START, this.onPlayerOpStart, this);
        }
    }

    start() {
        // console.log("cardPlayManager start =============================")
        this.onChangeDirection(this._currentScreenDirection, true)
        this.hideCountDown();
        this.hidePlayerIndicator();
        this.hideIndicator();
    }

    onDestroy(): void {
        view.setResizeCallback(null);
        MahjongRoom.gameData.removeAll(this);
        let players = MahjongRoom.gameData.getAllPlayer();
        for (let player of players) {
            if (player) {
                player.removeAll(this);
            }
        }
    }

    //清除手牌、出牌、操作牌等
    resetView() {
        // Log.d("==cardManager=resetView=")
        this.hideCountDown();
        this.hidePlayerIndicator();
        this.hideIndicator();
        let playerNum = MahjongRoom.gameData.getMaxPlayerCount();
        for (let seat = 1; seat <= playerNum; seat++) {
            let playerStack = this.getPlayerStack(seat);
            let playerOutCard = this.getPlayerOut(seat);
            let playerHand = this.getPlayerHand(seat);
            if (seat == 1) {
                playerHand = playerHand as myPlayerCard;
            }
            else {
                playerHand = playerHand as opponentPlayerCard;
            }
            playerHand.resetView();
            playerStack.resetView();
            playerOutCard.resetView();
        }
    }

    onPlayerOpStart(msg: OperateOption) { //给牌添加标记
        // Log.d("==onPlayerOpStart==", msg, msg.tingDatas.length);
        if (msg.uid != MahjongRoom.gameData.getMyID()) {
            return;
        }
        if (msg.tingDatas && msg.tingDatas.length > 0) {
            this._tingDatas = msg.tingDatas;
            let isSign = true;
            if (msg.opInfos) {
                for (let index = 0; index < msg.opInfos.length; index++) {
                    const v = msg.opInfos[index];
                    if (v.opCode == OpCode.OPE_ZI_MO) {
                        isSign = false;
                        break;
                    }
                }
            }
            if (isSign) {
                let playerHand = this.getPlayerHand(1) as myPlayerCard;
                playerHand.resetRecommend();
                for (let v of msg.tingDatas) {
                    let myCards = MahjongRoom.gameData.getMySelf().getHandCards();
                    for (let index = 0; index < myCards.length; index++) {
                        const card = myCards[index];
                        if (card >> 8 == v.outCard >> 8) {
                            playerHand.showRecommend(index);
                        }
                    }
                }
            }
        }
    }

    setDiceInfo(diceInfo: DiceInfo) {
        this.stopSchedule();
    }

    onOpStart(opOption: OperateOption) {
        let downStart = opOption.time + opOption.extTime;
        let seat = MahjongRoom.gameData.getLocalSeatByID(opOption.uid);
        // Log.d("=cardPlayManager=onOpStart==", opOption, downStart, seat)
        if (downStart > 0) {
            this._startTime = downStart;
            this.startSchedule();
        } else {
            this.hideCountDown();
        }

        if (seat != null && seat > 0) {
            this.showPlayerIndicator(seat - 1);
        } else {
            this.hidePlayerIndicator();
        }
    }

    startSchedule() {
        this.stopSchedule();
        this.updateTime();
        this.schedule(this.showTime, 1);
    }

    showTime() {
        this._startTime = this._startTime - 1;
        if (this._startTime > 0) {
            this.updateTime();
        }
        else {
            this.stopSchedule();
        }
    }

    stopSchedule() {
        this.unschedule(this.showTime);
        this.hideCountDown();
        this.hidePlayerIndicator();
    }

    updateTime() {
        this.showCountDown();
        this.setCountDown(this._startTime);
        if (this._startTime <= 5 && MahjongRoom.gameData.getOutCardTurn()) {
            Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.countdown));
        }
    }

    //点击操作,发送操作code 
    opGroupClick(opCode: number, cards: number[]) {
        let msg = {
            opCode: opCode,
            opCards: cards,
        };
        // Log.d("==opGroupClick=msg=", msg);
        MahjongRoom.msgHandler.sendTableAction(ExtendTable.Operate, msg);
        Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_operate));
        let st = this.getStackTexture();
        st.clearCameraNodes();
        let mulChoiceNode = this.getMulChoiceNode();
        mulChoiceNode.removeAllChildren();
    }

    //同一操作，多种选择
    onShowOpGroups(data: OperateInfo) {
        // Log.d("==onShowOpGroups==", data)
        let opGroups = data.groups;
        for (let opGroup of opGroups) {
            let opNode = new Node();
            let opSprite = opNode.addComponent(Sprite);
            let st = this.getStackTexture();
            opSprite.spriteFrame = st.renderStackTexture(opGroup.cards, new Vec2(256, 256));
            opNode.on(Node.EventType.TOUCH_END, () => {
                this.opGroupClick(data.opCode, opGroup.cards);
            }, this);
            let mulChoiceNode = this.getMulChoiceNode();
            mulChoiceNode.addChild(opNode);
        }
    }

    getMulChoiceNode(): Node {
        let currentScene = director.getScene();
        let canvas = currentScene.getChildByName("Canvas");
        let mulChoiceNode = canvas.getChildByName("gameLayer").getChildByName("mulChoiceNode");
        return mulChoiceNode;
    }

    getStackTexture(): stackToTexture {
        let currentScene = director.getScene();
        let rttNode = currentScene.getChildByName("rttNode");
        return rttNode.getComponent(stackToTexture);
    }

    isTableInter(tb1: number[], tb2: number[]): boolean {
        for (const v1 of tb1) {
            for (const v2 of tb2) {
                if (v1 === v2) {
                    return true;
                }
            }
        }
        return false;
    }

    //设置手牌 “我”的手牌有具体牌值，其他玩家的手牌为手牌数量
    setCards(setCardInfo: SetCardInfo) {
        // Log.d("==setCards==", setCardInfo)
        if ((setCardInfo.cards && setCardInfo.cards.length > 0) || (setCardInfo.count && setCardInfo.count > 0)) {
            let seat = setCardInfo.seat;   //seat为1/2/3/4
            let playerHand = this.getPlayerHand(seat);
            let opLength = MahjongRoom.gameData.getPlayerByLocalSeat(seat).getOpDataList().length;
            if (seat == 1) {
                playerHand = playerHand as myPlayerCard;
                let isDraw = (setCardInfo.cards.length + opLength * 3) > 13 ? true : false;
                if (setCardInfo.isReconnect) {
                    playerHand.addHandCards(setCardInfo.cards, true, opLength, isDraw);
                } else {
                    playerHand.addHandCards(setCardInfo.cards, false, opLength, isDraw);
                    playerHand.openingAnim();
                }
            }
            else {
                playerHand = playerHand as opponentPlayerCard;
                let isDraw = (setCardInfo.count + opLength * 3) > 13 ? true : false;
                if (setCardInfo.isReconnect) {
                    playerHand.addHandCards(setCardInfo.count, true, opLength, isDraw);
                } else {
                    playerHand.addHandCards(setCardInfo.count, false, opLength, isDraw);
                    playerHand.openingAnim();
                }
            }
        }
    }

    //获取牌在手牌中的索引
    getIndexList(cards: number[], isJudgeGrab: boolean = false): RemoveInfo {
        let indexList: number[] = [];
        let isGrab = false;
        let myPlayer = MahjongRoom.gameData.getMySelf();
        let myCards = myPlayer.getHandCards();
        let grabCard = myPlayer.getGrabCard();
        // Log.d("==getIndexList==", isJudgeGrab, myCards, grabCard, cards);

        for (let index = 0; index < myCards.length; index++) {
            const card1 = myCards[index];
            for (let i = 0; i < cards.length; i++) {
                const card2 = cards[i];
                if (isJudgeGrab && card2 == grabCard) {
                    isGrab = true;  //抓牌不需要放入indexList中
                } else {
                    if (card1 == card2) {
                        indexList.push(index);
                    }
                }
            }
        }
        return { indexList: indexList, isGrab: isGrab };
    }

    //要插入的牌在手牌中应有的位置
    getIndexByHandCards(insertCard: number, removeCard: number): number {
        let myPlayer = MahjongRoom.gameData.getMySelf();
        let myCards = myPlayer.getHandCards();
        let cards = [...myCards];
        for (let i = cards.length - 1; i >= 0; i--) { //如果此时手牌中还存在要移除的牌，则先移除，再计算插入牌的index
            if (cards[i] === removeCard) {
                cards.splice(i, 1);
                break;
            }
        }
        // Log.d("=getIndexByHandCards=cards==", cards, insertCard.toString(16), removeCard);
        for (let index = 0; index < cards.length; index++) {
            let card = cards[index];
            let checkIndex
            if (card == insertCard) {
                checkIndex = index;
            } else if (card < insertCard && index + 1 < cards.length && insertCard <= cards[index + 1]) {
                checkIndex = index + 1;
            } else if (index == cards.length - 1 && insertCard > card) {
                checkIndex = cards.length;
            }
            if (checkIndex) {
                // Log.d("=checkIndex=", checkIndex)
                return checkIndex;
            }
        }
        return 0;
    }

    getIndexByCards(insertCard: number): number {
        let myPlayer = MahjongRoom.gameData.getMySelf();
        let myCards = myPlayer.getCards();
        let cards = [...myCards];
        cards = cards.sort((a, b) => a - b);
        for (let index = 0; index < cards.length; index++) {
            if (cards[index] == insertCard) {
                // Log.d("=getIndexByCards=", cards, insertCard, insertCard.toString(16), index)
                return index
            }
        }
        return 0;
    }

    onPlayerOpResult(data: PlayerOpResult) {
        // Log.d("==onPlayerOpResult==", data);
        this._tingDatas = null;
        let myHand = this.getPlayerHand(1) as myPlayerCard;
        myHand.resetRecommend();
        let st = this.getStackTexture();
        st.clearCameraNodes();
        this.stopSchedule();
        
        let opResult = data.opResult;
        let seat = data.seat;
        let opData = opResult.opData;
        let opCode = opData.opCode;
        let hand = this.getPlayerHand(seat);
        let myPlayerHand: myPlayerCard, otherPlayerHand: opponentPlayerCard;
        if (seat == 1) {
            myPlayerHand = hand as myPlayerCard;
            MahjongRoom.eventSystem.emit(Event.SHOW_TING_CARDS_INFO);
        }
        else {
            otherPlayerHand = hand as opponentPlayerCard;
        }
        let playerStack = this.getPlayerStack(seat);
        let preSeat = MahjongRoom.gameData.getLocalSeatByID(opData.cardUid);
        let prePlayerOutCard = this.getPlayerOut(preSeat);
        // Log.d("==onPlayerOpResult=opCode 16进制=", seat, opCode, opCode.toString(16), this._myCurOutCard && this._myCurOutCard.toString(16));
        switch (opCode) {
            case OpCode.OPE_GRAB: { //抓牌
                let playerHand = seat == 1 ? myPlayerHand : otherPlayerHand;
                playerHand.drawCard(opData.opCard);
                break;
            }
            case OpCode.OPE_OUT_CARD:
            case OpCode.OPE_FOLD:
            case OpCode.OPE_TING:
            case OpCode.OPE_JIA_TING:
            case OpCode.OPE_LANG_QI_OUT_CARD: { //手牌区移除一张，出牌区添加一张
                this.showIndicator();
                let playerOutNode = this.getPlayerOutNode(seat);
                if (seat == 1) {
                    if (this._myCurOutCard && this._myCurOutCard == opData.opCard) {
                        this._myCurOutCard = null;
                        break;
                    }
                    let playerHand = myPlayerHand;
                    let removeInfo = this.getIndexList([opData.opCard], true);
                    // Log.d("==removeInfo==", removeInfo);
                    let indexList = removeInfo.indexList;
                    let isGrab = removeInfo.isGrab;
                    if (isGrab) {
                        playerHand.playCardAnim(playerOutNode, opData.opCard);
                    }
                    else {
                        playerHand.playCardFromHandAnim(indexList[0], playerOutNode);
                        let myPlayer = MahjongRoom.gameData.getMySelf();
                        let grabCard = myPlayer.getGrabCard();
                        let lastCard = myPlayer.getHandCards()[myPlayer.getHandCards().length - 1];
                        let iCard = grabCard > 0 ? grabCard : lastCard;
                        playerHand.makeSlotAnim(this.getIndexByHandCards(iCard, opData.opCard));
                        playerHand.drawCardToSlot();
                    }
                }
                else {
                    let playerHand = otherPlayerHand;
                    playerHand.playCardAnim(playerOutNode, opData.opCard);
                }
                break;
            }
            case OpCode.OPE_CHI:
            case OpCode.OPE_PENG:
            case OpCode.OPE_PENG_GANG: { //吃、碰、碰杠（从上次打出牌的玩家的出牌区移出，手牌区移除，操作区添加）
                prePlayerOutCard.removeCard();
                if (seat == 1) {
                    let playerHand = myPlayerHand;
                    let removeInfo = this.getIndexList(opData.opCards);
                    // Log.d("==removeInfo==", removeInfo);
                    let indexList = removeInfo.indexList;
                    playerHand.stackAnim(indexList);
                }
                else {
                    let playerHand = otherPlayerHand;
                    playerHand.stackAnim(opData.opCards.length);
                }
                let infos: StackInfo[] = [];
                for (let i = 0; i < opData.opCards.length; i++) {
                    let card = opData.opCards[i];
                    infos[i] = {
                        tByte: card,
                        show: true,
                    };
                }
                playerStack.stackAnim(infos, preSeat);
                break;
            }
            case OpCode.OPE_AN_GANG: { //暗杠，手牌区移除，操作区添加， 最后一张牌是背面
                if (seat == 1) {
                    let playerHand = myPlayerHand;
                    let removeInfo = this.getIndexList(opData.opCards, true);
                    // Log.d("==removeInfo==", removeInfo);
                    let indexList = removeInfo.indexList;
                    let isGrab = removeInfo.isGrab;
                    if (isGrab) { //暗杠的牌包括手牌，则直接抓牌，并从手牌中移除三张即可
                        playerHand.removeDrawCard();
                        playerHand.stackAnim(indexList);
                    } else { //暗杠的牌不包括手牌，则需从手牌中移除四张，并需要把抓牌加入到手牌（移除后的手牌，即player的m_cards）中
                        let grabCard = MahjongRoom.gameData.getMySelf().getGrabCard();
                        let index = this.getIndexByCards(grabCard);
                        playerHand.stackAnim(indexList, grabCard, index);
                    }
                }
                else {
                    let playerHand = otherPlayerHand;
                    playerHand.removeDrawCard();
                    playerHand.stackAnim(opData.opCards.length);
                }
                let stackInfos: StackInfo[] = [];
                for (let i = 0; i < opData.opCards.length; i++) {
                    let card = opData.opCards[i];
                    stackInfos[i] = {
                        tByte: card,
                        show: i < opData.opCards.length - 1 ? true : false,
                    };
                }
                playerStack.stackAnim(stackInfos);
                break;
            }
            case OpCode.OPE_BU_GANG: { //补杠 摸到一张与碰的牌组相等的牌张，添加进牌组中  抓牌移除，操作牌组添加
                if (seat == 1) {
                    let playerHand = myPlayerHand;
                    playerHand.removeDrawCard();
                }
                else {
                    let playerHand = otherPlayerHand;
                    playerHand.removeDrawCard();
                }
                let updateInfo: StackInfo = {
                    tByte: opData.opCard,
                    show: true,
                };
                let player = MahjongRoom.gameData.getPlayerByLocalSeat(seat)
                let opDataList = player.getOpDataList()
                // Log.d("==补杠==", opDataList, opData.opCards)
                let index = 0
                for (let i = 0; i < opDataList.length; i++) {
                    const v = opDataList[i];
                    if (this.isTableInter(opData.opCards, v.opCards)) {
                        index = i;
                        break;
                    }
                }
                playerStack.updateStack(updateInfo, index, preSeat);
                break;
            }
            case OpCode.OPE_HU: {   // 点炮
                prePlayerOutCard.removeCard();
                let playerHand = seat == 1 ? myPlayerHand : otherPlayerHand;
                playerHand.drawCard(opData.opCard);
                break;
            }
            // case OpCode.OPE_ZI_MO: {  // 自摸胡，已经有抓牌
            // let playerHand = seat == 1 ? myPlayerHand : otherPlayerHand;
            // playerHand.drawCard(opData.opCard);
            // break;
            // }
            case OpCode.OPE_QIANG_HU: {   // 抢杠胡
                let prePlayerStack = this.getPlayerStack(preSeat);
                prePlayerStack.popStack()
                let playerHand = seat == 1 ? myPlayerHand : otherPlayerHand;
                playerHand.drawCard(opData.opCard);
                break;
            }
            default: {
                break;
            }
        }
    }

    onPlayerSetOpGroups(data: SetOpGroups) {
        // Log.d("==onPlayerSetOpGroups==", data)
        let opDataList = data.opDataList;
        let seat = data.seat;
        let playerStack = this.getPlayerStack(seat);
        if (opDataList.length > 0) {
            for (let opData of opDataList) {
                let infos: StackInfo[] = [];
                for (let i = 0; i < opData.opCards.length; i++) {
                    let card = opData.opCards[i];
                    infos[i] = {
                        tByte: card,
                        show: opData.opCode == OpCode.OPE_AN_GANG ? (i < opData.opCards.length - 1 ? true : false) : true,
                    };
                }
                playerStack.stackAnim(infos);
            }
        }
    }

    onPlayerOutCards(data: PlayerOutCards) {
        // Log.d("==onPlayerOutCards==", data)
        let seat = data.seat;
        let outCards = data.outCards;
        let playerOutCard = this.getPlayerOut(seat);
        playerOutCard.pushCards(outCards);
    }

    onPlayerSpreadCards(data: PlayerSpreadCards) {
        // Log.d("==onPlayerSpreadCards==", data)
        let handCard = data.handCard;
        let seat = data.seat;
        let playerHand = this.getPlayerHand(seat);
        if (seat == 1) {
            let myStack = this.getPlayerStack(PlayerRole.ME);
            playerHand = playerHand as myPlayerCard;
            playerHand.spreadCards(handCard, myStack);
        }
        else {
            playerHand = playerHand as opponentPlayerCard;
            playerHand.spreadCards(handCard)
        }
    }

    //getting nodes and coms in scene
    getScene() {
        return director.getScene()
    }

    getCurrentDir() {
        return this._currentScreenDirection
    }

    getHoriCamera() {
        return this.getScene().getChildByName('Main Camera');
    }

    getVerticalCamera() {
        return this.getScene().getChildByName('Vertical Camera');
    }

    getPlayerHand(playerRole: PlayerRole): opponentPlayerCard | myPlayerCard {
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        let playerNode: Node;
        switch (playerRole) {
            case PlayerRole.ME:
                playerNode = cardZone.getChildByName("PlayerMe")
                return playerNode.getComponent("myPlayerCard") as myPlayerCard;
            case PlayerRole.RIGHT:
                playerNode = cardZone.getChildByName("PlayerRight")
                break;
            case PlayerRole.TOP:
                playerNode = cardZone.getChildByName("PlayerTop")
                break;
            case PlayerRole.LEFT:
                playerNode = cardZone.getChildByName("PlayerLeft")
                break;
        }

        return playerNode.getComponent("opponentPlayerCard") as opponentPlayerCard;
    }

    getPlayerStack(playerRole: PlayerRole): playerOperationArea {
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        let playerNode: Node;
        switch (playerRole) {
            case PlayerRole.ME:
                playerNode = cardZone.getChildByName("PlayerStackMe")
                break;
            case PlayerRole.RIGHT:
                playerNode = cardZone.getChildByName("PlayerStackRight")
                break;
            case PlayerRole.TOP:
                playerNode = cardZone.getChildByName("PlayerStackTop")
                break;
            case PlayerRole.LEFT:
                playerNode = cardZone.getChildByName("PlayerStackLeft")
                break;
        }

        return playerNode.getComponent("playerOperationArea") as playerOperationArea;
    }

    getPlayerOutNode(playerRole: PlayerRole): Node {
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        let playerNode: Node;
        switch (playerRole) {
            case PlayerRole.ME:
                playerNode = cardZone.getChildByName("PlayerOutCardMe")
                break;
            case PlayerRole.RIGHT:
                playerNode = cardZone.getChildByName("PlayerOutCardRight")
                break;
            case PlayerRole.TOP:
                playerNode = cardZone.getChildByName("PlayerOutCardTop")
                break;
            case PlayerRole.LEFT:
                playerNode = cardZone.getChildByName("PlayerOutCardLeft")
                break;
        }
        return playerNode
    }

    getPlayerOut(playerRole: PlayerRole): playerOutCard {
        let playerNode = this.getPlayerOutNode(playerRole)
        return playerNode.getComponent("playerOutCard") as playerOutCard;
    }

    //实时切换的时候有问题
    onChangeDirection(dir: ScreenDir, force?: boolean) {
        // console.log("==cardPlayManager start==onChangeDirection==", this._currentScreenDirection, dir)
        if (dir == this._currentScreenDirection && force != true) {
            return;
        }


        this.switchCamera(dir, force)
        this.switchSceneNodeLayout(dir, force)
        this.switchDesk(dir, force)

        this._currentScreenDirection = dir

        MahjongRoom.eventSystem.emit(Event.ROTATE_START, dir)
    }

    switchCamera(dir: ScreenDir, force?: boolean) {
        // console.log("switchCamera")

        if (dir == ScreenDir.HORIZONTAL) {
            this.getHoriCamera().active = true
            this.getVerticalCamera().active = false
        }
        else if (dir == ScreenDir.VERTICAL) {
            this.getHoriCamera().active = false
            this.getVerticalCamera().active = true
        }
    }

    switchSceneNodeLayout(dir: ScreenDir, force?: boolean) {
        // console.log("switchSceneNodeLayout")

        if (dir == ScreenDir.HORIZONTAL) {
            let myHand = this.getPlayerHand(PlayerRole.ME) as myPlayerCard;
            myHand._distanceFromCam = CardNodeConfig.hori.playerMe.hand.camDistance
            myHand._paddingLeft = CardNodeConfig.hori.playerMe.hand.paddingLeft
            myHand._paddingBottom = CardNodeConfig.hori.playerMe.hand.paddingBottom
            myHand.node.scale = new Vec3(1, 1, 1);
            myHand.initNodePos();

            let myOut = this.getPlayerOut(PlayerRole.ME);
            myOut.node.scale = new Vec3(1, 1, 1);

            let myStack = this.getPlayerStack(PlayerRole.ME);
            myStack.node.scale = new Vec3(1, 1, 1);

            let playerHandR = this.getPlayerHand(PlayerRole.RIGHT) as opponentPlayerCard;
            playerHandR._paddingLeft = CardNodeConfig.hori.playerOppenent.hand.paddingLeft
            playerHandR._paddingBottom = CardNodeConfig.hori.playerOppenent.hand.paddingBottom
            playerHandR.node.scale = new Vec3(1, 1, 1);
            playerHandR.initNodePos();

            let rightOut = this.getPlayerOut(PlayerRole.RIGHT);
            rightOut.node.scale = new Vec3(1, 1, 1);

            let rightStack = this.getPlayerStack(PlayerRole.RIGHT);
            rightStack.node.scale = new Vec3(1, 1, 1);

            let playerHandT = this.getPlayerHand(PlayerRole.TOP) as opponentPlayerCard;
            playerHandT._paddingLeft = CardNodeConfig.hori.playerOppenent.hand.paddingLeft
            playerHandT._paddingBottom = CardNodeConfig.hori.playerOppenent.hand.paddingBottom
            playerHandT.node.scale = new Vec3(1, 1, 1);
            playerHandT.initNodePos();

            let topOut = this.getPlayerOut(PlayerRole.TOP);
            topOut.node.scale = new Vec3(1, 1, 1);

            let topStack = this.getPlayerStack(PlayerRole.TOP);
            topStack.node.scale = new Vec3(1, 1, 1);

            let playerHandL = this.getPlayerHand(PlayerRole.LEFT) as opponentPlayerCard;
            playerHandL._paddingLeft = CardNodeConfig.hori.playerOppenent.hand.paddingLeft
            playerHandL._paddingBottom = CardNodeConfig.hori.playerOppenent.hand.paddingBottom
            playerHandL.node.scale = new Vec3(1, 1, 1);
            playerHandL.initNodePos();

            let leftOut = this.getPlayerOut(PlayerRole.LEFT);
            leftOut.node.scale = new Vec3(1, 1, 1);

            let leftStack = this.getPlayerStack(PlayerRole.LEFT);
            leftStack.node.scale = new Vec3(1, 1, 1);
        }
        else if (dir == ScreenDir.VERTICAL) {

            let blockScale = new Vec3(MJBLOCK_VERTICAL_SCALE, MJBLOCK_VERTICAL_SCALE, MJBLOCK_VERTICAL_SCALE)

            let myHand = this.getPlayerHand(PlayerRole.ME) as myPlayerCard;
            myHand._distanceFromCam = CardNodeConfig.verti.playerMe.hand.camDistance * this._screenRatioScale
            myHand._paddingLeft = CardNodeConfig.verti.playerMe.hand.paddingLeft * this._screenRatioScale
            myHand._paddingBottom = CardNodeConfig.verti.playerMe.hand.paddingBottom
            myHand.node.scale = blockScale;
            myHand.initNodePos();

            let myOut = this.getPlayerOut(PlayerRole.ME);
            myOut.node.scale = blockScale;

            let myStack = this.getPlayerStack(PlayerRole.ME);
            myStack._paddingBottom = CardNodeConfig.verti.playerMe.stack.paddingBottom
            myStack._paddingLeft = CardNodeConfig.verti.playerMe.stack.paddingLeft
            myStack.node.scale = blockScale;

            let playerHandR = this.getPlayerHand(PlayerRole.RIGHT) as opponentPlayerCard;
            playerHandR._paddingLeft = CardNodeConfig.verti.playerOppenent.hand.paddingLeft
            playerHandR._paddingBottom = CardNodeConfig.verti.playerOppenent.hand.paddingBottom
            playerHandR.node.scale = blockScale;
            playerHandR.initNodePos();

            let rightOut = this.getPlayerOut(PlayerRole.RIGHT);
            rightOut.node.scale = blockScale;

            let rightStack = this.getPlayerStack(PlayerRole.RIGHT);
            rightStack.node.scale = blockScale;

            //针对竖版微调手牌的定位
            let playerHandT = this.getPlayerHand(PlayerRole.TOP) as opponentPlayerCard;
            playerHandT._paddingLeft = CardNodeConfig.verti.playerOppenent.hand.paddingLeft * 0.8
            playerHandT._paddingBottom = CardNodeConfig.verti.playerOppenent.hand.paddingBottom / 4
            playerHandT.node.scale = blockScale;
            playerHandT.initNodePos();

            let topOut = this.getPlayerOut(PlayerRole.TOP);
            topOut.node.scale = blockScale;

            let topStack = this.getPlayerStack(PlayerRole.TOP);
            topStack.node.scale = blockScale;


            let playerHandL = this.getPlayerHand(PlayerRole.LEFT) as opponentPlayerCard;
            playerHandL._paddingLeft = CardNodeConfig.verti.playerOppenent.hand.paddingLeft
            playerHandL._paddingBottom = CardNodeConfig.verti.playerOppenent.hand.paddingBottom
            playerHandL.node.scale = blockScale;
            playerHandL.initNodePos();

            let leftOut = this.getPlayerOut(PlayerRole.LEFT);
            leftOut.node.scale = blockScale;

            let leftStack = this.getPlayerStack(PlayerRole.LEFT);
            leftStack.node.scale = blockScale;
        }
    }

    switchDesk(dir: ScreenDir, force?: boolean) {
        // console.log("this.switchDesk************************")
        let currentScene = director.getScene();
        let desk = currentScene.getChildByName("Desk");
        let MJDesk = desk.getChildByName("MJDesk");

        if (dir == ScreenDir.HORIZONTAL) {
            MJDesk.scale = new Vec3(1, 1, 1);
        }
        else if (dir == ScreenDir.VERTICAL) {
            let deskRatio = this._screenRatioScale * DESIGN_DESK_VERTICAL_SCALE

            // console.log("deskRatio", deskRatio);

            MJDesk.scale = new Vec3(deskRatio, 1, deskRatio)
        }
    }

    pickMJ(event: EventMouse | EventTouch) {
        let ray = new geometry.Ray();

        let camNode: Node;
        if (this._currentScreenDirection == ScreenDir.HORIZONTAL) {
            camNode = director.getScene().getChildByName('Main Camera');
        }
        else if (this._currentScreenDirection == ScreenDir.VERTICAL) {
            camNode = director.getScene().getChildByName('Vertical Camera');
        }

        let camCom = camNode.getComponent("cc.Camera") as Camera;

        camCom.screenPointToRay(event.getLocationX(), event.getLocationY(), ray);

        // console.log(ray)

        if (PhysicsSystem.instance.raycastClosest(ray, 0xffffffff, 10000000, true)) {
            // console.log("hitted")


            const raycastClosestResult = PhysicsSystem.instance.raycastClosestResult;

            // console.log(raycastClosestResult)

            return raycastClosestResult.collider.node
        }
    }

    hideIndicator() {
        this._cardIndicator.active = false
    }

    showIndicator() {
        this._cardIndicator.active = true
    }

    hidePlayerIndicator() {
        for (let i = 0; i < this._playerIndicatorList.length; i++) {
            this._playerIndicatorList[i].active = false;
        }
    }

    showPlayerIndicator(value: number) {
        for (let i = 0; i < this._playerIndicatorList.length; i++) {
            this._playerIndicatorList[i].active = i == value;
        }
    }


    hideCountDown() {
        this._countDown10.active = false;
        this._countDown1.active = false;
    }

    showCountDown() {
        this._countDown10.active = true;
        this._countDown1.active = true;
    }

    setCountDown(num: number) {
        let numLength = num.toString().length
        if (numLength == 1) {
            let iconTexcoord = CountDownInfo[0]
            let meshRenderCom = this._countDown10.getComponent(MeshRenderer)
            let material = meshRenderCom.getMaterialInstance(0)
            material.setProperty('tilingOffset', iconTexcoord);

            let one = Number(num.toString()[0]);
            iconTexcoord = CountDownInfo[one]
            meshRenderCom = this._countDown1.getComponent(MeshRenderer)
            material = meshRenderCom.getMaterialInstance(0)
            material.setProperty('tilingOffset', iconTexcoord);
        }
        else if (numLength == 2) {
            let ten = Number(num.toString()[0]);

            let iconTexcoord = CountDownInfo[ten]
            let meshRenderCom = this._countDown10.getComponent(MeshRenderer)
            let material = meshRenderCom.getMaterialInstance(0)
            material.setProperty('tilingOffset', iconTexcoord);

            let one = Number(num.toString()[1]);
            iconTexcoord = CountDownInfo[one]
            meshRenderCom = this._countDown1.getComponent(MeshRenderer)
            material = meshRenderCom.getMaterialInstance(0)
            material.setProperty('tilingOffset', iconTexcoord);
        }

    }

    //testing code ***************************************************************************************************************
    onKeyDown(event: EventKeyboard) {
        // console.log("cardPlayManager onKeyDown =============================")
        let myHand = this.getPlayerHand(PlayerRole.ME) as myPlayerCard;
        let myStack = this.getPlayerStack(PlayerRole.ME) as playerOperationArea;
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        let playerOutNode: Node;
        playerOutNode = cardZone.getChildByName("PlayerOutCardMe")



        let playerHand = this.getPlayerHand(PlayerRole.TOP) as opponentPlayerCard;
        let playerHandL = this.getPlayerHand(PlayerRole.LEFT) as opponentPlayerCard;
        let playerHandR = this.getPlayerHand(PlayerRole.RIGHT) as opponentPlayerCard;


        let pt = this.getPlayerHand(PlayerRole.TOP) as opponentPlayerCard;
        let pts = this.getPlayerStack(PlayerRole.TOP)


        let pto = cardZone.getChildByName("PlayerOutCardTop")

        // console.log(event.keyCode)
        switch (event.keyCode) {
            case KeyCode.DIGIT_1:
                //自己抓牌
                myHand.drawCard(0x01701)
                break;
            case KeyCode.DIGIT_2:
                //自己出抓牌
                myHand.playCardAnim(playerOutNode)
                break;
            case KeyCode.DIGIT_3:
                //自己出手牌
                myHand.playCardFromHandAnim(4, playerOutNode)
                break;
            case KeyCode.DIGIT_4:
                //自己手牌平移空位置
                myHand.makeSlotAnim(6)
                break;
            case KeyCode.DIGIT_5:
                //自己抽牌插入手牌
                myHand.drawCardToSlot()
                break;
            case KeyCode.DIGIT_6:
                //自己吃碰杠
                // console.log(myHand._mjList)
                myHand.stackAnim([2, 4])
                //自己操作区吃碰杠 
                myStack.stackAnim([{
                    tByte: 0x02701,
                    show: true,
                    operation: '',
                },
                {
                    tByte: 0x02702,
                    show: true,
                    operation: '',
                },
                {
                    tByte: 0x02703,
                    show: true,
                    operation: '',
                },
                ], PlayerRole.LEFT)
                break;
            case KeyCode.DIGIT_7:
                //对家抓牌 
                pt.drawCard()
                break;
            case KeyCode.DIGIT_8:
                //对家出抽牌
                pt.playCardAnim(pto, 0x02704)
                break;
            case KeyCode.DIGIT_9:
                //对家吃碰杠
                pt.stackAnim(3)

                pts.stackAnim([{
                    tByte: 0x02701,
                    show: true,
                    operation: '',
                },
                {
                    tByte: 0x02702,
                    show: true,
                    operation: '',
                },
                {
                    tByte: 0x02703,
                    show: true,
                    operation: '',
                },
                ])
                break;
            case KeyCode.DIGIT_0:
                // console.log(myHand._mjList);
                break;
            case KeyCode.KEY_Q:
                //开场
                myHand.addHandCards([0x0101, 0x0101, 0x0101, 0x1501, 0x1601, 0x1701, 0x1701, 0x2901, 0x2901, 0x2901, 0x3301, 0x3301, 0x4301, 0x0109], false, null, true);
                myHand.openingAnim()
                playerHand.addHandCards(13, false);
                playerHand.openingAnim()
                playerHandL.addHandCards(13, false);
                playerHandL.openingAnim()
                playerHandR.addHandCards(13, false);
                playerHandR.openingAnim()
                break;
            case KeyCode.KEY_W:
                //摊牌
                myHand.spreadCards(null, myStack)
                playerHand.spreadCards()
                playerHandL.spreadCards()
                playerHandR.spreadCards()
                break;
            case KeyCode.KEY_Z:
                //当前出牌玩家提示
                this.showPlayerIndicator(2)
            case KeyCode.KEY_X:
                //当前出牌玩家提示测试
                this.showPlayerIndicator(3)
                break;
            case KeyCode.KEY_C:
                //倒计时测试
                this.setCountDown(23)
                break;
            case KeyCode.KEY_A:
                //当前出牌推荐

                for(let i = 0; i < 5; i++)
                {
                    myHand.showRecommend(i)
                }
                
                break;
            case KeyCode.KEY_S:
                //当前出牌推荐
                myHand.resetRecommend()
                break;
            case KeyCode.KEY_P:
                //测试重连手牌位置
                myHand.addHandCards([0x0101, 0x0101, 0x0101, 0x1501, 0x1601, 0x1701, 0x1701, 0x1601, 0x1701, 0x1701], true, 1, false);
                break;
        }
    }

    cardTouch(event: EventTouch | EventMouse, playerOutNode: Node) {
        let node = this.pickMJ(event)
        if (node) {
            let myHand = this.getPlayerHand(PlayerRole.ME) as myPlayerCard;
            let index = myHand.getNodeIndex(node);
            // Log.d("==onMouseDown=index=", node, index, MahjongRoom.gameData.getOutCardTurn(), MahjongRoom.gameData.getMySelf().getHandCards())
            if (index != null) {
                let msg;
                if (index == -1) {
                    let grabCard = MahjongRoom.gameData.getMySelf().getGrabCard();
                    myHand.playCardAnim(playerOutNode, grabCard)
                    msg = {
                        opCode: OpCode.OPE_OUT_CARD,
                        opCards: [grabCard],
                    };
                }
                else {
                    myHand.playCardFromHandAnim(index, playerOutNode);
                    let myCards = MahjongRoom.gameData.getMySelf().getHandCards();
                    let card = myCards[index];
                    msg = {
                        opCode: OpCode.OPE_OUT_CARD,
                        opCards: [card],
                    };
                    let myPlayer = MahjongRoom.gameData.getMySelf();
                    let grabCard = myPlayer.getGrabCard();
                    let lastCard = myPlayer.getHandCards()[myPlayer.getHandCards().length - 1];
                    let iCard = grabCard > 0 ? grabCard : lastCard;
                    myHand.makeSlotAnim(this.getIndexByHandCards(iCard, card));
                    myHand.drawCardToSlot();
                }
                // Log.d("==预出牌=msg=", msg)
                this._myCurOutCard = msg.opCards[0]
                MahjongRoom.msgHandler.sendTableAction(ExtendTable.Operate, msg);
                MahjongRoom.gameData.setOutCardTurn(false)
            }
        }

        this._clickedTime = null
    }

    onMouseUp(event: EventMouse) {
        // console.log("cardPlayManager onMouseUp =============================")
        MahjongRoom.eventSystem.emit(Event.TOUCH_TABLE);
        
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        let playerOutNode: Node;
        playerOutNode = cardZone.getChildByName("PlayerOutCardMe")
        if (event.getButton() == EventMouse.BUTTON_LEFT) {
            if (this._clickedTime) {
                if (game.totalTime - this._clickedTime < 500 && MahjongRoom.gameData.getOutCardTurn()) {
                    this.cardTouch(event, playerOutNode);
                    return;
                }
            }
            this._clickedTime = game.totalTime
            // console.log(this._clickedTime)
            let node = this.pickMJ(event)
            if (node) {
                let myHand = this.getPlayerHand(PlayerRole.ME) as myPlayerCard;
                myHand.playSelectAnim(node)
            }
        }
        // 

        // if (event.getButton() == EventMouse.BUTTON_MIDDLE)
        // {
        //     this.onChangeDirection(ScreenDir.HORIZONTAL)
        // }

        // if (event.getButton() == EventMouse.BUTTON_RIGHT)
        // {
        //    this.onChangeDirection(ScreenDir.VERTICAL)
        // }

    }

    onTouchEnd(event: EventTouch) {
        // console.log("cardPlayManager onTouchEnd =============================")
        MahjongRoom.eventSystem.emit(Event.TOUCH_TABLE);
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        let playerOutNode: Node;
        playerOutNode = cardZone.getChildByName("PlayerOutCardMe")
        if (this._clickedTime) {
            if (game.totalTime - this._clickedTime < 300 && MahjongRoom.gameData.getOutCardTurn()) {
                this.cardTouch(event, playerOutNode);
                return;
            }
        }
        this._clickedTime = game.totalTime
        // console.log(this._clickedTime)
        let node = this.pickMJ(event)
        if (node) {
            let myHand = this.getPlayerHand(PlayerRole.ME) as myPlayerCard;
            myHand.playSelectAnim(node)
        }
    }
}


