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

/**
 * Checks if `value` is an number.
 * @param {any} val 
 * @returns {boolean} Returns `true` if `value` is number, else `false`.
 */
 export function isNumeric (val: any): boolean {
    if (isDef(val)) return false
    else if (typeof val === 'string') return /^-?\d+(\.\d+)?$/.test(val)
    else if (typeof val === 'number') return true
    else return false
}

/**
 * Checks if `value` is an string.
 * @param {any} val 
 * @returns {boolean}
 */
 export function isString (val: any): val is string {
    return typeof val === 'string'
}


/**
 * Checks if `value` is an array.
 * @param {any} val 
 * @returns {boolean}
 */
export function isArray (val: any): val is any[] {
    return Object.prototype.toString.call(val) === '[object Array]'
}

/**
 * Checks if `value` is an key<=>val object.
 * @param {any} val 
 * @returns {boolean}
 */
export function isObject (val: any): val is Record<number|string, any> {
    return Object.prototype.toString.call(val) === '[object Object]'
}

/**
 * Checks if `value` is an url.
 * @param {any} val 
 * @returns {boolean}
 */
export function isURL (val: any): boolean {
    if (typeof val === 'string') return /^https?:\/\/.*/.test(val)
    else return false
}

/**
 * Checks if `value` is an percentage.
 * @param val 
 * @returns 
 */
 export const isPercentage = function(val: any) {
    return typeof val === 'string' && val.endsWith('%')
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
export const isOnePointZero = function(val: any) {

    return typeof val === 'string' && val.indexOf('.') !== -1 && parseFloat(val) === 1;
}