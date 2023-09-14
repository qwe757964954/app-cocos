import { VERSION } from "cc";
import { NATIVE } from "cc/env";

export class Engine {
    /**
     * 获取引擎版本号 。 格式如: 3.7.3   或者 3.7.3 - Mon Jul 10 16:01:04 2023
     */
    static get version(): string {
        let v = VERSION
        if (NATIVE && typeof p_extra != "undefined") {
            v = v + ` - ${p_extra.nativeVersion}`
        }
        return v
    }
}