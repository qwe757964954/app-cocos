import { _decorator, Animation, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { ExtendTable, MsgDealCard, MsgTableInfo } from 'game/pdk/idl/tss/pdk/extendtable.v3';
import { tween } from 'cc';
import { Vec3 } from 'cc';
import { CardView } from 'game/room/module/card/src/CardView';
import { Room } from 'game/pdk/Room';
import { UITransform } from 'cc';
import { UIOpacity } from 'cc';
import { GameStage } from 'game/pdk/model/GameConst';
import { find } from 'cc';
import { Table } from 'idl/tss/game/table.v2';
import { ObjectPool } from 'game/room/component/ObjectPool';

@ccclass('AnimLayer')
export class AnimLayer extends XComponent {

    @property(Node)
    public botCardList: Node[] = [];
    @property(Node)
    public botCard: Node;
    @property(Animation)
    public lordAnim: Animation;


    public targetList: Node[] = [];
    private objectPool: ObjectPool;

    onLoad() {
        this.objectPool = find('Canvas').getComponent(ObjectPool);
        this.resetBotCard();
        Room.eventSystem.on('NotifyBanker', this.onNotifyBanker, this);
        Room.eventSystem.on(Table.NotifyReconnect.name, this.onNotifyReconnect, this);
        Room.eventSystem.on(ExtendTable.NotifyDealCard.name, this.onNotifyDealCard, this);
    }

    onDisable() {
        Room.eventSystem.removeAll(this);
    }

    onNotifyDealCard(data: MsgDealCard) {
        console.log('==AnimLayer==onNotifyDealCard', data.bottomCards);
        this.setBotCardContent(data.bottomCards);
    }

    onNotifyBanker(uid: number) {
        if (uid && uid > 0) {
            let seat = Room.gameData.getLocalSeatByID(uid);
            let headLayer = this.node.parent.getChildByName('HeadLayer');
            let user = headLayer.getChildByName(`userInfo${seat}`);
            let lordIcon = user.getChildByName('lordIcon');
            let worldPos = lordIcon.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO);
            let targetPos = this.lordAnim.node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
            let func = () => {
                this.playFlipCard(true);
                this.lordAnim.removeAll(this);
                tween(this.lordAnim.node).to(10 / 24, { scale: new Vec3(0.3, 0.3), position: targetPos }).call(() => {
                    this.lordAnim.node.active = false;
                    lordIcon.active = true;
                    lordIcon.getComponent(Animation).play();
                }).start();
            }
            this.lordAnim.node.active = true;
            this.lordAnim.on(Animation.EventType.FINISHED, func, this);
            this.lordAnim.play();
        }
    }

    onNotifyReconnect(data: MsgTableInfo) {
        let stage = Room.gameData.curStage;
        console.log('==AnimLayer==onNotifyReconnect', stage);
        if (stage == GameStage.DealCard) {
            this.setBotCardContent(data.bottomCards);
        } else if (stage == GameStage.CallScore || stage == GameStage.CallDealer) {
            this.setBotCardContent(data.bottomCards);
            this.playBotCardAnim();
        } else {
            this.resetBotCard();
        }
    }

    resetBotCard() {
        console.log('==AnimLayer.resetBotCard==');
        this.botCardList.forEach((v) => {
            v.active = false;
            v.setPosition(new Vec3(0, 200))
        });
        for (let i = this.botCard.children.length - 1; i >= 0; i--) {
            this.objectPool.put(this.botCard.children[i]);
        }
    }

    /**
     * 创建底牌
     */
    setBotCardContent(values: number[]) {
        console.log('==AnimLayer.setBotCardContent==');
        this.resetBotCard();
        let posX = [-154, 0, 154];
        for (let i = 0; i < values?.length; i++) {
            let param = { cardByte: values[i], isReverse: true, scale: 0.67 }
            let bigCard = this.objectPool.get({ param: param, name: 'CardView' });
            bigCard.active = false;
            bigCard.setPosition(new Vec3(posX[i], 200));
            this.botCard.addChild(bigCard);
        }
    }

    /**
     * 发完手牌后调用底牌展开
     */
    playBotCardAnim() {
        console.log('==AnimLayer.playBotCardAnim==');
        let posX = [-154, 0, 154];
        let pos = this.botCardList[1].position;
        for (let i = 0; i < this.botCardList.length; i++) {
            let node = this.botCardList[i];
            node.active = true;
            tween(node).to(0.2, { position: new Vec3(pos.x + posX[i], pos.y), scale: new Vec3(0.67, 0.67) }).start();
        }
    }

    /**
     * 确定地主后，翻开底牌
     */
    playFlipCard(isFly?: boolean) {
        console.log('==AnimLayer.playFlipCard==');
        for (let i = 0; i < this.botCardList.length; i++) {
            const botCard = this.botCardList[i];
            const node = this.botCard.children[i];
            node.active = true;
            botCard.active = false;
            botCard.scale = new Vec3(0.67, 0.67);
            botCard.setPosition(new Vec3(0, 200));

            let func = () => { }
            if (i == this.botCardList.length - 1 && isFly) {
                func = this.flyBotCard.bind(this);
            }
            tween(node).delay(0.1 * i).to(0.2, { scale: new Vec3(0, 1) }).call(() => {
                node.getComponent(CardView).isReverse = false;
            }).to(0.2, { scale: new Vec3(1, 1) }).call(func).start();
        }
    }

    /**
     * 底牌飞行至顶部
     */
    flyBotCard() {
        console.log('==AnimLayer.flyBotCard==');
        for (let i = 0; i < this.botCard.children.length; i++) {
            let target = this.targetList[i];
            if (!target) {
                target = find(`Canvas/contentLayer/TopInfo/content/bottomCard/layout/topCard${i + 1}/card`);
                this.targetList[i] = target;
            }
            const node = this.botCard.children[i];
            let worldPos = target.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO);
            let targetPos = node.parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
            tween(node.getComponent(UIOpacity)).to(0.4, { opacity: 0 }).start();
            tween(node).to(0.4, { position: targetPos, scale: new Vec3(0.27, 0.27) })
                .call(() => { this.objectPool.put(node) }).start();
            tween(target).delay(0.4)
                .to(0.2, { position: new Vec3(target.position.x, 20) })
                .to(0.2, { position: new Vec3(target.position.x, 0) }).start();
        }
    }

}