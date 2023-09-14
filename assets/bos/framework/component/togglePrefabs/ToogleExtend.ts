import { _decorator, Component, ToggleContainer, Toggle, CCInteger } from 'cc';
import {ToggleItemExtend} from './ToggleItemExtend'
const { ccclass, property } = _decorator;

@ccclass('ToogleExtend')
export class ToogleExtend extends Component {
    @property(CCInteger)
    protected selectedPrefabsIndex = 0;

    onLoad() {
        let toggleContainerCom = this.getComponent(ToggleContainer)
        toggleContainerCom.toggleItems[this.selectedPrefabsIndex].getComponent(Toggle).isChecked = true
       
    }

    start()
    {
        console.log("ToogleExtend started ============================================")
    }

    onToggleContainerClick (toggle: Toggle) 
    {
        console.log(`触发了 ToggleContainer 事件，点了${toggle.node.name}的 Toggle`)
        console.log(toggle.getComponent(ToggleItemExtend)._activatePrefab.name)
    }
}


