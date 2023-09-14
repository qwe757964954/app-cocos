export enum Event {
    RESET_VIEW = "reset_View",  //重置ui
    POPUP_CARD_CHANGE = "popup_card_change",  //提起的牌有变化，大米在操作时，如果提起的牌有变化，需要进行判断，以更新按钮状态
}