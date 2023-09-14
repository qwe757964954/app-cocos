import { _decorator, Component, Label } from 'cc';
import { Picture } from 'qsdk/exports';
import { SearchResultConversation } from './Searcher';
const { ccclass, property } = _decorator;

@ccclass('ListItemConversation')
export class ListItemConversation extends Component {
    
    @property(Picture)
    private icon: Picture

    @property(Label)
    private title: Label

    @property(Label)
    private subTitle: Label

    private onClickCallback: VoidFunction

    init(
        params: {
            data: SearchResultConversation,
            onClick: VoidFunction,
        }
    ) {
        console.log("ListItemConversation.init", params.data)
        this.onClickCallback = params.onClick
        let data = params.data
        // TODO 显示user/session 
        if (data.session) {
            this.title.string = data.session.name
            this.icon.setUrl(data.session.bgPic)
        } else if (data.user) {
            this.title.string = `${data.user}`
        } else {
            this.title.string = data.tableName
        }
        this.subTitle.string = `${data.count} 条相关聊天记录`
    }

    onClick() {
        if (this.onClickCallback) {
            this.onClickCallback()
        }
    }
}


