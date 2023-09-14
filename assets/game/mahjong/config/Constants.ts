export enum ScreenDir {
    HORIZONTAL,
    VERTICAL
}

export class Constants {
    static GAME_STATE = {
        IsGaming: 1, //游戏中  对应后端的桌子状态
        IsShowCards : 2,//摊牌   对应后端的桌子状态
        IsRegularReset : 3,//赛事清空桌子  前端自己定义的一个状态
    };
    
    static XIAZHU_TYPE = {
        Normal : 0, // 正常下注类型
    };
    
    static XIAZHU_STATE = {
        Start : 0, // 开始下注状态
        Result : 1, // 下注结果状态
        End : 2, // 结束下注状态
    };
    
    static CHANGECARD_TYPE = {
        SameColor : 0, // 换同一花色的牌
        Any : 1, // 换任意花色的牌
    };
    
    static CHANGECARD_STATE = {
        Start : 0, // 开始换牌状态
        Result : 1, // 换牌结果状态
        End : 2, // 结束换牌状态
    };
    
    static DINGQUE_STATE = {
        Start : 0, // 开始定缺状态
        Result : 1, // 定缺结果状态
        End : 2, // 结束定缺状态
    };

    // 结算类型
    static SETTLE_TYPE = {
        Fan                  : 1, // 番钱结算
        Gang                 : 2, // 杠钱结算
        Bet                  : 3, // 下注结算
        ReturnGang           : 4, // 退杠钱
        ChaHuaZhu            : 5, // 查花猪
        ChaJiao              : 6, // 查叫
        RealtimeFan          : 7, // 实时番钱结算
        RealtimeGang         : 8, // 实时杠钱结算
        RealtimeTransferGang : 9, // 实时杠钱转移
        MaiMa                : 10, // 买马
        Death                : 11, // 关死
    };
    
    // 结算风格
    static SETTLE_STYLE = {
        Default                  : 0, // 默认结算
        Realtime                 : 1, // 实时结算
    };
    
    // 玩家状态
    static USER_STATE = {
        Default         : 0, // 默认状态
        WuJiao          : 1, // 无叫状态
        HuaZhu          : 2, // 花猪状态
        Death           : 3, // 关死状态
    };
}