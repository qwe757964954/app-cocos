import { UIMgr } from 'bos/framework/gui/UIMgr';
import { ScrollView } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Asset, AssetItem, IAsset, IAssetItem } from 'idl/tss/common/common_define';
import { ScrollViewCtr } from './ScrollViewCtr';
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('RewardCtr')
export class RewardCtr extends Component {
    @property({
        visible: true,
        type: ScrollView,
    })
    private scrollView: ScrollView = null!;

    genAssetItemList(asset: IAsset) {
        let list: IAssetItem[] = [];
        if (asset.coin && asset.coin.amount > 0) {
            list.push(asset.coin);
        }
        if (asset.diamond && asset.diamond.amount > 0) {
            list.push(asset.diamond);
        }
        if (asset.mung && asset.mung.amount > 0) {
            list.push(asset.mung);
        }
        if (asset.props && asset.props.length > 0) {
            asset.props.forEach((item: IAssetItem) => {
                list.push(item);
            });
        }
        return this.makeCellData(list);
    }


    makeCellData(srcData: IAssetItem[]) {
        const result: IAssetItem[][] = [];
        let boxData: IAssetItem;
        for (let i = 0; i < srcData.length; i += 3) {
            const tmpData = [];
            if (srcData[i] !== undefined) {
                boxData = srcData[i];
                tmpData[0] = boxData;
            }
            if (srcData[i + 1] !== undefined) {
                boxData = srcData[i + 1];
                tmpData[1] = boxData;
            }
            if (srcData[i + 2] !== undefined) {
                boxData = srcData[i + 2];
                tmpData[2] = boxData;
            }
            result.push(tmpData);
        }
        return result;
    }

    updateView(asset: IAsset) {
        let list: IAssetItem[][] = this.genAssetItemList(asset);
        console.log("onGet:", list);
        this.scrollView.getComponent(ScrollViewCtr).updateView(list);
        this.node.getComponent(AudioController).play();
    }

    onClose() {
        UIMgr.getInstance().popPopup();
    }
    onOk() {
        UIMgr.getInstance().popPopup();
    }
}


