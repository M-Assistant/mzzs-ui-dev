import { ComponentClass, DomRectDetail, FormatFunction } from '@/types'
import { trim } from './format'
import { isArray, isObject } from './validator'

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

/* istanbul ignore next */
const camelCase = function(name: string) {
    return name.replace(
        SPECIAL_CHARS_REGEXP, 
        function(_, separator, letter, offset) {
            return offset ? letter.toUpperCase() : letter
        }
    ).replace(MOZ_HACK_REGEXP, 'Moz$1')
}
  

/**
 * 获取父节点
 * @param el 
 * @returns 
 */
export function getParentElement(el: HTMLElement) {
    if (!el.parentElement) {
        return document.body
    }
    return el.parentElement
}

// export function getStyle(el: Element, styleName: string) {
//     // @ts-ignore
//     if(el.currentStyle) {
//         // @ts-ignore
//         return el.currentStyle[styleName];
//     } else {
//         return getComputedStyle(el, null)[styleName];
//     }
// }

/* istanbul ignore next */
export function getStyle(el: HTMLElement, styleName: any) {
    styleName = camelCase(styleName)
    if (styleName === 'float') {
      styleName = 'cssFloat'
    }

    try {
      var computed = document.defaultView?.getComputedStyle(el, '')
      return el.style[styleName] || (computed ? computed[styleName] : null)
    } catch (e) {
      return el.style[styleName]
    }
}


/**
 * 合并 class
 * @param origin 
 * @param other_class 
 * @returns 
 */
export function mergeClass(origin: ComponentClass, ...other_class: string[]) {
    if (origin === undefined) {
        origin = other_class.join(' ')
    } if (typeof origin === 'string') {
        origin = trim(origin + ' ' + other_class.join(' '))
    } else if (isArray(origin)) {
        for (let i = 0; i < other_class.length; ++i) {
            const clsName: string = other_class[i]
            if (clsName === '') continue

            if ((origin as string[]).indexOf(clsName) === -1) {
                (origin as string[]).push(clsName)
            }
        }
    } else if (isObject(origin)) {
        for (let i = 0; i < other_class.length; ++i) {
            const clsName: string = other_class[i]
            if (clsName === '') continue

            (origin as Record<string, boolean>)[clsName] = true
        }
    }
    return origin
}


/**
 * 判断 class 是否存在
 * @param {HTMLElement | undefined} el 
 * @param {string}cls 
 * @returns {boolean}
 */
export function hasClass(el: HTMLElement | undefined, cls: string): boolean {
    if (!el) return false

    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
}

/**
 * 添加 class
 * @param {HTMLElement | undefined} el 
 * @param {string}cls 
 * @returns 
 */
export function addClass(el: HTMLElement | undefined, cls: string) {
    if (!el) return

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
 * @param {HTMLElement | undefined} el 
 * @param {string}cls 
 * @returns 
 */
export function removeClass(el: HTMLElement | undefined, cls: string) {
    if (!el) return

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


export function setStyleProperty(el: HTMLElement, style: Record<string, { value: any, format?: FormatFunction<any, any> }>) {
    Object.keys(style).forEach((key: string) => {
        const item = style[key]
        let val = item.value
        if (typeof item.format === 'function') {
            val = item.format(val)
        }

        if (val === undefined || val === null) {
            el.style.removeProperty(key)
        } else {
            el.style.setProperty(key, val)
        }
    })
}

export function removeStyleProperty() {

}

export function getDomRectDetail(el: HTMLElement): DomRectDetail {
    const rect = el.getBoundingClientRect()
    const paddingLeft   = Number((getStyle(el, 'padding-left') || '0').replace('px', ''))
    const paddingRight  = Number((getStyle(el, 'padding-right') || '0').replace('px', ''))
    const paddingTop    = Number((getStyle(el, 'padding-top') || '0').replace('px', ''))
    const paddingBottom = Number((getStyle(el, 'padding-bottom') || '0').replace('px', ''))
    const rectDetail = {
        x: rect.x,
        y: rect.y,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        contentWidth: rect.width - paddingLeft - paddingRight,
        contentHeight: rect.height - paddingTop - paddingBottom,
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

