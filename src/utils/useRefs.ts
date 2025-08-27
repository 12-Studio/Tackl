import { useRef, RefObject } from 'react';

const MAX_ITERATIONS_COUNT = 50;

function iterator() {
    return this;
}

export const useRefs = <T>(initialValue: T): IterableIterator<RefObject<T>> => {
    let count = 0;

    return {
        next() {
            if (++count > MAX_ITERATIONS_COUNT) {
                throw new Error(
                    'useRefs: reached more than 50 refs. This hook can be used exclusively with the array destructuring syntax.'
                );
            }

            return {
                done: false,
                value: useRef(initialValue),
            };
        },
        [Symbol.iterator]: iterator,
    };
};
