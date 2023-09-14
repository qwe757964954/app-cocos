import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { ScreenDir } from './config/Constants';
import { LayerConfig } from './config/LayerConfig';
import { HeadLayer } from './module/head/src/HeadLayer';
import { Bet } from './module/bet/src/Bet';
import { OpInfo } from './module/opInfo/src/OpInfo';
import { Widget } from 'cc';
import { UITransform } from 'cc';   
import { size } from 'cc';
import { Event } from './config/Event';
import { OpResultLayer } from './module/opResult/src/OpResultLayer';
import { Settle } from './module/settle/src/Settle';
import { TuoGuan } from './module/tuoGuan/src/TuoGuan';
import { MahjongRoom } from './Room';
import { Audio, Log } from 'bos/exports';
import { ToolBar } from 'game/room/module/toolBar/src/component/ToolBar';
import { ChangeDesk } from 'game/room/module/changeDesk/src/component/ChangeDesk';
import { ReadyLayer } from 'game/room/module/ready/src/ReadyLayer';

@ccclass('GameLayer')
export class GameLayer extends XComponent {

    @property(UITransform)
    public gameLayer: UITransform | null = null;

    @property(Bet)
    public bet: Bet | null = null;

    @property(OpInfo)
    public opInfo: OpInfo | null = null;

    @property(HeadLayer)
    public headLayer: HeadLayer | null = null;

    @property(OpResultLayer)
    public opResultLayer: OpResultLayer | null = null;

    @property(Settle)
    public settle: Settle | null = null;

    @property(TuoGuan)
    public tuoGuan: TuoGuan | null = null;

    @property(ToolBar)
    public toolBar: ToolBar | null = null;

    @property(ChangeDesk)
    public changeDesk: ChangeDesk | null = null;

    @property(ReadyLayer)
    public readyLayer: ReadyLayer | null = null;

    onLoad(): void {
        Audio.BGM.play("mahjong@res/audio/music/audio_game_back");
    }

    start() {
        MahjongRoom.eventSystem.on(Event.TOUCH_TABLE, this.onTouchTable, this);
        if (MahjongRoom.gameData.isMatching()) {
            this.changeDesk.node.active = true;
            this.readyLayer.node.active = true;
        } else {
            this.changeDesk.node.active = false;
            this.readyLayer.node.active = false;
        }

        this.updateContentSize();
    }

    onDestroy(): void {
        
    }

    onTouchTable() {
        this.toolBar.setMoreActive(true);
    }

    update(deltaTime: number) {

    }

    updateContentSize(){
        Log.d("==updateContentSize==", this.gameLayer.contentSize);
        // this.headLayer.getComponent(UITransform).setContentSize(this.gameLayer.contentSize);
        // this.opResultLayer.getComponent(UITransform).setContentSize(this.gameLayer.contentSize);
        // this.settle.getComponent(UITransform).setContentSize(this.gameLayer.contentSize);
    }

    switchDir(dir: number) {
        let config = dir == ScreenDir.HORIZONTAL ? LayerConfig.prefabConfig.horConfig : LayerConfig.prefabConfig.verConfig;
        let betWidget = this.bet.getComponent(Widget);
        betWidget.bottom = config.bet.bottom;
        betWidget.horizontalCenter = config.bet.horizontalCenter;

        let opWidget = this.opInfo.getComponent(Widget);
        opWidget.right = config.opInfo.right;
        opWidget.bottom = config.opInfo.bottom;

        this.gameLayer.setContentSize(size(config.gameLayer.width, config.gameLayer.height));
        this.updateContentSize();

        this.headLayer.switchDir(dir);
        this.opResultLayer.switchDir(dir);
        this.settle.switchDir(dir);
        this.tuoGuan.switchDir(dir);
    }
}