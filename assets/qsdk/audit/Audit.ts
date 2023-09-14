import * as detect from "idl/mpff/audit/detect.v1";
import { AuditDB } from "./db";
import { AUDIT_LOCAL_FLAG, AUDIT_LOCAL_VERSION } from "./localdb";

export class Audit {

    private static wd: p_sensitive.WordDetectorUTF8

    public static init() {
        AuditDB.init()
        if (typeof p_sensitive != "undefined") {
            this.wd = new p_sensitive.WordDetectorUTF8()
        } else {
            this.wd = {
                add_entries(entries) { },
                add_entry(entry) { },
                clear_all_entries() { },
                convert_to_pinyin(text, seperator) { return "" },
                delete_entries(entries) { },
                delete_entry(entry) { },
                is_valid(text) { return true },
                replace_all(text, replacement) { return text },
                version: 0
            }
        }
        this.checkSync()
    }

    static replaceAll(text: string, replacement = "*") {
        return this.wd.replace_all(text, replacement)
    }

    static isValid(text: string) {
        return this.wd.is_valid(text)
    }

    static convertToPinyin(text: string) {
        return this.wd.convert_to_pinyin(text, " ")
    }

    private static async checkSync() {
        let localVersion = await AuditDB.currentVersion()
        let localValid = true
        if (localVersion.version == 0 || localVersion.flag == "") {
            localValid = false
        }
        if (AUDIT_LOCAL_VERSION > localVersion.version && AUDIT_LOCAL_FLAG == localVersion.flag) {
            localValid = false
        }
        if (!localValid) {
            console.log("初始化本地数据")
            await AuditDB.deleteAll()
            await AuditDB.insertLocalEntries()
        }
        this.syncNext()
    }

    private static async syncNext() {
        let localVersion = await AuditDB.currentVersion()
        console.log("syncNext", localVersion)
        let { err, resp } = await detect.Detect.SyncEntries({
            addSyncID: localVersion.addSyncID,
            deleteSyncID: localVersion.deleteSyncID,
            packageSize: 1000,
            version: localVersion.version,
            flag: localVersion.flag,
        })
        if (err) {
            this.loadDataToWordCheck()
            return
        }
        this.process(resp)
    }

    private static async process(resp: detect.ISyncEntriesResp) {
        let localVersion = await AuditDB.currentVersion()
        if (resp.syncType == detect.SyncType.SyncTypeFull) {
            console.log("全量，删除全部")
            AuditDB.deleteAll()
            localVersion.flag = resp.flag
            localVersion.version = 0
            localVersion.update()
        }
        for (let pack of resp.syncPackages) {
            if (pack.syncPackageType == detect.SyncPackageType.SyncPackageTypeAdd) {
                AuditDB.addEntries(pack.entries)
                localVersion.addSyncID = pack.syncID
            } else if (pack.syncPackageType == detect.SyncPackageType.SyncPackageTypeDelete) {
                for (let data of pack.entries) {
                    AuditDB.delEntry(data.entryID)
                }
                localVersion.deleteSyncID = pack.syncID
            }
        }
        localVersion.update()
        console.log(localVersion)
        if (resp.syncPackages.length > 0) {
            this.syncNext()
        } else {
            localVersion.flag = resp.flag
            localVersion.version = resp.version
            localVersion.update()
            console.log(localVersion)
            this.loadDataToWordCheck()
        }
    }

    private static async loadDataToWordCheck() {
        let offset = 0
        let total = 0
        while (true) {
            let result = await AuditDB.getEntries(offset)
            if (!result.success || !result.list) {
                console.warn("audit 查询数据库出错")
                break
            }
            if (result.list.length == 0) {
                break;
            }
            this.wd.add_entries(result.list.map(v => {
                return [v.id, v.content, v.sensitive_type, v.match_mode as p_sensitive.MatchMode, v.version]
            }))
            offset = offset + result.list.length
            total = total + result.list.length
        }
        console.log("加载敏感词库成功", total)
    }
}

