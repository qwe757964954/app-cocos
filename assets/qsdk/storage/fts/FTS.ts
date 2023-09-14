import * as orm from "bos/framework/orm/exports"
import { js, native, sys } from "cc"
import { NATIVE } from "cc/env"
import { FTSHelper } from "./FTSHelper"
import { Reindex } from "./Reindex"
import { DeepTable } from "./deep_table"

@orm.Table({ name: "meta" })
export class Meta {

    @orm.FieldNumber({
        primary: true,
        autoIncrement: true,
    })
    id: number

    @orm.FieldString()
    dbName: string

    @orm.FieldString()
    tableName: string

    @orm.FieldNumber()
    docID: number

    @orm.FieldString()
    subtype: string

    @orm.FieldString()
    content: string

    @orm.FieldNumber()
    updatetime: number
}

function simpleClone(obj) {
    if (!obj) {
        return null
    }
    let rtn = {}
    for (let key in obj) {
        let value = obj[key]
        rtn[key] = value
    }
    return rtn
}

export namespace FTSTypes {
    export type FtsDelegate = {
        onInsertEvent(arg: FtsDelegateArg)
        onDeleteEvent(arg: FtsDelegateArg)
        onUpdateEvent(arg: FtsDelegateArg)
    }

    export type FtsDelegateArg = orm.ListenerArg

    export type FTSInitParams = {
        uid: number
    }

    export type FtsPos = [number, number]

    export type SearchFtsResult = {
        metaID: number
        pos?: FtsPos[],
        posContent?: string,
    }

    export type SearchMetaCountResult = {
        dbName: string
        tableName: string
        count: number
    }
}

let initParams: FTSTypes.FTSInitParams
let ftsdb: orm.DB
let meta: orm.TableConnection<Meta>
let listenerInited = false
let delegates: FTSTypes.FtsDelegate[] = []

function onNormalInsert(arg: orm.ListenerArg) {
    let dbName = arg.db.name
    let tableName = arg.tableName
    let columns = FTSHelper.getFtsColumns(arg.td)
    let sqls: string[] = []
    for (let field of columns) {
        if (arg.data[field.propertyName] != null) {
            let value = field.encode(arg.data[field.propertyName])
            if (value.startsWith("'") && value.endsWith("'")) {
                value = value.substring(1, value.length - 1)
            }
            let sql = js.formatStr(
                `insert or replace into 
                meta(dbName,tableName,docID,subtype,content) 
                values('%s', '%s', %s, '%s', '%s');`,
                dbName,
                tableName,
                arg.data.id,
                field.propertyName,
                value,
            )
            sqls.push(sql)
        }
    }
    let sql = sqls.join("\n")
    ftsdb.exec(sql, r => {
        if (!r.success) {
            console.warn("FTS.onNormalInsert failed", r.errmsg)
        }
    })
}

function onNormalUpdate(arg: orm.ListenerArg) {
    onNormalDelete(arg)
    onNormalInsert(arg)
}

function onNormalDelete(arg: orm.ListenerArg) {
    let sql = js.formatStr(
        `delete from meta where dbName='%s' and tableName='%s' and docID=%s;`,
        arg.db.name,
        arg.tableName,
        arg.data.id,
    )
    ftsdb.exec(sql, r => {
        if (!r.success) {
            console.warn("FTS.onNormalDelete failed", r.errmsg)
        }
    })
}

function callDelegates(event: keyof FTSTypes.FtsDelegate, arg: orm.ListenerArg) {
    for (let delegate of delegates) {
        let fun = delegate[event]
        if (fun) {
            fun(arg)
        }
    }
}

let listener: orm.Listener = {
    onDelete: (arg) => {
        // console.log("FTS.onDelete", arg.data.id, arg.data)
        if (!ftsdb) {
            return
        }
        if (arg.db.name.includes("bos_orm_fts")) {
            return
        }
        if (!FTSHelper.hasFtsInfo(arg.td)) {
            return
        }
        if (!arg.data.id) {
            console.warn("Fts 没有id", arg.data.id, arg.data)
            return
        }
        onNormalDelete(arg)
        callDelegates("onDeleteEvent", arg)
    },
    onInsert: (arg) => {
        // console.log("FTS.onInsert", arg.data.id, arg.data)
        if (!ftsdb) {
            return
        }
        if (arg.db.name.includes("bos_orm_fts")) {
            return
        }
        if (!FTSHelper.hasFtsInfo(arg.td)) {
            return
        }
        if (!arg.data.id) {
            console.warn("Fts 没有id", arg.data.id, arg.data)
            return
        }
        onNormalInsert(arg)
        callDelegates("onInsertEvent", arg)
    },
    onUpdate: (arg) => {
        // console.log("FTS.onUpdate", arg.data.id, arg.data)
        if (!ftsdb) {
            return
        }
        if (arg.db.name.includes("bos_orm_fts")) {
            return
        }
        if (!FTSHelper.hasFtsInfo(arg.td)) {
            return
        }
        if (!arg.data.id) {
            console.warn("Fts 没有id", arg.data.id, arg.data)
            return
        }
        onNormalUpdate(arg)
        callDelegates("onUpdateEvent", arg)
    }
}

function getPluginPath() {
    if (sys.platform == sys.Platform.WIN32) {
        return native.fileUtils.fullPathForFilename("fts/libsimple64.dll")
    } else if (sys.platform == sys.Platform.ANDROID) {
        let dir = native.reflection.callStaticMethod("com/boyaa/cocos/engine/Native", "getInnerLibraryPath", "()Ljava/lang/String;")
        let file = dir + "/libsimple.so"
        return file
    }
}

function getDictPath() {
    if (sys.platform == sys.Platform.WIN32) {
        let path = getPluginPath()
        path = path.replace("libsimple64.dll", "dict")
        return path
    } else if (sys.platform == sys.Platform.ANDROID) {
        let dir = native.fileUtils.getWritablePath() + "fts/dict"
        let file = dir + "/idf.utf8"
        if (!native.fileUtils.isFileExist(file)) {
            let flag = native.reflection.callStaticMethod(
                "com/boyaa/cocos/engine/Native",
                "copyAssets",
                "(Ljava/lang/String;Ljava/lang/String;)Z",
                "fts/dict",
                dir,
            )
            console.log("复制dict目录", dir, flag)
        }
        return dir
    }
}

export class FTS {

    static init(params: FTSTypes.FTSInitParams) {
        if (!NATIVE) {
            return
        }
        initParams = params
        if (!listenerInited) {
            listenerInited = true
            orm.Listeners.addListener(listener)
        }
        this.ensureFTS().then(() => {
            console.log("ensureFTS success")
            Reindex.onFtsInit()
        }).catch(e => {
            console.log("ensureFTS error", e)
        })
    }

    static addDelegate(delegate: FTSTypes.FtsDelegate) {
        if (!js.array.contains(delegates, delegate)) {
            delegates.push(delegate)
        }
    }

    static removeDelegate(delegate: FTSTypes.FtsDelegate) {
        js.array.fastRemove(delegates, delegate)
    }

    static postInertEvent(arg: orm.ListenerArg) {
        listener.onInsert(arg)
    }

    static get ftsdb(): orm.DB {
        return ftsdb
    }

    static get meta(): orm.TableConnection<Meta> {
        return meta
    }

    private static async ensureFTS() {
        let dbName = `bos_orm_fts_${initParams.uid}`
        console.log("ensureFTS", dbName)
        if (ftsdb && ftsdb.name == dbName) {
            return
        }
        if (ftsdb) {
            ftsdb.close()
            ftsdb = null
        }
        ftsdb = new orm.DB(dbName)
        let pluginPath = getPluginPath()
        if (pluginPath) {
            ftsdb.loadPlugin(getPluginPath(), "sqlite3_simple_init")
        } else {
            console.warn("不支持fts")
            ftsdb.close()
            ftsdb = null
            return
        }

        // 创建meta表
        meta = ftsdb.register<Meta>(Meta)

        // meta索引 
        let sql = ""
        let names = ["dbName", "tableName", "docID", "subtype"]
        names.forEach(name => {
            sql = sql + "\n" + `create index if not exists meta_idx_${name} on meta(${name});`
        })

        // meta唯一索引
        sql = sql + "\n" + "create unique index if not exists meta_idx_unique on meta(dbName,tableName,docID,subtype);"

        let r = await ftsdb.execAsync(sql)
        console.log("创建meta", r)

        // 创建fts表
        sql = `
        create virtual table if not exists fts using fts5(content, metaID unindexed, tokenize = 'simple');

        create trigger if not exists meta_ai after insert on meta begin
            insert into fts(metaID, content) values(new.id, new.content);
        end;

        create trigger if not exists meta_ad after delete on meta begin
            delete from fts where metaID = old.id;
        end;

        create trigger if not exists meta_au after update on meta begin
            update fts set content = excluded.content where metaID = excluded.id;
        end;
        `
        r = await ftsdb.execAsync(sql)
        console.log("创建fts", r)

        // 开启触发器递归
        r = await ftsdb.execAsync("pragma recursive_triggers = true;")
        console.log("开始触发器递归", r)

        r = await ftsdb.execAsync(`select jieba_dict('${getDictPath()}')`)
        console.log("设置dict", r)
    }

    static async searchFts(content: string, includePos: boolean): Promise<FTSTypes.SearchFtsResult[]> {
        if (!ftsdb) {
            return
        }
        let sql = "select metaID %s from fts where content match jieba_query('%s') order by rank;"
        sql = js.formatStr(
            sql,
            includePos ? ", simple_highlight_pos(fts,0) as pos, simple_highlight(fts, 0, '<<<','>>>') as pos_content" : "",
            content
        )
        let r = await ftsdb.execAsync(sql)
        if (!r.success) {
            return
        }
        let results: FTSTypes.SearchFtsResult[] = []
        r.rows.forEach(row => {
            let result: FTSTypes.SearchFtsResult = {
                metaID: parseInt(row.metaID || 0) || 0
            }
            if (includePos) {
                result.pos = FTSHelper.parsePos(row.pos)
                result.posContent = row.pos_content
            }
            results.push(result)
        })
        return results
    }

    static async searchMetaCountByWhere(where: string): Promise<FTSTypes.SearchMetaCountResult[]> {
        if (!ftsdb) {
            return
        }
        let sql = `select dbName, tableName, docID from meta where ${where}`
        let r = await ftsdb.execAsync(sql)
        if (!r.success) {
            return
        }
        let deepTable = new DeepTable()
        r.rows.forEach(row => {
            let tb = deepTable.get(row.dbName).get(row.tableName)
            if (!tb.getValue(row.docID)) {
                tb.setValue(row.docID, true)
                tb.setValue(
                    "count",
                    (tb.getValue("count") || 0) + 1
                )
            }
        })


        let rtn: FTSTypes.SearchMetaCountResult[] = []
        deepTable.each((dbName, db) => {
            db.each((tableName, tb) => {
                rtn.push({
                    dbName: dbName,
                    tableName: tableName,
                    count: tb.getValue("count")
                })
            })
        })
        return rtn
    }

    static async searchMetaCount(ids: number[]) {
        let sids = ids.map(id => {
            return id.toString()
        }).join(",")
        let where = ` id in (${sids}) `
        return this.searchMetaCountByWhere(where)
    }
}

