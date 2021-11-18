<template>
    <div 
        v-show="show" 
        class="mzzs-overlay" 
        :class="overlayClass" 
        :style="{ position, zIndex, ...overlayStyle }" 
        @click="$emit('click', $event)"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { addClass, hasClass, removeClass } from '@/utils/dom'
import { defineComponent, watchEffect } from 'vue'
import { overlayProps } from './overlay'


export default defineComponent({
    name: useComponentName('Overlay'),
    props: overlayProps,
    emits: ['click'],
    setup (props) {
        const setScrollLock = (el: HTMLElement) => {
            if (props.show) {
                if (props.lockScroll) {
                    addClass(el, 'no-scrolling')
                }
            } else {
                if (hasClass(el, 'no-scrolling')) {
                    removeClass(el, 'no-scrolling')
                }
            }
        }

        watchEffect(() => {
            setScrollLock(document.body)
        })
    }
})
</script>
