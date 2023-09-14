import { NodeUtil } from "bos/exports";
import * as orm from "bos/framework/orm/exports";
import { Component, JsonAsset, _decorator, assetManager, native } from 'cc';
import { NATIVE } from "cc/env";
import { User } from "./bean";
const { ccclass, property } = _decorator;

const CHARS = "abcdefghijklmnopqrstuvwxyz"

function randomName(): string {
    let s = ""
    for (let i = 0; i < 10; i++) {
        let n = Math.floor(Math.random() * 26)
        let char = CHARS[n]
        s = s + char
    }
    return s
}

@ccclass('TestSQL')
export class TestSQL extends Component {

    private db: orm.DB
    private tUser: orm.TableConnection<User>

    start() {
        {
            let node = this.node.getChildByName("list")
            NodeUtil.renderToImage(node).then(async (file) => {
                console.log(
                    file,
                    file.ext,
                    file.fileSize,
                    file.name,
                    await file.arrayBuffer(),
                    await file.getImageSize(),
                    await file.getSpriteFrame(),
                )
                let path = "mycapture.png"
                if (NATIVE) {
                    path = native.fileUtils.getWritablePath() + "tmp/mycapture.png"
                }
                file.saveToFile(path)
            })
        }
        console.log("TestSQL")
        assetManager.resources.load<JsonAsset>("config", (e, v) => {
            console.log("config", e, v)
            if (v) {
                console.log(v.json)
                console.log(v.json.version)
            }
        })
        this.db = new orm.DB("test_db")
        this.tUser = this.db.register(User, "my_user_table")

        window["_test_tUser"] = this.tUser
        window["_test_User"] = User

        let test = async () => {
            console.log(await this.tUser.select().where("age>3").offset(1).limit(2).all())
            console.log(await this.tUser.select().first())

            // 把所有age<5的数据的所有属性全部修改为u中的值(主键除外)。 如果不存在，则insert u

            let u = new User()
            u.name = "zzpxxx"
            u.age = 1000
            u.info = {}
            u.mydata = new Date()
            console.log(await this.tUser.saveByWhere("age<5", u))
        }

        {
            console.log("测试新的sqlite接口")
            let db = p_sqlite.open("test_exec2.db")
            p_sqlite.exec(db, "create table user(name)")
            p_sqlite.exec(db, "insert into user values('a')")
            p_sqlite.exec(db, "insert into user values('b')")
            p_sqlite.exec(db, "insert into user values('c')")
            p_sqlite.exec(db, "insert into user values('d')")
            p_sqlite.exec(db, "select * from user", v => {
                console.log("exec", v)
            }, false)
            p_sqlite.exec(db, "select * from user", v => {
                console.log(v)
            }, true)
        }
    }

    onAddUser() {
        let name = randomName()
        let age = Math.floor(Math.random() * 10) + 1
        let u = new User(name, age)
        u.info = {
            ["k_" + randomName()]: randomName(),
            ["k_" + randomName()]: randomName(),
            ["k_" + randomName()]: randomName(),
        }
        this.tUser.insert(u).then(r => {
            console.log(r)
        })
    }

    onDeleteUser() {
        let id = Math.floor(Math.random() * 10)
        console.log("准备删除 id ", id)
        this.tUser.delete(orm.where.and({ id: id }))
    }

    onDeleteAllUser() {
        this.tUser.delete(null)
    }

    async onListAllUser() {
        let result = await this.tUser.select().all()
        console.log(result)
    }

    onListUser2() {
        console.log("找出所有 age<5 的user")
        this.tUser.select().where(orm.where.and({ age__lt: 5 })).all().then(r => {
            console.log(r)
        })
        this.tUser.select().where("age<5").all().then(r => {
            console.log(r)
        })
        this.tUser.select().where("age<5").first().then(r => {
            console.log("find first age<5", r)
        })
    }

    onUpdateUser() {
        console.log("所有user age改为3")
        this.tUser.updateAll(null, { age: 3 })
    }

    onDropTable() {
        this.tUser.dropTable()
    }
}


