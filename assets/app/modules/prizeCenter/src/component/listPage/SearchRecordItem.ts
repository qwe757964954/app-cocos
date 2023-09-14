import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import {SearchPrize} from './SearchPrize';

@ccclass('SearchRecordItem')
export class SearchRecordItem extends XComponent {
    @property(Label)
    recordLab:Label = null!;

    private _delegate:SearchPrize = null;

    updateView(str:string,delegate:SearchPrize){
        this.recordLab.string = str;
        this._delegate = delegate;
    }

    onClickItem(){
        if (this._delegate){
            this._delegate.onEventRecord(this.recordLab.string);
        }
    }
}