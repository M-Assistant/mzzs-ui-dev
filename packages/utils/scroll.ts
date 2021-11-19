import { smoothCallback } from "@/types"

const userAgent = window.navigator.userAgent
const isSafari = (userAgent.indexOf('Chrome') === -1) && (userAgent.indexOf('Safari') >= 0)

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

// 平滑进步
export const formToSmooth  = (form: number, to: number, duration: number, callback: smoothCallback) => {
    const startTime = Date.now()
    const delta = to - form

    function tick(now: number) {
        const completion = (now - startTime) / duration
        if (completion < 1) {
            return { to: form + delta * easeOutCubic(completion), done: false }                
        }
        return { to, done: true }
    }

    // 每一帧触发的函数
    function running() {
        const update = tick(Date.now())
        callback(update)
        
        if (update.done) {
            return
        }
        requestAnimationFrame(running)
    }
    requestAnimationFrame(running)
}

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


