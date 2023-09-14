import { Log } from "bos/base/log/Log";
import { BaseListener } from "./BaseListener";
import { PBRegularCommon } from "../../code/code";
import { App } from "app/App"
import { SortRank } from "../data/UserInfo";
import { MatchMgr } from "../../MatchMgr";
import { MatchHandler } from "../handler/MatchHandler";
import { OfficeMatchService } from "idl/tss/match_v2/officematch.v1";
import { RpcService } from "bos/framework/network/rpc/RpcService";
import { RoomInfo, SafeEmit } from "../data/RoomInfo";

export class MatchListener extends BaseListener {
    startListener() {
        console.warn("MatchListener startListener")
        OfficeMatchService.on(RpcService.EventType.NOTIFICATION, this.onResponse, this)
    }

    stopListener() {
        console.warn("MatchListener stopListener")
        OfficeMatchService.off(RpcService.EventType.NOTIFICATION, this.onResponse, this)
    }

    filterMsg(key: string): boolean {
        if (!this.handler.isRealTime) {
            console.warn("MatchListener filterMsg is not realTime", this.handler.isRealTime)
            return false
        }

        if (!key || key == "") {
            console.warn("MatchListener filterMsg key is invalid", key)
            return false
        }

        if (key == this.key) {
            return true
        }

        if (key.startsWith(this.key)) {
            return true
        } else {
            console.warn("MatchListener filterMsg key is invalid", key, this.key)
            return false
        }
    }

    onNotifyMatchStart(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyMatchStart", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        if (this.handler) {
            this.handler.srvID = resp.srvID
            this.handler.matchKey = resp.matchKey
            this.handler.matchListener.setKey(resp.matchKey)
        }

        roomInfo.baseInfo.setMatchKey(resp.matchKey);
        roomInfo.baseInfo.updateDynamicInfo({
            isDynamicStage: resp.isDynamicStage,
            dynamicStageId: resp.dynamicStageId,
        });

        roomInfo.preBaseInfo.updateMatchStatus(PBRegularCommon.MatchStatusRunning);

        // 设置初始分数
        const users = roomInfo.userInfo.getReadyUsers();
        const userInitScore = roomInfo.config.getUserInitScore();
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            user.updateScore(userInitScore);
            user.updateRoundCnt(0);
        }

        const num = users.length;
        // 设置初始信息
        roomInfo.baseInfo.updateEntryUserNum(num);
        roomInfo.baseInfo.updatePlayerNum(num);
        roomInfo.baseInfo.updateOutUserNum(0);

        // 设置赛中初始奖池
        const pool = roomInfo.preBaseInfo.getPrizePool();
        roomInfo.baseInfo.updatePrizePool(pool);

        SafeEmit(this.handler, MatchHandler.EventType.MatchStart)
    }

    onNotifyStageStartV2(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyStageStartV2", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        // 更新阶段(阶段索引，后端是0开始)
        const index: number = resp.index || 0;
        roomInfo.baseInfo.getStageInfo().updateIndex(index);
        roomInfo.baseInfo.getStageInfo().updateIsOver(false);

        let dynamicId = roomInfo.baseInfo.getDynamicStageId()
        const curIndex: number = index;
        const stageEndType = roomInfo.config.getStageEndType(curIndex, dynamicId);
        if (stageEndType === PBRegularCommon.StageEndTypeByTime || stageEndType === PBRegularCommon.StageEndTypeByUserNumAndTime) {
            // 更新阶段剩余时间
            const duration: number = roomInfo.config.getStageDuration(curIndex, dynamicId);
            roomInfo.baseInfo.getStageInfo().updateLeftDuration(duration);
        }

        // 更新淘汰分,底分
        const outScoreConfig = roomInfo.config.getOutScoreConfig(curIndex, dynamicId)
        const baseScore: number = roomInfo.config.getBaseScore(curIndex, dynamicId);
        roomInfo.baseInfo.updateScore({ baseScore: baseScore, outScore: outScoreConfig.initValue || 0 });

        // 设置初始信息
        const users = roomInfo.userInfo.getPromoUsers();
        const num: number = users.length;
        roomInfo.baseInfo.updateWaitUserNum(num);
        roomInfo.baseInfo.updatePlayingUserNum(0);

        // 分组信息    
        const groupInfo = resp.groupInfo;
        if (groupInfo) {
            roomInfo.baseInfo.updateGroupInfo(resp.groupInfo);

            const doingGroups = groupInfo.doingGroups || [];
            for (let i = 0; i < doingGroups.length; i++) {
                const groupID: number = doingGroups[i].groupID;
                const uids: number[] = doingGroups[i].uids || [];
                for (let j = 0; j < uids.length; j++) {
                    const user = roomInfo.userInfo.findUser(uids[j]);
                    if (user) {
                        user.updateGroupID(groupID);
                    } else {
                        console.error("MatchHandler:onNotifyStageStartV2 设置分组的时候没有找到user", uids[j]);
                    }
                }
            }
        }

        // 更新玩家分数(带分)，记录上阶段排名
        if (curIndex > 0) {
            // 记录上阶段排名
            const rankUsers = roomInfo.userInfo.getRankUsers(true);

            // 计算带分
            const promoConfig = roomInfo.config.getPromotionConfig(curIndex - 1, dynamicId); // 带分配置是前一阶段的配置
            if (!promoConfig) {
                console.error("MatchHandler:onNotifyStageStartV2 promoConfig is nil", curIndex, resp, roomInfo);
            } else {
                for (let i = 0; i < rankUsers.length; i++) {
                    // 未淘汰玩家,计算带分,重置阶段完成时间
                    const v = rankUsers[i];
                    if (!v.isOut()) {
                        // 阶段完成时间
                        v.updateCurStFinishAt(0);
                        // 带分
                        let resultScore: number = 0;
                        if (promoConfig.mode === PBRegularCommon.UserScoreModeFixedRatio) {
                            resultScore = Math.min(Math.floor(v.score * promoConfig.value / 100), promoConfig.maxHoldScore);
                        } else if (promoConfig.mode === PBRegularCommon.UserScoreModeSqrtAndRatio) {
                            let score: number = Math.abs(v.score);
                            score = Math.sqrt(score) * promoConfig.value;
                            if (v.score < 0) {
                                score = -score;
                            }
                            resultScore = Math.min(score, promoConfig.maxHoldScore);
                        } else {
                            console.error("MatchHandler:onNotifyStageStartV2 promoConfig.mode is nil ", curIndex, resp, roomInfo);
                        }
                        v.updateScore(resultScore)
                    }
                }
            }
        }

        //清理桌子 
        roomInfo.tableInfo.resetTable()

        SafeEmit(this.handler, MatchHandler.EventType.MatchStageStart, this.roomInfo.baseInfo.getStageInfo())
    }

    onNotifyTableStartV2(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyTableStartV2", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        let hasNew = false;
        let totalPlayer = 0;

        (resp.tables || []).forEach((v: any) => {
            // 更新桌子
            const key = v.key;
            let sTable = roomInfo.tableInfo.findTable(key);

            if (sTable) {
                sTable.updateGameNo(sTable.gameNo + 1)
                sTable.updateStatus(PBRegularCommon.TableStatusPlaying)
                sTable.updateRealKey(v.realKey)
                sTable.updateBaseScore(v.baseScore)
                sTable.updateOutScore(v.outScore)
                sTable.updateUsers(v.uids)
                sTable.updateGroupID(v.groupID)
            } else {
                console.warn("MatchHandler:onNotifyTableStartV2 新的桌子", v);
                v.gameNo = 1;
                v.status = PBRegularCommon.TableStatusPlaying;
                sTable = roomInfo.tableInfo.addTable(v);
                hasNew = true;
            }

            // 更新user信息
            const uids = v.uids || [];
            let isMeIn = false;
            const rankUsers = [];
            uids.forEach((v1: any, i1: number) => {
                totalPlayer++;
                if (v1 === App.userMgr.loginUser.uid) {
                    isMeIn = true;
                }
                const user = roomInfo.userInfo.findUser(v1);
                if (user) {
                    user.updateSid(i1);
                    user.updateRoundCnt((user.getRoundCnt() || 0) + 1);
                    // 重置托管惩罚标记
                    user.updatePunishMarks(false);
                    user.updateStatus(PBRegularCommon.UserStatusPlaying);
                    rankUsers.push(user);
                } else {
                    console.error("MatchHandler:onNotifyTableStartV2 没有找到玩家", resp, roomInfo);
                }
            });

            // 计算一下玩家的桌内排名
            SortRank(rankUsers);

            rankUsers.forEach((v1: any, i1: number) => {
                v1.updateTableRank(i1);
            });

            SafeEmit(this.handler, MatchHandler.EventType.MatchTableStart, sTable, isMeIn)
        });

        console.warn("MatchHandler:onNotifyTableStartV2 totalPlayer", totalPlayer);

        const playingNum = roomInfo.baseInfo.getPlayingUserNum();
        roomInfo.baseInfo.updatePlayingUserNum(playingNum + totalPlayer);

        const waitNum = roomInfo.baseInfo.getWaitUserNum();
        roomInfo.baseInfo.updateWaitUserNum(waitNum - totalPlayer);

        if (hasNew) {
            SafeEmit(this.handler, MatchHandler.EventType.TableNumChange, roomInfo.tableInfo.getTables().length)
        }
    }

    onNotifyTableGameStart(resp, params, roomInfo?: RoomInfo){
        console.debug("MatchListener onNotifyTableGameStart", resp, params)
        let key = resp.key
        let table = this.roomInfo.tableInfo.findTable(key)
        if (table) {
            SafeEmit(this.handler, MatchHandler.EventType.MatchGameStart, table)
        } else {
            console.error("MatchHandler:onNotifyTableResultV2 没有找到对应的桌子", resp, roomInfo);
        }
    }

    onNotifyScoreChange(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyScoreChange", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        roomInfo.baseInfo.updateScore(resp)
    }

    onNotifyTableResultV2(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyTableResultV2", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        const tableKey = resp.key;
        if (tableKey) {
            let totalPlayer = 0;
            const sTable = roomInfo.tableInfo.findTable(tableKey);
            if (sTable) {
                // 更新桌子状态
                sTable.updateStatus(PBRegularCommon.TableStatusEnd);

                // 更新玩家信息
                const rankUsers = [];
                const users = resp.users || [];
                for (let i = 0; i < users.length; i++) {
                    totalPlayer++;
                    const v = users[i];
                    const user = roomInfo.userInfo.findUser(v.uid);
                    if (user) {
                        const changeScore = v.changeScore || 0;
                        const score = user.score + changeScore;
                        user.updateScore(score);
                        user.updateChangeScore(changeScore);
                        user.updateTableRole(v.tableRole);
                        user.updateGameResult(v.gameResult);
                        user.updatePunishMarks(v.punishMarks);

                        rankUsers.push(user);
                    } else {
                        console.error("MatchHandler:onNotifyTableResultV2 没有找到玩家", resp, v, roomInfo);
                    }
                }

                // 计算一下玩家的桌内排名
                SortRank(rankUsers);
                for (let i = 0; i < rankUsers.length; i++) {
                    rankUsers[i].updateTableRank(i);
                }

                // 标记一下排序过期了(分数变更了)
                roomInfo.userInfo.setDirty();

                SafeEmit(this.handler, MatchHandler.EventType.MatchTableResult, sTable, resp.tableGameData)

                SafeEmit(this.handler, MatchHandler.EventType.RankChange, this.roomInfo)
            } else {
                console.error("MatchHandler:onNotifyTableResultV2 没有找到对应的桌子", resp, roomInfo);
            }

            const playingNum = roomInfo.baseInfo.getPlayingUserNum();
            roomInfo.baseInfo.updatePlayingUserNum(playingNum - totalPlayer);
        } else {
            console.error("MatchHandler:onNotifyTableResult key is nil", resp);
        }
    }

    onNotifyUserSettlementV2(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserSettlementV2", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        const sUser = resp.user;
        if (sUser) {
            const outNum = roomInfo.baseInfo.getOutUserNum();
            roomInfo.baseInfo.updateOutUserNum(outNum + 1);

            const playNum = roomInfo.baseInfo.getPlayerNum();
            roomInfo.baseInfo.updatePlayerNum(playNum - 1);

            const uid = sUser.uid;
            const user = roomInfo.userInfo.findUser(uid);
            if (user) {
                user.updateOutAt(sUser.outAt);
                //用后端返回的排名
                user.updateRank(sUser.rank);
                user.updateSettle(sUser.prizeViewAssets);
                user.updateStatus(PBRegularCommon.UserStatusOut);

                SafeEmit(this.handler, MatchHandler.EventType.UserSettle, uid, user)

                //标记一下排序过期了(淘汰影响排序)
                roomInfo.userInfo.setDirty();
                //发一下排序变更事件
                SafeEmit(this.handler, MatchHandler.EventType.RankChange, this.roomInfo)
            } else {
                console.error("MatchHandler:onNotifyTableResultV2 没有找到玩家", resp, roomInfo);
            }
        } else {
            console.error("MatchHandler:onNotifyUserSettlementV2 user is nil", resp);
        }
    }

    onNotifyUserRevivalV2(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserRevivalV2", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        const uid = resp.uid;
        const user = roomInfo.userInfo.findUser(uid);

        if (user) {
            const waitNum = roomInfo.baseInfo.getWaitUserNum();
            roomInfo.baseInfo.updateWaitUserNum(waitNum + 1);

            user.updateStatus(PBRegularCommon.UserStatusWaitRevival);

            SafeEmit(this.handler, MatchHandler.EventType.UserInRevival, uid, resp.revivalInfo)
        } else {
            console.error("MatchHandler:onNotifyUserRevivalV2 没有找到玩家", resp, roomInfo);
        }
    }

    onNotifyUserRevived(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserRevived", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        roomInfo.userRevived(resp.uid, resp.score)

        //发一下排序变更事件
        SafeEmit(this.handler, MatchHandler.EventType.RankChange, roomInfo)
    }

    onNotifyUserStatusBye(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserStatusBye", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        const uids: Array<number> = resp.uids || [];
        const totals: number = uids.length;

        const waitNum = roomInfo.baseInfo.getWaitUserNum();
        roomInfo.baseInfo.updateWaitUserNum(waitNum + totals);

        for (let i = 0; i < uids.length; i++) {
            const uid = uids[i];
            const user = roomInfo.userInfo.findUser(uid);
            if (user) {
                user.updateStatus(PBRegularCommon.UserStatusBye);
            } else {
                console.error("MatchHandler:onNotifyUserStatusBye 没有找到玩家", resp, roomInfo);
            }
        }
    }

    onNotifyUserStageEnd(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserStageEnd", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        const uids = resp.uids || [];

        const totals = uids.length;
        const waitNum = roomInfo.baseInfo.getWaitUserNum();
        roomInfo.baseInfo.updateWaitUserNum(waitNum + totals);

        const curStFinishAt = resp.curStFinishAt;
        for (let i = 0; i < uids.length; i++) {
            const uid = uids[i];
            const user = roomInfo.userInfo.findUser(uid);
            if (user) {
                user.updateCurStFinishAt(curStFinishAt);
                user.updateStatus(PBRegularCommon.UserStatusWait);
            } else {
                console.error("MatchHandler:onNotifyUserStageEnd 没有找到玩家", resp, roomInfo);
            }
        }

        //标记一下排序过期了(阶段结束时间影响排序)
        roomInfo.userInfo.setDirty();

        //发一下排序变更事件
        SafeEmit(this.handler, MatchHandler.EventType.RankChange, this.roomInfo)
    }

    onNotifyUserStatusWaitOver(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserStatusWaitOver", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        const uids = resp.uids || [];

        const totals = uids.length;
        const waitNum = roomInfo.baseInfo.getWaitUserNum();
        roomInfo.baseInfo.updateWaitUserNum(waitNum + totals);

        const curStFinishAt = resp.curStFinishAt;
        for (let i = 0; i < uids.length; i++) {
            const uid = uids[i];
            const user = roomInfo.userInfo.findUser(uid);
            if (user) {
                user.updateCurStFinishAt(curStFinishAt);
                user.updateStatus(PBRegularCommon.UserStatusWaitOver);
            } else {
                console.error("MatchHandler:onNotifyUserStatusWaitOver 没有找到玩家", resp, roomInfo);
            }
        }

        // 标记一下排序过期了(阶段结束时间影响排序)
        roomInfo.userInfo.setDirty();

        // 发一下排序变更事件
        SafeEmit(this.handler, MatchHandler.EventType.RankChange, this.roomInfo)
    }

    onNotifyUserDelayJoin(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserDelayJoin", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        const uid = resp.uid;
        const user = roomInfo.userInfo.findUser(uid);
        if (user) {
            const userInitScore = roomInfo.config.getUserInitScore();
            user.updateScore(userInitScore);
            user.updateStatus(PBRegularCommon.UserStatusBye);
        } else {
            console.error("MatchHandler:onNotifyUserDelayJoin 没有找到玩家", resp, roomInfo);
        }

        //标记一下排序过期了
        roomInfo.userInfo.setDirty();

        //发一下排序变更事件
        SafeEmit(this.handler, MatchHandler.EventType.RankChange, this.roomInfo)
    }

    onNotifyUserPromotion(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyUserPromotion", resp, params)

        SafeEmit(this.handler, MatchHandler.EventType.UserPromotion, App.userMgr.loginUser.uid)
    }

    onNotifyMsgStageQuit(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyMsgStageQuit", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        roomInfo.userQuit(resp.uid)
    }

    onNotifyStageGroupEnd(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyStageGroupEnd", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        roomInfo.baseInfo.updateStageGroupInfo(resp)

        SafeEmit(this.handler, MatchHandler.EventType.StageGroupEnd, resp.newlyDoneGroupID)
    }

    onNotifyStageEnd(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyStageEnd", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        roomInfo.baseInfo.getStageInfo().updateIsOver(true)

        SafeEmit(this.handler, MatchHandler.EventType.MatchStageEnd, this.roomInfo.baseInfo.stage)
    }

    onNotifyMatchStartFailed(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyMatchStartFailed", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        roomInfo.preBaseInfo.updateMatchStatus(PBRegularCommon.MatchStatusAbort)

        SafeEmit(this.handler, MatchHandler.EventType.MatchStartFailed)
    }

    onNotifyMatchOverV2(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyMatchOverV2", resp, params)

        roomInfo = roomInfo ?? this.roomInfo

        //排序一下
        roomInfo.userInfo.sort()
        //设置finally=true,与v1版本保持一致
        roomInfo.userInfo.setIsFinally()

        roomInfo.preBaseInfo.updateMatchStatus(PBRegularCommon.MatchStatusOver)

        SafeEmit(this.handler, MatchHandler.EventType.MatchEnd)
    }

    onNotifyGoToHomePage(resp, params, roomInfo?: RoomInfo) {
        console.debug("MatchListener onNotifyGoToHomePage", resp, params)

        SafeEmit(this.handler, MatchHandler.EventType.GoToHomePage)
    }
}