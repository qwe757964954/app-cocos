"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelativePathByUuid = exports.getImportPathByUuid = exports.getPropsValue = exports.findByUUID = exports.getFileName = exports.checkPropsNameValidity = exports.containsNulCharacters = exports.containsTrimmedCharacters = exports.containsNumberCharacters = exports.containsSpecialCharacters = exports.containsChineseCharacters = exports.sendNodeType = exports.openPanel = exports.exportComToScript = exports.getCacheData = exports.setCacheData = exports.nodeComponentUpdated = exports.softReload = exports.getAssetMeta = exports.getInfo = exports.getNodeTree = exports.getAssetInfo = void 0;
const package_json_1 = __importDefault(require("../../package.json"));
const path_1 = __importDefault(require("path"));
const getAssetInfo = async function (uuid) {
    return await Editor.Message.request('asset-db', 'query-asset-info', uuid);
};
exports.getAssetInfo = getAssetInfo;
const getNodeTree = async function (uuid) {
    return await Editor.Message.request("query-node-tree", uuid);
};
exports.getNodeTree = getNodeTree;
const getInfo = async function (uuid) {
    return await Editor.Message.request('scene', 'query-node', uuid);
};
exports.getInfo = getInfo;
const getAssetMeta = async function (uuid) {
    return await Editor.Message.request('asset-db', 'query-asset-meta', uuid);
};
exports.getAssetMeta = getAssetMeta;
const softReload = async function () {
    return await Editor.Message.request('scene', 'soft-reload');
};
exports.softReload = softReload;
const nodeComponentUpdated = async function () {
    return await Editor.Message.request('scene', 'node-component-updated');
};
exports.nodeComponentUpdated = nodeComponentUpdated;
let data;
const setCacheData = function (cacheData) {
    data = cacheData;
};
exports.setCacheData = setCacheData;
const getCacheData = function () {
    return data;
};
exports.getCacheData = getCacheData;
/**组件导出到脚本 */
async function exportComToScript(data) {
    const options = {
        name: package_json_1.default.name,
        method: 'exportComToScript',
        args: [data.nodeUuid, data.nodeName, data.exportType, data.scriptName, data.scriptCid, data.scriptUuid, data.exportScriptUuid, data.selectedUuid, data.isRetry, data.hasAsset]
    };
    return await Editor.Message.request('scene', 'execute-scene-script', options);
}
exports.exportComToScript = exportComToScript;
async function openPanel(data) {
    const options = {
        name: package_json_1.default.name,
        method: 'openPanel',
        args: [data.nodeUuid, data.nodeName, data.exportType, data.scriptName, data.scriptCid, data.scriptUuid, data.exportScriptUuid, data.selectedUuid, data.isRetry, data.hasAsset]
    };
    return await Editor.Message.request('scene', 'execute-scene-script', options);
}
exports.openPanel = openPanel;
async function sendNodeType(type, name, spriteUuid) {
    const options = {
        name: package_json_1.default.name,
        method: 'sendNodeType',
        args: [type, name, spriteUuid]
    };
    return await Editor.Message.request('scene', 'execute-scene-script', options);
}
exports.sendNodeType = sendNodeType;
// 检测是否包含中文
function containsChineseCharacters(str) {
    const pattern = /[\u4e00-\u9fa5]/; // 匹配中文字符的正则表达式
    return pattern.test(str);
}
exports.containsChineseCharacters = containsChineseCharacters;
// 检测是否包含特殊字符
function containsSpecialCharacters(str) {
    const pattern = /[!@#$%^&*(),.?":{}|<>-]/;
    return pattern.test(str);
}
exports.containsSpecialCharacters = containsSpecialCharacters;
// 检测是否包含数字
function containsNumberCharacters(str) {
    let firstStr = str.charAt(0);
    return /\d/.test(firstStr);
}
exports.containsNumberCharacters = containsNumberCharacters;
// 检测是否存在空字符
function containsTrimmedCharacters(str) {
    return /\s/.test(str);
}
exports.containsTrimmedCharacters = containsTrimmedCharacters;
// 检测是否是空白字符
function containsNulCharacters(str) {
    return str.length == 0;
}
exports.containsNulCharacters = containsNulCharacters;
// 检测属性名称是否合法
function checkPropsNameValidity(str) {
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
exports.checkPropsNameValidity = checkPropsNameValidity;
function getFileName(file) {
    return file.replace(/\.[^/.]+$/, "");
}
exports.getFileName = getFileName;
function findByUUID(node, uuid) {
    var _a;
    let findNode = node.getChildByUuid(uuid);
    if (findNode) {
        return findNode;
    }
    else {
        let children = (_a = node.children) !== null && _a !== void 0 ? _a : [];
        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            let tNode = findByUUID(child, uuid);
            if (tNode) {
                return tNode;
            }
        }
    }
}
exports.findByUUID = findByUUID;
function loadAsset(info, type) {
    return info;
}
function getComponent(info, type) {
    let value = info.getComponent(type);
    if (!value) {
        console.log("获取不到脚本组件对应的对象", type, info);
    }
    return value;
}
function getPropsValue(info, type, hasAsset) {
    if (hasAsset) {
        if (info.type == type) {
            return loadAsset(info, type);
        }
        else {
            for (let key in info.subAssets) {
                let sub = info.subAssets[key];
                if (sub.type == type) {
                    return loadAsset(sub, type);
                }
            }
        }
    }
    else {
        if (type == "cc.Node") {
            return info;
        }
        else {
            return getComponent(info, type);
        }
    }
    return info;
}
exports.getPropsValue = getPropsValue;
function getRelativePath(fromPath, toPath) {
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
    }
    else {
        backtrack = ".";
    }
    // 在 toPath 中添加剩余的路径部分
    const relativePath = `${backtrack}/${toParts.join('/')}`;
    return relativePath;
}
async function getImportPathByUuid(uuid) {
    let url = await Editor.Message.request("asset-db", "query-url", uuid);
    let info = path_1.default.parse(url);
    let headPath = info.dir.replace("db://assets/", "");
    let importPath = headPath + '/' + info.name;
    return importPath;
}
exports.getImportPathByUuid = getImportPathByUuid;
async function getRelativePathByUuid(fromUuid, toUuid) {
    if (fromUuid == toUuid)
        return;
    let from = await getImportPathByUuid(fromUuid);
    let to = await getImportPathByUuid(toUuid);
    console.log("relative:", from, to);
    return getRelativePath(from, to);
}
exports.getRelativePathByUuid = getRelativePathByUuid;
