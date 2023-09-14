// @ts-ignore
import packageJSON from '../package.json';
import { BrowserWindow } from 'electron';
let winMap: Map<string, BrowserWindow> = new Map();
let panelTitle = packageJSON.name + ".asset";
// 是否是启动
let isStarted = true;
/**
 * @en 
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any; } = {
    openPanel() {
        Editor.Panel.open(packageJSON.name);
    },
    hidePanel(name: string, hasBegin: boolean) {
        let win = winMap.get(name);
        if (!win) {
            let w = BrowserWindow.getFocusedWindow();
            if (w?.title.includes(panelTitle)) {
                win = w;
            } else {
                let wins = BrowserWindow.getAllWindows();
                wins.forEach(subWin => {
                    let title = subWin.title;
                    if (title.includes(panelTitle)) {
                        win = subWin;
                    }
                });
            }
            if (win) {
                winMap.set(name, win!);
            }
        }
        if (hasBegin) {
            if (isStarted) {
                isStarted = false;
                win?.hide();
            }
        } else {
            win?.hide();
        }
    },
    showPanel(name: string) {
        let win = winMap.get(name);
        if (win) {
            win.show();
        }
    },
    deletePanel(name: string) {
        winMap.delete(name);
    }
};

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export function load() {
    setTimeout(async () => {
        isStarted = true;
        await Editor.Panel.open(packageJSON.name + ".asset");
    }, 2000);
}

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export function unload() {
    winMap.clear();
}
