import { resLoader, uiMgr } from 'bos/exports';
import { _decorator, Component,log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScriptTextEvent')
export class ScriptTextEvent extends Component {

   onServerClick (event: string, param: string) {
        uiMgr.loadPage("login@res/prefabs/PrivatePrefab", {params: param});
   }
   onPrivateClick (event: string, param: string) {
        uiMgr.loadPage("login@res/prefabs/PrivatePrefab", {params: param});
    }
}