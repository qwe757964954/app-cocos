interface TabGroup extends HTMLElement {
    dump?: any;
    tabs?: any;
    displayOrder?: number | string;
    $header?: HTMLElement;
}
interface LabelEx extends HTMLElement {
    value?: string;
}
const i18nPrefix = 'i18n:';
export function sortProp(propMap: { [key: string]: any; }) {
    const orderList: { key: string, dump: any; }[] = [];
    const normalList: { key: string, dump: any; }[] = [];

    Object.keys(propMap).forEach((key) => {
        const item = propMap[key];
        if (item != null) {
            if ('displayOrder' in item) {
                orderList.push({
                    key,
                    dump: item,
                });
            } else {
                normalList.push({
                    key,
                    dump: item,
                });
            }
        }
    });

    orderList.sort((a, b) => a.dump.displayOrder - b.dump.displayOrder);

    return orderList.concat(normalList);
}

export function loopSetAssetDumpDataReadonly(dump: any): void {
    if (typeof dump !== 'object') {
        return;
    }

    if (dump.readonly === undefined) {
        return;
    }

    dump.readonly = true;

    if (Array.isArray(dump.value)) {
        for (let i = 0; i < dump.value.length; i++) {
            loopSetAssetDumpDataReadonly(dump.value[i]);
        }
        return;
    }

    for (const key in dump.value) {
        loopSetAssetDumpDataReadonly(dump.value[key]);
    }
}

export function setDisabled(data: boolean | (() => boolean), element: HTMLElement): void {
    if (!element) {
        return;
    }

    let disabled = data;

    if (typeof data === 'function') {
        disabled = data();
    }

    if (disabled === true) {
        element.setAttribute('disabled', 'true');
    } else {
        element.removeAttribute('disabled');
    }
}

export function setHidden(data: boolean | (() => boolean), element: HTMLElement): void {
    if (!element) {
        return;
    }

    let hidden = data;

    if (typeof data === 'function') {
        hidden = data();
    }

    if (hidden === true) {
        element.setAttribute('hidden', '');
    } else {
        element.removeAttribute('hidden');
    }
}

export function getName(dump: any): string {
    if (!dump) {
        return '';
    }

    const i18nPrefix = 'prefix'; // Replace 'prefix' with your desired value

    if (dump.displayName) {
        if (dump.displayName.startsWith(i18nPrefix)) {
            const key = dump.displayName.substring(i18nPrefix.length);
            if (Editor.I18n.t(key)) {
                return dump.displayName;
            }
        } else {
            return dump.displayName;
        }
    }

    let name = dump.name || '';

    name = name.trim().replace(/^\S/, (str: string) => str.toUpperCase());
    name = name.replace(/_/g, (str: string) => ' ');
    name = name.replace(/ \S/g, (str: string) => ` ${str.toUpperCase()}`);
    // Convert camelCase to space-separated words
    name = name.replace(/([a-z])([A-Z])/g, '$1 $2');

    return name.trim();
}


export const appendToTabGroup = ($group: TabGroup, tabName: string): void => {
    if ($group.tabs[tabName]) {
        return;
    }

    const $content = document.createElement('div');
    $group.tabs[tabName] = $content;

    $content.setAttribute('class', 'tab-content');
    $content.setAttribute('name', tabName);
    $group.appendChild($content);

    const $label: LabelEx = document.createElement('ui-label');
    $label.value = getName({ name: tabName });

    const $button = document.createElement('ui-button');
    $button.setAttribute('name', tabName);
    $button.appendChild($label);
    if ($group.$header) {
        $group.$header.appendChild($button);
    }

};

export function createTabGroup(dump: any, panel: any): HTMLElement {
    const $group: TabGroup = document.createElement('div');
    $group.setAttribute('class', 'tab-group');

    $group.dump = dump;
    $group.tabs = {};
    $group.displayOrder = dump.displayOrder;

    $group.$header = document.createElement('ui-tab');
    $group.$header.setAttribute('class', 'tab-header');
    $group.$header.setAttribute('underline', '');
    $group.appendChild($group.$header);

    $group.$header.addEventListener('change', (e: Event) => {
        active(parseInt((e.target as HTMLInputElement).value));
    });

    function active(index: number): void {
        const tabNames: string[] = Object.keys($group.tabs);
        const tabName: string = tabNames[index];
        $group.childNodes.forEach((child: any) => {
            if (!child.classList.contains('tab-content')) {
                return;
            }
            if (child.getAttribute('name') === tabName) {
                child.style.display = 'block';
            } else {
                child.style.display = 'none';
            }
        });
    }

    // check style
    if (!panel.$this.shadowRoot.querySelector('style#group-style')) {
        const style: HTMLStyleElement = document.createElement('style');
        style.setAttribute('id', 'group-style');
        style.innerText = `
            .tab-group {
                margin-top: 4px;
            }
            .tab-content {
                display: none;
                padding-bottom: 6px;
            }`;

        panel.$.componentContainer.before(style);
    }

    setTimeout(() => {
        active(0);
    });

    return $group;
}


export const appendChildByDisplayOrder = (parent: HTMLElement, newChild: TabGroup) => {
    const displayOrder = newChild.displayOrder || 0;
    const children = Array.from(parent.children) as TabGroup[];

    const child = children.find((child: TabGroup) => {
        if (child.dump && child.displayOrder && child.displayOrder > displayOrder) {
            return child;
        }

        return null;
    });

    if (child) {
        child.before(newChild);
    } else {
        parent.appendChild(newChild);
    }
};

export function toggleGroups($groups: { [key: string]: HTMLElement; }) {
    for (const key in $groups) {
        const $props = Array.from($groups[key].querySelectorAll('.tab-content > ui-prop')) as HTMLElement[];
        const show = $props.some($prop => getComputedStyle($prop).display !== 'none');
        if (show) {
            $groups[key].removeAttribute('hidden');
        } else {
            $groups[key].setAttribute('hidden', '');
        }
    }
}

export function updatePropByDump(panel: any, dump: any): void {
    panel.dump = dump;

    if (!panel.elements) {
        panel.elements = {};
    }

    if (!panel.$props) {
        panel.$props = {};
    }

    if (!panel.$groups) {
        panel.$groups = {};
    }

    const oldPropKeys = Object.keys(panel.$props);
    const newPropKeys: string[] = [];

    Object.keys(dump.value).forEach((key: string, index: number) => {
        const info = dump.value[key];
        if (!info.visible) {
            return;
        }

        const element = panel.elements[key];
        let $prop = panel.$props[key];

        newPropKeys.push(key);

        if (!$prop) {
            if (element && element.create) {
                // when it needs to go custom initialize
                $prop = panel.$props[key] = panel.$[key] = element.create.call(panel, info);
            } else {
                $prop = panel.$props[key] = panel.$[key] = document.createElement('ui-prop');
                $prop.setAttribute('type', 'dump');
            }

            const _displayOrder = info.group?.displayOrder ?? info.displayOrder;
            $prop.displayOrder = _displayOrder === undefined ? index : Number(_displayOrder);

            if (element && element.displayOrder !== undefined) {
                $prop.displayOrder = element.displayOrder;
            }

            if (!element || !element.isAppendToParent || element.isAppendToParent.call(panel)) {
                if (info.group && dump.groups) {
                    const { id = 'default', name } = info.group;

                    if (!panel.$groups[id] && dump.groups[id]) {
                        if (dump.groups[id].style === 'tab') {
                            panel.$groups[id] = createTabGroup(dump.groups[id], panel);
                        }
                    }

                    if (panel.$groups[id]) {
                        if (!panel.$groups[id].isConnected) {
                            appendChildByDisplayOrder(panel.$.componentContainer, panel.$groups[id]);
                        }

                        if (dump.groups[id].style === 'tab') {
                            appendToTabGroup(panel.$groups[id], name);
                        }
                    }

                    appendChildByDisplayOrder(panel.$groups[id].tabs[name], $prop);
                } else {
                    appendChildByDisplayOrder(panel.$.componentContainer, $prop);
                }
            }
        } else if (!$prop.isConnected || !$prop.parentElement) {
            if (!element || !element.isAppendToParent || element.isAppendToParent.call(panel)) {
                if (info.group && dump.groups) {
                    const { id = 'default', name } = info.group;
                    appendChildByDisplayOrder(panel.$groups[id].tabs[name], $prop);
                } else {
                    appendChildByDisplayOrder(panel.$.componentContainer, $prop);
                }
            }
        }
        $prop.render(info);
    });

    for (const id of oldPropKeys) {
        if (!newPropKeys.includes(id)) {
            const $prop = panel.$props[id];
            if ($prop && $prop.parentElement) {
                $prop.parentElement.removeChild($prop);
            }
        }
    }

    for (const key in panel.elements) {
        const element = panel.elements[key];
        if (element && element.ready) {
            element.ready.call(panel, panel.$[key], dump.value);
            element.ready = undefined; // ready needs to be executed only once
        }
    }

    for (const key in panel.elements) {
        const element = panel.elements[key];
        if (element && element.update) {
            element.update.call(panel, panel.$[key], dump.value);
        }
    }

    toggleGroups(panel.$groups);
}

export const isMultipleInvalid = (dump: any): boolean => {
    let invalid = false;

    if (dump.values && dump.values.some((ds: any) => ds !== dump.value)) {
        invalid = true;
    }

    return invalid;
};



export const injectionStyle = `
ui-prop,
ui-section { margin-top: 4px; }

ui-prop > ui-section,
ui-prop > ui-prop,
ui-section > ui-prop[slot="header"],
ui-prop [slot="content"] ui-prop { 
    margin-top: 0; 
    margin-left: 0;
}
ui-prop[ui-section-config] + ui-section.config,
ui-prop[ui-section-config] + ui-prop[ui-section-config],
ui-section.config + ui-prop[ui-section-config],
ui-section.config + ui-section.config { margin-top: 0; }
`;
