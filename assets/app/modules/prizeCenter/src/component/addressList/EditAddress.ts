import { _decorator, Component, Node,EditBox,Toggle } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Log, NodeUtil, uiMgr } from 'bos/exports';
import { PrizeApp } from '../../../PrizeApp';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import { App } from 'app/App';
import * as UserinfoPKG  from 'idl/tss/hall/userinfo.v1';
import { Contacts } from "platform/exports";
@ccclass('EditAddress')
export class EditAddress extends XComponent {
    @property(EditBox)
    receiverBox:EditBox = null!;

    @property(EditBox)
    contactBox:EditBox = null!;

    @property(EditBox)
    provinceBox:EditBox = null!;

    @property(EditBox)
    cityBox:EditBox = null!;

    @property(EditBox)
    regionBox:EditBox = null!;

    @property(EditBox)
    addrBox:EditBox = null!;

    @property(Toggle )
    defaultBox:Toggle = null!;

    private _mainNode:Node = null!;
    private _updateMode = false;
    private _updateAddr:UserinfoPKG.ShippingAddr = null;
    setup(params){
        Log.w("PreOrderList",params)
        this._mainNode = params?.mainNode;
        if ((params?.isUpdate) && params.updateAddr){
            this._updateMode = true;
            this._updateAddr = params.updateAddr;
            this.loadView(params.updateAddr); 
        }else{
            this._updateMode = false;
        }
    }

    loadView(addr:UserinfoPKG.ShippingAddr){
        this.receiverBox.string = addr.receiver;
        this.contactBox.string = addr.contactNumber;
        this.provinceBox.string = addr.province;
        this.cityBox.string = addr.city;

        this.regionBox.string = addr.region;
        this.addrBox.string = addr.addr;
        this.defaultBox.isChecked = addr.default == 1;
    }

    async sendCreateAddr(req:UserinfoPKG.ICreateShippingAddrReq){
        this.promiseOne(PrizeApp.PrizeMgr.createShippingAddr(req)).then((resp:UserinfoPKG.ICreateShippingAddrResp) => {
            if (this._mainNode) {
                NodeUtil.sendMessage(this._mainNode,'updateView');
            }
            uiMgr.popPage();
        })
    }

    async sendUpdateAddr(req:UserinfoPKG.IUpdateShippingAddrReq){
        this.promiseOne(PrizeApp.PrizeMgr.updateShippingAddr(req)).then((resp:UserinfoPKG.IUpdateShippingAddrResp) => {
            if (this._mainNode) {
                NodeUtil.sendMessage(this._mainNode,'updateView');
            }
            uiMgr.popPage();
        })
    }

    onClickSave(){
        let receiver = this.receiverBox.string;
        let contact= this.contactBox.string;
        let province = this.provinceBox.string;
        let city = this.cityBox.string;
        let region = this.regionBox.string;
        let addr = this.addrBox.string;
        let isChecked = this.defaultBox.isChecked;
        Log.w(`${receiver} ${contact}  ${province} ${city} ${addr} ${isChecked}`);
        if ((receiver === '') || (contact === '')||(province === '')||(city === '')||(region === '')||(addr === '')) {
            uiMgr.showToast('地址信息缺少');
            return ;
        }
        if(this._updateMode){
            let req:UserinfoPKG.IUpdateShippingAddrReq = {
                info:{
                    ID:this._updateAddr.ID,
                    UID:App.userMgr.loginUid,
                    receiver:receiver,
                    contactNumber:contact,
                    province:province ,
                    city:city,
                    region:region,
                    addr:addr,
                    default:isChecked?1:0, 
                },
                updateMask:{paths:["receiver","contactNumber","province","city","region","addr","default"]}
            }
            this.sendUpdateAddr(req);
        }else{
            let req:UserinfoPKG.ICreateShippingAddrReq = {
                info:{
                    ID:'0',
                    UID:App.userMgr.loginUid,
                    receiver:receiver,
                    contactNumber:contact,
                    province:province + '省',
                    city:city + '市',
                    region:region + '区',
                    addr:addr,
                    default:isChecked?1:0,      
                }
            };
            this.sendCreateAddr(req);
        }
    }

    onClickContacts(){
        Contacts.selectContact((status :number,phoneNumber :String) => {
            if (status == Contacts.SELECT_SUCCESS){
                
            }
         });
    }
}