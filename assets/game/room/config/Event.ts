
import {Events} from 'app/domain/config/Events';


export class Event extends Events {
    private static instance: Event = null;
    public static Instance(): Event {
        if (this.instance == null) {
            this.instance = new Event();
        }

        return this.instance;
    }

    // const Event = BaseEvent;

    // keys = {
    //     EXITROOM       = Event.get_unique_id(), ---退出房间
    //     OPENCHAT       = Event.get_unique_id(), ---打开聊天面板
    //     SHOWPLAYERINFO = Event.get_unique_id(), ---显示玩家信息
    //     SHOWUSERBUFFER = Event.get_unique_id(), ---显示使用buff界面
    //     SHOWROTATEVIEW = Event.get_unique_id(), ---显示旋转屏幕界面
    //     SHOWMATCHOPERATE       = Event.get_unique_id(), ---显示退出比赛界面
    //     REFRESHCARDCOUNTERBUFF = Event.get_unique_id(), ---刷新记牌器
    //     SHOWSETTING    = Event.get_unique_id(), ---显示设置
    //     SHOWMENU       = Event.get_unique_id(), ---显示菜单
    //     ADAPTERSCREEN  = Event.get_unique_id(), ---刘海屏适配后，一些需要全屏界面调整为全屏
    //     SHOWPIAOFEN    = Event.get_unique_id(), ---刘海屏适配后，一些需要全屏界面调整为全屏
    //     CALLSERVICE    = Event.get_unique_id(), ---前端发包统一事件
    //     PUSHTASK       = Event.get_unique_id(), ---向队列尾部添加事件
    //     UNSHIFTTASK    = Event.get_unique_id(), ---向队列头部添加事件
    //     TEMPCHAT       = Event.get_unique_id(), ---聊天信息
    //     CLEARTABLE     = Event.get_unique_id(), ---清除桌子界面以及数据
    //     SHOWCHANGEBG   = Event.get_unique_id(), ---显示背景切换
    //     REFRESHBG      = Event.get_unique_id(), ---刷新背景
    //     CLICKPROPS     = Event.get_unique_id(), ---点击互动道具
    //     GAMEOVER       = Event.get_unique_id(), ---游戏结束了
    //     SHOWBUFFOPERATE   = Event.get_unique_id(), ---显示使用buff提示界面
    //     SHOWTOOLTIPSBYKEY = Event.get_unique_id(),  -- 根据key显示toolTips
    //     ROTATESTART = Event.get_unique_id(),   --旋转开始
    //     ROTATTING = Event.get_unique_id(), --旋转中
    //     ROTATEEND = Event.get_unique_id(), --旋转结束
    //     RESETVIEW = Event.get_unique_id(),--所有模块重置
    //     KEEPWINREWARD = Event.get_unique_id(),--连胜奖励
    //     OBSERVE_ACTION_END = Event.get_unique_id(),--围观消息执行结束
    // }



}