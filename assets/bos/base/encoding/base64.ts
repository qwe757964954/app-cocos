const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

let lookup = new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

/**
 * base64 编解码
 * 
 * ```
 * let coded = Base64.encode("ruok")
 * let content = Base64.decode(coded)
 * ```
 */
export class Base64 {

    // ---------------------encode

    static encode(uint8Array: Uint8Array): string
    static encode(arrayBuffer: ArrayBuffer): string
    static encode(content: string): string
    static encode(data: ArrayBuffer | string | Uint8Array): string {
        if (data instanceof ArrayBuffer) {
            return this.encodeFromArrayBuffer(data)
        } else if (data instanceof Uint8Array) {
            return this.encodeFromUint8Array(data)
        } else {
            return this.encodeFromString(data)
        }
    }

    private static encodeFromUint8Array(bytes: Uint8Array): string {
        let len = bytes.length
        let base64 = ""
        for (i = 0; i < len; i += 3) {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += chars[bytes[i + 2] & 63];
        }

        if ((len % 3) === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
        } else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
        }

        return base64;
    }

    private static encodeFromArrayBuffer(arraybuffer: ArrayBuffer): string {
        return this.encodeFromUint8Array(new Uint8Array(arraybuffer))
    }

    /**
     * 将字符串编码为base64格式
     * @param str 
     */
    private static encodeFromString(str: string): string {
        let array = this.string2utf(str)
        let ab = this.array2ab(array)
        return this.encodeFromArrayBuffer(ab)
    }

    // ----------------------decode

    static decodeToArrayBuffer(base64: string): ArrayBuffer {
        let bufferLength = base64.length * 0.75
        let len = base64.length
        let i = 0
        let p = 0
        let encoded1 = 0
        let encoded2 = 0
        let encoded3 = 0
        let encoded4 = 0

        if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
                bufferLength--;
            }
        }

        var arraybuffer = new ArrayBuffer(bufferLength),
            bytes = new Uint8Array(arraybuffer);

        for (i = 0; i < len; i += 4) {
            encoded1 = lookup[base64.charCodeAt(i)];
            encoded2 = lookup[base64.charCodeAt(i + 1)];
            encoded3 = lookup[base64.charCodeAt(i + 2)];
            encoded4 = lookup[base64.charCodeAt(i + 3)];

            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return arraybuffer;
    }

    static decodeToUint8Array(base64: string): Uint8Array {
        let bufferLength = base64.length * 0.75
        let len = base64.length
        let i = 0
        let p = 0
        let encoded1 = 0
        let encoded2 = 0
        let encoded3 = 0
        let encoded4 = 0

        if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
                bufferLength--;
            }
        }

        var arraybuffer = new ArrayBuffer(bufferLength),
            bytes = new Uint8Array(arraybuffer);

        for (i = 0; i < len; i += 4) {
            encoded1 = lookup[base64.charCodeAt(i)];
            encoded2 = lookup[base64.charCodeAt(i + 1)];
            encoded3 = lookup[base64.charCodeAt(i + 2)];
            encoded4 = lookup[base64.charCodeAt(i + 3)];

            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return bytes;
    }


    /**
     * 将base64解码为字符串
     * @param base64 
     */
    static decode(base64: string): string {
        let ab = this.decodeToArrayBuffer(base64)
        let array = this.ab2array(ab)
        return this.utf2string(array)
    }

    private static array2ab(array: number[]): ArrayBuffer {
        var b = new ArrayBuffer(array.length);
        var v = new DataView(b, 0);
        for (var i = 0; i < array.length; i++) {
            v.setUint8(i, array[i]);
        }
        return b;
    }

    private static ab2array(buffer: ArrayBuffer): number[] {
        var v = new DataView(buffer, 0);
        var a: number[] = [];
        for (var i = 0; i < v.byteLength; i++) {
            a[i] = v.getUint8(i);
        }
        return a;
    }

    private static string2utf(str: string): number[] {
        var back: number[] = [];
        var byteSize = 0;

        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            if (0x00 <= code && code <= 0x7f) {
                byteSize += 1;
                back.push(code);
            } else if (0x80 <= code && code <= 0x7ff) {
                byteSize += 2;
                back.push((192 | (31 & (code >> 6))));
                back.push((128 | (63 & code)))
            } else if ((0x800 <= code && code <= 0xd7ff) || (0xe000 <= code && code <= 0xffff)) {
                byteSize += 3;
                back.push((224 | (15 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)))
            }
        }

        for (i = 0; i < back.length; i++) {
            back[i] &= 0xff;
        }

        return back;
    }

    private static utf2string(arr: number[]): string {
        if (typeof arr === 'string') {
            return null;
        }

        var UTF = '';
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == null) {
                break;
            }

            var one = arr[i].toString(2);
            var v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = arr[i].toString(2).slice(7 - bytesLength);

                for (var st = 1; st < bytesLength; st++) {
                    store += arr[st + i].toString(2).slice(2);
                }
                UTF += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                UTF += String.fromCharCode(arr[i]);
            }
        }
        return UTF;
    }
}