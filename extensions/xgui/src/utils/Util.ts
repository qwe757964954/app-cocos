import { ExecuteSceneScriptMethodOptions } from "../../@types/packages/scene/@types/public";
import packageJSON from "../../package.json";
import path from 'path';
/**
 * 消息公共接口
*/
export interface ExportComData {
    nodeUuid?: string;
    nodeName?: string;
    exportType?: string;
    scriptName?: string;
    scriptCid?: string;
    scriptUuid?: string;
    exportScriptUuid?: string;
    isRetry?: boolean;
    selectedUuid?: string;
    hasAsset?: boolean;
}
export const getAssetInfo = async function (uuid: string) {
    return await Editor.Message.request('asset-db', 'query-asset-info', uuid);
};
export const getNodeTree = async function (uuid: string) {
    return await Editor.Message.request("query-node-tree", uuid);
};

export const getInfo = async function (uuid: string) {
    return await Editor.Message.request('scene', 'query-node', uuid);
};
export const getAssetMeta = async function (uuid: string) {
    return await Editor.Message.request('asset-db', 'query-asset-meta', uuid);
};

export const softReload = async function () {
    return await Editor.Message.request('scene', 'soft-reload');
};

export const nodeComponentUpdated = async function () {
    return await Editor.Message.request('scene', 'node-component-updated');
};

let data: ExportComData;
export const setCacheData = function (cacheData: ExportComData) {
    data = cacheData;
};
export const getCacheData = function (): ExportComData {
    return data;
};

/**组件导出到脚本 */
export async function exportComToScript(data: ExportComData) {
    const options: ExecuteSceneScriptMethodOptions = {
        name: packageJSON.name,
        method: 'exportComToScript',
        args: [data.nodeUuid, data.nodeName, data.exportType, data.scriptName, data.scriptCid, data.scriptUuid, data.exportScriptUuid, data.selectedUuid, data.isRetry, data.hasAsset]
    };
    return await Editor.Message.request('scene', 'execute-scene-script', options);
}

export async function openPanel(data: ExportComData) {
    const options: ExecuteSceneScriptMethodOptions = {
        name: packageJSON.name,
        method: 'openPanel',
        args: [data.nodeUuid, data.nodeName, data.exportType, data.scriptName, data.scriptCid, data.scriptUuid, data.exportScriptUuid, data.selectedUuid, data.isRetry, data.hasAsset]
    };
    return await Editor.Message.request('scene', 'execute-scene-script', options);
}

export async function sendNodeType(type: string, name: string, spriteUuid: string | undefined) {
    const options: ExecuteSceneScriptMethodOptions = {
        name: packageJSON.name,
        method: 'sendNodeType',
        args: [type, name, spriteUuid]
    };
    return await Editor.Message.request('scene', 'execute-scene-script', options);
}
// 检测是否包含中文
export function containsChineseCharacters(str: string): boolean {
    const pattern = /[\u4e00-\u9fa5]/; // 匹配中文字符的正则表达式
    return pattern.test(str);
}
// 检测是否包含特殊字符
export function containsSpecialCharacters(str: string): boolean {
    const pattern = /[!@#$%^&*(),.?":{}|<>-]/;
    return pattern.test(str);
}
// 检测是否包含数字
export function containsNumberCharacters(str: string): boolean {
    let firstStr = str.charAt(0);
    return /\d/.test(firstStr);
}
// 检测是否存在空字符
export function containsTrimmedCharacters(str: string): boolean {
    return /\s/.test(str);
}
// 检测是否是空白字符
export function containsNulCharacters(str: string): boolean {
    return str.length == 0;
}
// 检测属性名称是否合法
export function checkPropsNameValidity(str: string): [boolean, string] {
    if (containsChineseCharacters(str)) {
        return [false, "中文字符"];
    }
    if (containsSpecialCharacters(str)) {
        return [false, "特殊字符"];
    }
    if (containsNumberCharacters(str)) {
        return [false, "数字"];
    }
    if (containsTrimmedCharacters(str)) {
        return [false, "空格"];
    }
    if (containsNulCharacters(str)) {
        return [false, "空"];
    }
    return [true, ""];
}

export function getFileName(file: string): string {
    return file.replace(/\.[^/.]+$/, "");
}

export function findByUUID(node: any, uuid: any): any {
    let findNode = node.getChildByUuid(uuid);
    if (findNode) {
        return findNode;
    } else {
        let children = node.children ?? [];
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            let tNode = findByUUID(child, uuid);
            if (tNode) {
                return tNode;
            }
        }
    }
}


function loadAsset(info: any, type: string) {
    return info;
}

function getComponent(info: any, type: string) {
    let value = info.getComponent(type);
    if (!value) {
        console.log("获取不到脚本组件对应的对象", type, info);
    }
    return value;
}

export function getPropsValue(info: any, type: string, hasAsset: boolean): any {
    if (hasAsset) {
        if (info.type == type) {
            return loadAsset(info, type);
        } else {
            for (let key in info.subAssets!) {
                let sub = info.subAssets[key];
                if (sub.type == type) {
                    return loadAsset(sub, type);
                }
            }
        }
    } else {
        if (type == "cc.Node") {
            return info;
        } else {
            return getComponent(info, type);
        }
    }
    return info;
}

function getRelativePath(fromPath: string, toPath: string): string {
    const fromParts = fromPath.split('/');
    const toParts = toPath.split('/');

    // 移除共享的部分
    while (fromParts.length > 0 && toParts.length > 0 && fromParts[0] === toParts[0]) {
        fromParts.shift();
        toParts.shift();
    }

    // 在 fromPath 中添加足够的 "../" 来表示返回到共享目录之外
    let backtrack = "";
    if (fromParts.length > 1) {
        fromParts.shift();
        backtrack = fromParts.map(() => '..').join('/');
    } else {
        backtrack = ".";
    }

    // 在 toPath 中添加剩余的路径部分
    const relativePath = `${backtrack}/${toParts.join('/')}`;

    return relativePath;
}

export async function getImportPathByUuid(uuid: string) {
    let url = await Editor.Message.request("asset-db", "query-url", uuid);
    let info = path.parse(url);
    let headPath = info.dir.replace("db://assets/", "");
    let importPath = headPath + '/' + info.name;
    return importPath;
}

export async function getRelativePathByUuid(fromUuid: string, toUuid: string) {
    if (fromUuid == toUuid) return;
    let from = await getImportPathByUuid(fromUuid);
    let to = await getImportPathByUuid(toUuid);
    console.log("relative:", from, to);
    return getRelativePath(from, to);
}