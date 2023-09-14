export const PBRegularCommon = {
    UserStatusUnknown : 0,
    UserStatusEntry : 1,
    UserStatusReady : 2,
    UserStatusPlaying : 3,
    UserStatusOut : 4,
    UserStatusWaitRevival : 5,
    UserStatusBye : 6,
    UserStatusWait : 7,
    UserStatusWaitOver : 8,

    TableStatusUnknown : 0,
    TableStatusFree : 1,
    TableStatusBye : 2,
    TableStatusCoordinate : 3,
    TableStatusEnd : 4,
    TableStatusPlaying : 5,

    DynamicPoolIncModeUnknow : 0,
    DynamicPoolIncModeFix : 1,
    DynamicPoolIncModeByEnter : 2,
    DynamicPoolIncModeByPercentage : 3,
    DynamicPoolIncModeByPermil : 4,


    LiveRoomTypeUnknown : 0,
    LiveRoomTypeOfficial : 1,
    LiveRoomTypePersonal : 2,


    MatchTagTypeUnknown : 0,
    MatchTagTypeSmallPrize : 1,
    MatchTagTypeBigPrize : 2,
    MatchTagTypeWeekly : 3,
    MatchTagTypeSuperLeague : 4,
    MatchTagTypeNovice : 5,
    MatchTagTypePremium : 6,
    MatchTagTypeHourly : 7,  
    MatchTagTypeDaily : 8,  
    MatchTagTypeMonthly : 9,

    MatchSpecialUnknown : 0,
    MatchSpecialWeekly : 1,
    MatchSpecialMonthly : 2,
    MatchSpecialSeason : 3,
    MatchSpecialPreparation : 4,
    MatchSpecialThrough : 5,
    MatchSpecialMaster : 6,

    //未知
    MatchListDisplayStyleUnknown : 0,
    //小卡片
    MatchListDisplayStyleSmallCard : 1,
    //大卡片
    MatchListDisplayStyleBigCard : 2,

    MatchTypeUnknown : 0,    
    /**
     * 定时
     */
    MatchTypeTiming : 1,
    /**
     * sit and go 坐满即开
     */
    MatchTypeSNG : 2,
    /**
     * 匹配赛
     */
    MatchTypeMate : 3,

    SubMatchTypeUnknown : 0,
                        
    /**
     * 团体赛标识
     */
    SubMatchTypeTeam : 1,
                
    /**
     * 普通比赛
     */
    SubMatchTypeNormal : 2,


    CycleModeUnknown : 0,
            
    /**
     * 列表循环
     */
    CycleModeInList : 1,
                
    /**
     * 房间内循环
     */
    CycleModeInRoom : 2,

    StageTypeUnkown : 0,
                        
    /**
     * 打立出局
     */
    StageTypeStrike : 1,
                
    /**
     * 定局积分
     */
    StageTypeFinality : 2,

    StageEndTypeUnknown : 0,
                        
    /**
     * 按照人数线淘汰
     */
    StageEndTypeByUserNum : 1,
                
    /**
     * 按照时间淘汰
     */
    StageEndTypeByTime : 2,
                
    /**
     * 玩家人数和时间结束（两个条件都使用，时间先到就用时间，人数先到就用人数）
     */
    StageEndTypeByUserNumAndTime : 3,
                
    /**
     * 局数
     */
    StageEndTypeByGameNum : 4,
                
    /**
     * 团队方式淘汰
     */
    StageEndTypeByTeam : 5,

    PrizeTypeUnknown : 0,
                        
    /**
     * 固定奖励
     */
    PrizeTypeFixed : 1,
                
    /**
     * 动态奖励
     */
    PrizeTypeDynamic : 2,
                
    /**
     * 团队固定奖励
     */
    PrizeTypeFixedTeam : 3,
                
    /**
     * 新版动态奖池+固定奖励
     */
    PrizeTypeFixedAndDynamic : 4,


    PunishmentTypeUnknown : 0,
                
    /**
     * 托管即惩罚 托管获胜，不得分，得分全部给队友，失败承担队友损失；
     */
    PunishmentTypeSeverity : 1,
                
    /**
     * 托管方输了才惩罚 托管获胜，正常得分，失败承担队友损失；
     */
    PunishmentTypeNormal : 2,

    CoordinateModeUnknown : 0,
                        
    /**
     * 瑞士移位
     */
    CoordinateModeSwiss : 1,
                
    /**
     * 蛇形移位
     */
    CoordinateModeSnake : 2,
                
    /**
     * 无重复配桌（打立出局棋类使用）
     */
    CoordinateModeOnce : 3,
                
    /**
     * 随机配桌（打立出局使用）
     */
    CoordinateModeWeight : 4,
                
    /**
     * 无重复队友（打立出局使用）
     */
    CoordinateModeTeammate : 5,
                
    /**
     * 无重复配桌（定局积分棋类使用）
     */
    CoordinateModeTryOnce : 6,
                
    /**
     * 随机配桌
     */
    CoordinateModeRandom : 7,
                
    /**
     * 通过团队
     */
    CoordinateModeTeam : 8,
    

    DeclarerModeUnknown : 0,
                        
    /**
     * 逆时针叫主
     */
    DeclarerModeContrarotate : 1,
                
    /**
     * 随机叫主
     */
    DeclarerModeRandom : 2,


    BaseScoreIncTypeUnknown : 0,
                        
    /**
     * 固定增长
     */
    BaseScoreIncTypeFixed : 1,
                
    /**
     * 比例增长
     */
    BaseScoreIncTypeRatio : 2,
                
    /**
     * 定值增长
     */
    BaseScoreIncTypeAdd : 3,
                
    /**
     * 自定义 区间端配置
     */
    BaseScoreIncTypeTimeRange : 4,

    SettlementTypeUnknown : 0,
                        
    /**
     * 基于底分和倍率结算
     */
    SettlementTypeBasedOnBaseScore : 1,
                
    /**
     * 基于配置固定结算
     */
    SettlementTypeFixed : 2,
                
    /**
     * 基于队伍结算
     */
    SettlementTypeTeam : 3,

    RevivalTypeUnknown : 0,
                        
    /**
     * 使用VIP 身份复活
     */
    RevivalTypeVip : 1,
                
    /**
     * 使用资产复活
     */
    RevivalTypeAsset : 2,
                
    /**
     * 可使用vip或道具复活
     */
    RevivalTypeVipOrAsset : 3,
                
    /**
     * 未来可以增添的选项，用以表明该字段未2进制增加
     */
    RevivalTypeFuture : 4,


    UserScoreModeUnknown : 0,
            
    /**
     * 固定比例
     */
    UserScoreModeFixedRatio : 1,
                
    /**
     * 开方后按比例带分
     */
    UserScoreModeSqrtAndRatio : 2,

    PromotionTypeUnknown : 0,
                        
    /**
     * 全局玩家排名
     */
    PromotionTypeUserRank : 1,
                
    /**
     * 桌子里面玩家排名
     */
    PromotionTypeTableRank : 2,
                
    /**
     * 桌子里面的一局结束后的胜负结果
     */
    PromotionTypeTableResult : 3,


    OutScoreIncTypeUnknown : 0,
                        
    /**
     * 基于基础分
     */
    OutScoreIncTypeBasedOnBaseScore : 1,
                
    /**
     * 固定增长
     */
    OutScoreIncTypeFixed : 2,
                
    /**
     * 固定不变
     */
    OutScoreIncTypeConstant : 3,
                
    /**
     * 自定义 时间区间
     */
    OutScoreIncTypeTimeRange : 4,

    ObserveViewUnknown : 0,
                        
    /**
     * 全局围观 上帝视角
     */
    ObserveViewEveryPlayer : 1,
                
    /**
     * 单人围观 仅看一个玩家手牌
     */
    ObserveViewSignalPlayer : 2,


    SchedulerTypeUnknown : 0,
                        
    /**
     * 一次
     */
    SchedulerTypeOnce : 1,
                
    /**
     * 每日一次
     */
    SchedulerTypeDailyOnce : 2,
                
    /**
     * 每日循环
     */
    SchedulerTypeCycle : 3,
                
    /**
     * 期末循环
     */
    SchedulerTypePeriodEnd : 4,


    RefactorVerV1 : 0,
            
    /**
     * 重构版本  调度tss.match.v2.scheduler.v2
     */
    RefactorVerV2 : 1,

    MatchStatusUnknown : 0,
                        
    /**
     * 未开始
     */
    MatchStatusInit : 1,
                
    /**
     * 运行中
     */
    MatchStatusRunning : 2,
                
    /**
     * 结束
     */
    MatchStatusOver : 3,
                
    /**
     * 异常结束
     */
    MatchStatusAbort : 4,
                
    /**
     * 自建赛空闲中 房间创建后，赛事创建前
     */
    MatchStatusIdle : 5,

    /**
     * 
     */
    EntryUserRuleTypeUnknown: 0,

    /**
     * 
     */
    EntryUserRuleTypeAll: 1,

    /**
     * 
     */
    EntryUserRuleTypeNovice: 2,

    /**
     * 尊享卡
     */
    EntryUserRuleTypeVip: 3,

    /**
     * vip会员
     */
    EntryUserRuleTypeMember: 4,

    /**
     * 用户等级经验
     */
    EntryUserRuleTypeCareerExp: 5,

    /**
     * 用户称号等级
     */
    EntryUserRuleTypeTitleLevel: 6,

    /**
     * 
     */
    EntryNodeTypeUnknown: 0,
            
    /**
     * 
     */
    EntryNodeTypeFree: 1,
                
    /**
     * 
     */
    EntryNodeTypeAsset: 2,
                
    /**
     * 
     */
    EntryNodeTypeVip: 3,
                
    /**
     * 
     */
    EntryNodeTypeExp: 4,
                
    /**
     * 
     */
    EntryNodeTypeAnd: 100,
                
    /**
     * 
     */
    EntryNodeTypeOr: 101,
                
    /**
     * 
     */
    EntryNodeTypeSelect: 102,
    

    GameResultTypeUnknown : 0,
    //赢
    GameResultTypeWin : 1,
    //输
    GameResultTypeLoss : 2,
    //平
    GameResultTypeDraw : 3,



    //范围:  1001 ~ 100000
    CodeOk            : 0,
    CodeNoSuchMatch   : 1001,
    CodeNoEnoughAsset : 1002,
    // 重复进入
    CodeEnterUserRepetitiveEntry : 1100,
    // 资产不足
    CodeEnterInsufficientAsset : 1101,
    // 会员等级不够
    CodeEnterInsufficientVipLevel : 1102,
    // 经验不足
    CodeEnterInsufficientExp : 1103,
    //未报名
    CodeEnterNotEnter : 1104,
    //主持人还没发奖
    CodeNoEmceeAward : 1105,
    // 报名人数已满
    CodeEnterUserIsFull : 1106,
    //不在复活等待状态
    CodeIsNotRevival : 1107,
    //复活条件不足
    CodeCanNotRevival : 1108,
    //复活时间已过
    CodeRevivalTimeOut : 1109,
    
    //未在赛前桌内
    CodePreTableNotIn : 1110,
    //桌子未找到
    CodePreTableNotFound : 1111,
    //座位已被占住
    CodePreTableSeatOccupied : 1112,
    //奖池没有被注入
    CodePoolIsNotPour : 1113,
    //被踢玩家不允许进入
    CodeUserIsKicked : 1114,
    //开赛失败的比赛不允许报名
    CodeMatchStartFail : 1115,
    //比赛即将开赛
    CodeMatchNearStart : 1116,
    //每个用户只能创建一个比赛
    CodeUserHadCreatePreMatch : 1117,
    //自建赛主持人退出房间 房间内用户数量不为0 进行弹框二次确认
    CodeHostLeaveRoomNeedConfirm : 1118,
    
    //赛中状态 禁止操作
    CodeMatchIsPlaying : 1119,
    //用户报名身份跟比赛限制身份不一致
    CodeUserRuleInconsistent : 1120,
    //用户已报名且准备了其它场次,当前禁止再报名其他已处于准备阶段的定时赛、延时入场比赛、盯人赛
    CodeUserHadReadyOtherMatch : 1121,
    //桌子服务桌子数量不足，比赛失败
    CodeTableNotEnough : 1122,
    
    CodeFailedToStartMatchAsNoEnoughUser : 1200,
    //自建赛已创建
    CodeSelfMatchIsBuilded : 1201,
    //自建赛非创建者不能解散
    CodeDisbandPreMatchNotCreator : 1202,
    
    
    // 加入失败，非法的口令
    CodeJoinFailedAsInvalidToken : 1300,
    //重复请求
    CodeRepeatedRequest : 1301,
    //体力值
    CodeStrengthNotEnough    : 1500,  // 体力值不足
    CodeStrengthConfNotExist : 1501,  // 体力值配置不存在
    
    //匹配场保留1500-1600
    CodeSessionNotExist         : 1502,
    CodeSessionClosed           : 1503,
    CodeSessionAssetNotEnough   : 1504,
    CodeDeskReadyToStartMatch   : 1505,
    CodeQueueNotExist           : 1506,
    CodeAlreadyInMatchOrMatched : 1507,
    CodeSessionNotVip           : 1508,
    //超过当前场次能进入的资产上限
    CodeSessionAssetGreatThan   : 1509,
    //桌子不存在
    CodeDeskNotExist  : 1510,
    //桌子中已经处于准备状态
    CodeDeskHadReady  : 1511,
    //桌子中该用户不存在
    CodeDeskUserNotExist : 1512,
    //桌子中用户已经准备了
    CodeDeskUserHadReady : 1513,
    //用户处于队伍匹配下
    CodeAlreadyInMateTeam : 1514,
    //比赛不支持跳转
    CodeMatchNotSupportJump : 1515,
    
    //当前会员等级无法享受此特权
    CodeDelayEnterNoPermission  : 1601,
    //当前赛事阶段不支持延时入场
    CodeDelayEnterNoSupport  : 1602,
    //当前赛事已结束
    CodeDelayEnterMatchIsOver  : 1603,
    //当前赛事没开启延迟入场
    CodeDelayEnterMatchDisable  : 1604,
    //用户未报名比赛
    CodeDelayEnterMatchNotEntry  : 1605,
    //用户未及时进入比赛
    CodeDelayEnterMatchTimeOut   : 1606,
    
    //报名失败 比赛已达最大参赛人数
    CodeEnterMatchExceedMaxNum   : 1608,
    
    // 剩余人数已达晋级人数，暂不允许退场
    CodeForbiddenLeftNumNotEnough : 1609,
    // 该用户不满足阶段结束退场
    CodeNotSupportStageEndQuit : 1610,
    // 该用户确定晋级 不允许退场
    CodeForbiddenConformProm : 1611,
    
    //队员没准备
    CodeTeamUserNotReady : 1620,
    //队伍已满员
    CodeTeamIsFull : 1621,
    //队伍不存在
    CodeTeamNotExist : 1622,
    //队伍已加入
    CodeTeamHadJoined : 1623,
    //队伍匹配中
    CodeTeamIsMatching : 1624,
    //队伍用户不在匹配池
    CodeUserIsNotInMatching : 1625,
    
    //渠道版本不匹配，无法进入比赛
    CodeAppChannelMismatch : 1630,
    
    // 官方赛赛中保留1700-1800
    // 该用户不满足快速淘汰
    CodeUserNotFastOut : 1700,
}

export const PBMatchList = {
    ListGuideTypeUnknown : 0,
    // 可报名
    ListGuideTypeEntering : 1,
    // 预告
    ListGuideTypePreView : 2,
    // 已报名
    ListGuideTypeEntered : 3,
    // 可围观
    ListGuideTypeOnLook : 4,
 }

export const PBCommon = {
   SwitchStateUnknown : 0,
               
   /**
    * 打开
    */
   SwitchStateOn : 1,
               
   /**
    * 关闭
    */
   SwitchStateOff : 2,
}

export const ExpireType = {
    ExpireTypeUnknown  : 0,  //未知
    ExpireTypeDuration  : 1, //时间段（秒）
    ExpireTypeTime     : 2, //时间点
}

export const PBCommonAsset = {
    /**
     * 
     */
    DynamicAssetTypeUnknown: 0,
                
    /**
     * 
     */
    DynamicAssetTypeBase: 1,
                
    /**
     * 
     */
    DynamicAssetTypeMarkup: 2,
}


