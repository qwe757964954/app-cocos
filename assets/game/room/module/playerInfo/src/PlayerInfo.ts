import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { Label } from 'cc';
import { Room } from 'game/room/Room';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { Log, uiMgr } from 'bos/exports';
import { App } from 'app/App';
import { AttrTag } from 'idl/tss/game/api';

interface InfoType {
    uid: number
}

@ccclass('PlayerInfo')
export class PlayerInfo extends XComponent {

    @property(Node)
    public bg: Node | null = null;

    @property(Node)
    public infoBg: Node | null = null;

    @property(Avatar)
    public avatar: Avatar | null = null;

    @property(Label)
    public nick: Label | null = null;

    @property(Sprite)
    public sexIcon: Sprite | null = null;

    @property(Label)
    public lv: Label | null = null;

    @property(Label)
    public id: Label | null = null;

    @property(Label)
    public all: Label | null = null;

    @property(Label)
    public win: Label | null = null;

    @property(Label)
    public gold: Label | null = null;

    @property(Label)
    public allNum: Label | null = null;

    @property(Label)
    public winRate: Label | null = null;

    @property(Label)
    public goldNum: Label | null = null;

    //关闭
    onClose() {
        uiMgr.removePopup(this.node);
    }

    //举报
    onReport(){
        this.onClose();
        uiMgr.loadPopup("room@module/report/res/prefab/Report");
    }

    //拉黑
    onBlock(){

    }

    setup(data: InfoType) {
        if (Room.gameData.isRegular()) {
            this.all.string = "参赛次数：";
            this.win.string = "获 奖 率：";
            this.gold.string = "冠军次数：";
        } else {
            this.all.string = "总 局 数：";
            this.win.string = "胜   率：";
            this.gold.string = "冠军次数：";
        }

        this.showPlayerInfo(data.uid);
    }

    //根据uid，显示玩家信息
    showPlayerInfo(uid: number){
        this.avatar.setUserID(uid);
        this.showMatchInfo(uid);
        this.id.string = "ID: ".concat(uid.toLocaleString());
        let player = Room.gameData.getPlayerByID(uid);
        this.nick.string = player.nickname;
        let sexSprite = this.sexIcon.getComponent(BundleSprite);
        if (sexSprite) {
            let sex = player.gender == 1 ? "M" : "F"; 
            sexSprite.spriteFrame = `room@res/common/ResApp_Game_Icon-${sex}`;
        };

        this.infoBg.active = true;
        this.bg.active = true;
    }

    //玩家比赛相关信息
    async showMatchInfo(uid: number){
        let infos = await App.userMgr.getProfileGame(uid);
        Log.d("==showMatchInfo==", uid, infos, Room.gameData.gameID);
        for (let info of infos) {
            if (Room.gameData.gameID == info.gameID) {
                this.lv.string = `LV.${info.userTitle.level}`;
                if (Room.gameData.isRegular()) {
                    this.allNum.string = info.officialMatchCount.toLocaleString();
                    this.winRate.string = (info.officialMatchPrizedPercent / 100).toFixed(2).concat("%");
                    this.goldNum.string = info.championCount.toLocaleString();
                } else {
                    let attrs = info.attrs;
                    for (let attr of attrs) {
                        switch (attr.tag) {
                            case AttrTag.Tag_AllCount: {
                                this.allNum.string = attr.attrValue;
                                break;
                            }
                            case AttrTag.Tag_WinCount: {
                                this.goldNum.string = attr.attrValue;
                                break;
                            }
                            case AttrTag.Tag_WinRate: {
                                this.winRate.string = (Number(attr.attrValue) * 100).toFixed(2).concat("%");
                                break;
                            }
                        }
                    }
                }
                break;
            }
        }
    }

    update(deltaTime: number) {

    }
}