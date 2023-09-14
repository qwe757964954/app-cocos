import { NetMgr } from "./framework/network/rpc/NetMgr";
import { EventSystem } from "./base/event/EventSystem";
import { StorageManager } from "./base/storage/StorageManager";
import { ResLoader } from "./framework/loader/ResLoader";
import { UIMgr } from "./framework/gui/UIMgr";
import { TableView, TableViewDelegate } from "./framework/gui/tableview/TableView";
import { downloaderInstance } from "./framework/network/downloader/downloader";

export let Net = {
    get netMgr() { return NetMgr.getInstance() },
    get netEvent() { return NetMgr.EventType },
    /**
     * 下载器。 文档查看 IDownloader
     */
    get downloader(){return downloaderInstance()}
}

export * from "./framework/gui/exports"

import { md5 } from "./base/crypto/md5";

export * as Gui from "./framework/gui/exports"

export let Crypto = {
    md5: md5
}

let resLoader = ResLoader.getInstance()
export { resLoader as resLoader }


let eventSystem = EventSystem.getInstance()
export { eventSystem as eventSystem }

let uiMgr = UIMgr.getInstance()
export { uiMgr }

export let storageMgr = new (StorageManager)

import { ScreenMgr, Orientation, OrientationPolicy } from "./framework/screen/ScreenMgr";
export let Screen = {
    screenMgr: new (ScreenMgr),
    EventType: ScreenMgr.EventType,
    Orientation: Orientation,
    OrientationPolicy: OrientationPolicy,
}

// 导出base模块
export * from "./base/log/Log";

export { Base64 } from "./base/encoding/base64"

// 导出framework模块
export * from 'bos/framework/component/XComponent';

export * from './utils/exports';

export * from './framework/decorator/Decorator';

export { NetImage } from "./framework/component/NetImage"

export * from "./base/compress/gzip"

export * from "./base/compress/zip"

export * from "./base/filesystem/XFile"

export * from "./framework/audio/Audio"

export { TaskQueue } from "./base/taskqueue/TaskQueue"

export { QueryQueue } from "./base/queryqueue/QueryQueue"

export { MemCache } from "./base/cache/MemCache"

export { Engine } from "./engine/engine"
