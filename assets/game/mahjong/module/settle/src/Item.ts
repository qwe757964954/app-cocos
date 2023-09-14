import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { GameData } from '../../../model/GameData';
import { MahjongRoom } from 'game/mahjong/Room';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { Color } from 'cc';
import { Room } from 'game/room/Room';
import { uiMgr } from 'bos/exports';

export type ItemInfo = {
    uid: number, //玩家uid
    name: string,
    fan: number, //结算番薯
    score: number, //结算输赢结果
    avatar: string,
    isBanker: boolean,
}

@ccclass('SettleItem')
export class SettleItem extends XComponent {

    @property(Node)
    public icon: Node | null = null;

    @property(Avatar)
    public avatar: Avatar | null = null;

    @property(Label)
    public nickName: Label | null = null;

    @property(Label)
    public fan: Label | null = null;

    @property(Label)
    public num: Label | null = null;

    @property(Node)
    public report: Node | null = null;



    start() {
        
    }

    update(deltaTime: number) {

    }

    //初始化item信息
    init(info: ItemInfo) {
        this.avatar.setUserID(info.uid);
        this.icon.active = info.isBanker;
        this.nickName.string = info.name;
        this.fan.string = info.fan.toLocaleString().concat("番");
        this.num.string = info.score.toLocaleString();
        
        let labelColor: Color;
        if (info.score > 0) {
            labelColor = new Color("#E3C286");
        } else {
            labelColor = new Color("#8AA6C7");
        }
        this.num.color = labelColor;
    }

    resetView() {

    }

    //点击举报，举报弹框
    onReport() {
        uiMgr.loadPopup("room@module/report/res/prefab/Report");
    }
}