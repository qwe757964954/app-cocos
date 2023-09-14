import { _decorator, Node, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { tween } from 'cc';
import { Vec3 } from 'cc';
import { Room } from 'game/pdk/Room';
import { GameStage, Identity, ScoreType, TaskType } from 'game/pdk/model/GameConst';
import { ExtendTable, MsgDealCard, MsgTableInfo, MsgTaskList, MsgTaskResult, PlayCardResult, TaskInfo } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { Table } from 'idl/tss/game/table.v2';
import { Log, NodeUtil } from 'bos/exports';
import { Label } from 'cc';
import { find } from 'cc';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { ObjectPool } from 'game/room/component/ObjectPool';
import { MateMgr } from 'app/domain/mate/MateMgr';
import { HandCard } from 'game/pdk/module/handCard/src/component/HandCard';

@ccclass('TopInfo')
export class TopInfo extends XComponent {
    @property(Node)
    public targetList: Node[] = [];
    @property(Label)
    public multipleLab: Label;
    @property(Label)
    public flyScore: Label;
    @property(Node)
    public scoreInfo: Node;
    @property(Prefab)
    public regularPre: Prefab;
    @property(Node)
    public regularNode: Node;
    @property(Prefab)
    public taskPre: Prefab;
    
    
    
    private gameTask: Node;
    private regularInfo: Node;
    private objectPool: ObjectPool;
    private taskList: TaskInfo[] = [];
    private taskResult: MsgTaskResult[] = [];
    private bottomInfo: Map<number, UIOpacity> = new Map();


    onLoad() {
        this.objectPool = find('Canvas').getComponent(ObjectPool);
        Room.eventSystem.on('NotifyBanker', this.onNotifyBanker, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.matchMgr.on(MateMgr.EventType.ON_GAME_RESULT, this.onMatchResultData, this);
        Room.eventSystem.on(ExtendTable.NotifyDealCard.name, this.onNotifyDealCard, this);
        Room.eventSystem.on(ExtendTable.NotifyPlayCard.name, this.onNotifyPlayCard, this);
        Room.eventSystem.on(ExtendTable.NotifyTaskList.name, this.onNotifyTaskList, this);
        Room.eventSystem.on(ExtendTable.NotifyGameStart.name, this.onNotifyGameStart, this);
        Room.eventSystem.on(ExtendTable.NotifyTaskResult.name, this.onNotifyTaskResult, this);
        Room.eventSystem.on(ExtendTable.NotifyGameResult.name, this.onNotifyGameResult, this);
        Room.eventSystem.on(ExtendTable.NotifyScoreChange.name, this.onNotifyScoreChange, this);
        Room.eventSystem.on(ExtendTable.NotifyCallScoreResult.name, this.onNotifyCallScoreResult, this);
        Room.eventSystem.on(ExtendTable.NotifyCallDealerResult.name, this.onNotifyCallDealerResult, this);
        Room.eventSystem.on(ExtendTable.NotifyRaiseScoreResult.name, this.onNotifyRaiseScoreResult, this);
    }

    protected start(): void {
        this.initUI();
    }

    initUI() {
        if (Room.gameData.isRegular()) {
            if (!this.regularInfo) {
                this.regularInfo = instantiate(this.regularPre);
                this.regularNode.addChild(this.regularInfo);
            }
        }
    }

    onDisable() {
        Room.matchMgr.removeAll(this);
        Room.eventSystem.removeAll(this);
    }

    resetView() {
        this.resetBotView();
        this.taskList = [];
        this.taskResult = [];
    }

    // 牌局任务开始通知
    onNotifyTaskList(data: MsgTaskList) {
        this.showGameTask(data)
    }

    // 牌局任务结果通知
    onNotifyTaskResult(data: MsgTaskResult) {
        this.showGameTask(data)
    }

    // 牌局开始
    onNotifyGameStart() {
        this.resetView();
        this.updateMultipleLab();
    }

    // 桌子结算
    onNotifyGameResult() {
        this.resetView();
        this.updateMultipleLab();
    }

    // 比赛结算
    onMatchResultData() {
        this.showGameTask();
    }

    // 加倍结果
    onNotifyRaiseScoreResult() {
        this.updateMultipleLab();
    }

    // 叫抢地主结果
    onNotifyCallDealerResult() {
        this.updateMultipleLab();
    }

    // 发牌
    onNotifyDealCard(data: MsgDealCard) {
        this.createBottomCard(data.bottomCards);
        this.updateMultipleLab();
    }

    // 叫分结果
    onNotifyCallScoreResult() {
        this.updateMultipleLab();
    }

    // 确定地主
    onNotifyBanker() {
        this.updateMultipleLab();
    }

    // 倍数变化
    onNotifyScoreChange() {
        this.updateMultipleLab();
    }

    onNotifyReconnect(data: MsgTableInfo) {
        console.log('=TopInfo.onNotifyReconnect===', data)
        this.createBottomCard(data.bottomCards);
        for (const v of data?.users) {
            if (v?.uid == Room.gameData.getMyID()) {
                if (v.handCards?.uint32s_value) {
                    let value = v.handCards.uint32s_value.value;
                    for (const [byte, node] of this.bottomInfo) {
                        let status = false;
                        for (const k of value) {
                            if (byte == k) {
                                status = true;
                                break;
                            }
                        }
                        node.opacity = status ? 255 : 255 / 2;
                    }
                } else {
                    this.bottomInfo.clear();
                }
            }
        }
        if (Room.gameData.curStage == GameStage.PlayCard || Room.gameData.curStage == GameStage.Double) {
            this.flyBotCard();
        }
        this.updateMultipleLab();
        this.showGameTask(new MsgTaskList({data: data.tasks}));
    }

    onNotifyPlayCard(data: PlayCardResult) {
        if (data.uid == Room.gameData.getMyID() && this.bottomInfo?.size > 0) {
            for (const [k, node] of this.bottomInfo) {
                for (const v of data.cards) {
                    if (k == v) {
                        node.opacity = 255 / 2;
                        break;
                    }
                }
            }
        }
    }

    updateTotalMultiple(): number {
        let totalScore = 1;
        let otherRaise = 0;
        let mine = Room.gameData.getMySelf();
        let allPlayers = Room.gameData.getAllPlayer();
        let raise = mine.scoreInfo.get(ScoreType.RaiseScore) || 1;
        if (mine.identity == Identity.Dealer) {
            for (const v of allPlayers) {
                if (v.identity != Identity.Dealer) {
                    otherRaise += v.scoreInfo.get(ScoreType.RaiseScore) || 1;
                }
            }
        } else {
            otherRaise = 1;
            for (const v of allPlayers) {
                if (v.identity == Identity.Dealer) {
                    otherRaise = v.scoreInfo.get(ScoreType.RaiseScore) || 1;
                    break;
                }
            }
        }
        for (const [k, v] of Room.gameData.scoreInfo) {
            totalScore *= v;
        }
        Log.d('==updateTotalScore==', raise, otherRaise, totalScore);
        return totalScore * otherRaise * raise;
    }

    updateMultipleLab() {
        let num = this.updateTotalMultiple();
        if (this.multipleLab.string == `${num}倍`) { return }
        let startPos = new Vec3(0, -50);
        let toPos = this.multipleLab.node.position;
        this.flyScore.string = `x${num}`;
        let midpointPos = new Vec3((startPos.x + toPos.x) / 2, (startPos.y + toPos.y) / 2)
        tween(this.flyScore.node).to(10 / 24, { position: midpointPos, scale: new Vec3(2, 2, 2) }, { easing: 'cubicIn' }).to(10 / 24, { position: toPos, scale: new Vec3(0.7, 0.7, 0.7) }).call(() => {
            this.multipleLab.string = `${num}倍`;
            this.flyScore.string = '';
            this.flyScore.node.setPosition(startPos);
            this.flyScore.node.scale = new Vec3(1, 1, 1);
            this.scoreInfo.parent.active && this.onClickScoreInfo()
        }).start()
    }

    createBottomCard(cards: number[]) {
        this.resetBotView();
        for (let i = 0; i < cards?.length; i++) {
            let target = this.targetList[i];
            let param = { cardByte: cards[i], style: 2, scale: 1 };
            let smallCard = this.objectPool.get({ param: param, name: 'CardView' });
            smallCard.setPosition(new Vec3(0, 0));
            target.addChild(smallCard);
            this.bottomInfo.set(cards[i], smallCard.getComponent(UIOpacity));
        }
    }

    /**
   * 底牌飞行至顶部
   */
    flyBotCard() {
        for (let i = 0; i < this.targetList.length; i++) {
            let target = this.targetList[i];
            tween(target).delay(0.4)
                .to(0.2, { position: new Vec3(target.position.x, 20) })
                .to(0.2, { position: new Vec3(target.position.x, 0) }).start();
        }
    }

    resetBotView() {
        this.bottomInfo.clear();
        this.targetList.forEach(v => {
            v.setPosition(new Vec3(0, -80));
            v.children.forEach(node => { this.objectPool.put(node) });
        })
    }

    checkTaskNode() {
        if (!this.gameTask) {
            this.gameTask = instantiate(this.taskPre);
            this.multipleLab.node.addChild(this.gameTask);
            this.gameTask.setPosition(new Vec3(0, -80));
        }
    }

    showGameTask(data?: MsgTaskList | MsgTaskResult) {
        console.log('==showGameTask==', data);
        if (data instanceof MsgTaskList && data.data?.length > 0) {
            this.taskList = [];
            data.data.forEach(v => {
                if (v.taskType == TaskType.TaskTypeLastPlayCard) {
                    this.checkTaskNode();
                    this.taskList.push(v);
                }
            })
            this.gameTask && NodeUtil.sendMessage(this.gameTask, 'setup', { taskList: this.taskList });
        } else if (data instanceof MsgTaskResult) {
            this.taskResult.push(data);
            this.checkTaskNode();
            this.gameTask && NodeUtil.sendMessage(this.gameTask, 'setup', { taskList: this.taskList, taskResult: this.taskResult });
        } else {
            this.gameTask && NodeUtil.sendMessage(this.gameTask, 'hideView');
        }
    }

    /**
     * 点击记牌器
     */
    onClickCountCard() {

    }

    onClickHideScore() {
        tween(this.scoreInfo).to(0.2, { scale: new Vec3(0, 0) }).call(() => {
            this.scoreInfo.parent.active = false;
        }).start();
    }

    /**
     * 点击倍数详情
     */
    onClickScoreInfo() {
        this.scoreInfo.parent.active = true;
        let bot = find('bot', this.scoreInfo);
        let base = find('base', this.scoreInfo);
        let call = find('call', this.scoreInfo);
        let lord = find('lord', this.scoreInfo);
        let bomb = find('bomb', this.scoreInfo);
        let open = find('open', this.scoreInfo);
        let task = find('task', this.scoreInfo);
        let spring = find('spring', this.scoreInfo);

        let mine = Room.gameData.getMySelf();
        let scoreInfo = Room.gameData.scoreInfo;
        base.getComponent(Label).string = `初始 x${Room.gameData.baseScore}`;
        let callNum = scoreInfo.get(ScoreType.CallScore) || scoreInfo.get(ScoreType.CallDealer);
        call.getComponent(Label).string = `叫抢 ${(callNum && callNum > 0) ? `x${callNum}` : '---'}`;
        let botNum = 0;
        for (let i = ScoreType.BottomBonusSameColor; i <= ScoreType.BottomBonusBlackJoker; i++) {
            botNum = scoreInfo.get(i);
            if (botNum && botNum > 0) {
                break;
            }
        }
        bot.getComponent(Label).string = `底牌 ${(botNum && botNum > 0) ? `x${botNum}` : '---'}`;
        let identityNum = (mine.scoreInfo.get(ScoreType.RaiseScore) || 1);
        if (mine.identity == Identity.Dealer) {
            let otherRaise = 0;
            for (const v of Room.gameData.getAllPlayer()) {
                if (v.identity != Identity.Dealer) {
                    otherRaise += (v.scoreInfo.get(ScoreType.RaiseScore) || 1);
                }
            }
            identityNum *= otherRaise;
        } else {
            for (const v of Room.gameData.getAllPlayer()) {
                if (v.identity == Identity.Dealer) {
                    identityNum *= (v.scoreInfo.get(ScoreType.RaiseScore) || 1);
                    break;
                }
            }
        }
        let identityStr = mine.identity == Identity.Dealer ? '地主' : '农民';
        lord.getComponent(Label).string = `${identityStr} ${identityNum > 0 ? `x${identityNum}` : '---'}`;
        let bombNum = scoreInfo.get(ScoreType.Bomb);
        bomb.getComponent(Label).string = `炸弹 ${(bombNum && bombNum > 0) ? `x${bombNum}` : '---'}`;
        let springNum = scoreInfo.get(ScoreType.Spring);
        spring.getComponent(Label).string = `春天 ${(springNum && springNum > 0) ? `x${springNum}` : '---'}`;
        let taskNum = scoreInfo.get(ScoreType.ScoreTypeTask);
        task.getComponent(Label).string = `任务 ${(taskNum && taskNum > 0) ? `x${taskNum}` : '---'}`;
        tween(this.scoreInfo).to(0.2, { scale: new Vec3(1, 1) }).start();
    }
}