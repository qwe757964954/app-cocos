import { EmptyClass, EventTargetExtends, Log, NodeUtil, resLoader } from "bos/exports";
import { Prefab, Scene, SceneAsset, director, instantiate, Node, sys, assert, Canvas, CameraComponent, Camera, Component, __private } from "cc";

export type UIParams = {
    once?: boolean; // 一次性显示，不压栈
    params?: any;
    launch?: {page: string, params: UIParams}; // 场景主页
    activePrev?: boolean // 压入新page的时候保留上个页面可见
    isRoot?: boolean // isRoot 的 page 只能在 popScene 的时候移除掉
}

export class ToastParams {

}

export class LoadingParams {
    
}

export class AlertParams {
    title: string
    content: string
    cancel?: {
        title: string
        callback: () => void
    }
    ok?: {
        title: string
        callback:  () => void
    }
}

type UICallback = (err, node)=>void

const tag = "UIManager"

type UIStackItem = {
    scene?: SceneAsset|string
    page?: Prefab
    params?: UIParams
    node?: Node
    index?: number
}

interface UIDelegate {
    getToastView() : Node
    getLoadingView() : Node
    getAlertView(): Node
    getPersistRootNode() : Node
}

export class UIMgr extends EventTargetExtends(EmptyClass) {
    private static instance: UIMgr = null;
    private curCanvas: Canvas = null;
    private popupStack: Array<Node> = [];
    private delegate: UIDelegate = null;
    private uiStack = Array<UIStackItem>();
    private loadingView: Node;

    constructor() { super(); }

    static getInstance() {
        if (UIMgr.instance == null) {
            UIMgr.instance = new UIMgr();
        }
        return UIMgr.instance
    }

    setDelegate(delegate: UIDelegate) {
        this.delegate = delegate
        this.curCanvas = director.getScene().getComponentInChildren(Canvas)
    }

    getPersistRootNode() : Node {
        return this.delegate.getPersistRootNode()
    }

    private runScene(scene: string|SceneAsset, params?: any, callback?: UICallback) {
        Log.w("runScene...", scene, params)
        if (typeof scene === "string") {
            director.loadScene(scene, callback)
        } else {
            director.runScene(scene, null, callback)
        }
    }

    loadScene(path: string, params?: UIParams, callback?: UICallback) {
        Log.i("UIMgr.loadScene...", path)
        this.showLoading()
        resLoader.loadScene(path, (err, asset)=>{
            this.hideLoading()
            if (err) {
                Log.e("loadSceneErr...", err, path)
                callback?.call(null, err, null)
            } else {
                this.pushScene(asset, params, callback)
            }
        })
    }

    popToRootScene() {
        this.uiStack = this.uiStack.slice(0, 1)
        const top = this.uiStack[0]
        Log.w("popToRootScene...", top)
        this.pushScene(top.scene, top.params)
    }

    pushScene(scene: string|SceneAsset, params?: UIParams, callback?:UICallback) {
        Log.w("UIMgr.pushScene...begin", scene, params)
        this.showLoading()
        this.runScene(scene, params, (err, s)=>{
            this.hideLoading()
            if (err) {
                Log.e("UIMgr.pushScene...error", err)
                callback?.call(null, err, null)
            } else {
                this.curCanvas = s.getComponentInChildren(Canvas)
                this.setup({
                    scene: typeof scene === "string" ? scene : scene.name,
                    params: params,
                    node: s,
                })
                callback?.call(null, err, s)
            }
        })
    }

    popScene(params?: UIParams, callback?: UICallback) : boolean {
        Log.w("UIMgr.popScene...begin", this.uiStack)
        let cur = undefined
        let prev = undefined
        for(let i = this.uiStack.length-1; i >= 0; i--) {
            let item = this.uiStack[i]
            if (item.scene) {
                if (cur) {
                    prev = i
                    break
                } else {
                    cur = i
                }
            }
        }
        if (prev == undefined) {
            const err = new Error("no other scene")
            Log.e("UIMgr.popScene...error", err)
            callback?.call(err)
            return false
        }
        for (let i = this.uiStack.length-1; i >= cur; i--) {
            this.uiStack.pop()
        }
        Log.w("UIMgr.popScene...end", this.uiStack)
        let next = this.uiStack[prev]
        this.runScene(next.scene, next.params, (err, scene)=>{
            if (err) {
                callback?.call(err)
                return
            }
            next.node = scene
            this.curCanvas = scene.getComponentInChildren(Canvas)
            if (prev == cur-1) {
                this.setup(next)
            } else {
                let top = this.uiStack[cur-1]
                this.setup(top)
            }
            callback?.call(null, scene)
        })
        return true
    }

    loadPage(path: string, params?: UIParams, callback?: UICallback) {
        Log.i("UIMgr.loadPage", path, params)
        console.time("loadPage..." + path)
        this.showLoading()
        const preCanvas = this.curCanvas
        resLoader.loadPrefab(path, (err, asset)=>{
            this.hideLoading()
            if (err) {
                Log.e("load page err", err)
                callback?.call(null, err, null)
                return
            }
            if (preCanvas != this.curCanvas) {
                err = new Error("change to new scene")
                callback?.call(null, err, null)
                return
            }
            console.timeEnd("loadPage..." + path)
            let page = this.pushPage(asset, params)
            callback?.call(null, null, page)
        })
    }

    private setup(item: UIStackItem) {
        Log.d("UIMgr.setup...", item)
        if (!item.index) {
            this.uiStack.push(item)
            item.index = this.uiStack.length-1
        }
        
        if (item.scene) {
            NodeUtil.sendMessage(this.curCanvas.node, "setup", item.params?.params)
            item.params?.launch && this.loadPage(item.params.launch.page, item.params.launch.params)
        } else {
            this.runPage(item)
            NodeUtil.sendMessage(item.node, "setup", item.params?.params)
        }
    }

    private getPageIndex(node) {
        for (let i = node.index+1; i < this.uiStack.length; i++) {
            const item = this.uiStack[i]
            for(let j = 0; j < this.curCanvas.node.children.length; j++) {
                const child = this.curCanvas.node.children[j]
                if (item.node == child) {
                    return j-1
                }
            }
        }
        return this.curCanvas.node.children.length-1
    }

    private runPage(item: UIStackItem) {
        if (item.node?.isValid) {
            item.node.active = true
        } else {
            item.node = instantiate(item.page)
            this.curCanvas.node.insertChild(item.node, this.getPageIndex(item.node))
        }
    }

    getPage(index: number) {
        let t: UIStackItem = undefined
        if (index < 0) {
            let size = this.uiStack.length
            t = this.uiStack[size+index]
        } else {
            t = this.uiStack[index]
        }
        if (!t || !t.page) {
            return
        }
        this.runPage(t)
        return t.node
    }

    pushPage(page: Prefab, params?: UIParams) {
        Log.w("UIMgr.pushPage...", page, params)
        if (this.uiStack.length >= 1) {
            let top = this.uiStack[this.uiStack.length - 1]
            if (top.page) {
                if (top.params?.once) {
                    this.uiStack.pop()
                    top.node.destroy()
                } else {
                    top.node.active = !!params?.activePrev
                }
            }
        }
        let item: UIStackItem = {
            page: page,
            params: params,
        }
        this.setup(item)
        return item.node
    }

    popPage() {
        Log.w("UIMgr.popPage...")
        if (this.uiStack.length < 2) {
            Log.e("UIMgr.popPage...error[invalid stack size]")
            return
        }

        let top = this.uiStack[this.uiStack.length-1]
        if (top.scene) {
            Log.e("UIMgr.popPage...error[no page to pop]")
            return
        }

        if (top.params?.isRoot) {
            Log.e("UIMgr.popPage...error[cant pop root page]")
            return
        }

        top.node.destroy()
        this.uiStack.pop()
        top = this.uiStack[this.uiStack.length - 1]
        if (top.page) {
            this.runPage(top)
        }
        Log.w("UIMgr.popPage...end", this.uiStack)
    }

    topPage(): Node|null {
        let index = this.uiStack.length-1
        while(index >= 0) {
            let t = this.uiStack[index]
            if (t.page) {
                return t.node
            }
            index = index - 1
        }
    }

    removePage(node: Node) {
        let index = this.uiStack.length-1
        while(index >= 0) {
            let t = this.uiStack[index]
            if (t.node == node) {
                this.uiStack.slice(index)
                t.node?.destroy()
                return
            }
            index = index - 1
        }
    }

    getPageNum() {
        let num = 0
        for (let i = this.uiStack.length-1; i >= 0; i--) {
            let t = this.uiStack[i]
            if (t.page) {
                num++
            } else {
                break
            }
        }
        return num
    }

    pushAlert(alertParams: AlertParams) {
        let node = this.delegate.getAlertView()
        this.curCanvas.node.addChild(node)
        NodeUtil.sendMessage(node, "setup", alertParams)
    }

    loadPopup(popup: string, params?: UIParams) {
        resLoader.loadPrefab(popup, (err, prefab)=>{
            if (err) {
                return
            } else {
                this.pushPopup(prefab, params)
            }
        })
    }

    pushPopup(popup: Prefab, params?: UIParams) {
        let t = instantiate(popup)
        this.curCanvas.node.addChild(t)
        this.popupStack.push(t)
        NodeUtil.sendMessage(t, "setup", params?.params)
        return t
    }

    popPopup() {
        const t = this.popupStack.pop()
        if (t) {
            t.removeFromParent()
        }
    }

    removePopup(popup: Node) {
        let index = this.popupStack.findIndex((t)=>{
            return t == popup
        })
        if (index < 0) {
            return
        } 
        let t = this.popupStack[index]
        t.removeFromParent()
        this.popupStack.slice(index)
    }

    showToast(text: string, params?: any) {
        let node = this.delegate.getToastView()
        this.curCanvas.node.addChild(node)
        NodeUtil.sendMessage(node, "setup", text, params)
    }

    showLoading(params?: LoadingParams) {
        if (this.loadingView) {
            return
        }
        let node = this.delegate.getLoadingView()
        this.curCanvas.node.addChild(node)
        NodeUtil.sendMessage(node, "setup", params)
        this.loadingView = node
    }

    hideLoading() {
        if (this.loadingView) {
            this.loadingView.removeFromParent()
            this.loadingView = null
        }
    }

    getCanvasNode() {
        return this.curCanvas?.node
    }

    getCanvasCamera() : Camera {
        return this.curCanvas?.cameraComponent
    }

    getCanvasComponent<T extends Component>(T: __private._types_globals__Constructor<T> | __private._types_globals__AbstractedConstructor<T>): T|null {
        return this.curCanvas?.node.getComponent(T)
    }
}