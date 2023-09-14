/*
    出牌区的牌的渲染组件
*/
import { _decorator, Component, instantiate, Node, Prefab, Vec3, Quat, CCFloat, math, MeshRenderer } from 'cc';
import { PlayerRole, MjSize, MjTabel } from './cardConfigs';
import { XComponent } from 'bos/exports';
import { setSymbol } from './utils';
const { toRadian} = math;
const { ccclass, executeInEditMode, property } = _decorator;

const maxColumnCount = 6;
const maxRowCount = 2;

interface PosInfo {
    row: number,
    column: number,
    height: number,
}

@ccclass('playerOutCard')
@executeInEditMode
export class playerOutCard extends XComponent {
    @property({type: Prefab})
    get mjPrefab()
    {
        return this._mjPrefab;
    }
    set mjPrefab(value: Prefab)
    {
        this._mjPrefab = value
        this.resetView();
    }

    @property({type: Prefab, visible: false})
    _mjPrefab: Prefab | null;

    @property({type: PlayerRole})
    get playerRole()
    {
        return this._playerRole;
    }

    set playerRole(value: PlayerRole)
    {
        this._playerRole = value
    }

    @property({type: PlayerRole})
    _playerRole: PlayerRole | null;

    @property({type: CCFloat})
    get paddingTop()
    {
        return this._paddingTop;
    }

    set paddingTop(value: number)
    {
        this._paddingTop = value;
        this.initNodePos();
    }

    @property({type: CCFloat})
    _paddingTop = 0;

    _mjList: Node[] = [];

    onLoad()
    {
        this.resetView();
    }
    
    start()
    {
    }

    //初始化 根据玩家角色更新出牌区的主节点位置
    initNodePos()
    {
        if (this._mjPrefab === null)
        {
            return;
        }
 
        let startPos: Vec3, rotateQuat: Quat, rotAxis: Vec3, offsetVec: Vec3;

        let areaWidth = maxColumnCount * MjSize.width;
        let areaHeight = maxRowCount * MjSize.height;

        switch(this._playerRole)
        {  
            case PlayerRole.ME:
                this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
                startPos = new Vec3(-areaWidth/2, 0, areaHeight + this._paddingTop);      
                this.node.setPosition(startPos);
                break;
            case PlayerRole.RIGHT:
                this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
                rotateQuat = new Quat();
                rotAxis = new Vec3(0, 1, 0);
                Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(90));
                this.node.setRotation(rotateQuat);

                startPos = new Vec3(areaHeight + this._paddingTop, 0, areaWidth/2);   
                this.node.setPosition(startPos);
                break; 
            case PlayerRole.TOP:
                this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
                rotateQuat = new Quat();
                rotAxis = new Vec3(0, 1, 0);
                Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(180));
                this.node.setRotation(rotateQuat);

                startPos = new Vec3(areaWidth/2, 0, -areaHeight - this._paddingTop);   
                this.node.setPosition(startPos);
                break;
            case PlayerRole.LEFT:
                this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
                rotateQuat = new Quat();
                rotAxis = new Vec3(0, 1, 0);
                Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(270));
                this.node.setRotation(rotateQuat);

                startPos = new Vec3(-areaHeight - this._paddingTop, 0, -areaWidth/2);   
                this.node.setPosition(startPos);
                break;
        }
    }

    //根据索引获取指定位置的牌的行列高信息
    getOutCardPosInfo(index: number): PosInfo
    {
        let height =  Math.floor(index/12);
        index = index - height * 12;
        let column = index % 6;
        let row = Math.floor(index/6);

        let posInfo: PosInfo = {
            row: row,
            column: column,
            height: height,
        }
        return posInfo
    }

    //当前出牌区添加牌的位置
    getOutCardPos(): Vec3
    {
        let posInfo = this.getOutCardPosInfo(this._mjList.length)
        return new Vec3(MjSize.width/2 +posInfo.column * MjSize.width, MjSize.length/2 + posInfo.height * MjSize.length, MjSize.height/2 + MjSize.height * posInfo.row);
    }

    pushCards(tBytes: number[]) {
        if (tBytes.length > 0) {
            for (let i = 0; i < tBytes.length; i++) {
                let card = tBytes[i];
                this.pushCard(card)
            }
        }
    }

    //往出牌区添加一张指定种类的牌
    pushCard(tByte: number)
    {
        let mjNode = instantiate(this._mjPrefab)
        mjNode.setPosition(this.getOutCardPos())

        mjNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;

        //根据value决定花色
        setSymbol(mjNode, tByte)

        this.node.addChild(mjNode)
        this._mjList.push(mjNode)
    }

    pushCardToList(node: Node)
    {
        this._mjList.push(node);
    }


    //移出一张出牌区的牌
    removeCard() {
        this._mjList.pop().removeFromParent()
    }

    //游戏开始或结束，清空出牌区，保持初始状态
    resetView() {
        this.node.removeAllChildren()
        this._mjList = []
        this.initNodePos()
    } 
}


