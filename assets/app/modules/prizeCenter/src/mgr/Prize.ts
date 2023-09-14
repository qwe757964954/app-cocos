import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { Gateway } from "./Gateway";

const expiredAt = 3*1000

class Prize extends EventTargetExtends(EmptyClass) {

    skuId = 0
    updateAt = 0;

    static EventType = {
        //USER_INFO_CHANGED: "USER_INFO_CHANGED"
    }


    constructor(skuId: number) {
        super()
        this.skuId = skuId
    }

    update(data: any) {
        Object.assign(this, data)
        this.updateAt = Date.now()
        //this.emit(User.EventType.USER_INFO_CHANGED, this, data)
    }

    isValid() {
        return this.updateAt > 0
    }

    isExpired() {
        return Date.now() - this.updateAt > expiredAt
    }
}

export { Prize }