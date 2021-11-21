<!-- TODO: 必须重构，且拆分成多个组件完成。请参考 color -->

<script lang="ts">
import { Done, TabsProps } from '@/types'
import { useComponentName, useRect } from '@/use'
import { getStyle } from '@/utils/dom'
import { standardizedWheel } from '@/utils/scroll'
import { computed, defineComponent, h, nextTick, onMounted, onBeforeUnmount, ref, useSlots, watch, reactive, VNode } from 'vue'
import { renderTabsContent, renderTabsHeader, useComputedNavRect, navRect } from './tabs'

export default defineComponent({
    name: useComponentName('Tabs'),
    props: {
        modelValue: null,
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
        // 线厚度
        lineStrokeWidth: [Number, String],
        
        // 线高度
        lineHeight: [Number, String],
        titleActiveColor: String,
        titleInactiveColor: String,
        closable: Boolean,
        // 切换标签之前的钩子函数，若返回 false  或者返回被 reject 的 Promise，则阻止切换。
        beforeChange: {
            type: Function,
            default: (n: any, o: any, done: Done) => done(true)
        }
    },
    emits: ['update:modelValue', 'click', 'change'],
    render () {
        const { type, tabPosition } = this.$props

        const slots = useSlots()
        let children = slots.default ? slots.default() : []

        return h(
            'div', 
            {
                class: ['mzzs-tabs', `mzzs-tabs--${type}`, `mzzs-tabs--${tabPosition}`]
            }, 
            {
                default: () => {
                    return [
                        renderTabsHeader(this, children),
                        renderTabsContent(this, children)
                    ]
                }
            }
        )
    },
    setup(props, { emit }) {
        const nav = ref<HTMLElement>()
        const navScroll = ref<HTMLElement>()
        

        const isActive = ref<any>(props.modelValue)
        const lineStyle = reactive<{ width?: string, transform?: string }>({
            width: undefined,
            transform: undefined
        })


        const maxTranslateX = (el: Element) => {
            const { tabPosition } = props
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

        const handleClick = (i: number, name: any, title: string, childSlots?: VNode) => {
            const { type, tabPosition, beforeChange } = props
            // 正常触发 click 事件
            emit('click', name, title)
            // 当标签被改变后，触发 change 事件
            if (name !== isActive.value) {
                beforeChange(name, isActive.value, (res?: boolean) => {
                    if (res !== false) {
                        isActive.value = name
                        emit('change', name, title)

                        // 移动 line 位置
                        if (type === 'line' && nav.value) {                               
                            const rect = useComputedNavRect(nav.value).children[i]
                            if (['top', 'bottom'].includes(tabPosition)) {
                                lineStyle.width = `${rect.contentWidth}px`
                                lineStyle.transform = `translateX(${(rect.offsetX || 0) + rect.paddingLeft}px)`
                            } else {
                                lineStyle.width = `${rect.contentHeight}px`
                                lineStyle.transform = `translateY(${(rect.offsetY || 0) + rect.paddingTop}px)`
                            }
                            console.log(lineStyle)
                        }
                    }
                })
            }
        }


        // nextTick(() => {
        //     if (nav.value) {
        //         navRect = useComputedNavRect(nav.value, props.type === 'line')
        //     }
        // })

        const translateX = ref(0)

        

        const onMouseWheel = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()

            const wheelEvent = standardizedWheel(e)
            if (navScroll.value) {
                const el = navScroll.value
                if (el.firstElementChild) {
                    const nav = el.firstElementChild
                    const max = maxTranslateX(nav)
                    if (max  > 0) {
                        translateX.value =  Math.max(0, Math.min(translateX.value  - wheelEvent.deltaY * 10, max))
                    }
                }
            }
        }
    

        return {
            nav,
            navScroll,
            isActive,
            lineStyle,
            translateX,
            handleClick,
            onMouseWheel
        }

    }
})
</script>
