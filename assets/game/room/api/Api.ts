import { IJoinResp } from "idl/tss/game/observer.v5";

export enum TableInfoFlag {
    Observe = 1,
    Replay = 2,
}

//用于处理组装桌子数据，应由子游戏实现
export class Api {

    //根据flag，分别处理围观和回放数据
    getTableInfo(flag: number, data: any) {
        
    }
    
    getObTableInfo(data: IJoinResp) {
        return this.getTableInfo(TableInfoFlag.Observe, data);
    }

    getReplayTableInfo(data: any) {
        return this.getTableInfo(TableInfoFlag.Replay, data);
    }
}