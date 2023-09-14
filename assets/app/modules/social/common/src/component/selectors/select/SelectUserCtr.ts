import { _decorator, Component, instantiate, Node, Pool, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SimpleTableView } from 'bos/framework/gui/tableview/SimpleTableView';
import { Decorator, eventSystem, resLoader, TableView, uiMgr } from 'bos/exports';
import { Button } from 'cc';
import { Label } from 'cc';
import { SimpleButtonEx } from '../../SimpleButtonEx';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
import { CustomTableView, CustomTableViewSectionData } from '../../../CustomTableView';
import { CharSideBarCtr } from '../base/CharSideBarCtr';
import { App } from 'app/App';
import { AlertParams, UIMgr } from 'bos/framework/gui/UIMgr';


type SelectUserCallback = (userIDList: number[]) => void

export interface SelectUserParams {
    userIDList: number[];//用户列表
    onComplete: SelectUserCallback;

    filterIDList?: number[];//过滤ID列表
    isShowFilter?: boolean;//过滤ID是否显示
    isSingleSelect?: boolean;//是否单选

    isAutoClose?: boolean; // onComplete之后是否自动关闭
}

export interface SelectCellParams {
    userID: number;
    isSelect: boolean;
    isSingleSelect: boolean;
}


@ccclass('SelectUserCtr')
export class SelectUserCtr extends XComponent {
    @property(CustomTableView)
    tableView: CustomTableView = null

    @property(Button)
    finishBtn: Button = null;

    @property(Label)
    selectCountLabel: Label = null

    @property(Node)
    selectContent: Node = null

    @property(CharSideBarCtr)
    charSideBar: CharSideBarCtr = null

    @property(Prefab)
    avatarPrefab: Prefab = null

    @property(Prefab)
    userPrefab: Prefab = null

    private onCompleteCB: SelectUserCallback;

    private userIDList: number[];
    private filterIDList: number[];
    private isShowFilter = false;

    private filterIDMap: Map<number, boolean> = new Map();
    private selectIDMap: Map<number, boolean> = new Map();
    private userList = [];

    private isSingleSelect: boolean = false // 是否是单选

    private isAutoClose: boolean = true
    private _pool: Pool<Node> = null;

    private sectionListData: CustomTableViewSectionData[] = [];
    start(): void {
        console.log("selectUser:start")

        eventSystem.on("SELECT_USER_ONCLICK", this.onSelectUser, this)
        if (!this._pool) {
            this.initPool()
        }
    }


    initPool() {
        this._pool = new Pool(
            () => {
                return instantiate(this.avatarPrefab);
            },
            1,
            (node: Node) => {
                node.destroy();
            }
        );

    }

    onDestroy(): void {
        eventSystem.off("SELECT_USER_ONCLICK", this.onSelectUser, this)
    }

    setup(args: SelectUserParams) {
        console.log("selectUser", args)
        this.userIDList = args.userIDList; // 用户ID列表
        this.filterIDList = args.filterIDList ?? []; // 过滤ID列表
        this.isShowFilter = args.isShowFilter ?? false; // 过滤ID是否显示
        this.isSingleSelect = args.isSingleSelect ?? false

        this.isAutoClose = args.isAutoClose ?? true

        this.filterIDMap = new Map();
        this.selectIDMap = new Map();

        this.onCompleteCB = args.onComplete

        for (let i = 0; i < this.filterIDList.length; i++) {
            const key = this.filterIDList[i];
            this.filterIDMap.set(key, true)
        }

        if (!this.isShowFilter) {
            for (const v of this.userIDList) {
                if (!this.filterIDMap.has(v)) {
                    this.userList.push({ userID: v, isSelect: false });
                }
            }
        } else { // 标记过滤的人为选中状态

            for (const v of this.userIDList) {
                if (this.filterIDMap.has(v)) {
                    this.userList.push({ userID: v, isSelect: true });
                    this.selectIDMap.set(v, true)

                } else {
                    this.userList.push({ userID: v, isSelect: false });
                }
            }
        }

        this.initCustomTableViewData()
    }

    async initCustomTableViewData() {

        let tempUserList = []
        for (let index = 0; index < this.userList.length; index++) {
            let userID = this.userList[index].userID
            console.log("initCustomTableViewData userID----->", userID)
            let user = await App.userMgr.getUserByID(userID).finish()
            tempUserList.push(user)
        }

        this.sectionListData = []

        let userSectionList = this.charSideBar.getCharSideData(tempUserList)
        for (let index = 0; index < userSectionList?.length; index++) {
            let userSection = userSectionList[index];

            userSection.cells.forEach(element => {
                element.prefab = this.userPrefab
                element.data = { userID: element.data.user.uid, isSelect: false, isSingleSelect: this.isSingleSelect }
            });

            this.sectionListData.push(userSection)
        }
        this.charSideBar.setData(this.sectionListData)
        this.tableView.setData(this.sectionListData)
    }


    onSelectUser(args: SelectCellParams) {

        this.updateSelectTable(args)
    }

    updateSelectTable(args: SelectCellParams): void {
        let isSelect = args.isSelect
        let userID = args.userID

        if (isSelect) {
            if (this.isSingleSelect) {
                this.selectIDMap.clear()
            }
            this.selectIDMap.set(userID, true)
        } else {
            this.selectIDMap.delete(userID)
        }

        let num = this.selectIDMap.size

        if (num > 0) {
            this.finishBtn.interactable = true;
            this.finishBtn.getComponent(SimpleButtonEx).setEnabled(true)
        } else {
            this.finishBtn.interactable = false;
            this.finishBtn.getComponent(SimpleButtonEx).setEnabled(false)
        }

        this.selectCountLabel.string = `完成(${num})`

        this.updateSelectAvatar()
    }

    updateSelectAvatar() {
        if (!this._pool) {
            this.initPool()
        }
        this.removeSelectContentChild()

        let userIDList = []
        this.selectIDMap.forEach((value, key) => {
            userIDList.push(key)
        });

        for (let index = 0; index < userIDList.length; index++) {
            let userID = userIDList[index]

            let avatar = this.createCell()
            this.selectContent.addChild(avatar)
            avatar.getComponent(Avatar)?.setUserID(userID)

        }
    }


    createCell() {
        let cell: Node = this._pool.alloc();
        // let com = cell.getComponent(GoodsItemCtr);
        // if (com) {
        //     com.updateView(data);
        // }
        return cell;
    }
    removeSelectContentChild() {
        let children = this.selectContent.children;
        let len = children.length;
        let node: Node;
        for (let i = len - 1; i >= 0; i--) {
            node = children[i];
            node.removeFromParent();
            this._pool.free(node);
        }
    }

    onClickBack() {
        uiMgr.popPage()

    }

    onSelectComplete() {

        let userIDList = []
        this.selectIDMap.forEach((value, key) => {
            userIDList.push(key)
        });
        this.onCompleteCB?.call(null, userIDList)
        if (this.isAutoClose) {
            this.onClickBack()
        }
    }

    onClickFinish() {
        this.onSelectComplete()
    }

}