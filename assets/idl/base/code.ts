import {protobuf} from "bos/base/encoding/protobuf";
import { RpcService, RpcParams, RpcDecorator } from "bos/framework/network/rpc/RpcService"
export enum Code {  
    CODE_OK = 0,  
    CODE_NO_SUCH_METHOD = 1,  
    CODE_NOSQL_FAILED = 2,  
    CODE_MARSHAL_FAILED = 3,  
    CODE_NO_SUCH_SERVER = 4,  
    CODE_PARAMETER_ERROR = 5,  
    CODE_NO_DATA = 6,  
    CODE_NOT_LOGIN = 7,  
    CODE_CONN_CLOSED = 8,  
    CODE_SEND_FAILED = 9,  
    CODE_NO_PENDING_DATA = 10,  
    CODE_TIMEOUT = 11,  
    CODE_CLIENT_IS_NIL = 12,  
    CODE_CANT_CALL_THIS_METHOD = 13,  
    CODE_DISPATCH_MSG_FAILED = 14,  
    CODE_FAILED = 15,  
    CODE_SERVER_IS_BUSY = 110,  
    CODE_QUEUE_NOT_EXIST = 150,  
    CODE_SERVICE_EXCEPTION = 201,  
    CODE_ENCODE_FAILED = 203,  
    CODE_DECODE_FAILED = 204,  
    CODE_INVALID_PARAMETER = 205,  
    CODE_REDIS_EXCEPTION = 301,  
    CODE_MONGO_EXCEPTION = 302,  
    CODE_ETCD_EXCEPTION = 303,  
    CODE_MYSQL_EXCEPTION = 304,  
    CODE_NO_PERMISSION = 401,
}