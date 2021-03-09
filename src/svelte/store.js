import { writable, readable, derived } from "svelte/store"

export const count = writable(0)

export const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return function stop() {
        clearInterval(interval);
    };
})

function createCusCount() {
    const { subscribe, update, set } = writable(99)
    return {
        subscribe,
        incre: () => update(n => n + 1),
        decre: () => update(n => n - 1),
        reset: () => set(99)
    }
}

export const cusCount = createCusCount()

let start = new Date()

export const secondCount = derived(
    time,
    $time => Math.round(($time - start) / 1000)
)