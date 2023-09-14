
import { CaptureFile } from "bos/base/filesystem/CaptureFile";
import { uiMgr } from "bos/exports";
import { Camera, Color, Layers, Node, RenderTexture, Size, Sprite, UITransform, Vec3, Vec4, director, assetManager, Material, gfx } from "cc";

// const { BlendFactor } = gfx;

/** 节点常用工具 */
export class NodeUtil {
    static getContentSize(node: Node): Size {
        let uiTransform = node.getComponent(UITransform);
        if (uiTransform == null)
            return new Size(0, 0);

        return uiTransform.contentSize;
    }

    static setContentSize(node: Node, size: Size) {
        let uiTransform = node.getComponent(UITransform);
        if (uiTransform == null)
            return
        uiTransform.contentSize = size;
    }


    static sendMessage(node: Node, funcName: string, ...args: any[]) {
        let components = node.components;
        components.forEach((component) => {
            if (component[funcName]) {
                component[funcName].call(component, ...args);
            }
        });
    }

    static broadcastMessage(node: Node, funcName: string, ...args: any[]) {
        NodeUtil.sendMessage(node, funcName, ...args);
        node.children.forEach((child) => {
            NodeUtil.broadcastMessage(child, funcName, ...args);
        });
    }

    static sendMessageUpwards(node: Node, funcName: string, ...args: any[]) {
        NodeUtil.sendMessage(node, funcName, ...args);
        if (node.parent) {
            NodeUtil.sendMessageUpwards(node.parent, funcName, ...args);
        }
    }

    static setSpriteColor(node: Node, color: Color, setChildren?: boolean) {
        const sp = node.getComponent(Sprite)
        if (sp) {
            sp.color = color
        }
        if (setChildren) {
            node.children?.forEach(child => this.setSpriteColor(child, color, setChildren))
        }
    }

    /**
     * 对某个node进行截图， 返回一个CaptureFile对象，可通过此对象进行 创建SpriteFrame/保存到本地文件 等操作
     * 
     * node节点和摄像机相关的信息:
     * 平移, 摄像机可视范围会继承node的平移(不影响渲染内容)
     * 旋转, 推测摄像机可视范围会继承node的平移(不影响渲染内容)
     * 缩放, node的缩放会在渲染到纹理时就生效,但是摄像机的可视范围不会继承此变换(会影响渲染内容,不支持)
     * 锚点, 看要不要通过计算更新摄像机位置
     * 
     * @param nodeToRender  
     * @returns 
     * @usage
     * import { NodeUtil } from 'bos/exports';
     * NodeUtil.renderToImage(this.node).then((captureFile) => {
     *     if (captureFile)
     *     {   
     *         captureFile.saveToFile("asdasd.png")
     *     }
     * })
     */
    static renderToImage(nodeToRender: Node): Promise<CaptureFile | void> {
        return new Promise<CaptureFile | void>(r => {
            
            let layer_rtt = 1 << Layers.nameToLayer("RTT")
            //主摄像机此时可以绘制RTT层, 不然节点移至RTT时当前场景此帧不会渲染此节点
            
            let mainCam = uiMgr.getCanvasCamera()
            if (mainCam) {
                mainCam.visibility = layer_rtt | Layers.BitMask.UI_2D
            }

            // console.log("1 << 1", 1 << Layers.nameToLayer("RTT"))
            // console.log("UI_2D", Layers.BitMask.UI_2D)
            // console.log("or",  mainCam.visibility)

            // let _nodeScale = nodeToRender.getScale();
            // _nodeScale = new Vec3(1, 1, 1);

            //创建一个摄像机节点, 位置保持在中心, 后续以此位置构造正交投影来确定摄像机可以绘制的范围
            let camNode = new Node();
            nodeToRender.addChild(camNode);
            camNode.name = "rttCam";
            camNode.setPosition(new Vec3(0, 0, 1000));

            // console.log("nodeScale", _nodeScale)

            //添加摄像机组件, 绘制RTT层的内容
            let _camCom = camNode.addComponent(Camera);
            _camCom.visibility = layer_rtt //设置摄像机的渲染层
            _camCom.priority = 0
            _camCom.projection = Camera.ProjectionType.ORTHO
            _camCom.camera.clearColor = new Vec4(0, 0, 0, 0)

            // console.log("projectionType", camCom.projection, Camera.ProjectionType.ORTHO)
            // console.log("window and viewport", camCom.camera.window, camCom.camera.viewport)

            //获取节点的宽高
            let uiTransCom = nodeToRender.getComponent(UITransform)
            let nodeWidth = uiTransCom.contentSize.width;
            let nodeHeight = uiTransCom.contentSize.height;

            // console.log("uiTransCom.contentSize", uiTransCom.contentSize)

            // Mat4.ortho(this._matProj, -x, x, -y, y, this._nearClip, this._farClip, this._device.capabilities.clipSpaceMinZ, projectionSignY, orientation);
            //这里构建的正交计算为 [-orthoHeight * aspectRatio, orthoHeight * aspectRatio, -orthoHeight, orthoHeight]
            //aspect ratio 由renderTexture的尺寸比例决定
            _camCom.orthoHeight = nodeHeight / 2     //* this._nodeScale.y

            //当前节点此帧都在RTT层绘制
            nodeToRender.walk((target) => {
                target.layer = layer_rtt

                // for referencing
                // let spCom = target.getComponent(Sprite)
                // if (spCom)
                // {
                //     // console.log(target.name,spCom.getSharedMaterial(0).name, spCom.customMaterial)

                //     if(spCom.customMaterial)
                //     {   
                //         //如果已经有自定义的材质, 获取材质实例, 修改后应用到当前Sprite
                //         //如果自定义材质修改了混合模式可能会影响原有的效果
                //         let matInst = spCom.material 
                //         matInst.recompileShaders({
                //             "SAMPLE_FROM_RT": true
                //         })
                //         // matInst.passes[0].blendState.targets[0].blendSrc = BlendFactor.ONE
                //     }
                //     else
                //     {
                //         //如果使用系统默认材质, 统一替换为rtt的共享材质
                //         spCom.customMaterial = rttMat
                //     }

                //     // console.log(target.name,spCom.getSharedMaterial(0).name, spCom.customMaterial)
                // }   
            })

            let _renderTexture = new RenderTexture();

            //!!!这里会决定生成纹理的尺寸, 同时也会确定宽高比例, 会影响摄像机的可视范围
            _renderTexture.reset({
                width: nodeWidth, //* this._nodeScale.x
                height: nodeHeight, // * this._nodeScale.y
            })

            _camCom.targetTexture = _renderTexture;

            //debug
            // let _sp = new SpriteFrame();

            _camCom.scheduleOnce(() => {
                let pixels = _renderTexture.readPixels(0, 0, nodeWidth, nodeHeight)
                let file = new CaptureFile(pixels, nodeWidth, nodeHeight)
                
                if (camNode)
                {
                    camNode.removeFromParent()
                }

                //还原节点到UI_2D
                if (nodeToRender)
                {
                    nodeToRender.walk((target) => {
                        target.layer = Layers.BitMask.UI_2D
    
                        // for referencing
                        // let spCom = target.getComponent(Sprite)
                        // if (spCom)
                        // {
                        //     console.log(target.name,spCom.getSharedMaterial(0).name, spCom.customMaterial)
    
                        //     if(spCom.customMaterial)
                        //     {   
                        //         //还原为原来的自定义材质
                        //         spCom.setMaterial(spCom.customMaterial, 0)
                        //     }
                        //     else
                        //     {
                        //         //移除自定义材质,使用默认系统材质
                        //         spCom.customMaterial = null
                        //     }
    
                        //     console.log(target.name,spCom.getSharedMaterial(0).name, spCom.customMaterial)
                        // } 
                    })
                    r(file)
                }
                else
                {
                    r()
                }
            })
        })
    }
}
