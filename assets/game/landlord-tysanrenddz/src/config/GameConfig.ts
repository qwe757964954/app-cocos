
import { Vec3 } from "cc";
import { PdkGameConfig } from "game/pdk/config/GameConfig";
import { MatchType } from "idl/tss/match_v2/common/common";


export class GameConfig extends PdkGameConfig {

    static playerNum: number = 3;

    static init() {
        super.init();
    }

}