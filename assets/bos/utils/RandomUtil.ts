
class RandomUtil {

    private seed: number = 100

    private ID: number = 100000

    constructor() {
        this.seed = +new Date().toString();
    }


    allocID() {
        this.ID += 1
        return this.ID
    }

    allocSeed() {
        this.seed += 1
        return this.seed
    }

    initSeed(seed: number) {
        this.seed = seed
    }

    random() {
        return Math.random()
    }

    /**
    * 获取一个 min 到 max 范围内的随机整数
    * @param min 最小值
    * @param max 最大值
    */
    public getRandomInt(min: number = 0, max: number = 1): number {
        return Math.floor(this.random() * (max - min) + min);
    }

}
;

export default new RandomUtil();

