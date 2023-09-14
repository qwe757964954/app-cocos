import { SimpleTableView } from 'bos/framework/gui/tableview/SimpleTableView';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


const TextGroup = [
    "快来靠谱队友，搞起！",
    "发个战绩瞅一下？",
    "我就看看我喜欢的人在不在？",
    "别这样，我还是个孩子…",
    "互相关注，了解一下？",
    "大奖是我的，你们没戏~",
    "群里有老司机吗？",
    "预祝本群筒子们天胡起手、大奖都有！",
    "你这样会被罚抄作业的",
    "你们的小可爱突然出现~~",
    "今晚求组队！",
    "所言极是，送上一万个26666666！",
    "群里谁最6？",
]

@ccclass('QuickTextPage')
export class QuickTextPage extends Component {
    @property(SimpleTableView)
    simpleTableView: SimpleTableView = null!;

    start() {
        this.simpleTableView.setData(TextGroup)
    }


}


