import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { User } from 'app/domain/user/User';

@ccclass('OutItem')
export class OutItem extends XComponent {
    @property(Label)
    nameLabel : Label

    updateView(user : User) {
        this.nameLabel.string = user.nickname
    }
}