import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { ShareWX } from "./Share_wx";
import { ShareQQ } from "./Share_qq";
import { ShareIM } from "./Share_im";

export enum ShareChannel {
    WX,
    QQ,
    IM,
}

export enum WXShareScene {
    Session,
    Timeline,
    Favorites,
}

export type LinkParams = {
    title : string,
    desc : string,
    thumb : string,

    url : string,
}

export type ImgParams = {
    imhPath : string,
}

export type TextParams = {
    text : string,
}

export type MatchInvite = {
    preMatchKey : string,
}

export type IMParams = {
    matchInvite? : MatchInvite,
    replayData? : any,
    img : string,
}

export type ShareParams = {
    channel : number,
    link?: LinkParams,
    img?: ImgParams,
    text?: TextParams,
    wxShareScene? : WXShareScene,
    im? : IMParams,
}

export class ShareMgr extends EventTargetExtends(EmptyClass) {

    wxHandler : ShareWX
    qqHandler : ShareQQ
    imHandler : ShareIM

    init(){
    }

    reset(){

    }

    getHandler(channel){
        if (channel == ShareChannel.WX) {
            if (!this.wxHandler) {
                this.wxHandler = new ShareWX()
            }
            return this.wxHandler
        } else if (channel == ShareChannel.QQ) {
            if (!this.qqHandler) {
                this.qqHandler = new ShareWX()
            }
            return this.qqHandler
        } else if (channel == ShareChannel.IM) {
            if (!this.imHandler) {
                this.imHandler = new ShareIM()
            }
            return this.imHandler
        }
    }

    share(data : ShareParams){
        let channel = data.channel
        let handler = this.getHandler(channel)
        if (handler) {
            handler.share(data)
        } else {
            console.error("ShareMgr share handler is invalid", data)
        }
    }
}