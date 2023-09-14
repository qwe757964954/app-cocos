import { uiMgr } from 'bos/exports';
import { Component, EditBox, Label, Layout, Node, Prefab, ScrollView, _decorator, instantiate } from 'cc';
import { ChatSearch } from 'qsdk/im/fts/ChatSearch';
import { ListGroup } from './ListGroup';
import { ListItemConversation } from './ListItemConversation';
import { ListItemMessage } from './ListItemMessage';
import { ListItemUser } from './ListItemUser';
import { SearchResultConversation, SearchResultSession, SearchResultUser, Searcher } from './Searcher';
const { ccclass, property } = _decorator;

export type SearchType = "user" | "session" | "conversation" | "summary"

type Config = {
    type: SearchType,
    title: string,
    prefab: Prefab,
    component: any,
    data: (SearchResultUser | SearchResultSession | SearchResultConversation)[]
}

@ccclass('SearchView')
export class SearchView extends Component {

    @property(Node)
    private btnClear: Node

    @property(EditBox)
    private editBox: EditBox

    @property(ScrollView)
    private scrollView: ScrollView

    @property(Prefab)
    private prefabGroup: Prefab

    @property(Prefab)
    private prefabUser: Prefab

    @property(Prefab)
    private prefabConversation: Prefab

    @property(Prefab)
    private prefabTip: Prefab

    @property(Prefab)
    private prefabMessage: Prefab

    private currentTask = 0

    start() {
        this.editBox.node.on(EditBox.EventType.TEXT_CHANGED, () => {
            let content = this.editBox.string
            this.btnClear.active = content != ""
        })
        this.btnClear.active = false
        let lastTime = 0
        let events = [EditBox.EventType.EDITING_DID_ENDED, EditBox.EventType.EDITING_RETURN]
        events.forEach(e => {
            this.editBox.node.on(e, () => {
                let now = Date.now()
                if (now - lastTime < 100) {
                    return
                }
                lastTime = now
                this.search("summary", this.editBox.string)
            })
        })
    }

    private updateTip(msg: string) {
        let node = this.scrollView.content.getChildByName("tip")
        if (msg) {
            if (node == null) {
                node = instantiate(this.prefabTip)
                node.name = "tip"
                this.scrollView.content.addChild(node)
            }
            node.getChildByName("title").getComponent(Label).string = msg
        } else {
            if (node) {
                node.removeFromParent()
            }
        }
    }

    private async search(type: SearchType, keyword: string) {
        if (keyword == "") {
            return
        }
        let task = ++this.currentTask
        this.scrollView.content.removeAllChildren()
        this.updateTip("正在搜索")
        let users: SearchResultUser[]
        let sessions: SearchResultSession[]
        let conversations: SearchResultConversation[]
        if (type == "summary") {
            let results = await Searcher.searchSummary(keyword)
            users = results.users
            sessions = results.sessions
            conversations = results.conversations
        } else if (type == "user") {
            users = await Searcher.searchUsers(keyword, 1000)
        } else if (type == "session") {
            sessions = await Searcher.searchSession(keyword, 1000)
        } else if (type == "conversation") {
            conversations = await Searcher.searchConversation(keyword)
        }
        if (task != this.currentTask) {
            return
        }
        console.log("users", users)
        console.log("sessions", sessions)
        console.log("conversations", conversations)

        if (
            (users == null || users.length == 0)
            && (sessions == null || sessions.length == 0)
            && (conversations == null || conversations.length == 0)
        ) {
            this.updateTip("没有找到结果")
            return
        }
        this.updateTip(null)

        let configs: Config[] = [
            {
                type: "user",
                title: "好友",
                data: users || [],
                prefab: this.prefabUser,
                component: ListItemUser,
            },
            {
                type: "session",
                title: "会话",
                data: sessions || [],
                prefab: this.prefabUser,
                component: ListItemUser,
            },
            {
                type: "conversation",
                title: "聊天记录",
                data: conversations || [],
                prefab: this.prefabConversation,
                component: ListItemConversation,
            }
        ]

        for (let cfg of configs) {
            let data = cfg.data
            if (data.length == 0) {
                continue
            }

            let group = instantiate(this.prefabGroup)
            this.scrollView.content.addChild(group)
            group.getComponent(ListGroup).init({
                isSummary: type == "summary",
                type: cfg.type,
                title: cfg.title,
                prefab: cfg.prefab,
                component: cfg.component,
                list: cfg.data,
                onItemClick: (item) => {
                    if (cfg.type == "conversation") {
                        this.searchMessages(item as SearchResultConversation, keyword)
                    } else if (cfg.type == "session") {
                        let session = (item as SearchResultSession).session
                        uiMgr.loadPage("social@chat/res/prefab/ChatView", { params: { sessionID: session.sessionID } })
                    }
                },
                onMoreClick: () => {
                    this.search(cfg.type, keyword)
                },
            })
            this.scrollView.content.getComponent(Layout).spacingY = 10
        }
    }

    private async searchMessages(data: SearchResultConversation, keyword: string) {
        let task = ++this.currentTask
        this.scrollView.content.removeAllChildren()
        this.updateTip("正在查找")
        let results = await ChatSearch.findContent({
            dbName: data.dbName,
            keyword: keyword,
            tableName: data.tableName,
            fetchPos: true,
            limit: 1000,
        })
        console.log(results)
        if (task != this.currentTask) {
            return
        }
        if (results == null || results.length == 0) {
            this.updateTip("没有结果")
            return
        }
        this.updateTip(null)
        for (let item of results) {
            let node = instantiate(this.prefabMessage)
            this.scrollView.content.addChild(node)
            node.getComponent(ListItemMessage).init({
                data: item,
                onClick: () => {
                    // TODO 点击了某条消息
                    console.log("点击了", item)
                }
            })
            this.scrollView.content.getComponent(Layout).spacingY = 0
        }
    }

    onClearClick() {
        this.editBox.string = ""
        this.btnClear.active = false
    }

    onCloseClick() {
        uiMgr.popPage()
    }
}


