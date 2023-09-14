import { js } from "cc"
import { TableData, findTableData } from "./decorators"
import { DB } from "./db"

export type ListenerArg = {
    db: DB,
    td: TableData,
    tableName: string,
    data: any
}

export interface Listener {
    onInsert(arg: ListenerArg)
    onDelete(arg: ListenerArg)
    onUpdate(arg: ListenerArg)
}

export class Listeners {

    private static listeners: Listener[] = []

    static addListener(listener: Listener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener)
        }
    }

    static removeListener(listener: Listener) {
        js.array.remove(this.listeners, listener)
    }

    static onInsertEvent(arg: ListenerArg) {
        let td = findTableData(arg.data)
        if (!td) {
            return
        }
        this.listeners.forEach(l => {
            l.onInsert(arg)
        })
    }

    static onDeleteEvent(arg: ListenerArg) {
        let td = findTableData(arg.data)
        if (!td) {
            return
        }
        this.listeners.forEach(l => {
            l.onDelete(arg)
        })
    }

    static onUpdateEvent(arg: ListenerArg) {
        let td = findTableData(arg.data)
        if (!td) {
            return
        }
        this.listeners.forEach(l => {
            l.onUpdate(arg)
        })
    }
}