import { App } from 'app/App';
import { propMgr } from 'app/domain/props/PropMgr';
import { uiMgr } from 'bos/exports';
import { _decorator, Component, Node, Label, EditBox, Toggle, Button } from 'cc';
import { PropType } from 'idl/tss/common/common_define';
const { ccclass, property } = _decorator;

@ccclass('EditProfile')
export class EditProfile extends Component {

    @property({ type: Toggle })
    maleToggle: Toggle | null = null

    @property({ type: Toggle })
    femaleToggle: Toggle | null = null

    @property({ type: EditBox })
    nickName: EditBox | null = null

    @property({ type: Label })
    propNum: Label | null = null

    @property({ type: Button })
    confirmBtn: Button | null = null

    confirmCallBack: Function = null

    changeGender: Function = null

    User = App.userMgr.loginUser

    async start() {
        let num = await this.getPropNum()
        if (num == 0) {
            this.confirmBtn.node.getChildByName('Label').getComponent(Label).string = '去获得'
            const buttonHandler = new Button.EventHandler()
            buttonHandler.target = this.node
            buttonHandler.component = 'EditProfile'
            buttonHandler.customEventData = null
            buttonHandler.handler = 'goToShop'
            this.confirmBtn.clickEvents.push(buttonHandler);
        } else {
            this.confirmBtn.node.getChildByName('Label').getComponent(Label).string = '确定'
            const buttonHandler = new Button.EventHandler()
            buttonHandler.target = this.node
            buttonHandler.component = 'EditProfile'
            buttonHandler.customEventData = null
            buttonHandler.handler = 'clickConfirm'
            this.confirmBtn.clickEvents.push(buttonHandler);
        }
        this.propNum.string = 'x' + num
        let gender = this.User.gender
        if (gender == 1) {
            this.maleToggle.isChecked = true
        } else {
            this.femaleToggle.isChecked = true
        }
    }

    goToShop() {
        console.log('去商店')
        uiMgr.popPopup()
        uiMgr.showToast('商店不存在')
        // App.navMgr.navTo(App.navCfg.SHOP)//跳转到商店
    }

    async rollName() {
        if (this.nickName) {
            this.clickBg()
            this.nickName.string = await App.userMgr.getRandomName(this.getGender())
        }
    }

    getGender() {
        if (this.femaleToggle.isChecked) {
            return 2
        } else {
            return 1
        }
    }

    getNickName() {
        return this.nickName.string
    }

    async getPropNum() {//获取改名卡道具数量
        return await propMgr.getUserPropNumByType(PropType.PropTypeRenameCard) || 0
    }

    clickBg() {
        this.nickName?.blur();
    }

    setGender() {//修改性别
        this.User.gender = this.getGender()
        this.changeGender()
        //远程请求
    }

    async clickConfirm() {
        if (this.getNickName() == '') {
            uiMgr.showToast('昵称不能为空')
            return
        }
        //判断敏感词Toast.show('名字不可含有敏感词汇')
        //检查特殊字符Toast.show('不支持特殊字符')
        if (this.getNickName() == this.User.nickname) {
            uiMgr.showToast('新昵称不能与旧昵称相同')
            return
        }
        let propNum = await this.getPropNum()
        if (propNum == 0) {
            uiMgr.showToast('改名卡数量不足')
            return
        }

        let req = {
            name: this.getNickName(),
            uid: this.User.uid
        }
        let ret = propMgr.Rename(req)
        if ((await ret).err == null) {
            uiMgr.showToast('修改成功')
            this.closePopUp()
        } else {
            uiMgr.showToast('修改昵称失败, 有疑问请联系客服咨询详情')
        }
        this.User.nickname = this.getNickName()
        if (this.confirmCallBack) {
            this.confirmCallBack()
        }
    }

    closePopUp() {
        uiMgr.popPopup()
    }
}


