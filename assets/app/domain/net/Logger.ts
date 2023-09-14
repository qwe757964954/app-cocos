import { Logger } from "bos/base/log/Logger";
import { netLog } from "electron";

class NetLogger extends Logger {

}

let netLogger = new NetLogger()
netLogger.setTag("type", "Net")

export default netLogger