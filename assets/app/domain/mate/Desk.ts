import { IDeskUser, ISession, ITable, IUser, Session } from "idl/tss/match_v2/common_matematch"
import { User } from "./User"
import { IMsgMatchOver, IMsgMatchStart, IMsgOneGameResult, IMsgOneGameStart, IReadyMsg, IUserJoinDeskResp, MsgMatchStart } from "idl/tss/match_v2/matematch.v1"
import { App } from "app/App"

export class Desk implements IMsgMatchStart {
    srvID: number
    srvName: string
    users: User[]
    ante: number
    matchName: string
    chatID: string
    matchKey?: string
    matchResult?: IMsgMatchOver
    tableResult?: Uint8Array
    myself: User
    
    get deskID(): number { return this.users.length > 0 ? this.users[0].deskID : undefined }

    constructor(uid: number) {
        this.myself = new User(uid);
        this.users = [this.myself];
    }

    getUser(id: number): User {
        let u = this.users.find(u => u.uid === id)
        if (!u) {
            u = new User(id)
            this.users.push(u)
        }
        return u
    }

    updateUser(users: any[]): void {
        users.forEach((user: IUser|IDeskUser) => {
            this.getUser(user.uid).update(user)
        })
    }

    updateDesk(props: Properties<Desk>): void {
        Object.assign(this, props)
    }

    setMatchStart(msg: IMsgMatchStart): void {
        this.updateDesk({
            ante: msg.ante,
            matchName: msg.matchName,
            chatID: msg.chatID,
            matchKey: msg.matchKey
        })
        this.updateUser(msg.users)
    }

    setMatchOver(msg: IMsgMatchOver) {
        this.updateDesk({
            matchKey: undefined,
        })
    }

    setGameStart(msg: IMsgOneGameStart) {
        this.users.forEach((user: User) => {
            user.isReady = false
        });
    }

    setOneGameResult(msg: IMsgOneGameResult) {
        this.updateUser(msg.users)

        this.updateDesk({
            matchResult: msg.over,
            tableResult: msg.tableGameData
        })
    }

    addUser(user: IDeskUser) {
        let u = this.getUser(user.uid)
        u.update(user)
        return u
    }

    setUserReady(user: IDeskUser) {
        let u = this.getUser(user.uid)
        u.update({
            isReady: true
        })
    }

    removeUser(uid: number) {
        let index = this.users.findIndex(user => user.uid === uid)
        if (index >= 0) {
            this.users.splice(index, 1)
        }
    }
}