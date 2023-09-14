import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { SpriteFrame } from 'cc';

@ccclass('Navigation')
export class Navigation extends XComponent {
    @property(Sprite)
    extraSprite : Sprite

    @property(Label)
    matchNameLabel : Label

    @property(SpriteFrame)
    helpSpriteFrame : SpriteFrame

    @property(SpriteFrame)
    shareSpriteFrame : SpriteFrame
}