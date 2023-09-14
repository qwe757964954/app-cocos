import { UIParams } from "bos/framework/gui/UIMgr";

export type NavItem = {
    scene?: string;
    page?: string;
    params?: UIParams;
};

export class NavConfig {
    LOGIN = { scene: "login@Login" };
    HOME = {
        scene: "homepage@Home",
        params: {
            launch: {
                page: "homepage@res/prefab/Homepage",
                params: {
                    isRoot: true,
                },
            },
        },
    };
    VIP_MALL = { page: "mall@res/prefab/VipMall" };
    GAME_LIST = { page: "gamepage@res/prefab/GameList" };
    PRIZE_CENTER = { page: "prizeCenter@res/prefab/list/PrizeListMain" };
    MATCH_LIST = { page: "match@matchList/res/prefab/MatchListView" };
    SETTING = { page: "setting@res/prefab/Setting" };
    KNAPSACK = { page: "knapsack@res/prefab/Knapsack" };
    REAL_NAME = { page: "login@res/prefabs/AuthenticationPrefab" };
    MAIL = { page: "mail@res/prefab/Mail" };
    CHATROOM = {page: "match@officialMatch/res/prefab/ChatRoom", preload: []}
    CHAT = {page: "social@chat/res/prefab/ChatView", preload: ["session","chat","feed","common"]}
    // CHAT = {page: "social@chat/res/prefab/ChatView", preload: []}
    HOME_PAGE = {page: "homepage@res/prefab/Homepage", preload: ["res"]}
};