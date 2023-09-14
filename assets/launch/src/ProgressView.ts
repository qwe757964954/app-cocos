import { Log } from 'bos/exports';
import { Label, NodeEventType, UITransform } from 'cc';
import { ProgressBar } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ProgressView')
export class ProgressView extends Component {
    
    @property(ProgressBar)
    progressBar: ProgressBar = null;

    @property(Label)
    descLabel: Label = null;

    @property(Label)
    progressLabel: Label = null;

    start() {
        
    }

    public setDesc(desc: string) {
        this.descLabel.string = desc;
    }

    public setProgress(progress: number) {
        Log.d("setProgress", progress)
        this.progressLabel.string = `${progress*100}%`
        this.progressBar.progress = progress
    }
}

