export default class BufferUtil {
    static sliceBuffer(bytes: Uint8Array) {
        const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteLength + bytes.byteOffset);
        return new Uint8Array(ab)
    }
}