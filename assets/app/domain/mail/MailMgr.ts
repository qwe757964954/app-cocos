import { EmptyClass, EventTargetExtends } from 'bos/utils/ClassUtils';
import { App } from 'app/App';
import { MemCache } from 'bos/base/cache/MemCache';

let cacheKey = 'MailList';

import { PageCache, PageData } from './PageCache';
import { IAcceptAwardReq, IBatchAcceptAwardReq, IClearUserNewMailFlagReq, IDeleteAllUserMailReq, IDeleteMailReq, IGetSysMailReq, IListSysMailsReq, Mail } from 'idl/tss/hall/mail.v2';

export class MailMgr extends EventTargetExtends(EmptyClass) {
    private _cache = new MemCache();
    constructor() {
        super();
        this.init();
    }
    init() {
        this.on('onLogout', this.onLogOut, this);
    }
    destroy() {
        this.removeAll(this);
        this._cache.reset();
    }
    onLogOut() {
        this._cache.reset();
    }
    getMyUID() {
        return App.userMgr.loginUid;
    }

    getCache(params: { page: number, pageSize: number; }) {
        const pageData = {
            page: params.page || 1,
            pageSize: params.pageSize || 30,
        };
        let t = this._cache.get(cacheKey);
        if (t) {
            let ret = t.getPage(pageData);
            if (ret) {
                return ret.value;
            }
        }
    }

    setPage(k: string, v: PageData, expire?: number) {
        let t = this._cache.get(cacheKey);
        if (!t) {
            t = new PageCache();
            this._cache.set(k, t, expire);
        }
        t.setPage(v);
    }

    async GetMailList(req: IListSysMailsReq) {
        let ret = await Mail.ListSysMails(req);
        if (ret.resp) {
            const pageData: PageData = {
                page: req.page,
                pageSize: req.pageSize,
                value: ret.resp.data,
                total: ret.resp.total,
            };
            this.setPage(cacheKey, pageData);
        }
        return ret;
    }
    async ClearUserNewMailFlag(senderType: number) {
        const req: IClearUserNewMailFlagReq = {
            uid: this.getMyUID(),
            senderType: senderType,
        };
        return await Mail.ClearUserNewMailFlag(req);
    }
    async ClearUserNewMailFlagAsync(senderType: number) {
        const req: IClearUserNewMailFlagReq = {
            uid: this.getMyUID(),
            senderType: senderType,
        };
        return await Mail.ClearUserNewMailFlag(req);
    }
    async GetSysMail(mid: string) {
        const req: IGetSysMailReq = {
            MiD: mid,
        };
        return await Mail.GetSysMail(req);
    }
    async AcceptAward(mid: string) {
        const req: IAcceptAwardReq = {
            MID: mid,
            UID: this.getMyUID(),
        };
        return await Mail.AcceptAward(req);
    }
    async DeleteMail(mid: string) {
        const req: IDeleteMailReq = {
            MiD: mid,
        };
        return await Mail.DeleteMail(req);
    }
    async DeleteAllUserMail(sendType: number) {
        const req: IDeleteAllUserMailReq = {
            uid: this.getMyUID(),
            senderType: sendType,
        };
        return await Mail.DeleteAllUserMail(req);
    }
    async BatchAcceptAward() {
        const req: IBatchAcceptAwardReq = {
            UID: this.getMyUID(),
        };
        return await Mail.BatchAcceptAward(req);
    }
}

const mailMgr = new MailMgr();
export { mailMgr };
