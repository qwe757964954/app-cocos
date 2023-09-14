import { _decorator, Component, Node,Label,Sprite} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { ISupplier,ISearchSupplierView} from 'idl/tss/hall/prizesupplier.v1';
import { PickUpAddressList } from './PickUpAddressList';
import { Utils } from 'app/utils/Utils';

@ccclass('PickUpItem')
export class PickUpItem extends XComponent {
    @property(Sprite)
    checkBox:Sprite = null!;

    @property(Label)
    nameLab:Label = null!;

    @property(Label)
    addrLab:Label = null!;

    @property(Label)
    phoneLab:Label = null!;

    private _supplierView :ISearchSupplierView = null;
    private _on = false;
    private _mainUI:PickUpAddressList = null!;

    get supplierID(){
        return this._supplierView.supplier.ID;
    }
    get supplier(){
        return this._supplierView.supplier;
    }

    updateView(supplierView:ISearchSupplierView,mainUI:PickUpAddressList){
        this._supplierView= supplierView;
        this._mainUI = mainUI;
        let addr = supplierView.supplier.addr;
        this.nameLab.string = addr.receiver;
        this.addrLab.string = `${addr.province}${addr.city}${addr.region}${addr.addr}`;
        this.phoneLab.string = addr.contactNumber;
    }

    updateSelect(on:boolean){
        this._on = on;
        let path = on ? 'common/button/Res_ResApp_Com_Btn_Checkbox_2':'common/button/Res_ResApp_Com_Btn_Checkbox_01';
        Utils.loadSpriteFromResources(this.checkBox, path);
    }

    onClickSelect() {
        if (this._on) return;
        this._mainUI.onEventChangeSupplier(this.supplier);
    }

}