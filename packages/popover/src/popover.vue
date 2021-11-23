<template>
    <teleport :to="to">
        <transition
            :name="transition"
            @after-enter="$emit('opened')"
            @after-leave="$emit('closed')">
            <div v-show="show" ref="root" class="mzzs-popover" :data-popper-placement="placement" :style="position">
                <div class="mzzs-popover--arrow"></div>
                <div class="mzzs-popover--content">
                    <slot>{{ content }}</slot>
                </div>
            </div>
        </transition>
    </teleport>
    <div ref="wrapper" class="mzzs-popover--wrapper">
        <slot name="reference"/>
    </div>
</template>

<script lang="ts">
import { useComponentName, useRect } from '@/use'
import { getDomBox } from '@/utils/dom'
import { on, off } from '@/utils/event'
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'


export default defineComponent({
    name: useComponentName('Popover'),
    props: {
        // 是否展示气泡弹出层
        modelValue: Boolean,
        // 弹出位置
        placement: String,
        // 触发方式，可选值为 click、hover、focus
        trigger: {
            type: String,
            default: 'click'
        },
        // 是否在点击外部元素后关闭菜单
        closeOnClickOutside: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: 'fade-in-linear'
        },
        // 指定挂载的节点
        to: {
            type: String,
            default: 'body'
        }
    },
    emits: ['open', 'opened', 'close', 'closed', 'update:modelValue'],
    setup(props, { emit }) {
        const root = ref<HTMLElement>()
        const wrapper = ref<HTMLElement>()

        const show = computed({
            set(val: boolean) {
                emit('update:modelValue', val)
                emit(val ? 'open' : 'close')
            },
            get(): boolean {
                return props.modelValue
            }
        })

        const position = computed(() => {
            if (wrapper.value) {
                console.log(getDomBox(wrapper.value.firstElementChild as HTMLElement))
                const el = wrapper.value
                const rect = useRect(el)
                
                return {
                    left: `${rect.left}px`,
                    top: `${rect.top + rect.height + 6}px`
                }
            }
            return {}
        })

        const doToggle = () => {
            show.value = !show.value
        }
        const doShow = () => {
            show.value = true
        }
        const doClose = () => {
            show.value = false
        }
        const handleDocumentClick = (e: Event) => {
            if (root.value && wrapper.value) {
                const el = wrapper.value
                const poper = root.value
                const target = e.target as HTMLElement | null

                // 不允许点击外部进行关闭
                if (!props.closeOnClickOutside) {
                    return
                }
                if (target && (el.contains(target) || poper.contains(target))) return

                show.value = false
            }
        }
    

        onMounted(() => {
            if (root.value && wrapper.value) {
                const el = wrapper.value
                const poper = root.value

                switch(props.trigger) {
                    case 'click':
                        on(el, 'click', doToggle)
                        on(document, 'click', handleDocumentClick)
                        break
                    case 'hover':
                        on(el, 'mouseenter', doShow)
                        on(el, 'mouseleave', doClose)
                        on(poper, 'mouseenter', doShow)
                        on(poper, 'mouseleave', doClose)
                        break
                    case 'focus':
                        on(el, 'focusin', doShow)
                        on(el, 'focusout', doClose)
                }
            }
        })

        onBeforeUnmount(() => {
            if (root.value && wrapper.value) {
                const el = wrapper.value
                const poper = root.value

                off(el, 'click', doToggle)
                off(document, 'click', handleDocumentClick)
                off(el, 'mouseenter', doShow)
                off(el, 'mouseleave', doClose)
                off(poper, 'mouseenter', doShow)
                off(poper, 'mouseleave', doClose)
                off(el, 'focusin', doShow)
                off(el, 'focusout', doClose)
            }
        })

        return {
            root,
            wrapper,
            position,
            show
        }
    },
})
</script>
