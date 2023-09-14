import { Log, resLoader } from 'bos/exports';
import { CCString } from 'cc';
import { CCBoolean, _decorator, Component, Node, Sprite, Prefab, instantiate, SpriteFrame, Label, Color, } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, executeInEditMode } = _decorator;

interface TabDelegate {
    contentRoot: Node,
    onSelectTab(tab:Tab) : void
}

@ccclass('Tab')
@executeInEditMode(true)
export class Tab extends Component {
    @property(Sprite)
    sprite: Sprite
    
    @property({serializable: true})
    private _isSelected = false

    @property({type: CCBoolean})
    get isSelected() {
        return this._isSelected
    }
    set isSelected(isSelected: boolean) { 
        this._isSelected = isSelected; 
        this.updateTitle()
        this.updateSprite()
        this.updateContent()
    }

    @property(SpriteFrame)
    normalSprite: SpriteFrame

    @property(SpriteFrame)
    pressSprite: SpriteFrame

    @property(SpriteFrame)
    selectedSprite: SpriteFrame

    @property(Prefab)
    contentPrefab: Prefab

    @property({type: CCString})
    contentBundle: string

    @property(Label)
    titleLabel: Label

    @property({type: Color})
    selectedColor = new Color()

    @property({type: Color})
    normalColor = new Color()

    private _delegate: TabDelegate
    private _content: Node
    public root: Node

    onLoad() {
        this.loadContent()
        this.updateTitle()
        this.updateSprite()
    }

    updateSprite() {
        if(!this.sprite || !this.selectedSprite || !this.normalSprite) {
            return
        }
        this.sprite.spriteFrame = this.isSelected ? this.selectedSprite : this.normalSprite
    }

    updateTitle() {
        if(!this.titleLabel || !this.selectedColor) {
            return
        }
        this.titleLabel.color = this._isSelected ? this.selectedColor : this.normalColor
    }

    loadContent() {
        if (!EDITOR && this.contentBundle && this.contentBundle != "") {
            resLoader.loadPrefab(this.contentBundle, (err, prefab)=>{
                if(err) {
                    console.warn("load content err", err, this.contentBundle)
                    return
                }
                this.contentPrefab = prefab
                this.updateContent()
            })
        } else {
            this.updateContent()
        }
    }

    updateContent() {
        if (this._content) {
            this._content.active = this._isSelected
            return
        }
        if (!this._isSelected) {
            return
        }
        if (!this.contentPrefab) {
            console.warn("content not set", this.node.name)
            return
        }
        this._content = instantiate(this.contentPrefab)
        this._content.active = this._isSelected
        this._delegate?.contentRoot.addChild(this._content)
    }

    setDelegate(delegate: TabDelegate) {
        this._delegate = delegate
    }

    onClick() {
        this._delegate?.onSelectTab(this)
    }
}