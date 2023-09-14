import { MsgHandler as BaseMsgHandler } from 'game/room/net/MsgHandler';
import { Audio, Log, resLoader } from 'bos/exports';
import { PlayerState } from 'game/room/model/Player';
import { MsgManaged, MsgTableInfo as TableInfo } from 'idl/tss/game/table.v2';
import { MsgDealCard, MsgFirstCardInfo, MsgGameResult, MsgGameStart, MsgScoreChange, MsgTableInfo, PlayCardInfo, PlayOpResult } from 'game/dummy/idl/tss/thailand/dummy';
import { Room } from '../src/component/Room';
import { Event } from '../config/Event';

export class MsgHandler extends BaseMsgHandler {
    private static instance: MsgHandler = null;
    public static Instance(): MsgHandler {
        if (this.instance == null) {
            this.instance = new MsgHandler();
        }
        return this.instance;
    }

    onTableEvent(name: string, data: any): void {
        Log.d("==onTableEvent==", name, data);
        // 检查方法名是否存在
        let methodName = "on".concat(name);
        if (typeof this[methodName] === "function") {
            // 使用this和方法名的字符串调用方法
            this[methodName](data);
        } else {
            Log.d(methodName.concat("方法 not found...."));
        }
    }

    onClearTable() {
        Room.gameData.resetGameData(true);
        Room.gameData.resetPlayerData(true);
        Room.eventSystem.emit(Event.RESET_VIEW);
    }

    setTableStart(data: TableInfo, isConnect: boolean = false) {
        this.onClearTable();
        let msg: MsgTableInfo = MsgTableInfo.decode(data.tableInfo);
        let playerList = Room.gameData.getAllPlayer();
        for (let player of playerList) {
            player.state = PlayerState.Playing;
            player.refresh()
        }
        Room.gameData.setTableInfo(msg);
    }

    onNotifyGameStart(data: any) {
        let msg = data as MsgGameStart;

    }

    onNotifyDealCard(data: any) {
        let msg = data as MsgDealCard;
        let dealInfos = msg.dealCards;
        for(let info of dealInfos) {
            let player = Room.gameData.getPlayerByID(info.uid);
            player.setCards(info.value.uint32s_value.value);
        }
    }

    onNotifyFirstCard(data: any) {
        let msg = data as MsgFirstCardInfo;
        Room.gameData.setFirstCard(msg.value);
    }

    onNotifyPlayStart(data: any) {
        let msg = data as PlayCardInfo;
        let player = Room.gameData.getPlayerByID(msg.uid);
        player.setOpCodes(msg.opcodes);
        player.setOptions(msg.options);
    }

    onNotifyOpResult(data: any) {
        let msg = data as PlayOpResult;
        let player = Room.gameData.getPlayerByID(msg.uid);
        player.setOpCodes();
        player.setOptions();
        player.setOpResult(msg.opResult);
    }

    onNotifyScoreChange(data: any) {
        let msg = data as MsgScoreChange;
        let changes = msg.data;
        for (let index = 0; index < changes.length; index++) {
            let change = changes[index];
            let player = Room.gameData.getPlayerByID(change.uid);
            player.setScoreChange(change);
        }
    }

    onNotifyGameResult(data: any) {
        let msg = data as MsgGameResult;

    }

    onNotifyManaged(data: any) {
        let msg = data as MsgManaged;
        super.onNotifyManaged(msg);
    }

    setTableEnd(): void {
        this.onClearTable();
    }

    release(): void {
        super.release();
    }
}