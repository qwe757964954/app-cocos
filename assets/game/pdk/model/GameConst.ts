
export enum Identity {
    Normal = 0,
    Dealer = 1
}

export enum WinType {
    Player = 0, // 闲家赢
    Dealer = 2 // 庄家赢
}

export enum GameStage {
    Default = "",                   // 等待
    GameStart = "GameStart",        // 开始
    DealCard = "DealCard",          // 发牌
    PlayCard = "PlayCard",          // 出牌
    Settle = "Settle",              // 结算
    CallScore = "CallScore",        // 叫分
    GameEnd = "GameEnd",            // 结束
    Double = "Double",              // 加倍
    CallDealer = "CallDealer",      // 抢地主
}


export enum ScoreType {
    Base = -1,                      // 基础倍数
    Bomb = 0,                       // 炸弹
    LeftCards = 1,                  // 剩余牌张数
    ShutCards = 2,                  // 关牌
    Spring = 3,                     // 春天
    Capture = 4,                    // 抓分
    Rank = 5,
    CallScore = 6,                  // 叫分
	CallDealer = 7,                 // 抢地主
	RaiseScore = 8,                 // 加倍
    // 底牌倍数
    BottomBonusSameColor = 9,       // 底牌同花牌型加成
    BottomBonusSameValue = 10,      // 底牌同点牌型加成
	BottomBonusLineValue = 11,      // 底牌顺子牌型加成
	BottomBonusRocket = 12,         // 底牌火箭牌型加成
	BottomBonusRedJoker = 13,       // 底牌大王牌型加成
	BottomBonusBlackJoker = 14,     // 底牌小王牌型加成
    
    ScoreTypeTask = 15,             // 牌局任务
    openCard = 16,                  // 明牌
    baWangCall = 17,                // 霸王叫
}

export class BottomBonusName {
    '9' = "同花";
    '10' = "同点";
    '11' = "顺子";
    '12' = "火箭";
    '13' = "大王";
    '14' = "小王";
}

//抢地主
export enum OPCODE {
    PASS = 0,                       // 不叫
    CALL_DEALER = 1,             // 叫地主
	CALL_DEALER_FORCE = 2,           // 抢地主
    RAISE_SCORE = 1,               // 加倍
    SUPER_RAISE_CORE = 2,               // 超級加倍
    OPEN_CARD = 3,                  // 明牌
    BAWANG_CALL = 4,                // 霸王叫
}

//牌局内任务类型
export enum TaskType { 
    TaskTypeLastPlayCard = 1,  //最后一手牌
}
