/**
 * 事件分发,不用cocos的,这里带上了拦截和扩展
 */
import { error, input, log } from 'cc';

type EventCallback = (...any: any[]) => void;

interface Event {
    type: string;
    propagationStopped?: boolean;
}

class Listener {
    event: string | undefined
    callback: EventCallback | undefined
    target?: any
    once?: boolean
}

export class EventSystem {
    private eventListeners = new Map<String, Array<Listener>>()


    private static instance: EventSystem | null = null;

    public static getInstance(): EventSystem {
        if (this.instance == null) {
            this.instance = new EventSystem();
        }
        return this.instance;
    }


    public on(type: string, callback: EventCallback, target?: any, once?: boolean) {
        if (this.has(type, callback, target)) {
            error("重复注册事件", type, callback, target)
            return
        }
        let arr = this.eventListeners.get(type)
        if (!arr) {
            arr = new Array<Listener>()
            this.eventListeners.set(type, arr)
        }
        arr.push({
            event: type,
            callback: callback,
            target: target,
        })
    }

    public once(type: string, callback: EventCallback, target?: any) {
        return this.on(type, callback, target, true)
    }

    public emit(type: string, ...args: any[]) {
        let arr = this.eventListeners.get(type)
        if (!arr) {
            return
        }
        arr.forEach((listener) => {
            listener.callback?.call(listener.target, ...args)
        })
    }

    public off(type: string, callback: EventCallback, target?: any) {
        let index = this.find(type, callback, target)
        if (index >= 0) {
            this.eventListeners.get(type)?.splice(index, 1)
        }
    }

    public find(type: string, callback: EventCallback, target?: any) {
        let arr = this.eventListeners.get(type)
        if (!arr) {
            return -1
        }
        let index = arr.findIndex((listener) => {
            return listener.callback === callback && listener.target === target
        })
        return index
    }

    public has(type: string, callback: EventCallback, target?: any) {
        return this.find(type, callback, target) >= 0
    }

    public dispatchEvent(event: Event) {
        let arr = this.eventListeners.get(event.type)
        if (!arr) {
            return
        }
        arr.every((listener) => {
            listener.callback?.(event)
            return !event.propagationStopped
        })
    }

    public removeAll(target: any) {
        this.eventListeners.forEach((listeners) => {
            listeners.forEach((listener) => {
                if (listener.target === target) {
                    listeners.splice(listeners.indexOf(listener), 1)
                }
            })
        })
    }
}