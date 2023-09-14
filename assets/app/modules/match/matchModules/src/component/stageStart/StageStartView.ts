import { PBRegularCommon } from 'app/domain/match/code/code';
import { BaseMatchView } from 'app/domain/match/match/controller/BaseMatchView';
import { MTable } from 'app/domain/match/match/data/TableInfo';
import { MatchHandler } from 'app/domain/match/match/handler/MatchHandler';
import { Utils } from 'app/utils/Utils';
import { TimeUtil } from 'bos/exports';
import { Label, UIOpacity, isValid, tween } from 'cc'
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StageStartView')
export class StageStartView extends BaseMatchView {
	@property(Label)
	endLabel: Label

	@property(Label)
	middleLabel: Label

	@property(Node)
	revivalTag: Node

	@property(Label)
	startLabel: Label

	@property(Label)
	stageLabel: Label

	onLoad(): void {

	}

	onDestroy(): void {
		this.unscheduleAllCallbacks()
	}

	updateView(handler: MatchHandler, params?) {

		console.warn("StageStartView updateView=========")
        console.debug("StageStartView updateView=========", params)

		super.updateView(handler)

		let roomInfo = this.handler.roomInfo
		let table: MTable = params.table
		let uid = params.uid
		let user = roomInfo.userInfo.findUser(uid)
		if (!user) {
			return
		}

		let stageIndex = roomInfo.baseInfo.getStageInfo().getStageIndex()
		let dynamicID = roomInfo.baseInfo.getDynamicStageId()
		let isFinallyRound = roomInfo.getIsFinallyRound()
		let stageType = roomInfo.config.getStageType(stageIndex, dynamicID)
		let gameNo = roomInfo.config.getTotalGameNum(stageIndex, dynamicID)
		let promotionNum = roomInfo.getPromotionNum(stageIndex, true)
		if (stageType == PBRegularCommon.StageTypeStrike) {
			if (isFinallyRound) {
				let outScore = table.outScore
				this.startLabel.string = "本局淘汰分"
				this.middleLabel.string = outScore.toString()
				this.endLabel.string = ""

				this.stageLabel.string = "决赛轮"
			} else {
				//首轮
				if (user.RoundCnt <= 1) {
					if (roomInfo.getHasGroup()) {
						this.startLabel.string = "本组前"
					} else {
						this.startLabel.string = "前"
					}
					this.middleLabel.string = promotionNum.toString()
					this.endLabel.string = "晋级"

				} else {
					let outScore = table.outScore
					this.startLabel.string = "本局淘汰分"
					this.middleLabel.string = outScore.toString()
					this.endLabel.string = ""
				}

				let overTimes = roomInfo.baseInfo.getStageInfo().getOverTimes()
				let curTimes = TimeUtil.getTime();
				let delta = overTimes - curTimes
				let min = Math.floor(delta / 60)
				let sec = delta - min * 60
				this.stageLabel.string = `剩余时间:${Utils.twoDigit(min)}:${Utils.twoDigit(sec)}  底分:${table.baseScore}`
			}

		} else {
			if (isFinallyRound) {
				this.startLabel.string = "第"
				this.middleLabel.string = `${table.gameNo}/${gameNo}`
				this.endLabel.string = "局"

				this.stageLabel.string = "决赛轮"
			} else {
				let promotionType = roomInfo.config.getPromotionType(stageIndex, dynamicID)
				if (promotionType == PBRegularCommon.PromotionTypeTableRank) {
					this.startLabel.string = "本桌前"
					this.middleLabel.string = promotionNum.toString()
					this.endLabel.string = "晋级"

					this.stageLabel.string = `定局积分  第${table.gameNo}/${gameNo}局`
				} else {
					this.startLabel.string = "第"
					this.middleLabel.string = `${table.gameNo}/${gameNo}`
					this.endLabel.string = "局"

					this.stageLabel.string = `定局积分`
				}
			}
		}


		let revivalCfg = roomInfo.config.getRevivalConfig(stageIndex, dynamicID)
		if (revivalCfg && revivalCfg.isEnabled) {
			this.revivalTag.active = true
		} else {
			this.revivalTag.active = false
		}

		let opCom = this.node.getComponent(UIOpacity)
		opCom.opacity = 255
		tween(opCom).delay(3).to(0.2, { opacity: 0 }).call(() => {
			if (isValid(this.node)) {
				this.node.active = false
			}
		}).start()
	}
}