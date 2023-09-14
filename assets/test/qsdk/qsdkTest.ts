import { _decorator, Component, log, Node } from 'cc';
// import { Message } from 'qsdk/im/Bean';
import { IM } from 'qsdk/im/IM';
const { ccclass, property } = _decorator;

@ccclass('qsdkTest')
export class qsdkTest extends Component {
    start() {
        let im = new IM()
        // im.Init({})

        let message = new Message()
        // im.db.insertMessage(message).then((ret) => {
        //     log("im.db.insertMessage--- ret", ret)
        // })



    }

    update(deltaTime: number) {

    }







}


