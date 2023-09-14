import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { Picture } from 'qsdk/exports';
import { UITransform } from 'cc';
import { size } from 'cc';
import { YogaFlex } from 'bos/framework/yoga/YogaFlex';
import { eventSystem } from 'bos/exports';

const maxWidth = 660
const maxHeight = 660

const minWidth = 220
const minHeight = 220


@ccclass('ResourceImageCtr')
export class ResourceImageCtr extends XComponent {

    @property(Node)
    imageView;

    private index;
    private resources;

    start() {

    }


    updateView(index, resources) {

        this.index = index
        this.resources = resources

        let resource = resources[index]
        if (typeof (resource.extra) == "string" && resource.extra != "") {
            resource.extra = JSON.parse(resource.extra)
        }

        if (resources.length == 1 && resource.extra && resource.extra.info) {
            this.setSingleFit(resource.extra.info);

            this.node.getComponent(YogaFlex).setMargin(10, 10, 0, 0);
        } else {
            if (resource.extra && resource.extra.info) {
                if (resource.extra.info.width > resource.extra.info.height) { // 宽 > 高  rate = 2
                    this.imageView.getComponent(Picture).fitMod = Picture.FitMod.height
                } else {
                    this.imageView.getComponent(Picture).fitMod = Picture.FitMod.width
                }
                let designSize = this.node.getComponent(UITransform).contentSize
                this.imageView.getComponent(Picture).designSize = designSize

                this.node.getComponent(YogaFlex).setMargin(10, 10, 0, 0);

            } else {
                // const ResourceCache = import("bos.engine.resource").ResourceCache;
                // const tex = ResourceCache.instance().load_texture_async(resource.url);
                // if (tex) {
                //     const size = tex.size;
                //     if (size[0] > size[1]) { // 宽 > 高  rate = 2
                //         this.imageView.setFitMode("height");
                //     } else {
                //         this.imageView.setFitMode("width");
                //     }
                // }
                // this.imageView.designSize([object.width, object.height]);
            }
        }

        this.imageView.getComponent(Picture).setUrl(resource.url);
    }


    setSingleFit(imageInfo: { width: number, height: number }): void {

        let contentSize = this.node.getComponent(UITransform).contentSize

        let objectWidth = contentSize.width;
        let objectHeight = contentSize.height;

        const realWidth = imageInfo.width;
        const realHeight = imageInfo.height;

        const rate = realWidth / realHeight;
        if (rate > 3) {
            objectHeight = objectHeight / rate;
            objectWidth = maxWidth;
            if (objectHeight < minHeight) {
                objectHeight = minHeight;
                this.imageView.getComponent(Picture).fitMod = Picture.FitMod.height
            }
        } else if (rate <= 3 && rate >= 1) {
            objectHeight = objectHeight / rate;
        } else if (rate < 1 && rate >= 1 / 3) {
            objectWidth = objectWidth * rate;
        } else if (rate < 1 / 3) {
            objectHeight = maxHeight;
            objectWidth = objectWidth * rate;
            if (objectWidth < minWidth) {
                objectWidth = minWidth;
                this.imageView.getComponent(Picture).fitMod = Picture.FitMod.width
            }
        }

        this.node.getComponent(YogaFlex).setSize(objectWidth, objectHeight)
        this.imageView.getComponent(Picture).designSize = size(objectWidth, objectWidth)
    }

    setMargin(index: number): void {
        let l = 0;
        let t = 0;

        if (index % 3 === 1) {
            l = 0;
        } else {
            l = 10;
        }

        if (index < 4) {
            t = 0;
        } else {
            t = 10;
        }

        // const margin: [number, number, number, number] = [l, t, 0, 0];
        // this.object.props({ margin });
    }

    onClick() {
        eventSystem.emit("onFeedResourceClick", { node: this.node, resources: this.resources, index: this.index })
    }


}