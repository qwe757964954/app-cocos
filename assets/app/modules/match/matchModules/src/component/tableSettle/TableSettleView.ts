import { _decorator, Component, EventTouch, Node } from 'cc';
const { ccclass, property } = _decorator;
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { Sprite } from 'cc';
import { PBRegularCommon } from 'app/domain/match/code/code';
import { isValid } from 'cc';
import { Utils } from 'app/utils/Utils';
import { App } from 'app/App';
import { Label } from 'cc';
import { MUser } from 'app/domain/match/match/data/UserInfo';
import { instantiate } from 'cc';
import { TableSettleItem } from './TableSettleItem';
import { Color } from 'cc';
import { User } from 'app/domain/user/User';
import { Decorator, NodeUtil, resLoader, uiMgr } from 'bos/exports';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';

@ccclass('TableSettleView')
export class TableSettleView extends BaseMatchView {

    @property(Sprite)
    resultSprite: Sprite

    @property(Sprite)
    leftSprite: Sprite

    @property(Sprite)
    rightSprite: Sprite

    @property(Sprite)
    bgMulti: Sprite

    @property(Label)
    nameLabel: Label

    @property(Node)
    landlordTag: Node

    @property(Node)
    farmTag: Node

    @property(Label)
    resultLabel: Label

    @property(Label)
    scoreLabel: Label

    @property(Label)
    rankLabel: Label

    @property(Node)
    otherNode: Node

    @property(Avatar)
    avatarNode: Avatar

    uid: number;
    table: MTable;
    tableGameData: any;

    updateView(handler: MatchHandler, params?) {
        console.warn("TableSettleView updateView===============")
        console.debug("TableSettleView updateView===============", params)

        super.updateView(handler, params)

        this.uid = params.uid
        this.table = params.table
        this.tableGameData = params.tableGameData

        if (this.uid && this.table) {
            //排序一下
            this.handler.roomInfo.userInfo.sort()

            let user = this.handler.roomInfo.userInfo.findUser(this.uid)
            if (user) {
                this.updateResultStyle(user)
                this.updateRole(user)
                this.updateResultScore(user)
                this.updateRankAndScore(user)
                this.updateOtherUser()
            } else {
                console.error("TableSettleView updateResult not find user", this.handler.roomInfo, this.uid)
            }

            this.updateUser()
        }
    }

    updateResultStyle(user: MUser) {
        let gameResult = user.gameResult
        if (gameResult == PBRegularCommon.GameResultTypeWin) {
            Utils.loadSpriteFromBundle(this.resultSprite, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_img_title1")
            Utils.loadSpriteFromBundle(this.leftSprite, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_img_line1")
            Utils.loadSpriteFromBundle(this.rightSprite, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_img_line1")
            Utils.loadSpriteFromBundle(this.bgMulti, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_bg_win")

            this.resultLabel.color = new Color("#6F5140")
        } else {
            if (gameResult == PBRegularCommon.GameResultTypeLoss) {
                Utils.loadSpriteFromBundle(this.resultSprite, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_img_title3")
                Utils.loadSpriteFromBundle(this.bgMulti, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_bg_fail")
                this.resultLabel.color = new Color("#4C565E")
            } else if (gameResult == PBRegularCommon.GameResultTypeDraw) {
                Utils.loadSpriteFromBundle(this.resultSprite, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_img_title2")
                Utils.loadSpriteFromBundle(this.bgMulti, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_bg_pingju")
                this.resultLabel.color = new Color("#4D4771")
            }

            Utils.loadSpriteFromBundle(this.leftSprite, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_img_line2")
            Utils.loadSpriteFromBundle(this.rightSprite, "match@matchModules/image/tableSettle/ResApp_Game_Jiesuan_img_line2")
        }
    }

    @Decorator.TryAsync()
    async updateUser() {
        let model = await this.promiseOne<User>(App.userMgr.getUserByID(this.uid).finish())
        this.nameLabel.string = model.nickname

        //(头像)
        this.avatarNode.setUserID(this.uid)
    }

    updateRole(user: MUser) {
        this.farmTag.active = false
        this.landlordTag.active = false

        if (user.TableRole == 1) {
            if (this.handler.roomInfo.config.getGameID() == "mahjong-hnxinxiang") {
                this.farmTag.active = true
            } else {
                this.landlordTag.active = true
            }
        }
    }

    updateResultScore(user: MUser) {
        let baseScore = this.table.baseScore
        let changeScore = Math.abs(user.changeScore)
        let multi = Math.ceil(changeScore / baseScore)
        let str = `+${Utils.formatNumWithUnit(changeScore)}`
        if (user.changeScore < 0) {
            str = `-${Utils.formatNumWithUnit(changeScore)}`
        }
        if (this.handler.roomInfo.config.getGameID() == "mahjong-hnxinxiang") {
            this.resultLabel.string = `${multi}番     ${str}`
        } else {
            this.resultLabel.string = `${multi}倍     ${str}`
        }
    }

    updateRankAndScore(user: MUser) {
        this.rankLabel.string = user.rank.toString()
        this.scoreLabel.string = Utils.formatNumWithUnit(user.score)
    }

    updateOtherUser() {
        this.otherNode.destroyAllChildren()

        let uids = this.table.uids ?? []
        let index = uids.indexOf(this.uid)
        if (index >= 0) {
            uids.splice(index, 1)
        }

        resLoader.loadPrefab("match@matchModules/prefab/tableSettle/TableSettleItem", (err, prefab) => {
            if (!isValid(this.node) || err) {
                return
            }


            for (let index = 0; index < uids.length; index++) {
                const uid = uids[index];
                let item = instantiate(prefab)
                this.otherNode.addChild(item)
                item.getComponent(TableSettleItem).updateView(this.handler, this.table, uid)
            }
        })
    }

    onTipsTouch() {
        console.debug("TableSettleView onTipsTouch")

        uiMgr.showToast("开发中...")
    }

    onRankTouch() {
        let index = this.handler.roomInfo.baseInfo.getStageInfo().getStageIndex()
        let dynamicID = this.handler.roomInfo.baseInfo.getDynamicStageId()
        let promotionType = this.handler.roomInfo.config.getPromotionType(index, dynamicID)
        if (promotionType === PBRegularCommon.PromotionTypeTableRank) {
            // 更新玩家信息
            let table = this.handler.roomInfo.tableInfo.findTableByUID(this.uid)
            if (!table) {
                console.error("StageWaitView onRankTouch not find table")
                return
            }
            const rankUsers: MUser[] = [];
            for (let i = 1; i <= table.uids.length; i++) {
                const v = table.uids[i];
                const user = this.handler.roomInfo.userInfo.findUser(v);
                if (user) {
                    let newUser = user.clone()
                    newUser.rank = user.rankTable
                    rankUsers.push(newUser);
                } else {
                    console.error("ObView:onRankTouch 没有找到玩家", v, this.handler);
                }
            }
            rankUsers.sort((a, b) => a.rank - b.rank);

            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {
                params: {
                    handler: this.handler,
                    users: rankUsers,
                    rankPrizes: this.handler.roomInfo.config.getRankPrize(this.handler.roomInfo.getPrizePool(), dynamicID, false),
                    isObserver: this.uid == App.userMgr.loginUid,
                }
            })
        } else {
            uiMgr.loadPopup("match@matchModules/prefab/rank/RankView", {
                params: {
                    handler: this.handler,
                    users: this.handler.roomInfo.userInfo.getRankUsers(),
                    rankPrizes: this.handler.roomInfo.config.getRankPrize(this.handler.roomInfo.getPrizePool(), dynamicID, false),
                    isObserver: this.uid == App.userMgr.loginUid,
                }
            })
        }
    }

    onScoreInfoTouch(event: EventTouch) {
        if (this.tableGameData) {
            let lordUid = 0;
            for (const v of this.table?.uids) {
                let user = this.handler.roomInfo.userInfo.findUser(v);
                if (user?.TableRole == 1) {
                    lordUid = v;
                    break;
                }
            }
    
            let param = {
                baseMulti: 1,
                uid: this.uid,
                lordUid: lordUid,
                parent: this.node,
                target: event.target,
                tableInfo: this.tableGameData,
                baseScore: this.table.baseScore,
            }
            this.handler.emit(MatchHandler.EventType.PopupSettleMultiDetail, param);
        } else {
            console.warn("TableSettleView onScoreInfoTouch tableGameData is invalid")
        }
    }

    protected onDisable(): void {
    }
}