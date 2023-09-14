import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import {IShippingAddr} from 'idl/tss/hall/userinfo.v1';
@ccclass('Address')
export class Address extends XComponent {
    @property(Label)
    addressLab:Label = null!;

    @property(Label)
    detailLab:Label = null!;

    @property(Label)
    nameAndPhone:Label = null!;

    @property(Node)
    defaultFlag:Node = null!;

    addrInfo:IShippingAddr = null;

    init(addr:IShippingAddr){
        this.addrInfo = addr;
        this.addressLab.string = `${addr.province}${addr.city}${addr.region}`;
        this.defaultFlag.active = addr.default == 1;
        this.detailLab.string = addr.addr
        this.nameAndPhone.string = `${addr.receiver}    ${addr.contactNumber}`
    }

    getAddrInfo() {
        return this.addrInfo;
    }
}