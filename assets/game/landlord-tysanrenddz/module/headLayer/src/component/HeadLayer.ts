import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UserInfo } from './UserInfo';
import { Sprite } from 'cc';
import { Label } from 'cc';
import { Room } from 'game/pdk/Room';
import { Table } from 'idl/tss/game/table.v2';
import { ExtendTable } from 'idl/tss/pdk/extendtable.v3';



@ccclass('HeadLayer')
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
x
    onDisable() {
        for(let i = 0; i < this.userInfos.length; i++) {
            let v = this.userInfos[i];
            if (v && v.isValid) {
                v.unbindPlayer();
            }
        }
    }


}