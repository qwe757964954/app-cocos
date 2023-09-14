import { _decorator, Component, Node,Label,math} from 'cc';
const { ccclass, property} = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log } from 'bos/exports';
import { CommonTabItem} from '../../interfaceData/define';
import { PrizeCenterComTab }from './PrizeCenterComTab';

const { Color } = math;

@ccclass('PrizeCenterComTabItem')

export class PrizeCenterComTabItem extends XComponent {
    @property(Node)
    selectFlag:Node|null = null;

    @property(Label)
    tabText:Label|null = null;

    on = false;

    //tab数据
    tabData:CommonTabItem = null!;
    //
    comTabUI:PrizeCenterComTab = null;

    start() {

    }

    init(tab:CommonTabItem,comTabUI:PrizeCenterComTab){
        this.comTabUI = comTabUI;
        this.tabData = tab;
        this.tabText.string = tab.tabTitle ?? '未知';
    }

    setSelect(select:boolean){
        this.on = select;
        this.selectFlag.active = select;
        this.tabText.fontSize = select ?48:42;
        this.tabText.isBold = select;
        this.tabText.color = select? new Color(249,219,183,255) : new Color(136, 136, 136,255);
    }

    onClickBtn(){
        if (!this.on && this.comTabUI) {
            this.comTabUI.tabItemCallFunc?.(this.tabData.index);
        }
    }
}