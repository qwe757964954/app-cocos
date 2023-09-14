import { App } from 'app/App';
import { User } from 'app/domain/user/User';
import { resLoader, uiMgr } from 'bos/exports';
import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('userInfo')
export class userInfo extends Component {

    @property({ type: Node })
    report: Node | null = null

    @property({ type: Node })
    addFriend: Node | null = null

    @property({ type: Node })
    applied: Node | null = null

    @property({ type: Label })
    nickName: Label | null = null

    @property({ type: Label })
    id: Label | null = null

    @property({ type: Label })
    level: Label | null = null

    @property({ type: Node })
    gamePage: Node | null = null

    @property({ type: Node })
    achievementPage: Node | null = null

    @property({ type: Node })
    recordPage: Node | null = null

    user: User | null = null

    myID: number = 0

    start() {
        this.myID = App.userMgr.loginUser.uid
    }

    setup(params: { user: User }) {
        this.user = params.user
        this.updateUserInfo()
    }

    updateBtn() {
        if (this.myID == this.user.uid) return
        // this.report.active = true //举报
        if ("isfriend") return //如果已经是好友
        if ("isapplied") { //如果已经申请过
            this.applied.active = true
            return
        }
        this.addFriend.active = true
    }

    updateUserInfo() {
        if (!this.user) return
        this.nickName.string = this.user.nickname
        this.id.string = "ID:" + this.user.uid.toString()
        this.level.string = "lv." + "999" //目前没有等级经验数据
    }

    //去好友圈
    gotoFriendCircle() {
        resLoader.loadPrefab("prefabs/friendCircle/friendCircle", (err, prefab) => {
            if (err) {
                return;
            }
            uiMgr.pushPage(prefab, { params: { userID: "userID" } })
        })
    }

    //点击举报
    clickReport() {
    }

    //点击添加好友
    clickAddFriend() {
        this.applied.active = true
        this.addFriend.active = false
        //发送申请
    }

    openGamePage() {
        this.achievementPage.active = false
        this.recordPage.active = false
        this.gamePage.active = true
    }

    openAchievementPage() {
        this.gamePage.active = false
        this.recordPage.active = false
        this.achievementPage.active = true
    }

    openRecordPage() {
        this.gamePage.active = false
        this.achievementPage.active = false
        this.recordPage.active = true
    }

    closePop() {
        uiMgr.popPopup()
    }
}


