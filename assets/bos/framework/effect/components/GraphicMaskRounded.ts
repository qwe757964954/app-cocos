import { _decorator, Component, Node, Graphics, Sprite, UITransform, CCFloat, CCBoolean, Mask } from 'cc';
const { ccclass, executeInEditMode, property  } = _decorator;

@ccclass('GraphicMaskRounded')
@executeInEditMode
export class GraphicMaskRounded extends Component {

    //面板属性的装饰器,把下面声明的属性参数显示在面板上
    @property({
        type: CCFloat,//类型
        visible(this: GraphicMaskRounded)//显示的判断条件 
        {
            return !this.autoSize;
        }
    })
    // 此属性的getter和setter, 面板数据变化时会触发setter
    get configX() {
        // console.log("ggggg configX ============");
        return this._configX;
    }
    set configX(value: number){
        // console.log("sssss configX ============");
        if (this._configX === value)
        {
            return;
        }
        else
        {
            this._configX = value;

            if (this.graphicCom instanceof Graphics)
            {
                this.drawRoundRect();
            }
        }
    }

    @property({serializable:true,visible:false})
    protected _configX = 0;


    
    @property({
        type: CCFloat,
        visible(this: GraphicMaskRounded) 
        {
            return !this.autoSize;
        }
    })
    get configY() {
        // console.log("ggggg configY ============");
        return this._configY;
    }
    set configY(value: number){
        // console.log("sssss configY ============");
        if (this._configY === value)
        {
            return;
        }
        else
        {
            this._configY = value;
            if (this.graphicCom instanceof Graphics)
            {
                this.drawRoundRect();
            }
        }
    }

    @property({serializable:true,visible:false})
    protected _configY = 0;
    
    

    @property({
        type: CCFloat,
        visible(this: GraphicMaskRounded) 
        {
            return !this.autoSize;
        }
    })
    get configW() {
        return this._configW;
    }
    set configW(value: number){
        if (this._configW === value)
        {
            return;
        }
        else
        {
            this._configW = value;
            if (this.graphicCom instanceof Graphics)
            {
                this.drawRoundRect();
            }
        }
    }

    @property({serializable:true,visible:false})
    protected _configW = 0;

   
    @property({
        type: CCFloat,
        visible(this: GraphicMaskRounded) 
        {
            return !this.autoSize;
        }
    })
    get configH() {
        return this._configH;
    }
    set configH(value: number){
        if (this._configH === value)
        {
            return;
        }
        else
        { 
            this._configH = value;
            if (this.graphicCom instanceof Graphics)
            {
                this.drawRoundRect();
            }
        }
    }

    @property({serializable:true,visible:false})
    protected _configH = 0;



    @property({ type: CCFloat})
    get radius() {
        // console.log("ggggg radius ============");
        return this._radius;
    }
    set radius(value: number){
        // console.log("sssss radius ============");
        // console.log(value);
        if (this._radius === value)
        {
            console.log("return in raidus set =================")
            return;
        }
        else
        {
            console.log("update in raidus set =================")
            this._radius = value;
            if (this.graphicCom instanceof Graphics)
            {
                this.drawRoundRect();
            }
        }
    }

    @property({serializable:true,visible:false})
    protected _radius = 50;




    @property(CCFloat)
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(value: boolean){
        if (this._autoSize === value)
        {
            return;
        }
        else
        {
            this._autoSize = value;
            if (this.graphicCom instanceof Graphics)
            {
                this.drawRoundRect();
            }
        }
    }

    @property({serializable:true,visible:false})
    protected _autoSize = true;

    graphicCom : Graphics;

    onLoad () {

    } 

    start()
    {     
        console.log("drawRoundRectdrawRoundRectdrawRoundRect11111111")
        const mask = this.getComponent(Mask)!;

        //Graphic | Sprite
        this.graphicCom = mask.subComp as Graphics;

         //如果是矢量遮罩才绘制矢量
         if (this.graphicCom instanceof Graphics)
         {
             console.log("xxxxxxxxxxxx")
             this.drawRoundRect();
         } 
    }

    //监听节点变化
    public onEnable () {
        this.node.on(Node.EventType.ANCHOR_CHANGED, this.drawRoundRect, this);
        this.node.on(Node.EventType.SIZE_CHANGED, this.drawRoundRect, this);
    }

    public onRestore () {
        this.drawRoundRect();
    }

    public onDisable () {
        this.node.off(Node.EventType.ANCHOR_CHANGED, this.drawRoundRect, this);
        this.node.off(Node.EventType.SIZE_CHANGED, this.drawRoundRect, this);
    }

    public onDestroy () {
      
    }

    drawRoundRect() 
    { 
        console.log("drawRoundRectdrawRoundRectdrawRoundRect")
        
        if(this.graphicCom == null || !(this.graphicCom instanceof Graphics))
        {
            return;
        }

        this.graphicCom.clear();

        const uiTransCom = this.getComponent(UITransform)

        //要受anchor和size的影响
        const size = uiTransCom.contentSize;
        const width = size.width;
        const height = size.height;
        const ap = uiTransCom.anchorPoint;
        const x = -width * ap.x;
        const y = -height * ap.y;

        if (this._autoSize)
        {
            let nodeWidth = uiTransCom.width;
            let nodeHeight = uiTransCom.height;

            // console.log("node Size ============", nodeWidth, nodeHeight);
           
            this.graphicCom.roundRect(x, y, nodeWidth, nodeHeight, this._radius);
            this.graphicCom.close();
            this.graphicCom.fill();
        }
        else
        {
            this.graphicCom.roundRect(this._configX - this._configW/2 + x + 0.5*width ,this._configY - this._configH/2 + y + 0.5*height, this._configW, this._configH, this._radius);
            this.graphicCom.close();
            this.graphicCom.fill();
        }
    }
}


