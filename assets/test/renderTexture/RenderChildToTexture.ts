import { _decorator, Layers, Component, Node, Camera, Vec3, Vec4, UITransform, RenderTexture, SpriteFrame, Sprite, director, Quat } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

import { NodeUtil } from 'bos/exports';

const rttCamName = "__RTT_camera__"

@ccclass('RenderChildToTexture')
// @executeInEditMode        
export class RenderChildToTexture extends Component {
    _renderTexture: RenderTexture;
    _sp: SpriteFrame;
    _camCom: Camera;
    _nodeScale: Vec3;
    onLoad() {
        // this.node.on(Node.EventType.TOUCH_START, (e) => {
        //     console.log(e)
        // }, null, true)

        // this.node.on(Node.EventType.TOUCH_START, (e) => {
        //     console.log(e)

        //     NodeUtil.renderToImage(this.node, (sp) => {
        //         console.log("set sprite sprite")
        //         director.getScene().getChildByName("Canvas").getChildByName("testSprite").getChildByName("Sprite").getComponent(Sprite).spriteFrame = sp
        //     })
            
        // }, null, true)


        // this.node.getChildByName("Button").on(Node.EventType.TOUCH_START, (e) => {
        //     console.log(e)
        // }, null, true)

        // //要在项目设置预配置一个用于做renderTexture的层, 我们这里叫"RTT"
        // let rttLayer = Layers.nameToLayer("RTT")

        // // console.log("layer",  Layers.Enum , rttLayer)

        // if (rttLayer == null) {
        //     console.log("没有找到rtt渲染层,请检查项目配置中的layer设置")
        // }

        // if (this.node.getChildByName(rttCamName)) {
        //     return
        // }

        // this._nodeScale = this.node.getScale();
        // this._nodeScale = new Vec3(1, 1, 1);

        // //创建一个摄像机节点, 位置保持在中心, 后续以此位置构造正交投影来确定摄像机可以绘制的范围
        // let camNode = new Node();
        // this.node.addChild(camNode);
        // camNode.name = rttCamName;
        // camNode.setPosition(new Vec3(0, 0, 1000));

        // console.log("nodeScale", this._nodeScale)
        // //node的旋转不会影响绘制内容
        // //camera的旋转会影响
        // // let quat = new Quat();
        // // Quat.fromAxisAngle(quat, new Vec3(0,0,1), 45);
        // // camNode.setRotation(quat);

        // //添加摄像机组件, 
        // this._camCom = camNode.addComponent(Camera);
        // this._camCom.visibility = rttLayer //设置摄像机的渲染层
        // this._camCom.priority = 0
        // this._camCom.projection = Camera.ProjectionType.ORTHO

        // // console.log("projectionType", camCom.projection, Camera.ProjectionType.ORTHO)
        // // console.log("window and viewport", camCom.camera.window, camCom.camera.viewport)


        // //获取节点的宽高
        // let uiTransCom = this.node.getComponent(UITransform)
        // let nodeWidth = uiTransCom.contentSize.width;
        // let nodeHeight = uiTransCom.contentSize.height;

        // // Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
        // //这里构建的正交依据为 [-orthoHeight * aspectRatio, orthoHeight * aspectRatio, -orthoHeight, orthoHeight]
        // //aspect ratio 由renderTexture的尺寸比例决定
        // this._camCom.orthoHeight = nodeHeight / 2 * this._nodeScale.y
        // this._camCom.camera.clearColor = new Vec4(255, 0, 0, 255)
        // // camCom.camera.setFixedSize(2, 1)
        // console.log("uiTransCom.contentSize", uiTransCom.contentSize)


        // //关于node变换的测试
        // //translate的话camera可以正确继承
        // //旋转不需要处理,正常渲染到纹理之后赋给节点即可
        // //缩放会导致绘制到纹理时就缩放了
        // //锚点不会继承, 支持的话要通过换算节点位置来达到效果

        // for (let cNode of this.node.children) {
        //     console.log(cNode.name)
        //     if(cNode.name != "Button")
        //     {
        //         cNode.layer = rttLayer;
        //     }
        // }

        // this._renderTexture = new RenderTexture();

        // //!!!这里会决定生成纹理的尺寸, 同时也会确定宽高比例, 会影响摄像机
        // this._renderTexture.reset({
        //     width: nodeWidth * this._nodeScale.x,
        //     height: nodeHeight * this._nodeScale.y,
        // })

        // this._camCom.targetTexture = this._renderTexture;

        // this._sp = new SpriteFrame();
        // this._sp.texture = this._renderTexture;

        // let spriteCom = this.node.getComponent(Sprite)
        // if (spriteCom == null) {
        //     this.node.addComponent(Sprite);
        // }
        // else if (spriteCom.spriteFrame) {
        //     console.log("当前节点添加了RenderChildToTexture组件, 当前节点的spriteFrame会被占用用于绘制子节点缓存纹理")
        // }

        // this.node.getComponent(Sprite).spriteFrame = this._sp

        //test
        // director.getScene().getChildByName("Canvas").getChildByName("testSprite").getComponent(Sprite).spriteFrame = this._sp

    }

    onEnable() {
        // let rttLayer = Layers.nameToLayer("RTT")
        // //子节点还原到UI_2D层
        // for (let cNode of this.node.children) {
        //     if(cNode.name != "Button")
        //     {
        //         cNode.layer = rttLayer;
        //     }   
        // }

        // this.node.getComponent(Sprite).spriteFrame = this._sp

        // this.node.getChildByName(rttCamName).active = true

        // //node 尺寸变化时是否要同步更新渲染的范围和fbo的尺寸
        // // this.node.on(Node.EventType.ANCHOR_CHANGED, this.drawRoundRect, this);
        // this.node.on(Node.EventType.SIZE_CHANGED, this.updateCamera, this);
    }

    start() {

    }

    onDisable() {
        // let layer2D = Layers.nameToLayer("UI_2D")

        // //子节点还原到UI_2D层
        // for (let cNode of this.node.children) {
        //     if (cNode.name != rttCamName) {
        //         cNode.layer = layer2D;
        //     }
        // }

        // this.node.getComponent(Sprite).spriteFrame = null

        // this.node.getChildByName(rttCamName).active = false

        // // this.node.off(Node.EventType.ANCHOR_CHANGED, this.drawRoundRect, this);
        // this.node.off(Node.EventType.SIZE_CHANGED, this.updateCamera, this);
    }

    updateCamera() {
        // let uiTransCom = this.node.getComponent(UITransform)
        // let nodeWidth = uiTransCom.contentSize.width;
        // let nodeHeight = uiTransCom.contentSize.height;

        // this._camCom.orthoHeight = nodeHeight / 2 * this._nodeScale.y

        // this._renderTexture.reset({
        //     width: nodeWidth * this._nodeScale.x,
        //     height: nodeHeight * this._nodeScale.y,
        // })
    }

    test() {
        console.log("on clicked ****************")
    }
}


