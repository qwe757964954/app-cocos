/**
* @author ZaloneZeng
*/

import { resLoader } from "bos/exports";
import { UIMgr } from "bos/framework/gui/UIMgr";
import { BlockInputEvents, Color, Component, Node, UITransform, view } from "cc";
import { resources, SpriteFrame, isValid } from "cc";
import { Sprite } from "cc";

class Utils {
    //封装一个取消promise的函数，使用promise.race的特性
    public static stopPromise(stopP: Promise<void>) {
        let proObj = { resolve: Function = null, abort: Function = null, promise: Promise = null };
        let promise = new Promise((resolve, reject) => {
            proObj.abort = reject;
        });
        proObj.promise = Promise.race([stopP, promise]);
        proObj.promise.then(() => { });
        proObj.abort();
        stopP = null;
    }

    /**
     * 从resources目录动态加载一个SpriteFrame，并赋值给Sprite
     * @param sprite Sprite对象
     * @param path 图片路径
    */
    static loadSpriteFromResources(sprite: Sprite, path: string, callback?) {
        if (path[path.length - 1] != "/") {
            path += "/";
        }
        path += "spriteFrame";
        resources.load(path, SpriteFrame, (err, spriteFrame) => {
            if (!sprite || !isValid(sprite.node) || err) {
                if (err) {
                    console.error("loadSpriteFromResources err", path, err);
                }
                return;
            }
            sprite.spriteFrame = spriteFrame;

            if (callback) {
                callback();
            }
        });
    }

    /**
     * 从Bundle动态加载一个SpriteFrame，并赋值给Sprite
     * @param sprite Sprite对象
     * @param path 图片路径 "xxx@xxx/xxx"
    */
    static loadSpriteFromBundle(sprite: Sprite, path: string, callback?) {
        resLoader.loadSpriteFrame(path, (err, spriteFrame) => {
            if (!sprite || !isValid(sprite.node) || err) {
                if (err) {
                    console.error("loadSpriteFromBundle err", path, err);
                }
                return;
            }
            sprite.spriteFrame = spriteFrame;

            if (callback) {
                callback();
            }
        });
    }

    static formatWithUnit(num: number, unit: string): string {
        num = num ?? 0;

        let s = num.toString();
        let size = s.length;

        for (let i = 0; i < s.length; i++) {
            if (i >= size) {
                break;
            } else if (s.charAt(i) === '.') {
                size = 5;
            }
        }

        s = s.substring(0, size);

        const dotIdx = s.indexOf('.');
        if (dotIdx !== -1) {
            while (s.charAt(s.length - 1) === '0') {
                s = s.substring(0, s.length - 1);
            }
            if (s.charAt(s.length - 1) === '.') {
                s = s.substring(0, s.length - 1);
            }
            while (s.length - dotIdx >= 4) {
                s = s.substring(0, s.length - 1);
            }
        }

        return `${s}${unit}`;
    }

    /**
     * 格式化数量显示游戏中的前端所有数值展示规则(ID之类的数字不包括在内),
     * 低于10000，显示实际数值；≥1万采用小数形式计数，最多2位小数，整数部分最多4位，小数+整数最多4位
     * 例如：25000，则显示为2.5万，255000显示为25.5万；2555555显示为255.5万；56789199显示为5678万；682556789显示为6.82亿。
    */
    static formatNumWithUnit(num: number): string {
        num = num ?? 0;

        if (num < 0) {
            return `-${Utils.formatNumWithUnit(Math.abs(num))}`;
        }

        if (num < 10000) {
            return num.toString();
        }

        if (num < Math.pow(10, 8)) {
            num /= 10000;
            return Utils.formatWithUnit(num, '万');
        }

        num /= Math.pow(10, 8);
        return Utils.formatWithUnit(num, '亿');
    }

    /**
     * 格式化数量显示, 例如：25000，则显示为x2.5万
    */
    static formatNumWithX(num: number) {
        let str = Utils.formatNumWithUnit(num);
        return `x${str}`;
    }

    /**
     * 格式化数量显示, 例如：25000，则显示为+2.5万
    */
    static formatNumWithA(num: number) {
        let str = Utils.formatNumWithUnit(num);
        return `+${str}`;
    }

    /**
     * 将一个一维数组转换为二维数组
     * @list 泛型一维数组
     * @num 二维数组中每一行的数量
    */
    static makeCellData<T>(list: T[], num: number): T[][] {
        if (!list || !num) {
            return [];
        }
        const result: T[][] = [];
        for (let i = 0; i < list.length; i += num) {
            const tmp_data = [list[i]];
            for (let j = 1; j < num; j++) {
                if (list[i + j]) {
                    tmp_data.push(list[i + j]);
                }
            }
            result.push(tmp_data);
        }
        return result;
    }

    /**
     * 一个按钮重复点击装饰器
     * @delay 点击间隔
    */
    static debounce(delay: number = 500) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;
            let timerId: ReturnType<typeof setTimeout> | null = null;
            descriptor.value = function (...args: any[]) {
                if (timerId == null) {
                    originalMethod.apply(this, args);
                    timerId = setTimeout(() => {
                        timerId = null;
                    }, delay);
                }
            };
            return descriptor;
        };
    }

    /**
     * 一个节流装饰器(一段时间内，方法只会被调用一次)
     * @delay 间隔
    */
    static throttle(delay: number = 500) {
        let timerId: ReturnType<typeof setTimeout> | null = null;

        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
                if (!timerId) {
                    timerId = setTimeout(() => {
                        timerId = null;
                        if ((this instanceof Component && !isValid(this.node))) {
                            return
                        }
                        originalMethod.apply(this, args);
                    }, delay);
                }
            };
            return descriptor;
        };
    }

    /**
     *给弹窗添加一个背景层
     * @hexString 背景颜色
     * @example
     * Utils.background()
     * onLoad()
    */
    static background(hexString : string = "#000000B2"){
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = function (...args: any[]) {
                if (!this.node) {
                    return
                }
                let node = new Node()
                let sp = node.addComponent(Sprite)
                sp.color = new Color(hexString)
                sp.sizeMode = 0
                Utils.loadSpriteFromResources(sp, "common/button/default_sprite_splash")

                node.getComponent(UITransform).setContentSize(view.getVisibleSize())
                
                node.addComponent(BlockInputEvents)

                this.node.addChild(node)
                node.setSiblingIndex(0)

                originalMethod.apply(this, args);
            };
            return descriptor;
        };
    }


    /**
     * 将小于10的num转换为两位的字符串 例如：5 -> "05"
     * @num 要转换的数字
    */
    static twoDigit(num: number): string {
        if (num < 10) {
            return "0" + num.toString();
        } else {
            return num.toString();
        }
    }

    /**
     * 返回total范围内的大小为count的内容
    */
    static getRoundIndex(centerIndex: number, total: number, need: number, minPre: number, minNext: number) {
        let startIndex: number, endIndex: number;
        //最多显示5个
        if (total <= need) {
            startIndex = 0;
            endIndex = total - 1;
        } else {
            let preCount = 0;
            let pre = centerIndex - 1;
            while (pre >= 0) {
                preCount += 1;
                pre = centerIndex - preCount - 1;
            }

            let nextCount = 0;
            let next = centerIndex + 1;
            while (next < total) {
                nextCount += 1;
                next = centerIndex + nextCount + 1;
            }

            if (preCount >= minPre && nextCount >= minNext) {
                startIndex = centerIndex - minPre;
                endIndex = centerIndex + minNext;
            } else if (preCount < minPre) {
                let needNext = minPre - preCount;
                startIndex = centerIndex - preCount;
                endIndex = centerIndex + minNext + needNext;
            } else if (nextCount < minNext) {
                let needPre = minNext - nextCount;
                startIndex = centerIndex - minPre - needPre;
                endIndex = centerIndex + nextCount;
            }
        }
        return { startIndex: startIndex, endIndex: endIndex };
    }

    /*
    * 递归搜索节点
    */
    static visit(node: Node, call: Function) {
        if (call(node)) {
            return node;
        }
        // 遍历子节点
        for (var i = 0; i < node.children.length; ++i) {
            var childNode = node.children[i];
            Utils.visit(childNode, call);
        }
    }
    /*
     * 根据节点名称获取Node节点内部子节点（包括自身）
     */
    static getNodeByName(node: Node, name: string): Node {
        let pageView: Node;
        Utils.visit(node, (item: Node) => {
            if (item.name == name) {
                pageView = item;
                return true;
            }
        });
        return pageView;
    }
}




export { Utils };

