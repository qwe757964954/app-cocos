import { GameMgr } from "app/domain/game/GameMgr";
import { MatchMgr } from "app/domain/match/MatchMgr";
import UserMgr from "app/domain/user/UserMgr";
import { PrivilegeMgr } from "app/domain/privilege/PrivilegeMgr";
import { PremiumMgr } from "app/domain/premium/PremiumMgr";
import { Log, Net } from "bos/exports";
import { WalletMgr } from "app/domain/wallet/WalletMgr";
import { ConfigMgr } from "app/domain/config/ConfigMgr";
import { SessionMgr } from "./domain/session/SessionMgr";
import { MallMgr } from "./domain/mall/MallMgr";
import { NavMgr } from "./domain/nav/NavMgr";
import { NavConfig } from "./domain/nav/NavConfig";
import { MateMgr } from "./domain/mate/MateMgr";
import { RpcService } from "bos/framework/network/rpc/RpcService";
import { AccountMgr } from "./domain/account/AccountMgr";
import { NetMgr } from "bos/framework/network/rpc/NetMgr";
import { keys } from "app/config/keys"
import { ApMgr } from "./domain/net/ApMgr";

export class App {
    private static _userMgr: UserMgr;
    private static _gameMgr: GameMgr;
    private static _matchMgr: MatchMgr
    private static _privilegeMgr: PrivilegeMgr
    private static _walletMgr: WalletMgr
    private static _premiumMgr: PremiumMgr
    private static _configMgr: ConfigMgr
    private static _sessionMgr: SessionMgr
    private static _mallMgr: MallMgr
    private static _navMgr: NavMgr
    private static _mateMgr: MateMgr
    private static _accountMgr: AccountMgr

    public static apMgr = new ApMgr()
    public static keys = keys

    public static get userMgr() { if (App._userMgr == null) { App._userMgr = new UserMgr() } return App._userMgr }
    public static get matchMgr() { if (App._matchMgr == null) { App._matchMgr = new MatchMgr() } return App._matchMgr }
    public static get privilegeMgr() { if (App._privilegeMgr == null) { App._privilegeMgr = new PrivilegeMgr() } return App._privilegeMgr }
    public static get gameMgr() { if (App._gameMgr == null) { App._gameMgr = new GameMgr() } return App._gameMgr }
    public static get walletMgr() { if (App._walletMgr == null) { App._walletMgr = new WalletMgr() } return App._walletMgr }
    public static get premiumMgr() { if (App._premiumMgr == null) { App._premiumMgr = new PremiumMgr() } return App._premiumMgr }
    public static get configMgr() { if (App._configMgr == null) { App._configMgr = new ConfigMgr() } return App._configMgr }
    public static get config() { return App.configMgr.config }
    public static get sessionMgr() { if (App._sessionMgr == null) { App._sessionMgr = new SessionMgr() } return App._sessionMgr }
    public static get mallMgr() { if (App._mallMgr == null) { App._mallMgr = new MallMgr() } return App._mallMgr }
    public static get navMgr() { if (App._navMgr == null) { App._navMgr = new NavMgr() } return App._navMgr }
    public static get navCfg() { return App.navMgr.config }
    public static get mateMgr() { if (App._mateMgr == null) { App._mateMgr = new MateMgr() } return App._mateMgr }
    public static get accountMgr() { if (App._accountMgr == null) { App._accountMgr = new AccountMgr() } return App._accountMgr }

    static init() {
        Log.i("App.init")
        App.sessionMgr.init()
        App.matchMgr.init()
        App.mateMgr.init()
        App.gameMgr.init()
        App.navMgr.init()
    }

    static async setUid(uid) {
        Log.i("App.setUid", uid)
        App.userMgr.setUid(uid)
        App.configMgr.setUid(uid)
        App.sessionMgr.setUid(uid)
        App.mateMgr.setUid(uid)
        App.walletMgr.setUid(uid)
    }

    static async reset() {
        Log.i("App.reset")
        App.sessionMgr.reset()
        App.matchMgr.reset()
        App.mateMgr.reset()
        App.gameMgr.reset()
        Net.netMgr.reset()
    }
}
