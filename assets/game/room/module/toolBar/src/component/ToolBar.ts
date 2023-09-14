import { _decorator, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Table } from 'idl/tss/game/table.v2';
import { Room } from 'game/room/Room';
import { uiMgr } from 'bos/exports';

@ccclass('ToolBar')
export class ToolBar extends XComponent {
    @property(Node)
    public more: Node | null = null; 

    @property(Node)
    public btnBg: Node | null = null; 

    @property(Node)
    public retract: Node | null = null; 

    @property(Node)
    public set: Node | null = null; 

    @property(Node)
    public rule: Node | null = null; 

    @property(Node)
    public trust: Node | null = null; 

    @property(Node)
    public rotScreen: Node | null = null; 

    setMoreActive(isActive: boolean) {
        this.more.active = isActive;
        this.btnBg.active = !isActive;
    }

    //点击更多
    moreClick(){
        this.setMoreActive(false);
    }

    //点击收起
    retractClick(){
        this.setMoreActive(true);
    }

    //点击设置
    setClick(){
        uiMgr.loadPopup("room@module/toolBar/res/prefab/Set");
        this.setMoreActive(true);
    }

    //点击规则
    ruleClick(){
        this.setMoreActive(true);
    }

    //点击托管
    trustClick(){
        if (Room.gameData.getMySelf().isAI) {
            Table.StopManaged({}, {ext: Room.gameData.tableKey});
        }
        else {
            Table.StartManaged({}, {ext: Room.gameData.tableKey});
        }
        this.setMoreActive(true);
    }

    //点击转屏
    rScreenClick(){
        this.setMoreActive(true);
    }

    start() {
        
    }

    update(deltaTime: number) {

    }
}