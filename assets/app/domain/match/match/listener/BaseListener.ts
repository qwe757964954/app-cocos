import { Log } from "bos/base/log/Log"
import { MatchHandler } from "../handler/MatchHandler";
import { RoomInfo } from "../data/RoomInfo";
import { RpcParams } from "bos/framework/network/rpc/RpcService";

export abstract class BaseListener {
    handler : MatchHandler = null
    roomInfo : RoomInfo = null

    key:string = ""

    constructor(handler : MatchHandler, roomInfo : RoomInfo) {
        this.handler = handler
        this.roomInfo = roomInfo
    }

    abstract filterMsg(key : string): boolean

    setKey(key: string){
        this.key = key
    }

    dispatchMsg(data) {
        let [method, resp, params] = data
        console.warn("BaseListener onResponse", method, resp, params)
        if (this["on" + method]) {
            this["on" + method](resp, params)
        } else {
            console.warn("没有对应的函数实现，funcName = ：", method)
        }
           
    }
    
    onResponse(method:string, resp, params : RpcParams) {
        if (this.filterMsg(params.ext)) { 
            this.handler.pushTask({
                target : this,
                executor : this.dispatchMsg,
                args :[method, resp, params]
            })
        } else {
            console.warn("过滤了消息....", method)
        }
    }

}