import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { XComponent } from 'bos/framework/component/XComponent';
import { FeedEntity } from 'qsdk/feed/db/Model';
import { instantiate } from 'cc';
import { ResourceImageCtr } from './ResourceImageCtr';
import { Prefab } from 'cc';

@ccclass('ResourcesViewCtr')
export class ResourcesViewCtr extends XComponent {

    @property(Prefab)
    resourceImagePrefab: Prefab = null

    private feedEntity: FeedEntity = null
    updateView(feedEntity: FeedEntity) {
        this.feedEntity = feedEntity

        this.node.removeAllChildren()
        let resources = this.feedEntity.getResources()
        for (let index = 0; index < resources?.length; index++) {
            let resourceImage = instantiate(this.resourceImagePrefab)
            resourceImage.getComponent(ResourceImageCtr)?.updateView(index, resources)
            this.node.addChild(resourceImage)
        }
    }
}