import { _decorator, Animation, find, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/pdk/Room';
import { CallDealerInfo, CallDealerResult, CallScoreInfo, CallScoreResult, ExtendTable, IMsgUserResult, MsgGameResult, MsgTableInfo, OpInfo, PlayCardInfo, PlayCardResult, RaiseScoreResult } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { Label } from 'cc';
import { CardView } from 'game/room/module/card/src/CardView';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { MsgManaged, Table } from 'idl/tss/game/table.v2';
import { AudioConfig, AudioUtil } from 'game/pdk/res/audio/AudioConfig';
import { CardStack } from 'game/room/framework/card/CardStack';
import { Card } from 'game/room/framework/card/Card';
import { CardInfo } from 'game/room/framework/card/CardInfo';
import { GameStage, Identity } from 'game/pdk/model/GameConst';
import { MateMgr } from 'app/domain/mate/MateMgr';
import { CardTypesConst } from 'game/pdk/config/GameConfig';
import { Audio } from 'bos/exports';
import { ObjectPool } from 'game/room/component/ObjectPool';
import { Sprite } from 'cc';

@ccclass('OutCard')
export class OutCard extends XComponent {

    @property(Label)
    public labNodes: Label[] = [];
    @property(Node)
    public cardViews: Node[] = [];
    @property(Prefab)
    public doublePre: Prefab;
    @property(Prefab)
    public superDouble: Prefab;
    @property(Prefab)
    public otherSuperDouble: Prefab;
    @property(Label)
    public gameName: Label;
    @property(Sprite)
    public gameLogo: Sprite;

    private timerFunc: Function;
    private isPlayFierce: boolean;
    private objectPool: ObjectPool;
    private doubleAnim: Node[] = [];
    private superDoubleAnim: Node[] = [];

    onLoad() {
        this.objectPool = find('Canvas').getComponent(ObjectPool);
        Room.eventSystem.on(ExtendTable.NotifyCallScoreStart.name, this.onNotifyCallScoreStart, this);
        Room.eventSystem.on(ExtendTable.NotifyCallScoreResult.name, this.onNotifyCallScoreResult, this);
        Room.eventSystem.on(ExtendTable.NotifyCallDealerStart.name, this.onNotifyCallDealerStart, this);
        Room.eventSystem.on(ExtendTable.NotifyCallDealerResult.name, this.onNotifyCallDealerResult, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreStart.name, this.onNotifyRaiseScoreStart, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreResult.name, this.onNotifyRaiseScoreResult, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayStart.name, this.onNotifyPlayStart, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayCard.name, this.onNotifyPlayCard, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyDealCard.name, this.setContent, this);
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        Room.eventSystem.on(ExtendTable.NotifyGameStart.name, this.onNotifyGameStart, this);
        Room.eventSystem.on(ExtendTable.NotifyGameResult.name, this.onNotifyGameResult, this);
        Room.eventSystem.on(Table.NotifyTableEnd.name, this.setContent, this);
        Room.matchMgr.on(MateMgr.EventType.ON_READY_DESK, this.setContent, this);

    }

    start() {
        this.updateMatchInfo();
    }

    updateMatchInfo() {
        let info = Room.gameData.getMatchInfo();
        if (info?.matchName && info?.baseScore) {
            this.gameName.string = `${info.matchName}:底分${info.baseScore}`;
        }
    }

    onDisable() {
        Room.matchMgr.removeAll(this);
        Room.eventSystem.removeAll(this);
    }

    stopTimer() {
        if (this.timerFunc) {
            this.unschedule(this.timerFunc);
            this.timerFunc = null;
        }
    }

    resetMusic() {
        if (this.isPlayFierce) {
            Audio.BGM.pause();
            this.isPlayFierce = false;
            Audio.BGM.play(AudioUtil.getMusicPath(AudioConfig.music_Audio_Game_Back));
        }
    }

    onNotifyGameStart() {
        this.updateMatchInfo();
        this.resetMusic();
    }

    onNotifyGameResult(data: MsgGameResult) {
        this.resetMusic();
        this.scheduleOnce(() => {
            this.showAllCards(data.results);
        }, 1)
    }

    onNotifyReconnect(data: MsgTableInfo) {
        this.stopTimer();
        this.resetMusic();
        this.updateMatchInfo();
        this.setContent(Room.gameData.optUid);
        if (data.stage == GameStage.PlayCard) {
            let opt = { seat: -1, cards: [] };
            for (const v of (data.opResults || [])) {
                let playRet = v.play_card_result;
                if (Room.gameData.optUid != playRet.uid && playRet.opcode == 1) {
                    opt = { seat: Room.gameData.getLocalSeatByID(playRet.uid), cards: playRet.cards };
                }
            }
            opt.seat > 0 && this.onPlayCard(opt.cards, opt.seat);
        }
    }

    showAllCards(results: IMsgUserResult[]) {
        for (const v of (results || [])) {
            let seat = Room.gameData.getLocalSeatByID(v.uid);
            if (seat != 1) {
                if (v.leftCards) {
                    this.setContent(v.uid);
                    this.onPlayCard(v.leftCards, seat);
                }
            }
        }
    }

    cleanOutView(seat: number = -1) {
        if (seat < 1) {
            for (let i = 0; i < this.labNodes.length; i++) {
                this.labNodes[i].string = '';
                this.doubleAnim[i] && (this.doubleAnim[i].active = false);
                this.superDoubleAnim[i] && (this.superDoubleAnim[i].active = false);
            }
            for (const v of this.cardViews) {
                for (let i = v.children.length - 1; i >= 0; i--) {
                    this.objectPool.put(v.children[i]);
                }
            }
        } else {
            let index = seat - 1;
            this.labNodes[index].string = '';
            this.doubleAnim[index] && (this.doubleAnim[index].active = false);
            this.superDoubleAnim[index] && (this.superDoubleAnim[index].active = false);

            let parent = this.cardViews[index];
            for (let j = parent.children.length - 1; j >= 0; j--) {
                this.objectPool.put(parent.children[j]);
            }
        }
    }

    setContent(uid: number = -1, str: string = '') {
        let seat = Room.gameData.getLocalSeatByID(uid);
        this.cleanOutView(seat);
        this.playDoubleAnim(seat, str);
    }

    playDoubleAnim(seat: number = -1, str: string = '') {
        if (!seat || seat < 1) { return }

        let index = seat - 1;
        let animNode: Node = null;
        if (str == '加倍') {
            animNode = this.doubleAnim[index];
            if (!animNode) {
                animNode = instantiate(this.doublePre);
                this.doubleAnim[index] = animNode;
                this.cardViews[index].parent.addChild(animNode);
            }
        } else if (str == '超级加倍') {
            animNode = this.superDoubleAnim[index];
            if (!animNode) {
                animNode = instantiate(index == 0 ? this.superDouble : this.otherSuperDouble);
                this.superDoubleAnim[index] = animNode;
                this.cardViews[index].parent.addChild(animNode);
            }
        } else {
            this.labNodes[index].string = str;
        }

        if (animNode?.isValid) {
            animNode.active = true;
            let anim = animNode.getComponent(Animation);
            // 监听动画的 finished 事件
            let func = () => {
                anim.removeAll(this);
                animNode.active = false;
                this.labNodes[index].string = str;
            }
            anim.on(Animation.EventType.FINISHED, func, this);
            anim.play();
        }
    }

    onNotifyCallScoreStart(data: CallScoreInfo) {
        this.setContent(data.uid);
    }

    onNotifyCallScoreResult(data: CallScoreResult) {
        let strCfg = ['不叫', '1 分', '2 分', '3 分'];
        this.setContent(data.uid, strCfg[data.score]);
        let player = Room.gameData.getPlayerByID(data.uid);
        Audio.Effect.playOneShot(AudioUtil.getAudioPath(AudioConfig[`jiaofen${data.callScore}`], player.gender));
        if (data.bottomCards?.length == 0) {
            this.timerFunc = () => {
                this.setContent(data.uid);
                this.timerFunc = null;
            }
            this.scheduleOnce(this.timerFunc, 2);
        }
    }

    onNotifyCallDealerStart(data: CallDealerInfo) {
        this.setContent(data.uid);
    }
    onNotifyCallDealerResult(data: CallDealerResult) {
        console.log('==onNotifyCallDealerResult==', data);
        let opcode = data.opcode;
        if (opcode == 0 && data.caller && data.caller > 0) {
            opcode = 5;
        }
        let retStr = {
            [0]: '不叫',
            [1]: '叫地主',
            [2]: '抢地主',
            [5]: '不抢',
        }
        this.setContent(data.uid, retStr[opcode]);
        let player = Room.gameData.getPlayerByID(data.uid);
        Audio.Effect.playOneShot(AudioUtil.getAudioPath(AudioConfig[`opcode${opcode}`], player.gender));
        if (data.isEnd) {
            this.timerFunc = () => {
                this.setContent(data.uid);
                this.timerFunc = null;
            }
            this.scheduleOnce(this.timerFunc, 2);
        }
    }

    onNotifyRaiseScoreStart(data: OpInfo) {
        this.setContent();
    }
    onNotifyRaiseScoreResult(data: RaiseScoreResult) {
        this.stopTimer();
        let retStr = ['不加倍', '加倍', '超级加倍'];
        this.setContent(data.uid, retStr[data.opcode]);
        let audio = {
            [0]: AudioConfig.opcode6,
            [1]: AudioConfig.opcode3,
            [2]: AudioConfig.opcode4,
        }
        let player = Room.gameData.getPlayerByID(data.uid);
        Audio.Effect.playOneShot(AudioUtil.getAudioPath(audio[data.opcode], player.gender));
    }

    onNotifyManaged(data: MsgManaged) {
        if (Room.gameData.optUid == Room.gameData.getMyID()) {
            this.setContent(data.uid);
        }
    }

    onNotifyPlayStart(data: PlayCardInfo) {
        this.setContent(data.uid);
    }
    onNotifyPlayCard(data: PlayCardResult) {
        this.stopTimer();
        let seat = Room.gameData.getLocalSeatByID(data.uid);
        if (data.cards?.length > 0) {
            this.setContent(data.uid);
            this.onPlayCard(data.cards, seat);
        } else {
            this.setContent(data.uid, '不要');
        }
        this.playAudio(seat, data.cards);
    }

    getCards(cards: number[]): Node[] {
        let cardArr = [];
        let cardStack = new CardStack({ bytes: cards });
        let cardInfo: CardInfo = Room.cardEngine.checkCardInfo(cardStack);
        if (cardInfo?.cards?.length > 0) {
            let arr = [];
            const map = cardInfo.cards.reduce((result, value) => {
                let v = result.get(value.value) || [];
                v.push(value);
                result.set(value.value, v);
                return result;
            }, new Map<number, Card[]>());
            for (const [k, v] of map) {
                arr.push(v);
            }
            arr.sort((a, b) => {
                return b.length != a.length ? (b.length - a.length) : (a[0]?.value - b[0]?.value);
            });
            for (const v of arr) {
                for (const k of v) {
                    let param = { cardByte: k.byte, scale: 0.67 };
                    cardArr.push(this.objectPool.get({ param: param, name: 'CardView' }));
                }
            }
            console.log('==onPlayCard=getCards=', cardInfo, map, arr);
        } else {
            // TODO 摊牌时可能没有cardInfo
            for (const v of cards) {
                let param = { cardByte: v, scale: 0.67 };
                cardArr.push(this.objectPool.get({ param: param, name: 'CardView' }));
            }
            cardArr.sort((cardA, cardB) => {
                let viewA = cardA.getComponent(CardView);
                let viewB = cardB.getComponent(CardView);
                return (viewA.cardValue != viewB.cardValue) ? (viewA.cardValue - viewB.cardValue) : (viewB.cardColor - viewB.cardColor);
            });
        }
        return cardArr;
    }

    onPlayCard(cards: number[], seat: number) {
        let parent = this.cardViews[seat - 1];
        if (!parent || cards?.length == 0) { return };

        let dx = 0;
        let left = 0;
        let rowMaxNum = 10;
        let cardArr = this.getCards(cards);
        let parentW = parent.getComponent(UITransform).width;
        let nodeSize = { ...cardArr[0]?.getComponent(UITransform).contentSize };
        let lastW = parentW - nodeSize.width;

        if (seat == 1) {
            rowMaxNum = cardArr.length;
            dx = Math.min(82, Math.ceil(lastW / (rowMaxNum - 1)));
            let contentW = dx * (rowMaxNum - 1) + nodeSize.width;
            left = (parentW - contentW) / 2;
        } else if (seat == 2 || seat == 3) {
            dx = Math.min(68, Math.ceil(lastW / (rowMaxNum - 1)));
            if (seat == 2) {
                cardArr = cardArr.splice(0, rowMaxNum).reverse().concat(cardArr.reverse());
            }
        }
        for (let i = 0; i < cardArr.length; i++) {
            let node = cardArr[i];
            let pos = new Vec3(0, 0);
            if (seat == 1) {
                let x = left + i * dx - parentW / 2 + nodeSize.width / 2;
                pos = new Vec3(x, 0);
            } else if (seat == 2) {
                let row = Math.ceil((i + 1) / rowMaxNum);
                let column = (i + 1) % rowMaxNum;
                column == 0 && (column = rowMaxNum);
                let y = (1 - row) * 100 - nodeSize.height / 2;
                let x = (1 - column) * dx - nodeSize.width / 2;
                pos = new Vec3(x, y);
            } else if (seat == 3) {
                let row = Math.ceil((i + 1) / rowMaxNum);
                let column = (i + 1) % rowMaxNum;
                column == 0 && (column = rowMaxNum);
                let y = (1 - row) * 100 - nodeSize.height / 2;
                let x = (column - 1) * dx + nodeSize.width / 2;
                pos = new Vec3(x, y);
            }
            node.setPosition(pos);
        }

        if (seat == 2) {
            let len = Math.min(rowMaxNum, cardArr.length);
            for (let i = len - 1; i >= 0; i--) {
                parent.addChild(cardArr[i]);
            }
            for (let i = cardArr.length - 1; i >= len; i--) {
                parent.addChild(cardArr[i]);
            }
        } else {
            cardArr.forEach(v => { parent.addChild(v) });
        }
    }

    playAudio(seat: number, cards: number[]): void {
        let player = Room.gameData.getPlayerByLocalSeat(seat);
        console.log("--outCard.playAudio--", seat, this.isPlayFierce, cards);

        if (cards?.length > 0) {
            let resPath;
            let cardNum = player.getHandCardNum();
            let cardStack = new CardStack({ bytes: cards });
            let outCardInfo: CardInfo = Room.cardEngine.checkCardInfo(cardStack);
            console.log('==outCardInfo==', cardStack, outCardInfo);
            if (cardNum == 1 || cardNum == 2) {
                resPath = "remain" + cardNum;
            } else {
                if (outCardInfo.type === CardTypesConst.CT_SINGLE) {
                    resPath = "pattern_dan" + outCardInfo.cards[0].value;
                } else if (outCardInfo.type === CardTypesConst.CT_PAIR) {
                    resPath = "pattern_dui" + outCardInfo.cards[0].value;
                } else {
                    resPath = "pattern" + outCardInfo.type;
                }
            }
            /**
             * 牌型读音：
                1.首出
                2.单张，对子，炸弹，王炸
                3.同阵营的压制
             */
            let newRound = Room.gameData.roundInfo.isNewRound();
            let preInfo = Room.gameData.roundInfo.getLastPreOpResult();
            let prePlayer = Room.gameData.getPlayerByID(preInfo?.uid);
            console.log("==音乐==resPath", newRound, resPath, outCardInfo, preInfo);

            if (newRound || preInfo?.uid == player.uid || (player.identity == Identity.Normal && prePlayer?.identity == Identity.Normal)) {
                Audio.Effect.playOneShot(AudioUtil.getAudioPath(AudioConfig[resPath], player.gender));
            } else if (outCardInfo.type === CardTypesConst.CT_SINGLE ||
                outCardInfo.type === CardTypesConst.CT_PAIR ||
                outCardInfo.type === CardTypesConst.CT_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_FIVE_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_SIX_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_SEVEN_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_EIGHT_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_MISSILE_CARD ||
                outCardInfo.type === CardTypesConst.CT_DOUBLE_MISSILE_CARD) {
                Audio.Effect.playOneShot(AudioUtil.getAudioPath(AudioConfig[resPath], player.gender));
            } else {
                let pressingEffect = [
                    AudioConfig.Audio_Pressing1,
                    AudioConfig.Audio_Pressing2,
                    AudioConfig.Audio_Pressing3,
                ];
                let i = Math.floor(Math.random() * pressingEffect.length);
                Audio.Effect.playOneShot(AudioUtil.getAudioPath(pressingEffect[i], player.gender));
            }

            if (!this.isPlayFierce && (outCardInfo.type === CardTypesConst.CT_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_FIVE_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_SIX_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_SEVEN_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_EIGHT_BOMB_CARD ||
                outCardInfo.type === CardTypesConst.CT_MISSILE_CARD ||
                outCardInfo.type === CardTypesConst.CT_DOUBLE_MISSILE_CARD ||
                outCardInfo.type === CardTypesConst.CT_THREE_LINE ||
                outCardInfo.type === CardTypesConst.CT_ROCKET_TWO ||
                outCardInfo.type === CardTypesConst.CT_ROCKET_THREE)) {
                Audio.BGM.pause();
                this.isPlayFierce = true;
                Audio.BGM.play(AudioUtil.getMusicPath(AudioConfig.music_Audio_Game_Back_Fierce));
            }

            let outPath;
            if (outCardInfo.type === CardTypesConst.CT_MISSILE_CARD ||
                outCardInfo.type === CardTypesConst.CT_DOUBLE_MISSILE_CARD) {
                outPath = AudioConfig.Audio_huojian;
            } else if (outCardInfo.type === CardTypesConst.CT_ONE_LINE) {
                outPath = AudioConfig.Audio_shunzi;
            } else if (outCardInfo.type === CardTypesConst.CT_DOUBLE_LINE) {
                outPath = AudioConfig.Audio_liandui;
            } else if (outCardInfo.type === CardTypesConst.CT_THREE_LINE ||
                outCardInfo.type === CardTypesConst.CT_THREE_LINE ||
                outCardInfo.type === CardTypesConst.CT_THREE_LINE ||
                outCardInfo.type === CardTypesConst.CT_THREE_LINE) {
                outPath = AudioConfig.Audio_feiji;
            } else {
                outPath = AudioConfig.Audio_chupai;
            }
            console.log("==音乐=outPath=", outPath);
            Audio.Effect.playOneShot(AudioUtil.getAudioPath(outPath, player.gender));
        } else {
            let i = Math.floor(Math.random() * 3);
            let audio = [AudioConfig.Audio_Pass1, AudioConfig.Audio_Pass2, AudioConfig.Audio_Pass3];
            Audio.Effect.playOneShot(AudioUtil.getAudioPath(audio[i], player.gender));
        }
    }
}