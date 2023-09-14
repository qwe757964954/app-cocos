import { MeshRenderer } from 'cc';
import { Material } from 'cc';
import { Color } from 'cc';
import { EffectAsset } from 'cc';
import { Profiler } from 'cc';
import { director } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ProfileColorChange')
export class ProfileColorChange extends Component {
    @property({
        displayName: "material",
        type: Material,
        visible: true,
    })
    private _mymaterial: Material = null!;

    protected onLoad(): void {

        let profiler = director.getSystem("profiler") as any;

        let meshRender = (profiler as any)._meshRenderer;
        let texture = (profiler as any)._texture

        if (meshRender && texture) {
            const pass = profiler.pass = this._mymaterial.passes[0];
            const hTexture = pass.getBinding('mainTexture');
            const bDigits = pass.getBinding('digits');
            const bOffset = pass.getBinding('offset');
            pass.bindTexture(hTexture, profiler._texture!);
            profiler.digitsData = pass.blocks[bDigits];
            profiler.offsetData = pass.blocks[bOffset];
            profiler.offsetData[3] = -1; // ensure init on the first frame

            profiler._meshRenderer.material = this._mymaterial;
        }
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


