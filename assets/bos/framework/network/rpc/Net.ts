export enum MSGType {  
    CallRequest = 0,  
    PushRequest = 1,  
    Stream = 2,
}

export interface IByHead {
    Server?: string|null
    Method?: string|null
    DestID?: number|null
    Req?: number|null
    MType?: MSGType|null
    StreamID?: number|null
}

export interface IByPack {
    Header?: IByHead
    Body?: Uint8Array
    Metadata?: { [k: string]: string|null }
    Err?: number|null
    ErrMsg?: string|null
    BitState?: Uint8Array
    Ext?: Uint8Array
}

export enum NetState {
    Default = 0,
    Connecting = 1,
    Connected = 2,
    Registered = 3,
    Closing = 4,
}