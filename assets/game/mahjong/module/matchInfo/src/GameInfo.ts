import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { instantiate } from 'cc';
import { Prefab } from 'cc';
import { MahjongRoom } from 'game/mahjong/Room';
import { Log } from 'bos/exports';

@ccclass('GameInfo')
export class GameInfo extends XComponent {

    @property(Label)
    public raceName: Label;

    @property(Label)
    public raceScore: Label;

    @property(Node)
    public regularNode: Node;

    @property(Prefab)
    public regularPre: Prefab;
    
    start() {
        this.updateMatchInfo();
        if (MahjongRoom.gameData.isRegular()) {
            let regularInfo = instantiate(this.regularPre);
            this.regularNode.addChild(regularInfo);
        }
    }

    onDestroy(): void {
    }

    updateMatchInfo() {
        let info = MahjongRoom.gameData.getMatchInfo();
        this.raceName.string = info.matchName;
        info.baseScore = info.baseScore || 0;
        this.raceScore.string = "底分：".concat(info.baseScore.toLocaleString());
    }

    update(deltaTime: number) {

    }
}