import { MzzsClass, DomRectDetail, MzzsFormatFn } from '@/types'
import { trim, camelCase, transformNumber } from './util'
import { isArray, isDef, isObject, isString } from './validator'

export declare interface DomBox {
    x: number
    y: number
    left: number
    right: number
    top: number
    bottom: number
    width: number
    height: number
    contentWidth: number
    contentHeight: number
    margin: number[]
    padding: number[]
    border: number[]
}


/**
 * 获取元素样式
 * @param {HTMLElement} el 
 * @param {any} styleName 
 * @returns {string|null}
 */
export function getStyle(el: HTMLElement, styleName: any) {
    styleName = camelCase(styleName)
    if (styleName === 'float') {
      styleName = 'cssFloat'
    }

    try {
      var computed = document.defaultView?.getComputedStyle(el, null)
      return el.style[styleName] || (computed ? computed[styleName] : null)
    } catch (e) {
      return el.style[styleName]
    }
}


/**
 * 设置元素 Property 样式
 * @param {HTMLElement} el 
 * @param {any} styleName 
 * @returns {string|null}
 */
export function setStyleProperty(el: HTMLElement, style: Record<string, { value: any, format?: MzzsFormatFn<any, any> }>) {
    Object.keys(style).forEach((key: string) => {
        const item = style[key]

        let val = item.value
        if (typeof item.format === 'function') {
            val = item.format(val)
        }

        if (isDef(val)) {
            el.style.removeProperty(key)
        } else {
            el.style.setProperty(key, val)
        }
    })
}


/**
 * 获取父节点
 * @param {HTMLElement} el 
 * @returns {HTMLElement|null}
 */
export function getParentElement(el: HTMLElement) {
    return el.parentElement
}


/**
 * 获取一个 dom 盒子对象
 * @param {HTMLElement} el 
 * @returns {DomBox}
 */
export function getDomBox(el: HTMLElement): DomBox {
    // 盒子对象包含如下属性：
    const { x, y, left, right, top, bottom, width, height } = el.getBoundingClientRect()
    const box = {
        x, y, left, right, top, bottom, width, height,
        contentWidth: 0,
        contentHeight: 0,
        border: [0, 0, 0, 0],
        margin: [0, 0, 0, 0],
        padding: [0, 0, 0, 0]
    }

    // 计算 外边距、内边距、边框
    for (const v of ['margin', 'padding', 'border']) {
        const style = getStyle(el, v === 'border' ? 'border-width' : v)?.split(' ')
        if (style && style.length > 0) {
            const _s = style.map(v => transformNumber(v))
            box[v][0] = _s[0]
            box[v][1] = _s[1] !== undefined ? _s[1] : box[v][0]
            box[v][2] = _s[2] !== undefined ? _s[2] : box[v][0]
            box[v][3] = _s[3] !== undefined ? _s[3] : box[v][1]
        }
    }

    // 计算内容宽高
    box.contentWidth  = width - box.padding[1] - box.padding[3] - box.border[1] - box.border[3]
    box.contentHeight = height - box.padding[0] - box.padding[2] - box.border[0] - box.border[2]

    return box
}


/**
 * 判断 class 是否存在
 * @param {HTMLElement} el 
 * @param {string} cls 
 * @returns {boolean}
 */
 export function hasClass(el?: HTMLElement, cls?: string): boolean {
    if (!el || !cls) return false

    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
}


/**
 * 添加 class
 * @param {HTMLElement} el 
 * @param {string} cls 
 * @returns 
 */
export function addClass(el?: HTMLElement, cls?: string) {
    if (!el || !cls) return

    let curClass = el.className
    const classes = cls.split(' ')

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i]
        if (clsName === '') continue

        if (el.classList) {
            el.classList.add(clsName)
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName
        }
    }

    if (!el.classList) {
        el.setAttribute('class', curClass)
    }
}


/**
 * 移除 class
 * @param {HTMLElement} el 
 * @param {string} cls 
 * @returns 
 */
export function removeClass(el?: HTMLElement, cls?: string) {
    if (!el || !cls) return

    let curClass = ' ' + el.className + ' '
    const classes = cls.split(' ')
    
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i]
        if (clsName === '') continue

        if (el.classList) {
            el.classList.remove(clsName)
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ')
        }
    }

    if (!el.classList) {
        el.setAttribute('class', trim(curClass))
    }
}


/**
 * 合并 class
 * @param {MzzsClass} origin 
 * @param {MzzsClass} classs 
 * @returns {MzzsClass}
 */
 export function mergeClass(origin: MzzsClass, classs: MzzsClass) {
    if (!origin) return classs
    
    if (isString(classs)) {
        
        if (isString(origin)) {
            return trim(origin + ' ' + classs)
        } else if (isArray(origin)) {
            if (origin.indexOf(classs) === -1) {
                origin.push(classs)
            }
        } else if (isObject(origin)) {
            origin[classs] = true
        }

    } else if (isArray(classs)) {

        classs.forEach(v => origin = mergeClass(origin, v))

    } else if (isObject(classs)) {

        Object.keys(classs).forEach(k => {
            if (classs[k] === true) {
                origin = mergeClass(origin, k)
            }
        })

    }

    return origin
}



























// 废弃
export function getDomRectDetail(el: HTMLElement): DomRectDetail {
    const { x, y, left, right, top, bottom, width, height } = el.getBoundingClientRect()
    const paddingLeft   = Number((getStyle(el, 'padding-left') || '0').replace('px', ''))
    const paddingRight  = Number((getStyle(el, 'padding-right') || '0').replace('px', ''))
    const paddingTop    = Number((getStyle(el, 'padding-top') || '0').replace('px', ''))
    const paddingBottom = Number((getStyle(el, 'padding-bottom') || '0').replace('px', ''))
    const rectDetail = {
        x, y, left, right, top, bottom, width, height,
        contentWidth: width - paddingLeft - paddingRight,
        contentHeight: height - paddingTop - paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom
    }

    return {
        ...rectDetail,
        toJSON: () => {
            return JSON.stringify(rectDetail)
        }
    }
}

