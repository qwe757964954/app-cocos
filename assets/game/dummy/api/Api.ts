import { Handler } from "./Handler";
import { Api as BaseApi, TableInfoFlag } from "game/room/api/Api";

export class Api extends BaseApi {
    private handler: Handler = new Handler();

    getTableInfo(flag: number, data: any) {
        //根据flag，分别处理围观和回放数据
        this.handler.init(data.mainUid);
        if (flag == TableInfoFlag.Observe) { //处理围观, 围观只有在聊天室需要显示牌的时候才做处理，否则暂不做处理
            
        }
        else if (flag == TableInfoFlag.Replay) { //牌局回放
            //TODO: 将所有消息处理完

            return this.handler.getReplayTableInfo()
        }
    }
} 