import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { RoomInfo } from 'app/domain/match/match/data/RoomInfo';
import { TableView } from 'bos/exports';
import { IM } from 'qsdk/im/IM';
import { ChatType, FromType, IMEvent, MessageType, SysCMD } from 'qsdk/im/config/define';
import { Message } from 'qsdk/im/core/Message';
import { Pool } from 'cc';
import { EditBox } from 'cc';
import { App } from 'app/App';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';

@ccclass('ChatView')
export class ChatView extends XComponent {

    @property(TableView)
    tableView : TableView

    @property(EditBox)
    editBox :EditBox

    handler : MatchHandler
    roomInfo : RoomInfo
    groupID : string
    _data : Message[] = []
    _pool : Map<number, Pool<Node>> = new Map()

    onLoad(): void {

    }

    protected start(): void {
    }

    updateView(handler : MatchHandler){
        this.handler = handler
        this.roomInfo = handler.roomInfo
        this.groupID = this.roomInfo.preBaseInfo.getRoomID()
    }


    //====================================================================================================================================
    onSendTouch(){
        console.log("ChatView onSendTouch")
        let str = this.editBox.string
        if (str.length > 0) {
            let msg = new Message()
            msg.isTmp = true
            msg.content = str,
            msg.toID = parseInt(this.groupID),
            msg.type = MessageType.Text,
            msg.chatType = ChatType.Group,
            msg.fromID = App.userMgr.loginUid,
            msg.fromType = FromType.FromTypeUser,

            IM.getInstance().sendMessage(msg)
        }

        this.editBox.textLabel.string = ""
        this.editBox.string = ""
    }

    onMoreTouch(){
        console.debug("ChatView onMoreTouch")
        //TODO
    }

    onDestroy() {

    }
}