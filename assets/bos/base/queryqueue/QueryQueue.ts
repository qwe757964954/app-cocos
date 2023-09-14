import { Log } from "bos/exports"
import { MemCache } from "../cache/MemCache"

type QueryCallback = (value: any)=>void

class QueryItem {
    key: any
    cb?: QueryCallback
}

class QueryGroup {
    queryAt = 0
    queues: QueryItem[]
}

interface QueryDelegate {
    batchQuery(keys: any[]): Promise<any>
}

const TIMEOUT_MS = 12*1000

interface QueryDelegate {
    batchQuery(keys: any[])
}

type QueueParams = {
    delegate: QueryDelegate
    intervalMs: number
}

class QueryQueue {
    private waits = new Array<QueryItem>();
    private isRunning = false
    private delegate: QueryDelegate
    private queries = new MemCache();
    private intervalMs = 300

    constructor(data: any) {
        this.delegate = data.delegate
        this.intervalMs = data.intervalMs ? data.intervalMs : 300
    }

    add(item: QueryItem) {
        this.waits.push(item)
    }
    
    run() {
        this.isRunning = true
        setInterval(()=>{
            this.query()
        }, this.intervalMs)
    }

    query() {
        if (this.waits && this.waits.length > 0 && this.isRunning) {
            let keys = []
            this.waits.forEach(item => {
                let t = this.queries.get(item.key)
                if (t) {
                    t.queues.push(item)
                } else {
                    keys.push(item.key)
                    t = {
                        queryAt: Date.now(),
                        queues: [item],
                    }
                    this.queries.set(item.key, t)
                }
            })
            this.waits = new Array<QueryItem>();
            this.delegate.batchQuery(keys).then(valMap => {
                if (valMap) {
                    valMap.forEach((val, key) => {
                        let group = this.queries.get(key)
                        group.queues.forEach(item => {
                            item.cb?.(val)
                        })
                        this.queries.delete(key)
                    })
                }
            })
        }
    }

    checkTimeoutQuery() {
        let it = this.queries.getEntryIterator()
        let t = it.next()
        while(!t.done) {
            let [key, value] = t.value
            if (Date.now() - value.queryAt > TIMEOUT_MS) {
                Log.w("delete timeout query...", key)
                this.queries.delete(key)
            }
        }
    }
}

export {QueryQueue}