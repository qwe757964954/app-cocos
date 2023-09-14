import { EventSystem } from 'bos/base/event/EventSystem';
import { Log } from 'bos/exports';
import { _decorator, Component, isValid, log, Node } from 'cc';
const { ccclass, property } = _decorator;

const ERR_INVALID_TARGET = "INVALID_TARGET"

@ccclass('XComponet')
export class XComponent extends Component {
    onLoad() {
        let target: any = this
        target.__decoratorAppEvents?.forEach((e: any) => {
            EventSystem.getInstance().on(e.name, this[e.func], target)
        })
        target.__decoratorNodeEvents?.forEach((e: any) => {
            this.node.on(e.name, this[e.func], target)
        })
    }

    onDestroy() {
        let target: any = this
        target.__decoratorAppEvents?.forEach((e: any) => {
            EventSystem.getInstance().off(e.name, this[e.func], target)
        })

        target.__decoratorNodeEvents?.forEach((e: any) => {
            this.node.off(e.name, this[e.func], target)
        })
    }

    async promiseOne<T>(one: any) {
        return new Promise<T>((resolve, reject) => {
            one.then((value) => {
                if (isValid(this.node)) {
                    resolve(value)
                } else {
                    reject(ERR_INVALID_TARGET)
                }
            })
        })
    }

    async promiseAll(promises: PromiseLike<any>[]) : Promise<any[]> {
        return new Promise((resolve, reject) => {
            Promise.all(promises).then((values) => {
                if (isValid(this.node)) {
                    resolve(values)
                } else {
                    reject(ERR_INVALID_TARGET)
                }
            })
        })
    }

    onCatchError(err) {
        Log.e("onCatchError", err)
        if (err === ERR_INVALID_TARGET) {
            return
        } else {
            throw err
        }
    }

    /**
     * 判断自己以及当前node是否有效
     * @returns 
     */
    get selfValid() {
        return this.isValid && this.node != null && this.node.isValid
    }
}

