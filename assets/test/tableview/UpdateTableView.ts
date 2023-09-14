import { Toggle } from 'cc';
import { EditBox } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { TestTableView } from './TestTableView';
const { ccclass, property } = _decorator;

@ccclass('UpdateTableView')
export class UpdateTableView extends Component {

    @property({
        type: EditBox,
    })
    public inputSection: EditBox = null!;

    @property({
        type: EditBox,
    })
    public inputIndex: EditBox = null!;

    @property({
        type: EditBox,
    })
    public inputCount: EditBox = null!;

    @property({
        type: Toggle,
    })
    public toggleVTable: Toggle = null!;

    @property({
        type: Toggle,
    })
    public toggleHTable: Toggle = null!;

    @property({
        type: TestTableView,
    })
    public testVTable: TestTableView = null!;

    @property({
        type: TestTableView,
    })
    public testHTable: TestTableView = null!;


    public getCount() {
        let strvalue = this.inputCount.string
        return Number(strvalue);
    }

    public getIndex() {
        let strvalue = this.inputIndex.string
        return Number(strvalue);
    }

    public getSection() {
        let strvalue = this.inputSection.string
        return Number(strvalue);
    }

    protected onLoad(): void {
        this.inputSection.string = "0"
        this.inputIndex.string = "0"
        this.inputCount.string = "1"
    }

    handleInsertItem() {
        let count = this.getCount()
        let section = this.getSection();
        let index = this.getIndex();

        let test = this.toggleVTable.isChecked ? this.testVTable : this.testHTable
        let datas = test.getDatas();

        let insertIndex = index
        for (let i = 0; i < count; i++) {
            datas.splice(insertIndex++, 0, { name: `insert item : ${i}` })
        }
        test.getTableView().insertRow(index, 0, count);
    }

    handleUpdateItem() {
        let count = this.getCount()
        let section = this.getSection();
        let index = this.getIndex();

        let test = this.toggleVTable.isChecked ? this.testVTable : this.testHTable
        let datas = test.getDatas();

        for (let i = 0; i < count; i++) {
            datas[index + i].name = `update ${i}`
        }
        test.getTableView().updateRow(index, 0, count);
    }

    handleRemoveItem() {
        let count = this.getCount()
        let section = this.getSection();
        let index = this.getIndex();

        let test = this.toggleVTable.isChecked ? this.testVTable : this.testHTable
        let datas = test.getDatas();

        datas.splice(index, count)
        test.getTableView().removeRow(index, 0, count);
    }

    handleResetTo() {
        let section = this.getSection();
        let index = this.getIndex();

        let test = this.toggleVTable.isChecked ? this.testVTable : this.testHTable
        test.getTableView().refresh(index, 0)
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


