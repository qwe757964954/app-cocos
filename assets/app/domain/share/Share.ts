import { ShareParams } from "./ShareMgr";

export abstract class Share {
    share(data : ShareParams){
        if (data.link) {
            this.shareLink(data)
        } else if(data.img) {
            this.shareImage(data)
        } else if (data.text) {
            this.shareText(data)
        }
    }

    abstract shareText(data : ShareParams)
    abstract shareImage(data : ShareParams)
    abstract shareLink(data : ShareParams)
}



