import type { ObserverCallabck } from "@/types"

const observerCallbacks = new Map<Element, ObserverCallabck>()

// 交叉观察对象
// 作用：当 “被观察的元素” 出现在屏幕 | 在屏幕消失 时，会触发回调事件
const intersectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        const callback = observerCallbacks.get(entry.target)
        callback && callback(entry, observe)
    }
})

// 添加观察对象
export function observe(el: Element, callback: ObserverCallabck) {
    intersectionObserver.observe(el)
    observerCallbacks.set(el, callback)
}

// 移除观察对象
export function unobserve(el: Element) {
    intersectionObserver.unobserve(el)
}

// 解除监听器
export function disconnect() {
    intersectionObserver.disconnect()
}
