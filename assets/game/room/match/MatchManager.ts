import { EventTargetExtends, EmptyClass } from "bos/utils/ClassUtils";
import { Room } from "../Room";
import { MateMatch } from "./MateMatch";
import { Desk } from "app/domain/mate/Desk";
import { MatchInfo } from "../model/GameData";
import { App } from "app/App";
import { RegularMatch } from "./RegularMatch";
import { RoomInfo, ShowStageInfo, ShowUserInfo } from "app/domain/match/match/data/RoomInfo";
import { MatchHandler } from "app/domain/match/match/handler/MatchHandler";


export class MatchManager extends EventTargetExtends(EmptyClass) {

    public delegate: MateMatch | RegularMatch;

    public init() {
        console.log('==MatchManager.init==', Room.gameData.isMatching(), Room.gameData.isRegular());
        if (Room.gameData.isMatching()) {
            this.delegate = new MateMatch();
        } else if (Room.gameData.isRegular()) {
            this.delegate = new RegularMatch();
        } else {
            this.delegate = new MateMatch();
        }
        this.delegate.init(this);
    }

    release() {
        this.delegate.release();
    }

    getMatchInfo(): MatchInfo {
        let ret = this.delegate.getMatchInfo();
        console.log('==getMatchInfo==', ret);
        return ret;
    }

    getShowStageInfo(): ShowStageInfo {
        return (this.delegate as RegularMatch).getShowStageInfo();
    }

    getShowUserInfo(): ShowUserInfo {
        return (this.delegate as RegularMatch).getShowUserInfo();
    }

    getRoomInfo(): RoomInfo {
        if (Room.gameData.isRegular()) {
            return (this.delegate as RegularMatch).getRoomInfo();
        }
    }
           
    getRegularHandler(): MatchHandler {
        return (this.delegate as RegularMatch).getRegularHandler();
    } 
}
