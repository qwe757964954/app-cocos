import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, uiMgr } from 'bos/exports';
import { PrizeApp } from '../../../PrizeApp';
import {AddressList}  from './AddressList';
import {ShippingAddr} from 'idl/tss/hall/userinfo.v1';
@ccclass('AddressItem')
export class AddressItem extends XComponent {

    @property(Label)
    receiver:Label = null!;

    @property(Label)
    contactNumber:Label = null!;

    @property(Label)
    address:Label = null!;

    @property(Node)
    default:Node = null!;

    @property(Node)
    selectView:Node = null!;

    @property(Node)
    delBtn:Node = null!;

    @property(Node)
    editBtn:Node = null!;

    addr:ShippingAddr = null;
    delegate:XComponent = null!;

    private _opt = '';

    init(addr:ShippingAddr,delegate:XComponent,opt:string) {
        this.addr = addr;
        this.delegate = delegate;
        this.receiver.string = addr.receiver;
        this.contactNumber.string = addr.contactNumber;
        this.address.string = `${addr.province}${addr.city}${addr.region}${addr.addr}`;
        this.default.active = addr.default == 1;
        this.delBtn.active = (opt !='select');
        this._opt = opt;
    }

    selectOn(id:string){
        this.selectView.active = this.addr.ID === id;
    }

    onClickDel() {
        this.promiseOne(PrizeApp.PrizeMgr.deleteShippingAddr({ID:this.addr.ID})).then((result) => {
            //更新UI
            if (result) {
                (this.delegate as AddressList)!.updateList();
            }
        })   
    }

    onClickEdit() {
        uiMgr.loadPage('prizeCenter@res/prefab/addressList/EditAddress',{params:{
            mainNode:this.delegate.node,
            updateAddr:this.addr,
            isUpdate:true,
        }});
    }

    onClickSelect(){
        if (this._opt === 'select'){
            (this.delegate as AddressList)!.onEventChange(this.addr.ID);
        }
    }
}