import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Session } from 'qsdk/im/core/Session';
import { IM } from 'qsdk/im/IM';
import { ChatTableView } from './ChatTableView';
import { Prefab, instantiate } from 'cc';
import { Decorator, eventSystem, resLoader, uiMgr } from 'bos/exports';
import { MessageOption } from './opt/MessageOption';
import { Message } from 'qsdk/im/core/Message';
import { EventTouch } from 'cc';
import { ChatType } from 'idl/mp/common/social.im';
import { GroupManager } from 'app/modules/social/chatSetting/src/GroupManager';
import { IMEvent, MessageType } from 'qsdk/im/config/define';
import { GroupUser } from 'qsdk/im/db/Model';
import { PhotoSource } from 'app/domain/photo/PhotoSource';
import { js } from 'cc';

@ccclass('ChatView')
export class ChatView extends XComponent {

    @property(Prefab)
    messageOptPrefab: Prefab = null!;

    @property(ChatTableView)
    chatTableView: ChatTableView = null!;

    @property(Node)
    bottomView: Node = null!;

    @property(Label)
    title: Label = null!;

    @property(Node)
    settingBtn: Node = null!;

    private sessionID: string = ""
    private session: Session | null = null
    private messageOptNode: Node | null = null


    start() {

        if (this.chatTableView && this.sessionID) {
            this.chatTableView.setSessionID(this.sessionID)
        }
        console.warn("ChatView start", this.sessionID)
        this.updateTitle()
        if (this.session.message.isGroup()) {
            this.initGroupInfo()
            eventSystem.on(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, this.onSyncGroupUser, this)
            //eventSystem.on(IMEvent.ON_GROUP_INFO_CHANGE, this.onGroupInfoChange, this)
        }
        if(this.session.message.isOfficial()){
            this.settingBtn.active = false
        }else{
            this.settingBtn.active = true
        }

    }

    onDestroy(): void {
        if (this.session.message.isGroup()) {
            eventSystem.off(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, this.onSyncGroupUser, this)
            // eventSystem.off(IMEvent.ON_GROUP_INFO_CHANGE, this.onGroupInfoChange, this)
        }
        super.onDestroy()
    }

    protected onEnable(): void {
        this.updateTitle()
    }

    onSyncGroupUser(groupUser: GroupUser) {
        if (groupUser.groupID === this.session.message.toID) {
            this.updateTitle()
        }
    }

    onGroupInfoChange(message: Message) {
        if (message.sessionID === this.session.sessionID) {
            this.updateTitle()
        }
    }

    updateTitle() {
        if (this.session && this.title) {
            this.session.getTempName({ isShortName: true }).then((name) => {
                if (this.title.isValid) {
                    this.title.string = name
                }
            })
            if (this.session && this.session.name == "" && this.session.message && this.session.message.isGroup()) {
                this.session.getTempName({ forceUpdate: true }) // 如果是群聊，强制检查一下群名字
            }
        }
    }


    async initGroupInfo() {
        await GroupManager.getInstance().initGroup(this.session)
    }

    update(deltaTime: number) {

    }

    setup(params: { sessionID: string, userID?: number }) {
        if (params.userID && params.sessionID == null) {
            let message = new Message()
            message.fromID = IM.getInstance().myUid
            message.toID = params.userID
            message.chatType = ChatType.Single
            let session = IM.getInstance().processor.addTempSession(message)
            params.sessionID = session.sessionID
        }
        this.sessionID = params.sessionID
        this.session = IM.getInstance().getSession(params.sessionID)
        console.warn("ChatView setup", params)

        console.log(this.session.extra)

    }

    // @Decorator.FunctionIntervalDelay(1000)
    onBack() {
        uiMgr.popPage()
    }

    getSession() {
        return this.session
    }

    getChatTableView() {
        return this.chatTableView
    }

    @Decorator.OnAppEvent("onMessageLongPress")
    onLongPressMessage(data: { node: Node, message: Message, eventTouch: EventTouch }) {
        if (this.messageOptNode == null && this.messageOptPrefab) {
            this.messageOptNode = instantiate(this.messageOptPrefab)
            this.messageOptNode.parent = this.node
            let messageOption = this.messageOptNode.getComponent(MessageOption)
            if (messageOption) {
                messageOption.setBottomView(this.bottomView)
                messageOption.setChatTableView(this.chatTableView.node)
            }
        }
        if (this.messageOptNode) {
            this.messageOptNode.active = true
            this.messageOptNode.getComponent(MessageOption)?.updateView(data)
        }
    }
    @Decorator.OnAppEvent("onMessageClick")
    onClickMessage(data: { node: Node, message: Message, eventTouch: EventTouch }) {
        // queryAllMessage
        if (data.message.type === MessageType.Image || data.message.type === MessageType.Video){
            IM.getInstance().getDB().queryAllMessage({ sessionID: data.message.sessionID, simpleWhere: js.formatStr("status < 2001 and (type = %d or type = %d) ", MessageType.Image, MessageType.Video) }).then((messages) => {
                let list: PhotoSource[] = [];
                let defaultPageIndex = 0;
                for (let index = 0; index < messages.length; index++) {
                    const message = messages[index];
                    let info = message.content.info;
                    let ps = new PhotoSource();
                    ps.url = message.content.url
                    ps.info = { width: info.width, height: info.height }
                    list.push(ps);
                    if (message.content.url == data.message.content.url) {
                        defaultPageIndex = index
                    }
                }
                uiMgr.loadPage("common@photo/res/prefab/Photo", { params: { data: list, targetNode: data.node, defaultPageIndex: defaultPageIndex }, activePrev: true })
            })
        }else if(data.message.type === MessageType.Card){

        }


    }

    openSetting() {
        resLoader.loadPrefab("social@chatSetting/res/prefab/ChatSetting", (err, asset) => {
            uiMgr.pushPage(asset, { params: { sessionID: this.sessionID } });
        });
    }


  
}