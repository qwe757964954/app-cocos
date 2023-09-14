import { _decorator, Component, Node, Graphics } from 'cc';
const { ccclass, property, executeInEditMode} = _decorator;

@ccclass('testGarphics')
@executeInEditMode
export class testGarphics extends Component {
    start() {
        const g = this.getComponent(Graphics);
        g.lineWidth = 10;
        g.fillColor.fromHEX('#ff0000');
        g.moveTo(-40, 0);
        g.lineTo(0, -80);
        g.lineTo(40, 0);
        g.lineTo(0, 80);
        g.close();
        g.stroke();
        g.fill();
    }

    update(deltaTime: number) {
        
    }
}


