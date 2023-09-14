import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { GameData } from 'game/mahjong/model/GameData';
import { GamePlayer } from 'game/mahjong/model/GamePlayer';
import { MahjongRoom } from 'game/mahjong/Room';
import { Audio, Log, resLoader, uiMgr } from 'bos/exports';
import { Event } from 'game/mahjong/config/Event';
import { SettleConfig } from './SettleConfig';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { Prefab } from 'cc';
import { SettleItem } from './Item';
import { instantiate } from 'cc';
import { App } from 'app/App';
import {IMsgOneGameResult } from 'idl/tss/match_v2/matematch.v1';
import { Avatar } from '../../../../../app/modules/common/avatar/src/Avatar';
import { Color } from 'cc';
import { AudioUtils } from 'game/mahjong/AudioUtils';
import { AudioConfig } from 'game/mahjong/config/AudioConfig';

export type SettleInfo = {
    uid: number,
    infos: any[],
    MultipleCount: number,
    EndType: number,
    userInfo: any[],
}

@ccclass('Settle')
export class Settle extends XComponent {
    @property(Node)
    public settleNode: Node | null = null;

    @property(Sprite)
    public bg: Sprite | null = null;

    @property(Sprite)
    public guang: Sprite | null = null;

    @property(Sprite)
    public titleBg: Sprite | null = null;

    @property(Label)
    public fanCount: Label | null = null;

    @property(Label)
    public num: Label | null = null;

    @property(Sprite)
    public resultTitle: Sprite | null = null;

    @property(Sprite)
    public line1: Sprite | null = null;

    @property(Sprite)
    public line2: Sprite | null = null;

    @property(Sprite)
    public continueBtn: Sprite | null = null;

    @property(Avatar)
    public avatar: Avatar | null = null;

    @property(Label)
    public myName: Label | null = null;

    @property(Node)
    public bankerIcon: Node | null = null;

    @property(Node)
    public itemInfo: Node | null = null;

    player: GamePlayer;
    winType: number;
    itemPrefab: Prefab;

    onLoad(): void {
        MahjongRoom.gameData.on(GameData.EventType.GAME_RESULT, this.onGameResult, this);
    }

    start() {
        this.resetView();
        this.player = MahjongRoom.gameData.getMySelf();
    }

    //横竖屏转换
    switchDir(dir: number) {

    }

    onDestroy(): void {
        
    }

    update(deltaTime: number) {

    }

    resetView() {
        this.settleNode.active = false;
        this.itemInfo.removeAllChildren();
    }

    onBack() {
        Log.d("==onBack==")
        App.mateMgr.leaveDesk();
    }

    onContinueClick() {
        Log.d("==onContinueClick==")
        App.mateMgr.readyDesk();
        this.resetView();
    }

    //比赛推送的比赛信息
    onGameResult(data: IMsgOneGameResult) {   
        Log.d("==onGameResult==", data);
        let settleData = MahjongRoom.gameData.getSettleData();
        //重连回来子游戏数据清空，则可直接开始下一局
        if (settleData) { 
            this.showSettle(settleData, data);
        } else {
            this.onContinueClick();
        }
    }

    //根据结算信息，展示结算
    showSettle(data: any, gameResult: IMsgOneGameResult) {
        Log.d("==onShowSettle data==", data);
        this.avatar.setUserID(this.player.uid);
        if (data.EndType == SettleConfig.settleType.Settle_LiuJu) {  //流局，需要播放响应的动画
            Audio.Effect.playOneShot(AudioUtils.getAudioPath(AudioConfig.audio_liuju));
            this.updateSettleInfo(data, gameResult);
        }
        else { //非流局
            this.updateSettleInfo(data, gameResult);
        };
        this.settleNode.active = true;
    }

    updateSettleInfo(data: any, gameResult: IMsgOneGameResult) {
        let settleInfo = {
            uid: MahjongRoom.gameData.getMyID(),
            infos: [],
            MultipleCount: 0,
            EndType: data.EndType,
            userInfo: data.userInfo,
        };

        let myScore = 0;
        let isMyBanker = false;
        for (let index = 0; index < data.SettleInfo.length; index++) {
            let info = data.SettleInfo[index];
            if (info.EndType == null) {
                info.EndType = data.EndType;
            };
            if (info.Uid == MahjongRoom.gameData.getMyID()){
                settleInfo.MultipleCount = settleInfo.MultipleCount + info.MultipleCount;
                isMyBanker = data.userInfo[info.Uid.toLocaleString()].isBanker;
            };

            let resultUsers = gameResult.users;
            for (let index = 0; index < resultUsers.length; index++) {
                const result = resultUsers[index];
                if (info.Uid == result.uid) {
                    info.score = result.changeScore;
                    if (result.uid == MahjongRoom.gameData.getMyID()) {
                        myScore = result.changeScore;
                    }
                    break;
                }
            }

            settleInfo.infos.push(info);
        };
        if (settleInfo.MultipleCount > 0) {
            this.winType = 1;
        }
        else if (settleInfo.MultipleCount < 0) {
            this.winType = -1;
        }
        else {
            this.winType = 0;
        };

        this.updateMyInfo(isMyBanker);
        this.updateResultTitle();
        this.updateTitleBg(settleInfo.MultipleCount, myScore);
        this.updateItemInfo(settleInfo);
    }

    updateMyInfo(isMyBanker: boolean) {
        this.bankerIcon.active = isMyBanker;
        this.myName.string = this.player.nickname;
    }

    //根据输赢，更新title
    updateResultTitle() {
        let endNum: number;
        switch (this.winType) {
            case 1:
                endNum = 1;
                break;
            case 0:
                endNum = 2;
                break;
            case -1:
                endNum = 3;
                break;
            default:
                break;
        };
        Log.d("==updateResultTitle==", this.winType, endNum)

        let titleSprite = this.resultTitle.getComponent(BundleSprite);
        if (titleSprite) {
            titleSprite.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_img_title${endNum}`;
        };

        let lSprite1 = this.line1.getComponent(BundleSprite);
        if (lSprite1) {
            lSprite1.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_img_line${endNum}`;
        };

        let lSprite2 = this.line2.getComponent(BundleSprite);
        if (lSprite2) {
            lSprite2.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_img_line${endNum}`;
        };
    }

    updateTitleBg(fan: number, score: number) {
        let endStr: string;
        let labelColor: Color;
        switch (this.winType) {
            case 1:
                endStr = "win";
                labelColor = new Color("#6F5140");
                break;
            case 0:
                endStr = "pingju";
                labelColor = new Color("#4D4771");
                break;
            case -1:
                endStr = "fail";
                labelColor = new Color("#4C565E");
                break;
            default:
                break;
        };
        Log.d("==updateTitleBg==", this.winType, endStr)
        let bgSprite = this.titleBg.getComponent(BundleSprite);
        if (bgSprite) {
            bgSprite.spriteFrame = `room@res/settle/ResApp_Game_Jiesuan_bg_${endStr}`;
        };

        this.fanCount.string = fan.toLocaleString().concat("番");
        this.num.string = score.toLocaleString();

        this.fanCount.color = labelColor;
        this.num.color = labelColor;
    }

    async updateItemInfo(settleInfo: SettleInfo) {
        this.itemPrefab = await new Promise((resolver, reject) => {
            resLoader.loadPrefab('mahjong@module/settle/res/prefab/Item', function (err, prefab) {
                if (!err && prefab) {
                    resolver(prefab);
                } else {
                    console.warn('==resLoader.loadPrefab==', err)
                }
            })
        });
        Log.d("==updateItemInfo==", settleInfo, MahjongRoom.gameData.getMyID());
        for (let index = 0; index < settleInfo.infos.length; index++) {
            let info = settleInfo.infos[index];
            if (info.Uid != MahjongRoom.gameData.getMyID()) {
                let item = instantiate(this.itemPrefab);
                let user = settleInfo.userInfo[info.Uid.toLocaleString()];
                item.getComponent(SettleItem).init({
                    uid: user.uid,
                    name: user.name,
                    fan: info.MultipleCount, //结算番数
                    score: info.score, //结算输赢结果
                    avatar: user.avatar,
                    isBanker: user.isBanker,
                });
                this.itemInfo.addChild(item);
            }
        }
    }

}