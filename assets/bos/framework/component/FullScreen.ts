import { _decorator, Component, director, Node, Size, UITransform, Vec3, view, screen } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('FullScreen')
@executeInEditMode
export class FullScreen extends Component {

    start() {
        view.on(Node.EventType.SIZE_CHANGED, this.refresh, this)
        this.node.on(Node.EventType.SIZE_CHANGED, this.refresh, this)
        this.refresh()
    }

    protected onDestroy(): void {
        view.targetOff(this)
    }

    refresh() {
        const contentSize = this.node.getComponent(UITransform).contentSize
        const contentRatio = contentSize.x/contentSize.y
        const visibleSize = view.getVisibleSize();
        const visibleRatio = visibleSize.x/visibleSize.y
        let winSize = screen.windowSize;
        let winRatio = winSize.width / winSize.height;

        if (visibleRatio > contentRatio) {
            let scale = visibleSize.x/contentSize.x
            this.node.scale = new Vec3(scale, scale, scale)
        } else {
            let scale = visibleSize.y/contentSize.y
            this.node.scale = new Vec3(scale, scale, scale)
        }
    }
}

