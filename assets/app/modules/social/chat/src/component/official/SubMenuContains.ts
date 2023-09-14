import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { NodeUtil } from 'bos/exports';
import { IMenuQueryReq } from 'idl/mpff/social/officialaccount.v1';
import { OfficialAccount } from 'qsdk/officialAccount/OfficialAccount';

@ccclass('SubMenuContains')
export class SubMenuContains extends XComponent {

    @property(Node)
    cellContent: Node = null;

    @property(Prefab)
    subMenuCellPrefab: Prefab = null;

    subMenu: any;
    officialAccountID: any;
    subMenuCellList: any = []
    updateView(data) {
        let delegate = (index) => {
            this.onClickSubMenu(index)
        };

        this.subMenu = data.subMenu;
        this.officialAccountID = data.officialAccountID;

        this.cellContent.removeAllChildren();

        if (this.subMenuCellPrefab) {
            for (let index = 1; index <= this.subMenu.length; index++) {
                const menu = this.subMenu[index - 1];

                const subMenuCell = instantiate(this.subMenuCellPrefab);
                this.cellContent.addChild(subMenuCell);

                NodeUtil.sendMessage(subMenuCell, "updateView", { menu, delegate, index, isLast: index === this.subMenu.length })

                this.subMenuCellList[index] = subMenuCell;
            }
        }
    }

    onClickSubMenu(index) {
        let menu = this.subMenu[index];
        if (menu) {
            // 子菜单
            if (menu.functionType === 2) {
                // 发起接口调用 (点击后调用 MenuQuery)
                let menuQueryReq: IMenuQueryReq = {
                    officialAccountID: this.officialAccountID,
                    menuID: menu.id
                }
                console.log(menuQueryReq, "menuQueryReq");
                OfficialAccount.getInstance().menuQuery(menuQueryReq)
            } else if (menu.functionType === 3) {
                // 跳转URL
                console.log("跳转URL");

            }
            this.node.active = false;
        }

    }

}