import protobuf from "protobufjs/light.js";

protobuf.util.Long = undefined;
protobuf.util.toJSONOptions.longs = undefined;
protobuf.util.toJSONOptions.enums = undefined;


protobuf.configure();

export {protobuf}