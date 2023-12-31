import { js } from "cc";

/**
 * 时间工具
 * @see TimeUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/TimeUtil.ts
 */
export class TimeUtil {

    /**
     * 获取当前时间戳
     * @example
     * TimeUtil.getTimestamp(); // 1614616955186
     */
    public static getTimestamp(): number {
        return new Date().getTime();
    }

    /**
     * 获取当前时间戳,秒级别
     * @example
     * TimeUtil.getTimestamp(); // 1614616955186
     */
    public static getTime(): number {
        return Math.floor(new Date().getTime() / 1000);
    }

    /**
     * 获取当前日期（年/月/日）
     * @example
     * TimeUtil.getDate(); // "2021/3/2"
     */
    public static getDate(): string {
        return new Date().toLocaleDateString();
    }

    /**
     * 获取当天指定时间的时间戳
     * @param hour 时
     * @param minute 分
     * @param second 秒
     * @example
     * const time = TimeUtil.getTargetTimestamp(10, 20, 30); // 1601259630000
     * new Date(time).toLocaleString(); // "上午10:20:30"
     */
    public static getTargetTimestamp(hour: number = 0, minute: number = 0, second: number = 0): number {
        const start = new Date(new Date().toLocaleDateString()).getTime();
        const target = ((hour * 3600) + (minute * 60) + second) * 1000;
        return new Date(start + target).getTime();
    }

    /**
     * 将毫秒转为时分秒的格式（最小单位为秒，如："00:01:59"）
     * @param time 毫秒数
     * @param separator 分隔符
     * @param keepHours 当小时数为 0 时依然展示小时数
     * @example
     * TimeUtil.msToHMS(119000); // "00:01:59"
     */
    public static msToHMS(time: number, separator: string = ':', keepHours: boolean = true): string {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time - (hours * 3600000)) / 60000);
        const seconds = Math.floor((time - (hours * 3600000) - (minutes * 60000)) / 1000);
        const hoursString = (hours === 0 && !keepHours) ? '' : `${hours.toString().padStart(2, '0')}:`;
        return `${hoursString}${minutes.toString().padStart(2, '0')}${separator}${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * 把时间格式化为 2023-06-17 18:30:05 的格式
     * @param time Date 或者 毫秒时间戳
     */
    public static toyyyyMMddHHmmss(time: Date | number) {
        let date = typeof (time) == "number" ? new Date(time) : time
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()
        return js.formatStr(
            "%s-%s-%s %s:%s:%s",
            year.toString(),
            month >= 10 ? month.toString() : `0${month}`,
            day >= 10 ? day.toString() : `0${day}`,
            hour >= 10 ? hour.toString() : `0${hour}`,
            min >= 10 ? min.toString() : `0${min}`,
            sec >= 10 ? sec.toString() : `0${sec}`
        )
    }

}
