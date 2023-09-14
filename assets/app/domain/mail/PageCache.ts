import { IMailBriefData, MailBriefData } from "idl/tss/hall/mail.v2";

export type PageData = {
    page?: number;
    pageSize?: number;
    value?: IMailBriefData[];
    total?: number;
};

export class PageCache {
    _list: IMailBriefData[] = [];
    _total: number = 0;
    _cur: number = 0;
    constructor() {
        this.reset();
    }
    reset() {
        this._list = [];
        this._total = 0;
        this._cur = 0;
    }

    getPage(data: PageData) {
        if (!data) {
            return;
        }
        const { page, pageSize } = data;
        const total = page * pageSize;
        // 超出缓存大小
        if (total < this._total && total > this._cur) {
            return;
        }
        const offset = (page - 1) * pageSize;
        const t: any[] = [];
        for (let i = offset + 1; i <= offset + pageSize; i++) {
            if (i > this._total) {
                break;
            }
            const v = this._list[i];
            if (v) {
                t.push(v);
            } else {
                return;
            }
        }
        return {
            value: t,
            total: this._total,
        };
    }
    setPage(data: PageData) {
        const { page, pageSize, value, total } = data;
        const offset = (page - 1) * pageSize;
        const valSize = value.length;
        const size = pageSize > valSize ? valSize : pageSize;

        for (let i = 0; i < size; i++) {
            this._list[offset + i] = value[i];
        }

        // 更新当前数据总量
        const cur = offset + size;
        if (cur > this._cur) {
            this._cur = cur;
        }

        // 拉取完全部数据
        this._total = total;
    }
}
