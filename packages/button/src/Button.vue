<template>
    <component ref="root" :is="tag" :class="buttonClass" @click="handlerClick">
        <component class="mzzs-button__inner" justify="center" align-items="center" :is="rowComponent" :direction="layout">
            <slot name="prefix">
                <component v-if="icon" :is="iconComponent" :name="icon"/>
            </slot>
            
            <span class="mzzs-button__text">
                <slot/>
            </span>

            <slot name="suffix" class="mzzs-button__suffix-icon"/>
        </component>
    </component>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { formatCssSize } from '@/utils/format'
import { setStyleProperty } from '@/utils/dom'
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { buttonProps } from './button'
import MzzsRow from '@/row'
import MzzsIcon from '@/icon'

export default defineComponent({
    name: useComponentName('Button'),
    components: {
        MzzsRow,
        MzzsIcon
    },
    props: buttonProps,
    emits: ['click', 'keydown'],
    setup (props, { emit }) {
        const root = ref<HTMLElement>()

        const buttonClass = computed(() => {
            const classList = ['mzzs-button', 'clickable']
            const { type, plain, block, loading, disabled } = props

            if (type) {
                classList.push(`mzzs-button--${type}`)
            }
            if (plain) {
                classList.push('is-plain')
            }
            if (block) {
                classList.push('is-block')
            }
            if (loading) {
                classList.push('is-loading')
            }
            if (disabled) {
                classList.push('is-disabled')
            }

            return classList
        })

        // 图标
        const icon = computed(() => props.loading ? 'loading' : props.icon)
        
        const handlerClick = (e: PointerEvent) => {
            if (props.disabled || props.loading) {
                return
            }
            emit('click', e)
        }

        // const onKeydown = (e: Event) => {
        //     if (e.type === 'keydown') {
        //         let { keyboard } = props
        //         if (typeof keyboard === 'string') {
        //             keyboard = [ keyboard ]
        //         }

        //         const { key, ctrlKey, shiftKey, altKey, metaKey, isComposing } = (e as KeyboardEvent)
        //         if (isComposing) {
        //             return
        //         }

        //         keyboard?.every(v => {
        //             return (v === 'ctrl' && ctrlKey) 
        //             || (v === 'shift' && shiftKey)
        //             || (v === 'alt' && altKey)
        //             || (v === 'meta' && metaKey)
        //             || (v.toLowerCase() === key.toLowerCase())
        //         }) && emit('keydown', e as KeyboardEvent)
        //     }
        // }

        // onMounted(() => {
        //     if (!isEmpty(props.keyboard)) {
        //         useAddEventCallback('keyboard', onKeydown)
        //     }
        // })

        // onBeforeUnmount(() => {
        //     if (!isEmpty(props.keyboard)) {
        //         useRemoveEventCallback('keyboard', onKeydown)
        //     }
        // })

        watchEffect(() => {
            if (root.value) {
                const { color, activedColor, textColor, activedTextColor, radius } = props
                setStyleProperty(root.value, {
                    '--button-color': { value: color },
                    '--button-actived-color': { value: activedColor },
                    '--button-text-color': { value: textColor },
                    '--button-actived-text-color': { value: activedTextColor },
                    '--button-border-radius': { value: radius, format: formatCssSize },
                })
            }
        })

        return {
            rowComponent: MzzsRow.name,
            iconComponent: MzzsIcon.name,
            root,
            buttonClass,
            icon,
            handlerClick
        }
    }
})
</script>
