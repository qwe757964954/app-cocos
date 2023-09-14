import { EventTarget } from "cc";

// 所有 mixins 都需要
type Constructor<T = {}> = new (...args: any[]) => T;

export class EmptyClass {}

// 添加属性的混合例子
export function EventTargetExtends<TBase extends Constructor>(Base: TBase) {
    return EventTarget
}