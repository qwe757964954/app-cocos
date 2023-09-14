import { _decorator, Component, Node, Toggle, PageView, Label, UITransform, Widget } from 'cc';
const { ccclass, property } = _decorator;
import {
    FeatureConfig,
    PageData,
    selectedStyle,
    unSelectedStyle,
    LabelStyle
} from './../config/config';
import { PageComponent } from './PageComponent';
import { KnapsackOperate } from './operate/KnapsackOperate';
import { QueryTab } from 'idl/tss/hall/prop.v4';
import util from '../util';
/**
 * UI层面逻辑
*/
@ccclass('KnapsackCtr')
export class KnapsackCtr extends Component {
    private mData: PageData[] = [];
    private ignoreBoxEvent: boolean = false;
    onLoad() {

    }
    start() {
        this.initView();
    }

    initView() {
        this.updateScene({});
    }

    // 点击box切换pageView
    onClickTab(node: Node) {
        if (this.ignoreBoxEvent) {
            return;
        }
        let currentPageIdx: number = 0;
        let item: PageData = null;
        for (let i = 0; i < this.mData.length; i++) {
            item = this.mData[i];
            if (item.box.getComponent(Toggle).uuid == node.uuid) {
                currentPageIdx = i;
                this.selectedItem(item, true);
            } else {
                this.selectedItem(item, false);
            }
        }
        // 设置分页
        this.setCurrentPageIndex(currentPageIdx);
        this.updateView();
    }

    // 设置pageView 显示页
    setCurrentPageIndex(currentPageIdx: number) {
        let pageViewNode = this.getNodeByName("pageView");
        let pageViewComp = pageViewNode.getComponent(PageView);
        pageViewComp.setCurrentPageIndex(currentPageIdx);
    }

    getNodeByName(name: string): Node {
        return util.getNodeByName(this.node, name);
    }

    initData() {
        let box1 = this.getNodeByName('checkbox1');
        let box2 = this.getNodeByName('checkbox2');
        let pageData1: PageData = {
            tabType: QueryTab.TabRegular,
            delegate: this,
            isChecked: true, // 是否显示下标 是否选中
            isShowRedStar: false, // 是否显示小红星
            amount: 0,
            box: box1,
            labelStyle: selectedStyle
        };
        let data = [pageData1];
        if (FeatureConfig.IS_OPEN_PRIZE_CENTER) {
            let pageData2: PageData = {
                tabType: QueryTab.TabVoucher,
                delegate: this,
                isChecked: false, // 是否显示下标
                isShowRedStar: false, // 是否显示小红星
                amount: 0,
                box: box2,
                labelStyle: unSelectedStyle
            };
            data.splice(1, 0, pageData2);
        }
        this.mData = data;
    }

    initPageData() {
        this.initData();
        this.initPage();
        this.updateView();
    }

    initPage() {
        // if (FeatureConfig.IS_OPEN_PRIZE_CENTER) {
        this.showPageTitles();
        // } else {
        //     this.hidePageTitles();
        // }
        let pageView: Node = this.getNodeByName('pageView');
        if (pageView) {
            let pageViewCom = pageView.getComponent('PageComponent');
            if (pageViewCom) {
                (pageViewCom as PageComponent).setData(this.mData);
            }
        }
    }

    hidePageTitles() {
        // 道具、兑换券隐藏
        let selectedGroupView = this.getNodeByName("selectedGroupView");
        selectedGroupView.active = false;

        // 调整topView的高度
        selectedGroupView.getComponent(UITransform).height = 0;
        let topArea = this.getNodeByName("topArea");
        topArea.getComponent(UITransform).height = 128;

        let titleArea = this.getNodeByName("titleArea");
        let widget = titleArea.getComponent(Widget);
        widget.bottom = 0;

        let middleArea = this.getNodeByName("middleArea");
        widget = middleArea.getComponent(Widget);
        widget.top = 128;
        this.updateChildAlinement(middleArea);
    }

    updateChildAlinement(parentNode: Node) {
        util.visit(parentNode, (node: Node) => {
            let widget = node.getComponent(Widget);
            if (widget) {
                widget.updateAlignment();
            }
        });
    }

    showPageTitles() {
        // 道具、兑换券显示
        let selectedGroupView = this.getNodeByName("selectedGroupView");
        selectedGroupView.active = true;
        // 调整topView 容器的高度
        selectedGroupView.getComponent(UITransform).height = 115;
        let topArea = this.getNodeByName("topArea");
        topArea.getComponent(UITransform).height = 243;

        let titleArea = this.getNodeByName("titleArea");
        let widget = titleArea.getComponent(Widget);
        widget.bottom = 115;

        let middleArea = this.getNodeByName("middleArea");
        widget = middleArea.getComponent(Widget);
        widget.top = 243;
        this.updateChildAlinement(middleArea);
    }

    updateScene(data: { tabType?: number; }) {
        this.initPageData();
        this.updateTabList(data.tabType || 0);
    }

    updateTabList(index: number) {
        this.onChange(index);
        this.node.getComponent(KnapsackOperate).checkUserBadge();
    }

    // 更新小红星的显示隐藏
    updateTabRedDot(index: number, amount: number) {
        let data = this.mData[index];
        if (data) {
            data.amount = amount || 0;
            data.isShowRedStar = amount > 0 ? true : false;
            this.updateView();
        }
    }

    updateBox(data: PageData) {
        let box = data.box;
        let view = box.getChildByName('onView');
        let redPoint = box.getChildByName('redPoint');
        let toggle: Toggle = (box.getComponent(Toggle) as Toggle);
        // 设置toggle是否选中
        if (toggle.isChecked != data.isChecked) {
            toggle.isChecked = data.isChecked;
        }
        // 显示下标
        view.active = data.isChecked;
        // 显示小红星
        redPoint.active = data.isShowRedStar;
        let labelView: Node = box.getChildByName('labelView');
        this.updateLabelStyle(labelView, data.labelStyle);
    }

    // 刷新UI界面
    updateView() {
        this.mData.forEach((data: PageData) => {
            this.updateBox(data);
        });
    }
    // 刷新文本大小颜色等样式
    updateLabelStyle(labelView: Node, labelStyle: LabelStyle) {
        let component = labelView.getComponent(Label);
        for (const key in labelStyle) {
            if (component[key] != labelStyle[key]) {
                component[key] = labelStyle[key];
            }
        }
    }

    // 清理小红星的显示
    cleanPropBadge(tabType: number, num: number) {
        const index = tabType === QueryTab.TabRegular ? 0 : 1;
        let data = this.mData[index];
        const amount = data.amount || 0;
        this.updateTabRedDot(index, amount + num);
    }

    onChange(index: number) {
        this.ignoreBoxEvent = true;
        let item: PageData;
        for (let i = 0; i < this.mData.length; i++) {
            item = this.mData[i];
            if (i == index) {
                this.selectedItem(item, true);
            } else {
                this.selectedItem(item, false);
            }
        }
        this.updateView();
        this.ignoreBoxEvent = false;
    }

    onChangePage(pageView: PageView) {
        const curPageIdx = pageView.curPageIdx;
        this.onChange(curPageIdx);
    }

    selectedItem(item: PageData, isChecked: boolean) {
        item.isChecked = isChecked;
        if (isChecked) {
            item.labelStyle = selectedStyle;
        } else {
            item.labelStyle = unSelectedStyle;
        }
    }

    resetAmount() {
        this.mData.forEach((data) => {
            data.amount = 0;
        });
    }

}
