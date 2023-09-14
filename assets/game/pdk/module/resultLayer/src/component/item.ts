import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { Color } from 'cc';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { uiMgr } from 'bos/exports';

export type ItemInfo = {
    uid: number,
    avatar: string,
    gender?: number,
    isLord: boolean,
    nickname: string,
    multiple: number,
    curScore?: number,
    changeScore: number,
}

@ccclass('PdkResultItem')
export class PdkResultItem extends XComponent {

    @property(Node)
    public icon: Node | null = null;

    @property(Avatar)
    public head: Avatar | null = null;

    @property(Label)
    public nickName: Label | null = null;

    @property(Label)
    public multiple: Label | null = null;

    @property(Label)
    public scoreLab: Label | null = null;

    @property(Node)
    public report: Node | null = null;


    start() {
        
    }

    update(deltaTime: number) {

    }

    //初始化item信息
    init(info: ItemInfo) {
        this.icon.active = info.isLord;
        this.nickName.string = info.nickname;
        this.scoreLab.string = info.changeScore.toLocaleString();
        this.multiple.string = info.multiple.toLocaleString().concat("倍");
        this.scoreLab.color = new Color(info.changeScore > 0 ? '#E3C286' : '#8AA6C7');
        this.head.setUserID(info.uid);
    }

    resetView() {

    }

    //TODO: 点击举报
    onReport() {
        uiMgr.loadPopup("room@module/report/res/prefab/Report");
    }
}