import { Log } from 'bos/exports';
import { _decorator, assetManager, Component, Node, resources, sp, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

import { resLoader } from 'bos/exports';
import { BundleSprite } from 'bos/framework/component/BundleSprite';


@ccclass('LoadTest')
export class LoadTest extends Component {

    @property(Node)
    public testNode: Node | null = null;

    // @property(SpriteFrame)
    // public testNode: Node | null = null;

    start() {
        Log.i("LoadTest start")

        // resLoader.loadBundle('loadTest',"").then(bundle) => {
        //     Log.w(err,bundle)
        //     bundle.load("res/Btn_PhoneNum/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        //         if (err) {
        //             Log.w("load error",err)
        //             return;
        //         }
        //         Log.w(spriteFrame,"spriteFrame")
        //         let sprite = this.testNode.getComponent(Sprite);
        //         if (sprite) {
        //             sprite.spriteFrame = spriteFrame;
        //         }
        //     });
        // });

        // resLoader.loadBundle('loadTest1').then((bundle) => {
        //     Log.w("loadTest bundle", bundle)
        //     if (!bundle) {
        //         return;
        //     }
        //     bundle.load("res/Btn_PhoneNum/spriteFrame", SpriteFrame, (err, spriteFrame) => {
        //         if (err) {
        //             Log.w("load error", err)
        //             return;
        //         }
        //         Log.w(spriteFrame, "spriteFrame")
        //         let sprite = this.testNode.getComponent(Sprite);
        //         if (sprite) {
        //             sprite.spriteFrame = spriteFrame;
        //         }
        //     });
        // }
        // )
        // BaseLoader.loadSpriteFrame("loadTest#res/Btn_PhoneNum").then((spriteFrame) => {

        // })

        // resLoader.loadSpriteFrame("loadTest@res/Btn_PhoneNum", (err,spriteFrame) => {
        //     if (err) {
        //         Log.w("load error")
        //         return;
        //     }
        //     Log.d(spriteFrame, "spriteFrame")
        //     let sprite = this.testNode.getComponent(Sprite);
        //     if (sprite) {
        //         sprite.spriteFrame = spriteFrame;
        //     }
        //     console.info("loadTest@res/Btn_PhoneNum",spriteFrame)
        //     resLoader.dump()
        //     Log.w("11111111111")

        // })

        let sprite = this.testNode.getComponent(BundleSprite);
        if (sprite) {
            sprite.spriteFrame = "loadTest@res/Btn_PhoneNum";
        }


    }

    update(deltaTime: number) {

    }
    // bundle.load("loadTest@res/Btn_PhoneNum/spriteFrame"
}


