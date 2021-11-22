interface draggableOptions {
    start?: (e: Event) => void
    drag?: (e: Event) => void
    end?: (e: Event) => void
}

// 监听列表
const listenerCallback = new Map<HTMLElement, any>()

/**
 * 监听拖拽事件
 * @param {HTMLElement} el 
 * @param {} options 
 * @returns 
 */
export function addDraggableListener(el: HTMLElement, options: draggableOptions) {
    // 禁止重复监听
    if (listenerCallback.has(el)) {
        return
    }

    let isDragging = false

    // 按下
    const startFn = (e: Event) => {
        if (isDragging) return
        document.onselectstart = () => false
        document.ondragstart = () => false

        document.addEventListener('mousemove', dragFn)
        document.addEventListener('mouseup', endFn)
        isDragging = true

        if (options.start) {
            options.start(e)
        }
    }

    // 移动
    const dragFn = (e: Event) => {
        if (options.drag) {
            options.drag(e)
        }
    }

    // 抬起
    const endFn = (e: Event) => {
        document.removeEventListener('mousemove', dragFn)
        document.removeEventListener('mouseup', endFn)
        document.onselectstart = null
        document.ondragstart = null

        isDragging = false

        if (options.end) {
            options.end(e)
        }
    }

    listenerCallback.set(el, startFn)
    el.addEventListener('mousedown', startFn)
}

/**
 * 移除监听拖拽事件
 * @param {HTMLElement} el 
 * @param {} options 
 * @returns 
 */
export function removeDraggableListener(el: HTMLElement) {
    const fn = listenerCallback.get(el)
    if (fn) {
        el.addEventListener('mousedown', fn)
    }
}
