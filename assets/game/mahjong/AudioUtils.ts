import { Log, resLoader } from "bos/exports";
import { Meta } from "game/mahjong/config/AudioConfig";

export class AudioUtils {

    static getAudioPath(audioName: string, sex: number = 1): string {
        let pathStr = "mahjong@res/audio/effect/";
        if (audioName.startsWith("?")) {
            if (sex != 1 && sex !=2) {
                Log.d("==性别不对==", sex);
                sex = 1;
            }
            audioName = Meta[audioName.replace("?", `_${sex}_`)];
        }
        pathStr = pathStr.concat(audioName);
        Log.d("==getAudioPath==", audioName, pathStr);
        return pathStr;
    }

}