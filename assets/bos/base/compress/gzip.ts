import { native } from "cc";
import { NATIVE } from "cc/env";

export namespace gzip {
    /**
     * 解压 gzip 数据
     * @param ab 
     * @returns 
     */
    export async function uncompress(ab: ArrayBuffer | Uint8Array): Promise<ArrayBuffer> {
        if (NATIVE) {
            return native.zipUtils.inflateMemory(ab)
        } else {
            let data = new Blob([ab])
            let decompressor = new DecompressionStream("gzip")
            let stream = data.stream().pipeThrough(decompressor)
            return new Response(stream).arrayBuffer()
        }
    }
}