import { _decorator, Node, Component, Prefab, instantiate, ccenum, Toggle } from 'cc';
const { ccclass, executeInEditMode, property } = _decorator;

enum ItemType {
    DEACTIVATE_NODE = 0,
    ACTIVATE_NODE = 1,
}

ccenum(ItemType);

@ccclass('ToggleItemExtend')
export class ToggleItemExtend extends Component {
    @property({type: ItemType})
    get itemType () {
        return this._itemType;
    }
    set itemType (value: ItemType) {
        this._itemType = value
    }

    @property({type: ItemType, visible: false})
    _itemType = ItemType.DEACTIVATE_NODE;

    @property (Prefab)
    public itemPrefab :Prefab | null = null;

    _toggleCom : Toggle;

    _prefabNode : Node;

    _isChecked : boolean;

    _activatePrefab : Node | null;

    onLoad()
    {
        if (this._itemType === ItemType.DEACTIVATE_NODE)
        {
            this._toggleCom = this.getComponent(Toggle) as Toggle;

            this._activatePrefab = this.node.getChildByName("activatePrefab")
        }
        else if (this._itemType === ItemType.ACTIVATE_NODE)
        {
            this._toggleCom = this.node.parent.getComponent(Toggle) as Toggle;
        }
    }

    start()     
    {   
        console.log("ToggleItemExtend start *******************")

        if (!this.itemPrefab)
        {
            console.log("deactivatePrefab null *******************")

            return null;
        }

        this._isChecked = this._toggleCom.isChecked;

        console.log("ToggleItemExtend =====================",  this._isChecked)

        this._prefabNode = instantiate(this.itemPrefab);

        this.node.addChild(this._prefabNode);

        this._prefabNode.setPosition(0,0,0);

        this.doUpdate() 
    }

    update() {
        if (this._isChecked != this._toggleCom.isChecked)
        {
            this.doUpdate() 
        }
    }

    doUpdate() {
        this._isChecked = this._toggleCom.isChecked;

        if (this._itemType === ItemType.DEACTIVATE_NODE)
        {
            this._prefabNode.active = !this._isChecked; 
        }
        else if (this._itemType === ItemType.ACTIVATE_NODE)
        {
            this._prefabNode.active = this._isChecked; 
        }
    }
}


