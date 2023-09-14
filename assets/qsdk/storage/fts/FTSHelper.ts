import { ClassField, TableData } from "bos/framework/orm/decorators";
import { FTSTypes } from "./FTS";

let ftsColumnsMap: { [classID: number]: ClassField[] } = {}

export class FTSHelper {

    static hasFtsInfo(td: TableData) {
        let extra = td.tableOption.extra
        if (extra && extra.fts_extra) {
            return true
        }
        let fields = this.getFtsColumns(td)
        return fields != null && fields.length > 0
    }

    static getFtsColumns(td: TableData) {
        let rtn = ftsColumnsMap[td.tableID]
        if (!rtn) {
            rtn = []
            ftsColumnsMap[td.tableID] = rtn
            for (let f of td.fields) {
                if (f.fieldOption.extra && f.fieldOption.extra.fts == true) {
                    rtn.push(f)
                }
            }
        }
        return rtn
    }

    static parsePos(s: string): FTSTypes.FtsPos[] {
        if (s == null || s == "") {
            return null
        }
        let rtn: FTSTypes.FtsPos[] = []
        if (s != null && s != "") {
            s.split(";").forEach(line => {
                if (line != "") {
                    let strs = line.split(",")
                    if (strs.length == 2) {
                        let a = parseInt(strs[0]) || 0
                        let b = parseInt(strs[1]) || 0
                        rtn.push([a, b])
                    }
                }
            })
        }
        return rtn
    }
}