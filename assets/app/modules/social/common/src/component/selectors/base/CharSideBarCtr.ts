import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { User } from 'app/domain/user/User';
import { CustomTableView, CustomTableViewCellData, CustomTableViewSectionData } from '../../../CustomTableView';
import { Prefab } from 'cc';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { UITransform } from 'cc';
import { instantiate } from 'cc';
import { NodeUtil, TableView } from 'bos/exports';
import { FlexDirection } from 'bos/framework/yoga/YogaEnum';
import { size } from 'cc';
import { CharSideBarCellCtr } from './CharSideBarCellCtr';
import { EventTouch } from 'cc';


const charConfigList = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
    "X", "Y", "Z", "#"
]

export interface UserChar {
    user: User,
    char: string,
}


@ccclass('CharSideBarCtr')
export class CharSideBarCtr extends XComponent {

    @property(Prefab)
    charCellPrefab: Prefab = null;

    @property(Prefab)
    selectUserCellPrefab: Prefab = null;

    @property(Prefab)
    charSideBarCellPrefab: Prefab = null

    @property(TableView)
    tableView: TableView = null

    private allData: any[];
    private listData: CustomTableViewSectionData[];
    private sectionOffset: number;

    private currentChar = null;  // 当前选中的字符
    private lastCell = null; // 上一个选中的字符

    private charSideBarCellMap: Map<string, Node> = new Map();
    private charSideBarCellList = [];
    private charList = [];


    /** 
    initRootView(): void {
        if (!this.root) {
            this.root = new Node()
            let uiTrs = this.root.addComponent(UITransform)
            uiTrs.setContentSize(size(200, 200))

            let yogaComp = this.root.addComponent(YogaFlex)

            yogaComp.setSize("auto", "auto")
            yogaComp.isLeaf = false
            yogaComp.setFlexDirection(FlexDirection.Column)

            this.node.addChild(this.root)

            this.root.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
            this.root.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
            this.root.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        }
    }
    */
    onTouchStart(event: EventTouch) {
        this.onHitTest(event);
    }

    onTouchMove(event: EventTouch) {
        // console.log("onTouchMove", event)
        this.onHitTest(event);
    }

    onTouchEnd(event: EventTouch) {
        // console.log("onTouchEnd", event)

        if (this.lastCell) {
            this.lastCell.getComponent(CharSideBarCellCtr).updateView({ selected: true, isTouch: false });
        }
    }

    onTouchCancel(event) {
        // console.log("onTouchCancel", event)

        this.clearLastCell();
    }



    setData(data: any[]): void {
        this.allData = data;
        this.listData = [];
        this.sectionOffset = 0;

        for (let i = 1; i <= (data?.length ?? 0); i++) {
            const v = data[i - 1];
            if (v.isUserSection === true) {
                this.listData.push(v);
            } else {
                this.sectionOffset = i;
            }
        }

        if (this.listData.length > 0) {
            this.initSideBar();
        }
    }

    goToChar(char: string) {
        let toIndex = -1;
        for (let index = 0; index < this.allData.length; index++) {
            let v = this.allData[index]
            if (v.section?.data?.char === char) {
                toIndex = index;
                break;
            }
        }
        console.log("goToChar--->", toIndex)
        if (toIndex > 0) {
            this.tableView.refresh({ section: toIndex, index: 0 })
        }
    }

    getCharSideData(userList: User[]): CustomTableViewSectionData[] {
        let userMap: Map<string, UserChar[]> = new Map()
        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            const char = this.getUserNameFirstChar(user.nickname);

            let userChar: UserChar = {
                user: user,
                char: char
            }

            if (char) {
                if (!userMap.has(char)) {
                    userMap.set(char, new Array())
                }
                let v = userMap.get(char)
                v.push(userChar);
            }
        }

        const list = [];
        userMap.forEach((value, key) => {
            console.log(`${key} = ${value}`);
            list.push({ key: key, data: value });
        });


        // list.sort(function (a, b) {
        //     return a.key - b.key
        // });

        let result: CustomTableViewSectionData[] = [];
        for (let i = 0; i < list.length; i++) {
            let v = list[i];
            let section: CustomTableViewSectionData = {
                section: { prefab: this.charCellPrefab, data: { char: v.key } },
                cells: [],
                isUserSection: true,
            };
            for (let j = 0; j < v.data.length; j++) {
                let u = v.data[j];
                let item: CustomTableViewCellData = { prefab: this.selectUserCellPrefab, data: u };
                section.cells.push(item);
            }
            result.push(section);
        }

        return result;

    }

    getUserNameFirstChar(name: string): string {
        if (name === "") {
            return "#";
        }
        const first = name.charAt(0);
        const firstAscii = first.charCodeAt(0);
        if (firstAscii > 127) {
            // const ret = Audit.convertToPinyin(name, "");
            // const firstLetter = ret.charAt(0);
            // const firstLetterUp = firstLetter.toUpperCase();

            let firstLetter = Math.ceil(Math.random() * 26)
            return charConfigList[firstLetter];;
        } else {
            if (firstAscii >= 65 && firstAscii <= 90) {
                return charConfigList[firstAscii - 65 + 1];
            } else if (firstAscii >= 97 && firstAscii <= 122) {
                return charConfigList[firstAscii - 97 + 1];
            } else {
                return "#";
            }
        }
    }

    initSideBar(): void {
        this.currentChar = null;
        this.lastCell = null;

        this.charSideBarCellMap = new Map();
        this.charSideBarCellList = [];
        this.charList = [];
        // this.initRootView();

        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        // this.root.removeAllChildren()
        this.node.removeAllChildren()
        
        for (const sectionData of this.listData) {
            if (sectionData.section) {
                const char = sectionData.section.data.char;
                const view = instantiate(this.charSideBarCellPrefab);
                this.node.addChild(view);
                view.getComponent(CharSideBarCellCtr).updateView({ char: char, selected: false })
                this.charSideBarCellList.push(view)

                this.charSideBarCellMap.set(char, view)
                this.charList.push(char);
            }
        }

        this.tableView.node.on(TableView.EventType.UPDATE_FLOAT_SECTION, this.updateFloatSection, this)
    }

    updateFloatSection(sectionIndex: number) {
        console.log("updateFloatSection", sectionIndex)
        let section = this.allData[sectionIndex]
        if (section && section.section && section.section.data && section.section.data.char) {
            this.updateSelectedChar(section.section.data.char, false)
        }
    }

    clearLastCell(): void {
        if (this.lastCell) {
            this.lastCell.getComponent(CharSideBarCellCtr).updateView({ selected: false, isTouch: false });
            this.lastCell = null;
            this.currentChar = null;
        }
    }


    onHitTest(event): void {
        let touchPos = event.getLocation();
        let touchIndex = -1
        for (let index = 0; index < this.charSideBarCellList.length; index++) {
            let cell = this.charSideBarCellList[index]
            if (cell.getComponent(UITransform).hitTest(touchPos)) {
                touchIndex = index
                break;
            }
        }
        if (touchIndex != -1) {
            const char = this.charList[touchIndex];

            if (char) {
                if (this.currentChar !== char) {
                    this.goToChar(char);
                    this.updateSelectedChar(char, true);
                }
            }
        }

    }

    updateSelectedChar(char: string, isTouch: boolean): void {
        if (!this.currentChar || this.currentChar !== char) {
            if (this.lastCell) {
                this.lastCell.getComponent(CharSideBarCellCtr).updateView({ selected: false, isTouch: false });
            }

            const view = this.charSideBarCellMap.get(char);
            if (view) {
                view.getComponent(CharSideBarCellCtr).updateView({ selected: true, isTouch: isTouch });
                this.currentChar = char;
                this.lastCell = view;
            }
        }
    }


}