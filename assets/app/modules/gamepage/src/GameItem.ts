import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { CCString } from 'cc';
import { App } from 'app/App';
import { CCInteger } from 'cc';
import { MatchType } from 'idl/tss/match_v2/common/common';
import { StartTableFlag } from 'idl/tss/game/fortest.v1';

@ccclass('GameItem')
export class GameItem extends XComponent {
    @property({type: CCString})
    gameID: string

    @property({type: CCInteger})
    playWay: number

    onClick() {
        App.mateMgr.joinDesk({
            gameID: this.gameID,
            playWay: this.playWay,
        })
        // var playerNums = {
        //     ["landlord-tysanrenddz"]:  3,
        //     ["mahjong-hnxinxiang"]: 4,
        // }
        // App.gameMgr.quickStart({
        //     playWay: this.playWay,
        //     gameID: this.gameID,
        //     matchType: MatchType.MatchTypeMate,
        //     flag: StartTableFlag.StartTableFlag_AddRobot,
        //     playerNum: playerNums[this.gameID],
        // })
    }
}