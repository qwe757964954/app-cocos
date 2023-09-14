import { _decorator, Node, Size, Tween, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, NodeUtil } from 'bos/exports';
import { BundleSprite } from 'bos/framework/component/BundleSprite';
import { Vec2 } from 'cc';
import { Card } from 'game/room/framework/card/Card';
import { UIOpacity } from 'cc';
import { Color } from 'cc';
import { TaskQueue } from 'bos/base/taskqueue/TaskQueue';


//牌值颜色 ，大小王特殊值
const CardValueColorConfig = {
    [0]: "red",
    [1]: "black",
    [2]: "red",
    [3]: "black",
    [0x4e]: "blackJoker",
    [0x4f]: "redJoker",
}

//花色
const CardColorConfig = {
    [0]: "squareSmall",
    [1]: "plumSmall",
    [2]: "heartSmall",
    [3]: "spadeSmall",
}

//牌图 ，大小王特殊值
const CardImgConfig = {
    [0]: "squareBig",
    [1]: "plumBig",
    [2]: "heartBig",
    [3]: "spadeBig",
    [0x4e]: "jokerblack",
    [0x4f]: "jokerred",
}

enum Styles {
    Big 	= 1,
    Small 	= 2,
}

export interface CardViewData {
    cardByte: number;
    isReverse?: boolean;
    style?: number;
    scale?: number;
}

@ccclass('CardView')
export class CardView extends XComponent {
    @property(BundleSprite)
    public smallView:BundleSprite;
    @property(Node)
    public valueNode:Node;
    @property(BundleSprite)
    public jokerNode:BundleSprite;
    @property(BundleSprite)
    public cardImg: BundleSprite;
    @property(BundleSprite)
    public cValue:BundleSprite;
    @property(BundleSprite)
    public cColor:BundleSprite;
    @property(Node)
    public frontNode:Node;
    @property(Node)
    public backNode:Node;
    @property(Node)
    public bigView:Node;
    @property(Node)
    public lordIcon: Node;
    @property(Node)
    public content: Node;



    private _popupOffset: number = 50;
    private _isReverse: boolean = false;
    private _style: number = Styles.Big;
    private _cardByte: number;
    private _card: Card;
    private _isPopup: boolean;
    private _isSelected: boolean;

    public set isLord(bool: boolean) {
        this.lordIcon.active = bool;
    }
    public get style(): number {
        return this._style
    }
    public set style(value: number) {
        this._style = value
        this.updateStyle(value);
    }

    public get isReverse(): boolean {
        return this._isReverse
    }
    public set isReverse(value: boolean) {
        this._isReverse = value
        this.updateReverse(value);
    }

    public get popupOffset(): number {
        return this._popupOffset
    }
    public set popupOffset(value: number) {
        this._popupOffset = value
    }

    public get cardByte(): number {
        return this._cardByte
    }
    public set cardByte(value: number) {
        this._cardByte = value
        this.updateCardView(value)
    }

    public get card(): Card {
        return this._card
    }
    public set card(value: number) {
        this._card = new Card(value)
    }

    public get cardColor(): number | null {
        return this._card && this._card.color
    }

    public get cardValue(): number | null {
        return this._card && this._card.value
    }
    
    public set isSelected(isSelect: boolean) {
        if (this._isSelected != isSelect) {
            this._isSelected = isSelect;
            let color = new Color(isSelect ? '#636363' : '#FFFFFF');
            NodeUtil.setSpriteColor(this.node, color, true);
        }
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    set isPopup(isPopup: boolean) {
        if (this._isPopup != isPopup) {
            this._isPopup = isPopup
        }
    }

    get isPopup(): boolean {
        return this._isPopup;
    }

    reuse(args: CardViewData[]) {
        this.resetView();
        let data = args[0];
        this.myScale = data.scale || 1;
        this._cardByte = data.cardByte;
        this._isReverse = data.isReverse;
        this._style = data.style || Styles.Big;
        this.node.active = true;
        this.updateStyle();
        // console.log('==reuse==', data);
    }

    unuse() {
        this.node.active = false;
        this.resetView();
    }

    resetView() {
        Tween.stopAllByTarget(this.node);
        this._isPopup = false;
        this.isSelected = false;
        this.lordIcon.active = false;
        this.backNode.active = false;
        this.jokerNode.node.active = false;
        this.smallView.node.active = false;
        this.node.scale = new Vec3(1,1);
        this.node.setPosition(new Vec3(0,0));
        this.node.getComponent(UIOpacity).opacity = 255;
    }

    updateSmallCardView() {
        let imgName = this.isReverse ? 'normal_small_back' : `card_${this.cardColor + 1}_${this.cardValue}`;
        let imgPath = `room@module/card/res/smallCard/${imgName}`;
        this.smallView.node.active = true
        this.smallView.spriteFrame = imgPath;
    }

    updateBigCardView() {
        const isJoker = this.cardByte == 0x4e || this.cardByte == 0x4f
        this.valueNode.active = !isJoker;
        this.jokerNode.node.active = isJoker;
        // Log.d('==updateBigCardView==', isJoker, this.cardByte, this.cardValue, this.cardColor);
        
        if (isJoker) {//处理大小王
            const cardByteImg = CardImgConfig[this.cardByte]
            this.cardImg.node.active = !!cardByteImg
            this.cardImg.spriteFrame = cardByteImg && `room@module/card/res/bigCard/${cardByteImg}`;
            this.jokerNode.spriteFrame = `room@module/card/res/bigCard/${CardValueColorConfig[this.cardByte]}`;
        } else {
            const colorImg = CardValueColorConfig[this.cardColor]
            if (colorImg) {
                let cValue = this.cardValue + colorImg;
                let cColor = CardColorConfig[this.cardColor];
                this.cValue.spriteFrame = `room@module/card/res/bigCard/${cValue}`;
                this.cColor.spriteFrame = `room@module/card/res/bigCard/${cColor}`;
            }
            const isBigValue: boolean = this.cardValue >= 11 && this.cardValue <= 13
            this.cardImg.spriteFrame = isBigValue ? `room@module/card/res/bigCard/${this.cardValue}_${colorImg}` : `room@module/card/res/bigCard/${CardImgConfig[this.cardColor]}`;
        }
    }

    updateStyle(style: number = this._style) {
        this.node.getComponent(UITransform).anchorPoint = new Vec2(0.5, 0.5);
        this.bigView.active = style != Styles.Small;
        this.smallView.node.active = style == Styles.Small;
        this.updateCardView();
        this.updateReverse();
        this.setCardScale();
    }

    updateCardView(cardByte: number = this._cardByte) {
        this._card = new Card(cardByte);
        if (this._style == Styles.Small) {
            let size: Size = this.smallView.getComponent(UITransform).contentSize;
            this.node.getComponent(UITransform).setContentSize(size);
            this.updateSmallCardView()
        } else {
            let size: Size = this.backNode.getComponent(UITransform).contentSize;
            this.node.getComponent(UITransform).setContentSize(size)
            this.updateBigCardView()
        }
    }

    updateReverse(isReverse: boolean = this._isReverse) {
        if (this._style == Styles.Small) {
            this.updateSmallCardView()
        } else {
            this.backNode.active = isReverse
            this.frontNode.active = !isReverse
            this.backNode.getComponent(BundleSprite).spriteFrame = isReverse && 'room@module/card/res/bigCard/normal_big_back';
        }
    }

    setCardScale(scale: number = this.myScale) {
        let size: Size;
        this.myScale = scale;
        // Log.d('==setCardScale==', this.myScale, scale);
        if (this._style == Styles.Small) {
            size = this.smallView.getComponent(UITransform).contentSize;
        } else {
            size = this.backNode.getComponent(UITransform).contentSize;
        }
        this.node.getComponent(UITransform).setContentSize(new Size(size.width * scale, size.height * scale));
        this.content.scale = new Vec3(scale, scale, scale);
    }

    getCardRealSize(): Array<number> {
        let contentSize = this.node.addComponent(UITransform).contentSize
        return [contentSize.width * this.node.scale.x, contentSize.height * this.node.scale.y];
    }



    onClick_cardView() {
        Log.d("==onClick_cardView==")
    }

    update(deltaTime: number) {

    }

    // unuse() {
    //     this.recycle();
    // }

    // reuse() {
        
    // }
}