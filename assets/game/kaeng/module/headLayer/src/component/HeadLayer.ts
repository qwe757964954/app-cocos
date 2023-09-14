import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UserInfo } from './UserInfo';



@ccclass('KaengHeadLayer')
export class HeadLayer extends XComponent {


    @property(UserInfo)
    public userInfos: UserInfo[] = [];

    start() {
        for(let i = 0; i < this.userInfos.length; i++) {
            let v = this.userInfos[i];
            if (v && v.isValid) {
                v.bindPlayerBySeat(i + 1);
            }
        }
    }

    onDisable() {
        for(let i = 0; i < this.userInfos.length; i++) {
            let v = this.userInfos[i];
            if (v && v.isValid) {
                v.unbindPlayer();
            }
        }
    }


}