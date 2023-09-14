import * as cc from "cc"
import { getCallStack, getDateString } from "./LogUtils"

const __log__ = console.log
const __info__ = console.info
const __warn__ = console.warn
const __error__ = console.error

export enum LogLevel {
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4
}

export class LogConfig {
    isDebug: boolean
    level: LogLevel

    constructor(props: Properties<LogConfig>) {
        this.update(props)
    }

    update(props: Properties<LogConfig>) {
        Object.assign(this, props)
    }
}

class Logger {
    private _tags = new Map<string, string>()
    private _tagStr = undefined
    private static _config = new LogConfig({
        isDebug: true, 
        level: LogLevel.DEBUG
    })

    constructor() {
        this.refresh()
    }

    public setup(config: LogConfig) {
        Logger._config.update(config)
        this.refresh()
    }
    
    public d(...params: any[]) {
        this.log(LogLevel.DEBUG, ...params)
    }

    public i(...params: any[]) {
        this.log(LogLevel.INFO, ...params)
    }

    public w(...params: any[]) {
        this.log(LogLevel.WARN, ...params)
    }

    public e(...params: any[]) {
        this.log(LogLevel.ERROR, ...params)
    }

    public setTag(key: string, value?: string) {
        this._tags.set(key, value)

        let tagArr = []
        this._tags.forEach((val, key)=>{
            tagArr.push(`[${val}]`)
        })
        const tagStr = "".concat(...tagArr)
        this._tagStr = tagStr

        this.refresh(tagStr)
    }

    private log(level, ...params: any[]) {
        //TODO:发布日志处理
        this._tagStr ?? params.unshift(this._tagStr)
        params.unshift(`[${getCallStack(4)}]`)
        params.unshift(`[${getDateString()}]`)
        params.forEach((value, index)=>{
            if (value && value.hasOwnProperty("toString")) {
                params[index] = value.toString.call(value)
            }
        })
    }

    private refresh(...args: any[]) {
        __log__("reset...")
        if (Logger._config.isDebug) {
            this.d = __log__.bind(console, ...args)
            this.i = __info__.bind(console, ...args)
            this.w = __warn__.bind(console, ...args)
            this.e = __error__.bind(console, ...args)
        }
    }
}

export {Logger}