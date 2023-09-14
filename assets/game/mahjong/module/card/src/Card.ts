import { _decorator, Component, Sprite, UITransform, UIOpacity, Color } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log } from 'bos/exports';
import { BundleSprite } from 'bos/framework/component/BundleSprite';

@ccclass('Card')
export class Card extends XComponent {

    @property(UITransform)
    public card: UITransform | null = null;

    @property(Sprite)
    public bgImg: Sprite;

    @property(Sprite)
    public cardImg: Sprite | null = null;

    propertyInfo = {
        direction: 0,
        style: "hand",
        cardType: 0,
        cardValue: 1,
        scale: 1,
        opacity: 1,
        cardId: 1,
    };

    m_direction = this.propertyInfo.direction;
    m_style = this.propertyInfo.style;
    m_cardType = this.propertyInfo.cardType;
    m_cardValue = this.propertyInfo.cardValue;
    m_scale = this.propertyInfo.scale;
    m_opacity = this.propertyInfo.opacity;
    m_cardId = this.propertyInfo.cardId;


    public setDirection(dir: number) {
        this.m_direction = dir;
        this.updateCard({ direction: dir });
    }

    public getDirection(): number {
        return this.m_direction;
    }

    public setStyle(style: string) {
        this.m_style = style;
        this.updateCard({ style: style });
    }

    public getStyle(): string {
        return this.m_style;
    }

    public setCardType(cardType: number) {
        this.m_cardType = cardType;
        // this.updateCard({ cardType: cardType });
    }

    public getCardType(): number {
        return this.m_cardType;
    }

    public setCardValue(cardValue: number) {
        this.m_cardValue = cardValue;
        // this.updateCard({ cardValue: cardValue });
    }

    public getCardValue(): number {
        return this.m_cardValue;
    }

    public setCardByte(byte: number) {
        this.setCardType(byte >> 4);
        this.setCardValue(byte & 0x0f);
        this.updateValueProps();
    }

    public setCardTByte(tByte: number) {
        this.setCardByte(tByte >> 8);
        this.setCardId(tByte & 0x00ff);
    }

    public getCardByte(): number {
        let byte = this.m_cardType << 4 + this.m_cardValue;
        return byte;
    }

    public getCardTByte(): number {
        let tByte = this.getCardByte() << 8 + (this.m_cardId || 0);
        return tByte;
    }

    public setCardId(cardId: number) {
        this.m_cardId = cardId;
    }

    start() {
        console.log('this.bgImg.....', this.bgImg);
        this.card.setContentSize(this.bgImg.node.getComponent(UITransform).contentSize);
    }

    updateCard(info: any) {
        if (info == null) {
            this.bgImg.node.active = false;
            return;
        }
        this.bgImg.node.active = true;

        // if (info.direction || info.style) {
            // this.updateBgProps();
            // this.updateValueProps();
        // }

        // if (info.cardType || info.cardValue) {
        //     this.updateValueProps();
        // }

        if (info.scale) {
            this.card.node.scale = info.scale;
        }

        if (info.opacity) {
            this.card.getComponent(UIOpacity).opacity = 255 * info.opacity;
        }

        if (info.bgColor) {
            this.bgImg.color = new Color("#FFFFFF");
        }
    }

    updateBgProps() {
        const style = this.getStyle(); // "hand","out","opFront","opBack","hand_back"
        const direction = this.getDirection();

        const directionMap: string[] = [
            "bottom", "right", "top", "left"
        ];

        // let bgFile = directionMap[direction] + "_" + style + "_bg";
        //需要动态改变spriteFrame的节点要绑定BundleSprite组件
        // let sprite = this.bgImg.getComponent(BundleSprite);  
        // if (sprite) {
        // sprite.spriteFrame = "mahjong@res/".concat(bgFile);
        // }
        // this.card.width = this.bgImg.getComponent(UITransform).width;
        // this.card.height = this.bgImg.getComponent(UITransform).height;
    }

    updateValueProps() {
        const directionMap: string[] = [
            "bottom", "right", "top", "left"
        ];

        let style = this.getStyle();
        if (style === "opt_front") {
            style = "opt";
        }

        const cardType = this.getCardType();
        const cardValue = this.getCardValue();
        const direction = this.getDirection();
        let cardFile = directionMap[direction] + "_" + style + "_";
        const value = cardType.toLocaleString().concat(cardValue.toLocaleString());
        cardFile = cardFile.concat("0x").concat(value);
        Log.d("==cardFile==", cardFile);
        let cardSprite = this.cardImg.getComponent(BundleSprite);
        if (cardSprite) {
            cardSprite.spriteFrame = `mahjong@module/card/res/ver/word/${cardFile}`;
        };
    }

    update(deltaTime: number) {

    }
}