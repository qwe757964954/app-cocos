import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import { IAddress} from 'idl/tss/hall/common/prizemall';

@ccclass('PickAddress')
export class PickAddress extends XComponent {
    @property(Label)
    nameLab:Label = null!;

    @property(Label)
    addrLab:Label = null!;

    @property(Label)
    phoneLab:Label = null!;

    private _addr:IAddress= null!;

    init(addr:IAddress){ 
        this._addr = addr;
        this.nameLab.string = addr.receiver,
        this.addrLab.string = `${addr.province}${addr.city}${addr.region}${addr.addr}`;
        this.phoneLab.string = addr.contactNumber;
    }

    get addr(){return this._addr};
}