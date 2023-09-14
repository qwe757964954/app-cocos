/*
 * @Author: dgflash
 * @Date: 2022-07-26 15:29:57
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-02 12:07:54
 */

/** 对象工具 */

import merge from "./Merge";
export class ObjectUtil {
    /**
     * 判断指定的值是否为对象
     * @param value 值
     */
    static isObject(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Object]';
    }

    /**
     * 深拷贝
     * @param target 目标
     */
    static deepCopy(target: any): any {
        if (target == null || typeof target !== 'object') {
            return target;
        }

        let result: any = null;

        if (target instanceof Date) {
            result = new Date();
            result.setTime(target.getTime());
            return result;
        }

        if (target instanceof Array) {
            result = [];
            for (let i = 0, length = target.length; i < length; i++) {
                result[i] = this.deepCopy(target[i]);
            }
            return result;
        }

        if (target instanceof Object) {
            result = {};
            for (const key in target) {
                if (target.hasOwnProperty(key)) {
                    result[key] = this.deepCopy(target[key]);
                }
            }
            return result;
        }

        console.warn(`不支持的类型：${result}`);
    }

    /**
     * 拷贝对象
     * @param target 目标
     */
    static copy(target: object): object {
        return

        JSON.parse(JSON.stringify(target));
    }

    static merge  = merge

    static simpleMerge(target: object, source: object) {
        for (let key in source) {
            let value = source[key]
            if (value != null && value != undefined) {
                target[key] = value
            }
        }
    }

    static deepMerge(target: any, source: any): any {
        // Iterate over all the keys in the source object
        for (const key in source) {
            // Check if the key is an object and not an array
            if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                // If the key exists in the target object, recursively deep merge the nested objects
                if (target.hasOwnProperty(key)) {
                    target[key] = ObjectUtil.deepMerge(target[key], source[key]);
                } else {
                    // If the key doesn't exist in the target object, assign it directly
                    target[key] = source[key];
                }
            } else {
                // If the key is not an object, assign it directly
                target[key] = source[key];
            }
        }

        console.log("deepMerge...", target, source)
        return target;
    }
}
