import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SupportType as  SupportTypeEnum } from 'idl/tss/hall/exchangeorder.v7';
import { SupportItem } from './SupportItem';
import { ApplyScales } from './ApplyScales';
import { Log, uiMgr } from 'bos/exports';

@ccclass('SupportType')
export class SupportType extends XComponent {
    @property(Node)
    itemPanel:Node = null!;
    private _supportValue = SupportTypeEnum.SupportTypeUnknown
    private _delegate:ApplyScales = null!;

    setup(params){
        Log.w("SupportType params",params);
        this._delegate = params.delegate;
        this._supportValue = params.defaultType;
        this.updateSupport();
    }

    updateSupport(){
       this.itemPanel.children.forEach((item,index)=>{
            item.getComponent(SupportItem).updateSelect(this._supportValue == index + 1);
       }) 
    }

    onClickSelect(event: Event, tag: string) {
        this._supportValue = parseInt(tag);
        this.updateSupport();
    }


    onClickConfirm() {
        if(this._delegate){
            this._delegate?.onEventSupportType(this._supportValue);
        }
        uiMgr.popPopup();
    }

    onClickClose() {
        uiMgr.popPopup();
    }
}