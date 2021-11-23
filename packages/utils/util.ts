/**
 * 去除空格
 * @param val 
 * @returns 
 */
 export function trim(val?: string) {
    return (val || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}


/**
 * 字符串转驼峰
 * @param name 
 * @returns 
 */
export function camelCase(name: string) {
    return name.replace(
        /([\:\-\_]+(.))/g, 
        function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter
        }
    ).replace(/^moz([A-Z])/, 'Moz$1')
}


/**
 * 去除末尾非数字字符，并转换成浮点数
 * @param val 
 * @returns 
 */
export function transformNumber(val: string): number {
    return parseFloat(val.replace(/([^0-9\.]+)$/g, ''))
}
