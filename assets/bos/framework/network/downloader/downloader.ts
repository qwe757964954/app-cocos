import { NATIVE } from "cc/env";
import { IDownloader } from "./IDownloader";
import { NativeDownloader } from "./NativeDownloader";
import { WebDownloader } from "./WebDownloader";

let instance: IDownloader

export function downloaderInstance() {
    if (!instance) {
        if (NATIVE) {
            instance = new NativeDownloader()
        } else {
            instance = new WebDownloader()
        }
    }
    return instance
}