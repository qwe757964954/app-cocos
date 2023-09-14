import { _decorator, Component, instantiate, Node, Prefab, Pool, ScrollView } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Session } from 'qsdk/im/core/Session';
import { IM } from 'qsdk/im/IM';
import { Message } from 'qsdk/im/core/Message';
import { IMEvent, MessageStatus, MessageType } from 'qsdk/im/config/define';
import { Decorator, Log, NodeUtil, TableView, TableViewEvent, eventSystem } from 'bos/exports';
import { RevokedCell } from './chatCell/RevokedCell';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';

@ccclass('ChatTableView')
export class ChatTableView extends XComponent {

    @property(Prefab)
    public textCell: Prefab = null!;

    @property(Prefab)
    public imageCell: Prefab = null!;

    @property(Prefab)
    public voiceCell: Prefab = null!;

    @property(Prefab)
    public videoCell: Prefab = null!;

    @property(Prefab)
    public sysCell: Prefab = null!;

    @property(Prefab)
    public customCell: Prefab = null!;

    @property(Prefab)
    public revokedCell: Prefab = null!;

    @property(Prefab)
    public quoteCell: Prefab = null!;

    @property(Prefab)
    public listCell: Prefab = null!;

    @property(Prefab)
    public cardCell: Prefab = null!;

    @property(Prefab)
    public timeCell: Prefab = null!;

    @property(Prefab)
    public loadingCell: Prefab = null!;

    @property(Number)
    timeDiff: number = 300

    @property(Number)
    msgNum: number = 30

    public tableView: TableView = null!;

    private messageList: Message[] = []
    private curTime: number = -1;
    private sessionID: string = ""
    private msgOffset: number = 0


    private nodePool: Map<number, Pool<Node>> = new Map<number, Pool<Node>>();
    triggerLoadingDBMessage: boolean = false;

    onLoad() {
        this.tableView = this.node.getComponent(TableView)!;
        this.tableView.delegate = this;
        // this.tableView.followSizeChange()
        IM.getInstance().on(IMEvent.ON_RECEIVE_MESSAGE, this.onRecvMessage, this)
        super.onLoad()
    }

    protected onEnable(): void {
        // this.tableView.node.on(TableView.EventType.REFRESH_DATA_TOP, this.handleRefreshTop, this)
        this.tableView.node.on(ScrollView.EventType.SCROLL_ENDED, this.handleRefreshTop, this)
    }

    onDestroy(): void {
        IM.getInstance().off(IMEvent.ON_RECEIVE_MESSAGE, this.onRecvMessage, this)
        super.onDestroy()
    }

    handleRefreshTop() {
        console.log("handleRefreshTop")
        this.doLoadDBMessage()
    }

    protected onDisable(): void {
        // this.tableView.node.off(TableView.EventType.REFRESH_DATA_TOP, this.handleRefreshTop, this)
        this.tableView.node.off(ScrollView.EventType.SCROLL_ENDED, this.handleRefreshTop, this)

    }

    @Decorator.OnAppEvent("onChatLoadingShow")
    onChatLoadingShow() {
        this.triggerLoadingDBMessage = true
    }
    async doLoadDBMessage() {
        if (this.triggerLoadingDBMessage) {
            this.triggerLoadingDBMessage = false
            let ret = await IM.getInstance().queryMessage({ sessionID: this.sessionID, limit: this.msgNum, offset: this.msgOffset })
            if (!this.selfValid) {
                return
            }

            for (let i = 0; i < this.messageList.length; i++) {
                const v = this.messageList[i];
                if (v.type === -2) {
                    this.tableView.removeRow(i, 0, 1)
                    this.messageList.splice(i, 1)
                    break
                }
            }


            if (ret) {
                let count = ret.length
                let messageList = this.processMessageWithTime(ret)
                if (messageList.length > 0) {
                    for (let index = messageList.length - 1; index >= 0; index--) {
                        const element = messageList[index];
                        this.messageList.unshift(element)
                    }
                    this.msgOffset = this.msgOffset + count
                    // this.tableView.refreshCellIndex(0, messageList.length, true)
                    this.tableView.refreshCellIndex({ section: 0, offsetIndex: messageList.length, updateHead: true })
                }
                // console.log("doLoadDBMessage", messageList,this.messageList)
            }
        }

    }

    onRecvMessage(message: Message) {
        console.log("ChatTableView:onRecvMessage", message)

        if (message.type === MessageType.Revoked) {
            const revokedMsgID = message.content.msgID;
            let updateIndex = -1;

            for (let i = 0; i < this.messageList.length; i++) {
                const v = this.messageList[i];
                if (v.msgID === revokedMsgID) {
                    updateIndex = i;
                    break;
                }
            }

            if (updateIndex > -1) {
                const updatedMessage = this.messageList[updateIndex];
                updatedMessage.status = MessageStatus.Revoked;
                this.tableView.updateRow(updateIndex, 0, 1);
            }

            //处理撤回的引用消息
            // for (let i = 0; i < this.listData.length; i++) {
            //     const v = this.listData[i];
            //     if (v.type === Define.MessageType.Quote && v.__quoteMessage) {
            //         if (v.__quoteMessage.msgID === revokedMsgID) {
            //             v.__quoteMessage.status = Define.MessageStatus.Revoked;
            //             this.object.updateRow(i, 1);
            //         }
            //     }
            // }
            return
        }

        if (message.isMySelf() && message.clientSeq > 0) {
            let updateIndex = -1
            let array = this.messageList
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element.clientSeq == message.clientSeq) {
                    updateIndex = index
                    break
                }
            }
            if (updateIndex > -1) {
                this.messageList[updateIndex] = message
                Log.w("onRecvMessage", message, updateIndex)
                this.tableView.updateRow(updateIndex, 0, 1)
            } else {
                Log.w("onRecvMessage2", message, this.messageList)
            }
            // if updateIndex then
            //     self.listData[updateIndex] = message
            //     -- dump(updateIndex)
            //     self.object:update_row(updateIndex, 1, true)
            // end
        } else {
            this.insertToBottom(message)
            this.msgOffset = this.msgOffset + 1

        }

    }

    start() {

    }

    createCell(tableView: TableView, index: number, section: number): Node {
        let cell = this.createMessageCell(this.messageList[index], index);
        return cell;
    }

    releaseCell(tableView: TableView, cell: Node, index: number, section: number) {
        let msgType = Number(cell.name);
        let pool = this.nodePool.get(msgType)
        if (pool) {
            pool.free(cell);

        }
        cell.removeFromParent();
    }

    rowCount(tableView: TableView, section: number) {
        return this.messageList.length;
    }

    createSection(tableView: TableView, section: number): Node {
        return null;
    }

    releaseSection(tableView: TableView, section: Node) {
        section.removeFromParent();
        section.destroy();
    }

    setSessionID(sessionID: string) {
        this.sessionID = sessionID
        this.messageList.length = 0
        this.loadLocalMessage()
    }

    getPool(message: Message, cell?: Node): Pool<Node> {
        let msgType = message.type
        if (message.status == MessageStatus.Revoked) {
            // 需要考虑到原先消息是text类型，被回收了 此时没有cell 上 没有 revoked 组件，那么就当成普通的文本类型去回收
            if (cell) {
                if (cell.getComponent(RevokedCell)) {
                    msgType = MessageType.Revoked
                }
            } else {
                msgType = MessageType.Revoked
            }
        }
        let pool = this.nodePool.get(msgType)
        console.log("msgType---->", msgType)

        if (!pool) {
            pool = new Pool<Node>(() => {
                let cell: Node = null;
                switch (msgType) {
                    case MessageType.Text:
                        cell = instantiate(this.textCell);
                        // cell.uuid
                        break;
                    case MessageType.Image:
                        cell = instantiate(this.imageCell);
                        break;
                    case MessageType.Voice:
                        cell = instantiate(this.voiceCell);
                        break;
                    case MessageType.Video:
                        cell = instantiate(this.videoCell);

                        break;
                    case MessageType.Sys:
                        cell = instantiate(this.sysCell);

                        break;
                    case MessageType.Custom:
                        cell = instantiate(this.customCell);

                        break;
                    case MessageType.Revoked:
                        cell = instantiate(this.revokedCell);

                        break;
                    case MessageType.Quote:
                        cell = instantiate(this.quoteCell);
                        break;
                    case MessageType.List:
                        cell = instantiate(this.listCell);
                        break;
                    case MessageType.Card:
                        cell = instantiate(this.cardCell);
                        break;
                    case -1:
                        cell = instantiate(this.timeCell);
                        break;
                    case -2:
                        cell = instantiate(this.loadingCell);
                        break;
                    default:
                        break;
                }
                cell.name = msgType.toString()
                return cell;
            }, 1, (node: Node) => {
                node.destroy();
            })
            // pool.
            this.nodePool.set(msgType, pool)
        }
        return pool
    }

    private createMessageCell(message: Message, index: number): Node {
        // console.time("createMessageCell")
        // console.profile("createMessageCell")
        let pool = this.getPool(message)
        let cell = pool.alloc();
        NodeUtil.broadcastMessage(cell, "updateView", message)
        cell.getComponent(YogaFlex)?.updateLayout()
        // console.profileEnd("createMessageCell")
        return cell;
    }

    private async loadLocalMessage() {
        let ret = await IM.getInstance().queryMessage({ sessionID: this.sessionID, limit: this.msgNum, offset: this.msgOffset })
        if (!this.selfValid) {
            return
        }
        if (ret) {
            let count = ret.length
            let messageList = this.processMessageWithTime(ret)
            if (messageList.length > 0) {
                for (let index = 0; index < messageList.length; index++) {
                    const element = messageList[index];
                    this.messageList.push(element)
                }
                this.msgOffset = this.msgOffset + count
            }
        }
        // this.tableView
        if (this.messageList.length > 0) {
            this.tableView.refresh({
                index: this.messageList.length - 1,
                isFromEnd: true,
            })
        }
    }

    private processMessageWithTime(messageList: Message[]) {
        let temp: Message[] = []
        let count = messageList.length

        if (count == this.msgNum) {
            let t = new Message()
            t.type = -2
            temp.push(t)
        }
        // 倒序遍历messageList
        for (let index = messageList.length - 1; index >= 0; index--) {
            const message = messageList[index];
            if (this.curTime == -1) {
                this.curTime = message.createdAt
            }
            if (this.curTime - message.createdAt > this.timeDiff) {
                let t = new Message()
                t.type = -1
                t.createdAt = message.createdAt
                this.curTime = message.createdAt
                temp.push(t)
            }
            temp.push(message)
        }
        return temp
    }

    public insert(message: Message, index: number) {
        this.messageList.splice(index, 0, message);
        // this.tableView.insertRow(index, 0, 1)
        // this.tableView.refresh(index, 0, true)
        this.tableView.refresh({
            index: index,
            section: 0,
            isFromEnd: true,
            forceUpdate: false,
        })
    }

    public insertToBottom(message: Message) {
        let index = this.messageList.length
        this.insert(message, index)
    }

    deleteMessage(message: any) {
        let index = this.messageList.indexOf(message)
        if (index > -1) {
            this.messageList.splice(index, 1)
            this.tableView.removeRow(index, 0, 1)
            this.msgOffset = this.msgOffset - 1
        }
        IM.getInstance().deleteLocalMessage(message)
    }
}