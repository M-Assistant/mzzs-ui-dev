<template>
    <span v-if="show" ref="root" :class="tagClass" @click="handlerClick">
        <slot/>
        <component v-if="closeable" :is="iconComponent" name="close" class="clickable" @click="handlerClose"/>
    </span>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { setStyleProperty } from '@/utils/dom'
import { formatCssSize } from '@/utils/format'
import { isDef } from '@/utils/validator'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { tagProps } from './tag'
import MzzsIcon from '@/icon'

export default defineComponent({
    name: useComponentName('Tag'),
    props: tagProps,
    emits: ['click', 'close'],
    setup(props, { emit }) {
        const root = ref<HTMLElement>()
        const show = ref(true)

        const tagClass = computed(() => {
            const classList = ['mzzs-tag']
            const { type, size, plain } = props
            if (!isDef(type)) {
                classList.push(`mzzs-tag--${type}`)
            }
            if (!isDef(size)) {
                classList.push(`mzzs-tag--${size}`)
            }
            if (plain) {
                classList.push('is-plain')
            }
            return classList
        })

        const handlerClick = (e: PointerEvent) => {
            emit('click', e)
        }

        const handlerClose = () => {
            show.value = false
            emit('close')
        }

        watchEffect(() => {
            if (root.value) {
                const { color, textColor, radius, plain } = props
                if (plain) {
                    setStyleProperty(root.value, {
                        '--tag-font-color': { value: textColor || color },
                        '--tag-border-color': { value: textColor || color },
                        '--tag-border-radius': { value: radius, format: formatCssSize },
                    })
                } else {
                    setStyleProperty(root.value, {
                        '--tag-font-color': { value: textColor },
                        '--tag-background-color': { value: color },
                        '--tag-border-color': { value: color },
                        '--tag-border-radius': { value: radius, format: formatCssSize },
                    })
                }
            }
        })

        return {
            iconComponent: MzzsIcon.name,
            root,
            show,
            tagClass,
            handlerClick,
            handlerClose
        }
    },
})
</script>
