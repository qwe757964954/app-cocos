import { _decorator, Component, Node,instantiate } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EditBox } from 'cc';
import { PrizeApp } from '../../../PrizeApp';
import { Prefab } from 'cc';
import { Log, NodeUtil, uiMgr } from 'bos/exports';
import { StorageUtil } from 'bos/utils/StorageUtil'

const recordKey = 'SEARCH_RECORD'
const MAX_RECORD_NUM = 20
@ccclass('SearchPrize')
export class SearchPrize extends XComponent {
    @property(EditBox)
    searchEdit:EditBox = null!;

    @property(Prefab)
    item:Prefab = null!;

    @property(Node)
    resultPanel:Node = null!;

    @property(Prefab)
    recordItem:Prefab = null!;

    @property(Node)
    recordPanel:Node = null!;

    @property(Node)
    recordTitle:Node = null!;

    @property(Node)
    cleanBtn:Node = null!;



    private _records:Array<string> = [];

    readRecord(){
        this._records = StorageUtil.get(recordKey,true) ?? [];
    }
    
    saveRecord(){
        StorageUtil.set(recordKey,this._records);
    }

    addRecord(str:string){
        let repeatIndex:number = -1;
        for(let i = 0;i < this._records.length;i++){
            if (this._records[i] == str){
                repeatIndex = i;
                break;
            }
        }
        if (repeatIndex>=0){
            this._records.splice(repeatIndex, 1);//删除之前的
            this._records.splice(0,0,str);//加到第一个
        }else{
            this._records.splice(0,0,str)
            if (this._records.length > MAX_RECORD_NUM){
                this._records.pop(); 
            }
        }
       
        this.saveRecord();
    }

    onLoad() {
        this.readRecord();
        this.initRecord();
    }

    initRecord(){
        this.recordPanel.removeAllChildren();
        this._records.forEach((record)=>{
            let item = instantiate(this.recordItem);
            this.recordPanel.addChild(item);
            NodeUtil.sendMessage(item,'updateView',record,this);
        })
        this.recordPanel.active = true;
        this.recordTitle.active = true;
        this.cleanBtn.active = this._records.length > 0;
    }

    async searchReq(str:string){
        let resp = await PrizeApp.PrizeMgr.searchSKUByUser({page:1,pageSize:4,name:str});
        this.resultPanel.removeAllChildren();
        this.resultPanel.active = true;
        this.recordPanel.active = false;
        this.recordTitle.active = false;
        resp.sku.forEach((sku)=>{
            let item = instantiate(this.item);
            this.resultPanel.addChild(item);
            NodeUtil.sendMessage(item,'init',sku);
        })
        if (resp.sku.length == 0){
            uiMgr.showToast('没有搜索到相关奖品');
        }
    }

    onEventRecord(str:string){
        this.searchReq(str);
    }

    onEditReturn(){
        let str = this.searchEdit.string;
        if (str.length < 1){
            return
        }
        this.addRecord(str);
        this.searchReq(str);
    }
    //清空结果
    onClickDel(){
        this.searchEdit.blur();
        this.searchEdit.string = '';
        this.initRecord();
        this.resultPanel.removeAllChildren();
        this.resultPanel.active = false;
    }
    
    //清空记录
    onClickClean(){
        this._records = [];
        this.saveRecord();
        this.initRecord();
    }
}