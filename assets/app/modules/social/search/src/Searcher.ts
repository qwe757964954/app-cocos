import * as orm from "bos/framework/orm/exports"
import { IM } from "qsdk/im/IM"
import { Session } from "qsdk/im/core/Session"
import { ChatSearch } from "qsdk/im/fts/ChatSearch"
import { StrongRelation } from "qsdk/relation/StrongRelation"
import { FTSTypes } from "qsdk/storage/fts/FTS"
import { FullSearch } from "qsdk/storage/fts/FullSearch"

// TODO 业务的数据库

let appDB = {
    user: 'USERDB',
}

export type SearchResult = SearchResultUser | SearchResultSession | SearchResultConversation

export type SearchResultUser = {
    type: "user"
    pos?: { [subtype: string]: FTSTypes.FtsPos[] }
    posContent?: { [subtype: string]: string }
    user: any
}

export type SearchResultSession = {
    type: "session"
    pos?: { [subtype: string]: FTSTypes.FtsPos[] }
    posContent?: { [subtype: string]: string }
    session: Session
}

export type SearchResultConversation = {
    type: "conversation"
    dbName: string
    tableName: string
    updateTime: number
    count: number
    /**
     * 单聊有此字段
     */
    user?: any
    /**
     * 群聊有此字段
     */
    session?: Session
}

export type SearchResultSummary = {
    users: SearchResultUser[]
    sessions: SearchResultSession[]
    conversations: SearchResultConversation[]
}

export class Searcher {

    static async searchSummary(keyword: string): Promise<SearchResultSummary> {
        let pUsers = this.searchUsers(keyword, 4)
        let pSessions = this.searchSession(keyword, 4)
        let pConversations = this.searchConversation(keyword)
        let [users, sessions, conversations] = await Promise.all([pUsers, pSessions, pConversations])
        return { users, sessions, conversations }
    }

    /**
     * 查找好友
     * @param keyword 
     * @param limit 
     * @returns 
     */
    static async searchUsers(keyword: string, limit: number): Promise<SearchResultUser[]> {
        let friends = await StrongRelation.getInstance().getFriendList()
        if (!friends) {
            return
        }
        let uids = friends.map(v => v.userID)
        let list = await FullSearch.newQuery()
            .keyword(keyword)
            .addTable({
                dbName: appDB.user,
                tableName: "user",
                fetchPos: true,
                limit: limit,
                where: orm.and({ uid__in: uids })
            })
            .find()
        if (!list) {
            return
        }
        return list.map(v => {
            return {
                type: "user",
                pos: v.pos,
                posContent: v.posContent,
                user: v.data,
            }
        })
    }


    /**
     * 查找会话 (通过群名称查找群聊)
     * @param keyword 
     * @param limit 
     * @returns 
     */
    static async searchSession(keyword: string, limit: number): Promise<SearchResultSession[]> {
        let list = await FullSearch.newQuery()
            .keyword(keyword)
            .addTable({
                dbName: IM.getInstance().getDB().dbName,
                tableName: "session",
                fetchPos: true,
                limit: limit,
            })
            .find()
        if (!list) {
            return
        }
        return list.map(v => {
            return {
                type: "session",
                pos: v.pos,
                posContent: v.posContent,
                session: v.data,
            }
        })
    }

    /**
     * 查找会话 (通过内容查找与单人的聊天和群聊)
     */
    static async searchConversation(keyword: string): Promise<SearchResultConversation[]> {
        let r = await ChatSearch.findCount(keyword)
        if (!r) {
            return
        }
        let rtn: SearchResultConversation[] = []
        let uids: number[] = []
        for (let v of r) {
            if (!v.count) {
                continue
            }
            let uid = 0
            if (v.tableName.startsWith("s")) {
                let index = v.tableName.indexOf("to")
                let id = v.tableName.substring(index + 2)
                uid = parseInt(id) || 0
                uids.push(uid)
            }
            let item: SearchResultConversation = {
                type: "conversation",
                count: v.count,
                dbName: v.dbName,
                tableName: v.tableName,
                updateTime: v.updateTime,
            }
            if (uid) {
                // TODO 查找user
                item.user = {}
            } else {
                item.session = IM.getInstance().getSession(v.tableName)
            }
            if (item.user || item.session) {
                rtn.push(item)
            }
        }
        return rtn
    }

} 
