import { Dispatcher } from "../dispatcher";
import { OrderedSet } from "./ordered-set";
export interface QueueUnresolvedEntry<T> {
    key: T;
    relative: T;
    move: "before" | "after" | "replace" | "swap" | "remove";
}
export declare class Queue<T> {
    unresolved: QueueUnresolvedEntry<T>[];
    items: OrderedSet<T>;
    onresolve: Dispatcher<QueueUnresolvedEntry<T>>;
    pushFront(...keys: T[]): this;
    pushBack(...keys: T[]): this;
    pushBefore(before: T, ...keys: T[]): this;
    pushAfter(after: T, ...keys: T[]): this;
    swap(first: T, second: T): this;
    replace(replaced: T, ...keys: T[]): this;
    remove(...keys: T[]): this;
    resolveDependencies(): void;
    toString(): T[];
}
