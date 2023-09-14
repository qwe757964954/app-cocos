import { _decorator, Component, Node, Prefab, Button, Label, Color } from 'cc';
import { uiMgr, StorageUtil, Decorator } from 'bos/exports';
import { PopUp } from './PopUp';
const { ccclass, property, menu } = _decorator;

@ccclass('PermissionsSetting')
@menu('setting/PermissionsSetting')
export class PermissionsSetting extends Component {

    @property({ type: Prefab })
    popUp: Prefab | null = null

    @property({ type: Button })
    button1: Button | null = null

    @property({ type: Button })
    button2: Button | null = null

    @property({ type: Button })
    button3: Button | null = null

    @property({ type: Button })
    button4: Button | null = null

    @property({ type: Button })
    button5: Button | null = null

    @property({ type: Button })
    button6: Button | null = null

    @property({ type: Button })
    button7: Button | null = null

    permissionsList = [
        {
            name: '存储权限',
            description: '我们访问您的存储空间是为了向您提供保存图片，分享图片功能，请允许使用存储功能权限。'
        },
        {
            name: '电话权限',
            description: '我们访问您的手机状态是为了方便了解您设备的本机识别权限，请允许使用查看电话权限。'
        },
        {
            name: '位置权限',
            description: '我们访问您的位置信息是为了向您提供好友模块中附近的人的定位功能，请允许使用访问位置权限。'
        },
        {
            name: '麦克风权限',
            description: '我们访问您的麦克风是为了向您提供聊天语音发送功能，请允许使用访问麦克风权限。'
        },
        {
            name: '相机权限',
            description: '当前功能需要您开启相机权限，若关闭则无法使用该功能。'
        },
        {
            name: '通知权限',
            description: '当前功能需要您开启通讯录权限，若关闭则无法使用该功能。'
        },
        {
            name: '日历权限',
            description: '当前功能需要您开启日历权限，若关闭则无法使用该功能。'
        },
    ]

    cancelCallBack = () => {
        uiMgr.showToast('没有获得权限哦！请到系统设置修改游戏的权限吧！')
    }

    start() {
    }

    //初始化要从系统获取权限状态，更新按钮状态
    protected onEnable(): void {
        this.updateButtonStatus()
    }

    openStoragePermission() {
        if (this.popUp) {
            const storagePermissionBox = uiMgr.pushPopup(this.popUp)
            let popUp = storagePermissionBox.getComponent(PopUp)
            popUp.titleLabel.string = `权限申请`
            popUp.contentLabel.string = this.permissionsList[0].description
            popUp.confirmLabel.string = '立即开启'
            popUp.cancelLabel.string = '暂时不了'
            popUp.confirmCallBack = () => {
                this.updateButtonStatus()
                //缺少回调
            }
            popUp.cancelCallBack = this.cancelCallBack
            popUp.updatePopUpWithButtonsSize()
        }
    }

    openTelephonePermission() {
        if (this.popUp) {
            const telephonePermissionBox = uiMgr.pushPopup(this.popUp)
            let popUp = telephonePermissionBox.getComponent(PopUp)
            popUp.titleLabel.string = `权限申请`
            popUp.contentLabel.string = this.permissionsList[1].description
            popUp.confirmLabel.string = '立即开启'
            popUp.cancelLabel.string = '暂时不了'
            popUp.confirmCallBack = () => {
                this.updateButtonStatus()
                //缺少回调
            }
            popUp.cancelCallBack = this.cancelCallBack
            popUp.updatePopUpWithButtonsSize()
        }
    }

    openLocationPermission() {
        if (this.popUp) {
            const locationPermissionBox = uiMgr.pushPopup(this.popUp)
            let popUp = locationPermissionBox.getComponent(PopUp)
            popUp.titleLabel.string = `权限申请`
            popUp.contentLabel.string = this.permissionsList[2].description
            popUp.confirmLabel.string = '立即开启'
            popUp.cancelLabel.string = '暂时不了'
            popUp.confirmCallBack = () => {
                this.updateButtonStatus()
                //缺少回调
            }
            popUp.cancelCallBack = this.cancelCallBack
            popUp.updatePopUpWithButtonsSize()
        }
    }

    openMicrophonePermission() {
        if (this.popUp) {
            const microphonePermissionBox = uiMgr.pushPopup(this.popUp)
            let popUp = microphonePermissionBox.getComponent(PopUp)
            popUp.titleLabel.string = `权限申请`
            popUp.contentLabel.string = this.permissionsList[3].description
            popUp.confirmLabel.string = '立即开启'
            popUp.cancelLabel.string = '暂时不了'
            popUp.confirmCallBack = () => {
                this.updateButtonStatus()
                //缺少回调
            }
            popUp.cancelCallBack = this.cancelCallBack
            popUp.updatePopUpWithButtonsSize()
        }
    }

    openCameraPermission() {
        if (this.popUp) {
            const cameraPermissionBox = uiMgr.pushPopup(this.popUp)
            let popUp = cameraPermissionBox.getComponent(PopUp)
            popUp.titleLabel.string = `权限申请`
            popUp.contentLabel.string = this.permissionsList[4].description
            popUp.confirmLabel.string = '立即开启'
            popUp.cancelLabel.string = '暂时不了'
            popUp.confirmCallBack = () => {
                this.updateButtonStatus()
                //缺少回调
            }
            popUp.cancelCallBack = this.cancelCallBack
            popUp.updatePopUpWithButtonsSize()
        }
    }

    openAddressBookPermission() {
        if (this.popUp) {
            const addressBookPermissionBox = uiMgr.pushPopup(this.popUp)
            let popUp = addressBookPermissionBox.getComponent(PopUp)
            popUp.titleLabel.string = `权限申请`
            popUp.contentLabel.string = this.permissionsList[5].description
            popUp.confirmLabel.string = '立即开启'
            popUp.cancelLabel.string = '暂时不了'
            popUp.confirmCallBack = () => {
                this.updateButtonStatus()
                //缺少回调
            }
            popUp.cancelCallBack = this.cancelCallBack
            popUp.updatePopUpWithButtonsSize()
        }
    }

    openCalendarPermission() {
        if (this.popUp) {
            const calendarPermissionBox = uiMgr.pushPopup(this.popUp)
            let popUp = calendarPermissionBox.getComponent(PopUp)
            popUp.titleLabel.string = `权限申请`
            popUp.contentLabel.string = this.permissionsList[6].description
            popUp.confirmLabel.string = '立即开启'
            popUp.cancelLabel.string = '暂时不了'
            popUp.confirmCallBack = () => {
                this.updateButtonStatus()
                //缺少回调
            }
            popUp.cancelCallBack = this.cancelCallBack
            popUp.updatePopUpWithButtonsSize()
        }
    }

    updateButtonStatus() {
        let status1 = StorageUtil.get('storagePermissionStatus')//获取权限状态
        if (status1) {
            this.button1.node.getComponent(Button).interactable = false
            let label = this.button1.node.getChildByName('Label').getComponent(Label)
            label.string = '已开启'
            label.color = new Color(255, 153, 83)
            this.button1.node.getChildByName('>').active = false
        }
        let status2 = StorageUtil.get('telephonePermissionStatus')
        if (status2) {
            this.button2.node.getComponent(Button).interactable = false
            let label = this.button2.node.getChildByName('Label').getComponent(Label)
            label.string = '已开启'
            label.color = new Color(255, 153, 83)
            this.button2.node.getChildByName('>').active = false
        }
        let status3 = StorageUtil.get('locationPermissionStatus')
        if (status3) {
            this.button3.node.getComponent(Button).interactable = false
            let label = this.button3.node.getChildByName('Label').getComponent(Label)
            label.string = '已开启'
            label.color = new Color(255, 153, 83)
            this.button3.node.getChildByName('>').active = false
        }
        let status4 = StorageUtil.get('microphonePermissionStatus')
        if (status4) {
            this.button4.node.getComponent(Button).interactable = false
            let label = this.button4.node.getChildByName('Label').getComponent(Label)
            label.string = '已开启'
            label.color = new Color(255, 153, 83)
            this.button4.node.getChildByName('>').active = false
        }
        let status5 = StorageUtil.get('cameraPermissionStatus')
        if (status5) {
            this.button5.node.getComponent(Button).interactable = false
            let label = this.button5.node.getChildByName('Label').getComponent(Label)
            label.string = '已开启'
            label.color = new Color(255, 153, 83)
            this.button5.node.getChildByName('>').active = false
        }
        let status6 = StorageUtil.get('addressBookPermissionStatus')
        if (status6) {
            this.button6.node.getComponent(Button).interactable = false
            let label = this.button6.node.getChildByName('Label').getComponent(Label)
            label.string = '已开启'
            label.color = new Color(255, 153, 83)
            this.button6.node.getChildByName('>').active = false
        }
        let status7 = StorageUtil.get('calendarPermissionStatus')
        if (status7) {
            this.button7.node.getComponent(Button).interactable = false
            let label = this.button7.node.getChildByName('Label').getComponent(Label)
            label.string = '已开启'
            label.color = new Color(255, 153, 83)
            this.button7.node.getChildByName('>').active = false
        }
    }

    closePopUp() {
        uiMgr.popPopup()
    }
}


