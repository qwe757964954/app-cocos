import * as cc from 'cc';
const { ccclass, property, executeInEditMode, disallowMultiple, menu } = cc._decorator;

export enum UnitType {
    Number,
    Percent,
    Auto,
};

@ccclass("PropValue")
export class PropValue {
    constructor(value: string | number, unit: UnitType = UnitType.Number) {
        if (typeof (value) == "string") {
            this._str_value = value;
            this.update_value_from_str();
        }
        else {
            this._value = value;
            this._unit = unit;
            this.update_value_to_str();
        }
    }

    set_value(value: string | number | PropValue) {
        if (typeof (value) == "string") {
            this.StrValue = value;
        } else if (typeof (value) == "number") {
            this._unit = UnitType.Number;
            this._value = value;
            this.update_value_to_str();
        } else if (value instanceof PropValue) {
            this._value = value._value;
            this._str_value = value._str_value;
            this._unit = value._unit;
        } else {
            this.StrValue = ""
        }
    }

    private update_value_from_str() {
        if (this._str_value == "auto" || this._str_value == "") {
            this._unit = UnitType.Auto;
            return;
        }

        if (this._str_value.substring(this._str_value.length - 1) == '%') {
            this._unit = UnitType.Percent;
            this._value = Number(this._str_value.substring(0, this._str_value.length - 1))
            return;
        }

        this._unit = UnitType.Number;
        this._value = Number(this._str_value);
    }

    private update_value_to_str() {
        switch (this._unit) {
            case UnitType.Number:
                {
                    this._str_value = String(this._value);
                    break;
                }
            case UnitType.Percent:
                {
                    this._str_value = `${this._value}%`
                    break;
                }
            case UnitType.Auto:
                {
                    this._str_value = 'auto';
                    break;
                }
        }
    }
    @property({
        displayName: "Unit",
        serializable: true,
        visible: false,
        type: cc.Enum(UnitType),
    })
    public _unit: UnitType = UnitType.Number;
    get Unit() {
        return this._unit;
    }
    set Unit(value: UnitType) {
        if (value == this._unit) return;
        this._unit = value;
        this.update_value_to_str();
    }

    @property({
        serializable: true,
        displayName: "Value",
        visible: false,
        type: cc.CCFloat,
    })
    public _value: number = 0;
    get Value() {
        return this._value;
    }
    set Value(value: number) {
        if (value == this._value) return;
        this._value = value;
        this.update_value_to_str();
    }

    @property({
        serializable: true,
        visible: true,
    })
    public _str_value: string = "";

    get StrValue() {
        if ("" == this._str_value) {
            return "auto";
        }

        return this._str_value;
    }

    set StrValue(value: string) {
        if (value == this._str_value) return;
        this._str_value = value;
        this.update_value_from_str();
    }

    public get_real_value(): 'auto' | number | `${number}%` {
        switch (this._unit) {
            case UnitType.Auto:
                return 'auto';
            case UnitType.Number:
                if (this._value == undefined) {
                    this.update_value_from_str();
                }
                return this._value;
            case UnitType.Percent:
                if (this._value == undefined) {
                    this.update_value_from_str();
                }
                return `${this._value}%`
        }
        return 'auto';
    }

    public get_edge_value(def: number): number | `${number}%` {
        switch (this._unit) {
            case UnitType.Auto:
                return def;
            case UnitType.Number:
                if (this._value == null) {
                    return def;
                }
                return this._value;
            case UnitType.Percent:
                if (this._value == null) {
                    return def;
                }
                return `${this._value}%`
        }
        return def;
    }

    public is_auto_value(): boolean {
        return this._unit == UnitType.Auto
    }

    public is_percent_value(): boolean {
        return this._unit == UnitType.Percent;
    }

    public is_number_value(): boolean {
        return this._unit == UnitType.Number;
    }
}

@ccclass("PropSize")
export class PropSize {
    constructor(width: string | PropValue | number, height: string | PropValue | number) {
        this.set_value(width, height)
    }

    public set_value(width: string | PropValue | number, height: string | PropValue | number) {
        this.width_value.set_value(width);
        this.height_value.set_value(height)
    }

    @property({
        serializable: true,
        visible: false,
    })
    public width_value: PropValue = new PropValue("auto");

    @property({
        displayName: "width",
        type: cc.CCString,
        visible: true,
    })
    get Width() {
        return this.width_value.StrValue;
    }
    set Width(value: string) {
        this.width_value.StrValue = value;
    }

    @property({
        serializable: true,
        visible: false,
    })
    public height_value: PropValue = new PropValue('auto');

    @property({
        displayName: "height",
        type: cc.CCString,
        visible: true,
    })
    get Height() {
        return this.height_value.StrValue;
    }
    set Height(value: string) {
        this.height_value.StrValue = value;
    }
}

@ccclass("PropEdgeBox")
export class PropEdgeBox {
    constructor(left: string | PropValue | number,
        right: string | PropValue | number,
        top: string | PropValue | number,
        bottom: string | PropValue | number) {
        this.left_value.set_value(left);
        this.right_value.set_value(right);
        this.top_value.set_value(top);
        this.bottom_value.set_value(bottom)
    }

    @property({
        serializable: true,
        visible: false,
    })
    public left_value: PropValue = new PropValue("auto");

    @property({
        displayName: "left",
        type: cc.CCString,
        visible: true,
        displayOrder: 0,
    })
    get Left() {
        return this.left_value.StrValue;
    }
    set Left(value: string) {
        this.left_value.StrValue = value;
    }

    @property({
        serializable: true,
        visible: false,
    })
    public right_value: PropValue = new PropValue("auto");

    @property({
        displayName: "right",
        type: cc.CCString,
        visible: true,
        displayOrder: 2,
    })
    get Right() {
        return this.right_value.StrValue;
    }
    set Right(value: string) {
        this.right_value.StrValue = value;
    }

    @property({
        serializable: true,
        visible: false,
    })
    public top_value: PropValue = new PropValue("auto");

    @property({
        displayName: "top",
        type: cc.CCString,
        visible: true,
        displayOrder: 1,
    })
    get Top() {
        return this.top_value.StrValue;
    }
    set Top(value: string) {
        this.top_value.StrValue = value;
    }

    @property({
        serializable: true,
        visible: false,
    })
    public bottom_value: PropValue = new PropValue("auto");

    @property({
        displayName: "bottom",
        type: cc.CCString,
        visible: true,
        displayOrder: 3,
    })
    get Bottom() {
        return this.bottom_value.StrValue;
    }
    set Bottom(value: string) {
        this.bottom_value.StrValue = value;
    }

    @property({
        visible: false,
        serializable: true,
    })
    public showCenterOffset: boolean = false;

    @property({
        serializable: true,
        visible: false,
    })
    public center_offset_x_value: PropValue = new PropValue("auto");

    @property({
        displayName: "CenterOffsetX",
        type: cc.CCString,
        visible: function () {
            return this.showCenterOffset;
        },
    })
    get CenterOffsetX() {
        return this.center_offset_x_value.StrValue;
    }
    set CenterOffsetX(value: string) {
        this.center_offset_x_value.StrValue = value;
    }

    @property({
        serializable: true,
        visible: false,
    })
    public center_offset_y_value: PropValue = new PropValue("auto");

    @property({
        displayName: "CenterOffsetY",
        type: cc.CCString,
        visible: function () {
            return this.showCenterOffset;
        },
    })
    get CenterOffsetY() {
        return this.center_offset_y_value.StrValue;
    }
    set CenterOffsetY(value: string) {
        this.center_offset_y_value.StrValue = value;
    }

    public reset() {
        this.left_value.set_value("auto")
        this.right_value.set_value("auto")
        this.top_value.set_value("auto")
        this.bottom_value.set_value("auto")
        // this.center_offset_x_value.set_value("auto")
        // this.center_offset_y_value.set_value("auto")
    }
}