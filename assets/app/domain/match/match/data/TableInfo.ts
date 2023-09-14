import { Log } from "bos/exports";
import { MatchHandler } from "../handler/MatchHandler";
import { SafeEmit } from "./RoomInfo";

export class MTable {
    key:string;
    
    baseScore:number;
    
    outScore:number;
    
    gameNo:number;
    
    realKey:string;
    
    status:number;
    
    groupID:number;
    
    uids:number[] = [];

    handler : MatchHandler
	
    constructor(handler? : MatchHandler | null){
        this.handler = handler
    }

    reset(){
        this.key                    = ""
        this.baseScore              = 0
        this.outScore               = 0
        this.gameNo                 = 0
        this.realKey                = ""
        this.status                 = 0
        this.groupID                = 0
        this.uids                   = []
    }

    init(data){
        if (!data) {
            return 
        }

        this.key                    = data.key || ""
        this.baseScore              = data.baseScore || 0
        this.outScore               = data.outScore || 0
        this.gameNo                 = data.gameNo || 0
        this.realKey                = data.realKey || ""
        this.status                 = data.status || 0
        this.groupID                = data.groupID || 0
        this.uids                   = data.uids || []
    }

    update(data){
        if (!data) {
            return 
        }
        
        if (data.key === null) {
            return
        }
        this.key                    = data.key

        this.updateUsers(data.uids)
        this.updateStatus(data.status)
        this.updateGameNo(data.gameNo)
        this.updateRealKey(data.realKey)
        this.updateBaseScore(data.baseScore)
        this.updateOutScore(data.outScore)
        this.updateGroupID(data.groupID)
    }

    updateUsers(uids: number[]): void {
        console.debug("Table:updateUsers", uids, this.key)
        this.uids = uids;
    }

    updateStatus(status: any): void {
        console.debug("Table:updateStatus", status, this.key);
        let oldStatus = this.status
        if (oldStatus != status) {
            this.status = status;
    
            SafeEmit(this.handler,MatchHandler.EventType.TableStatusChange, this, this.status, oldStatus)
        }
    }

    updateGameNo(gameNo: number) {
        console.debug("Table:updateGameNo", gameNo, this.key);
        if (gameNo !== this.gameNo) {
            this.gameNo = gameNo;
        }
    }

    updateRealKey(realKey: any): void {
        console.debug("Table:updateRealKey", realKey, this.key);
        this.realKey = realKey;
    }

    updateBaseScore(baseScore: number): void {
        console.debug("Table:updateBaseScore", baseScore, this.key)
        this.baseScore = baseScore;
    }

    updateOutScore(outScore: number): void {
        console.debug("Table:updateOutScore", outScore, this.key)
        this.outScore = outScore;
    }

    updateGroupID(groupID: number): void {
        console.debug("Table:updateGroupID", groupID, this.key)
        this.groupID = groupID
    }

    hasUID(uid : number): boolean {
        for (let index = 0; index < this.uids.length; index++) {
            if (this.uids[index] == uid) {
                return true
            }      
        }

        return false
    }
}

export  class TableInfo {
    tables:MTable[] = []
    tablesByKey = new Map()
    
    handler : MatchHandler
	
    constructor(handler : MatchHandler | null){
        this.handler = handler
    }

    reset(){
        this.tables = []
        this.tablesByKey.clear()
    }

    init(tables : any){
        this.reset()

        for (let index = 0; index < tables.length; index++) {
            let table = tables[index]
            this.addTable(table)
        }
    }

    createTable() {
        let newTable = new MTable(this.handler)
        return newTable
    }

    addTable(sTable) {
        if (sTable && sTable.key && sTable.key !== "") {
            let newTable = this.createTable()
            newTable.init(sTable)
            this.tables.push(newTable)
            this.tablesByKey.set(sTable.key, newTable)
            return newTable
        } else {
            console.error("addTable sTable is null or sTable.key is invalid", sTable)
        }
    }

    findTable(key : string): MTable {
        if ( key == null || key === "" ){
            console.error("findTable key in invalid", key)
            return
        }

        return this.tablesByKey.get(key)
    }

    findTableByRealKey(realKey : string) {
        if ( realKey == null || realKey === "" ){
            console.error("findTable key in invalid", realKey)
            return
        }

        for (let index = 0; index < this.tables.length; index++) {
            let table = this.tables[index]
            if (table.realKey == realKey) {
                return table
            }
        }
        return null
    }

    findTableByUID(UID : number) {
        for (let index = 0; index < this.tables.length; index++) {
            let table = this.tables[index]
            if (table.hasUID(UID)) {
                return table
            }
        }
        return null
    }

    getTables(){
        return this.tables
    }

    updateTable(sTable): boolean {
        let table = this.findTable(sTable.key)
        let isNew = false
        if (table == null) {
            table = this.addTable(sTable)
            isNew = true
        } else {
            table.update(sTable)
        }
        return isNew
    }

    resetTable () {
        this.tables = []
        this.tablesByKey.clear()

        SafeEmit(this.handler,MatchHandler.EventType.TableNumChange, 0)
    }
}