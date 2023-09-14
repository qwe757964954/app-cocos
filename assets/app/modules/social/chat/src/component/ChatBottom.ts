import { _decorator, Button, Node, instantiate, Prefab, Label, EditBox } from 'cc';
import { XComponent } from 'bos/framework/component/XComponent';
import { Decorator, Log, uiMgr } from 'bos/exports';
import { ChatView } from './ChatView';
import { IM } from 'qsdk/im/IM';
import { Message } from 'qsdk/im/core/Message';
import { IMEvent, MessageType } from 'qsdk/im/config/define';
import { App } from 'app/App';
import { GalleryX } from 'platform/GalleryX';
import { Session } from 'qsdk/im/core/Session';
import { OfficialAccount } from 'qsdk/officialAccount/OfficialAccount';
import { MenuContains } from './official/MenuContains';
import { IGetMenusByChatReq } from 'idl/mpff/social/officialaccount.v1';
import { IMessageCard, MessageCard_CardType } from 'idl/mp/common/social.im';

const { ccclass, property } = _decorator;

@ccclass('ChatBottom')
export class ChatBottom extends XComponent {

    @property(Node)
    keyboardNode: Node = null!;

    @property(Node)
    voiceNode: Node = null!;

    @property(Node)
    holdTalkNode: Node = null!;

    @property(Node)
    editNode: Node = null!;

    @property(EditBox)
    editBox: EditBox = null!;

    @property(Node)
    quoteNode: Node = null!;

    @property(Label)
    quoteLabel: Label = null!;

    @property(Prefab)
    bottomPrefabs: Prefab[] = [];

    @property(Button)
    quickTextBtn: Button = null!;

    @property(Button)
    moreBtn: Button = null!;

    @property(Button)
    sendBtn: Button = null!;

    @property(Node)
    menusContains: Node = null;

    @property(Node)
    chatOpt: Node = null;

    quoteMessage: Message | null = null

    isShowMenus: boolean = false

    private pages: Map<number, Node> = new Map();

    @property(Node)
    private pageNode: Node | null = null;

    onLoad(): void {
        super.onLoad();
        IM.getInstance().on(IMEvent.ON_PREPARE_SEND_MESSAGE, this.onPreInsertLocalMessage, this)
        this.editBox.node.on('text-changed', this.onTextChanged, this);
    }

    start() {
        let tableView = this.getChatTableView()
        tableView.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)

        let session: Session = this.getSession()
        if (session.message.isOfficial()) {
            this.menusContains.active = true
            this.chatOpt.active = false
            this.initOfficialAccountMenu()
        } else {
            this.updateInputStatus()
            this.menusContains.active = false
            this.chatOpt.active = true
        }
    }

    onTouchStart(ev: TouchEvent) {
        this.hidePages()
    }

    //更新底部栏，语音和键盘切换
    updateInputStatus(isVoice?: boolean) {
        if (!this.voiceNode) return
        if (!this.editNode) return
        if (!this.holdTalkNode) return
        if (!this.keyboardNode) return
        if (isVoice) {
            this.voiceNode.active = false
            this.editNode.active = false
            this.holdTalkNode.active = true
            this.keyboardNode.active = true
        } else {
            this.voiceNode.active = true
            this.editNode.active = true
            this.holdTalkNode.active = false
            this.keyboardNode.active = false
        }
    }

    clickVoice() {
        this.updateInputStatus(true)
    }

    clickKeyboard() {
        this.updateInputStatus(false)
    }


    holdToTalk() {
        console.log("holdToTalk,开始录音")
    }

    onPreInsertLocalMessage(msg: Message) {
        // insertToBottom
        let tableView = this.getChatTableView()
        if (tableView) {
            tableView.insertToBottom(msg)
        }
        Log.w(msg, "onPreInsertLocalMessage")
    }

    onTextChanged(editBox: EditBox) {
        let str = editBox.string
        // Log.w(str)
    }

    @Decorator.OnAppEvent("onSendClick")
    onSendClick() {
        if (!this.editBox.string) return
        if (this.editBox.string.length == 0) {
            uiMgr.showToast("不能发送空消息")
            return
        }
        let str = this.editBox.string
        this.editBox.string = ""
        this.editBox.setFocus()//重置焦点，不然新的string不会显示
        this.updateBottomBtn()
        let msg = new Message()
        if (this.quoteMessage) {
            msg.type = MessageType.Quote
            msg.content = { msgID: this.quoteMessage.msgID, content: str }
            this.quoteMessage = null
            this.quoteNode.active = false
        } else {
            msg.content = str
            msg.type = MessageType.Text
        }
        this.sendMessage(msg)
    }

    @Decorator.OnAppEvent("onMessageQuote")
    onQuoteMessage(quoteMessage) {
        this.quoteMessage = quoteMessage
        this.quoteNode.active = true
        this.quoteLabel.node.active = true
        if (quoteMessage.type == MessageType.Text || quoteMessage.type == MessageType.Quote) {
            App.userMgr.getUserByID(quoteMessage.fromID).finish().then((user) => {
                let content = quoteMessage.content
                if (quoteMessage.type == MessageType.Quote) {
                    content = quoteMessage.content.content
                }
                this.quoteLabel.string = user.nickname + ":" + content
                console.log(this.quoteLabel.string, "this.quoteLabel.string", this.quoteLabel.node.activeInHierarchy)
            })
        } else if (quoteMessage.type == MessageType.Image) {
            App.userMgr.getUserByID(quoteMessage.fromID).finish().then((user) => {
                this.quoteLabel.string = user.nickname + ":[图片]"
            })
        }
    }

    @Decorator.OnAppEvent("onChatMessageDelete")
    onChatMessageDelete(message) {
        let tableView = this.getChatTableView()
        tableView.deleteMessage(message)
    }

    @Decorator.OnAppEvent("onQuickTextClick")
    onQuickTextClick(text: string) {
        let msg = new Message()
        msg.content = text
        msg.type = MessageType.Text
        this.sendMessage(msg)
    }

    @Decorator.OnAppEvent("onDeleteClick")
    onDeleteClick() {
        let str = this.editBox.string
        str = str.substring(0, str.length - 1)
        this.editBox.string = str
        this.editBox.setFocus()
        this.updateBottomBtn()
    }

    @Decorator.OnAppEvent("onEmojiClick")
    onEmojiClick(emoji: string) {
        let str = this.editBox.string
        str += '[' + emoji + ']'
        this.editBox.string = str
        this.editBox.setFocus()
        this.updateBottomBtn()
    }

    //点击gif，发送gif
    @Decorator.OnAppEvent("onGIFClick")
    onGIFClick(index: string) {
        console.log(index, "发送gif")
        let msg = new Message()
        msg.type = MessageType.Custom
        msg.content = { customType: 10016, content: { type: 1, index: index } }
        this.sendMessage(msg)
    }

    onQuoteDelClick() {
        // this.chooseFileWeb(".png")
        this.quoteMessage = null
        this.quoteNode.active = false
    }

    @Decorator.OnAppEvent("ChatSelectPicture")
    async onPictureClick() {
        // this.chooseFileWeb(".png")
        let ret = await GalleryX.openCustomGalleryImage(1, true)
        let image = ret.files[0]
        let msg = new Message()
        msg.toID = this.getSession()?.message.otherID()
        msg.type = MessageType.Image
        msg.chatType = this.getSession()?.message.chatType
        let imageSize = await image.getImageSize()
        let info = {
            width: imageSize.width,
            height: imageSize.height,
            type: 1,
            size: image.fileSize,
            name: image.name,
            suffix: "." + image.name.split(".").pop()
        }
        let buffer = await image.arrayBuffer()
        IM.getInstance().sendImage(msg, { buffer: buffer, info: info })

    }

    @Decorator.OnAppEvent("ChatSendReward")
    onRewardClick(type: string) {
        let msg = new Message()
        msg.type = MessageType.Custom
        msg.content = { customType: 10015, content: { type: type } }
        this.sendMessage(msg)
    }

    @Decorator.OnAppEvent("ChatSendDice")
    onDiceClick() {
        let msg = new Message()
        msg.type = MessageType.Custom
        msg.content = { customType: 10011 }
        this.sendMessage(msg)
    }

    getSession() {
        return this.node.getComponent(ChatView)?.getSession()
    }
    getChatTableView() {
        return this.node.getComponent(ChatView)?.getChatTableView()
    }

    onShowBottomContainer(event: Event, customEventData: string) {
        this.showPages(parseInt(customEventData) - 1)
    }

    showPages(index: number) {
        this.pageNode.active = true
        let page = this.pages.get(index)
        if (page == null) {
            for (let i = 0; i < this.bottomPrefabs.length; i++) {
                if (i == index) {
                    let node = instantiate(this.bottomPrefabs[i])
                    this.pageNode.addChild(node)
                    this.pages.set(index, node)
                    page = node
                    break
                }
            }
        }
        this.pages.forEach((value, key) => {
            if (value == page) {
                value.active = true
            } else {
                value.active = false
            }
        })
    }

    hidePages() {
        this.pageNode.active = false
    }

    async sendMessage(msg: Message) {
        let session = this.getSession()
        msg.toID = session.message.otherID()
        msg.chatType = session.message.chatType
        Log.i("sendMessage", msg)
        IM.getInstance().sendMessage(msg)
    }

    updateBottomBtn() {
        let str = this.editBox.string
        if (str.length > 0) {
            this.sendBtn.node.active = true
            this.quickTextBtn.node.active = false
            this.moreBtn.node.active = false
        } else {
            this.sendBtn.node.active = false
            this.quickTextBtn.node.active = true
            this.moreBtn.node.active = true
        }
    }

    async initOfficialAccountMenu() {
        let session: Session = this.getSession()
        if (session) {
            let message: Message = session.message
            let chatID = message.otherID()
            let req: IGetMenusByChatReq = {
                chatID: chatID,
            };
            OfficialAccount.getInstance().hotQuestionQuery(req);

            Log.i('OfficialAccount:GetMenusByChat', req);
            let { err, resp } = await OfficialAccount.getInstance().getMenusByChat(req)
            if (!err && this.node.isValid) {
                let menus = resp.menus.menus
                if (!menus || menus.length == 0) {

                } else {
                    let ctr: MenuContains = this.menusContains.getComponent(MenuContains)
                    ctr.updateView(resp)
                }
            }
        }
    }

    onClickSwitchOfficialMode() {
        if (this.isShowMenus) {
            this.onSwitchToChat()
        } else {
            this.onSwitchToOfficial()
        }
    }

    onSwitchToChat() {
        this.isShowMenus = false
    }

    onSwitchToOfficial() {
        this.isShowMenus = true
    }


    @Decorator.OnAppEvent("ChatSelectCard")
    async onClickSendCard() {
        console.log("onClickSendCard")

        let msg = new Message()
        let content: IMessageCard = {
            type: MessageCard_CardType.Single,
            userID: IM.getInstance().myUid
        }
        msg.content = content
        msg.type = MessageType.Card
        this.sendMessage(msg)
    }



}