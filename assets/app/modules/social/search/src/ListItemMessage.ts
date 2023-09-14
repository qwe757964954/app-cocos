import { TimeUtil } from 'bos/exports';
import { _decorator, Component, Label, RichText } from 'cc';
import { Picture } from 'qsdk/exports';
import { ChatSearchTypes } from 'qsdk/im/fts/ChatSearch';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('ListItemMessage')
export class ListItemMessage extends Component {

    @property(Picture)
    private icon: Picture

    @property(Label)
    private title: Label

    @property(Label)
    private time: Label

    @property(RichText)
    private subTitle: RichText

    private onClickCallback: VoidFunction

    init(
        params: {
            data: ChatSearchTypes.FindContentResult,
            onClick: VoidFunction
        }
    ) {
        this.onClickCallback = params.onClick
        // this.icon.setUrl(data.)
        this.title.string = params.data.data.fromID.toString()
        this.time.string = TimeUtil.toyyyyMMddHHmmss(params.data.data.createdAt * 1000)
        this.subTitle.string = Utils.richtext(params.data.posContent)
    }

    onClick() {
        if (this.onClickCallback) {
            this.onClickCallback()
        }
    }
}


