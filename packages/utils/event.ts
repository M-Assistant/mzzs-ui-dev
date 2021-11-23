const userAgent = window.navigator.userAgent
const isSafari = (userAgent.indexOf('Chrome') === -1) && (userAgent.indexOf('Safari') >= 0)


/**
 * 监听事件
 * @param {Element|Document|Window} el 
 * @param {String} event 
 * @param {Function} handler 
 */
 export function on(el: Element|Document|Window, event: string, handler: (e: Event) => void) {
    if (document.addEventListener !== undefined) {
        el.addEventListener(event, handler, false)
        // @ts-ignore
    } else if (document.attachEvent !== undefined) {
        // @ts-ignore
        el.attachEvent('on' + event, handler)
    } else {
        console.warn(`Add Event "${event}" Listen failed`)
    }
}


/**
 * 取消事件监听
 * @param {Element|Document|Window} el 
 * @param {String} event 
 * @param {Function} handler 
 */
export function off(el: Element|Document|Window, event: string, handler: (e: Event) => void) {
    if (document.removeEventListener !== undefined) {
        el.removeEventListener(event, handler, false)
        // @ts-ignore
    } else if (document.detachEvent !== undefined) {
        // @ts-ignore
        el.detachEvent('on' + event, handler)
    } else {
        console.warn(`Cancel Event "${event}" Listen failed`)
    }
}


/**
 * 标准化滚轮事件。返回一个对象如下：{ deltaX: 1, deltaY: -1 }，其中 1 代表向上，-1 代表向下
 * @param {Event} e 
 * @returns 
 */
export function standardizedWheel(e: Event) {
    const wheelEvent = { deltaX: 0, deltaY: 0 }

    // @ts-ignore
    const { wheelDelta, wheelDeltaX, wheelDeltaY, axis, VERTICAL_AXIS, HORIZONTAL_AXIS, detail } = e

    // horizental
    if (wheelDeltaX !== undefined) {    
        // webkit
        if (isSafari) {
            wheelEvent.deltaX = -(wheelDeltaX / 120)
        } else {
            wheelEvent.deltaX = wheelDeltaX / 120
        }
    } else if (typeof HORIZONTAL_AXIS !== undefined && axis === HORIZONTAL_AXIS) {
        // Firefox < 17
        wheelEvent.deltaX = -detail / 3
    } 

    // vertical
    if (wheelDeltaY !== undefined) {    
        // webkit
        wheelEvent.deltaY = wheelDeltaY / 120
    } else if (typeof VERTICAL_AXIS !== undefined && axis === VERTICAL_AXIS) {
        // Firefox < 17
        wheelEvent.deltaY = -detail / 3
    }

    if (wheelEvent.deltaY === 0 && wheelEvent.deltaX === 0 && wheelDelta) {
        // IE
        wheelEvent.deltaY = wheelDelta / 120
    }

    return Object.assign({}, e, wheelEvent)
}
