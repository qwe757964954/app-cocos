import { EmptyClass, EventTargetExtends } from "bos/utils/ClassUtils";
import { Gateway } from "./Gateway";

const expiredAt = 3*1000*60

interface UserDelegate {
    refreshUser(user: User)
}

class User extends EventTargetExtends(EmptyClass) {
    uid:number = 0;
    avatar = "";
    nickname = "";
    gender = User.Gender.MALE;
    bannedUntil = -1;
    updateAt = 0;
    private delegate:UserDelegate

    static EventType = {
        USER_INFO_CHANGED: "USER_INFO_CHANGED"
    }

    static Gender = {
        MALE: 1,
        FEMALE: 2
    }

    constructor(uid: number, delegate: UserDelegate) {
        super()
        this.uid = uid
        this.delegate = delegate
    }

    update(data: any) {
        Object.assign(this, data)
        this.updateAt = Date.now()
        this.emit(User.EventType.USER_INFO_CHANGED, this, data)
    }

    isValid() {
        return this.updateAt > 0
    }

    isExpired() {
        return Date.now() - this.updateAt > expiredAt
    }

    async finish() : Promise<User> {
        if (this.isValid()) {
            return this
        }
        return this.delegate.refreshUser(this)
    }
}

export { User }