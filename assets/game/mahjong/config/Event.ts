export enum Event {
    RESET_VIEW = "reset_View",  //重置ui
    SHOE_SETTLE = "show_settle", //显示结算
    SHOW_OP_GROUPS = "show_op_groups", //显示同一操作码的多种操作组合
    ROTATE_START = "rotate_start", //开始转屏
    SHOW_TING_CARDS_INFO = "show_ting_cards_info", //选中某一张牌，显示打出去后的停牌信息
    TOUCH_TABLE = "touch_table", //点击桌面，可做隐藏一些预制体的操作
}