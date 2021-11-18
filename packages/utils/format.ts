import { isDef } from "./validator"

/**
 * 去除空格
 * @param val 
 * @returns 
 */
export const trim = function(val?: string) {
    return (val || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}


/**
 * 格式化图片路径
 * @param {string} val
 * @returns 
 */
 export function formatSrc (val: any): string {
    if (val === undefined || val === '') {
        return ''
    } else if (val.startsWith('http') || val.startsWith('://')) {
        return val
    } else {
        // return new URL(`../assets/${val}`, import.meta.url).toString()
        return val
    }
}

/**
 * 格式化css size属性
 * @param val 
 * @param unit 
 * @returns 
 */
export function formatCssSize (val: any, unit: string = 'px'): string | undefined {
    if (!['string', 'number'].includes(typeof val)) return undefined
    
    val = String(val)
    return /^\d+(.\d+)?$/.test(val) ? val + unit : val
}
