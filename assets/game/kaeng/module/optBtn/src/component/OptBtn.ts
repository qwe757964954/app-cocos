import { Button, Color, Label, Node, Sprite, SpriteFrame, find } from 'cc'
import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Room } from 'game/kaeng/Room';
import { MsgManaged, Table } from 'idl/tss/game/table.v2';
import { GameStage } from 'game/kaeng/model/GameData';
import { CardView } from 'game/room/module/card/src/CardView';
import { HandCardView } from 'game/room/module/handCardView/src/component/HandCardView';
import { CardStack } from 'game/room/framework/card/CardStack';
import { CardTypesConst } from 'game/kaeng/src/config/GameConfig';
import { IOpResult, KaengTable, MsgPlayCardInfo, MsgPlayResult, MsgTableInfo, Opcode } from 'game/kaeng/idl/tss/thailand/kaeng';

const LabColors = {
    Gray: '#494949',
    Green: '#315844',
    Yellow: '#713C1F',
};

@ccclass('OptBtn')
export class OptBtn extends XComponent {
    @property(Node)
    dropCardNode: Node

    @property(Node)
    openCardNode: Node

    @property(Node)
    drawCardNode: Node

    @property(Node)
    followCardNode: Node

    @property(Node)
    btnViewsNode: Node

    @property(SpriteFrame)
    YellowFrame: SpriteFrame;

    @property(SpriteFrame)
    GrayFrame: SpriteFrame;

    @property(Label)
    tipLab: Label;


    public handCardView: HandCardView;

    onLoad(): void {
        this.updateBtnView();
        Room.eventSystem.on(Table.NotifyManaged.name, this.onNotifyManaged, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(KaengTable.NotifyShowCard.name, this.onNotifyShowCard, this);
        Room.eventSystem.on(KaengTable.NotifyPlayStart.name, this.onNotifyPlayStart, this);
        Room.eventSystem.on(KaengTable.NotifyPlayResult.name, this.onNotifyPlayResult, this);
        Room.eventSystem.on(KaengTable.NotifyGameResult.name, this.onNotifyGameResult, this);
        this.handCardView = this.handCardView || find('Canvas/contentLayer/HandCardView')?.getComponent(HandCardView);
        this.handCardView.node.on('NotifyCardPopup', this.onNotifyCardPopup, this);
    }

    onDisable() {
        Room.eventSystem.removeAll(this);
        this.handCardView.node.off('NotifyCardPopup', this.onNotifyCardPopup, this);
    }

    onNotifyCardPopup() {
        this.btnViewsNode.active && this.dropCardNode.active && this.updateDropCard();
    }

    onNotifyManaged(data: MsgManaged) {
        this.updateBtnView();
    }

    onNotifyReconnect(data: MsgTableInfo) {
        this.updateBtnView(true);
    }

    onNotifyPlayStart(data: MsgPlayCardInfo) {
        this.updateBtnView(data.uid == Room.gameData.getMyID(), data.opcode);
    }

    onNotifyPlayResult(data: MsgPlayResult) {
        this.updateBtnView();
    }

    onNotifyShowCard() {
        this.updateBtnView();
    }

    onNotifyGameResult() {
        this.updateBtnView();
    }

    updateBtnView(bool: boolean = false, opcode: number[] = []) {
        if (bool) {
            let isAI = Room.gameData.getMySelf().isAI;
            let isPlay = Room.gameData.curStage == GameStage.PlayCard;
            let isMe = Room.roundInfo.getOptUid() == Room.gameData.getMyID();
            this.btnViewsNode.active = !isAI && isPlay && isMe;
            if (this.btnViewsNode.active) {
                // let opcodeStr = ['摸 牌', '跟 牌', '开 牌', '弃牌'];
                let btnViews = [this.drawCardNode, this.followCardNode, this.openCardNode, this.dropCardNode];
                for (let i = 0; i < btnViews.length; i++) {
                    btnViews[i].active = opcode.includes(i + 1);
                }
            }
            this.onNotifyCardPopup();
        } else {
            this.btnViewsNode.active = false;
        }
    }

    updateDropCard() {
        let popupCards = this.handCardView.getPopUpCard();
        this.dropCardNode.getComponent(Button).interactable = popupCards.size > 0;
        this.dropCardNode.getComponent(Sprite).spriteFrame = popupCards.size > 0 ? this.YellowFrame : this.GrayFrame;
        this.dropCardNode.getChildByName('Label').getComponent(Label).color = new Color(popupCards.size > 0 ? LabColors.Yellow : LabColors.Gray);
    }

    onClickDrawCard() {
        this.sendToServer(Opcode.OpcodeDrawCard);
    }

    onClickFollowCard() {
        let optionInfo = Room.roundInfo.getUserOpInfo(1);
        let targetUid = optionInfo?.follow_card_opt?.target?.targetUid;
        this.sendToServer(Opcode.OpcodeFollowCard, { follow_card_info: { targetUid: targetUid } });
    }

    onClickOpenCard() {
        this.sendToServer(Opcode.OpcodeShowCard);
    }

    onClickDropCard() {
        let popupMap = this.handCardView.getPopUpCard();
        if (popupMap.size > 0) {
            let cards: number[] = [];
            for (const [k, v] of popupMap) {
                cards.push(v.getComponent(CardView).cardByte)
            }
            let outCardStack = new CardStack({ bytes: cards });
            let outCardInfo = Room.cardEngine.checkCardInfo(outCardStack);
            console.log('==OptBtn.onClickDropCard==', popupMap, outCardStack, outCardInfo);
            let cardTypes = [CardTypesConst.CT_SINGLE, CardTypesConst.CT_PAIR, CardTypesConst.CT_THREE, CardTypesConst.CT_FOUR];
            if (cardTypes.includes(outCardInfo.type)) {
                this.sendToServer(Opcode.OpcodeDropCard, { drop_card_info: { card: cards } });
            } else {
                // 提示弃牌不符合规范
                this.tipLab.node.parent.active = true;
                this.tipLab.string = '弃牌不符合规范';
            }
        } else {
            // 提示未选牌
            this.tipLab.node.parent.active = true;
            this.tipLab.string = '暂未选择牌';
        }
    }

    sendToServer(opcode: number, opResult: IOpResult = {}) {
        console.log(' OptBtn.SendToServer , data: ', opcode, opResult);
        opResult.uid = Room.gameData.getMyID();
        Room.msgHandler.sendTableAction(KaengTable.DoOperate, {
            opcode: opcode,
            data: opResult,
        });
    }

}