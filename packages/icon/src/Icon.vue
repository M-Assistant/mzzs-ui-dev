<template>
    <component ref="root" :is="tag" :class="iconClass" >
        <img v-if="isLink" class="icon__image" :src="name"/>
    </component>
</template>

<script lang="ts">
import { IconProps } from '@/lib/types'
import { computed, defineComponent, watchEffect, ref } from 'vue'
import { FormatCssSize, isURL } from '@/lib/utils'
import { useComponentName } from '@/lib/use'
import { isDef } from '@/utils'

export default defineComponent({
    name: useComponentName('icon'),
    props: {
        // 图标名称
        name: {
            type: String,
            required: true
        },
        // 自定义图标前缀
        classPrefix: {
            type: String,
            default: 'icon'
        },
        // 图标颜色
        color: String,
        // 图标大小，如 20px 2em，默认单位为px
        size: [Number, String],
        // 旋转角度
        rotate: Number,
        // HTML 标签
        tag: {
            type: String,
            default: 'i'
        },
    },
    setup (props: IconProps) {
        const root = ref<HTMLElement>()
        
        const isLink = computed(() => isURL(props.name))
        const fontSize = computed(() => FormatCssSize(props.size))

        const iconClass = computed(() => {
            const { classPrefix, name } = props

            const classList = [ classPrefix ]

            if (!isLink.value) {
                classList.push(classPrefix + '-' + name)
            }

            return classList
        })

        watchEffect(() => {
            if (root.value) {
                const { color, size, rotate } = props
                if (!isDef(color)) {
                    root.value.style.setProperty('--icon-color', color || null)
                }
                if (!isDef(size)) {
                    root.value.style.setProperty('--icon-size', FormatCssSize(size))
                }
                if (!isDef(rotate)) {
                    root.value.style.setProperty('--icon-transform', `rotate(${rotate}deg)`)
                }
            }
        })
        
        return {
            root,
            isLink,
            iconClass,
            fontSize
        }
    }
})
</script>
