<template>
    <component :is="tag" :class="colClass" :style="colStyle" @click="$emit('click', $event)">
        <slot/>
    </component>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { isDef } from '@/utils/validator'
import { computed, defineComponent } from 'vue'
import { colProps } from './col'


export default defineComponent({
    name: useComponentName('Col'),
    props: colProps,
    emits: ['click'],
    setup(props) {
        const colClass = computed(() => {
            const classList = ['mzzs-col']
            const { span, offset, align, textAlign } = props

            if (!isDef(span)) {
                classList.push(`mzzs-col--${span}`)
            }
            if (!isDef(offset)) {
                classList.push(`mzzs-col--offset-${offset}`)
            }
            if (!isDef(align)) {
                classList.push(`mzzs-col--align-${align}`)
            }
            if (!isDef(textAlign)) {
                classList.push(`mzzs-col--text-align-${textAlign}`)
            }

            return classList
        })

        const colStyle = computed(() => {
            const style: Record<string, any> = {}
            const { order, grow, shrink, basis } = props

            if (!isDef(order)) {
                style.order = order
            }
            if (!isDef(grow)) {
                style.flexGrow = grow
            }
            if (!isDef(shrink)) {
                style.flexShrink = shrink
            }
            if (!isDef(basis)) {
                style.flexBasis = basis
            }

            return style
        })        

        return {
            colClass,
            colStyle
        }
    }
})
</script>
