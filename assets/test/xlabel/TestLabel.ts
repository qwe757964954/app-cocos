import { Label } from 'cc';
import { EventHandler } from 'cc';
import { EditBox, ToggleContainer } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Toggle } from 'cc';
import { XLabel } from '../../bos/framework/gui/xlabel/XLabel';
import { Color } from 'cc';
import { FontSlant, FontWeight, HorizontalAlignment, LayoutAlignment, LineBreakMode, LineTruncateMode, VerticalAlignment } from '../../bos/framework/gui/xlabel/imp/TekstoEnum';
import { Line } from 'cc';
import { Font } from 'cc';
import { SpriteFrame } from 'cc';
import { CCString } from 'cc';
import { CCFloat } from 'cc';
const { ccclass, property } = _decorator;


type EDIT_CALLBACk = (value: string) => void;
type TOGGLE_GROUP_CALLBACK = (value: number) => void;
type CHECKBOX_CALLBACK = (value: boolean) => void;

@ccclass("TestEditItem")
class TestEditItem {
    @property(Label)
    public title: Label = null!;
    @property(EditBox)
    public input: EditBox = null!;

    private _callback: EDIT_CALLBACk = null!;

    handleChangeText() {
        let value = this.input.string
        this._callback(value);
    }

    public init(title: string, callback: EDIT_CALLBACk) {
        this._callback = callback;
        //   this.title.string = title;
        this.input.node.on(EditBox.EventType.TEXT_CHANGED, this.handleChangeText, this)
    }

    public destroy() {
        this.input.node.off(EditBox.EventType.TEXT_CHANGED, this.handleChangeText, this)
    }
}

class CallbackEventHandler extends EventHandler {
    private _callback: (...params: any[]) => void;
    private _target: any = null!;

    constructor(target: any, callback: (...params: any[]) => void) {
        super()
        this._target = target;
        this._callback = callback
    }

    public emit(params: any[]) {
        this._callback.apply(this._target, params)
    }
};

@ccclass("TestToggleItem")
class TestToggleItem {
    @property(Label)
    public title: Label = null!;
    @property(ToggleContainer)
    public toggleGroup: ToggleContainer = null!;
    private _checkValue: number[] = [];
    private _callback: TOGGLE_GROUP_CALLBACK = null!;

    public handleCheckChange() {
        let items = this.toggleGroup.toggleItems
        for (let i = 0; i < items.length; i++) {
            if (items[i].isChecked) {
                this._callback(this._checkValue[i]);
                break;
            }
        }
    }

    public init(title: string, checkValue: number[], callback: TOGGLE_GROUP_CALLBACK) {
        //  this.title.string = title;
        this._callback = callback;
        this._checkValue = checkValue;
        let handler = new CallbackEventHandler(this, this.handleCheckChange)
        this.toggleGroup.checkEvents.push(handler);
    }

    public destroy() {

    }
}

@ccclass("TestCheckBoxItem")
class TestCheckBoxItem {
    @property(Label)
    public title: Label = null!;
    @property(Toggle)
    public checkBox: Toggle = null!;
    private _callback: CHECKBOX_CALLBACK = null!;

    handleCheck() {
        this._callback(this.checkBox.isChecked);
    }

    public init(title: string, callback: CHECKBOX_CALLBACK) {
        // this.title.string = title;
        this._callback = callback;

        this.checkBox.node.on(Toggle.EventType.TOGGLE, this.handleCheck, this)
    }

    public destroy() {
        this.checkBox.node.off(Toggle.EventType.TOGGLE, this.handleCheck, this)
    }
}

@ccclass("TestPlaceHold")
class TestPlaceHold {
    @property(CCString)
    public key: string = "";
    @property(SpriteFrame)
    public spriteFrame: SpriteFrame = null!;

    @property(CCFloat)
    public marginLeft: number = 0;
    @property(CCFloat)
    public marginRight: number = 0;
    @property(CCFloat)
    public marginTop: number = 0;
    @property(CCFloat)
    public marginBottom: number = 0;
}

@ccclass('TestLabel')
export class TestLabel extends Component {

    @property(TestEditItem)
    public stringEdit: TestEditItem = new TestEditItem;
    @property(TestEditItem)
    public fontSizeEdit: TestEditItem = new TestEditItem;
    @property(TestEditItem)
    public lineSpaceEdit: TestEditItem = new TestEditItem;
    @property(TestEditItem)
    public letterSpaceEdit: TestEditItem = new TestEditItem;
    @property(TestEditItem)
    public maxWidthEdit: TestEditItem = new TestEditItem;
    @property(TestEditItem)
    public fontColorEdit: TestEditItem = new TestEditItem;
    @property(TestEditItem)
    public FamilyEdit: TestEditItem = new TestEditItem;
    @property(TestCheckBoxItem)
    public systemFont: TestCheckBoxItem = new TestCheckBoxItem;
    @property(TestToggleItem)
    public truncateGroup: TestToggleItem = new TestToggleItem;
    @property(TestToggleItem)
    public horizontalGroup: TestToggleItem = new TestToggleItem;
    @property(TestToggleItem)
    public vertialGroup: TestToggleItem = new TestToggleItem;
    @property(TestToggleItem)
    public layoutGroup: TestToggleItem = new TestToggleItem;
    @property(TestToggleItem)
    public breakModeGroup: TestToggleItem = new TestToggleItem;
    @property(TestToggleItem)
    public FontSlantGroup: TestToggleItem = new TestToggleItem;
    @property(TestToggleItem)
    public FontWeightGroup: TestToggleItem = new TestToggleItem;

    @property(XLabel)
    public label: XLabel = null!;

    @property(Font)
    public customFont: Font = null!;

    @property(TestPlaceHold)
    public placeHolds: TestPlaceHold[] = [];

    start() {

    }

    protected onLoad(): void {
        this.stringEdit.init("string:", (value: string) => {
            this.label.string = value;
        })

        this.fontSizeEdit.init("fontSize:", (value: string) => {
            let nvalue = Number(value)
            if (nvalue == null) return;
            this.label.FontSize = nvalue
        })

        this.lineSpaceEdit.init("lineSpace:", (value: string) => {
            let nvalue = Number(value)
            if (nvalue == null) return;
            this.label.LineSpace = nvalue
        })

        this.letterSpaceEdit.init("letterSpace:", (value: string) => {
            let nvalue = Number(value)
            if (nvalue == null) return;
            this.label.LetterSpace = nvalue
        })

        this.maxWidthEdit.init("MaxWidth:", (value: string) => {
            let nvalue = Number(value)
            if (nvalue == null) return;
            this.label.MaxWidth = nvalue
        })

        this.fontColorEdit.init("fontColor:", (value: string) => {
            let color = new Color(value);
            this.label.FontColor = color
        })

        this.FamilyEdit.init("Family:", (value: string) => {
            this.label.FontFamily = value
        })


        this.systemFont.init("systemFont:", (value: boolean) => {
            this.label.UseSystemFont = value;

            if (!value) {
                this.label.Font = this.customFont
            }
        })


        this.truncateGroup.init("Truncate:", [
            LineTruncateMode.Clipping,
            LineTruncateMode.ByHead,
            LineTruncateMode.ByTail,
            LineTruncateMode.ByMiddle,
        ], (value: number) => {
            this.label.LineTruncateMode = value;
        })

        this.horizontalGroup.init("horizontal:", [
            HorizontalAlignment.Left,
            HorizontalAlignment.Right,
            HorizontalAlignment.Center,
            HorizontalAlignment.Justified,
        ], (value: number) => {
            this.label.HorizontalAlignment = value;
        })

        this.vertialGroup.init("vertial:", [
            VerticalAlignment.Top,
            VerticalAlignment.Bottom,
            VerticalAlignment.Center,
            VerticalAlignment.Baseline,
        ], (value: number) => {
            this.label.VerticalAlignment = value;
        })

        this.layoutGroup.init("layout:", [
            LayoutAlignment.Top,
            LayoutAlignment.Bottom,
            LayoutAlignment.Center,
        ], (value: number) => {
            this.label.LayoutAlignment = value;
        })

        this.breakModeGroup.init("layout:", [
            LineBreakMode.WordWrapping,
            LineBreakMode.CharWrapping,
        ], (value: number) => {
            this.label.LineBreakMode = value;
        })

        this.FontSlantGroup.init("Font Slant:", [
            FontSlant.Normal,
            FontSlant.Italic,
            FontSlant.Oblique,
        ], (value: number) => {
            this.label.FontSlant = value;
        })

        this.FontWeightGroup.init("Font Weight:", [
            FontWeight.Thin,
            FontWeight.Normal,
            FontWeight.Bold,
            FontWeight.Heavy,
        ], (value: number) => {
            this.label.FontWeight = value;
        })

        for (let hold of this.placeHolds) {
            if (hold.key != "") {
                let margin = {
                    left: hold.marginLeft,
                    right: hold.marginRight,
                    top: hold.marginTop,
                    bottom: hold.marginBottom
                }
                XLabel.register_place_hold(hold.key, hold.spriteFrame, margin)
            }
        }
    }

    protected onDestroy(): void {
        this.stringEdit.destroy();
        this.fontSizeEdit.destroy();
        this.lineSpaceEdit.destroy();
        this.letterSpaceEdit.destroy();
        this.maxWidthEdit.destroy();
        this.fontColorEdit.destroy();
        this.FamilyEdit.destroy();
        this.systemFont.destroy();
        this.truncateGroup.destroy();

        this.horizontalGroup.destroy();
        this.vertialGroup.destroy();
        this.layoutGroup.destroy();
        this.breakModeGroup.destroy();
        this.FontSlantGroup.destroy();
        this.FontWeightGroup.destroy();


    }

    update(deltaTime: number) {

    }
}


