import { RpcService } from "bos/framework/network/rpc/RpcService";
import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { Observer as GameObserver, IJoinResp, IMsgBehavior} from "idl/tss/game/observer.v5"
import { MatchHandler } from "../handler/MatchHandler";
import { MTable } from "../data/TableInfo";
import { App } from "app/App";

export class TableObHandler extends EventTargetExtends(EmptyClass){

    _table : MTable
    _realKey : string
    _observerUID : number       //主视角
    _followUID : number         //追踪目标
    _handler : MatchHandler


    constructor(handler : MatchHandler, table : MTable,  uid : number, isFollow : boolean) {
        super()

        this._handler = handler
        this._table = table
        this._realKey = table.realKey
        this._observerUID = uid
        if (isFollow) {
            this._followUID = uid
        }

        this.startListener()
    }

    get realKey(){
        return this._realKey
    }

    get observerUID(){
        return this._observerUID
    }

    set observerUID(observerUID){
        this._observerUID = observerUID
    }

    get followUID(){
        return this._followUID
    }

    set followUID(followUID){
        this._followUID = followUID
    }

    startListener(){
        console.warn("TableObHandler startListener")
        GameObserver.on(RpcService.EventType.NOTIFICATION,this.onResponse, this)
    }

    stopListener(){
        console.warn("TableObHandler stopListener")
        GameObserver.off(RpcService.EventType.NOTIFICATION,this.onResponse, this)
    }

    onResponse(method:string, resp, params){
        if (params.ext == this._realKey) {
            if (this["on" + method]) {
                this["on" + method](resp, params)
            } else {
                console.warn("TableObHandler onResponse 没有对应的函数实现，funcName = ：", method)
            }
        } else {
            console.warn("TableObHandler onResponse tableKey 不匹配")
        }
    }

    onNotifyUserLeave(resp, params){
        //没有追踪目标则退出
        if (!this.followUID) {
             //未参赛并且没有追踪目标，可以退出游戏
            this._handler.leaveTableObserver(!this._handler.isRealTime && !this.followUID)
        }
    }

    async reconnect(){
        let err = await App.gameMgr.joinObserve({
            gameID : this._handler.roomInfo.config.getGameID(),
            matchType : this._handler.roomInfo.config.getMatchType(),
            playWay : this._handler.roomInfo.config.getPlayOpt(),
            playerNum : this._handler.roomInfo.config.getSeatNum(),
            matchKey : this._handler.preMatchKey,
            tableKey : this._table.realKey,
            observeData: {
                mainUid: this.followUID, //主视角
                isRealtime : this._handler.isRealTime
            }
        })

        if (err) {
            this._handler.leaveTableObserver(true)
        }
    }

    reset(){
        this.stopListener()
    }
}