import * as orm from "bos/framework/orm/exports"
import * as detect from "idl/mpff/audit/detect.v1"
import { AUDIT_LOCAL_DB } from "./localdb"

@orm.Table({ name: "Entry" })
class Entry extends orm.Entity {
    @orm.FieldNumber({ primary: true })
    id = 0

    @orm.FieldString()
    content = ""

    @orm.FieldNumber()
    sensitive_type = 0

    @orm.FieldNumber()
    match_mode = 0

    @orm.FieldNumber()
    version = 0

    @orm.FieldNumber()
    createdAt = 0

    @orm.FieldNumber()
    updatedAt = 0

    /**
     * 为了兼容localdb里的数据
     */
    @orm.FieldNumber()
    _dummy_ = 0
}

@orm.Table({ name: "local_version" })
class LocalVersion extends orm.Entity {
    @orm.FieldNumber({ primary: true })
    id = 0

    @orm.FieldNumber()
    addSyncID = 0

    @orm.FieldNumber()
    deleteSyncID = 0

    @orm.FieldNumber()
    version = 0

    @orm.FieldString()
    flag = ""
}

export class AuditDB {

    private static db: orm.DB
    private static tableEntry: orm.TableConnection<Entry>
    private static tableLocalVersion: orm.TableConnection<LocalVersion>
    private static _currentVersion: LocalVersion

    static init() {
        if (this.db) {
            return
        }
        this.db = new orm.DB("audit")
        this.tableEntry = this.db.register<Entry>(Entry)
        this.tableLocalVersion = this.db.register<LocalVersion>(LocalVersion)
        // this.tableEntry.delete(null)
        // this.tableLocalVersion.delete(null)
    }

    static async currentVersion() {
        if (!this._currentVersion) {
            let result = await this.tableLocalVersion.select().where("id=1").first()
            console.log("find localversion", result)
            if (result.success && result.result) {
                this._currentVersion = result.result
            } else {
                this._currentVersion = new LocalVersion()
                this._currentVersion.id = 1
                this.tableLocalVersion.insert(this._currentVersion)
            }
            this.tableLocalVersion.bindObject(this._currentVersion)
        }
        return this._currentVersion
    }

    static async addEntries(data: detect.IEntry[]) {
        let list = data.map(v => {
            let entry = new Entry()
            entry.id = v.entryID
            entry.content = v.content
            entry.match_mode = v.matchMode
            entry.sensitive_type = v.sensitiveType
            entry.version = v.version
            return entry
        })
        return this.tableEntry.insertAll(list)
    }

    static async delEntry(id: number) {
        return this.tableEntry.delete(`id=${id}`)
    }

    static async deleteAll() {
        return this.tableEntry.delete(null)
    }

    static async insertLocalEntries() {
        return this.db.execAsync(AUDIT_LOCAL_DB)
    }

    static async getEntries(offset: number) {
        return this.tableEntry.select().offset(offset).limit(100).all()
    }
}