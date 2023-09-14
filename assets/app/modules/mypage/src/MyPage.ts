import { App } from 'app/App';
import { propMgr } from 'app/domain/props/PropMgr';
import { Decorator, storageMgr, uiMgr } from 'bos/exports';
import { _decorator, Component, Node, Sprite, UITransform, SpriteFrame, Widget, ProgressBar, Button, Label, Prefab } from 'cc';
import { EditProfile } from './EditProfile';
import { Color } from 'cc';
import { ItemType } from 'idl/tss/common/common_define';
import { Avatar } from 'app/modules/common/avatar/src/Avatar';
const { ccclass, property } = _decorator;

@ccclass('MyPage')
export class MyPage extends Component {

    @property({ type: Node })
    tipBg: Node | null = null;

    @property({ type: Prefab })
    editorPopup: Prefab | null = null;

    @property({ type: Avatar })
    avatar: Avatar | null = null;

    @property({ type: Label })
    nameLabel: Label | null = null;

    @property({ type: Node })
    gender: Node | null = null;

    @property({ type: Label })
    levelLabel: Label | null = null;

    @property({ type: Label })
    expLabel: Label | null = null;

    @property({ type: ProgressBar })
    expBar: ProgressBar | null = null;

    @property({ type: Label })
    idLabel: Label | null = null;

    @property({ type: Label })
    mungLabel: Label | null = null;

    @property({ type: Button })
    vipBtn: Button | null = null;

    @property({ type: Node })
    knapsackTip: Node | null = null;

    @property({ type: Node })
    noticeTip: Node | null = null;

    @property({ type: SpriteFrame })
    bgWithVip: SpriteFrame | null = null;

    @property({ type: SpriteFrame })
    bgWithoutVip: SpriteFrame | null = null;

    @property({ type: SpriteFrame })
    ManIcon: SpriteFrame | null = null;

    @property({ type: SpriteFrame })
    WomanIcon: SpriteFrame | null = null;

    User = App.userMgr.loginUser;

    start() {
    }

    protected onEnable(): void {
        this.updateScene()
    }
    
    updateScene() {
        this.updateAvatar();
        this.updateName();
        this.updateGender();
        this.updateExp();
        this.updateId();
        this.updateMung();
        this.updateVip();
        this.updateKnapsack();
        this.updateNotice();
    }

    updateAvatar() {//更新头像
        this.avatar.setUserID(this.User.uid);
    }

    updateName() {//更新昵称
        let name = this.User.nickname;
        if (name.length == 0) {
            name = '昵称不能为空';
        }
        this.nameLabel.string = name;
        this.nameLabel.node.getComponent(Label).updateRenderData(true);
        let left = this.nameLabel.node.getComponent(Widget).left;
        let width = this.nameLabel.node.getComponent(UITransform).width;
        this.gender.getComponent(Widget).left = left + width + 20;
    }

    updateGender() {//更新性别
        let gender = this.User.gender;
        if (gender == 1) {
            this.gender.getComponent(Sprite).spriteFrame = this.ManIcon;
        } else {
            this.gender.getComponent(Sprite).spriteFrame = this.WomanIcon;
        }
    }

    updateExp() {//更新经验
        // let level = this.User.level
        // let exp = this.User.exp
        // if (exp) {
        // this.levelLabel.string = 'LV: ' + String(this.User.level)
        //     this.expLabel.string = exp
        //     this.expBar.progress = Number(exp) / 50
        // }
    }

    updateId() {//更新ID
        let uid = this.User.uid;
        this.idLabel.string = 'ID: ' + String(uid);
        this.idLabel.node.getComponent(Label).updateRenderData(true);
    }

    async getMungNum() {//获取奖券数量
        return await propMgr.getUserPropNumByType(ItemType.ItemTypeMung) || 0;
    }

    async updateMung() {//更新奖券
        let mung = await this.getMungNum();
        this.mungLabel.string = mung as unknown as string;
        this.mungLabel.node.getComponent(Label).updateRenderData(true);
    }

    updateVip() {
        const isVip = App.premiumMgr.isVip();
        if (isVip) {
            this.nameLabel.color = new Color(229, 190, 119);
            this.tipBg.getComponent(Sprite).spriteFrame = this.bgWithVip;
            this.vipBtn.node.getChildByName('Label').getComponent(Label).string = '立即续费';
        } else {
            this.nameLabel.color = new Color(255, 255, 255);
            this.tipBg.getComponent(Sprite).spriteFrame = this.bgWithoutVip;
            this.vipBtn.node.getChildByName('Label').getComponent(Label).string = '立即开通';
        }
    }

    updateKnapsack() {//如果背包有新物品，显示提示。统一的一个红点管理
        // let newProp = storageMgr.get('NEWPROP')
        // if(newProp){
        //     this.knapsackTip.active = true
        // }else{
        //     this.knapsackTip.active = false
        // }
    }

    updateNotice() {//如果有新公告，显示提示
        // let newNotice = storageMgr.get('NEWNOTICE')
        // if(newNotice){
        //     this.noticeTip.active = true
        // }else{
        //     this.noticeTip.active = false
        // }
    }

    clickEditor() {//编辑个人资料
        if (this.editorPopup) {
            let pop = uiMgr.pushPopup(this.editorPopup);
            pop.getComponent(EditProfile).confirmCallBack = () => {
                this.updateScene()
            }
            pop.getComponent(EditProfile).changeGender = () => {
                this.updateGender();
            };
        }
    }

    clickEXP() {// 升级奖励
        console.log('clickEXP');
        //  App.navMgr.navTo(App.navCfg.VIP_MALL)
    }

    clickAvatar() {//点击头像，弹出更换头像界面
        console.log('clickAvatar');
        //  App.navMgr.navTo(App.navCfg.VIP_MALL)
    }

    clickMung() {//点击奖券按钮，弹出奖券流水界面
        console.log('clickMung');
        // App.navMgr.navTo(App.navCfg.MUNG)
    }

    clickVip() {//点击vip按钮，弹出vip界面
        App.navMgr.navTo(App.navCfg.VIP_MALL);
    }

    clickKnapsack() {//点击背包按钮，弹出背包界面
        App.navMgr.navTo(App.navCfg.KNAPSACK);
    }

    clickRecord() {//点击战绩按钮，弹出战绩界面
        console.log('clickRecord');
        // App.navMgr.navTo(App.navCfg.RECORD)
    }

    clickNotice() {//点击公告按钮，弹出公告界面
        console.log('clickNotice');
        // App.navMgr.navTo(App.navCfg.NOTICE)
    }

    clickSetting() {//点击设置按钮，弹出设置界面
        App.navMgr.navTo(App.navCfg.SETTING);
    }

    clickMail() {//点击邮件，弹出设置界面
        App.navMgr.navTo(App.navCfg.MAIL);
    }

    update(deltaTime: number) {

    }
}


