export class NetConfig {
    appid: string
    token: string
    spaceName?: string
    mustMetadata: {
        ApplicationId: string
        ApplicationVer: string
    }
    heartbeatInterval? = 6 * 1000
    heartbeatTimeout? = 6 * 2 * 1000
    ap = {
        url: "",
        ver: 0,
        list: [],
        pingNum: 5,
        pingDelay: 460,
        pingInterval: 2000,
    }
}

export enum NetState {
    Default = 0,
    Connecting = 1,
    Connected = 2,
    Registered = 3,
    Closing = 4,
}