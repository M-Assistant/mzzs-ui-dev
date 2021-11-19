import { h, VNode, VNodeNormalizedChildren } from 'vue'
import Tabs from './tabs.vue'
import TabPane from '@/tab-pane'
import { isDef, isObject } from '@/utils/validator'
import { DomRectDetail, TabsProps } from '@/types'
import { noop } from 'lodash'
import { getDomRectDetail, getStyle } from '@/utils/dom'
import { formatCssSize } from '@/utils/format'

export const tabsProps = {
    modelValue: [Number, String],
    type: {
        type: String,
        validator: (val: string) => {
            return ['line', 'card', 'border-card'].includes(val)
        },
        default: 'line'
    },
    tabPosition: {
        type: String,
        validator: (val: string) => {
            return ['top', 'right', 'bottom', 'left'].includes(val)
        },
        default: 'top'
    },
    // 线宽度
    lineWidth: [Number, String],
    // 线高度
    lineHeight: [Number, String],
    titleActiveColor: String,
    titleInactiveColor: String,
    closable: Boolean,
    // 切换标签之前的钩子函数，若返回 false  或者返回被 reject 的 Promise，则阻止切换。
    beforeChange: Function
}

interface childrenSlots {
    default?: (...arg: any[]) => any,
    title?: (...arg: any[]) => any,
}

export interface navRect {
    maxX: number
    maxY: number
    children: DomRectDetail[]
}







export function maxTranslateX(el: Element, tabPosition: string) {
    let max = 0
    if (el.scrollWidth > el.clientWidth) {
        if (['top', 'bottom'].includes(tabPosition)) {
            max = el.scrollWidth - el.clientWidth
        } else {
            max = el.scrollHeight - el.clientHeight
        }
    }
    return max
}

export function useComputedNavRect(nav: HTMLElement) {
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = nav
    const result: navRect = {
        maxX: scrollWidth - clientWidth,
        maxY: scrollHeight - clientHeight,
        children: []
    }

    let offsetX = 0, offsetY = 0
    for (let i = 0; i < nav.children.length; ++i) {
        if (i === 0) {
            continue
        }

        const child = nav.children[i] as HTMLElement
        const rect = getDomRectDetail(child)
        rect.offsetX = offsetX
        rect.offsetY = offsetY
        result.children.push(rect)

        offsetX += rect.width
        offsetY += rect.height
    }
    return result
}

export function tabIsVertical(tabPosition: string) {
    return ['left', 'right'].includes(tabPosition)
}




export function renderTabsHeader(instance: InstanceType<typeof Tabs>, slots: VNode[]) {
    
    const { isActive, lineStyle, handleClick } = instance
    const { type, lineStrokeWidth, tabPosition, beforeChange } = (instance.$props as TabsProps)

    const navs: VNode[] = []

    let index = 0
    for (let i = 0; i < slots.length; ++i) {
        const item = slots[i]
        if (item.type === TabPane) {
            const n = index
            let { title, name } = item.props || {}
            let children: string | VNode[] = title
            if (isDef(name)) {
                name = index
            }

            if (item.children) {
                const _slots = item.children as childrenSlots
                if (_slots.title) {
                    children = _slots.title({ title })
                }
            }

            navs.push(
                h(
                    'div', 
                    {
                        class: {
                            'mzzs-tabs__item': true,
                            'is-active': isActive === name
                        },
                        onClick: () => handleClick(n, name, title, item)
                    }, 
                    children
                )
            )
            ++index
        }
    }

    if (type === 'line') {
        const activeBarStyle: Record<string, any> = {
            width: lineStyle.width,
            height: formatCssSize(lineStrokeWidth),
            transform: lineStyle.transform,
        }
        if (tabIsVertical(tabPosition)) {
            activeBarStyle.width = formatCssSize(lineStrokeWidth)
            activeBarStyle.height = lineStyle.width
        }

        navs.unshift(
            h(
                'div', 
                { 
                    class: ['mzzs-tabs__active-bar'],
                    style: activeBarStyle
                }
            )
        )
    }

    return h(
        'div', 
        { class: 'mzzs-tabs__header'},
        h(
            'div', 
            { class: 'mzzs-tabs__nav-wrap'},
            h(
                'div', 
                { ref: 'navScroll', class: 'mzzs-tabs__nav-scroll', onMousewheel: instance.onMouseWheel },
                h(
                    'div', 
                    { 
                        ref: 'nav', 
                        class: 'mzzs-tabs__nav', 
                        style: {
                            transform: `translateX(-${instance.translateX}px)`
                        } 
                    }, 
                    navs
                )
            )
        )
    )
}

// that: InstanceType<typeof Tabs>
export function renderTabsContent(instance: InstanceType<typeof Tabs>, slots: VNode[]) {
    return h(
        'div',
        {
            class: ['mzzs-tabs__content']
        },
        {
            default() {
                const panes: VNode[] = []
                for (let i = 0; i < slots.length; ++i) {
                    const item = slots[i]
                    if (item.type === TabPane) {
                        panes.push(
                            // @ts-ignore
                            h('div', { class: ['mzzs-tabs-pane'] }, item.children.default ? item.children.default() : [])
                        )
                    }
                }
                return panes
            }
        }
    )
}
