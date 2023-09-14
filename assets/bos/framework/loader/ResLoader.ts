import * as cc from "cc"
import { Asset, assetManager } from "cc";

import { Log } from "bos/base/log/Log";

const { ccclass } = cc._decorator;

type Bundle = cc.AssetManager.Bundle;
type AssetType = typeof cc.Asset;

export class ResItem {
    private refCount = 0;
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    public getPath(): string {
        return this.path;
    }

    public getRefCount(): number {
        return this.refCount;
    }

    public addRef() {
        this.refCount++;
    }

    public decRef() {
        this.refCount--;
        if (this.refCount <= 0) {
            this.destroy();
        }
    }

    protected destroy() {

    }
}

export class BundleAsset extends ResItem {
    private bundle: Bundle;

    constructor(nameOrUrl: string, bundle: Bundle) {
        super(nameOrUrl);
        this.bundle = bundle;
    }

    public getBundle(): Bundle {
        return this.bundle;
    }

    protected destroy() {
        ResLoader.getInstance().removeBundle(this.getPath());
    }
}

export class NormalAsset extends ResItem {
    private asset: cc.Asset;
    private bundle: BundleAsset;

    constructor(path: string, asset: cc.Asset, bundle: BundleAsset) {
        super(path);
        this.bundle = bundle;
        bundle.addRef();
        asset.addRef();
        this.asset = asset;
    }

    public getAsset(): cc.Asset {
        return this.asset;
    }

    protected destroy() {
        this.asset.decRef();
        this.bundle.decRef();
    }
}

export type OptionType = Record<string, any>;
export type LoadBundleAssetCompleteFunc = (err: Error | null, bundle: BundleAsset | null) => void;
export type LoadBundleAssetProcessFunc = (percent: number) => void;

export type LoadBundleArrayAssetCompleteFunc = (err: Error | null, bundle: Map<string, BundleAsset> | null) => void;
export type LoadBundleArrayAssetProcessFunc = (percent: number) => void;

export type LoadAssetProcessFunc = (percent: number) => void;
export type LoadAssetCompleteFunc = (error: Error | null, assets: cc.Asset | cc.Asset[] | null | any) => void;
export type PreloadAssetCompleteFunc = (error: Error | null, items: cc.AssetManager.RequestItem[] | null | any) => void;
export type LoadBundleDoneCallback = (error: Error | null, resPath: string, bundle: BundleAsset | null) => void;
export type LoadPrefabComponent = (node: cc.Node) => void;

const AssetTypeMap: any = {
    "mp3": cc.AudioClip,
    "prefab": cc.Prefab,
    "scene": cc.Scene,
    "proto": cc.TextAsset,
    "png": cc.SpriteFrame,
    "jpg": cc.SpriteFrame,
}

function removeSuffix(path: string): string {
    let idx = path.lastIndexOf(".");
    if (idx != -1) {
        return path.substring(0, idx);
    }

    return path;
}

function getSuffix(path: string): string {
    let idx = path.lastIndexOf(".");
    if (idx != -1) {
        return path.substr(idx + 1);
    }

    return path;
}

@ccclass("ResLoader")
export class ResLoader {
    private static instance: ResLoader = null;
    protected m_loadedBundle: Map<string, BundleAsset> = null!;
    protected m_bundleVersions: Map<string, string> = null!;
    protected m_loadedAssets: Map<string, NormalAsset> = null!;
    protected m_stackLoadedAssets: Array<Map<string, NormalAsset>> = null!;

    private separator: string = "@";

    /**
     * 设置分隔符
     */
    public setSeparator(str: string = "@") {
        this.separator = str;
    }

    private constructor() {
        this.m_bundleVersions = new Map();
        this.m_loadedBundle = new Map();
        this.m_loadedAssets = new Map();
        this.m_stackLoadedAssets = new Array();

    }
    public static getInstance(): ResLoader {
        if (!ResLoader.instance) {
            ResLoader.instance = new ResLoader();
        }
        return ResLoader.instance;
    }

    public getBundleVersions(bundleName: string): string | undefined {
        if (this.m_bundleVersions == null) return undefined;

        return this.m_bundleVersions.get(bundleName);
    }

    //删除bundle
    public removeBundle(nameOrUrl: string) {
        let asset = this.m_loadedBundle.get(nameOrUrl);
        if (asset) {
            this.m_loadedBundle.delete(nameOrUrl);
            if (nameOrUrl != "resources")
                cc.assetManager.removeBundle(asset.getBundle());
        }
    }

    public loadBundleArray(names: string[], onComplete: LoadBundleArrayAssetCompleteFunc, onProgress?: LoadBundleAssetProcessFunc) {
        let size = names.length;
        let count = size;
        let isDone = false;

        let bundles: Map<string, BundleAsset> = new Map();
        let check_done = (err: Error | null, url: string, bundle: BundleAsset | null) => {
            if (isDone) return;
            if (err == null && bundle != null) {
                count--;
                if (count <= 0) {
                    isDone = true;
                    bundles.set(url, bundle);
                    onComplete(null, bundles);
                }
            } else {
                isDone = true;
                onComplete(err, null);
            }
        }

        let filePercents: Map<string, number> = new Map();
        let onePercent = 1 / size;
        let updatePorcess = (bundleUrl: string, percent: number) => {
            if (onProgress != null) {
                filePercents.set(bundleUrl, percent);
                let allpercent = 0;
                filePercents.forEach((p: number) => {
                    allpercent += onePercent * p;
                })
                onProgress(allpercent);
            }
        }

        for (let i = 0; i < size; i++) {
            let bundleUrl = names[i]
            filePercents.set(bundleUrl, 0);
            this.loadBundle(bundleUrl, (err: Error | null, bundle) => {
                check_done(err, bundleUrl, bundle);
            }, (percent: number) => {
                updatePorcess(bundleUrl, percent);
            })
        }
    }

    //加载bundle
    public loadBundle(nameOrUrl: string, onComplete: LoadBundleAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        let asset = this.m_loadedBundle.get(nameOrUrl);
        if (asset) {
            onprogress && onprogress(1);
            onComplete(null, asset);
        } else {
            if (nameOrUrl == "resources") {
                let asset = new BundleAsset(nameOrUrl, cc.resources);
                this.m_loadedBundle.set(nameOrUrl, asset);
                onprogress && onprogress(1);
                onComplete(null, asset);
            } else {
                let options: any = {}
                if (onprogress) {
                    options.onFileProgress = (loaded: number, total: number) => {
                        onprogress(loaded / total);
                    }
                }
                let version = this.getBundleVersions(nameOrUrl)
                if (version) {
                    options.version = version;
                    cc.assetManager.loadBundle(nameOrUrl, options, (err: Error | null, data: Bundle) => {
                        if (err == null) {
                            let asset = new BundleAsset(nameOrUrl, data);
                            this.m_loadedBundle.set(nameOrUrl, asset);
                            onComplete(null, asset);
                        } else {
                            onComplete(err, null);
                        }
                    });
                } else {
                    cc.assetManager.loadBundle(nameOrUrl, options, (err: Error | null, data: Bundle) => {
                        if (err == null) {
                            let asset = new BundleAsset(nameOrUrl, data);
                            this.m_loadedBundle.set(nameOrUrl, asset);
                            onComplete(null, asset);
                        } else {
                            onComplete(err, null);
                        }
                    });
                }

            }
        }
    }



    public releaseAsset(path: string) {
        let asset = this.m_loadedAssets.get(path);
        if (asset) {
            asset.decRef();
            if (asset.getRefCount() <= 0) {
                this.m_loadedAssets.delete(path);
            }
        }
    }

    public pushStackAssets() {
        this.m_stackLoadedAssets.push(this.m_loadedAssets);
        this.m_loadedAssets = new Map();
    }

    public popReleaseStackAssets() {
        if (this.m_stackLoadedAssets.length < 1) return;

        let assets = this.m_stackLoadedAssets.pop();
        assets?.forEach((asset: NormalAsset) => {
            asset.getAsset().decRef();
        })
        assets?.clear();
    }

    public releaseAll() {
        this.m_loadedAssets.forEach((asset: NormalAsset) => {
            asset.getAsset().decRef();
        })
        this.m_loadedAssets.clear();
    }

    public loadPrefab(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        this.load(path, cc.Prefab, onComplete, onprogress);
    }

    public loadMaterial(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        this.load(path, cc.Material, onComplete, onprogress);
    }

    public loadPrefabNode(path: string, onComplete: LoadPrefabComponent, onprogress?: LoadBundleAssetProcessFunc) {
        this.loadPrefab(path, (success, prefab: cc.Prefab) => {
            if (prefab) {
                onComplete(cc.instantiate(prefab));
            } else {
                onComplete(null!);
            }
        }, onprogress)
    }

    public loadAudioClip(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        this.load(path, cc.AudioClip, onComplete, onprogress);
    }

    public loadAnimClip(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        this.load(path, cc.AnimationClip, onComplete, onprogress);
    }

    public loadTexture2D(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        this.load(path, cc.Texture2D, onComplete, onprogress);
    }

    public loadSpriteFrame(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        path = removeSuffix(path);
        if (path[path.length - 1] != "/") {
            path += "/";
        }
        path += "spriteFrame"
        this.load(path, cc.SpriteFrame, onComplete, onprogress);
    }


    public loadSpriteAtlas(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        this.load(path, cc.SpriteAtlas, onComplete, onprogress);
    }

    public loadTextAsset(path: string, onComplete: LoadAssetCompleteFunc, onprogress?: LoadBundleAssetProcessFunc) {
        this.load(path, cc.TextAsset, onComplete, onprogress);
    }

    public loadJsonAsset(path: string, onComplete: LoadAssetCompleteFunc, onProgress: LoadAssetProcessFunc | null = null) {
        this.load(path, cc.JsonAsset, onComplete, onProgress);
    }

    public loadAsset(path: string, onComplete: LoadAssetCompleteFunc, onProgress: LoadAssetProcessFunc | null = null) {
        this.load(path, cc.Asset, onComplete, onProgress);
    }

    public loadArray(paths: string[], onComplete: LoadAssetCompleteFunc, onProgress: LoadAssetProcessFunc | null = null) {
        let total = paths.length;
        let finished = 0;
        let assets: cc.Asset[] = [];
        let isError = false;

        paths.forEach((path: string) => {
            if (isError) return;

            let assetType = null;
            let resName = path;
            let arr = path.split(".")
            if (arr.length == 2 && AssetTypeMap[arr[1]]) {
                resName = arr[0];
                assetType = AssetTypeMap[arr[1]] as AssetType;
            }
            this.load(resName, assetType, (err: Error | null, data: cc.Asset) => {
                if (err == null && data) {
                    assets.push(data);
                    finished++;
                    if (finished < total) {
                        onProgress && onProgress(finished / total);
                    } else {
                        onComplete(null, assets);
                    }
                } else {
                    isError = true;
                    onComplete(err, null);
                    return;
                }
            })
        })
    }

    private load(path: string, type: AssetType | null, onComplete: LoadAssetCompleteFunc, onProgress: LoadAssetProcessFunc | null = null) {
        path = removeSuffix(path);
        let asset = this.m_loadedAssets.get(path);
        if (asset) {
            asset.addRef();
            onComplete(null, asset.getAsset());
        } else {
            let bundleBase = 0.5;
            this.checkLoadBundle(path, (err: Error | null, resPath: string, bundle: BundleAsset | null) => {
                if (err || bundle == null) {
                    onComplete(err || new Error("load bundle" + path + " failed"), null);
                } else {
                    if (type == null) {
                        bundle.getBundle().load(resPath, (finished: number, total: number, item: cc.AssetManager.RequestItem) => {
                            if (onProgress)
                                onProgress(bundleBase + finished / total);
                        }, (err, obj: cc.Asset) => {
                            if (err == null && obj) {
                                let asset = new NormalAsset(path, obj, bundle);
                                asset.addRef();
                                this.m_loadedAssets.set(path, asset);
                                onComplete(null, asset.getAsset());
                            } else {
                                onComplete(err || new Error("load asset" + path + "failed"), null);
                            }
                        })
                    } else {
                        bundle.getBundle().load(resPath, type, (finished: number, total: number, item: cc.AssetManager.RequestItem) => {
                            if (onProgress)
                                onProgress(bundleBase + finished / total);
                        }, (err, obj: cc.Asset) => {
                            if (err == null && obj) {
                                let asset = new NormalAsset(path, obj, bundle);
                                asset.addRef();
                                this.m_loadedAssets.set(path, asset);
                                onComplete(null, asset.getAsset());
                            } else {
                                onComplete(err || new Error("load asset" + path + "failed"), null);
                            }
                        })
                    }
                }
            }, (percent: number) => {
                onProgress && onProgress(percent * bundleBase);
            })
        }
    }

    private checkLoadBundle(pathName: string, onComplete: LoadBundleDoneCallback, onprogress?: LoadBundleAssetProcessFunc) {
        let arr = pathName.split(this.separator)
        let bundleName = "";
        let path = "";

        if (arr.length == 1) { //代表内嵌bundle的资源
            bundleName = "resources";
            path = arr[0];
        } else if (arr.length == 2) {
            bundleName = arr[0];
            path = arr[1]
        } else {
            console.error("error pathName:" + pathName);
            return;
        }

        this.loadBundle(bundleName, (err: Error | null, bundle: BundleAsset | null) => {
            if (err || bundle == null) {
                onComplete(err || new Error("load bundle failed"), path, null);
            } else {
                onComplete(err, path, bundle);
            }
        }, onprogress)
    }

    public loadScene(path: string, onComplete: LoadAssetCompleteFunc, onProgress: LoadAssetProcessFunc | null = null) {
        this.checkLoadBundle(path, (error: Error | null, resPath: string, bundle: BundleAsset | null) => {
            if (error == null && bundle) {
                bundle.getBundle().loadScene(resPath, (finish: number, totoal: number) => {
                    onProgress && onProgress(finish / totoal);
                }, (err: Error | null, obj: cc.SceneAsset) => {
                    if (err == null && obj) {
                        let asset = new NormalAsset(path, obj, bundle);
                        asset.addRef();
                        this.m_loadedAssets.set(path, asset);
                    }
                    onComplete(err, obj);
                });
            } else {
                onComplete(error, bundle);
            }
        });
    }

    /** 打印缓存中所有资源信息 */
    dump() {
        Log.i("-----loaded assets-----")
        this.m_loadedAssets.forEach((value: NormalAsset, key: string) => {
            Log.i("key:", key, "asset", value);
        }
        )
        Log.i("-----total assets-----")
        assetManager.assets.forEach((value: Asset, key: string) => {
            Log.i("key:", key, "asset", assetManager.assets.get(key));
        })
        Log.i(`当前资源总数:${assetManager.assets.count}`);
    }
}