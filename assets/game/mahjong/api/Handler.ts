import { MsgManaged, MsgTableInfo } from "idl/tss/game/table.v2";
import { BetEnd, DealCardInfo, ExtendTable, FixBanker, HandCards, ITable, OperateOption, OperateResultInfo, Table } from "../idl/tss/mahjong/extendtable";
import { OpCode } from "../config/OpCode";
import { Log } from "bos/exports";
import { RpcService } from "bos/framework/network/rpc/RpcService";
import BufferUtil from "bos/utils/BufferUtil";

//根据消息包，组装桌子消息
export class Handler {

    mainUid: number;
    replayTableInfo: ITable;
    extendTable: RpcService = ExtendTable;

    //初始化桌子数据（跟后端游戏桌子协议一致）
    init(uid: number) {
        this.mainUid = uid;
        this.replayTableInfo = {};
    }

    getReplayTableInfo() {
        Log.d("=handler=getReplayTableInfo=", this.replayTableInfo);
        return this.replayTableInfo;
    }

    switchMethod(args :any[]){
        let [method, msg, params] = args;
        Log.d("==switchMethod==", method, msg, params)
        switch (method) {
            case "NotifyTableStart":
                this.onNotifyTableStart(msg as MsgTableInfo);
                break;
            case "NotifyManaged":
                this.onNotifyManaged(msg as MsgManaged);
                break;
            default:
                this.onTableMsg(msg)
                break;
        }
    }

    onTableMsg(msg) {
        let eventOpts = this.extendTable.getEventOptions(msg.eventID)
        if (eventOpts) {
            let buffer = BufferUtil.sliceBuffer(msg.msg ?? new Uint8Array())
            let data = this.extendTable[eventOpts.func]?.call(this.extendTable, buffer)
            Log.d("onTableMsg...", eventOpts.func, data.msg)
            // 检查方法名是否存在
            let methodName = "on".concat(eventOpts.func);
            if (typeof this[methodName] === "function") {
                // 使用this和方法名的字符串调用方法
                this[methodName](data.msg);
            } else {
                Log.d(methodName.concat("方法 not found...."));
            }
        }
    }

    getUserByID(uid: number) {
        let users = this.replayTableInfo.users;
        for (let user of users) {
            if (user.uid == uid) {
                return user;
            }
        }
    }

    isContains(cards: number[], card: number): boolean {
        for (let v of cards) {
            if (v == card) {
                return true
            }
        }
        return false;
    }

    isArrayMixed(cards1: number[], cards2: number[]): boolean {
        for (let v1 of cards1) {
            for (let v2 of cards2) {
                if (v1 === v2) {
                    return true;
                }
            }
        }
        return false;
    }

    onNotifyTableStart(msg: MsgTableInfo) {
        let data: Table = Table.decode(msg.tableInfo);
        this.replayTableInfo.users = data.users
    }

    onEndBet(data: any) {
        let msg = data as BetEnd;
        this.replayTableInfo.betDatas = msg.betDatas;
    }

    onDingZhuang(data: any) {
        let msg = data as FixBanker;
        this.replayTableInfo.bankerId = msg.bankerId;
    }

    onDealCard(data: any) {
        let msg = data as DealCardInfo;
        this.replayTableInfo.wallCnt = msg.wallCnt;
        for (let info of msg.dealCards) {
            let user = this.getUserByID(info.uid);
            if (info.cards && info.cards.length > 0) {
                user.handCard = { uid: info.uid, cards: info.cards };
            } else {
                let cards: number[] = [];
                for (let index = 0; index < info.count; index++) {
                    cards.push(0);
                }
                user.handCard = { uid: info.uid, cards: cards };
            }
        }
    }

    onStartOperate(data: any) {
        let msg = data as OperateOption;
        this.replayTableInfo.preOpUid = msg.uid;
        let user = this.getUserByID(msg.uid);
        user.opts = msg;
    }

    onOperateResult(data: any) {
        let msg = data as OperateResultInfo;
        if (msg.wallCnt) {
            this.replayTableInfo.wallCnt = msg.wallCnt;
        }
        let user = this.getUserByID(msg.uid);
        let opCode = msg.opData.opCode;
        if (opCode == OpCode.OPE_GRAB) {
            user.handCard.lastCard = msg.opData.opCard;
        } else {
            user.handCard.lastCard = 0;
        }

        let funcMap = {
            [OpCode.OPE_GRAB]: this.grabCard.bind(this),
            [OpCode.OPE_OUT_CARD]: this.setOutCard.bind(this),
            [OpCode.OPE_FOLD]: this.setOutCard.bind(this),
            [OpCode.OPE_FEN_ZHANG]: this.setFenZhangCard.bind(this),
            [OpCode.OPE_CHI]: this.addOpData.bind(this),
            [OpCode.OPE_PENG]: this.addOpData.bind(this),
            [OpCode.OPE_AN_GANG]: this.addOpData.bind(this),
            [OpCode.OPE_PENG_GANG]: this.addOpData.bind(this),
            [OpCode.OPE_BU_GANG]: this.updateOpData.bind(this),
            [OpCode.OPE_TING]: this.setOutCard.bind(this),
            [OpCode.OPE_JIA_TING]: this.setOutCard.bind(this),
            [OpCode.OPE_ZI_MO]: this.removeCard.bind(this),
            [OpCode.OPE_LANG_QI_OUT_CARD]: this.setOutCard.bind(this),
        }
        if (funcMap[opCode]) {
            funcMap[opCode](msg)
        }
        this.setTingOpInfoByOpResult(msg)
    }

    grabCard(msg: OperateResultInfo) {
        let user = this.getUserByID(msg.uid);
        if (user.uid == this.mainUid) {
            user.handCard.cards.push(msg.opData.opCard);
        }
    }

    setOutCard(msg: OperateResultInfo) {
        let user = this.getUserByID(msg.uid);
        let card = msg.opData.opCard;
        if (this.isContains(user.handCard.cards, card)) {
            for (let i = user.handCard.cards.length - 1; i >= 0; i--) {
                if (user.handCard.cards[i] === card) {
                    user.handCard.cards.splice(i, 1);
                    break;
                }
            }
            user.outCards.push(card);
        } else {
            if (user.handCard.cards[0] == 0) {
                let cards: number[] = [];
                for (let index = 0; index < msg.handCnt; index++) {
                    cards.push(0);
                }
                user.handCard.cards = cards;
            }
            user.outCards.push(card);
        }
    }

    setFenZhangCard(msg: OperateResultInfo) {
        this.grabCard(msg);
    }

    addOpData(msg: OperateResultInfo) {
        let user = this.getUserByID(msg.uid);
        let opData = msg.opData;
        // 先移出手牌
        if (user.handCard.cards[0] === 0) {
            let cards: number[] = [];
            for (let i = 0; i < msg.handCnt; i++) {
                cards.push(0);
            }
            user.handCard.cards = cards;
        } else {
            for (let i = user.handCard.cards.length - 1; i >= 0; i--) {
                if (this.isContains(opData.opCards, user.handCard.cards[i])) {
                    user.handCard.cards.splice(i, 1);
                }
            }
        }

        // 存储opData
        let opGroups = user.handCard.opGroups || [];
        opGroups.push(opData);
        user.handCard.opGroups = opGroups;
    }

    updateOpData(msg: OperateResultInfo) {
        let user = this.getUserByID(msg.uid);
        let opData = msg.opData;
        // 先移出手牌
        if (user.handCard.cards[0] === 0) {
            let cards: number[] = [];
            for (let i = 0; i < msg.handCnt; i++) {
                cards.push(0);
            }
            user.handCard.cards = cards;
        } else {
            for (let i = user.handCard.cards.length - 1; i >= 0; i--) {
                if (this.isContains(opData.opCards, user.handCard.cards[i])) {
                    user.handCard.cards.splice(i, 1);
                }
            }
        }

        let opGroups = user.handCard.opGroups;
        for (let i = 0; i < opGroups.length; i++) {
            let v = opGroups[i];
            if (this.isArrayMixed(opData.opCards, v.opCards)) {
                opGroups[i] = opData;
                break;
            }
        }
    }

    removeCard(msg: OperateResultInfo) {
        let user = this.getUserByID(msg.uid);
        let opData = msg.opData;
        if (user.handCard.cards[0] === 0) {
            let cards: number[] = [];
            for (let i = 0; i < msg.handCnt; i++) {
                cards.push(0);
            }
            user.handCard.cards = cards;
        } else {
            for (let i = user.handCard.cards.length - 1; i >= 0; i--) {
                if (user.handCard.cards[i] === opData.opCard) {
                    user.handCard.cards.splice(i, 1);
                    break;
                }
            }
        }
    }

    setTingOpInfoByOpResult(msg: OperateResultInfo) {
        let isTingMap: Record<number, boolean> = {
            [OpCode.OPE_TING]: true,
            [OpCode.OPE_JIA_TING]: true,
            [OpCode.OPE_LANG_QI]: true,
        };
        // 更新听牌信息
        let opCode = msg.opData.opCode;
        let user = this.getUserByID(msg.uid);
        user.tingInfo = {
            isTing: isTingMap[opCode] || false,
            tingCode: isTingMap[opCode] ? opCode : 0,
            tingList: msg.tingList || [],
        };
    }

    onNotifyManaged(msg: MsgManaged) {
        let user = this.getUserByID(msg.uid);
        user.isTrust = msg.isManaged;
    }

    onShowCards(data: any) {
        let msg = data as HandCards;
        for (let v of msg.handCards) {
            let user = this.getUserByID(v.uid);
            user.handCard = v;
        }
    }
} 