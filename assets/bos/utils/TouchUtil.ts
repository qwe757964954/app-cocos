import { EventTouch, js, Node } from "cc";

/**
 * 触摸工具
 * @see TimeUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/TimeUtil.ts
 */
export class TouchUtil {


    /**
        锁定触摸事件
     */
    public static lock(event: EventTouch, target?: Node) {
        event.propagationStopped = true;
        event['lockTarget'] = target ? target : event.currentTarget;
    }

}
