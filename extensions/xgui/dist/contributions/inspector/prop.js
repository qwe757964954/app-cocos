"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectionStyle = exports.isMultipleInvalid = exports.updatePropByDump = exports.toggleGroups = exports.appendChildByDisplayOrder = exports.createTabGroup = exports.appendToTabGroup = exports.getName = exports.setHidden = exports.setDisabled = exports.loopSetAssetDumpDataReadonly = exports.sortProp = void 0;
const i18nPrefix = 'i18n:';
function sortProp(propMap) {
    const orderList = [];
    const normalList = [];
    Object.keys(propMap).forEach((key) => {
        const item = propMap[key];
        if (item != null) {
            if ('displayOrder' in item) {
                orderList.push({
                    key,
                    dump: item,
                });
            }
            else {
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
exports.sortProp = sortProp;
function loopSetAssetDumpDataReadonly(dump) {
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
exports.loopSetAssetDumpDataReadonly = loopSetAssetDumpDataReadonly;
function setDisabled(data, element) {
    if (!element) {
        return;
    }
    let disabled = data;
    if (typeof data === 'function') {
        disabled = data();
    }
    if (disabled === true) {
        element.setAttribute('disabled', 'true');
    }
    else {
        element.removeAttribute('disabled');
    }
}
exports.setDisabled = setDisabled;
function setHidden(data, element) {
    if (!element) {
        return;
    }
    let hidden = data;
    if (typeof data === 'function') {
        hidden = data();
    }
    if (hidden === true) {
        element.setAttribute('hidden', '');
    }
    else {
        element.removeAttribute('hidden');
    }
}
exports.setHidden = setHidden;
function getName(dump) {
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
        }
        else {
            return dump.displayName;
        }
    }
    let name = dump.name || '';
    name = name.trim().replace(/^\S/, (str) => str.toUpperCase());
    name = name.replace(/_/g, (str) => ' ');
    name = name.replace(/ \S/g, (str) => ` ${str.toUpperCase()}`);
    // Convert camelCase to space-separated words
    name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    return name.trim();
}
exports.getName = getName;
const appendToTabGroup = ($group, tabName) => {
    if ($group.tabs[tabName]) {
        return;
    }
    const $content = document.createElement('div');
    $group.tabs[tabName] = $content;
    $content.setAttribute('class', 'tab-content');
    $content.setAttribute('name', tabName);
    $group.appendChild($content);
    const $label = document.createElement('ui-label');
    $label.value = getName({ name: tabName });
    const $button = document.createElement('ui-button');
    $button.setAttribute('name', tabName);
    $button.appendChild($label);
    if ($group.$header) {
        $group.$header.appendChild($button);
    }
};
exports.appendToTabGroup = appendToTabGroup;
function createTabGroup(dump, panel) {
    const $group = document.createElement('div');
    $group.setAttribute('class', 'tab-group');
    $group.dump = dump;
    $group.tabs = {};
    $group.displayOrder = dump.displayOrder;
    $group.$header = document.createElement('ui-tab');
    $group.$header.setAttribute('class', 'tab-header');
    $group.$header.setAttribute('underline', '');
    $group.appendChild($group.$header);
    $group.$header.addEventListener('change', (e) => {
        active(parseInt(e.target.value));
    });
    function active(index) {
        const tabNames = Object.keys($group.tabs);
        const tabName = tabNames[index];
        $group.childNodes.forEach((child) => {
            if (!child.classList.contains('tab-content')) {
                return;
            }
            if (child.getAttribute('name') === tabName) {
                child.style.display = 'block';
            }
            else {
                child.style.display = 'none';
            }
        });
    }
    // check style
    if (!panel.$this.shadowRoot.querySelector('style#group-style')) {
        const style = document.createElement('style');
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
exports.createTabGroup = createTabGroup;
const appendChildByDisplayOrder = (parent, newChild) => {
    const displayOrder = newChild.displayOrder || 0;
    const children = Array.from(parent.children);
    const child = children.find((child) => {
        if (child.dump && child.displayOrder && child.displayOrder > displayOrder) {
            return child;
        }
        return null;
    });
    if (child) {
        child.before(newChild);
    }
    else {
        parent.appendChild(newChild);
    }
};
exports.appendChildByDisplayOrder = appendChildByDisplayOrder;
function toggleGroups($groups) {
    for (const key in $groups) {
        const $props = Array.from($groups[key].querySelectorAll('.tab-content > ui-prop'));
        const show = $props.some($prop => getComputedStyle($prop).display !== 'none');
        if (show) {
            $groups[key].removeAttribute('hidden');
        }
        else {
            $groups[key].setAttribute('hidden', '');
        }
    }
}
exports.toggleGroups = toggleGroups;
function updatePropByDump(panel, dump) {
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
    const newPropKeys = [];
    Object.keys(dump.value).forEach((key, index) => {
        var _a, _b;
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
            }
            else {
                $prop = panel.$props[key] = panel.$[key] = document.createElement('ui-prop');
                $prop.setAttribute('type', 'dump');
            }
            const _displayOrder = (_b = (_a = info.group) === null || _a === void 0 ? void 0 : _a.displayOrder) !== null && _b !== void 0 ? _b : info.displayOrder;
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
                            (0, exports.appendChildByDisplayOrder)(panel.$.componentContainer, panel.$groups[id]);
                        }
                        if (dump.groups[id].style === 'tab') {
                            (0, exports.appendToTabGroup)(panel.$groups[id], name);
                        }
                    }
                    (0, exports.appendChildByDisplayOrder)(panel.$groups[id].tabs[name], $prop);
                }
                else {
                    (0, exports.appendChildByDisplayOrder)(panel.$.componentContainer, $prop);
                }
            }
        }
        else if (!$prop.isConnected || !$prop.parentElement) {
            if (!element || !element.isAppendToParent || element.isAppendToParent.call(panel)) {
                if (info.group && dump.groups) {
                    const { id = 'default', name } = info.group;
                    (0, exports.appendChildByDisplayOrder)(panel.$groups[id].tabs[name], $prop);
                }
                else {
                    (0, exports.appendChildByDisplayOrder)(panel.$.componentContainer, $prop);
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
exports.updatePropByDump = updatePropByDump;
const isMultipleInvalid = (dump) => {
    let invalid = false;
    if (dump.values && dump.values.some((ds) => ds !== dump.value)) {
        invalid = true;
    }
    return invalid;
};
exports.isMultipleInvalid = isMultipleInvalid;
exports.injectionStyle = `
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
