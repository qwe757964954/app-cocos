import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Label } from 'cc';
import {CDK} from 'idl/tss/hall/exchangeorder.v7';

@ccclass('CDKItem')
export class CDKItem extends XComponent {
    @property(Label)
    nameLab: Label = null!;
   
    @property(Label)
    cardNum: Label = null!;

    @property(Label)
    pwdLab: Label = null!;

    updateView(cdk:CDK,prizeName:string){
        this.nameLab.string = prizeName;
        this.cardNum.string = cdk.ID;
        this.pwdLab.string = cdk.password;
    }
}