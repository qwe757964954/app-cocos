import { CCFloat } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ttt')
export class ttt extends Component {
    @property(CCFloat)
    get asddd()
    {
        return 1;
    }
    set asddd(val: number)
    {

    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


