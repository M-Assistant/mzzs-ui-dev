import { isArray, isNumber } from "./validator"

export declare type easeFn = (t: number) => number
export declare type transitionCallback = (n: number | number[], status: 0 | 1 | 2) => boolean | void


/**
 * 惯性滚动
 * 参考地址：https://juejin.cn/post/6844904185121488910
 * @param {number}   start        初始滑动点
 * @param {number}   end          结束滑动点
 * @param {number}   time         滑动时间
 * @param {number[]} range        滑动范围：[min, max]
 * @param {number}   rebound      回弹距离
 * @param {number}   deceleration 滑动加速度
 * @returns 
 */
export function momentum(start: number, end: number, time: number, range: number[], rebound: number = 0, deceleration: number = 0.006) {
    // 滚动距离（s1）
    let distance = end - start;

    // 临界速度点（v1）
    let speed = (2 * Math.abs(distance)) / time;

    // 滑动距离
    let destination = end + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);

    // 滑动时长
    let duration = speed / deceleration;

    // 边界限制
    const [min, max] = range;
    if (destination < min) {
        destination = rebound ? min - (rebound / 2.5 * (speed / 8)) : min;
        distance = Math.abs(destination - end);
        duration = distance / speed;
    } else if (destination > max) {
        destination = rebound ? rebound / 2.5 * (speed / 8) : rebound;
        distance = Math.abs(end) + destination;
        duration = distance / speed;
    }

    return {
        destination: Math.round(destination),
        duration
    }
}


/**
 * 数值平滑过渡
 * @param {number|number[]}    form     起始值
 * @param {number|number[]}    to       结束值
 * @param {number}             duration 执行时间
 * @param {transitionCallback} callback 回调函数
 * @param {easeFn}             easeFn   ease函数
 */
 export function smooth(form: number | number[], to: number | number[], duration: number, callback: transitionCallback, easeFn?: easeFn) {
    if (typeof form !== typeof to) {
        throw new TypeError('The type of form and to are inconsistent.');
    }

    // 校验参数，并将 form 转为数组
    let isNum = false;
    let _form: number[] = [];
    if (isArray(form) && isArray(to)) {
        if (form.length !== to.length) {
            throw new RangeError('The length of form and to are inconsistent.');
        }
        _form = form;
    } else if (isNumber(form)) {
        _form = [form];
        isNum = true;
    }

    const startTime = Date.now();
    const descTime = startTime + duration;
    const delta = (isNumber(to) ? [to] : to).slice().map((v, i) => v - _form[i]);
    
    function step() {
        let now = Date.now();
        let easing: number;

        // 过渡结束
        if (now >= descTime) {
            callback(to, 2);
            return;
        }

        // 过渡进行中
        now = (now - startTime) / duration;
        easing = easeFn ? easeFn(now) : (1 - Math.pow(1 - now, 3));
        const newVal = delta.map((v, i) => {
            return v * easing + _form[i];
        })
        if (callback(isNum ? newVal[0] : newVal, 1) === false) {
            return;
        }

        // 每帧执行过渡函数
        requestAnimationFrame(step);
    }

    // 过渡开始
    callback(form, 0);
    step();
}

