import { _decorator, Component, Node, UITransform, Material, Sprite, Vec2, CCFloat, CCBoolean } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('fillet_radius')
@executeInEditMode
export class fillet_radius extends Component {
    _transCom: UITransform;

    _material: Material;

    @property(CCBoolean)
    get useLT()
    {
        return this._use_lt;
    }
    
    set useLT(value: boolean)
    {
        if (this._use_lt != value)
        {
            this._use_lt = value
            this.updateShaderCompile()
        }
    }
        
    @property(CCBoolean)
    get useRT()
    {
        return this._use_rt;
    }

    set useRT(value: boolean)
    {
        if (this._use_rt != value)
        {
            this._use_rt = value
            this.updateShaderCompile()
        }
    }

    @property(CCBoolean)
    get useRB()
    {
        return this._use_rb;
    }

    set useRB(value: boolean)
    {
        if (this._use_rb != value)
        {
            this._use_rb = value
            this.updateShaderCompile()
        }
    }

    @property(CCBoolean)
    get useLB()
    {
        return this._use_lb;
    }

    set useLB(value: boolean)
    {
        if (this._use_lb != value)
        {
            this._use_lb = value
            this.updateShaderCompile()
        }
    }

    @property(CCBoolean)
    get inverse()
    {
        return this._inverse;
    }

    set inverse(value: boolean)
    {
        if (this._inverse != value)
        {
            this._inverse = value
            this.updateShaderCompile()
        }
    }

    @property({serializable:true,visible:false})
    _use_lt: boolean = true;
    @property({serializable:true,visible:false})
    _use_rt: boolean = true;
    @property({serializable:true,visible:false})
    _use_rb: boolean = true;
    @property({serializable:true,visible:false})
    _use_lb: boolean = true;
    @property({serializable:true,visible:false})
    _inverse: boolean = false;

    @property(CCFloat)
    get radiusLT()
    {
        return this._radius_lt;
    }

    set radiusLT(value: number)
    {
        if (this._radius_lt != value)
        {
            this._radius_lt = value
            this.updateConfigUniforms()
        }
    }

    @property(CCFloat)
    get radiusRT()
    {
        return this._radius_rt;
    }

    set radiusRT(value: number)
    {
        if (this._radius_rt != value)
        {
            this._radius_rt = value
            this.updateConfigUniforms()
        }
    }

    @property(CCFloat)
    get radiusRB()
    {
        return this._radius_rb;
    }

    set radiusRB(value: number)
    {
        if (this._radius_rb != value)
        {
            this._radius_rb = value
            this.updateConfigUniforms()
        }
    }

    @property(CCFloat)
    get radiusLB()
    {
        return this._radius_lb;
    }

    set radiusLB(value: number)
    {
        if (this._radius_lb != value)
        {
            this._radius_lb = value
            this.updateConfigUniforms()
        }
    }    

    @property({serializable:true,visible:false})
    _radius_lt: number = 15;
    @property({serializable:true,visible:false})
    _radius_rt: number = 15;
    @property({serializable:true,visible:false})
    _radius_rb: number = 15;
    @property({serializable:true,visible:false})
    _radius_lb: number = 15;

    

    public onEnable () {
        this.node.on(Node.EventType.SIZE_CHANGED, this.updateSizeUniform, this);
    }

    public onDisable () {
        this.node.off(Node.EventType.SIZE_CHANGED, this.updateSizeUniform, this);
    }
    
    onLoad()
    {
            this._transCom = this.getComponent(UITransform)
        
            //代码中创建材质cocos引擎会报错, 目前通过外部手动绑定解决
            // let mat = new Material();
            
            // this.getComponent(Sprite).customMaterial = mat
            
            // mat.initialize({
            //     effectName: '../bos/framework/effect/effects/fillet_raidus',
            //     defines: {
            //         USE_LT: this._use_lt,
            //         USE_RT: this._use_rt,
            //         USE_RB: this._use_rb,    
            //         USE_LB: this._use_lb,
            //         IS_INVERSE: this._inverse,
            //     }
            // });

            this._material = this.getComponent(Sprite).getMaterialInstance(0)
    }

    start()
    {
        this.updateShaderCompile()
        this.updateConfigUniforms()
        this.updateSizeUniform()
    }

    updateShaderCompile()
    {
        this._material.recompileShaders({
            "USE_LT": this._use_lt,
            "USE_RT": this._use_rt,
            "USE_RB": this._use_rb,
            "USE_LB": this._use_lb,
            "IS_INVERSE": this._inverse,
        })
    }

    updateConfigUniforms()
    {
        this._material.setProperty("radiusLT", this._radius_lt)
        this._material.setProperty("radiusRT", this._radius_rt)
        this._material.setProperty("radiusRB", this._radius_rb)
        this._material.setProperty("radiusLB", this._radius_lb)
    }

    updateSizeUniform()
    {
        let contentSize = this._transCom.contentSize
        console.log("contentSize", contentSize)
        this._material.setProperty("objectSize", new Vec2(contentSize.x, contentSize.y))
    }
}


