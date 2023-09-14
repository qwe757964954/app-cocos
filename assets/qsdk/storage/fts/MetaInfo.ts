import { FTSTypes } from "./FTS"
import { DeepTable } from "./deep_table"

export type MetaData = {
    dbName: string
    tableName: string
    docID: number
    subtype?: string
    id: number
}

/**
 * 从fts表中会查出metaID/pos。
 * 从meta表中会查出metaID/docID。
 * 
 * 此类的功能就是用来整合这些信息
 */
export class MetaInfo {

    private dbName: string
    private tableName: string
    metaids: number[] = []
    private metaid_pos: { [metaid: number]: FTSTypes.FtsPos[] } = {}
    private metaid_pos_content: { [metaid: number]: string } = {}
    private pos = new DeepTable()
    private pos_content = new DeepTable()

    addFtsResults(ftsResults: FTSTypes.SearchFtsResult[]) {
        ftsResults.forEach(r => {
            this.metaids.push(r.metaID)
            this.metaid_pos[r.metaID] = r.pos
            this.metaid_pos_content[r.metaID] = r.posContent
        })
    }

    addMetaResults(metaResults: MetaData[]) {
        metaResults.forEach(r => {
            let dbName = r.dbName || this.dbName
            let tableName = r.tableName || this.tableName
            let db = this.pos.get(dbName)
            let tb = db.get(tableName)
            let doc = tb.get(r.docID.toString())
            doc.setValue(r.subtype || "SUBTYPE", this.metaid_pos[r.id])

            db = this.pos_content.get(dbName)
            tb = db.get(tableName)
            doc = tb.get(r.docID.toString())
            doc.setValue(r.subtype || "SUBTYPE", this.metaid_pos_content[r.id])
        })
    }

    getPosByDoc(dbName: string, tableName: string, docID: number): { [subtype: string]: FTSTypes.FtsPos[] } {
        let rtn = {}
        let t = this.pos.get(dbName).get(tableName).get(docID.toString())
        t.eachValues((k, v) => {
            rtn[k] = v
        })
        return rtn
    }

    getPosContentByDoc(dbName: string, tableName: string, docID: number): { [subtype: string]: string } {
        let rtn = {}
        let t = this.pos_content.get(dbName).get(tableName).get(docID.toString())
        t.eachValues((k, v) => {
            rtn[k] = v
        })
        return rtn
    }
}