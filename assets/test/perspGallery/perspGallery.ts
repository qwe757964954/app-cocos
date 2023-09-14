import { UITransform } from 'cc';
import { _decorator, Component, Node, Label, Prefab, Camera, Layers, RenderTexture, Vec2, SpriteFrame, instantiate, director, Sprite, Vec4, Vec3, Mat4, MeshRenderer, toRadian } from 'cc';
import { input, Input, KeyCode, EventKeyboard, assetManager } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

const dataCount = 10
const radius = 250

@ccclass('perspGallery')
// @executeInEditMode
export class perspGallery extends Component {
    camNode: Node;

    centerNode: Node;
    
    rotAngle = 0;
            
    onLoad()
    {           
        console.log("start================================")
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this);

        this.createGallery()
    }
    start() {
       
          
    }

    onKeyDown(event: EventKeyboard) { 
        console.log(event.keyCode)
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.rotAngle -= 1;
                this.centerNode.setRotationFromEuler(this.rotAngle, 0, 0);
                break;
            case KeyCode.KEY_S:
                this.rotAngle += 1;
                this.centerNode.setRotationFromEuler(this.rotAngle, 0, 0);
                break;
        }
    }

    setData(data: string[])
    {

    }

    setSize(width: number, height: number)
    {

    }

    setRotation(angle: number)
    {

    }

    createGallery(data?: string[], width?: number, height?: number)
    {    
        console.log("createGallerycreateGallery================")

        //如果是2D节点, 在canvas下且通过代码创建的节点渲染到纹理中, 目前测试必须要在UI_2D层下,不然无法显示
        let rttLayer = 1 << Layers.nameToLayer("UI_2D")

        let camNode = new Node();
        let camCom = camNode.addComponent(Camera)
        camNode.name = "__rttCam__"
        camNode.setPosition(3000, 0, 0)
        camNode.layer = rttLayer
        this.node.addChild(camNode)
            
        camCom.visibility = rttLayer
        camCom.priority = 0
        camCom.projection = Camera.ProjectionType.PERSPECTIVE
        camCom.camera.clearColor = new Vec4(0,0,0,0)    
        camCom.fov = 60
        camCom.near = 1     
        camCom.far = radius * 2

        let renderTexture = new RenderTexture();

        renderTexture.reset({
            width: 800,
            height: 300,
        })    
    
        camCom.targetTexture = renderTexture

        let sp = new SpriteFrame()
        sp.texture = renderTexture

        this.centerNode = new Node();
        this.centerNode.name = "centerNode"
        this.centerNode.layer = rttLayer  
        this.centerNode.setPosition(0,0,radius * -2)
        this.centerNode.setRotationFromEuler(0,0,0)

        camNode.addChild(this.centerNode)
    
        let dir = new Vec3(0,0,1);

        console.log("dir", dir)

        for (let i = 0; i < dataCount; i++)
        {
            let labelNode = new Node()
            labelNode.layer = rttLayer
            labelNode.name = 'label' + i
            let lablCom = labelNode.addComponent(Label) 
            lablCom.fontSize = 100
            lablCom.string = "而此时测试文字"
            lablCom.lineHeight = 100

            let rotMat = new Mat4();

            let angle = 360/dataCount*i

            Mat4.fromRotation(rotMat, toRadian(angle),new Vec3(1, 0, 0))

            console.log("angle", angle)

            let labelDir = new Vec3();
            Vec3.transformMat4(labelDir, dir, rotMat);

            let labelPos = new Vec3()
            Vec3.multiplyScalar(labelPos, labelDir, radius)

            console.log("labelPos", labelPos)

            labelNode.setRotationFromEuler(new Vec3(angle, 0 , 0))

            labelNode.setPosition(labelPos)

            this.centerNode.addChild(labelNode)
        }

        this.node.getComponent(Sprite).spriteFrame = sp
    }
}


