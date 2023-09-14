import { _decorator, Component, Node ,Prefab,ScrollView,instantiate} from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { PrizeApp } from '../../../PrizeApp';
import { Log, NodeUtil, uiMgr } from 'bos/exports';
import { AddressItem } from './AddressItem';
import { UIMgr } from 'bos/framework/gui/UIMgr';
import {IShippingAddr, ListShippingAddrResp} from 'idl/tss/hall/userinfo.v1';
import { Label } from 'cc';
import { Color } from 'cc';
@ccclass('AddressList')
export class AddressList extends XComponent {
    @property(ScrollView)
    scrollView: ScrollView = null!;

    @property(Prefab)
    item:Prefab = null!;

    @property(Label)
    optLabel:Label = null!;

    
    @property(Label)
    navLabel:Label = null!;

    private _delegateNode:Node = null!;
    private _selectId = '';
    private _optTag = '';
    private _addrList:Array<IShippingAddr> = [];

    onLoad() {
        
    }

    setup(params){
        Log.w("AddressList",params)
        this._delegateNode = params?.delegateNode;
        this._optTag = params?.opt;
        this._selectId = params?.defaultId ?? '';
        Log.w("_optTag _selectId",this._optTag,this._selectId);
        if(this._optTag === 'select'){
            this.navLabel.string = "修改地址";
            this.optLabel.node.active = true;
        }
        this.updateList();
    }

    updateView(){
        this.updateList();
    }

    updateList() {
        this._addrList = [];
        this.promiseOne(PrizeApp.PrizeMgr.getListAddress({page:1,pageSize:30})).then((resp:ListShippingAddrResp) => {
            this.scrollView.content!.removeAllChildren();
            for (let i = 0; i < resp.infos.length; ++i) {
                this._addrList.push(resp.infos[i]);
                let item = instantiate(this.item);
                this.scrollView.content!.addChild(item);
                (item.getComponent(AddressItem) as AddressItem)!.init(resp.infos[i],this,this._optTag);
            }
            if(this._optTag === 'select'){
                this.updateItemSelect();
            }
        })
    }

    onEventChange(id:string){
        this._selectId = id;
        this.updateItemSelect();
        this.optLabel.color = new Color(16,255,241,255)//rgba(16, 255, 241, 1)
    }

    updateItemSelect(){
        if(this._selectId == '')return;
        this.scrollView.content.children.forEach((child)=>{
            NodeUtil.sendMessage(child,'selectOn',this._selectId)
        })
    }

    onClickSave() {
        if (this._delegateNode) {
            this._addrList.forEach((addr)=>{
                if (addr.ID === this._selectId){
                    NodeUtil.sendMessage(this._delegateNode,'updateAddress',addr);
                }
            })
        }
        uiMgr.popPage();  
    }

    onClickAdd() {
        uiMgr.loadPage('prizeCenter@res/prefab/addressList/EditAddress',{params:{mainNode:this.node}});
    }
}