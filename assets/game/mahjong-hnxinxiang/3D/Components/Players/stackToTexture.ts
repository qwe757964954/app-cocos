import { _decorator, Component, Node, Prefab, Camera, Layers, RenderTexture, Vec2, SpriteFrame, instantiate, director, Sprite, Vec4, MeshRenderer } from 'cc';
import { setSymbol } from './utils';
import { MjSize } from './cardConfigs';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('stackToTexture')
// @executeInEditMode
export class stackToTexture extends Component {
    @property({ type: Prefab })
    get mjPrefab() {
        return this._mjPrefab;
    }
    set mjPrefab(value: Prefab) {
        this._mjPrefab = value
    }
 
    @property({ type: Prefab })
    _mjPrefab: Prefab | null;
    
    _cameraNodeList: Node[] = [];  
    
    //在onload之后调用渲染到纹理, 纹理方向会反, 目前的处理方式是把sprite的y改成-1
    start() {
        //debug
        // this._testDstNode.getComponent(Sprite).spriteFrame = this.renderStackTexture([0x0101, 0x0102, 0x0103, 0x0104], new Vec2(256,256))
        // this._testDstNode2.getComponent(Sprite).spriteFrame = this.renderStackTexture([0x2101, 0x2201, 0x2301], new Vec2(256,256))
    }

    //加载模型自带的材质renderTexture会有问题,需要调整成buildin-standard或者legacy的材质
    //size参数如果目标sprite选择trim则会自动等于此大小
    //多次调用实际上在世界空间主摄像机外依次构建新的摄像机和渲染节点
    renderStackTexture(data: number[], size: Vec2): SpriteFrame //
    {    
        let rttLayer = 2
        this.node.layer = rttLayer

        let camNode = new Node()
        let camCom = camNode.addComponent(Camera)
        camNode.name = "rttCam" + this._cameraNodeList.length;
        camNode.setPosition(100 * (this._cameraNodeList.length + 1), 0, 0)
        camNode.layer = rttLayer
        this.node.addChild(camNode)
        
        camCom.visibility = rttLayer
        camCom.priority = 0
        camCom.projection = Camera.ProjectionType.PERSPECTIVE
        camCom.camera.clearColor = new Vec4(0,0,0,0.3)
        camCom.fov = 35
        camCom.near = 1 
        camCom.far = 1000

        let renderTexture = new RenderTexture()

        renderTexture.reset({
            width: size.x,
            height: size.y
        })    
    
        camCom.targetTexture = renderTexture

        let sp = new SpriteFrame()
        sp.texture = renderTexture

        let mjRootNode = new Node();
        mjRootNode.layer = rttLayer  
        mjRootNode.setPosition(0,0,-9)
        mjRootNode.setRotationFromEuler(70,0,0)

        camNode.addChild(mjRootNode)

        for (let i = 0; i < data.length; i++)
        {
            let index = i == 3 ? i - 2 : i; 

            let offset = i == 3 ? MjSize.length : 0;

            let mjNode = this.createMJNode(data[i], rttLayer)

            mjNode.setPosition(MjSize.width * (index - 1), offset, 0)

            mjRootNode.addChild(mjNode)
        }
        

        this._cameraNodeList.push(camNode)

        return sp
    }

    createMJNode(value, layer): Node
    {
        let mjNode = instantiate(this._mjPrefab)

        mjNode.layer = layer
        mjNode.setPosition(0,0,0)

        setSymbol(mjNode,value)

        mjNode.getChildByName("Cube").layer = layer

        mjNode.getChildByName("Cube").getComponent(MeshRenderer).getMaterialInstance(0).setProperty("specularIntensity", 0)
        mjNode.getChildByName("Cube").getComponent(MeshRenderer).getMaterialInstance(1).setProperty("specularIntensity", 0)

        return mjNode
    }

    //使用完后需要主动清理
    clearCameraNodes()
    {
        for (let i = 0; i < this._cameraNodeList.length; i++)
        {
            let camNode = this._cameraNodeList[i]
            camNode.removeFromParent()
            camNode.destroy()
        }

        this._cameraNodeList = []
    }
}


