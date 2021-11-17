/**
 * 格式化图片路径
 * @param {string} val
 * @returns 
 */
 export function formatSrc (val ?: string): string {
    if (val === undefined || val === '') {
        return ''
    } else if (val.startsWith('http') || val.startsWith('://')) {
        return val
    } else {
        // return new URL(`../assets/${val}`, import.meta.url).toString()
        return val
    }
}


export function formatCssSize (val?: number | string, unit: string = 'px'): string | undefined {
    if (val === undefined) return val
    
    val = String(val)
    return /^[\d\.]+$/.test(val) ? val + unit : val
}
