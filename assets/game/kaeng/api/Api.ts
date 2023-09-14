import { Handler } from "./Handler";
import { Api as BaseApi, TableInfoFlag } from "game/room/api/Api";


export class Api extends BaseApi {
    private handler: Handler = new Handler();
    
    getTableInfo(flag: number, data: any) {
        //根据flag，分别处理围观和回放数据
        this.handler.init();
        if (flag == TableInfoFlag.Observe) { //处理围观
            
        }
        else if (flag == TableInfoFlag.Replay) { //牌局回放

        }
    }
} 