import { IListSPUByUserReq, MallService } from "idl/tss/hall/mall.v2";

export class Gateway {
    async listSpuByUser(req: IListSPUByUserReq) {
        let result = await MallService.ListSPUByUser(req)
        if (result.err) {
            return
        }
        return result.resp
    }
}