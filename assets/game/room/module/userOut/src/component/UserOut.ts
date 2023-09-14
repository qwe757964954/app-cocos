import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/room/Room';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { App } from 'app/App';
import { tween } from 'cc';
import { Vec3 } from 'cc';
import { Label } from 'cc';
import { UIOpacity } from 'cc';
import { NodePool } from 'cc';
import { instantiate } from 'cc';
import { Color } from 'cc';
import { Prefab } from 'cc';


interface InfoType {
    text: string,
    color: Color;
}

@ccclass('UserOut')
export class UserOut extends XComponent {

    @property(Node)
    public content: Node;
    @property(Prefab)
    public itemPre: Prefab;
    

    private itemH: number = 53;
    private itemPool: NodePool;
    private msgList: InfoType[] = [];



    onLoad() {
        this.msgList = [];
        this.itemPool = new NodePool();
        Room.matchMgr.on(MatchHandler.EventType.UserOut, this.onUserOut, this);
        Room.matchMgr.on(MatchHandler.EventType.UserInRevival, this.onUserInRevival, this);
    }

    protected start(): void {
        this.schedule(this.updateInfo, 2);
    }

    protected onDisable(): void {
        Room.matchMgr.removeAll(this);
        this.unschedule(this.updateInfo);
        this.msgList = [];
        this.itemPool.clear();
    }

    async onUserOut(uid: number) {
        let user = await App.userMgr.getUserByID(uid).finish();
        console.log('=UserOut=onUserOut==', uid, user?.nickname);
        this.msgList.push({text: `${user.nickname}  淘汰`, color: new Color('#D5D5D5')});
    }

    async onUserInRevival(uid : number) {
        let user = await App.userMgr.getUserByID(uid).finish();
        console.log('=UserOut=onUserInRevival==', uid, user?.nickname);
        this.msgList.push({text: `${user.nickname}  复活`, color: new Color('#93DDFF')});
    }

    updateInfo() {
        let children = this.content.children;
        if (this.msgList.length > 0) {
            if (children.length > 0) {
                // 当前有信息
                for (const v of children) {
                    let y = v.position.y + this.itemH;
                    tween(v).to(0.5, {position: new Vec3(v.position.x, y)}).delay(1.5).call(()=>{
                        if (y > 0) {
                            this.itemPool.put(v);
                            v.removeFromParent();
                        }
                    }).start();
                }
            }
            let item = this.itemPool.get() || instantiate(this.itemPre);
            item.getComponent(UIOpacity).opacity = 255;
            item.setPosition(new Vec3(0, -2 * this.itemH));
            let info: InfoType = this.msgList.shift();
            let infoLab = item.getChildByName('infoLab');
            infoLab.getComponent(Label).string = info.text;
            infoLab.getComponent(Label).color = info.color;
            this.content.addChild(item);
            console.log('==updateInfo==', info)
            tween(item).to(0.5, {position: new Vec3(item.position.x, -this.itemH)}).delay(1.5).start();
        } else {
            for (const v of children) {
                tween(v.getComponent(UIOpacity)).to(0.5, {opacity: 0}).start();
                tween(v).to(0.5, {position: new Vec3(v.position.x, v.position.y + this.itemH)}).call(()=>{
                    this.itemPool.put(v);
                    v.removeFromParent();
                }).start();
            }
        }
    }

    onClickTest() {
    //     let i = Math.floor(Math.random() * 2);
    //     let testStr = [
    //         {text: `测试玩家111111  淘汰`, color: new Color('#D5D5D5')},
    //         {text: `测试玩家222222  复活`, color: new Color('#93DDFF')},
    //     ]
    //     this.msgList.push(testStr[i]);
    //     console.log('==onClickTest==', testStr[i], this.msgList.length);
    }

}