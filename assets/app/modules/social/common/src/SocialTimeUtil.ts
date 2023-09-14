
export enum TimeType {
    FeedCell = 1,
}

export class SocialTimeUtil {
    static getFeedCreatedDesc(time: number): string {
        let desc = "刚刚";
        const diffTime = Math.floor(Date.now() / 1000) - time;

        const day = Math.floor(diffTime / 60 / 60 / 24);
        const hour = Math.floor(diffTime / 60 / 60) % 24;
        const min = Math.floor(diffTime / 60) % 60;

        if (day > 0) {
            desc = `${day}天前`;
        } else if (hour > 0) {
            desc = `${hour}小时前`;
        } else if (min > 0) {
            desc = `${min}分钟前`;
        }

        return desc;
    }

}