import { Share } from "./Share";
import { ShareParams } from "./ShareMgr";

export class ShareIM extends Share{

    share(data : ShareParams){
        let im = data.im
        if (im) {
            if (im.matchInvite) {
                this.shareGameInvite()
            } else if (im.replayData) {
                this.shareReplay()
            } else if (im.img) {
                this.shareImage()
            }
        } else {
            console.error("ShareIM share the params of im is invalid", data)
        }
    }

    shareText(data : ShareParams) {}
    shareLink(data : ShareParams) {}

    shareGameInvite() {
        
    }

    shareReplay() {

    }

    shareImage() {

    }
}