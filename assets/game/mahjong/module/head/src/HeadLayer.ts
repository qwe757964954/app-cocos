import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MahjongRoom } from 'game/mahjong/Room';
import { BankerInfo } from '../../../model/GameData';
import { Log } from 'bos/exports';
import { Event } from 'game/mahjong/config/Event';
import { ScreenDir } from 'game/mahjong/config/Constants';
import { LayerConfig } from 'game/mahjong/config/LayerConfig';
import { Widget } from 'cc';
import { Head } from './Head';

@ccclass('HeadLayer')
export class HeadLayer extends XComponent {
    @property(Head)
    public head1: Head | null = null;

    @property(Head)
    public head2: Head | null = null;

    @property(Head)
    public head3: Head | null = null;

    @property(Head)
    public head4: Head | null = null;

    onLoad(): void {
        MahjongRoom.eventSystem.on(Event.RESET_VIEW, this.resetView, this);
        //庄家信息改变
        MahjongRoom.gameData.on(MahjongRoom.gameData.EventType.BANKER_CHANGE, this.onBankerChange, this);
    }

    start(): void {
        this.head1.init(1);
        this.head2.init(2);
        this.head3.init(3);
        this.head4.init(4);
    }

    onDestroy(): void {
        MahjongRoom.gameData?.removeAll(this);
    }

    resetView() {

    }

    onBankerChange(info: BankerInfo) {
        let bankerSeat = info.bankerSeat;
        switch (bankerSeat != null && bankerSeat > 0) {
            case bankerSeat == 1:
                this.head1.showIcon({isBanker: true});
                break;
            case bankerSeat == 2:
                this.head2.showIcon({isBanker: true});
                break;
            case bankerSeat == 3:
                this.head3.showIcon({isBanker: true});
                break;
            case bankerSeat == 4:
                this.head4.showIcon({isBanker: true});
                break;
        }
    }

    update(deltaTime: number) {

    }

    switchDir(dir: number) {
        let config = dir == ScreenDir.HORIZONTAL ? LayerConfig.headConfig.horConfig : LayerConfig.headConfig.verConfig;
        
        let hWidget1 = this.head1.getComponent(Widget);
        hWidget1.left = config.head1.left;
        hWidget1.bottom = config.head1.bottom;

        let hWidget2 = this.head2.getComponent(Widget);
        hWidget2.right = config.head2.right;
        hWidget2.top = config.head2.top;

        let hWidget3 = this.head3.getComponent(Widget);
        hWidget3.right = config.head3.right;
        hWidget3.top = config.head3.top;

        let hWidget4 = this.head4.getComponent(Widget);
        hWidget4.left = config.head4.left;
        hWidget4.top = config.head4.top;
    }
}