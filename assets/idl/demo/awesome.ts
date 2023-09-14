import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
import {  Label as base_Label,ILabel as base_ILabel ,  ExceptionResp as base_ExceptionResp,IExceptionResp as base_IExceptionResp ,  } from "idl/base/base"
import {  Code as base_Code ,  } from "idl/base/code"
export enum AwesomeCode {  
    default = 0,  
    ok = 1,
}
export interface IAwesomeSubMessage {
    subField?: string|null
}
@protobuf.Type.d("awesomepackage_AwesomeSubMessage")
export class AwesomeSubMessage extends protobuf.Message<IAwesomeSubMessage> {
    constructor(properties: Properties<IAwesomeSubMessage>) {
        super(properties);
        if (properties) {
            if (properties.subField) { this.subField = properties.subField }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public subField?: string|null = ""
}
export interface IAwesomeMessage {
    awesomeField?: string|null
    msgMap?: { [k: string]: AwesomeSubMessage }
    strMap?: { [k: string]: string|null }
    longMap?: { [k: string]: number|null }
    awesomeBytes?: Uint8Array
    intValue?: number|null
    strValue?: string|null
    awesomeLong?: number|null
    awesomeArray?: number[]
    enumMap?: { [k: string]: AwesomeCode }
    subMsg?: IAwesomeSubMessage
    baseLabel?: base_ILabel
    baseCode?: base_Code|null
    awesomeLongs?: number[]
}
@protobuf.Type.d("awesomepackage_AwesomeMessage")
export class AwesomeMessage extends protobuf.Message<IAwesomeMessage> {
    constructor(properties: Properties<IAwesomeMessage>) {
        super(properties);
        if (properties) {
            if (properties.awesomeField) { this.awesomeField = properties.awesomeField }
            if (properties.msgMap) { this.msgMap = properties.msgMap }
            if (properties.strMap) { this.strMap = properties.strMap }
            if (properties.longMap) { this.longMap = properties.longMap }
            if (properties.awesomeBytes) { this.awesomeBytes = properties.awesomeBytes }
            if (properties.intValue) { this.intValue = properties.intValue }
            if (properties.strValue) { this.strValue = properties.strValue }
            if (properties.awesomeLong) { this.awesomeLong = properties.awesomeLong }
            if (properties.awesomeArray) { this.awesomeArray = []; properties.awesomeArray.forEach((value, index)=>{this.awesomeArray[index] = properties.awesomeArray[index]})}
            if (properties.enumMap) { this.enumMap = properties.enumMap }
            if (properties.subMsg) { this.subMsg = AwesomeSubMessage.create(properties.subMsg) as any }
            if (properties.baseLabel) { this.baseLabel = base_Label.create(properties.baseLabel) as any }
            if (properties.baseCode) { this.baseCode = properties.baseCode }
            if (properties.awesomeLongs) { this.awesomeLongs = []; properties.awesomeLongs.forEach((value, index)=>{this.awesomeLongs[index] = properties.awesomeLongs[index]})}
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public awesomeField?: string|null = ""
    @protobuf.MapField.d(2, "int64", AwesomeSubMessage)
    public msgMap?: { [k: string]: AwesomeSubMessage } = {}
    @protobuf.MapField.d(3, "int64", "string")
    public strMap?: { [k: string]: string|null } = {}
    @protobuf.MapField.d(4, "int64", "int64")
    public longMap?: { [k: string]: number|null } = {}
    @protobuf.Field.d(5, "bytes", "optional", [])
    public awesomeBytes?: Uint8Array
    @protobuf.Field.d(100, "int32", "optional", 0)
    public intValue?: number|null = 0
    @protobuf.Field.d(200, "string", "optional", )
    public strValue?: string|null = ""
    @protobuf.OneOf.d("intValue","strValue")
    public awesomeOne?: ("intValue"|"strValue")
    @protobuf.Field.d(6, "int64", "optional", 0)
    public awesomeLong?: number|null = 0
    @protobuf.Field.d(7, "int64", "repeated", [])
    public awesomeArray?: number[] = []
    @protobuf.MapField.d(8, "int64", AwesomeCode)
    public enumMap?: { [k: string]: AwesomeCode } = {}
    @protobuf.Field.d(9, "awesomepackage_AwesomeSubMessage", "optional")
    public subMsg?: AwesomeSubMessage|null
    @protobuf.Field.d(10, "base_Label", "optional")
    public baseLabel?: base_Label|null
    @protobuf.Field.d(11, base_Code, "optional", base_Code.CODE_OK)
    public baseCode?: base_Code|null = base_Code.CODE_OK
    @protobuf.Field.d(12, "int64", "repeated", [])
    public awesomeLongs?: number[] = []
}
class $AwesomeService extends RpcService {
    async sayHello(req: base_ILabel, params?: RpcParams) : Promise<{err:number, resp:base_IExceptionResp}> {
        let data = base_Label.create(req)
        this.onBeforeReq("sayHello", data, params)
        const buffer = base_Label.encode(data).finish()
        let [err, pack] = await this.call("sayHello", buffer, params)
        if (err) {
            this.onBeforeResp("sayHello", err)
            return {err: err, resp: null}
        } else {
            let resp = base_ExceptionResp.decode(pack) as any
            this.onBeforeResp("sayHello", err, resp)
            return {err: null, resp: resp}
        }
    }
}
export const AwesomeService = new $AwesomeService({
    name: "awesomepackage",
})