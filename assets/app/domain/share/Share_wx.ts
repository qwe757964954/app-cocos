import { Share } from "./Share";
import { ShareParams } from "./ShareMgr";

export class ShareWX extends Share{
    shareText(data : ShareParams) {
        
    }

    shareImage(data : ShareParams) {
        
    }

    shareLink(data : ShareParams) {
        let link = data.link
        let wxShareScene = data.wxShareScene

        //TODO
    }
}