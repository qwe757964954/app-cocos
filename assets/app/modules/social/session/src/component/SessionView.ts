import { Decorator, eventSystem, resLoader, uiMgr } from 'bos/exports';
import { XComponent } from 'bos/framework/component/XComponent';
import { TableView } from 'bos/framework/gui/tableview/TableView';
import { AudioSource, Button, Node, Pool, Prefab, _decorator, instantiate } from 'cc';
import { IM } from 'qsdk/im/IM';
import { Session } from 'qsdk/im/core/Session';
import { SessionCell } from './SessionCell';
import { director } from 'cc';
import { MoreViewCtr } from 'app/modules/social/contacts/src/component/MoreViewCtr';
import { UITransform } from 'cc';
import { Vec3 } from 'cc';
import { CellButtons } from './CellButtons';
import { IMEvent, MessageType, SysCMD } from 'qsdk/im/config/define';
import { Message } from 'qsdk/im/core/Message';
import { SocialRedPoint } from 'app/modules/social/common/src/SocialRedPoint';
import { OfficialAccount } from 'qsdk/officialAccount/OfficialAccount';
const { ccclass, property } = _decorator;

@ccclass('SessionView')
export class SessionView extends XComponent {

    @property({
        visible: true,
        type: TableView
    })
    private tableView: TableView;


    @property({
        visible: true,
        type: Prefab
    })
    private cellPrefab: Prefab = null!;

    @property(Node)
    moreBtn: Node = null

    @property(Node)
    contactsRedPoint: Node = null

    private nodePool: Pool<Node> = null;

    private sessionList: Session[] = [];


    createCell(tableView: TableView, index: number, section: number): Node {
        let node = this.nodePool.alloc();
        let cell = node.children[0]
        let com = cell.getComponent(SessionCell) || cell.addComponent(SessionCell)
        com.updateView(this.sessionList[index], index);
        cell.getComponent(CellButtons).setScrollView(this.tableView.node);
        let aaa = node.addComponent(AudioSource)
        // AudioSource.
        // aaa.
        return node;
    }

    releaseCell(tableView: TableView, cell: Node) {
        cell.removeFromParent();
        this.nodePool.free(cell)
    }



    rowCount(tableView: TableView, section: number) {
        return this.sessionList.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableView: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    onLoad(): void {
        super.onLoad();
        this.nodePool = new Pool(() => {
            return instantiate(this.cellPrefab)
        }, 10, (node: Node) => {
            node.destroy();
        });
    }
    onRecvMessage(message: Message) {
        console.log("SessionView onRecvMessage", this.node.activeInHierarchy)
        if (this.node.activeInHierarchy == true) {
            this.tableView.refresh({ forceUpdate: true });
        }
        if (message.type === MessageType.Sys && message.sysCMD === SysCMD.GroupCreated) {
            this.onCreateGroup(message)
        }
    }

    onCreateGroup(message: Message) {
        if (message.isMySelf()) {
            let session = IM.getInstance().getSession(message.sessionID)
            uiMgr.loadPage("social@chat/res/prefab/ChatView", { params: { sessionID: session.sessionID } })

        }

    }

    onIMSyncPageMessageFinish(isFinish: boolean) {
        if (this.sessionList && this.sessionList.length > 0) {
            this.tableView.refresh({ forceUpdate: true });
        }

        if (isFinish == true) {
            uiMgr.hideLoading()
        }
    }

    // onDestroy(): void {
    //     IM.getInstance().off(IMEvent.ON_RECEIVE_MESSAGE, this.onRecvMessage, this)
    //     super.onDestroy()
    // }

    start() {
        IM.getInstance().on(IMEvent.ON_RECEIVE_MESSAGE, this.onRecvMessage, this)
        IM.getInstance().on(IMEvent.ON_SYNC_PAGE_MESSAGE_FINISH, this.onIMSyncPageMessageFinish, this)
        {
            let node = this.node.getChildByName("search")
            if (node.getComponent(Button) == null) {
                node.addComponent(Button)
            }
            node.on(Button.EventType.CLICK, () => {
                uiMgr.loadPage("social@search/res/prefab/SearchView")
            })
        }
    }
    onEnable() {
        console.log("SessionView onEnable")

        this.init()
        if (IM.getInstance().isUserSyncFinish == false) {
            uiMgr.showLoading("正在同步会话列表")
        }

        SocialRedPoint.getContactsRedPoint().then(result => {
            this.contactsRedPoint.active = result
        })
    }
    protected onDestroy(): void {
        IM.getInstance().off(IMEvent.ON_RECEIVE_MESSAGE, this.onRecvMessage, this)
        IM.getInstance().off(IMEvent.ON_SYNC_PAGE_MESSAGE_FINISH, this.onIMSyncPageMessageFinish, this)
        super.onDestroy()
    }


    async init() {
        
        let sessionList = await IM.getInstance().loadLocalSessionList()
        await OfficialAccount.getInstance().init()
        
        this.sessionList = sessionList

        console.log("sessionList", sessionList)
        this.tableView.delegate = this;
        this.tableView.refresh({ forceUpdate: true });
    }

    @Decorator.OnAppEvent("sessionClick")
    @Decorator.FunctionIntervalDelay(0.5)
    onSessionClick(session: Session) {
        uiMgr.loadPage("social@chat/res/prefab/ChatView", { params: { sessionID: session.sessionID } })
        // uiMgr.loadPage("social@chat/res/prefab/ChatView", { params: { userID: 123 } })
    }

    @Decorator.OnAppEvent("PINSESSION")//会话置顶
    onPinSession(session: Session) {
        if (session.topRank === 0) {
            session.topRank = 1
        } else {
            session.topRank = 0
        }
        // console.log("topRank_________", session.topRank)
        IM.getInstance().pinConversation(session).then(({ err, resp }) => {
            if (!err) {
                // console.log("pin success", this.sessionList, IM.getInstance().getSessionList())
                this.tableView.refresh({ forceUpdate: true })
            }

        })
    }

    @Decorator.OnAppEvent("DNDSESSION")//会话免打扰
    onDNDSession(session: Session) {
        session.isDND = !session.isDND
        IM.getInstance().setConversationRecvMessageOpt(session, session.isDND).then(({ err, resp }) => {
            if (!err) {
                let updateIndex = IM.getInstance().processor.getSessionIndex(session)
                console.log("this.tableView.updateRow", updateIndex)
                // this.tableView.updateRow(updateIndex, 0, 1)
                this.tableView.refresh({ forceUpdate: true, keepIndex: true })

            }
        })
    }

    @Decorator.OnAppEvent("DELETESESSION")//会话删除
    onNoShowSession(session: Session) {
        if (this.sessionList) {
            for (let index = 0; index < this.sessionList.length; index++) {
                const element = this.sessionList[index];
                if (element.sessionID == session.sessionID) {
                    this.tableView.removeRow(index, 0, 1)
                    this.sessionList.splice(index, 1)
                    IM.getInstance().getDB().deleteSession(element)
                    break;
                }
            }
        }
    }



    onClickFeed() {

    }

    onClickContacts() {
        uiMgr.loadPage("social@contacts/res/prefab/ContactsView.prefab")

    }

    onClickMore() {
        resLoader.loadPrefabNode("social@contacts/res/prefab/MoreView.prefab", (view) => {
            let trs = this.moreBtn.getComponent(UITransform)
            let pos = trs.convertToWorldSpaceAR(new Vec3(0, 0, 0));

            director.getScene().getChildByName('Canvas').addChild(view)
            view.getComponent(MoreViewCtr).updateView(pos)
        })
    }
}