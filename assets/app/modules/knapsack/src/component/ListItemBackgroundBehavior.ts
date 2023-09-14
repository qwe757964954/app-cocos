
import { _decorator, Color, Component, Graphics, math, Node, NodeEventType, ScrollView, Vec2, view } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;
import { Point, VgData, LineSegment, Circle, RenderData, PrimalVgData } from '../config/config';
import util from '../util';
import { Vec3 } from 'cc';
import { UITransform } from 'cc';
import { TableView } from 'bos/exports';

@ccclass('ListItemBackgroundBehavior')
export class ListItemBackgroundBehavior extends Component {
    private iWidth: number = 100; // 格子的高度
    private iHeight: number = 100; // 格子的高度
    private radius: number = 10; // 圆角半径
    private iCountMax: number = 3; // 每行最大个数
    private offset = [0, 0]; // 偏移值
    private width: number = 1080; // 舞台宽度
    private height: number = 800; // 舞台高度
    private startX: number = 0; // 上次位置数值x
    private startY: number = 0; // 上次位置数值y
    private renderList: VgData[] = []; // 用于vg渲染的数据
    private fillColor: Color;
    /**
     * 圆角片段
    */
    private segments: number = 20;

    private mData: RenderData[];

    private tableView: TableView;

    private offsetY: number = 0;

    private content: Node;
    private contentPosition: Vec3 = new Vec3(0, 0, 0);
    constructor() {
        super();
    }

    protected onLoad(): void {
        this.tableView = this.node.parent.parent.getComponent(TableView);
        let content: Node = this.node.parent.getChildByName("content");
        content.on(NodeEventType.SIZE_CHANGED, () => {
            let size = content.getComponent(UITransform).contentSize.clone();
            this.width = size.x;
            this.height = size.y;
            this.node.getComponent(UITransform).contentSize = size;
        }, this);

        content.on(Node.EventType.TRANSFORM_CHANGED, (type: number) => {
            // 节点的位置已更改
            if (type & Node.TransformBit.POSITION) {
                this.contentPosition.y = content.getPosition().y;
                this.updateNodePosition(this.contentPosition);
            }
        });
        this.content = content;
    }

    updateNodePosition(position: Vec3) {
        position.y = position.y - this.offsetY;
        this.node.setPosition(position);
    }

    setOffsetY(value: number = 0) {
        this.offsetY = value;
    }

    update() {
    }

    init(config: any) {
        this.iWidth = config.iWidth;
        this.iHeight = config.iHeight;
        this.radius = config.radius;
        this.iCountMax = config.iCountMax;
        this.fillColor = config.fillColor;
        this.offset = config.offset || [0, 0];
    }

    start() {
        // let data = [{
        //     startIndex: 2, endIndex: 11
        // }];
    }

    private updateView(data: RenderData[]) {
        const graphics = this.node.getComponent(Graphics);
        let cmdHeader: PrimalVgData[] = [];
        if (graphics) {
            if (data.length == 0) {
                graphics.clear();
            } else {
                for (let i = 0; i < data.length; i++) {
                    let rangeInfo = data[i];
                    if (rangeInfo.startIndex && rangeInfo.endIndex) {
                        let sCol: number = rangeInfo.startIndex - Math.floor((rangeInfo.startIndex - 1) / this.iCountMax) * this.iCountMax;
                        let sRow: number = Math.floor((rangeInfo.startIndex - 1) / this.iCountMax) + 1;
                        let eCol: number = rangeInfo.endIndex - Math.floor((rangeInfo.endIndex - 1) / this.iCountMax) * this.iCountMax;
                        let eRow: number = Math.floor((rangeInfo.endIndex - 1) / this.iCountMax) + 1;
                        let minRow = Math.min(sRow, eRow);
                        let minCol = Math.min(sCol, eCol, this.iCountMax);
                        let oneLine: boolean = sRow == eRow ? true : false;
                        let finishMax: boolean = eCol == this.iCountMax ? true : false;
                        let start1: boolean = sCol === 1 ? true : false;

                        let maxNum: number = this.iCountMax;
                        if (oneLine) {
                            maxNum = eCol;
                        }


                        let n1: number = maxNum * this.iWidth;
                        let n2: number = this.iHeight * sRow;
                        let n3: number = this.iHeight * (sRow - 1);
                        let n4: number = (sCol - 1) * this.iWidth;
                        let n5: number = this.iHeight * eRow;
                        let n6: number = this.iHeight * eRow - this.radius;
                        let n7: number = this.iHeight * (eRow - 1);
                        let n8: number = this.iHeight;
                        let n9: number = eCol * this.iWidth;


                        let startPoint = {
                            x: (minCol - 1) * this.iWidth + this.radius,
                            y: (minRow - 1) * this.iHeight
                        };
                        let data: PrimalVgData = {
                            type: "MoveTo",
                            data: startPoint
                        };

                        cmdHeader[cmdHeader.length] = data;
                        data = {
                            type: "ArcTo",
                            data: {
                                x: n1,
                                y: n3,
                                x1: n1,
                                y1: n3 + this.radius
                            }
                        };
                        cmdHeader[cmdHeader.length] = data;
                        if (oneLine) {
                            data = {
                                type: "ArcTo",
                                data: {
                                    x: n1,
                                    y: n2,
                                    x1: n1 - this.radius,
                                    y1: n2
                                }
                            };
                            cmdHeader[cmdHeader.length] = data;
                            data = {
                                type: "ArcTo",
                                data: {
                                    x: n4,
                                    y: n2,
                                    x1: n4,
                                    y1: this.iHeight * sRow - this.radius
                                }
                            };
                            cmdHeader[cmdHeader.length] = data;
                            data = {
                                type: "ArcTo",
                                data: {
                                    x: n4,
                                    y: n3,
                                    x1: n4 + this.radius,
                                    y1: this.iHeight * (sRow - 1)
                                }
                            };
                            cmdHeader[cmdHeader.length] = data;
                        } else {
                            if (finishMax) {
                                data = {
                                    type: "ArcTo",
                                    data: {
                                        x: n1,
                                        y: n5,
                                        x1: n1 - this.radius,
                                        y1: n5
                                    }
                                };
                                cmdHeader[cmdHeader.length] = data;
                                data = {
                                    type: "ArcTo",
                                    data: {
                                        x: 0,
                                        y: n5,
                                        x1: 0,
                                        y1: n6
                                    }
                                };
                                cmdHeader[cmdHeader.length] = data;

                            } else {
                                data = {
                                    type: "ArcTo",
                                    data: {
                                        x: n1,
                                        y: n7,
                                        x1: n1 - this.radius,
                                        y1: n7
                                    }
                                };
                                cmdHeader[cmdHeader.length] = data;
                                data = {
                                    type: "ArcTo",
                                    data: {
                                        x: n9,
                                        y: n7,
                                        x1: n9,
                                        y1: this.iHeight * (eRow - 1) + this.radius
                                    }
                                };
                                cmdHeader[cmdHeader.length] = data;
                                data = {
                                    type: "ArcTo",
                                    data: {
                                        x: n9,
                                        y: n5,
                                        x1: n9 - this.radius,
                                        y1: n5
                                    }
                                };
                                cmdHeader[cmdHeader.length] = data;
                                data = {
                                    type: "ArcTo",
                                    data: {
                                        x: 0,
                                        y: n5,
                                        x1: 0,
                                        y1: n6
                                    }
                                };
                                cmdHeader[cmdHeader.length] = data;
                            }
                        }
                        if (start1) {
                            data = {
                                type: "ArcTo",
                                data: {
                                    x: 0,
                                    y: (sRow - 1) * n8,
                                    x1: this.radius,
                                    y1: (sRow - 1) * n8
                                }
                            };
                            cmdHeader[cmdHeader.length] = data;
                        } else {
                            data = {
                                type: "ArcTo",
                                data: {
                                    x: 0,
                                    y: sRow * n8,
                                    x1: this.radius,
                                    y1: sRow * n8
                                }
                            };
                            cmdHeader[cmdHeader.length] = data;
                            data = {
                                type: "ArcTo",
                                data: {
                                    x: n4,
                                    y: sRow * n8,
                                    x1: n4,
                                    y1: sRow * this.iHeight - this.radius
                                }
                            };
                            cmdHeader[cmdHeader.length] = data;
                            data = {
                                type: "ArcTo",
                                data: {
                                    x: n4,
                                    y: (sRow - 1) * n8,
                                    x1: n4 + this.radius,
                                    y1: (sRow - 1) * n8
                                }
                            };
                            cmdHeader[cmdHeader.length] = data;
                        }
                    }
                }
                if (cmdHeader.length > 0) {
                    this.renderVg(graphics, cmdHeader);
                }
            }

        }
    }

    setRange(data: RenderData[]) {
        this.mData = data;
        this.updateView(data);
    }
    /**
     * 生成在cocos内使用的render数据
    */
    genRenderData(cmdHeader: PrimalVgData[]) {
        let data: PrimalVgData;
        for (var i = 0; i < cmdHeader.length; i++) {
            data = cmdHeader[i];
            switch (data.type) {
                case "MoveTo":
                    this.parserMoveTo(data);
                    break;
                case "ArcTo":
                    this.parserArcTo(data);
                    break;
            }
        }
    }

    /**
     * 渲染
    */
    renderVg(graphics: Graphics, cmdHeader: any[]) {
        this.renderList = [];
        this.genRenderData(cmdHeader);
        this.render_(graphics);
    }
    /**
     * 根据数据渲染
    */
    render_(graphics: Graphics) {
        graphics.fillColor = this.fillColor;
        graphics.clear();
        let item: VgData;
        for (var i = 0; i < this.renderList.length; i++) {
            item = this.renderList[i];
            let data = item.data;
            switch (item.type) {
                case "moveTo":
                    graphics.moveTo(data.x, data.y);
                    break;
                case "lineTo":
                    graphics.lineTo(data.x, data.y);
                    break;
            }
        }
        graphics.close();
        graphics.fill();
    }
    /**
     * 坐标系转换X轴 左上角坐标系->右上角坐标系（cocos）
    */
    changeCoordinateXValue(value: number) {
        return value;
    }
    /**
     * 坐标系转换Y轴 左上角坐标系->右上角坐标系（cocos）
    */
    changeCoordinateYValue(value: number) {
        return - value;
    }
    /**
     * 解析MoveTo数据
    */
    parserMoveTo(list: PrimalVgData) {
        let x: number = list.data.x;
        let y: number = list.data.y;
        x = this.changeCoordinateXValue(x);
        y = this.changeCoordinateYValue(y);
        let po = { x: x, y: y };
        po = this.addStageOffset(po);
        this.renderList.push({ type: "moveTo", data: po });
        this.startX = x;
        this.startY = y;
    }
    /**
     * 解析绘制圆角数据，此处绘制圆角实现原理：使用圆角分段的方式使用lineTo接口实现
    */
    parserArcTo(list: PrimalVgData) {
        let px1: number = list.data.x;
        let py1: number = list.data.y;
        let px2: number = list.data.x1;
        let py2: number = list.data.y1;
        px1 = this.changeCoordinateXValue(px1);
        py1 = this.changeCoordinateYValue(py1);
        px2 = this.changeCoordinateXValue(px2);
        py2 = this.changeCoordinateYValue(py2);
        let line: LineSegment = {
            start: {
                x: this.startX,
                y: this.startY
            },
            end: {
                x: px1, y: py1
            }
        };

        let cle: Circle = {
            center: {
                x: px1, y: py1
            },
            radius: this.radius
        };
        // 返回线段上的交点
        let ret = util.getLineCircleIntersections(line, cle);
        if (ret.length != 1) {
            return;
        }
        let p1: Point = ret[0];
        let p2: Point = { x: px1, y: py1 };
        let p3: Point = { x: px2, y: py2 };
        // 圆心点 通过三个顶点获取第四个顶点
        let p0 = util.calcFourthPoint(p1, p2, p3);
        // 计算点在圆上的弧度值
        let startAngle: number = util.calculateDegreeAndRadianOnCircle(p0, this.radius, p1);
        let endAngle: number = util.calculateDegreeAndRadianOnCircle(p0, this.radius, p3);
        if (startAngle == endAngle) {
            return;
        }
        let array: number[];
        let angle = this.amendAngleValue(startAngle, endAngle);
        array = util.calculateIntervals(angle.startAngle, angle.endAngle, this.segments);
        array.forEach((value) => {
            let po = util.calculatePointOnCircle(p0, this.radius, value);
            po = this.addStageOffset(po);
            this.renderList.push({ type: "lineTo", data: po });
        });
        this.startX = px1;
        this.startY = py1;
    }

    /**
     * 添加舞台偏移值
    */
    addStageOffset(po: Point) {
        po.x = po.x - this.width / 2 + this.offset[0];
        po.y = po.y - this.offset[1];
        return po;
    }
    /**
     * 修正角度数据值
    */
    amendAngleValue(startAngle: number, endAngle: number) {
        if (Math.abs(startAngle - endAngle) > 90) {
            if (startAngle == 0) {
                startAngle = 360;
            } else if (endAngle == 0) {
                endAngle = 360;
            }
        }
        return { startAngle: startAngle, endAngle: endAngle };
    }
}