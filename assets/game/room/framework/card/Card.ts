
const byteMap = {
    [0x01]: "方块A",[0x02]: "方块2",[0x03]: "方块3",[0x04]: "方块4",[0x05]: "方块5",[0x06]: "方块6",[0x07]: "方块7",
    [0x08]: "方块8",[0x09]: "方块9",[0x0a]: "方块10",[0x0b]: "方块J",[0x0c]: "方块Q",[0x0d]: "方块K",

    [0x11]: "梅花A",[0x12]: "梅花2",[0x13]: "梅花3",[0x14]: "梅花4",[0x15]: "梅花5",[0x16]: "梅花6",[0x17]: "梅花7",
    [0x18]: "梅花8",[0x19]: "梅花9",[0x1a]: "梅花10",[0x1b]: "梅花J",[0x1c]: "梅花Q",[0x1d]: "梅花K",

    [0x21]: "红桃A",[0x22]: "红桃2",[0x23]: "红桃3",[0x24]: "红桃4",[0x25]: "红桃5",[0x26]: "红桃6",[0x27]: "红桃7",
    [0x28]: "红桃8",[0x29]: "红桃9",[0x2a]: "红桃10",[0x2b]: "红桃J",[0x2c]: "红桃Q",[0x2d]: "红桃K",

    [0x31]: "黑桃A",[0x32]: "黑桃2",[0x33]: "黑桃3",[0x34]: "黑桃4",[0x35]: "黑桃5",[0x36]: "黑桃6",[0x37]: "黑桃7",
    [0x38]: "黑桃8",[0x39]: "黑桃9",[0x3a]: "黑桃10",[0x3b]: "黑桃J",[0x3c]: "黑桃Q",[0x3d]: "黑桃K",

    [0x4e]: "小王",[0x4f]: "大王",
}

const str2val = {
    ["3"]: 3,
    ["4"]: 4,
    ["5"]: 5,
    ["6"]: 6,
    ["7"]: 7,
    ["8"]: 8,
    ["9"]: 9,
    ["10"]: 10,
    ["J"]: 11,
    ["Q"]: 12,
    ["K"]: 13,
    ["A"]: 14,
    ["2"]: 15,
    ["小王"]: 16,
    ["大王"]: 17,
}

const val2str = {
    [3]: "3",
    [4]: "4",
    [5]: "5",
    [6]: "6",
    [7]: "7",
    [8]: "8",
    [9]: "9",
    [10]: "10",
    [11]: "J",
    [12]: "Q",
    [13]: "K",
    [14]: "A",
    [15]: "2",
    [16]: "小王",
    [17]: "大王",
}

const color2str = {
    [0]: "方块",
    [1]: "梅花",
    [2]: "红桃",
    [3]: "黑桃",
}

const cardColors = {
    DIAMOND: 0,
    CLUB: 1,
    HEART: 2,
    SPADE: 3,
}

const cardValues = {
    RJ: 17,
    BJ: 16,
    A: 14,
    TWO: 15,
    MIN: 3,
    MAX: 17
}

const cardBytes= {
    RJ: 0x4f,
    BJ: 0x4e,
}

export const CardConst = {
    STR2VAL: str2val,
    VALUES: cardValues,
    BYTES: cardBytes,
    COLORS: cardColors,
}


export class Card {
    public byte: number = 0;
    public value: number = 0;
    public color: number = 0;

    constructor(byte: number) {
        // let t: ByteCfg = new ByteCfg();
        this.byte = byte;
        this.value = byte & 0xf;
        if (this.value <= 2) {
            this.value = this.value + 13;
        } else if (this.value > 13) {
            this.value = this.value + 2;
        }
        this.color = (this.byte >> 4) & 0xf;
    }

    setLaizi(target: Card) {
        let newByte = (this.byte << 8) | target.byte
        return new Card(newByte)
    }

    isLaizi(): boolean {
        return this.byte > 0xff
    }
    
    origin(): Card {
        return new Card(this.byte >> 8)
    }

    toString() {
        if (this.isLaizi()) {
            let c1 = this.byte >> 8
            let c2 = this.byte & 0xff 
            return `${byteMap[c1]}(${byteMap[c2]})`
        } else {
            return `${byteMap[this.byte]}`
        }
    }
}

