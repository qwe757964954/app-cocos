"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
// @ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
const electron_1 = require("electron");
let winMap = new Map();
let panelTitle = package_json_1.default.name + ".asset";
// 是否是启动
let isStarted = true;
/**
 * @en
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    openPanel() {
        Editor.Panel.open(package_json_1.default.name);
    },
    hidePanel(name, hasBegin) {
        let win = winMap.get(name);
        if (!win) {
            let w = electron_1.BrowserWindow.getFocusedWindow();
            if (w === null || w === void 0 ? void 0 : w.title.includes(panelTitle)) {
                win = w;
            }
            else {
                let wins = electron_1.BrowserWindow.getAllWindows();
                wins.forEach(subWin => {
                    let title = subWin.title;
                    if (title.includes(panelTitle)) {
                        win = subWin;
                    }
                });
            }
            if (win) {
                winMap.set(name, win);
            }
        }
        if (hasBegin) {
            if (isStarted) {
                isStarted = false;
                win === null || win === void 0 ? void 0 : win.hide();
            }
        }
        else {
            win === null || win === void 0 ? void 0 : win.hide();
        }
    },
    showPanel(name) {
        let win = winMap.get(name);
        if (win) {
            win.show();
        }
    },
    deletePanel(name) {
        winMap.delete(name);
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 * 暂时先注释掉打开面板逻辑，避免打包时会打开面板
 */
function load() {
    // setTimeout(async () => {
    //     isStarted = true;
    //     await Editor.Panel.open(package_json_1.default.name + ".asset");
    // }, 2000);
}
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
function unload() {
    winMap.clear();
}
exports.unload = unload;
