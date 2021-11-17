/**
 * Checks if `value` is an undefined, null
 * @param {any} val 
 * @returns {boolean} Returns `true` if `value` is undefined or null, else `false`.
 */
 export function isDef (val: any): boolean {
    return val === undefined || val === null
}

/**
 * Checks if `value` is an empty object, collection, map, or set.
 * @param {any} val 
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 */
export function isEmpty (val: any): boolean {
    return val === undefined || val === null 
    || typeof val === 'number' && val == 0 
    || typeof val === 'boolean' && val === false 
    || typeof val === 'string' && val.length === 0 
    || Object.prototype.toString.call(val) === '[object Array]' && val.length === 0 
    || Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val).length === 0 
    || Object.prototype.toString.call(val) === '[object Set]' && val.size === 0 
    || Object.prototype.toString.call(val) === '[object Map]' && val.size === 0 
    || false
}



