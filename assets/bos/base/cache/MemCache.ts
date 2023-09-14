import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";

function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}  

class MemCache<K, V> extends EventTargetExtends(EmptyClass) {
    private data = new Map();
    private capacity = 1000;
    private count = 0;

    static EventType = {
        KEY_EXPIRED: "KEY_EXPIRED",
    }

    constructor(data?: any) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    set(key: K, value: V, expire?: number) {
        if (isLong(key)) {
            this.data.set(key.toString(), {
                value: value,
                updateAt: Date.now(),
                expire: expire,
            });
        } else {
            this.data.set(key, {
                value: value,
                updateAt: Date.now(),
                expire: expire,
            });
        }
    }

    get(key: K) {
        if (isLong(key)) {
            return this.data.get(key.toString())?.value;
        } else {
            return this.data.get(key)?.value;
        }
    }

    delete(key: K) {
        if (isLong(key)) {
            return this.data.delete(key.toString());
        } else {
            return this.data.delete(key);
        }
    }

    keys() {
        return Array.from(this.data.keys());
    }

    *getEntryIterator() {
        let i = 0;
        while(i < this.data.size) {
            let [k, v] = this.data.entries[i]
            yield k, v.value
            i++
        }
    }

    reset() {
        this.data = new Map();
    }

    private isExpired(v) {
        return v.expire && v.updateAt + v.expire >= Date.now();
    }

    private clear() {
        this.data.forEach((v, k) => {
            if (this.isExpired(v)) {
                this.data.delete(k);
                this.emit(MemCache.EventType.KEY_EXPIRED, k, v);
            }
        });
    }
}

export {MemCache}