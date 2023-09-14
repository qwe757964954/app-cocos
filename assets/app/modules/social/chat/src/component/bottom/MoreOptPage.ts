import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { eventSystem, Log, resLoader, uiMgr } from 'bos/exports';

@ccclass('MoreOptPage')
export class MoreOptPage extends XComponent {
    start() {

    }

    update(deltaTime: number) {

    }

    onOptBtnClick(event: Event, customEventData: string) {
        let opt = parseInt(customEventData)
        switch (opt) {
            case 1:
                this.sendPicture()
                break;
            case 2:
                this.unSupport()
                break;
            case 3:
                this.sendReward()
                break;
            case 4:
                this.unSupport()
                break;
            case 5:
                this.unSupport()
                break;
            case 6:
                this.sendDice()
                break;
            case 7:
                this.sendCard()
                break;
            default:
                this.unSupport()
                break;
        }
    }

    sendPicture() {
        eventSystem.emit("ChatSelectPicture")
    }

    sendReward() {
        resLoader.loadPrefab("social@chat/res/prefab/chatCell/donate/DonateDialog", (err, prefab) => {
            if (err) {
                Log.e(err)
                return
            }
            uiMgr.pushPopup(prefab)
        })
    }

    sendDice() {
        eventSystem.emit("ChatSendDice")
    }

    sendCard() {
        eventSystem.emit("ChatSelectCard")
    }
    
    unSupport() {
        uiMgr.showToast("暂不支持")
    }

}