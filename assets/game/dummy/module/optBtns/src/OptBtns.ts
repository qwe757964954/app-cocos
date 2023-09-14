import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/dummy/src/component/Room';
import { ExtendTable, IBornCardInfo, IFollowCardInfo, IOperateReq, IOpResult, IOptionList, IPutCardInfo, Opcode, OperateReq, PlayCardInfo, PlayOpResult} from 'game/dummy/idl/tss/thailand/dummy';
import { Event } from 'game/dummy/config/Event';
import { Log, uiMgr } from 'bos/exports';
import { CardStack } from 'game/room/framework/card/CardStack';
import { CardEngine } from 'game/room/framework/card/CardEngine';
import { BlockList } from 'net';

type OpStartInfo = {
    isFirst: boolean,
    isSpecial: boolean,
    isCanBorn: boolean,
    isCanFollow: boolean,
    isCanPut: boolean,
}

@ccclass('dummy-OptBtns')
export class OptBtns extends XComponent {
    @property(Sprite)
    public bornBtn: Sprite | null = null;  //生牌

    @property(Sprite)
    public specialBtn: Sprite | null = null;  //秀牌  2&Q

    @property(Sprite)
    public drawBtn: Sprite | null = null;  //要牌

    @property(Sprite)
    public dropBtn: Sprite | null = null;  //弃牌，即出牌

    @property(Sprite)
    public putBtn: Sprite | null = null;   //下牌

    @property(Sprite)
    public followBtn: Sprite | null = null;  //存牌

    @property(Sprite)
    public cancelBtn: Sprite | null = null;   //取消

    @property(Sprite)
    public defineBtn: Sprite | null = null;  //确定

    @property(Node)
    public firstBtns: Node | null = null;  //生、秀、要按钮的父节点

    @property(Node)
    public secondBtns: Node | null = null;  //存、下、出按钮的父节点

    @property(Node)
    public opBtns: Node | null = null;  //取消、确定按钮的父节点

    optionList: IOptionList = null;
    popupCards: number[] = [];
    isFirst: boolean = false;
    opCode: number;
    opInfo: any;

    onLoad(): void {
        Room.eventSystem.on(ExtendTable.NotifyPlayStart.name, this.onPlayStart, this);
        Room.eventSystem.on(ExtendTable.NotifyOpResult.name, this.onOpResult, this);
        Room.eventSystem.emit(Event.POPUP_CARD_CHANGE, this.onPopupCardChange, this);
    }

    start() {

    }

    update(deltaTime: number) {

    }

    showOpBtns() {
        this.firstBtns.active = false;
        this.secondBtns.active = false;
        this.opBtns.active = true;
    }

    hideAllBtn() {
        this.firstBtns.active = false;
        this.secondBtns.active = false;
        this.opBtns.active = false;
    }

    //操作可分为两个操作阶段，一个是生牌、要牌、秀牌阶段 isFirst为true，一个是下牌、存牌、出牌阶段 isFirst为true，在一个阶段，要隐藏另一个阶段的操作按钮
    updateBtnByStage(isFirst: boolean) {
        this.firstBtns.active = isFirst;
        this.secondBtns.active = !isFirst;
    }

    //设置按钮的状态，isEnable为false时，置灰
    setBtnEnable(btn: Sprite, isEnable: boolean) {

        btn.enabled = isEnable;
    }

    //开始操作，显示按钮
    onPlayStart(msg: PlayCardInfo) {
        let seat = Room.gameData.getLocalSeatByID(msg.uid);
        if (seat == 1) { //只有“我”才需显示操作按钮
            let opCodes = msg.opcodes;
            this.optionList = msg.options;
            let opStartInfo: OpStartInfo = {
                isFirst: false,
                isSpecial: false,
                isCanBorn: false,
                isCanFollow: false,
                isCanPut: false,
            }
            for (let opCode of opCodes) {
                switch (opCode) {
                    case Opcode.OpcodeBornCard: {
                        opStartInfo.isFirst = true;
                        opStartInfo.isCanBorn = true;
                        break;
                    }
                    case Opcode.OpcodeDrawCard: {
                        opStartInfo.isFirst = true;
                        break;
                    }
                    case Opcode.OpcodeShowSpecialCard: {
                        opStartInfo.isFirst = true;
                        opStartInfo.isSpecial = true;
                        break;
                    }
                    case Opcode.OpcodeFollowCard: {
                        opStartInfo.isCanFollow = true;
                        opStartInfo.isFirst = false;
                        break;
                    }
                    case Opcode.OpcodePutCard: {
                        opStartInfo.isFirst = false;
                        opStartInfo.isCanPut = true;
                        break;
                    }
                    case Opcode.OpcodeDropCard: {
                        opStartInfo.isFirst = false;
                        break;
                    }
                    default:
                        break;
                }
            }
            if (opStartInfo.isSpecial) {
                this.specialBtn.node.active = true;
            }
            this.isFirst = opStartInfo.isFirst;
            this.setBtnEnable(this.bornBtn, opStartInfo.isCanBorn);
            this.setBtnEnable(this.followBtn, opStartInfo.isCanFollow);
            this.setBtnEnable(this.putBtn, opStartInfo.isCanPut);
            this.updateBtnByStage(opStartInfo.isFirst);
        } else {
            this.hideAllBtn();
        }
    }

    //操作结果
    onOpResult(msg: PlayOpResult) {
        this.optionList = null;
        this.isFirst = false;

    }

    onPopupCardChange() {
        this.popupCards = Room.gameData.getMySelf().getPopupCards();
        Log.d("==onPopupCardChange=this.popupCards=", this.popupCards);
        let opCode = this.opCode;
        let data = {};
        switch (opCode) {
            case Opcode.OpcodeBornCard: {
                let bornList = this.optionList.born_card_opts.targets;
                for (let index = 0; index < bornList.length; index++) {
                    let info = bornList[index];
                    let isEqual = this.checkIsEqual(info.cards);
                    if (isEqual) {
                        this.setBtnEnable(this.defineBtn, true);
                    }
                    this.opInfo = isEqual ? info : null;
                }
                break;
            }
            case Opcode.OpcodeFollowCard: {
                let followList = this.optionList.follow_card_opts.targets;
                for (let index = 0; index < followList.length; index++) {
                    let info = followList[index];
                    let isEqual = this.checkIsEqual(info.cards);
                    if (isEqual) {
                        this.setBtnEnable(this.defineBtn, true);
                    }
                    this.opInfo = isEqual ? info : null;
                }
                break;
            }
            case Opcode.OpcodePutCard: {
                let putList = this.optionList.put_card_opts.targets;
                for (let index = 0; index < putList.length; index++) {
                    let info = putList[index];
                    let isEqual = this.checkIsEqual(info.cards);
                    if (isEqual) {
                        this.setBtnEnable(this.defineBtn, true);
                    }
                    this.opInfo = isEqual ? info : null;
                }
                break;
            }
            case Opcode.OpcodeDropCard: {
                this.setBtnEnable(this.defineBtn, this.popupCards.length == 1);
                let isDummy = this.checkIsDummy(this.popupCards[0]);
                isDummy && uiMgr.showToast("丢大米！")
                break;
            }
            default:
                break;
        }
    }

    //判断选中的牌是否与后端传过来的可操作的牌一致， cards为后端传过来的一组可操作性牌
    checkIsEqual(cards: number[]) {
        if (this.popupCards.length == 0 || this.popupCards.length != cards.length) {
            return false;
        } else {
            let equalNum = 0;
            for (let pCard of this.popupCards) {
                for (let card of cards) {
                    if (pCard === card) {
                        equalNum++;
                        break;
                    }
                }
            }
            return equalNum == cards.length;
        }
    }

    //检测出牌是否为丢大米，提示玩家
    checkIsDummy(card: number) {
        let players = Room.gameData.getAllPlayer();
        for (let player of players) {
            //存牌
            let followInfo = player.getFollow();
            for (let index = 0; index < followInfo.length; index++) {
                let info = followInfo[index];
                let cards = [...info.cards];
                cards.push(this.popupCards[0]);
                let cardStack = new CardStack({ bytes: cards });
                console.log('==checkDummy==', this.popupCards, cardStack);
                let cardInfo = Room.cardEngine.checkCardInfo(cardStack);
                if (cardInfo) { //要出牌的牌可与其他玩家或者自己的牌做成牌型，即为丢大米
                    return true;
                }
            }

            //生牌
            let bornInfo = player.getBorn();
            for (let index = 0; index < bornInfo.length; index++) {
                let info = bornInfo[index];
                let cards = [...info.cards];
                cards.push(this.popupCards[0]);
                let cardStack = new CardStack({ bytes: cards });
                console.log('==checkDummy==', this.popupCards, cardStack);
                let cardInfo = Room.cardEngine.checkCardInfo(cardStack);
                if (cardInfo) { //要出牌的牌可与其他玩家或者自己的牌做成牌型，即为丢大米
                    return true;
                }
            }

            //下牌
            let putInfo = player.getPut();
            for (let index = 0; index < putInfo.length; index++) {
                let info = putInfo[index];
                let cards = [...info.cards];
                cards.push(this.popupCards[0]);
                let cardStack = new CardStack({ bytes: cards });
                console.log('==checkDummy==', this.popupCards, cardStack);
                let cardInfo = Room.cardEngine.checkCardInfo(cardStack);
                if (cardInfo) { //要出牌的牌可与其他玩家或者自己的牌做成牌型，即为丢大米
                    return true;
                }
            }
        }
    }

    //点击生牌
    onBornClick() {
        this.opCode = Opcode.OpcodeBornCard;
        this.showOpBtns();
    }

    //点击存牌
    onFollowClick() {
        this.opCode = Opcode.OpcodeFollowCard;
        this.showOpBtns();
    }

    //点击下牌
    onPutClick() {
        this.opCode = Opcode.OpcodePutCard;
        this.showOpBtns();
    }

    //点击弃牌,每次只能弃一张，多张不满足条件
    onDropClick() {
        this.opCode = Opcode.OpcodeDropCard;
        this.showOpBtns();
    }

    //点击要牌，向后端请求发一张牌
    onDrawClick() {
        this.opCode = Opcode.OpcodeDrawCard;
        this.showOpBtns();
    }

    //点击 秀2&Q，前端要秀
    onSpecialClick() {
        this.opCode = Opcode.OpcodeShowSpecialCard;
        this.showOpBtns();
    }

    onCancelClick() {

    }

    onDefineClick() {
        let opCode = this.opCode;
        let data = {};
        switch (opCode) {
            case Opcode.OpcodeBornCard: {
                data = {
                    uid: Room.gameData.getMyID(),
                    born_card_info: this.opInfo as IBornCardInfo,
                }
                break;
            }
            case Opcode.OpcodeDrawCard: {
                data = {
                    uid: Room.gameData.getMyID(),
                }
                break;
            }
            case Opcode.OpcodeShowSpecialCard: {
                data = {
                    uid: Room.gameData.getMyID(),
                }
                break;
            }
            case Opcode.OpcodeFollowCard: {
                data = {
                    uid: Room.gameData.getMyID(),
                    follow_card_info: this.opInfo as IFollowCardInfo,
                }
                this.sendOpToServer(Opcode.OpcodeFollowCard, data);
                break;
            }
            case Opcode.OpcodePutCard: {
                data = {
                    uid: Room.gameData.getMyID(),
                    put_card_info: this.opInfo as IPutCardInfo,
                }
                this.sendOpToServer(Opcode.OpcodePutCard, data);
                break;
            }
            case Opcode.OpcodeDropCard: {
                data = {
                    uid: Room.gameData.getMyID(),
                    drop_card_info: {
                        uid: Room.gameData.getMyID(),
                        card: this.popupCards[0], //要出的牌
                    },
                }
                break;
            }
            default:
                break;
        }
        this.sendOpToServer(opCode, data);
    }

    sendOpToServer(opCode: number, opResult: IOpResult) {
        let req: IOperateReq = {
            opcode: opCode,
            data: opResult,
        }
        Room.msgHandler.sendTableAction(ExtendTable.DoOperate, req);
    }

}