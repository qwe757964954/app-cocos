import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum Mode {  
    Default = 0,  
    Route = 1,  
    Queue = 2,  
    Notify = 3,  
    NotifyRoute = 4,  
    NotifyStream = 5,
}
export enum LogLevel {  
    LogLevelTrace = 0,  
    LogLevelDebug = 1,  
    LogLevelInfo = 2,  
    LogLevelWarn = 3,  
    LogLevelError = 4,  
    LogLevelFatal = 5,
}
export enum CompareType {  
    CompareTypeEqual = 0,  
    CompareTypeGt = 1,  
    CompareTypeLt = 2,
}
export enum ErrorCode {  
    OK = 0,  
    NoContent = 1,  
    BadRequest = 2,  
    Unauthorized = 3,  
    MethodNotAllowed = 4,  
    RequestTimeout = 5,  
    InternalServerError = 6,  
    ServiceNotFound = 7,  
    MethodNotFound = 8,  
    NetworkException = 9,  
    ServiceUnavailable = 10,  
    QueueNotFound = 11,  
    Internal = 12,  
    AsyncReturn = 13,  
    Unknown = 14,  
    InsufficientResources = 15,  
    EOF = 16,  
    RouterException = 17,  
    Max = 1000,
}
export interface ILogOption {
    code_options?: IErrorCodeLogOption[]
    print_meta_keys?: string[]
}
@protobuf.Type.d("mahjong_kitproto_LogOption")
export class LogOption extends protobuf.Message<ILogOption> {
    constructor(properties: Properties<ILogOption>) {
        super(properties);
        if (properties) {
            if (properties.code_options) { this.code_options = []; properties.code_options.forEach((value, index)=>{this.code_options[index] = ErrorCodeLogOption.create(properties.code_options[index]) as any})}
            if (properties.print_meta_keys) { this.print_meta_keys = []; properties.print_meta_keys.forEach((value, index)=>{this.print_meta_keys[index] = properties.print_meta_keys[index]})}
        }
	}
    @protobuf.Field.d(1, "mahjong_kitproto_ErrorCodeLogOption", "repeated")
    public code_options?: ErrorCodeLogOption[] = []
    @protobuf.Field.d(2, "string", "repeated", [])
    public print_meta_keys?: string[] = []
}
export interface IErrorCodeLogOption {
    code?: ErrorCode|null
    custom_code?: number|null
    compare?: CompareType|null
    level?: LogLevel|null
}
@protobuf.Type.d("mahjong_kitproto_ErrorCodeLogOption")
export class ErrorCodeLogOption extends protobuf.Message<IErrorCodeLogOption> {
    constructor(properties: Properties<IErrorCodeLogOption>) {
        super(properties);
        if (properties) {
            if (properties.code) { this.code = properties.code }
            if (properties.custom_code) { this.custom_code = properties.custom_code }
            if (properties.compare) { this.compare = properties.compare }
            if (properties.level) { this.level = properties.level }
        }
	}
    @protobuf.Field.d(1, ErrorCode, "optional", ErrorCode.OK)
    public code?: ErrorCode|null = ErrorCode.OK
    @protobuf.Field.d(2, "int32", "optional", 0)
    public custom_code?: number|null = 0
    @protobuf.OneOf.d("code","custom_code")
    public error_code?: ("code"|"custom_code")
    @protobuf.Field.d(3, CompareType, "optional", CompareType.CompareTypeEqual)
    public compare?: CompareType|null = CompareType.CompareTypeEqual
    @protobuf.Field.d(4, LogLevel, "optional", LogLevel.LogLevelTrace)
    public level?: LogLevel|null = LogLevel.LogLevelTrace
}