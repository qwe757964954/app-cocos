import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { SimpleTableView } from 'bos/framework/gui/tableview/SimpleTableView';
import { Decorator, eventSystem, uiMgr } from 'bos/exports';
import { Button } from 'cc';
import { Label } from 'cc';
import { SimpleButtonEx } from '../../SimpleButtonEx';
import { EditBox } from 'cc';
import { CustomTableView } from '../../../CustomTableView';


export interface SelectCommonDelegate {
    onSelectComplete()
}

export interface SelectCommonParams {
    titleText: string;
    onComplete: () => void;


    tableViewDataList: any;

    delegate: any;
}


@ccclass('SelectCommonCtr')
export class SelectCommonCtr extends XComponent {
    @property(CustomTableView)
    tableView: CustomTableView = null

    @property(Button)
    finishBtn: Button = null;

    @property(Label)
    selectCountLabel: Label = null

    @property(Label)
    titleLabel: Label = null

    @property(Button)
    inputDeleteBtn: Button = null

    @property(Button)
    inputView: EditBox = null


    protected start(): void {


    }

    setup(args: any) {
        this.tableView.setData(args);
    }


    onEditChange(args) {
        console.log("onTextChange", args)
    }

    onEditReturn(args) {

        console.log("onEditReturn", args)
    }


    onTextInput(text: string, flag: boolean) {
        this.unschedule(this.textHandler)
        if (text === "") {

        } else {
            this.scheduleOnce(this.textHandler, 0.5)
        }
    }

    textHandler() {

    }


    onClickBack() {
        uiMgr.popPage()
    }

    onSelectComplete() {

        this.onClickBack()
    }

    onClickFinish() {
        this.onSelectComplete()

    }

}