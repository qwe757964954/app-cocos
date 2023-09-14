import { AnimationClip, Animation } from 'cc';
import { Node } from 'cc';
import { Point, LineSegment, Circle } from './config/config';

/*
 * 递归搜索节点
 */
function visit(node: Node, call: Function) {
    if (call(node)) {
        return node;
    }
    // 遍历子节点
    for (var i = 0; i < node.children.length; ++i) {
        var childNode = node.children[i];
        visit(childNode, call);
    }
}
/*
 * 根据节点名称获取Node节点内部子节点（包括自身）
 */
function getNodeByName(node: Node, name: string): Node {
    let pageView: Node;
    visit(node, (item: Node) => {
        if (item.name == name) {
            pageView = item;
            return true;
        }
    });
    return pageView;
}
/*
 * 获取当前时间
 */
function time() {
    let date = new Date();
    return Math.floor(date.getTime() / 1000);
}
/*
 * 复制source数组内的数据到target数组内
 */
function copyTo(target: any[], source: any[]) {
    (source || []).forEach((v: any) => {
        target.push(v);
    });
}


function formatNumWithUnit(num: number) {
    num = num || 0;

    if (num < 0) {
        return `-${formatNumWithUnit(Math.abs(num))}`;
    }

    // Ten Thousand
    if (num < 10000) {
        return num.toString();
    }

    const formatWithUnit = (num: number, unit: string): string => {
        let s = num.toString();
        let size = s.length;

        for (let i = 0; i < s.length; i++) {
            if (i > size) {
                break;
            } else if (s.charAt(i) === ".") {
                size = 5;
            }
        }

        s = s.substring(0, size);

        const dotIdx = s.indexOf(".");
        if (dotIdx !== -1) {
            while (s.charAt(s.length - 1) === "0") {
                s = s.substring(0, s.length - 1);
            }
            if (s.charAt(s.length - 1) === ".") {
                s = s.substring(0, s.length - 1);
            }
            while (s.length - dotIdx >= 3) {
                s = s.substring(0, s.length - 1);
            }
        }

        return `${s}${unit}`;
    };

    if (num < 10 ** 8) {
        num /= 10000;
        return formatWithUnit(num, "万");
    }

    num /= 10 ** 8;
    return formatWithUnit(num, "亿");
}

function formatNumWithX(num: number) {
    let numStr: string = formatNumWithUnit(num);
    return "x" + numStr;
}

function formatTime(time: number) {
    const date = new Date(time);
    const formattedDate = `${date.getFullYear()}年${(date.getMonth() + 1).toString().padStart(2, '0')}月${date.getDate().toString().padStart(2, '0')}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
}

function playAnim(node: Node, acQuat: AnimationClip) {
    let animComQuat: Animation = node.getComponent(Animation) || node.addComponent(Animation);
    animComQuat.defaultClip = acQuat;
    animComQuat.play();
}

function stopAnim(node: Node) {
    let animComQuat: Animation = node.getComponent(Animation);
    if (animComQuat) {
        animComQuat.stop();
    }
}


/**
 * 计算顶点在多边形内不还是外部
*/
function pointInPolygon(point: Point, polygon: Array<Point>): boolean {
    let inside = false;
    const x = point.x, y = point.y;
    const n = polygon.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) {
            inside = !inside;
        }
    }
    return inside;
}
/**
 * 计算点与线段是否相交
*/
function isPointOnLineSegment(point: Point, segmentStart: Point, segmentEnd: Point): boolean {
    const crossProduct = (point.y - segmentStart.y) * (segmentEnd.x - segmentStart.x) -
        (point.x - segmentStart.x) * (segmentEnd.y - segmentStart.y);

    if (Math.abs(crossProduct) > Number.EPSILON) {
        return false;
    }

    const dotProduct = (point.x - segmentStart.x) * (segmentEnd.x - segmentStart.x) +
        (point.y - segmentStart.y) * (segmentEnd.y - segmentStart.y);

    if (dotProduct < 0) {
        return false;
    }

    const squaredLength = Math.pow(segmentEnd.x - segmentStart.x, 2) +
        Math.pow(segmentEnd.y - segmentStart.y, 2);

    if (dotProduct > squaredLength) {
        return false;
    }

    return true;
}
/**
 * 根据线段以及圆计算交点
*/
function getLineCircleIntersections(line: LineSegment, circle: Circle): Point[] {
    const intersections: Point[] = [];
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const a = dx * dx + dy * dy;
    const b = 2 * (dx * (line.start.x - circle.center.x) + dy * (line.start.y - circle.center.y));
    const c =
        circle.center.x * circle.center.x +
        circle.center.y * circle.center.y +
        line.start.x * line.start.x +
        line.start.y * line.start.y -
        2 * (circle.center.x * line.start.x + circle.center.y * line.start.y) -
        circle.radius * circle.radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return intersections;
    }

    if (discriminant === 0) {
        const t = -b / (2 * a);
        intersections.push({
            x: line.start.x + t * dx,
            y: line.start.y + t * dy,
        });
        return intersections;
    }

    const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    let p1: Point = {
        x: line.start.x + t1 * dx,
        y: line.start.y + t1 * dy,
    };
    if (isPointOnLineSegment(p1, line.start, line.end)) {
        intersections.push(p1);
    }
    let p2: Point = {
        x: line.start.x + t2 * dx,
        y: line.start.y + t2 * dy,
    };
    if (isPointOnLineSegment(p2, line.start, line.end)) {
        intersections.push(p2);
    }

    return intersections;
}

function calcFourthPoint(a: Point, b: Point, c: Point): Point {
    let d: Point = { x: 0, y: 0 };
    if ((a.x - b.x) * (a.x - c.x) + (a.y - b.y) * (a.y - c.y) == 0)	//向量法找互相垂直的两条边，a点为顶点时
    {
        d.x = b.x + c.x - a.x;	//性质2
        d.y = b.y + c.y - a.y;
        return d;
    }
    if ((b.x - a.x) * (b.x - c.x) + (b.y - a.y) * (b.y - c.y) == 0)	//b点为顶点时
    {
        d.x = a.x + c.x - b.x;
        d.y = a.y + c.y - b.y;
        return d;
    }
    if ((c.x - a.x) * (c.x - b.x) + (c.y - a.y) * (c.y - b.y) == 0)	//c点为顶点时
    {
        d.x = a.x + b.x - c.x;
        d.y = a.y + b.y - c.y;
        return d;
    }
    return d;
}

/**
 * 根据圆计算出点在圆上的弧度
*/
function calculateDegreeAndRadianOnCircle(p0: Point, radius: number, p1: Point): number {
    // 计算点到圆心的距离
    const distance = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));

    // 如果点不在圆上，则返回 null
    if (distance !== radius) {
        return 0;
    }

    // 计算点相对于圆心的角度
    const degree = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
    const radian = Math.atan2(p1.y - p0.y, p1.x - p0.x);

    // 将角度转换为正值
    const positiveDegree = degree < 0 ? degree + 360 : degree;
    return positiveDegree;
}
function calculatePointOnCircle(center: Point, radius: number, angleInRadians: number): Point {
    angleInRadians = angleInRadians / 180 * Math.PI;
    const x = center.x + radius * Math.cos(angleInRadians);
    const y = center.y + radius * Math.sin(angleInRadians);
    return { x: x, y: y };
}
function calculateIntervals(start: number, end: number, intervals: number): number[] {
    const step = (end - start) / intervals; // 计算每个分段的步长
    return Array.from({ length: intervals + 1 }, (_, i) => start + i * step); // 生成每个分点的数值
}
// 毫秒换算成具体时间
function millisecondsToDaysHoursSeconds(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;

    return {
        days: totalDays,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

export default {
    copyTo: copyTo,
    time: time,
    getNodeByName: getNodeByName,
    visit: visit,
    formatNumWithX: formatNumWithX,
    formatNumWithUnit: formatNumWithUnit,
    formatTime: formatTime,
    playAnim: playAnim,
    stopAnim: stopAnim,
    calculateIntervals: calculateIntervals,
    calculateDegreeAndRadianOnCircle: calculateDegreeAndRadianOnCircle,
    getLineCircleIntersections: getLineCircleIntersections,
    calcFourthPoint: calcFourthPoint,
    calculatePointOnCircle: calculatePointOnCircle,
    millisecondsToDaysHoursSeconds: millisecondsToDaysHoursSeconds
};
