import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { SearchResult } from './Searcher';
import { SearchType } from './SearchView';
const { ccclass, property } = _decorator;

type Params = {
    isSummary: boolean,
    type: SearchType,
    prefab: Prefab,
    component: any,
    title: string
    list: SearchResult[]
    onMoreClick: VoidFunction
    onItemClick: (item: SearchResult) => void
}

@ccclass('ListGroup')
export class ListGroup extends Component {

    @property(Label)
    title: Label = null

    @property(Node)
    content: Node = null

    @property(Node)
    more: Node = null

    private params: Params

    init(parmas: Params) {
        this.params = parmas
        this.title.string = parmas.title
        let count = this.params.isSummary ? Math.min(parmas.list.length, 3) : this.params.list.length
        for (let i = 0; i < count; i++) {
            let item = parmas.list[i]
            let node = instantiate(parmas.prefab)
            this.content.addChild(node)
            let com = node.getComponent(parmas.component) as any
            com.init({
                data: item,
                onClick: () => {
                    parmas.onItemClick(item)
                }
            })
        }
        this.more.active = parmas.isSummary && parmas.list.length > 3
    }

    onMoreClick() {
        if (this.params && this.params.onMoreClick) {
            this.params.onMoreClick()
        }
    }
}


