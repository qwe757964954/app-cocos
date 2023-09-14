import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Pool } from 'cc';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { OutItem } from './OutItem';
import { tween } from 'cc';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { User } from 'app/domain/user/User';
import { App } from 'app/App';
import { Decorator } from 'bos/framework/decorator/Decorator';
import { isValid } from 'cc';

@ccclass('OutBarrage')
export class OutBarrage extends XComponent {

    @property(Prefab)
    itemPrefab : Prefab

    waitList : any[] = []

    pool : Pool<Node> = null

    runningItems : Node[] = []

    roadNum = 2

    roadStatusList : any[] = []

    handler : MatchHandler

    onLoad(): void {
        this.initPool()
        this.initRoad()
    }

    onDisable(): void {
        this.removeMatchEventListener()
    }

    onDestroy(): void {
        this.removeMatchEventListener()
        this.pool.destroy()
    }

    addMatchEventListener(){
        if (this.handler){
            this.handler.on(MatchHandler.EventType.UserOut, this.onUserOut, this)
        }
    }

    removeMatchEventListener(){
        if (this.handler){
            this.handler.off(MatchHandler.EventType.MatchStatusChange, this.onUserOut, this)
        }
    }

    @Decorator.TryAsync()
    async onUserOut(uid) {
        let user = await this.promiseOne<User>(App.userMgr.getUserByID(uid).finish())
        this.addBarrage(user)
    }

    updateView(handler : MatchHandler) {
        this.handler = handler

        this.addMatchEventListener()
    }

    initPool(){
        this.pool = new Pool(() => {
            return instantiate(this.itemPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }

    initRoad() {
        for (let index = 0; index < this.roadNum; index++) {
            this.roadStatusList.push(true)
        }
    }

    setRoadStatus(index, value) {
        if (index >= 0 && index < this.roadStatusList.length) {
            this.roadStatusList[index] = value

            if (value && this.waitList.length > 0) {
                this.createBarrage(this.waitList.shift(), index)
            }
        }
    }

    getIdleRoad() {
        for (let index = 0; index < this.roadStatusList.length; index++) {
            if (this.roadStatusList[index]){
                return index
            }
        }
    }

    addBarrage(data) {
        let road = this.getIdleRoad()
        if (road != null) {
            this.createBarrage(data, road)
        } else {
            this.waitList.push(data)
        }
    }

    createBarrage(data, road :number){
        this.setRoadStatus(road, false)

        let item = this.pool.alloc()
        item.getComponent(OutItem).updateView(data)
        this.node.addChild(item)

        let posY = this.node.getComponent(UITransform).height / 2 - 57 / 2 - (57 + 20) * road
        let posX = this.node.getComponent(UITransform).width / 2 + 435 / 2
        let endPosX = -this.node.getComponent(UITransform).width / 2 - 435 / 2
        item.setPosition(new Vec3(posX, posY, 0))

        let idle = false
        let tweenDuration : number = 3.8;                                   // 缓动的时长
        tween(item.position).to(tweenDuration, new Vec3(endPosX, posY, 0),                   // 这里以node的位置信息坐标缓动的目标 
            {                                                               // ITweenOption 的接口实现：
            onUpdate : (target:Vec3, ratio:number)=>{                       // onUpdate 接受当前缓动的进度
                if (isValid(this.node) && isValid(item)) {
                    item.setPosition(target)                              // 将缓动系统计算出的结果赋予 node 的位置
    
                    if (target.x <= posX - 435 - 150 && !idle) {
                        idle = true
                        this.setRoadStatus(road, true)
                    }
                }
            }
        }).call(()=>{
            if (isValid(this.node) && isValid(item)) {
                item.removeFromParent()
                this.pool.free(item)
            }
        }).start() 
    }
}