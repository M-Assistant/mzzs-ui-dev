import { isRef, Ref } from "vue"
import { isDef } from "./utils/validator"

/**
 * 获取组件名称
 * @param key 
 * @returns 
 */
 export function useComponentName(key: string) {
    return 'Mzzs' + key
}

export function useRect(element: Element | Ref<Element | undefined>): DOMRect {
    if (isRef(element) && !isDef(element.value)) {
        return useRect(element.value as HTMLElement)
    } else if (element instanceof Element) {
        return element.getBoundingClientRect()
    }
    return document.body.getBoundingClientRect()
}

