import { smoothCallback } from "@/types";

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
