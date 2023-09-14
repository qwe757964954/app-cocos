import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { ContactsConfigItem } from '../ContactsViewCtr';
import { eventSystem } from 'bos/exports';
import { SpriteFrame } from 'cc';
import { Sprite } from 'cc';
import { SocialRedPoint } from 'app/modules/social/common/src/SocialRedPoint';

@ccclass('FunctionCellCtr')
export class FunctionCellCtr extends XComponent {
    @property(SpriteFrame)
    iconBgSpriteFrames: SpriteFrame[] = []

    @property(SpriteFrame)
    iconSpriteFrames: SpriteFrame[] = []

    @property(Sprite)
    iconBg: Sprite = null

    @property(Sprite)
    icon: Sprite = null

    @property(Label)
    functionDesc: Label;

    @property(Node)
    redPoint: Node

    private config: ContactsConfigItem = null;

    updateView(config: ContactsConfigItem) {
        console.log("FunctionCellCtr:updateView-->", config)
        this.config = config
        this.functionDesc.string = config.funcDesc

        let index = 0
        if (config.key === "newFriend") {
            index = 1
        } else if (config.key === "blackList") {
            index = 0
        }

        this.icon.spriteFrame = this.iconSpriteFrames[index]
        this.iconBg.spriteFrame = this.iconBgSpriteFrames[index]
    }

    onClick() {
        console.log("FunctionCellCtr:Click")
        eventSystem.emit(this.config.event)
    }


    onEnable(): void {
        SocialRedPoint.getContactsRedPoint().then(result => {
            if (this.node.isValid) {
                this.redPoint.active = result
            }
        })
    }
}