/*
    其他家手牌的渲染组件
*/
import { _decorator, Component, Node, director, Prefab, Vec3, ccenum, CCFloat, instantiate, Quat, math, animation, Animation, AnimationClip} from 'cc';
import { PlayerRole, MjSize, MjTabel, drawCardDisRatio, StackInfo } from './cardConfigs'
import { playerOutCard } from './playerOutCard';
import { setSymbol } from './utils';
import { Log, XComponent } from 'bos/exports';
import { HandCard } from 'game/mahjong/idl/tss/mahjong/extendtable';
import { playerOperationArea } from './playerOperationArea';
import { MeshRenderer } from 'cc';
import { ScreenDir, cardPlayManager, MJBLOCK_VERTICAL_SCALE } from './cardPlayManager';

const { toRadian } = math;
const { ccclass, property, executeInEditMode } = _decorator;

ccenum(PlayerRole);

@ccclass('opponentPlayerCard')
@executeInEditMode
export class opponentPlayerCard extends XComponent {
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
    get paddingLeft()
    {
        return this._paddingLeft;
    }

    set paddingLeft(value: number)
    {
        this._paddingLeft = value;
        this.initNodePos();
    }

    @property({type: CCFloat})
    _paddingLeft = 0;

    @property({type: CCFloat})
    get paddingBottom()
    {
        return this._paddingBottom;
    }

    set paddingBottom(value: number)
    {
        this._paddingBottom = value;
        this.initNodePos();
    }

    @property({type: CCFloat})
    _paddingBottom = 0;

    _mjList: Node[] = [];

    _drawCardNode: Node | null;

    _playerPlayCardCb: any;
    _playerStackCb: any;
    _playerSpread: any;

    _cardPlayManager: cardPlayManager;
    
    _cardIndicator: Node;

    _originPos: Vec3;

    // constructor(role: PlayerRole, prefab: Prefab)
    // {
    //     this._playerRole = role;
    //     this._mjPrefab = prefab;
    // }

    onLoad()
    {  
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        this._cardPlayManager = cardZone.getComponent("cardPlayManager") as cardPlayManager;
        this._cardIndicator = cardZone.getChildByName("IndicatorPosNode");
        this.resetView(); 
    }
 
    start()
    {
        // console.log("opponentPlayerCard start ======")
        
        // this.addHandCards(13, false); 
    }

    //初始化其他玩家的手牌区和抓牌区的节点位置和渲染牌
    initNodePos()
    {
        // console.log("initNode oppo")

        if (this._mjPrefab === null)
        {
            return;
        }

        if (this._playerRole === PlayerRole.ME)
        {
            return;
        }
        
        let startPos, rotateQuat, rotAxis, rotAxisX, rotateQuatX, offsetVec ,mulQuat;

        // console.log("paddings *******", this._paddingLeft, this._paddingBottom)
        switch(this._playerRole)
        {
            case PlayerRole.RIGHT:
                // console.log("PlayerRolePlayerRole", PlayerRole.RIGHT)
                // 要重置到identityMatrix
                this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
                startPos = new Vec3(MjTabel.innerSize/2, 0, MjTabel.innerSize/2); 
                offsetVec = new Vec3(-this._paddingBottom, 0, -this._paddingLeft)      
                Vec3.add(startPos, startPos, offsetVec)  
                rotateQuat = new Quat();
                rotAxis = new Vec3(0, 1, 0);    
                Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(90));
                rotateQuatX = new Quat();
                rotAxisX = new Vec3(1, 0, 0);
                Quat.fromAxisAngle(rotateQuatX, rotAxisX, toRadian(90));
                mulQuat = new Quat();
                Quat.multiply(mulQuat, rotateQuat, rotateQuatX)
                this.node.setRotation(mulQuat);
                this.node.setPosition(startPos);
                break;
            case PlayerRole.TOP:
                // 要重置到identityMatrix
                // console.log("PlayerRolePlayerRole", PlayerRole.TOP)
                this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
                startPos = new Vec3(MjTabel.innerSize/2, 0, -MjTabel.innerSize/2);   
                offsetVec = new Vec3(-this._paddingLeft, 0, this._paddingBottom)      
                Vec3.add(startPos, startPos, offsetVec)        
                rotateQuat = new Quat();
                rotAxis = new Vec3(0, 1, 0);
                Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(180));
                rotateQuatX = new Quat();
                rotAxisX = new Vec3(1, 0, 0);
                Quat.fromAxisAngle(rotateQuatX, rotAxisX, toRadian(90));
                mulQuat = new Quat();
                Quat.multiply(mulQuat, rotateQuat, rotateQuatX)
                this.node.setRotation(mulQuat);
                this.node.setPosition(startPos);
                break;
            case PlayerRole.LEFT:
                // console.log("PlayerRolePlayerRole", PlayerRole.LEFT)
                // 要重置到identityMatrix
                this.node.setRTS(new Vec3(0,0,0), new Vec3(0,0,0));
                startPos = new Vec3(-MjTabel.innerSize/2, 0,-MjTabel.innerSize/2); 
                offsetVec = new Vec3(this._paddingBottom,  0, this._paddingLeft)      
                Vec3.add(startPos, startPos, offsetVec)           
                rotateQuat = new Quat();
                rotAxis = new Vec3(0, 1, 0);
                Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(270));
                rotateQuatX = new Quat();
                rotAxisX = new Vec3(1, 0, 0);
                Quat.fromAxisAngle(rotateQuatX, rotAxisX, toRadian(90));
                mulQuat = new Quat();
                Quat.multiply(mulQuat, rotateQuat, rotateQuatX)
                this.node.setRotation(mulQuat);
                this.node.setPosition(startPos);
        }

        this._originPos = startPos

        // console.log("init ******************");
    }
 
    addHandCards(cardCount: number, active, stackCount?: number, hasDrawCard: boolean = false) {
        // Log.d("==addHandCards=cardCount=", cardCount, hasDrawCard);

        let handCardCount = cardCount;
        
        if (hasDrawCard)
        {
            handCardCount = cardCount - 1
        }

        for (let i = 0; i < handCardCount; i++) {
            let mjNode = instantiate(this._mjPrefab);
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).receiveShadow = 0;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToLightProbe = false;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToReflectionProbe = false;

            mjNode.setPosition(MjSize.width/2 + MjSize.width * i, MjSize.length / 2, - MjSize.height / 2)
            this.node.addChild(mjNode)
            this._mjList.push(mjNode);
            mjNode.active = active;
        }

        if (hasDrawCard)
        {
            //抓牌要等手牌初始化完成确定位置之后再调用
            this.drawCard()
            this._drawCardNode.active = active
        }

        //如果指定当前桌面有几个操作区牌型, 根据数量后移主节点
        if (stackCount != null)
        {
            let currentRatioInWorld: number;
            if(this._cardPlayManager.getCurrentDir() == ScreenDir.HORIZONTAL)
            {
                currentRatioInWorld = 1
            }
            else if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
            {
                currentRatioInWorld = MJBLOCK_VERTICAL_SCALE
            }

            let pos = this.node.getPosition();

            let offset: Vec3;
            switch(this._playerRole)
            {
                case PlayerRole.RIGHT:
                    offset = new Vec3(0, 0, -MjSize.width * stackCount * 3 * currentRatioInWorld);
                    break;
                case PlayerRole.TOP:
                    offset = new Vec3(-MjSize.width * stackCount * 3 * currentRatioInWorld, 0, 0);
                    break;
                case PlayerRole.LEFT:
                    offset = new Vec3(0, 0, MjSize.width * stackCount * 3 * currentRatioInWorld);
            }

            Vec3.add(pos, pos, offset); // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
            this.node.setPosition(pos);
        }
    }

    //抓一张牌
    drawCard()
    {
        // console.log("opponent hand drawcard")

        if (this._drawCardNode) {
            console.log("当前已渲染了抽牌无法添加");
            return;
        }

        this._drawCardNode = instantiate(this._mjPrefab);
        this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
        this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).receiveShadow = 0;
        this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToLightProbe = false;
        this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToReflectionProbe = false;
        
        let lastNode = this._mjList[this._mjList.length - 1];
        this._drawCardNode.setPosition(lastNode.getPosition().x + drawCardDisRatio * MjSize.width , MjSize.length / 2, - MjSize.height / 2)
        this.node.addChild(this._drawCardNode)
    }

    //移除抓的牌, 没有动画时的接口, 未来会使用动画接口出牌
    removeDrawCard()
    {
        if(this._drawCardNode)
        {
            this._drawCardNode.removeFromParent();
            this._drawCardNode = null;
        }
        else{
            console.log("没有渲染的抓牌可以移除");
            return;
        }
    }

    removeHandCard(cardCount: number[]) {
        for(let i = 0; i < cardCount.length; i++)
        {
            this._mjList.pop().removeFromParent()
        }
    }

    //动画(吃碰杠别人，出牌，没有_drawCardNode)
    playDrawCardAnim(delay: number)
    {
        if (this._drawCardNode == null)
        {
            return
        }

        let startPos = this._drawCardNode.getPosition()
        
        const ac = new AnimationClip();  

        ac.duration = 0.1

        const trackPos = new animation.VectorTrack();
        trackPos.componentsCount = 3;
        trackPos.path = new animation.TrackPath().toProperty("position")
        const [x, y, z] = (trackPos as animation.VectorTrack).channels();
        x.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.x}], 
            [0.1, {easingMethod : 2, value: startPos.x}]
        ]);
        y.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.y}], 
            [0.1, {easingMethod : 2, value: startPos.y}]
        ]);
        z.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.z - 0.8}], 
            [0.1,{easingMethod : 2, value:  startPos.z}]
        ]);

        let animCom: Animation;

        if (this._drawCardNode.getComponent(Animation) == null)
        {
            animCom = this._drawCardNode.addComponent(Animation)
        }
        else
        {
            animCom = this._drawCardNode.getComponent(Animation)
            animCom.removeAll(Animation.EventType.FINISHED)
        }

        ac.addTrack(trackPos)

        animCom.defaultClip = ac

        this.scheduleOnce(() => {
            this._drawCardNode.active = true
            animCom.play()
        }, delay)
        
    }

    playCardAnim(outCardNode: Node, tByte: number, cb?: any) {
        //转换出牌节点的牌的父节点为出牌区节点, 保持世界坐标不变
        //push到出牌区列表
        //获取坐标出牌区坐标, 创建从抽牌位置到出牌区位置的动画

        let drawCard = this._drawCardNode

        setSymbol(drawCard, tByte)
        
        this._drawCardNode = null
        drawCard.setParent(outCardNode, true);
        let startPos = drawCard.getPosition()
        let startRot = drawCard.getRotation();
         
        let outCom = outCardNode.getComponent("playerOutCard") as playerOutCard
        let endPos = outCom.getOutCardPos();

        outCom.pushCardToList(drawCard)
        
        const ac = new AnimationClip();  
        
        ac.duration = 0.3;

        const trackPos = new animation.VectorTrack();
        trackPos.componentsCount = 3;
        trackPos.path = new animation.TrackPath().toProperty("position")
        let [x,y,z] = trackPos.channels();

        x.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.x}], 
            [0.3, {easingMethod : 2, value: endPos.x}]
        ]);
        y.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.y}], 
            [0.15, {easingMethod : 2, value: startPos.y + 3}], 
            [0.3, {easingMethod : 2, value: endPos.y}]
        ]);
        z.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.z}], 
            [0.3,{easingMethod : 2, value:  endPos.z}]
        ]);

        const trackQuat = new animation.QuatTrack();
        trackQuat.path = new animation.TrackPath().toProperty("rotation")

        let quatRot = new Quat();
        Quat.fromEuler(quatRot, 0, 0, 0)
       
        const [quat] = trackQuat.channels();

        quat.curve.assignSorted([
            [0, {value: startRot, easingMethod: 2},],
            [0.05, {value: startRot, easingMethod: 2},],
            [0.3, {value: quatRot, easingMethod: 2},]]
        );

        let animCom: Animation;

        if (drawCard.getComponent(Animation) == null)
        {
            animCom = drawCard.addComponent(Animation)
        }
        else
        {
            animCom = drawCard.getComponent(Animation)
            animCom.removeAll(Animation.EventType.FINISHED)
        }

        if(cb)
        {
            animCom.on(Animation.EventType.FINISHED, cb, this)
            this._playerStackCb = cb
        }

        animCom.on(Animation.EventType.FINISHED, () => { 
            let pos = new Vec3(0, 0, 0);
            drawCard.getWorldPosition(pos);
            this._cardIndicator.setWorldPosition(new Vec3(pos.x, pos.y + 1, pos.z))
        }, this)

        ac.addTrack(trackPos)
        ac.addTrack(trackQuat)

        animCom.defaultClip = ac

        animCom.play()
    }

    playCardFromHandAnim(index: number, outCardNode: Node){

    }

    //构造stack时手牌的位置调整, 刷新整体node的位置
    stackAnim(cardCount: number, cb?: any)
    {
        cardCount = cardCount - 1

        // console.log("opponent hand stackAnim") 
 
        let currentRatioInWorld: number;
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.HORIZONTAL)
        {
            currentRatioInWorld = 1
        }
        else if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            currentRatioInWorld = MJBLOCK_VERTICAL_SCALE
        }

        let offset: Vec3;
        switch(this._playerRole)
        {
            case PlayerRole.ME:
                break;
            case PlayerRole.RIGHT:
                offset = new Vec3(0, 0, -MjSize.width * cardCount * currentRatioInWorld) // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
                break;
            case PlayerRole.TOP:
                offset = new Vec3(-MjSize.width * cardCount * currentRatioInWorld, 0, 0) // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
                break;
            case PlayerRole.LEFT:
                offset = new Vec3(0, 0, MjSize.width * cardCount * currentRatioInWorld) // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
                break;
        }

        for (let i = 0; i < cardCount; i++)
        {
            let mjNode = this._mjList.pop();
            mjNode.removeFromParent();
        } 

        let pos = this.node.getPosition();
        Vec3.add(pos, pos, offset);
        this.node.setPosition(pos);

        //杠牌直接移除三张牌, 刷新位置
        if (cardCount == 3)
        {
            return; 
        }
 
        switch(this._playerRole)
        {
            case PlayerRole.ME:
                break;
            case PlayerRole.RIGHT:
                offset = new Vec3(0, 0, -MjSize.width * currentRatioInWorld)// 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
                break;
            case PlayerRole.TOP:
                offset = new Vec3(-MjSize.width * currentRatioInWorld, 0, 0)// 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
                break;
            case PlayerRole.LEFT:
                offset = new Vec3(0, 0, MjSize.width * currentRatioInWorld)// 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
                break;
        }

        let startPos = pos;
        let endPos = new Vec3();
        Vec3.add(endPos, startPos, offset)

        let ac = new AnimationClip()
        ac.duration = 0.1
        let track = new animation.VectorTrack();
        track.componentsCount = 3;
        track.path = new animation.TrackPath().toProperty("position")
        let [x, y, z] = track.channels();
       
        x.curve.assignSorted([
            [0, {value: startPos.x}],
            [0.1, {value: endPos.x}]
        ]) 
        z.curve.assignSorted([
            [0, {value: startPos.z}],
            [0.1, {value: endPos.z}]
        ])

        let animCom: Animation; 

        if (this.node.getComponent(Animation) == null)
        {
            animCom = this.node.addComponent(Animation)
        }
        else
        {
            animCom = this.node.getComponent(Animation)
        }

        ac.addTrack(track)
        animCom.defaultClip = ac
        animCom.play();  

        this._drawCardNode = this._mjList.pop()
        let startPosDraw = this._drawCardNode.getPosition();
        let endPosDraw = new Vec3();
        Vec3.add(endPosDraw, startPosDraw, new Vec3(MjSize.width, 0, 0));

        const acDraw = new AnimationClip();  
        acDraw.duration = 0.15
        
        const trackPos = new animation.VectorTrack();
        trackPos.componentsCount = 3;
        trackPos.path = new animation.TrackPath().toProperty("position")
        let [xDraw, yDraw, zDraw] = trackPos.channels();

        xDraw.curve.assignSorted([
            [0, {easingMethod : 0, value: startPosDraw.x}], 
            [0.15, {easingMethod : 0, value: endPosDraw.x}], 
        ]);
        zDraw.curve.assignSorted([
            [0, {easingMethod : 0, value: startPosDraw.z}], 
            [0.15,{easingMethod : 0, value:  endPosDraw.z}]
        ]);

        let animComDraw: Animation;

        if (this._drawCardNode.getComponent(Animation) == null)
        {
            animComDraw = this._drawCardNode.addComponent(Animation)
        }   
        else
        {
            animComDraw = this._drawCardNode.getComponent(Animation)
            animComDraw.removeAll(Animation.EventType.FINISHED)
        }

        if(cb)
        {
            animComDraw.on(Animation.EventType.FINISHED, cb, this)
            this._playerStackCb = cb
        }

        acDraw.addTrack(trackPos)

        animComDraw.defaultClip = acDraw

        animComDraw.play()
    }

    openingAnim(cb?: any)
    {
        this.doOpenAnimByIndex(0, 3, 0)
        this.doOpenAnimByIndex(4, 7, 0.25)
        this.doOpenAnimByIndex(8, 11, 0.5)
        this.doOpenAnimByIndex(12, 12, 0.75, cb)
        if (this._drawCardNode)
        {
            this.playDrawCardAnim(2)
        }
    }

    doOpenAnimByIndex(startIndex: number, endIndex: number, delay: number, cb?: any)
    {
        // console.log("doOpenAnimByIndex", startIndex, endIndex)
        let rotNode = new Node() 
        rotNode.setParent(this.node)
        rotNode.setPosition(0, MjSize.length, 0)//新增的节点用于旋转动画, 位置是牌底部相对于手牌主节点的另外一边, 用来做相对于这个轴的旋转动画
        
        for (let i = startIndex; i <= endIndex; i++)
        {
            this._mjList[i].setParent(rotNode, true)
            
        }

        this.scheduleOnce(() => {
            for (let i = startIndex; i <= endIndex; i++)
            {
                this._mjList[i].active = true
            }
        }, delay)
           
        let rotQuat = new Quat()
        Quat.fromAxisAngle(rotQuat, new Vec3(1,0,0), toRadian(90))
        rotNode.setRotation(rotQuat)

        let ac = new AnimationClip()
        ac.duration = 2
        let track = new animation.VectorTrack();
        track.componentsCount = 3;
        track.path = new animation.TrackPath().toProperty("position")
        let [x] = track.channels();
        let endPosX = 0;
        let startPosX = endPosX + MjSize.width;
        
        x.curve.assignSorted([
            [0, {value: startPosX}],
            [0.2 + delay, {value: endPosX, easingMethod: 2}],
            [0.5 + delay, {value: endPosX, easingMethod: 2}],
            [2, {value: endPosX}],
        ])

        const trackQuat = new animation.QuatTrack();
        trackQuat.path = new animation.TrackPath().toProperty("rotation")

        let startRot = rotNode.getRotation()
        let rotateQuatX = new Quat();
        let rotAxisX = new Vec3(1, 0, 0);
        Quat.fromAxisAngle(rotateQuatX, rotAxisX, toRadian(-90));
        let endRot = new Quat();
        Quat.multiply(endRot, startRot, rotateQuatX);

        const [quat] = trackQuat.channels();

        quat.curve.assignSorted([
            [0, {value: startRot, easingMethod: 0}],
            [0.2 + delay, {value: startRot, easingMethod: 0}],
            [0.5 + delay, {value: endRot, easingMethod: 0}],
            [1.5, {value: endRot, easingMethod: 0}],
            [1.75, {value: startRot, easingMethod: 0}],
            [2, {value: endRot, easingMethod: 0}],
        ]);
 
        let animCom = rotNode.addComponent(Animation)
        ac.addTrack(track)
        ac.addTrack(trackQuat)

        animCom.on(Animation.EventType.FINISHED, () => { //动画结束后把节点的还原回手牌主节点下
            for (let i = startIndex; i <= endIndex; i++)
            {
                this._mjList[i].setParent(this.node, true)
               
            }
            // rotNode.removeFromParent()
        }, this)

        if(cb)  
        {
            animCom.on(Animation.EventType.FINISHED, cb, this)
        }

        animCom.defaultClip = ac

        animCom.play();
    }

    //最后摊牌
    spreadCards(handCard?: HandCard, playerStack?: playerOperationArea, cb?: any) {
        // 设置图案
        
        if(handCard && handCard.cards)
        {
            for (let i = 0; i < handCard.cards.length; i++)
            {
                setSymbol(this._mjList[i], handCard.cards[i])
            }
        }

        if(handCard && handCard.lastCard > 0)
        {
            if(this._drawCardNode)
            {
                setSymbol(this._drawCardNode, handCard.lastCard)
            }
            else
            {
                console.log("对家摊牌传入了抓牌的值,但是渲染没有此节点")
            }
        }

        let offset: Vec3;
        switch(this._playerRole)
        {
            case PlayerRole.RIGHT:
                offset = new Vec3(MjSize.length, 0, 0)
                break;
            case PlayerRole.TOP:
                offset = new Vec3(0, 0, -MjSize.length)
                break;
            case PlayerRole.LEFT:
                offset = new Vec3(-MjSize.length, 0, 0)
                break;
        }



        let startPos = this.node.getPosition();
        let endPos = new Vec3(startPos.x + offset.x, startPos.y + offset.y, startPos.z + offset.z)

        const ac = new AnimationClip();  
        ac.duration = 0.3
        
        const trackPos = new animation.VectorTrack();
        trackPos.componentsCount = 3;
        trackPos.path = new animation.TrackPath().toProperty("position")
        let [x,y,z] = trackPos.channels();

        x.curve.assignSorted([
            [0, {easingMethod : 0, value: startPos.x}], 
            [0.15, {easingMethod : 0, value: endPos.x}], 
            [0.3, {easingMethod : 0, value: endPos.x}]
        ]);
        z.curve.assignSorted([
            [0, {easingMethod : 0, value: startPos.z}], 
            [0.15,{easingMethod : 0, value:  endPos.z}],
            [0.3,{easingMethod : 0, value:  endPos.z}]
        ]);

        

        const trackQuat = new animation.QuatTrack();
        trackQuat.path = new animation.TrackPath().toProperty("rotation")

        let startRot = this.node.getRotation()
        let rotateQuatX = new Quat();
        let rotAxisX = new Vec3(1, 0, 0);
        Quat.fromAxisAngle(rotateQuatX, rotAxisX, toRadian(-90));
        let endRot = new Quat();
        Quat.multiply(endRot, startRot, rotateQuatX);

        const [quat] = trackQuat.channels();

        quat.curve.assignSorted([
            [0, {value: startRot, easingMethod: 2},],
            [0.15, {value: startRot, easingMethod: 2},],
            [0.3, {value: endRot, easingMethod: 2},]]
        );



        let animCom: Animation;

        if (this.node.getComponent(Animation) == null)
        {
            animCom = this.node.addComponent(Animation)
        }
        else
        {
            animCom = this.node.getComponent(Animation)
            animCom.removeAll(Animation.EventType.FINISHED)
        }

        if(cb)
        {
            animCom.on(Animation.EventType.FINISHED, cb, this)
            this._playerSpread = cb
        }

        ac.addTrack(trackPos)
        ac.addTrack(trackQuat)

        animCom.defaultClip = ac

        animCom.play()
    }

    //游戏开始或结束，清空手牌区，包括抓牌，保持初始状态
    resetView() {
        this.node.removeAllChildren();
        this._mjList = [];
        this._drawCardNode = null;
        this.initNodePos();
    }

    getOriginPos()
    {
        return this._originPos;
    }
}


