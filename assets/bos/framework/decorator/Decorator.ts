/**
 * 一些常用的装饰器
 */

import { Log } from 'bos/exports';
import { log } from 'cc';

export class Decorator {
    /**
     * 记录函数调用情况
     */
    public static LogMethod() {
        return (target: object, func: string, descriptor: PropertyDescriptor) => {
            const originalMethod = descriptor.value;             // 原函数
            descriptor.value = function (...args: any[]) {        // 原参数
                const result = originalMethod.apply(this, args); // this为原来的调用者,args为数组,表示函数的参数列表
                log(`函数 : ${func} 被调用`);
                return result;
            };
            return descriptor;
        };
    }

    /**
     * 设定函数与上次被调用距离多少秒(s)才生效,通常用于按钮防止被频繁多次点击
     * @param time 距离上次调用时间间隔(s)
     */
    public static FunctionIntervalDelay(time: number): (target: object, func: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
        return (target: object, func: string, descriptor: PropertyDescriptor) => {
            let lastTime = 0;
            const originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
                const current = new Date().getTime();
                if (current - lastTime < time * 1000) {
                    return;
                }
                lastTime = current;
                const result = originalMethod.apply(this, args);
                return result;
            };
            return descriptor;
        };
    }

    /**
     * @param data 事件名
     * @param once (可选)一次性
     */
    public static OnAppEvent(name: string, once?: boolean): (target: any, func: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
        return (target: any, func: string, descriptor: PropertyDescriptor) => {
            // log("Decorator...OnAppEvent", name, func, target)
            if (target.__decoratorAppEvents == null) {
                target.__decoratorAppEvents = [];
            }
            target.__decoratorAppEvents.push({
                name: name,
                func: func,
                once: once,
            });
            return descriptor;
        };
    }

    /**
     * @param data 事件名
     * @param once (可选)一次性
     */
    public static OnNodeEvent(name: string, once?: boolean): (target: any, func: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
        return (target: any, func: string, descriptor: PropertyDescriptor) => {
            // log("Decorator...OnNodeEvent", name, func, target)
            if (target.__decoratorNodeEvents == null) {
                target.__decoratorNodeEvents = [];
            }
            target.__decoratorNodeEvents.push({
                name: name,
                func: func,
                once: once,
            });
            return descriptor;
        };
    }

    public static TryAsync(once?: boolean): (target: any, func: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
        return (target: any, func: string, descriptor: PropertyDescriptor) => {
            let originalMethod = descriptor.value
            let newMethod = function (...args: any[]) {
                return new Promise((resolve, reject) => {
                    originalMethod.call(this, ...args).then((value)=>{
                        resolve(value);
                    }).catch((err)=>{
                        Log.w("onPromiseError", err)
                        if (target.onCatchError) {
                            target.onCatchError.call(this, err)
                        } else {
                            throw err
                        }
                    })
                })
            }
            descriptor.value = newMethod
            return descriptor;
        };
    }
}

 // 以下作为参数学习记录 参考: https://segmentfault.com/a/1190000011520817

 // 选项参数
 // options?: {arg1?:number, arg2?:string, arg3?:Function}

 // 方法装饰器
 // target      :Object             静态成员是类的构造函数，实例成员是类的原型对象
 // name        :string             函数名
 // descriptor  :PropertyDescriptor 成员的属性描述符 {value: Function, writable: boolean, enumerable: boolean, configurable: boolean}

 // 类装饰器
 // constructor: Function 构造函数
