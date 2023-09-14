import { _decorator, Component, Node, Prefab, Toggle, EditBox } from 'cc';
import { uiMgr } from 'bos/exports';
import { Account } from 'qsdk/exports';
import { IVerifyIDCardReq } from "idl/mpff/user/passport.v1";
const { ccclass, property, menu } = _decorator;

@ccclass('Logoff')
@menu('setting/Logoff')
export class Logoff extends Component {

    @property({ type: Prefab })
    popUp: Prefab | null = null

    @property({ type: Toggle })
    toggle: Toggle | null = null

    @property({ type: EditBox })
    nameEditor: EditBox | null = null

    @property({ type: EditBox })
    IDCardEditor: EditBox | null = null

    start() {

    }

    clickConfirm() {
        if (!this.popUp) return
        if (!this.toggle) return
        if (this.toggle.isChecked) {
            uiMgr.pushPopup(this.popUp)
        } else {
            uiMgr.showToast("请勾选同意协议")
        }
    }

    closePopUp() {
        uiMgr.popPopup()
    }

    clickBg() {
        if (this.nameEditor) {
            this.nameEditor?.blur();
        }
        if (this.IDCardEditor) {
            this.IDCardEditor?.blur();
        }
    }

    //申请注销
    async applyForLogoff() {

        if (this.nameEditor && !this.nameEditor.string) {
            uiMgr.showToast("请输入姓名")
            return
        }

        if (this.IDCardEditor && !this.IDCardEditor.string) {
            uiMgr.showToast("请输入身份证号")
            return
        }

        // let req: IVerifyIDCardReq = {
        //     idCardName: this.nameEditor.string,
        //     idCardNo: this.IDCardEditor.string,
        // }

        // let { err, resp } = await Account.getInstance().verifyIDCard(req);
        // if (err == null) {
        //     this.closePopUp()
        //     // Account.logoff()//删除数据
        //     // uiMgr.pushScene('Login')
        // } else {
            uiMgr.showToast("身份信息与用户不匹配")
        // }
    }

}


