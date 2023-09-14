/*
    操作区牌的渲染组件
*/
import { _decorator, Component, Node, Prefab, director, Scene, Vec3, Quat, CCFloat, math, instantiate, MeshRenderer } from 'cc';
import { toRadian } from 'cc';
import { setSymbol } from './utils';
import { PlayerRole, MjSize, MjTabel, drawCardDisRatio, StackInfo } from './cardConfigs'
import { XComponent } from 'bos/exports';
import { opponentPlayerCard } from './opponentPlayerCard';

const { ccclass, property, executeInEditMode } = _decorator;

const indicatorDir = [
    [null,null,null,null,null],
    [null,null,-90,0,90],
    [null,90,null,-90,0],
    [null,0,90,null,-90],
    [null,-90,0,90,null]
]

@ccclass('playerOperationArea')
@executeInEditMode
export class playerOperationArea extends XComponent {
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

    @property({type: Prefab})
    get stackIndicator()
    {
        return this._stackIndicator;
    }
    set stackIndicator(value: Prefab)
    {
        this._stackIndicator = value
    }

    @property({type: Prefab, visible: false})
    _stackIndicator: Prefab | null;

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

    @property({type: CCFloat, visible(this: playerOperationArea) {
        return this._playerRole == PlayerRole.ME 
    }})
    get paddingLeft()
    {
        return this._paddingLeft;
    }

    set paddingLeft(value: number)
    {
        this._paddingLeft = value;
        this.initNodePos()
    }

    @property({type: CCFloat})
    _paddingLeft = 0;

    @property({type: CCFloat, visible(this: playerOperationArea) {
        return this._playerRole == PlayerRole.ME 
    }})
    get paddingBottom()
    {
        return this._paddingBottom;
    }

    set paddingBottom(value: number)
    {
        this._paddingBottom = value;
        this.initNodePos()
    }

    @property({type: CCFloat})
    _paddingBottom = 0;

    _scene: Scene | null;

    _handCardNode: Node | null;

    _stackCount = 0;
    _cardCount = 0;

    _indicator: Node | null;

    onLoad() {
        // console.log("playerOperationArea onLoad")
        this.resetView()
    }

    //更新自己操作区的主节点位置
    updateMyOperationTransform()
    {
        // 要重置到identityMatrix
        this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
        let startPos = new Vec3(-MjTabel.innerSize/2, 0,MjTabel.innerSize/2); 
        let offsetVec = new Vec3(this._paddingLeft,  0, -this._paddingBottom);   
        Vec3.add(startPos, startPos, offsetVec);
        this.node.setPosition(startPos); 
    }

    //更新不同角色的出牌区主节点位置
    updateTransform()
    {
        this._scene = director.getScene();
        
        let localPos: Vec3, localRot: Quat, localScale, offset: Vec3;;

        let cardZone = this._scene.getChildByName("cardZone");
        switch(this._playerRole)
        {
            case PlayerRole.ME:
                offset = new Vec3(0, 0, MjSize.height / 2)
                break;
            case PlayerRole.RIGHT:
                offset = new Vec3(MjSize.height / 2, 0, 0)
                this._handCardNode = cardZone.getChildByName("PlayerRight");
                break;
            case PlayerRole.TOP:
                offset = new Vec3(0, 0, -MjSize.height / 2)
                this._handCardNode = cardZone.getChildByName("PlayerTop");
                break;
            case PlayerRole.LEFT:
                offset = new Vec3(-MjSize.height / 2, 0, 0)
                this._handCardNode = cardZone.getChildByName("PlayerLeft");
                break;
        }

        //同步手牌主节点的部分变换然后做调整, 操作区和手牌区的位置相关
        if (this._playerRole === PlayerRole.ME)
        {
            this.updateMyOperationTransform();
        }
        else
        {
            
            let oppoCom = this._handCardNode.getComponent("opponentPlayerCard") as opponentPlayerCard;

            localPos = oppoCom.getOriginPos();
            
            //旋转后要平移过去半个牌的高度
            Vec3.add(localPos, localPos, offset);

            localRot = this._handCardNode.getRotation();
            // 还原回平放角度
            let rotateQuatX = new Quat();
            let rotAxisX = new Vec3(1, 0, 0);
            Quat.fromAxisAngle(rotateQuatX, rotAxisX, toRadian(-90));
            let recoverQuat = new Quat();
            Quat.multiply(recoverQuat, localRot, rotateQuatX);
            
            localScale = this._handCardNode.getScale();
            
            this.node.setRTS(recoverQuat, localPos, localScale);
        }
    }

    initNodePos() {
        this._cardCount = 0;
        this._stackCount = 0;

        this.updateTransform();
    }

    //渲染操作区的stack
    stackAnim(data: StackInfo[], from?: PlayerRole)
    {
        if (from != null)
        {
            this._indicator = instantiate(this._stackIndicator)
        
            let dir = indicatorDir[this._playerRole][from]//吃碰杠的指示方向
            
            this._indicator.setRotationFromEuler(0, dir, 0)
        }
       

        let updateOffset: Vec3;
        switch(this._playerRole)
        {
            case PlayerRole.ME:
                updateOffset = new Vec3(-MjSize.width / 2, 0, 0)
                break;
            case PlayerRole.RIGHT:
                updateOffset = new Vec3(0, 0, MjSize.width / 2)
                break;
            case PlayerRole.TOP:
                updateOffset = new Vec3(MjSize.width / 2, 0, 0)
                break;
            case PlayerRole.LEFT:
                updateOffset = new Vec3(0, 0, - MjSize.width / 2)
                break;
        }

        let pos = this.node.getPosition();
        Vec3.add(pos, pos, updateOffset);
        this.node.setPosition(pos);

        for (let i = 0; i < data.length; i++)
        {
            let show = data[i].show;

            let mjNode = instantiate(this._mjPrefab);
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).receiveShadow = 0;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToLightProbe = false;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToReflectionProbe = false;
            
            setSymbol(mjNode, data[i].tByte);

            let pos: Vec3;
            if(i != 3)
            {
                 pos = new Vec3(MjSize.width/2 + MjSize.width * (i + this._stackCount * 3) + MjSize.width/2 * this._stackCount, MjSize.length / 2, - MjSize.height / 2);
            }
            else
            {
                pos = new Vec3(MjSize.width/2 + MjSize.width * (this._stackCount * 3 + 1) + MjSize.width/2 * this._stackCount, MjSize.length / 2 + MjSize.length, - MjSize.height / 2);
            }

            mjNode.setPosition(pos);

            if(show != null && show === false)
            {
                let rotQuat = new Quat();
                let rotAxisX = new Vec3(1, 0, 0);
                Quat.fromAxisAngle(rotQuat, rotAxisX, toRadian(180))
                mjNode.setRotation(rotQuat);
            }

            if (from != null)
            {
                if(data.length == 3 && i == 1)//吃碰在中间的牌
                {
                    this._indicator.setPosition(0, MjSize.length/2 + 0.1, 0)
                    mjNode.addChild(this._indicator)
                }
                else if(data.length == 4 && i == 3)//杠在最上面那张排
                {
                    this._indicator.setPosition(0, MjSize.length/2 + 0.1, 0)
                    mjNode.addChild(this._indicator)
                }
            }

            this.node.addChild(mjNode)
        }

        this._stackCount++;
    }

    //更新操作牌组（比如补杠，传递过来的有四张牌，之前有碰的三张，需要在原来三张的基础上加一张）
    updateStack(data: StackInfo, stackIndex: number, from?: PlayerRole) {
        let show = data.show;

        let mjNode = instantiate(this._mjPrefab);
        mjNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
        setSymbol(mjNode, data.tByte);

        let pos = new Vec3(MjSize.width/2 + MjSize.width * (1 + stackIndex * 3) + MjSize.width/2 * stackIndex, MjSize.length / 2 + MjSize.length , - MjSize.height / 2);
        
        mjNode.setPosition(pos);

        if(show != null && show === false)
        {
            let rotQuat = new Quat();
            let rotAxisX = new Vec3(1, 0, 0);
            Quat.fromAxisAngle(rotQuat, rotAxisX, toRadian(180))
            mjNode.setRotation(rotQuat);
        }

        if (from != null)
        {
            //刷新原来指示器的方向
            let dir = indicatorDir[this._playerRole][from]

            this._indicator.setRotationFromEuler(0, dir, 0)

            mjNode.addChild(this._indicator)
        }

        this.node.addChild(mjNode)   
    }

    popStack()
    {
        this.node.children.pop().removeFromParent()
    }

    getSpreadPosition(): Vec3
    {
        //比一般的stack间隙多半个麻将宽, 每个stack的偏移是3.5个麻将的宽度
        return new Vec3(MjSize.width * ( 1 + this._stackCount * 3.5), MjSize.length / 2, - MjSize.height / 2);
    }

    //游戏开始或结束，清空操作区，保持初始状态
    resetView() {
        this.node.removeAllChildren()
        this._stackCount = 0;
        this._cardCount = 0;
        this.initNodePos()
    }
}


