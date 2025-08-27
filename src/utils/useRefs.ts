import { useRef, RefObject } from 'react';

function iterator() {
    return this;
}

export const useRefs = <T>(initialValue: T): IterableIterator<RefObject<T>> => {
    return {
        next() {
            return {
                done: false,
                value: useRef(initialValue),
            };
        },
        [Symbol.iterator]: iterator,
    };
};
