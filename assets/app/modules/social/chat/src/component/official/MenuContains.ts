import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { NodeUtil } from 'bos/exports';
import { IMenuQueryReq } from 'idl/mpff/social/officialaccount.v1';
import { OfficialAccount } from 'qsdk/officialAccount/OfficialAccount';

@ccclass('MenuContains')
export class MenuContains extends XComponent {
    @property(Prefab)
    MenuCellPrefab: Prefab = null

    @property(Prefab)
    SubMenuPrefab: Prefab = null

    menus: any;
    officialAccountID: string;
    menuCellList: Node[] = []
    subMenuList: Node[] = []

    updateView(data) {
        this.menus = data.menus.menus;
        this.officialAccountID = data.menus.id;

        let delegate = (index: number) => {
            console.log("delegate-->index", index)
            this.onClickMenu(index);
        };

        if (this.MenuCellPrefab) {
            this.node.removeAllChildren();
            for (let index = 0; index < this.menus.length; index++) {
                const menu = this.menus[index];
                const menuCellView = instantiate(this.MenuCellPrefab);
                this.node.addChild(menuCellView);

                //menuCellView.height = this.object.height;

                NodeUtil.sendMessage(menuCellView, "updateView", { menu: menu, delegate: delegate, index: index })

                this.menuCellList[index] = menuCellView;

                if (menu.functionType === 1 && this.SubMenuPrefab) {
                    const subMenuView = instantiate(this.SubMenuPrefab);
                    menuCellView.addChild(subMenuView);
                    NodeUtil.sendMessage(subMenuView, "updateView", { subMenu: menu.subMenu, officialAccountID: this.officialAccountID })
                    subMenuView.active = false;
                    this.subMenuList[index] = subMenuView;

                    //重新计算位置
                    let menuCellViewTrs = menuCellView.getComponent(UITransform)
                    let menuCellHeight = menuCellViewTrs.height

                    let subMenuViewTrs = subMenuView.getComponent(UITransform)
                    let subMenuViewHeight = subMenuViewTrs.height

                    let newY = menuCellHeight / 2 + subMenuViewHeight

                    subMenuView.position = new Vec3(0, newY, 0)

                }
            }
        }

    }


    onClickMenu(index: number) {
        const menu = this.menus[index];
        const subMenuView = this.subMenuList[index];

        if (menu) {
            // 子菜单
            this.closeOtherSubMenu(index);

            if (menu.functionType === 1 && menu.subMenu && menu.subMenu.length > 0) {
                let active = subMenuView.active;
                subMenuView.active = !active;

                // if (subMenuView.visible) {
                //     if (!this.onRawTouch) {
                //         this.onRawTouch = (action: number, x: number, y: number, timestamp: number) => {
                //             if (action === 2 && this.object.valid()) {
                //                 const p = this.object.convertFromRoot(new Point(x, y));
                //                 const ret = this.object.pointIn(p);
                //                 if (!ret) {
                //                     this.closeOtherSubMenu();
                //                 }
                //             }
                //         };
                //         NotificationCenter.instance().addObserver("on_raw_touch", this.onRawTouch);
                //     }
                // } else {
                //     if (this.onRawTouch) {
                //         NotificationCenter.instance().removeObserver("on_raw_touch", this.onRawTouch);
                //         this.onRawTouch = null;
                //     }
                // }
            } else if (menu.functionType === 2) { // 发起接口调用 (点击后调用 MenuQuery)
                let menuQueryReq: IMenuQueryReq = {
                    officialAccountID: this.officialAccountID,
                    menuID: menu.id
                }
                OfficialAccount.getInstance().menuQuery(menuQueryReq)
            } else if (menu.functionType === 3) { // 跳转URL
                console.log("URL跳转----->")
            }
        }

    }


    closeOtherSubMenu(_subMenuIndex: number) {
        let subMenuIndex: number = _subMenuIndex || 0;
        for (let index = 0; index < this.subMenuList.length; index++) {
            let subMenu = this.subMenuList[index];
            if (subMenuIndex !== index) {
                subMenu.active = false
            }
        }
    }
}