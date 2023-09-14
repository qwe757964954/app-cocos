import { _decorator, Component, Prefab, Node } from 'cc';
import { PopUp } from './component/PopUp';
import { uiMgr } from 'bos/exports';
import { AccountMgr } from 'app/domain/account/AccountMgr';

const { ccclass, property, menu } = _decorator;

@ccclass('Setting')
@menu('setting/Setting')
export class Setting extends Component {

    @property({ type: Prefab })
    popWithButtons: Prefab | null = null

    //返回上级
    clickBack() {
        uiMgr.popPage()
    }

    //退出登录
    setLogout() {
        if (this.popWithButtons) {
            let pop = uiMgr.pushPopup(this.popWithButtons)
            let popUP = pop.getComponent(PopUp)
            popUP.titleLabel.string = '退出登录'
            popUP.contentLabel.string = '确认退出当前账号吗？'
            popUP.cancelLabel.string = '取消'
            popUP.confirmLabel.string = '确认'
            popUP.confirmCallBack = () => {
                AccountMgr.getInstance().logout()
            }
        }
    }
}


