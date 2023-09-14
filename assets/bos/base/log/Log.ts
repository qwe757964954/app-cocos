/*
 * @Author: xzben
 * @Date: 2022-05-25 11:42:02
 * @LastEditors: xzben
 * @LastEditTime: 2022-05-25 11:54:31
 * @Description: file content
 */

import { sys } from "cc";
import { Logger } from "./Logger"

export const Log = new Logger()
console.log = Log.d.bind(Log)
console.info = Log.i.bind(Log)
console.warn = Log.w.bind(Log)
console.error = Log.e.bind(Log)