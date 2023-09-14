import { EventTargetExtends, EmptyClass, storageMgr } from 'bos/exports';
import { _decorator, Component, Node } from 'cc';
import { MessageType } from 'idl/mp/common/social.im';
import { ICmdReq, IGetByChatReq, IGetMenusByChatReq, IListReq, IMenuQueryReq, IOfficialAccount, officialaccountService } from 'idl/mpff/social/officialaccount.v1';
import { IM } from 'qsdk/im/IM';
import { ChatType } from 'qsdk/im/config/define';
import { Message } from 'qsdk/im/core/Message';
import { Session } from 'qsdk/im/core/Session';
const { ccclass, property } = _decorator;

@ccclass('OfficialAccount')
export class OfficialAccount extends EventTargetExtends(EmptyClass) {
    private officialAccountList: IOfficialAccount[] = []

    private static instance: OfficialAccount = null
    public static getInstance() {
        if (this.instance == null) {
            this.instance = new (OfficialAccount)
        }
        return this.instance
    }

    public async init() {
        let { err, resp } = await this.getOfficialAccountList()
        if (!err) {
            this.officialAccountList = resp.list
            for (let index = 0; index < this.officialAccountList.length; index++) {
                this.createSession(this.officialAccountList[index])
            }
        }
    }


    private async getOfficialAccountList() {
        let req: IListReq = {}
        return await officialaccountService.List(req)
    }

    private createSession(officialAccount: IOfficialAccount) {
        let toID: number = officialAccount.info.chatID;
        let topRank: number = 0;
        if (officialAccount.config.isSessionTop === true) {
            topRank = 9;
        }

        let message = new Message()
        message.fromID = IM.getInstance().myUid
        message.toID = toID
        message.chatType = ChatType.Official
        message.type = MessageType.Text

        let session: Session = IM.getInstance().processor.addTempSession(message)
        session.name = officialAccount.info.name;

        IM.getInstance().processor.sortSession();
    }

    /**
     * 获取一个公众号
     * @param id 公众号ID
     * @returns 公众号
     */
    public getOfficialAccount(id: string): IOfficialAccount | undefined {
        for (const v of this.officialAccountList || []) {
            if (v.info.id === id) {
                return v;
            }
        }
    }

    public getOfficialAccountByChatID(chatID: number): IOfficialAccount | undefined {
        for (const v of this.officialAccountList || []) {
            if (v.info.chatID === chatID) {
                return v;
            }
        }
    }

    /**
     * 
     * @param id 公众号ID
     * @returns 公众号聊天ID
     */
    public getChatID(id: string) {
        let account = this.getOfficialAccount(id)
        if (account) {
            return account.info.chatID
        }
    }

    /**
     * 获取公众号信息
     * @param req 
     * @returns 
     */
    public async getByChat(req: IGetByChatReq) {
        return await officialaccountService.GetByChat(req)
    }


    /**
     * 获取公众号菜单
     * @param req 
     * @returns 
     */
    public async getMenusByChat(req: IGetMenusByChatReq) {
        return await officialaccountService.GetMenusByChat(req)
    }

    /**
     * 子菜单跳转
     */
    public async menuQuery(req: IMenuQueryReq) {
        return await officialaccountService.MenuQuery(req)
    }


    public async cmd(req: ICmdReq) {
        return await officialaccountService.Cmd(req)
    }

    public async hotQuestionQuery(req) {

        const timeCacheKey = "lastQueryTime_" + AppConfig.appID + "_" + IM.getInstance().myUid;
        const lastQueryTime = storageMgr.get(timeCacheKey);

        let isNeedQuery = true;
        const currentTime = new Date()
        if (lastQueryTime && lastQueryTime) {
            const lastTime = new Date(lastQueryTime)

            if (
                lastTime.getFullYear() == currentTime.getFullYear() &&
                lastTime.getMonth() == currentTime.getMonth() &&
                lastTime.getDay() == currentTime.getDay()
            ) {
                isNeedQuery = false;
            }
        }
        // isNeedQuery = true
        if (isNeedQuery) {
            const chatID = req.chatID;
            const official = this.getOfficialAccountByChatID(chatID);
            if (official) {
                const cmd = {
                    id: official.info.id,
                    cmd: "mp.hotquestions",
                };
                let { err, resp } = await this.cmd(cmd)
                if (!err) {
                    storageMgr.set(timeCacheKey, currentTime.toDateString());
                    console.log("this.cmd(cmd)", resp)
                }
            }
        }
    }

}

