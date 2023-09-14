import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { OpResult } from './OpResult';
import { Log } from 'bos/exports';

@ccclass('OpResultLayer')
export class OpResultLayer extends XComponent {

    @property(OpResult)
    public opResult1: OpResult | null = null;

    @property(OpResult)
    public opResult2: OpResult | null = null;

    @property(OpResult)
    public opResult3: OpResult | null = null;

    @property(OpResult)
    public opResult4: OpResult | null = null;


    onLoad() {
        Log.d("==OpResultLayer onLoad==")
        this.opResult1.init(1);
        this.opResult2.init(2);
        this.opResult3.init(3);
        this.opResult4.init(4);
    }

    update(deltaTime: number) {

    }

    switchDir(dir: number) {

    }
}