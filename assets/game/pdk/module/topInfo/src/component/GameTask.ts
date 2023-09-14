import { _decorator, Component, Node, RichText, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { MsgTaskResult, TaskInfo } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { TaskType } from 'game/pdk/model/GameConst';
import { CardTypesMap } from 'game/pdk/config/GameConfig';

interface GameTaskParam {
    closeFunc?: Function,
    taskList: TaskInfo[],
    taskResult?: MsgTaskResult[],
}


@ccclass('GameTask')
export class GameTask extends XComponent {

    @property(Node)
    public taskList: Node;
    @property(RichText)
    public resultText: RichText;
    @property(RichText)
    public listText: RichText;

    private taskParam: GameTaskParam;


    setup(data?: GameTaskParam) {
        this.taskParam = { ...data };
        if (data?.taskList?.length > 0) {
            if (data.taskResult?.length > 0) {
                for (const v of data.taskResult) {
                    for (const k of data.taskList) {
                        if (v.taskID == k.taskID && k.taskType == TaskType.TaskTypeLastPlayCard) {
                            this.showTaskResult(k);
                            return
                        }
                    }
                }
            } else {
                for (const v of data.taskList) {
                    if (v.taskType == TaskType.TaskTypeLastPlayCard) {
                        this.showTaskList(v);
                        return;
                    }
                }
            }
        } else {
            this.hideView();
        }
    }

    showTaskResult(data: TaskInfo) {
        this.node.active = true;
        console.log('==showTaskResult==', data);
        this.resultText.string = `<b><color=#FFFFFF>最后一手牌任务完成, 倍数</color></b><b><color=#FFE87B>x${data.score}</color></b>`;
        this.taskList.active = false;
        this.resultText.node.scale = new Vec3(0, 0);
        this.resultText.node.active = true;
        tween(this.taskList).to(0.2, { scale: new Vec3(0, 0) }).start();
        tween(this.resultText.node).delay(0.2).to(0.2, { scale: new Vec3(1, 1) }).start();
    }

    showTaskList(data: TaskInfo) {
        this.node.active = true;
        let map = new CardTypesMap();
        console.log('==showTaskList==', data);
        this.listText.string = `<color=#FFFEF8>最后一手牌打出</color><color=#FFE87B>${map[data.cardType]}</color><color=#FFFEF8>倍数</color><color=#FFE87B>x${data.score}</color>`;
        this.taskList.scale = new Vec3(0, 0);
        this.taskList.active = true;
        this.resultText.node.active = false;
        tween(this.taskList).to(0.2, { scale: new Vec3(1, 1) }).start();
    }

    hideView() {
        let func = () => {
            if (this.taskParam?.closeFunc) {
                this.taskParam.closeFunc();
            } else {
                this.node.active = false;
            }
        }

        let node = this.resultText.node;
        if (this.taskList.active) {
            node = this.taskList;
        }
        tween(node).to(0.2, { scale: new Vec3(0, 0) }).call(func).start();
    }
}