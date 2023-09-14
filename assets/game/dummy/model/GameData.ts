import { GameData as BaseGameData } from "game/room/model/GameData";
import { Log } from "bos/exports";
import { GamePlayer } from "./GamePlayer";
import { MsgTableInfo } from "game/dummy/idl/tss/thailand/dummy";

export class GameData extends BaseGameData {

    /**
     * 获取客户端登录玩家
     */
    public getMySelf(): GamePlayer {
        return this.getPlayerByLocalSeat(1);
    }

    public getAllPlayer(): Array<GamePlayer> {
        return this.playerList as Array<GamePlayer>;
    }

    /**
     * 通过玩家UID获取玩家
     */
    public getPlayerByID(uid: number): GamePlayer | null {
        for (const v of this.playerList) {
            if (v.uid == uid) {
                return v as GamePlayer;
            }
        }
        return null;
    }

    public getLocalSeatBySerSeat(seat: number): number {
        const playerMine = this.getMySelf();
        const max = this.getMaxPlayerCount();
        let offset = seat - playerMine.serverSeat;
        if (offset < 0) {
            offset = max + offset;
        }
        Log.d("==getLocalSeatBySerSeat==", seat, offset)
        return offset + 1;
    }

     /**
     * 通过服务座位号获取玩家
     */
     public getPlayerByServerSeat(serverSeatID: number): GamePlayer | null {
        for (const v of this.playerList) {
            if (v.serverSeat == serverSeatID) {
                return v as GamePlayer;
            }
        }
        return null;
    }

    /**
     * 通过本地座位号获取玩家
     */
    public getPlayerByLocalSeat(localSeat: number): GamePlayer | null {
        return this.playerList[localSeat - 1] as GamePlayer;
    }


    firstCard: number;

    public resetGameData(isNewGame?: boolean) {
        this.firstCard = 0;
    }

    public resetPlayerData(isNewGame?: boolean) {
        for (let player of this.getAllPlayer()) {
            player.resetPlayerData(isNewGame);
        }
    }

    public initPlayer(playerNum: number) {
        Log.d("==initPlayer==", playerNum)
        this.playerList = [];
        for (let seat = 0; seat < playerNum; seat++) {
            let player = new (GamePlayer);
            player.init();
            player.localSeat = seat + 1;
            this.playerList[seat] = player;
        };
    }

    public setTableInfo(msg: MsgTableInfo) {
        let users = msg.users;

        let loginId = this.getMyID();
        for (let i = 0; i < users.length; i++) {
            let info = users[i];
            if (info.uid == loginId) {
                let player = this.getMySelf();
                player.serverSeat = info.seat;
                player.uid = info.uid;
                player.refresh();
                break;
            }
        }

        let playerList = this.getAllPlayer();
        for (let i = 0; i < users.length; i++) {
            let info = users[i];
            if (info.uid != loginId) {
                let seat = this.getLocalSeatBySerSeat(info.seat);
                playerList[seat - 1].serverSeat = info.seat;
                playerList[seat - 1].uid = info.uid;
                playerList[seat - 1].refresh();
            }
        }
        
        for (let i = 0; i < users.length; i++) {
            let v = users[i];
            let localSeat = this.getLocalSeatBySerSeat(v.seat);
            
        }
    }

    setFirstCard(card: number) {
        this.firstCard = card;
    }
}
