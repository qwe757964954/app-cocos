import { User } from "./User";
import { MemCache } from "bos/exports"; 

export class UserRepo {
    private userCache = new MemCache<number, User>();

    addUser(u: User) {
        this.userCache.set(u.uid, u)
    }

    getUser(id: number) : User {
        return this.userCache.get(id)
    }
}