import { IGroupUser } from "idl/mpff/social/im.v2";
import { IM } from "../IM";
import { GroupUser, GroupUserHash } from "../db/Model";
import { ObjectUtil, StringUtil, TimeUtil, eventSystem, storageMgr } from "bos/exports";
import { IHash, MessageSysAddGroupUser, MessageSysGroupChangeInfo, MessageSysGroupUserInfoChange, MessageSysRemoveGroupUser, SysCMD } from "idl/mp/common/social.im";
import { md5 } from "bos/base/crypto/md5";
import { Message } from "../core/Message";
import { GroupRole, IMEvent, MessageType } from "../config/define";

const needSyncGroupUser = {
    [SysCMD.AddGroupUser]: true,
    [SysCMD.GroupUserInfoChange]: true,
    [SysCMD.RemoveGroupUser]: true,
}

export class GroupMgr {




    private im: IM = null!;

    private groupUserHash = new Map<number, GroupUserHash>();
    private groupUserCache = new Map<number, Map<number, GroupUser>>();
    private saveTempGroupUserCache = new Map<number, Map<number, GroupUser>>();
    private saveTempGroupHashCache = new Map<number, GroupUserHash>();;
    syncTempCache = new Map<number, { isDirty: boolean, map: Map<number, GroupUser> }>();



    constructor(im: IM) {
        this.im = im;
    }

    reset() {
        this.groupUserHash.clear();
        this.groupUserCache.clear();
        this.syncTempCache.clear();
        this.saveTempGroupUserCache.clear();
        this.saveTempGroupHashCache.clear();
        this.queryGroupUserHash(0);
    }

    hasGroupUserCache(groupID: number) {
        if (this.groupUserCache.has(groupID)) {
            return true;
        } else {
            return false;
        }
    }

    updateGroupUsersByServer(groupID: number, userList: IGroupUser[], hash: IHash) {
        this.updateGroupUserHash(groupID, hash);
        this.resetGroupUserCache(groupID, userList);

    }

    updateGroupUserHash(groupID: number, hash: IHash) {
        let groupUserHash = new GroupUserHash();
        groupUserHash.groupID = groupID;
        groupUserHash.hash = hash.value;
        groupUserHash.createdAt = hash.createdAt;
        groupUserHash.expireAt = hash.expireAt;
        this.groupUserHash.set(groupID, groupUserHash);
        this.saveGroupUserHash(groupUserHash);
    }
    saveGroupUserHash(groupUserHash: GroupUserHash) {
        let group = this.saveTempGroupHashCache.get(groupUserHash.groupID)
        if (group == null) {
            this.im.getDB().queryGroupUserHash(groupUserHash).then((hash) => {
                let saveHash = this.saveTempGroupHashCache.get(groupUserHash.groupID);
                if (hash) {
                    ObjectUtil.simpleMerge(hash, saveHash);
                    this.im.getDB().saveGroupUserHash(hash, false);
                } else {
                    this.im.getDB().saveGroupUserHash(saveHash, true);
                }
                this.saveTempGroupHashCache.delete(groupUserHash.groupID);
            });
        }
        this.saveTempGroupHashCache.set(groupUserHash.groupID, groupUserHash);
    }


    resetGroupUserCache(groupID: number, userList: IGroupUser[]) {
        if (userList && userList.length > 0) {
            this.groupUserCache.set(groupID, new Map<number, GroupUser>());
            let groupUserMap = this.groupUserCache.get(groupID)!;
            for (let index = 0; index < userList.length; index++) {
                const element = userList[index];
                let gUser = new GroupUser();
                gUser.groupID = groupID;
                gUser.userID = element.userID;
                gUser.alias = element.alias;
                gUser.createdAt = element.createdAt;
                gUser.updatedAt = element.updatedAt;
                gUser.extra = StringUtil.byteBufferToUTF8String(element.extra);
                gUser.roleLevel = element.roleLevel;
                gUser.muteExpireAt = element.muteExpireAt;
                groupUserMap.set(gUser.userID, gUser);
                this.saveGroupUser(gUser);
            }
        }
    }

    saveGroupUser(gUser: GroupUser) {
        let group = this.saveTempGroupUserCache.get(gUser.groupID)
        if (group == null) {
            group = new Map<number, GroupUser>();
            this.saveTempGroupUserCache.set(gUser.groupID, group);
        }
        if (group.get(gUser.userID) == null) {
            this.im.getDB().queryGroupUser(gUser).then((user) => {
                let saveUser = group.get(gUser.userID);
                if (user) {
                    ObjectUtil.simpleMerge(user, saveUser);
                    this.im.getDB().saveGroupUser(user, false);
                } else {
                    this.im.getDB().saveGroupUser(saveUser, true);
                }
            });
        }
        group.set(gUser.userID, gUser);
    }

    async queryGroupUserHash(groupID: number) {
        if (this.groupUserHash.has(groupID)) {
            return this.groupUserHash.get(groupID);
        } else {
            let all = await this.im.getDB().queryAllGroupUserHash()
            for (let index = 0; index < all.length; index++) {
                const element = all[index];
                this.groupUserHash.set(element.groupID, element);
            }
            return this.groupUserHash.get(groupID);
        }
    }

    async listGroupUser(groupID: number): Promise<{ list: GroupUser[], hash: string }> {
        if (this.groupUserCache.get(groupID)) {
            return { list: this.getGroupUsers(groupID), hash: "" };
        } else {
            let groupHash = await this.queryGroupUserHash(groupID);
            if (groupHash) {
                const time = TimeUtil.getTime()
                let isNotExpire = time >= groupHash.createdAt && time <= groupHash.expireAt
                let userList = await this.im.getDB().queryAllGroupUser(groupID);
                this.groupUserCache.set(groupID, new Map<number, GroupUser>());
                let groupUserMap = this.groupUserCache.get(groupID)!;
                for (let index = 0; index < userList.length; index++) {
                    const element = userList[index];
                    groupUserMap.set(element.userID, element);
                }
                if (isNotExpire == false) {
                    let hash = this.genGroupUserHash(userList);
                    return { list: null, hash: hash };
                }
                return { list: this.getGroupUsers(groupID), hash: "" };
            }
            return { list: null, hash: "" };
        }
    }

    getGroupUsers(groupID: number) {
        let array = Array.from(this.groupUserCache.get(groupID)!.values());
        array.sort(function (a, b) {
            if (a.roleLevel != b.roleLevel) {
                return a.roleLevel < b.roleLevel ? -1 : 1;
            } else {
                return a.userID < b.userID ? -1 : 1;
            }
        })
        return array;
    }

    // 生成群成员hash
    genGroupUserHash(groupUserList: GroupUser[]) {
        let hashList: GroupUser[] = [];
        for (let index = 0; index < groupUserList.length; index++) {
            const element = groupUserList[index];
            hashList.push(element);
        }
        hashList.sort(function (a, b) {
            return a.userID < b.userID ? -1 : 1;
        });
        let hashStr: string[] = [];
        for (let [index, value] of hashList.entries()) {
            hashStr.push(value.userID.toString() + value.updatedAt.toString());
        }
        let hash = md5(hashStr.join(''));
        return hash;
    }

    syncGroupUserByServerMessage(message: Message, isSyncFinish: boolean) {
        if (message && message.type == MessageType.Sys) {
            let cmd = message.sysCMD
            let sysContent = message.sysContent

            if (needSyncGroupUser[cmd]) {
                let groupID = message.groupID
                let tempCache = this.syncTempCache.get(groupID)
                if (tempCache == null) {
                    tempCache = { isDirty: false, map: new Map<number, GroupUser>() }
                    this.syncTempCache.set(groupID, tempCache)
                }

                if (cmd == SysCMD.AddGroupUser) {
                    let content = sysContent as MessageSysAddGroupUser
                    let userIDList = content.userIDList
                    let updatedAt = content.updatedAt
                    for (let index = 0; index < userIDList.length; index++) {
                        const userID = userIDList[index];
                        let gUser = new GroupUser();
                        gUser.groupID = groupID;
                        gUser.userID = userID;
                        gUser.alias = "";
                        gUser.updatedAt = updatedAt;
                        gUser.roleLevel = GroupRole.GroupRoleMember;
                        gUser.muteExpireAt = 0;
                        gUser.deletedAt = 0;
                        gUser.createdAt = message.createdAt;

                        let userCache = tempCache.map.get(gUser.userID)
                        if (userCache != null) {
                            ObjectUtil.simpleMerge(userCache, gUser)
                        } else {
                            tempCache.map.set(gUser.userID, gUser);
                        }
                    }
                } else if (cmd == SysCMD.RemoveGroupUser) {
                    let content = sysContent as MessageSysRemoveGroupUser
                    let userIDList = content.userIDList
                    for (let index = 0; index < userIDList.length; index++) {
                        const userID = userIDList[index];
                        let gUser = new GroupUser();
                        gUser.groupID = groupID;
                        gUser.userID = userID;
                        gUser.deletedAt = TimeUtil.getTime();

                        let userCache = tempCache.map.get(gUser.userID)
                        if (userCache != null) {
                            ObjectUtil.simpleMerge(userCache, gUser)
                        } else {
                            tempCache.map.set(gUser.userID, gUser);
                        }
                    }
                } else if (cmd == SysCMD.GroupUserInfoChange) {
                    let content: MessageSysGroupUserInfoChange = sysContent
                    let updatedAt = content.updatedAt
                    for (let index = 0; index < content.changeInfo.length; index++) {
                        const changeInfo = content.changeInfo[index];
                        let gUser = new GroupUser();
                        gUser.groupID = groupID;
                        gUser.updatedAt = updatedAt;
                        for (let key in changeInfo) {
                            let value = changeInfo[key]
                            if (value != null && value != undefined) {
                                if ((typeof value === 'object')) {
                                    gUser[key] = value.value;
                                } else {
                                    gUser[key] = value;
                                }

                            }
                        }

                        let userCache = tempCache.map.get(gUser.userID)
                        if (userCache != null) {
                            ObjectUtil.simpleMerge(userCache, gUser)
                        } else {
                            tempCache.map.set(gUser.userID, gUser);
                        }
                    }
                }
            }
        }

        if (isSyncFinish == true) {
            this.syncTempCache.forEach((group, key) => {
                if (group.isDirty == false) {
                    // console.log("syncGroupUserByServerMessage2", key, group)
                    group.map.forEach((groupUser, groupID) => {
                        this.queryGroupUserHash(groupUser.groupID).then((ghash) => {
                            if (ghash) {
                                // 如果是自己被移除了，需要清除缓存与数据库数据，不然后续群聊内部信息变化，自己不在群聊里面。无法同步消息，此时只能删除自身所在的群聊，重新从服务器拉取
                                if (groupUser.userID == this.im.myUid && groupUser.deletedAt > 0) {
                                    this.removeSelfGroupInfo(groupUser)
                                } else {
                                    if (groupUser.deletedAt && groupUser.deletedAt > 0) {
                                        this.deleteGroupUser(groupUser)
                                    } else {
                                        this.updateGroupUser(groupUser)
                                    }

                                }
                            }

                        })
                    })
                }
            })
        }
    }
    removeSelfGroupInfo(groupUser: GroupUser) {
        this.groupUserHash.delete(groupUser.groupID)
        this.groupUserCache.delete(groupUser.groupID)
        this.im.getDB().deleteGroupUserHash(groupUser.groupID)
        // console.log("removeSelfGroupInfo", groupUser)
        eventSystem.emit(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, groupUser)
    }
    updateGroupUser(groupUser: GroupUser) {
        // console.log("updateGroupUser", groupUser)
        this.saveGroupUser(groupUser)
        let groupUserCacheMap = this.groupUserCache.get(groupUser.groupID)
        if (groupUserCacheMap) {
            let oldGroupUser = groupUserCacheMap.get(groupUser.userID)
            if (oldGroupUser) {
                ObjectUtil.simpleMerge(oldGroupUser, groupUser);
                groupUserCacheMap.set(groupUser.userID, oldGroupUser)
            } else {
                groupUserCacheMap.set(groupUser.userID, groupUser)
            }
        }
        eventSystem.emit(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, groupUser)

    }
    deleteGroupUser(groupUser: GroupUser) {
        this.im.getDB().deleteGroupUser(groupUser)
        if (this.groupUserCache.get(groupUser.groupID)) {
            this.groupUserCache.get(groupUser.groupID).delete(groupUser.userID)
        }
        eventSystem.emit(IMEvent.ON_NOTIFY_SYNC_GROUP_USER, groupUser)
    }

    // 需要注意 当一个用户被踢出时  再次请求该用户的信息可能为空
    getUserAlias(groupID: number, userID: number): string {
        let group = this.groupUserCache.get(groupID)
        if (group) {
            let groupUser = group.get(userID)
            return groupUser?.alias
        }
        return ""
    }

    setIsShowAlias(groupID: number, isShow: boolean) {
        let key = this.im.myUid + "_" + groupID
        storageMgr.set(key, isShow);
    }

    getIsShowAlias(groupID: number) {
        let key = this.im.myUid + "_" + groupID
        let str = storageMgr.get(key);
        if (str === "") {
            return true
        } else {
            if(str ==="true"){
                return true
            }else{
                return false
            }
        }
    }

}