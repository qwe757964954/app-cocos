import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export interface IDoubleValue {
    value?: number|null
}
@protobuf.Type.d("mp_common_DoubleValue")
export class DoubleValue extends protobuf.Message<IDoubleValue> {
    constructor(properties: Properties<IDoubleValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "double", "optional", 0)
    public value?: number|null = 0
}
export interface IFloatValue {
    value?: number|null
}
@protobuf.Type.d("mp_common_FloatValue")
export class FloatValue extends protobuf.Message<IFloatValue> {
    constructor(properties: Properties<IFloatValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "float", "optional", 0)
    public value?: number|null = 0
}
export interface IInt64Value {
    value?: number|null
}
@protobuf.Type.d("mp_common_Int64Value")
export class Int64Value extends protobuf.Message<IInt64Value> {
    constructor(properties: Properties<IInt64Value>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "int64", "optional", 0)
    public value?: number|null = 0
}
export interface IUInt64Value {
    value?: number|null
}
@protobuf.Type.d("mp_common_UInt64Value")
export class UInt64Value extends protobuf.Message<IUInt64Value> {
    constructor(properties: Properties<IUInt64Value>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "uint64", "optional", 0)
    public value?: number|null = 0
}
export interface IInt32Value {
    value?: number|null
}
@protobuf.Type.d("mp_common_Int32Value")
export class Int32Value extends protobuf.Message<IInt32Value> {
    constructor(properties: Properties<IInt32Value>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "int32", "optional", 0)
    public value?: number|null = 0
}
export interface IUInt32Value {
    value?: number|null
}
@protobuf.Type.d("mp_common_UInt32Value")
export class UInt32Value extends protobuf.Message<IUInt32Value> {
    constructor(properties: Properties<IUInt32Value>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "uint32", "optional", 0)
    public value?: number|null = 0
}
export interface IBoolValue {
    value?: boolean|null
}
@protobuf.Type.d("mp_common_BoolValue")
export class BoolValue extends protobuf.Message<IBoolValue> {
    constructor(properties: Properties<IBoolValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "bool", "optional", false)
    public value?: boolean|null = false
}
export interface IStringValue {
    value?: string|null
}
@protobuf.Type.d("mp_common_StringValue")
export class StringValue extends protobuf.Message<IStringValue> {
    constructor(properties: Properties<IStringValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "string", "optional", )
    public value?: string|null = ""
}
export interface IBytesValue {
    value?: Uint8Array
}
@protobuf.Type.d("mp_common_BytesValue")
export class BytesValue extends protobuf.Message<IBytesValue> {
    constructor(properties: Properties<IBytesValue>) {
        super(properties);
        if (properties) {
            if (properties.value) { this.value = properties.value }
        }
	}
    @protobuf.Field.d(1, "bytes", "optional", [])
    public value?: Uint8Array
}