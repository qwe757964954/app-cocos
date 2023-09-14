import { HandCard, OperateData, OperateResultInfo } from "../idl/tss/mahjong/extendtable"

export type SetCardInfo = {
    cards?: number[],  //手牌（我）
    count?: number,    //手牌数量（其他玩家）
    seat: number,      //本地座位号
    isReconnect: boolean,  //是否为重连
} 

export type SetOpGroups = {
    opDataList: OperateData[], 
    seat: number,
} 

export type PlayerOutCards = {
    outCards: number[], 
    seat: number,
} 

export type PlayerSpreadCards = {
    handCard: HandCard, 
    seat: number,
} 

export type PlayerOpResult = {
    opResult: OperateResultInfo, 
    seat: number,
}