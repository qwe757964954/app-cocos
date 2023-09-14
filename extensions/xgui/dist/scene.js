"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const cc_1 = require("cc");
const cc_2 = require("cc");
const cc_3 = require("cc");
const cc_4 = require("cc");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const cc_5 = require("cc");
const { director } = require('cc');
const Util_1 = require("./utils/Util");
const package_json_1 = __importDefault(require("../package.json"));
function findUITransform(node) {
    let c = node.getComponent(cc_4.UITransform);
    if (c) {
        return c;
    }
    else {
        return findUITransform(node.parent);
    }
}
function removeFileExtension(filename) {
    const lastIndex = filename.lastIndexOf(".");
    if (lastIndex === -1) {
        return filename;
    }
    return filename.substring(0, lastIndex);
}
function getDbPath(filename) {
    let str = removeFileExtension(filename);
    const lastIndex = str.lastIndexOf("/");
    if (lastIndex === -1) {
        return str;
    }
    return str.substring(0, lastIndex);
}
//编译代码
function refreshAssetDb() {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 7456,
            path: '/asset-db/refresh',
            method: 'GET',
        };
        const req = http_1.default.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                // console.warn("http.request end", data); // 打印接收到的响应数据
                if (data == "success") {
                    console.log("compile script complete");
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
        req.on('error', (error) => {
            console.error(error);
            resolve(false);
        });
        req.end();
    });
}
//刷新属性面板
async function refreshInspector(node) {
    let nodes = Editor.Selection.getSelected("node");
    if (nodes.length == 1) {
        let uuid = nodes[0];
        let scene = director.getScene();
        let selectNode = (0, Util_1.findByUUID)(scene, uuid);
        if (selectNode && selectNode === node) {
            // console.warn(`inspector:update`)
            //TODO暂时通过 取消/选中 的方式来刷新一下
            Editor.Selection.unselect('node', selectNode.uuid);
            setTimeout(async () => {
                Editor.Selection.select('node', selectNode.uuid);
            }, 300);
            //Editor.Message.send('inspector', "inspector:update", {id:selectNode.uuid, path = ? })
        }
    }
}
function findInspectorRootNode(node) {
    // console.log("findInspectorRootNode", node)
    let parent = node.parent;
    if (!parent || parent.name == "should_hide_in_hierarchy") {
        return node;
    }
    else {
        return findInspectorRootNode(node.parent);
    }
}
function getValidCom(node, result, result1) {
    var _a, _b;
    let components = (_a = node.components) !== null && _a !== void 0 ? _a : [];
    for (let index = 0; index < components.length; index++) {
        const component = components[index];
        let name = component.constructor.name;
        // console.log("getValidCom", component.constructor.prototype.__cid__, name)
        let cid = cc_5.js.getClassId(component, false);
        /**name != cid 表示不是引擎自带组件类 */
        if (cid && cid != "" && name != cid) {
            result.push(cid);
            result1 === null || result1 === void 0 ? void 0 : result1.push(component);
        }
    }
    let children = (_b = node.children) !== null && _b !== void 0 ? _b : [];
    for (let index = 0; index < children.length; index++) {
        const child = children[index];
        getValidCom(child, result, result1);
    }
}
function waitCls(scriptCid, exportName) {
    return new Promise((resolve, reject) => {
        let retry = (times) => {
            times--;
            setTimeout(() => {
                // console.log("try access property", times)
                let has = false;
                let cls = cc_5.js.getClassById(scriptCid);
                if (cls) {
                    let instance = new cls();
                    let props = Object.getOwnPropertyNames(instance);
                    if (props.indexOf(exportName) != -1) {
                        console.log("register property success");
                        has = true;
                    }
                }
                if (!has && times > 0) {
                    retry(times);
                }
                else {
                    resolve(has);
                }
            }, 120);
        };
        retry(20);
    });
}
let data = {};
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    getValidCom(...args) {
        // console.log("hello world")
        let nodeUuid = args[0];
        let scene = director.getScene();
        let exportNode = (0, Util_1.findByUUID)(scene, nodeUuid);
        if (!exportNode) {
            console.warn(`exportComToScript can't find node of $}`);
            return;
        }
        let node = findInspectorRootNode(exportNode);
        // console.log("findInspectorRootNode res", node)
        let result = [];
        getValidCom(node, result);
        return result;
    },
    asyncParentSize() {
        let nodes = Editor.Selection.getSelected("node");
        const { director } = require('cc');
        for (let index = 0; index < nodes.length; index++) {
            const uuid = nodes[index];
            console.log("rotateCamera uuid", index, uuid);
            let node = (0, Util_1.findByUUID)(director.getScene(), uuid);
            console.log("rotateCamera node", node);
            if (node) {
                let p = findUITransform(node);
                if (!p) {
                    console.warn("没有找到UITransform");
                    return;
                }
                let c = node.getComponent(cc_4.UITransform);
                if (!c) {
                    c = node.addComponent(cc_4.UITransform);
                }
                c.setContentSize(p.width, p.height);
                console.log("rotateCamera size", p.width, p.height);
                let com = node.getComponent(cc_1.Widget);
                if (!com) {
                    com = node.addComponent(cc_1.Widget);
                }
                console.log("rotateCamera com", com);
                com.isAlignTop = true;
                com.isAlignBottom = true;
                com.isAlignRight = true;
                com.isAlignLeft = true;
                com.editorLeft = 0;
                com.editorRight = 0;
                com.editorBottom = 0;
                com.editorTop = 0;
            }
        }
        return false;
    },
    createUIComponent() {
        const { director } = require('cc');
        let nodes = Editor.Selection.getSelected("node");
        console.warn("createUIComponent nodes", nodes);
        let parent = director.getScene();
        if (nodes.length == 1) {
            let uuid = nodes[0];
            parent = (0, Util_1.findByUUID)(parent, uuid);
        }
        console.warn("createUIComponent parent", parent);
        if (!parent) {
            return;
        }
        let node = new cc_3.Node();
        node.addComponent(cc_2.Sprite);
        node.addComponent(cc_1.Widget);
        node.parent = parent;
    },
    async createComponent(...args) {
        let name = args[0];
        let uuid = args[1];
        let prefabUuid = args[2];
        if (!name || !uuid || !prefabUuid) {
            console.warn("createComponent args is invalid", name, uuid, prefabUuid);
            return;
        }
        let assetInfo = await Editor.Message.request("asset-db", "query-asset-info", prefabUuid);
        if (!assetInfo) {
            console.warn("createComponent query-asset-info error", assetInfo);
            return;
        }
        let newFileName = name + ".ts";
        newFileName = newFileName.charAt(0).toUpperCase() + newFileName.slice(1);
        let newFile = getDbPath(assetInfo.url) + "/" + newFileName;
        // let template = path.join(Editor.Project.path, ".creator", "asset-template", "typescript", "XComponent")
        // let template = await Editor.Message.request("asset-db", "query-path", "db://internal/default_file_content/ts")
        // if (!template) {
        //     console.warn("createComponent query-path error")
        //     return
        // }
        let template = path_1.default.join(Editor.Project.path, "extensions", "xgui", "static", "template", "ts", "ts");
        try {
            let str = fs_1.default.readFileSync(template, 'utf8');
            str = str.replace(/<%UnderscoreCaseClassName%>/g, name);
            let newAssetInfo = await Editor.Message.request("asset-db", "create-asset", newFile, str);
            // console.log("createComponent newAssetInfo", newAssetInfo)
            if (!newAssetInfo) {
                console.warn("createComponent create-asset error");
                return;
            }
            await Editor.Message.request("asset-db", "refresh-asset", "db://assets");
            //编译代码
            await refreshAssetDb();
            let tryAddComponent = (times) => {
                times = times - 1;
                setTimeout(async () => {
                    let sceneComponents = await Editor.Message.request('scene', 'query-components');
                    // console.log("createComponent sceneComponents", sceneComponents)
                    let cid;
                    for (let index = 0; index < sceneComponents.length; index++) {
                        const com = sceneComponents[index];
                        if (com.assetUuid == newAssetInfo.uuid) {
                            cid = com.cid;
                            break;
                        }
                    }
                    if (cid) {
                        let options = {
                            uuid: uuid,
                            component: cid
                        };
                        Editor.Message.request("scene", "create-component", options);
                        console.warn(`${name}脚本添加成功`);
                    }
                    else {
                        if (times > 0) {
                            tryAddComponent(times);
                        }
                        else {
                            console.warn(`${name}脚本没有添加到节点上,请重试或者手动添加`);
                        }
                    }
                }, 100);
            };
            tryAddComponent(20);
        }
        catch (error) {
            console.warn(`createComponent open ${template} fail`, error);
        }
    },
    async exportComToScript(...args) {
        let nodeUuid = args[0];
        let nodeName = args[1];
        let exportType = args[2];
        let scriptName = args[3];
        let scriptCid = args[4];
        let scriptUuid = args[5];
        let exportScriptUuid = args[6];
        let isRetry = args[7];
        let exportName = nodeName + exportType.replace('cc.', '');
        exportName = exportName.charAt(0).toLowerCase() + exportName.slice(1);
        // console.log("exportComToScript", nodeUuid, nodeName, exportType, scriptName, scriptCid, scriptUuid, exportScriptUuid)
        let success = 0;
        if (!isRetry) {
            try {
                let cls = cc_5.js.getClassById(scriptCid);
                let instance = new cls();
                let props = Object.getOwnPropertyNames(instance);
                let pathScript = await Editor.Message.request("asset-db", "query-path", scriptUuid);
                let str = fs_1.default.readFileSync(pathScript, 'utf8');
                let writeScript = true;
                if (props.indexOf(exportName) != -1) {
                    // console.warn(`${scriptName} already has Property of ${exportName}`)
                    writeScript = false;
                }
                // let exportNameRegex = /XXXX\s+:/
                // const modifiedNameRegex = new RegExp(exportNameRegex.source.replace("XXXX", exportName), exportNameRegex.flags);
                // if (modifiedNameRegex.test(str)){
                //     console.warn(`modifiedNameRegex: ${scriptName} already has Property of ${exportName}`)
                //     writeScript = false
                // }
                if (writeScript) {
                    //引擎自带脚本/Node
                    if (exportType.startsWith("cc.") || exportType == "Node") {
                        let exportTypeWithOutCC = exportType.replace('cc.', '');
                        let headRegex = /export\s+class\s+(\w+)\s+extends\s+(\w+)\s*\{/;
                        let headRegexArray = headRegex.exec(str);
                        // console.warn("headRegexStr", headRegexArray)
                        if (headRegexArray) {
                            let headRegexStr = headRegexArray[0];
                            str = str.replace(headRegexStr, headRegexStr + `\n\t@property(${exportTypeWithOutCC})\n\t${exportName} : ${exportTypeWithOutCC}\n`);
                            let regex = /import\s+\{[^}]*XXXX[^}]*\}\s+from 'cc'/;
                            const modifiedRegex = new RegExp(regex.source.replace("XXXX", exportTypeWithOutCC), regex.flags);
                            if (!modifiedRegex.test(str)) {
                                str = `import { ${exportTypeWithOutCC} } from 'cc'\n` + str;
                            }
                        }
                        else {
                            console.warn(`${scriptName} can't has Regex Head`);
                        }
                    }
                    else {
                        //db://assets/app/modules/match/matchModules/prefab/bgSprite.ts
                        let exportScriptPath = await Editor.Message.request("asset-db", "query-url", exportScriptUuid);
                        let info = path_1.default.parse(exportScriptPath);
                        console.log("exportScriptPath", exportScriptPath, info);
                        let headPath = info.dir.replace("db://assets/", "");
                        let importPath = headPath + '/' + info.name;
                        // console.log("exportScriptPath", importPath)
                        let headRegex = /export\s+class\s+(\w+)\s+extends\s+(\w+)\s*\{/;
                        let headRegexArray = headRegex.exec(str);
                        if (headRegexArray) {
                            let headRegexStr = headRegexArray[0];
                            str = str.replace(headRegexStr, headRegexStr + `\n\t@property(${exportType})\n\t${exportName} : ${exportType}\n`);
                            let regex = /import\s+\{[^}]*XXXX[^}]*\}\s+from/;
                            const modifiedRegex = new RegExp(regex.source.replace("XXXX", exportType), regex.flags);
                            if (!modifiedRegex.test(str)) {
                                str = `import { ${exportType} } from '${importPath}'\n` + str;
                            }
                        }
                        else {
                            console.warn(`${scriptName} can't has Regex Head`);
                        }
                    }
                    fs_1.default.writeFileSync(pathScript, str);
                    console.log("write script success");
                    //刷新资源
                    await Editor.Message.request("asset-db", "refresh-asset", "db://assets");
                    //编译代码
                    await refreshAssetDb();
                    //等待类注册完毕
                    await waitCls(scriptCid, exportName);
                }
            }
            catch (error) {
                console.error(`exportComToScript try execute ${scriptName} fail`, error);
                success = 2;
            }
        }
        let scene = director.getScene();
        let exportNode = (0, Util_1.findByUUID)(scene, nodeUuid);
        if (!exportNode) {
            console.warn(`exportComToScript can't find node of ${nodeName}`);
            return;
        }
        let result = [];
        let result1 = [];
        let rootNode = findInspectorRootNode(exportNode);
        getValidCom(rootNode, result, result1);
        // console.log("getValidCom rootNode result", result)
        // console.log("getValidCom rootNode result1", result1)
        // console.log("getValidCom rootNode1", Object.getOwnPropertyNames(result1[0]))
        let cls = cc_5.js.getClassById(scriptCid);
        if (cls) {
            let instance = new cls();
            let coms1 = [];
            for (let index = 0; index < result1.length; index++) {
                const i = result1[index];
                if (i.constructor == instance.constructor) {
                    coms1.push(i);
                }
            }
            if (coms1.length <= 0) {
                success = 1;
                console.warn(`exportComToScript can't find component of ${scriptName} then will retry`);
            }
            else {
                // console.log("exportComToScript 1", coms1)
                for (let index = 0; index < coms1.length; index++) {
                    const com = coms1[index];
                    let props = Object.getOwnPropertyNames(com);
                    if (props.indexOf(exportName) != -1) {
                        if (exportType == "Node") {
                            com[exportName] = exportNode;
                            console.log("exportComToScript success");
                            refreshInspector(com.node);
                        }
                        else {
                            if (exportNode.getComponent(exportType)) {
                                com[exportName] = exportNode.getComponent(exportType);
                                console.log("exportComToScript success");
                                refreshInspector(com.node);
                            }
                            else {
                                console.warn(`exportComToScript can't find component of ${exportType} in ${nodeName}`);
                            }
                        }
                    }
                    else {
                        console.log(`exportComToScript can't find prop of ${exportName} then will retry`);
                        success = 1;
                        break;
                    }
                }
            }
        }
        return success;
    },
    async exportAssetToScript(...args) {
        let assetUrl = args[0];
        let assetType = args[1];
        let assetName = args[2];
        let scriptName = args[3];
        let scriptCid = args[4];
        let scriptUuid = args[5];
        console.log("exportAssetToScript", assetUrl, assetType, assetName, scriptName, scriptCid, scriptUuid);
    },
    async loadAsset(info) {
        return new Promise((rs, rj) => {
            cc_4.assetManager.loadAny({ uuid: info.uuid }, (err, data) => {
                if (err) {
                    rj(err);
                    return;
                }
                rs(data);
            });
        });
    },
    async exportCom() {
        let nodeUuid = data.nodeUuid;
        let nodeName = data.nodeName;
        let exportType = data.exportType;
        let scriptName = data.scriptName;
        let scriptCid = data.scriptCid;
        let scriptUuid = data.scriptUuid;
        let exportScriptUuid = data.exportScriptUuid;
        let selectedUuid = data.selectedUuid;
        let isRetry = data.isRetry;
        let hasAsset = data.hasAsset;
        let exportName = nodeName;
        // 第一个字符设置为小写字符
        exportName = exportName.charAt(0).toLowerCase() + exportName.slice(1);
        let success = 0;
        if (!isRetry) {
            try {
                let cls = cc_5.js.getClassById(scriptCid);
                let instance = new cls();
                let props = Object.getOwnPropertyNames(instance);
                let pathScript = await Editor.Message.request("asset-db", "query-path", scriptUuid);
                let str = fs_1.default.readFileSync(pathScript, 'utf8');
                let writeScript = true;
                if (props.indexOf(exportName) != -1) {
                    writeScript = false;
                }
                if (writeScript) {
                    //引擎自带脚本/Node
                    let headRegex = /export\s+class\s+(\w+)\s+extends\s+(\w+)\s*\{/;
                    let headRegexArray = headRegex.exec(str);
                    if (exportType.startsWith("cc.") || exportType == "Node") {
                        let exportTypeWithOutCC = exportType.replace('cc.', '');
                        if (headRegexArray) {
                            let headRegexStr = headRegexArray[0];
                            str = str.replace(headRegexStr, headRegexStr + `\n\t@property(${exportTypeWithOutCC})\n\t${exportName} : ${exportTypeWithOutCC} = null!;\n`);
                            let regex = /import\s+\{[^}]*XXXX[^}]*\}\s+from 'cc'/;
                            const modifiedRegex = new RegExp(regex.source.replace("XXXX", exportTypeWithOutCC), regex.flags);
                            if (!modifiedRegex.test(str)) {
                                str = `import { ${exportTypeWithOutCC} } from 'cc'\n` + str;
                            }
                        }
                        else {
                            console.warn(`${scriptName} 正则匹配错误`);
                        }
                    }
                    else {
                        let importPath = await (0, Util_1.getRelativePathByUuid)(scriptUuid, exportScriptUuid);
                        if (headRegexArray) {
                            let headRegexStr = headRegexArray[0];
                            str = str.replace(headRegexStr, headRegexStr + `\n\t@property(${exportType})\n\t${exportName} : ${exportType} = null!;\n`);
                            let regex = /import\s+\{[^}]*XXXX[^}]*\}\s+from/;
                            const modifiedRegex = new RegExp(regex.source.replace("XXXX", exportType), regex.flags);
                            if (!modifiedRegex.test(str) && importPath) {
                                str = `import { ${exportType} } from '${importPath}'\n` + str;
                            }
                        }
                        else {
                            console.warn(`${scriptName} 正则匹配错误`);
                        }
                    }
                    fs_1.default.writeFileSync(pathScript, str);
                    //刷新资源
                    await Editor.Message.request("asset-db", "refresh-asset", "db://assets");
                    //编译代码
                    await refreshAssetDb();
                    //等待类注册完毕
                    await waitCls(scriptCid, exportName);
                }
                else {
                    console.warn(`脚本组件内已经存在 ${nodeName} 属性.`);
                }
            }
            catch (error) {
                console.error(`导出失败 ${scriptName} `, error);
                success = 2;
            }
        }
        let scene = director.getScene();
        let exportNode = null;
        if (hasAsset) {
            exportNode = await (0, Util_1.getAssetInfo)(nodeUuid);
            if (!exportNode) {
                console.warn(`编辑器内未找到 ${nodeName} 素材资源.`);
                return;
            }
        }
        else {
            exportNode = (0, Util_1.findByUUID)(scene, nodeUuid);
            if (!exportNode) {
                console.warn(`编辑器内未找到 ${nodeName} 节点.`);
                return;
            }
        }
        let selectedNode = (0, Util_1.findByUUID)(scene, selectedUuid);
        if (!selectedNode) {
            console.warn(`编辑器内未找到选中的节点.`);
            return;
        }
        let cls = cc_5.js.getClassById(scriptCid);
        if (cls) {
            let instance = new cls();
            let com;
            selectedNode._components.forEach((component) => {
                if (component.constructor === instance.constructor) {
                    com = component;
                }
            });
            if (com) {
                let props = Object.getOwnPropertyNames(com);
                if (props.indexOf(exportName) != -1) {
                    let value = (0, Util_1.getPropsValue)(exportNode, exportType, hasAsset);
                    if (hasAsset) {
                        value = await this.loadAsset(value);
                    }
                    com[exportName] = value;
                    refreshInspector(selectedNode);
                }
                else {
                    console.log(`导出时找不到属性 ${exportName} 重试`);
                    success = 1;
                }
            } else {
                success = 1;
            }
        }
        return success;
    },
    setData(args) {
        let nodeUuid = args[0];
        let nodeName = args[1];
        let exportType = args[2];
        let scriptName = args[3];
        let scriptCid = args[4];
        let scriptUuid = args[5];
        let exportScriptUuid = args[6];
        let selectedUuid = args[7];
        let isRetry = args[8];
        let hasAsset = args[9];
        data.nodeUuid = nodeUuid;
        data.nodeName = nodeName;
        data.exportType = exportType;
        data.scriptName = scriptName;
        data.scriptCid = scriptCid;
        data.scriptUuid = scriptUuid;
        data.exportScriptUuid = exportScriptUuid;
        data.selectedUuid = selectedUuid;
        data.isRetry = isRetry;
        data.hasAsset = hasAsset;
    },
    async openPanel(...args) {
        this.setData(args);
        let nodeUuid = args[0];
        await Editor.Panel.open(package_json_1.default.name + ".asset");
        Editor.Message.send(package_json_1.default.name, 'init-asset-panel', nodeUuid, data.hasAsset);
    },
    sendNodeType(...args) {
        let type = args[0];
        let name = args[1];
        let spriteUuid = args[2];
        data.nodeName = name;
        if (type && data.exportType != type) {
            data.exportType = type;
        }
        if (spriteUuid) {
            data.exportScriptUuid = spriteUuid;
        }
        this.executeExportCommand();
    },
    executeExportCommand() {
        let retry = async (times, isRetry) => {
            data.isRetry = isRetry;
            times--;
            let result = await this.exportCom();
            let fail = `导出节点到${data.scriptName}失败."`;
            let success = `导出节点到${data.scriptName}成功.`;
            if (result != 0) {
                if (result == 1) {
                    if (times > 0) {
                        setTimeout(() => {
                            retry(times, true);
                        }, 100);
                    }
                    else {
                        console.warn(fail);
                    }
                }
            }
            else {
                console.log(success);
            }
        };
        retry(10, false);
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
function load() { }
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
function unload() { }
exports.unload = unload;
