import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { UploadImg } from './UploadImg';
import { Log } from 'bos/exports';
import { OSS } from 'qsdk/exports';
const IMG_COUNT = 3;
@ccclass('SelectImgLayout')
export class SelectImgLayout extends XComponent {
    
    private _images = [];

    get IsUpload():boolean{
        return this._images.length > 0
    }

    onDestroy(): void {
        this._images.forEach((file)=>{
            file.destroy()
        })
    }

    async uploadImgTask(){
        if (this._images.length == 0){
            return [];
        }
        let taskArr = [];
        this._images.forEach((file)=>{
            let promise = OSS.getInstance().uploadFile(file, { prefix: "prize_" })
            taskArr.push(promise);
        })
        const values = await this.promiseAll(taskArr);
        Log.w(" uploadImgTask values",values);
        let urls = [];
        values.forEach(element => {
            if(element.err) return undefined;
            urls.push(element.url);
        });
        return urls;
    }
    

    onLoad(): void {
        for (let i = 0; i < IMG_COUNT; i++) {
            let item = this.node.getChildByName(`UploadImg${i}`);
            item.getComponent(UploadImg).delegate = this;
            item.getComponent(UploadImg)!.initIndex(i);
        }
        this.refreshPic();
    }

    onEventSelectPic(filePath){
        this._images.push(filePath);
        this.refreshPic();
    }

    onEventDelPic(index:number){
        this._images.splice(index, 1);//删除之前的
        Log.w("onEventDelPic",this._images);
        this.refreshPic();
    }

    resetSpriteFrame(){
        for(let i = 0;i < this._images.length;i++){
            let item = this.getItemByItem(i);
            item.getComponent(UploadImg)!.setSpriteFrame(this._images[i]);
        }
    }

    getItemByItem(index:number){
        return this.node.getChildByName(`UploadImg${index}`);
    }

    refreshPic(){
        let num = this._images.length;
        if (num == 0){
            let item0 = this.getItemByItem(0);
            item0.active = true;
            item0.getComponent(UploadImg)!.setResetGUI();
            this.getItemByItem(1).active = false;
            this.getItemByItem(2).active = false;
            return
        }
        let next = num + 1;
        for (let i = 0; i < IMG_COUNT; i++) {
            let item = this.node.getChildByName(`UploadImg${i}`);
            item.active = i < next;
            if (i == num){
                item.getComponent(UploadImg)!.setAddGUI(num);
            }
            if (this._images[i]){
                item.getComponent(UploadImg)!.setSpriteFrame(this._images[i]);
            }
        }
    }

}