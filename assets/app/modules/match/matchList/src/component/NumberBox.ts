import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EditBox } from 'cc';
import { Label } from 'cc';
import { resLoader, uiMgr } from 'bos/exports';
import { MatchApi } from 'app/domain/match/api/MatchApi';
import { Prefab } from 'cc';
import { App } from 'app/App';
import { isValid } from 'cc';
import { Utils } from 'app/utils/Utils';

@ccclass('NumberBox')
export class NumberBox extends XComponent {

    @property(EditBox)
    editBox : EditBox

    @property([Label])
    labels : Label[] = []

    @property(Label)
    tipsLabel : Label

    setup(){

    }
    
    @Utils.background()
    onLoad(){
        this.editBox.node.on("text-changed", this.onTextChange, this);
        this.tipsLabel.node.active = false
    }

    protected start(): void {
        this.editBox.focus()
    }

    onTextChange(){
        let text = this.editBox.textLabel.string
        console.debug("onTextChange", text)
        if (text) {
            let str1 = text.substring(0, 1);
            let str2 = text.substring(1, 2);
            let str3 = text.substring(2, 3);
            let str4 = text.substring(3, 4);
            let str5 = text.substring(4, 5);
            let str6 = text.substring(5, 6);

            this.labels[0].string = str1 ?? ""
            this.labels[1].string = str2 ?? ""
            this.labels[2].string = str3 ?? ""
            this.labels[3].string = str4 ?? ""
            this.labels[4].string = str5 ?? ""
            this.labels[5].string = str6 ?? ""
        }

        if (text.length >= 6) {
            this.enterRoom()
        }

        this.tipsLabel.node.active = false
    }

    async enterRoom(){
        let roomNo = this.editBox.textLabel.string
        let matchInfo = await MatchApi.getMatchByRoomNo(roomNo)
        if (matchInfo) {
            let loadPromise = new Promise<Prefab>((resolve, reject)=>{
                resLoader.loadPrefab("match@officialMatch/res/prefab/ChatRoom", (err, prefab : Prefab)=>{
                    if (!err) {
                        resolve(prefab)
                    } else {
                        reject(err)
                    }
                })
            })
    
            let preMatchKey = matchInfo.getPreMatchKey()
            let schedulerID = matchInfo.getSchedulerID()
            uiMgr.showLoading()
            Promise.all([loadPromise, App.matchMgr.join({preMatchKey : preMatchKey, schedulerID : schedulerID})]).then((data)=>{
                uiMgr.hideLoading()
            
                let prefab = data[0]
                let matchHandler = data[1]
                if (matchHandler && prefab) {
                    uiMgr.pushPage(prefab, {params : {preMatchKey : preMatchKey, handler : matchHandler}})
                } else {
                    console.error("进入比赛失败", data)
                    uiMgr.showToast("进入比赛失败")
                }

                if (isValid(this.node)) {
                    uiMgr.removePopup(this.node)
                }
           })
        } else {
            this.tipsLabel.node.active = true
        }
    }

    onClose(){
        uiMgr.removePopup(this.node)
    }
}