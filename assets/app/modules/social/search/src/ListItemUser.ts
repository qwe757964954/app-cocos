import { Component, RichText, _decorator } from 'cc';
import { Picture } from 'qsdk/exports';
import { SearchResultSession, SearchResultUser } from './Searcher';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('ListItemUser')
export class ListItemUser extends Component {


    @property(Picture)
    private icon: Picture

    @property(RichText)
    private label: RichText

    private onItemClick: VoidFunction

    init(
        params: {
            data: SearchResultUser | SearchResultSession,
            onClick: VoidFunction
        }
    ) {
        this.onItemClick = params.onClick
        if (params.data.type == "user") {
            let data = params.data as SearchResultUser
        } else {
            let data = params.data as SearchResultSession
            this.label.string = Utils.richtext(data.posContent.name)
            this.icon.setUrl(data.session.bgPic)
        }
    }

    onClick() {
        if (this.onItemClick) {
            this.onItemClick()
        }
    }

}


