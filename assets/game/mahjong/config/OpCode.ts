export enum OpCode {
    OPE_GRAB = 0x0000, // 抓牌
    OPE_PASS = 0x0001, // 过
    OPE_OUT_CARD = 0x0002, // 出牌
    OPE_FOLD = 0x0003, // 弃牌
    OPE_FEN_ZHANG = 0x0004, // 分张
    OPE_LANG_QI_OUT_CARD = 0x0005, // 廊起出牌

    OPE_CHI = 0x0101, // 吃
    OPE_PENG = 0x0201, // 碰

    OPE_AN_GANG = 0x0301, // 暗杠
    OPE_PENG_GANG = 0x0302, // 碰杠
    OPE_BU_GANG = 0x0303, // 补杠

    OPE_HU = 0x0401, // 点炮
    OPE_ZI_MO = 0x0402, // 自摸胡
    OPE_QIANG_HU = 0x0403, // 抢（杠）胡

    OPE_TING = 0x0501, // 通用听牌
    OPE_JIA_TING = 0x0502, // 夹听
    OPE_LANG_QI = 0x0503, // 廊起

    OPE_FAN_BAO = 0x0601, // 翻宝
    OPE_KAN_BAO = 0x0602, // 看宝
    OPE_HUAN_BAO = 0x0603, // 换宝
}