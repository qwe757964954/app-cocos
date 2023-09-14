import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { EditBox } from 'cc';
import { Label } from 'cc';
import { Toggle } from 'cc';
import { Room } from 'game/room/Room';
import { Log, uiMgr } from 'bos/exports';
import * as CustomerSvcPKG from 'idl/tss/hall/customersvc.v1';

@ccclass('Report')
export class Report extends XComponent {

    @property(Node)
    public bg: Node | null = null;

    @property(Node)
    public infoBg: Node | null = null;

    @property(EditBox)
    public textBox: EditBox | null = null;

    @property(Node)
    public userReport1: Node | null = null;

    @property(Node)
    public userReport2: Node | null = null;

    @property(Node)
    public userReport3: Node | null = null;

    @property(Label)
    public name1: Label | null = null;

    @property(Label)
    public name2: Label | null = null;

    @property(Label)
    public name3: Label | null = null;

    @property(Toggle)
    public userToggle1: Toggle | null = null;

    @property(Toggle)
    public userToggle2: Toggle | null = null;

    @property(Toggle)
    public userToggle3: Toggle | null = null;

    @property(Toggle)
    public reasonToggle1: Toggle | null = null;

    @property(Toggle)
    public reasonToggle2: Toggle | null = null;

    @property(Toggle)
    public reasonToggle3: Toggle | null = null;

    @property(Toggle)
    public reasonToggle4: Toggle | null = null;

    onClose() {
        uiMgr.removePopup(this.node);
    }

    //提交举报内容
    onSubmit() {
        let reportTypes: number[] = [];
        if (this.reasonToggle1.isChecked) {
            reportTypes.push(CustomerSvcPKG.ReportType.ReportTypeAvatar);
        }
        if (this.reasonToggle2.isChecked) {
            reportTypes.push(CustomerSvcPKG.ReportType.ReportTypeNickname);
        }
        if (this.reasonToggle3.isChecked) {
            reportTypes.push(CustomerSvcPKG.ReportType.ReportTypeTalk);
        }
        if (this.reasonToggle4.isChecked) {
            reportTypes.push(CustomerSvcPKG.ReportType.ReportTypeCheat);
        }
        reportTypes.length == 0 && reportTypes.push(CustomerSvcPKG.ReportType.ReportTypeNotSpecified);

        let desc: string = this.textBox.string;

        let players = Room.gameData.getAllPlayer();
        for (let index = 0; index < players.length; index++) {
            const player = players[index];
            if (player.uid != Room.gameData.getMyID()) {
                let toggle: Toggle = this[`userToggle${index}`];
                if (toggle.isChecked) {
                    let userReport: CustomerSvcPKG.IUserReport = {
                        uid: Room.gameData.getMyID(),
                        reportedUid: player.uid,
                        reportedAvatar: player.avatar,
                        reportedNickname: player.nickname,
                        type: reportTypes,
                        desc: desc,
                    };
                    let req: CustomerSvcPKG.ICreateUserReportReq = {
                        userReport: userReport,
                    };
                    this.createUserReport(req);
                }
            }
        }
    }

    async createUserReport(req: CustomerSvcPKG.ICreateUserReportReq){
        let ret = await CustomerSvcPKG.Customersvc.CreateUserReport(req);
        Log.d("==CreateUserReport==",req, ret)
        if (ret.err) {
            uiMgr.showToast("举报失败");
        } else {
            uiMgr.showToast("举报成功");
            this.onClose();
        }
    } 

    setup() {
        this.showReport();
    }

    showReport(){
        let players = Room.gameData.getAllPlayer();
        for (let index = 0; index < players.length; index++) {
            const player = players[index];
            if (player.uid != Room.gameData.getMyID()) {
                this[`userReport${index}`].active = true;
                this[`name${index}`].string = player.nickname;
            }
        }
        this.bg.active = true;
        this.infoBg.active = true;
    }

    update(deltaTime: number) {

    }
}