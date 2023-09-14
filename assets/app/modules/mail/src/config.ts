import { IAssetItem } from "idl/tss/common/common_define";
import { IMailBriefData } from "idl/tss/hall/mail.v2";
/*
 * 获取当前时间
 */
function time() {
    let date = new Date();
    return Math.floor(date.getTime() / 1000);
}

function getItem(id: number, amount: number) {
    let data: IAssetItem = {};
    data.id = id;
    data.amount = 2;
    data.img = "";
    data.icon = "";
    data.desc = "";
    data.expire = null;
    data.name = "";
    data.type = 1;
    data.meta = {};
    return data;
}

function getData(mid: string, title: string, createdAt: number, content: string, isRead: boolean = false) {
    let data: IMailBriefData = {};
    data.mid = mid || "";
    data.origin = "";
    data.title = title || "";
    data.isRead = isRead;
    data.expiredAt = 0;
    data.isExistAward = true;
    data.isAccept = false;
    data.createdAt = createdAt || 0;
    data.content = content || "";
    data.URL = "";
    data.isShowContent = false;
    data.btnContent = "";
    data.senderUid = 0;
    data.isNew = false;
    data.subType = 0;
    data.assetItem = null;
    data.assetItems = [
        getItem(1, 1),
        getItem(2, 2),
        getItem(3, 3),
        getItem(4, 4),
        getItem(5, 5),
        getItem(6, 6),
        getItem(7, 7),
        getItem(8, 8),
    ];
    return data;
}
let str: string = `亲爱的玩家0000005121：
您于2023年4月27日 14：45参与的5千奖券新
乡麻将赛已经结束，您获得了11名的好成绩，
现将赛事奖励补发给你！请查收奖励，红包券*
5000，您于2023年4月27日 14：45参与的5千
奖券新乡麻将赛已经结束，您获得了11名的好
成绩，现将赛事奖励补发给你！请查收奖励，
红包券*5000
您于2023年4月27日 14：45参与的5千奖券新
乡亲爱的玩家0000005121：
您于2023年4月27日 14：45参与的5千奖券新
乡麻将赛已经结束，您获得了11名的好成绩，
现将赛事奖励补发给你！请查收奖励，红包券*
5000，您于2023年4月27日 14：45参与的5千
奖券新乡麻将赛已经结束，您获得了11名的好
成绩，现将赛事奖励补发给你！请查收奖励，
红包券*5000
您于2023年4月27日 14：45参与的5千奖券新
成绩，现将赛事奖励补发给你！请查收奖励，


`;
let str2: string = "[{<color=#00ff00>Rich</color><color=#0fffff>Text</color>}]";
const testList: IMailBriefData[] = [
    getData("1", "1", time(), str),
    getData("2", "2", time(), "内容2"),
    getData("3", "3", time(), "内容3", true),
    getData("4", "4", time(), str),
    getData("5", "5", time(), str2),
    getData("6", "6", time(), str),
    getData("7", "7", time(), str2),
    getData("8", "8", time(), str),
    getData("9", "9", time(), str2),
];

export { testList };
