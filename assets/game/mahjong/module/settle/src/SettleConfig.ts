import { OpCode } from "game/mahjong/config/OpCode"

export class SettleConfig {
    static settleItemType = {
        fan: 1,
        gang: 2,
    };
    
    static settleType = {
        Settle_LiuJu   : 1,
        Settle_CommonHu: 2,
        Settle_ZiMo    : 3,
        Settle_QiangHu : 4,
    };
    
    static settleTypeName = {
        Settle_LiuJu   : "打个酱油",
        Settle_CommonHu: "胡",
        Settle_ZiMo    : "自摸",
        Settle_QiangHu : "胡",
    };
    
    static posName = {
        [0]: "本家",
        [1]: "下家",
        [2]: "对家",
        [3]: "上家",
    };
    
    static gangTypeName = {
        [OpCode.OPE_AN_GANG]: "暗杠",
        [OpCode.OPE_PENG_GANG]: "直杠",
        [OpCode.OPE_BU_GANG]: "补杠",
    };

}