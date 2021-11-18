<template>
    <div v-if="show" class="mzzs-backtop" :style="backtopStyle" @click="handlerClick">
        <slot>UP</slot>
    </div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { formatCssSize } from '@/utils/format'
import { formToSmooth } from '@/utils/scroll'
import { computed, defineComponent, nextTick, onBeforeUnmount, ref } from 'vue'
import { throttle } from 'lodash'
import { backtopProps } from './backtop'

export default defineComponent({
    name: useComponentName('Backtop'),
    props: backtopProps,
    emits: ['click'],
    setup(props, { emit }) {
        let target: typeof window | Element | null

        const show = ref(false)
        const backtopStyle = computed(() => {
            return {
                right: formatCssSize(props.right),
                bottom: formatCssSize(props.bottom)
            }
        })
        
        const handlerClick = (e: PointerEvent) => {
            if (show.value) {
                const duration = Number(props.duration)
                if (target instanceof Element) {
                    formToSmooth(target.scrollTop, 0, duration, val => {
                        (target as Element).scrollTop = val.to
                    })
                } else if (target === window) {
                    formToSmooth(target.scrollY, 0, duration, val => {
                        (target as typeof window).scrollTo(0, val.to)
                    })
                }
            }
            emit('click', e)
        }

        const handlerScroll = throttle((e: Event) => {
            let top = 0
            if (target instanceof Element) {
                top = target.scrollTop
            } else if (target === window) {
                top = target.scrollY
            }

            show.value = top > Number(props.visibilityHeight)
        }, 300)

        nextTick(() => {
            target = props.target ? document.querySelector(props.target) : window
            target && target.addEventListener('scroll', handlerScroll)
        })

        onBeforeUnmount(() => {
            target && target.removeEventListener('scroll', handlerScroll)
        })

        return {
            show,
            backtopStyle,
            handlerClick
        }
    },
})
</script>
