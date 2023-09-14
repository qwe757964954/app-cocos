import { EmptyClass, EventTargetExtends, Log, Net, resLoader, uiMgr } from "bos/exports"
import { StartTableFlag, Fortest, IStartTableReq } from "idl/tss/game/fortest.v1"
import { IJoinResp, Observer } from "idl/tss/game/observer.v5"
import { Table } from "idl/tss/game/table.v2"
import { ITable } from "idl/tss/match_v2/common_matematch"

export interface GameParams {
    gameID: string
    matchType: number
    playWay: number
    playerNum?: number
    matchKey?: string
    tableKey?: string
    observeData?: {
        mainUid: number //主视角
        isRealtime?: boolean
    } //围观数据
    flag?: number //快速开始用
}

enum GameState {
    DEFAULT = 0,
    BOOTING = 1,
    RUNNING = 2,
    EXITING = 3,
}

const GameDeps = {
    "landlord-tysanrenddz": [
        "room",
        "pdk",
    ],
    "mahjong-hnxinxiang": [
        "room",
        "mahjong",
    ]
}

export interface GameDelegate {
    joinObserve(msg: IJoinResp, tableKey: string, mainUid: number)
    switchObserve(uid: number) //切换围观视角
    leaveObserve()
}

class GameMgr extends EventTargetExtends(EmptyClass) {
    private _runningGame: GameParams
    private _state: GameState = GameState.DEFAULT
    private _delegate: GameDelegate

    static EventType = {
        WILL_ENTER_GAME: "willEnterGame",
        DID_ENTER_GAME: "didEnterGame",
        WILL_EXIT_GAME: "willExitGame",
        DID_EXIT_GAME: "didExitGame",
    }

    init() {

    }

    reset() {
        this._runningGame = undefined
        this._state = GameState.DEFAULT
        this._delegate = undefined
    }

    async loadBundle(name: string) {
        return new Promise((resolve) => {
            resLoader.loadBundle(name, (err, bundle) => {
                Log.i("loadBundle...", name, err, bundle)
                resolve(err)
            })
        })
    }

    async loadGame(name: string) {
        for (let i = 0; i < GameDeps[name].length; i++) {
            await this.loadBundle(GameDeps[name][i])
        }
    }

    async tryEnterGame(params: GameParams) {
        if (this._state !== GameState.DEFAULT) {
            return
        }
        Table.setSen(params.gameID)
        this._state = GameState.BOOTING
        this._runningGame = params
        this.emit(GameMgr.EventType.WILL_ENTER_GAME, params)
        await this.loadGame(params.gameID)
        return new Promise((resolve) => {
            uiMgr.loadScene(params.gameID.concat("@Scene"), { params: params }, (err, scene) => {
                this.emit(GameMgr.EventType.DID_ENTER_GAME, params)
                resolve(err)
                this._state = GameState.RUNNING
            })
        }).catch((reason: any)=>{
            Log.e("tryEnterGame...error", reason)
            uiMgr.showToast("进入游戏失败")
            Table.setSen()
            this._state = GameState.DEFAULT
            this._runningGame = undefined
        })
    }

    async enterGame(params: GameParams) {
        Log.i("GameMgr.enterGame...", this._state, params.gameID)
        Net.netMgr.stopDispatchMsg()
        let result = await this.tryEnterGame(params)
        Net.netMgr.startDispatchMsg()
        return result
    }

    async exitGame() {
        Log.i("GameMgr.exitGame...", this._state, this.getRunningGame())
        if (this._state !== GameState.RUNNING) {
            return
        }
        Table.setSen()
        this._state = GameState.EXITING
        return new Promise((resolve) => {
            this.emit(GameMgr.EventType.WILL_EXIT_GAME)
            uiMgr.popScene(null, (err, scene) => {
                this.emit(GameMgr.EventType.DID_EXIT_GAME)
                this._state = GameState.DEFAULT
                this._runningGame = null
                resolve(err)
            })
        })
    }

    async quickStart(params: GameParams) {
        let req: IStartTableReq = {
            playerNum: params.playerNum,
            gameID: params.gameID,
            matchType: params.matchType.toString(),
            flag: StartTableFlag.StartTableFlag_AddRobot,
        }
        let ret = await Fortest.StartTable(req)
        if (ret.err) {
            return
        }

        await this.enterGame(params)
        if (ret.resp.tKey) {
            this.reconnect({
                tKey: ret.resp.tKey,
            })
        }
    }

    getRunningMatchKey(): string {
        return this._runningGame?.matchKey
    }

    getRunningMatchType(): number {
        return this._runningGame?.matchType
    }

    getRunningGame(): string {
        return this._runningGame?.gameID
    }

    async reconnect(params: ITable) {
        let result = await Table.ReconnectTable({}, {
            ext: params.tKey,
            destID: params.srvID,
        })
        return result.err
    }

    setDelegate(delegate: GameDelegate) {
        this._delegate = delegate
    }

    private async tryJoinObserve(params: GameParams) {
        if (this._runningGame) {
            if ((params.gameID != this._runningGame.gameID) || (params.matchType != this._runningGame.matchType)) {
                return new Error("running other game")
            }
            if (this._state != GameState.RUNNING) {
                return new Error("invalid game state")
            }
        }
        let result = await Observer.Join({
            isRealtime: params.observeData?.isRealtime,
        }, {
            ext: params.tableKey
        })
        if (result.err) {
            uiMgr.showToast("加入围观失败")
            return result.err
        }
        if (result.resp.code && result.resp.code != 0) {
            uiMgr.showToast("桌子已经结束")
            return result.resp.code
        }
        if (!this._runningGame) {
            await this.enterGame(params)
        }
        this._delegate?.joinObserve({
            snapshot: result.resp.snapshot,
            behaviors: result.resp.behaviors,
        }, params.tableKey, params.observeData.mainUid)
    }

    async joinObserve(params: GameParams) {
        let result = await this.tryJoinObserve(params)
        return result
    }

    async switchObserve(uid: number) {
        let result = await this._delegate?.switchObserve(uid)
        return result
    }

    async leaveObserve() {
        if (!this._runningGame) {
            return new Error("not join observe")
        }
        let tableKey = this._runningGame.tableKey

        this._delegate.leaveObserve()

        let result = await Observer.Leave({}, {
            ext: tableKey
        })
        return result.err || result.resp.code
    }
}

export { GameMgr }
