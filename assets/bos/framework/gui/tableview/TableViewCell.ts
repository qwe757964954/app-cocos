import { UITransform } from 'cc';
import { Component } from 'cc';
import { TableViewDirection } from './TablewViewEnum';

export class TableViewIndex {
    constructor(section: number, index: number) {
        this.section = section;
        this.index = index;
    }

    public section: number = 0;
    public index: number = 0;

    get hash_index(): number {
        let value = (this.section << 24) | this.index;
        return value;
    }

    public setValue(newValue: Readonly<TableViewIndex>) {
        this.section = newValue.section;
        this.index = newValue.index;
    }

    public setValue2(section: number, index: number) {
        this.index = index
        this.section = section
    }
    public clone() {
        return new TableViewIndex(this.section, this.index)
    }

    public cmp2(section: number, index: number) {
        if (this.section < section) {
            return -1;
        } else if (this.section == section) {
            if (this.index == index) {
                return 0;
            } else if (this.index > index) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return 1;
        }
    }
    // < other return -1
    // > other return 1
    // = other return 0
    public cmp(other: TableViewIndex) {
        return this.cmp2(other.section, other.index)
    }
}

export class TableViewSection extends Component {
    private _section: number = 0;
    public get section() {
        return this._section
    }

    public setSection(section: number) {
        this._section = section
    }

    private _uitransofrm: UITransform = null!;

    onLoad() {
        this._uitransofrm = this.node.getComponent(UITransform) || this.node.addComponent(UITransform)
    }

    getUITransform(): UITransform {
        if (this._uitransofrm == null) {
            this._uitransofrm = this.node.getComponent(UITransform) || this.node.addComponent(UITransform)
        }
        return this._uitransofrm
    }
    public getLength(dir: TableViewDirection) {
        switch (dir) {
            case TableViewDirection.Horizontal:
                {
                    return this._uitransofrm.width;
                }
            case TableViewDirection.Vertical:
                {
                    return this._uitransofrm.height;
                }
        }
    }
};

export class TableViewCell extends Component {
    public index: TableViewIndex = new TableViewIndex(0, 0);
    private _uitransofrm: UITransform = null!;

    onLoad() {
        this._uitransofrm = this.node.getComponent(UITransform) || this.node.addComponent(UITransform);

    }
    get hash_index() {
        return this.index.hash_index;
    }

    getUITransform(): UITransform {
        if (this._uitransofrm == null) {
            this._uitransofrm = this.node.getComponent(UITransform) || this.node.addComponent(UITransform)
        }
        return this._uitransofrm
    }
    getLength(dir: TableViewDirection) {
        switch (dir) {
            case TableViewDirection.Horizontal:
                {
                    return this._uitransofrm.width;
                }
            case TableViewDirection.Vertical:
                {
                    return this._uitransofrm.height;
                }
        }
    }
}
