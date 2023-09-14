/*
    自己手牌的渲染组件
*/
import { _decorator, Component, screen, Node, director, Camera, Quat, Vec3, Mat4, toRadian, toDegree, CCFloat, instantiate, Prefab, js, AnimationClip, animation, Animation, MeshRenderer, BoxCollider } from 'cc';
import { MjSize, PlayerRole, drawCardDisRatio } from './cardConfigs';
import { Log, XComponent } from 'bos/exports';
import { setSymbol } from './utils';
import { playerOutCard } from './playerOutCard';
import { playerOperationArea } from './playerOperationArea';
import { HandCard } from 'game/mahjong/idl/tss/mahjong/extendtable';
import { cardPlayManager, ScreenDir, MJBLOCK_VERTICAL_SCALE, DESIGN_RATIO } from './cardPlayManager';

const { ccclass, property, executeInEditMode } = _decorator;

const RECOMMEND_OFFSET = new Vec3(-0.4,MjSize.length/2 + 0.05,-0.7)

@ccclass('myPlayerCard')
@executeInEditMode
export class myPlayerCard extends XComponent {
    @property({ type: Prefab })
    get mjRecommend() {
        return this._mjRecommend;
    }
    set mjRecommend(value: Prefab) {
        this._mjRecommend = value
    }
 
    @property({ type: Prefab, visible: false })
    _mjRecommend: Prefab | null;

    @property({ type: Prefab })
    get mjPrefab() {
        return this._mjPrefab;
    }
    set mjPrefab(value: Prefab) {
        this._mjPrefab = value
        this.resetView();
    }
 
    @property({ type: Prefab, visible: false })
    _mjPrefab: Prefab | null;

    @property({ type: CCFloat })
    get distanceFromCam() {
        return this._distanceFromCam;
    }
    set distanceFromCam(value: number) {
        this._distanceFromCam = value;
        this.initNodePos();
    }


    @property(CCFloat)
    _distanceFromCam = 0;

    @property({ type: CCFloat })
    get paddingLeft() {
        return this._paddingLeft;
    }

    set paddingLeft(value: number) {
        this._paddingLeft = value;
        this.initNodePos();
    }

    @property({ type: CCFloat })
    _paddingLeft = 0;

    @property({ type: CCFloat })
    get paddingBottom() {
        return this._paddingBottom;
    }

    set paddingBottom(value: number) {
        this._paddingBottom = value;
        this.initNodePos();
    }

    @property({ type: CCFloat })
    _paddingBottom = 0;

    _mjList: Node[] = [];

    _drawCardNode: Node | null;

    _selectedNode:Node | null;

    _eularRot: Vec3 | null;

    _playDrawCardCb: any;

    _playHandCardCb: any;

    _makeSlotCb: any;

    _stackCb: any;

    _slotIndex: number;

    _cardPlayManager: cardPlayManager;

    _cardIndicator: Node;

    _recommedSignList: Node[] = [];

    onLoad() {
        // console.log("myPlayerCard onLoad")
        let currentScene = director.getScene();
        let cardZone = currentScene.getChildByName("cardZone");
        this._cardPlayManager = cardZone.getComponent("cardPlayManager") as cardPlayManager;
        this._cardIndicator = cardZone.getChildByName("IndicatorPosNode");
        this.resetView();
    }
             
    start() {
        //for 测试
        
        // this.addHandCards([0x0101, 0x0101, 0x0101, 0x1501, 0x1601, 0x1701, 0x1701, 0x2901, 0x2901, 0x2901, 0x3301, 0x3301, 0x4301], true);
    }        
 
    //构造自己手牌区的空间位置, 在视锥体的下方, 角度为垂直摄像机方向, 距离和高度可以自行调整
    initNodePos()
    {
        // console.log("initNode my")

        if (this._mjPrefab === null) {
            return;
        }
       
        let currentDir = this._cardPlayManager.getCurrentDir();

        let camNode: Node;
        
        if (currentDir == ScreenDir.HORIZONTAL)
        {
            camNode = director.getScene().getChildByName('Main Camera');//锁高度fov

            let camPos = camNode.getPosition();
            let camRot = camNode.getRotation();
            let camCom = camNode.getComponent("cc.Camera") as Camera;
            let camFov = camCom.fov;

            this._eularRot = new Vec3();

            Quat.toEuler(this._eularRot, camRot);

            // console.log(this._eularRot)

            let edgeEular = new Vec3();

            Vec3.subtract(edgeEular, this._eularRot, new Vec3(camFov / 2, 0, 0));

            // console.log(edgeEular)
            
            let rotMat = new Mat4();
            Mat4.fromRotation(rotMat, toRadian(edgeEular.x), new Vec3(1, 0, 0));

            let camdir = new Vec3();
            Vec3.transformMat4(camdir, new Vec3(0, 0, -1), rotMat);

            camdir.normalize();

            // console.log({
            //     pos: camPos,
            //     rot: camRot,
            //     fov: camFov,
            //     eularRot: this._eularRot,
            // })

            // console.log(camdir);

            let distanceVec = new Vec3();
            Vec3.multiplyScalar(distanceVec, camdir, this._distanceFromCam);

            //位置可以算的更精确一些,这样不太需要对位置 done   
            let startPos = new Vec3();
            Vec3.add(startPos, camPos, distanceVec);
            Vec3.add(startPos, startPos, new Vec3(this._paddingLeft, this._paddingBottom , -MjSize.height/2 - 0.3))
            this.node.setPosition(startPos);
            
            let rotateQuat = new Quat();
            let rotAxis = new Vec3(1, 0, 0);
            Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(90 + this._eularRot.x));
            this.node.setRotation(rotateQuat);
        }
        //VVVVVV
        else if (currentDir == ScreenDir.VERTICAL)
        {
            camNode = director.getScene().getChildByName('Vertical Camera');//锁宽度fov

            let camPos = camNode.getPosition();
            let camRot = camNode.getRotation();
            let camCom = camNode.getComponent("cc.Camera") as Camera;
            let camFov = camCom.fov;

            this._eularRot = new Vec3();

            Quat.toEuler(this._eularRot, camRot);

            // console.log(this._eularRot)

            let edgeEular = new Vec3();
            
            // console.log("windowSize ================", screen.windowSize)
        
            let windowRatio = screen.windowSize.y/screen.windowSize.x

            let screenRatioScale = windowRatio / DESIGN_RATIO

            // console.log("screenRatioScale", screenRatioScale)

            // console.log("windowRatio ================", windowRatio)

            let fovy = toDegree(Math.atan(Math.tan(toRadian(camFov) / 2) * windowRatio) * 2)// 求高度的fov

            // console.log("fovy ================", fovy)

            Vec3.subtract(edgeEular, this._eularRot, new Vec3(fovy / 2, 0, 0));

            // console.log(edgeEular)
            
            let rotMat = new Mat4();
            Mat4.fromRotation(rotMat, toRadian(edgeEular.x), new Vec3(1, 0, 0));

            let camdir = new Vec3();
            Vec3.transformMat4(camdir, new Vec3(0, 0, -1), rotMat);

            camdir.normalize();

            // console.log({
            //     pos: camPos,
            //     rot: camRot,
            //     fov: camFov,
            //     eularRot: this._eularRot,
            // })

            // console.log(camdir);

            let distanceVec = new Vec3();
            Vec3.multiplyScalar(distanceVec, camdir, this._distanceFromCam);

            //位置可以算的更精确一些,这样不太需要对位置   
            let startPos = new Vec3();
            Vec3.add(startPos, camPos, distanceVec);
            Vec3.add(startPos, startPos, new Vec3(this._paddingLeft / screenRatioScale, this._paddingBottom , -3))
            this.node.setPosition(startPos);
            
            let rotateQuat = new Quat();
            let rotAxis = new Vec3(1, 0, 0);
            Quat.fromAxisAngle(rotateQuat, rotAxis, toRadian(90 + this._eularRot.x));
            this.node.setRotation(rotateQuat);
        } 
    }

    addHandCards(valueList: number[], active: boolean, stackCount?: number, hasDrawCard: boolean = false)
    {
        // Log.d("==addHandCards=valueList=",valueList);

        let handCardCount =  valueList.length;
        
        if (hasDrawCard)
        {
            handCardCount = valueList.length - 1
        }
      
        for (let i = 0; i < handCardCount; i++)
        { 
            let mjNode = instantiate(this._mjPrefab);
            let boxCom = mjNode.addComponent(BoxCollider)
            boxCom.size = new Vec3(1.6, 1.1, 2.1)
            // mjNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).receiveShadow = 0;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToLightProbe = false;
            mjNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToReflectionProbe = false;
            // this.setSpecularFactor(mjNode, 0)

            let cardValue = valueList[i]
            // Log.d("==addHandCards=cardValue=", i, cardValue.toString(16))
            //根据value更新图案
            setSymbol(mjNode, cardValue);

            this.node.addChild(mjNode)
            this._mjList.push(mjNode);
            
            mjNode.active = active
        }

        this.updateHandPositionAndName()

        if (hasDrawCard)
        {
            //抓牌要等手牌初始化完成确定位置之后再调用
            this.drawCard(valueList[handCardCount])
            this._drawCardNode.active = active
        }

        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            return;
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
            Vec3.add(pos, pos, new Vec3(MjSize.width * stackCount * 3 * currentRatioInWorld, 0, 0)); // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
            this.node.setPosition(pos);
        }
    }

    //抓一张牌
    drawCard(tByte: number) {
        // console.log("drawCard")

        if (this._drawCardNode) {
            console.log("当前已渲染了抽牌无法添加");
            return;
        }

        this._drawCardNode = instantiate(this._mjPrefab);
        let boxCom = this._drawCardNode.addComponent(BoxCollider)
        boxCom.size = new Vec3(1.6, 1.1, 2.1)
        // this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
        this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).receiveShadow = 0;
        this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToLightProbe = false;
        this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToReflectionProbe = false;
        // this.setSpecularFactor(this._drawCardNode, 0)

       

        //根据value更新图案
        setSymbol(this._drawCardNode, tByte);

        // console.log(this._mjList)

        let lastNode = this._mjList[this._mjList.length - 1];

        // console.log("lastNode", lastNode.getPosition())

        this.node.addChild(this._drawCardNode)

        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            this._drawCardNode.setPosition(MjSize.width / 2 + MjSize.width * 7, 0, -MjSize.height)
            return 
        }

        this._drawCardNode.setPosition(lastNode.getPosition().x + drawCardDisRatio * MjSize.width, 0, 0)
    }

    //移除一张手牌, 没有动画时的接口, 未来会使用动画接口出牌
    removeDrawCard() {
        // console.log("removeDrawCard")
        if (this._drawCardNode) {
            this._drawCardNode.removeFromParent();
            this._drawCardNode = null;
        }
        else {
            console.log("当前没有渲染牌,无法移除")
        }
    }

    hasDraw()
    {
        return this._drawCardNode != null;
    }

    //刷新手牌位置
    updateHandPositionAndName() {
        // console.log("updateHandPosition")

        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            for (let i = 0; i < this._mjList.length; i++) {
                let handNode = this._mjList[i]
                handNode.name = "MJBlock" + i

                let index = i + (13 - this._mjList.length)
                if (index < 6 )
                {
                    handNode.setPosition(MjSize.width / 2 + MjSize.width * index, 0, 0)
                }
                else
                {
                    index = index - 6
                    handNode.setPosition(MjSize.width / 2 + MjSize.width * index, 0, MjSize.height)
                }
            }   
            
            return;
        }

        for (let i = 0; i < this._mjList.length; i++) {
            let handNode = this._mjList[i]
            handNode.name = "MJBlock" + i
            handNode.setPosition(MjSize.width / 2 + MjSize.width * i, 0, 0)
        }
    }

    getHandPosition(index: number)
    {
        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            let indexOffset = index + (13 - this._mjList.length)

            if (indexOffset < 6 )
            {
                return new Vec3(MjSize.width / 2 + MjSize.width * indexOffset, 0, 0)
            }
            else
            {
                indexOffset = indexOffset - 6
                return new Vec3(MjSize.width / 2 + MjSize.width * indexOffset, 0, MjSize.height)
            }
        }

        return new Vec3(MjSize.width / 2 + MjSize.width * index, 0, 0)
    }

    //添加一张牌到手牌的指定位置
    addHandCard(tByte: number, index: number) {
        // console.log("addHandCard")

        if (index > this._mjList.length) {
            console.log("索引大于当前渲染手牌的数量请检查逻辑", index)
            return;
        }

        if (this._mjList.length >= 13) {
            console.log("当前渲染手牌数量已满--> 13", index)
            return;
        } 

        let insertNode = instantiate(this._mjPrefab);
        let boxCom = insertNode.addComponent(BoxCollider)
        boxCom.size = new Vec3(1.6, 1.1, 2.1)
        // insertNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
        insertNode.getChildByName("Cube").getComponent(MeshRenderer).receiveShadow = 0;
        insertNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToLightProbe = false;
        insertNode.getChildByName("Cube").getComponent(MeshRenderer).bakeSettings.bakeToReflectionProbe = false;
        // this.setSpecularFactor(insertNode, 0)
        
        insertNode.name = "MJBlock" + index

        //根据value更新图案
        setSymbol(insertNode, tByte);

        this.node.addChild(insertNode)
        js.array.appendObjectsAt(this._mjList, [insertNode], index)

        this.updateHandPositionAndName()
    }

    //从手牌移除指定位置的一张或者多张牌，并且出牌之后，如果抓牌未移除，需要把抓的牌放到手牌中，抓牌为空
    removeHandCard(indexList: number[], updateCard: boolean = false) {
        // console.log("removeHandCard")
        indexList.sort((a, b) => b - a)
        //移除对应索引的 
        
        for (let index of indexList) { 
            if (index < this._mjList.length) {  
                let removeNode = this._mjList.splice(index, 1);
                removeNode[0].removeFromParent();
            } 
            else {
                console.log("索引大于等于当前渲染手牌的数量请检查逻辑", index)
                return;
            }
        }   

        if (updateCard)
        {
            this.updateHandPositionAndName()
        }
    }

    showRecommend(index: number)
    {
        // console.log("showRecommend", index)
        let mjNode = this._mjList[index]

        if(mjNode != null)
        {
            let recommendSign = instantiate(this._mjRecommend)

            mjNode.addChild(recommendSign)
            recommendSign.setPosition(RECOMMEND_OFFSET)

            this._recommedSignList.push(recommendSign)
        }
    }

    resetRecommend()
    {
        for (let i = 0; i < this._recommedSignList.length; i++) {
            this._recommedSignList[i].removeFromParent();
        }
        
        this._recommedSignList = [];
    }

    setSpecularFactor(mjNode: Node, factor: number)
    {
        mjNode.getChildByName("Cube").getComponent(MeshRenderer).getMaterialInstance(0).setProperty("specularFactor", factor)
        mjNode.getChildByName("Cube").getComponent(MeshRenderer).getMaterialInstance(1).setProperty("specularFactor", factor)
    }

    //动画***************************************************************************************************
    playDrawCardAnim(delay: number = 0)
    {
        if (this._drawCardNode == null)
        {
            return
        }

        // console.log("playDrawCardAnim")

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

        animCom.on(Animation.EventType.FINISHED, () => {
            // console.log("play draw card anim")
        }, this)

        ac.addTrack(trackPos)

        animCom.defaultClip = ac

        this.scheduleOnce(() => {
            if (this._drawCardNode)
            {   
                this._drawCardNode.active = true
                animCom.play()
            }
        }, delay)
    }

    playSelectAnim(node: Node)
    {
        // console.log("playSelectAnim")
        // console.log(this._selectedNode)

        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            return
        }
    
        if(this._selectedNode)
        {
            this.playUnselectAnim(this._selectedNode)

            if(this._selectedNode == node)
            {
                this._selectedNode = null
                return
            }
        }    
         
        this._selectedNode = node

        let startPos = this._selectedNode.getPosition()
        
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
            [0, {easingMethod : 2, value: startPos.z}], 
            [0.1,{easingMethod : 2, value:  startPos.z - 0.8}]
        ]);

        let animCom: Animation;

        if (this._selectedNode.getComponent(Animation) == null)
        {
            animCom = this._selectedNode.addComponent(Animation)
        }
        else
        {
            animCom = this._selectedNode.getComponent(Animation)
            animCom.removeAll(Animation.EventType.FINISHED)
        }

        ac.addTrack(trackPos)

        animCom.defaultClip = ac

        animCom.play()
    }
 
    playUnselectAnim(node: Node)
    {
        // console.log("playUnselectAnim")

        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            return
        }

        let startPos = this._selectedNode.getPosition()
        
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
            [0, {easingMethod : 2, value: startPos.z}], 
            [0.1,{easingMethod : 2, value:  startPos.z + 0.8}]
        ]); 

        let animCom: Animation;

        if (node.getComponent(Animation) == null)
        {
            animCom = node.addComponent(Animation)
        }
        else
        {
            animCom = node.getComponent(Animation)
            animCom.removeAll(Animation.EventType.FINISHED)
        }

        ac.addTrack(trackPos)

        animCom.defaultClip = ac

        animCom.play()
    }


    playCardAnim(outCardNode: Node, tByte?: number, cb?: any) {
        //转换出牌节点的牌的父节点为出牌区节点, 保持世界坐标不变
        //push到出牌区列表
        //获取坐标出牌区坐标, 创建从抽牌位置到出牌区位置的动画

        let drawCard = this._drawCardNode
        this._drawCardNode = null
        drawCard.setParent(outCardNode, true);
        let startPos = drawCard.getPosition()
        let startRot = drawCard.getRotation();
         
        let outCom = outCardNode.getComponent("playerOutCard") as playerOutCard
        let endPos = outCom.getOutCardPos();

        outCom.pushCardToList(drawCard)

        //出的牌开启阴影
        drawCard.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;

        //移除碰撞盒
        drawCard.getComponent(BoxCollider).destroy();

        // console.log(startPos, endPos, startRot)

        const ac = new AnimationClip();  

        ac.duration = 0.3

        let animY = 3;
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            animY = 0;
        }

        const trackPos = new animation.VectorTrack();
        trackPos.componentsCount = 3;
        trackPos.path = new animation.TrackPath().toProperty("position")
        const [x, y, z] = (trackPos as animation.VectorTrack).channels();
        x.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.x}], 
            [0.3, {easingMethod : 2, value: endPos.x}]
        ]);
        y.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.y}], 
            [0.15, {easingMethod : 2, value: startPos.y + animY}], 
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
            [0.2, {value: startRot, easingMethod: 2},],
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
            this._playDrawCardCb = cb
        }

        animCom.on(Animation.EventType.FINISHED, () => { 
            let pos = new Vec3(0, 0, 0);
            drawCard.getWorldPosition(pos);
            this.setSpecularFactor(drawCard, 0.25)
            this._cardIndicator.setWorldPosition(new Vec3(pos.x, pos.y + 1, pos.z))
        }, this)

        ac.addTrack(trackPos)
        ac.addTrack(trackQuat)

        animCom.defaultClip = ac

        animCom.play()
    }

    playCardFromHandAnim(index: number, outCardNode: Node, cb?: any) {
        //获取第几张手牌的坐标和这个节点
        //转换父节点到出牌区节点, 保持世界坐标不变
        //push到出牌区列表
        //获取坐标出牌区坐标, 创建从手牌位置到出牌区位置的动画
      
        this._slotIndex = index;

        let toOutCard = this._mjList[index]

        this._mjList[index] = null

        toOutCard.setParent(outCardNode, true);

        //手牌移动到出牌区位置
        let startPos = toOutCard.getPosition()
        let startRot = toOutCard.getRotation()
       
        let outCom = outCardNode.getComponent("playerOutCard") as playerOutCard
        let endPos = outCom.getOutCardPos();

        outCom.pushCardToList(toOutCard)

        //出的牌添加阴影
        toOutCard.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;

        //移除碰撞盒
        toOutCard.getComponent(BoxCollider).destroy();

        const ac = new AnimationClip();  
        
        ac.duration = 0.3;

        let animY = 3;
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            animY = 0;
        }

        const trackPos = new animation.VectorTrack();
        trackPos.componentsCount = 3;
        trackPos.path = new animation.TrackPath().toProperty("position")
        let [x,y,z] = trackPos.channels();
       
        x.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.x}], 
            [0.2, {easingMethod : 2, value: endPos.x}],
            [0.3, {easingMethod : 2, value: endPos.x}]
        ]);
        y.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.y}], 
            [0.15, {easingMethod : 2, value: startPos.y + animY}], 
            [0.3, {easingMethod : 2, value: endPos.y}]
        ]);
        z.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.z}], 
            [0.2,{easingMethod : 2, value:  endPos.z + 3}],
            [0.3,{easingMethod : 2, value:  endPos.z}]
        ]);
            

        const trackQuat = new animation.QuatTrack();
        trackQuat.path = new animation.TrackPath().toProperty("rotation")

        let quatRot = new Quat();
        Quat.fromEuler(quatRot, 0, 0, 0)
       
        const [quat] = trackQuat.channels();
        quat.curve.assignSorted([
            [0, {value: startRot, easingMethod: 2},],
            [0.2, {value: startRot, easingMethod: 2},],
            [0.3, {value: quatRot, easingMethod: 2},]
        ]);

        let animCom: Animation;

        if (toOutCard.getComponent(Animation) == null)
        {
            animCom = toOutCard.addComponent(Animation)
        }
        else
        {
            animCom = toOutCard.getComponent(Animation)
            animCom.removeAll(Animation.EventType.FINISHED)
        }

        if(cb)
        {
            animCom.on(Animation.EventType.FINISHED, cb, this)
            this._playHandCardCb = cb
        }

        animCom.on(Animation.EventType.FINISHED, () => { 
            let pos = new Vec3(0, 0, 0);
            toOutCard.getWorldPosition(pos);
            this.setSpecularFactor(toOutCard, 0.25)
            this._cardIndicator.setWorldPosition(new Vec3(pos.x, pos.y + 1, pos.z))
        }, this)

        ac.addTrack(trackPos)
        ac.addTrack(trackQuat)

        animCom.defaultClip = ac

        animCom.play()
    }

    makeSlotAnim(index: number)
    {
        // console.log("makeSlotAnim", this._slotIndex, index)

        if (this._slotIndex == -1 || this._mjList[this._slotIndex] != null)
        {
            console.log("当前没有空的手牌位置,无法空出对应的索引位置", this._slotIndex, index)

            return;
        }

        if (this._slotIndex < index) // 2空  4
        {
            for (let i = this._slotIndex + 1; i <= index; i++)
            {
                let ac = new AnimationClip()
                ac.duration = 0.2
                let track = new animation.VectorTrack();
                track.componentsCount = 3;
                track.path = new animation.TrackPath().toProperty("position")
                let [x, _, z] = track.channels();
                let mjNode = this._mjList[i];
                let startPos = mjNode.getPosition() ;
                let endPos = this.getHandPosition(i - 1);
                
                x.curve.assignSorted([
                    [0, {value: startPos.x}],
                    [0.2, {value: endPos.x}]
                ])

                z.curve.assignSorted([
                    [0, {value: startPos.z}],
                    [0.2, {value: endPos.z}]
                ])

                let animCom = mjNode.addComponent(Animation)
                ac.addTrack(track)
                animCom.defaultClip = ac
                animCom.play(); 
            }

            for (let i = this._slotIndex; i < index; i++)
            {
                this._mjList[i] = this._mjList[i + 1] // 同步平移在列表内的位置
            }
        }
        else if(index < this._slotIndex) // 2  4空
        {
            for (let i = index; i < this._slotIndex; i++)
            {
                let ac = new AnimationClip() 
                ac.duration = 0.2
                let track = new animation.VectorTrack();
                track.componentsCount = 3;
                track.path = new animation.TrackPath().toProperty("position")
                let [x, _, z] = track.channels();
                let mjNode = this._mjList[i];
                let startPos = mjNode.getPosition() ;
                let endPos = this.getHandPosition(i + 1);

                x.curve.assignSorted([
                    [0, {value: startPos.x}], 
                    [0.2, {value: endPos.x}]
                ])

                z.curve.assignSorted([
                    [0, {value: startPos.z}],
                    [0.2, {value: endPos.z}]
                ])

                let animCom = mjNode.addComponent(Animation)
                ac.addTrack(track)
                animCom.defaultClip = ac
                animCom.play(); 
            } 
            for (let i = this._slotIndex; i > index; i--)
            {
                this._mjList[i] = this._mjList[i - 1] // 同步平移在列表内的位置
            }
        }  

        this._mjList[index] = null //平移后空出来的列表位置
        this._slotIndex = index
    }

    drawCardToSlot(cb?: any)
    {
        if (this._drawCardNode == null)
        {
            console.log("没有渲染抽牌节点, 抽牌到手牌动画失败")
            return;
        }

        this._mjList[this._slotIndex] = this._drawCardNode
        this._drawCardNode = null
        let startPos = this._mjList[this._slotIndex].getPosition()
        let endPos = this.getHandPosition(this._slotIndex)

        const ac = new AnimationClip();  

        ac.duration = 0.5
        
        const track = new animation.VectorTrack();
        track.componentsCount = 3;
        track.path = new animation.TrackPath().toProperty("position")
        const [posx, posy, posz] = (track as animation.VectorTrack).channels();
        posx.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.x}], 
            [0.1, {easingMethod : 2, value: startPos.x}], 
            [0.4, {easingMethod : 2, value: endPos.x}],
            [0.5, {easingMethod : 2, value: endPos.x}]
        ]);
        posy.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.y}], 
            [0.1, {easingMethod : 2, value: startPos.y}], 
            [0.4, {easingMethod : 2, value: endPos.y}], 
            [0.5, {easingMethod : 2, value: endPos.y}]
        ]);
        posz.curve.assignSorted([
            [0, {easingMethod : 2, value: startPos.z}], 
            [0.1, {easingMethod : 2, value: startPos.z - 3.5}], 
            [0.4,{easingMethod : 2, value:  startPos.z - 3.5}],
            [0.5,{easingMethod : 2, value:  endPos.z}]
        ]);

        let animCom: Animation;

        if (this._mjList[this._slotIndex].getComponent(Animation) == null)
        {
            animCom = this._mjList[this._slotIndex].addComponent(Animation)
        }
        else
        {
            animCom = this._mjList[this._slotIndex].getComponent(Animation)
            animCom.removeAll(Animation.EventType.FINISHED)
        }

        if(cb)
        {
            animCom.on(Animation.EventType.FINISHED, cb, this)
            this._playHandCardCb = cb
        }

        ac.addTrack(track)

        animCom.defaultClip = ac

        animCom.play()
    }

    //移除对应的索引的牌去构成stack, 刷新整体node的位置
    stackAnim(indexList: number[], tByte?: number, insertIndex?: number, cb?:any) {
        // console.log("player hand stackAnim")

        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            this.removeHandCard(indexList, false);

            //吃碰传两张, 手牌末尾pop一张到抓牌
            if (indexList.length == 2)
            {
                this._drawCardNode = this._mjList.pop()
                this._drawCardNode.setPosition(MjSize.width / 2 + MjSize.width * 7, 0, -MjSize.height)
            }
            //杠传三张,不需要其他处理
            //暗杠传四张,抓牌插入手牌(如果要移除手牌的情况, 调用移除三张和手牌, 再抓一张)
            else if (indexList.length == 4 && insertIndex)
            {
                this.removeDrawCard();
                this.addHandCard(tByte, insertIndex);
            }

            this.updateHandPositionAndName()

            return
        }


        let currentRatioInWorld: number;
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.HORIZONTAL)
        {
            currentRatioInWorld = 1
        }
        else if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            currentRatioInWorld = MJBLOCK_VERTICAL_SCALE
        }

        this.removeHandCard(indexList);

        let pos = new Vec3();
        if (indexList.length == 2)
        {
            pos = this.node.getPosition();
            Vec3.add(pos, pos, new Vec3(MjSize.width * indexList.length * currentRatioInWorld, 0, 0)); // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
            this.node.setPosition(pos);
        }
        else if (indexList.length == 3)
        {
            //杠牌直接移除三张牌, 刷新位置
            pos = this.node.getPosition();
            Vec3.add(pos, pos, new Vec3(MjSize.width * indexList.length * currentRatioInWorld, 0, 0)); // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
            this.node.setPosition(pos);
            return
        }
        else if (indexList.length == 4 && insertIndex)
        {
            this.removeDrawCard();
            this.addHandCard(tByte, insertIndex);

            pos = this.node.getPosition();
            Vec3.add(pos, pos, new Vec3(MjSize.width * indexList.length - 1 * currentRatioInWorld, 0, 0)); // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放
            this.node.setPosition(pos);
            return
        }

        //吃碰时候移除两张,平移一张到抽牌区 
        let startPos = pos;
        let endPos = new Vec3();
        Vec3.add(endPos, startPos, new Vec3(MjSize.width * currentRatioInWorld, 0, 0)) // 竖版的时候主节点缩放了0.8, 因此外部的位置变化需要乘以缩放

        let ac = new AnimationClip()
        ac.duration = 0.1
        let track = new animation.VectorTrack();
        track.componentsCount = 3;
        track.path = new animation.TrackPath().toProperty("position")
        let [x] = track.channels();
       
        x.curve.assignSorted([
            [0, {value: startPos.x}],
            [0.1, {value: endPos.x}]
        ])

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
            this._stackCb = cb
        }

        ac.addTrack(track)
        animCom.defaultClip = ac
        animCom.play(); 



        this._drawCardNode = this._mjList.pop()
        let startPosDraw = this._drawCardNode.getPosition();
        let endPosDraw = new Vec3(startPosDraw.x + MjSize.width, startPosDraw.y, startPosDraw.z)

        let acDraw = new AnimationClip()
        acDraw.duration = 0.1
        let trackDraw = new animation.VectorTrack();
        trackDraw.componentsCount = 3;
        trackDraw.path = new animation.TrackPath().toProperty("position")
        let [drawX] = trackDraw.channels();
       
        drawX.curve.assignSorted([
            [0, {value: startPosDraw.x}],
            [0.1, {value: endPosDraw.x}]
        ])
        
        let animDrawCom: Animation;

        if (this._drawCardNode.getComponent(Animation) == null)
        {
            animDrawCom = this._drawCardNode.addComponent(Animation)
        }
        else
        {
            animDrawCom = this._drawCardNode.getComponent(Animation)
            animDrawCom.removeAll(Animation.EventType.FINISHED)
        }

        if(cb)
        {  
            animDrawCom.on(Animation.EventType.FINISHED, cb, this)
            // this._stackCb = cb
        }

        acDraw.addTrack(trackDraw)
        animDrawCom.defaultClip = acDraw
        animDrawCom.play(); 
    }

    openingAnim(cb?: any)
    {

        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL)
        {
            this.doOpenAnimByIndex(0, 2, 0)
            this.doOpenAnimByIndex(3, 5, 0.25)
            this.doOpenAnimByIndex(6, 8, 0.5)
            this.doOpenAnimByIndex(9, 12, 0.75, cb)
            if (this._drawCardNode)
            {
                this.playDrawCardAnim(2)
            }
            return
        }


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
        rotNode.setPosition(0, 0, 0)//新增的节点用于旋转动画, 位置是牌底部相对于手牌主节点的另外一边, 用来做相对于这个轴的旋转动画
        

        //VVVVVV
        if(this._cardPlayManager.getCurrentDir() == ScreenDir.VERTICAL && startIndex > 5)
        {
            rotNode.setPosition(0, 0, MjSize.height)
        }

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
        Quat.fromAxisAngle(rotQuat, new Vec3(1,0,0), toRadian(135))
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
        Quat.fromAxisAngle(rotateQuatX, rotAxisX, toRadian(-135));
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
            rotNode.removeFromParent()
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
        let playerStackNode = playerStack.node
        let pos = playerStack.getSpreadPosition()
        for(let i = 0; i < this._mjList.length; i++)
        {
            let mjNode = this._mjList[i]

            mjNode.setParent(playerStackNode, true)     
            
            mjNode.setPosition(i * MjSize.width + pos.x, pos.y, pos.z)
            
            mjNode.setRotation(new Quat(0,0,0));

            mjNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
            this.setSpecularFactor(mjNode, 0.25)
        } 
        
        if(handCard && handCard.lastCard > 0)
        {
            this._drawCardNode.setPosition((this._mjList.length + 1) * MjSize.width + pos.x, pos.y, pos.z)
            this._drawCardNode.setParent(playerStackNode, true)
            this._drawCardNode.setRotation(new Quat(0,0,0))
            this._drawCardNode.getChildByName("Cube").getComponent(MeshRenderer).shadowCastingMode = 1;
            this.setSpecularFactor(this._drawCardNode, 0.25)
        }
    }

    getNodeIndex(node: Node)
    {
        return this._mjList.findIndex(theNode => theNode == node, this);
    }

    //游戏开始或结束，清空手牌区，包括抓牌，保持初始状态
    resetView() {
        this.node.removeAllChildren();
        this._mjList = [];
        this._drawCardNode = null;
        this.initNodePos();
    }
}


