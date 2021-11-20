<template>
    <div :class="cellClass">
        <div class="mzzs-cell--wrapper">
            <div class="mzzs-cell--main">
                <!-- 自定义 左侧 内容 -->
                <slot name="left">
                    <component v-if="icon" class="mzzs-cell--left" :is="iconComponent" :class-prefix="iconPrefix" :name="icon" />
                </slot>

                <!-- 自定义 title 内容 -->
                <div class="mzzs-cell--title" :class="titleClass" v-if="title !== undefined">
                    <slot name="title">
                        <span v-if="required" class="mzzs-cell--required">*</span>
                        <span>{{ title }}</span>
                    </slot>
                </div>

                <!-- 自定义 label 内容 -->
                <div class="mzzs-cell--value">
                    <slot>
                        <span>{{ value }}</span>
                    </slot>
                </div>

                <!-- 自定义 右侧 内容 -->
                <slot name="right">
                    <component v-if="isLink" class="mzzs-cell--right" :is="iconComponent" :name="`arrow-${arrowDirection}`" />
                </slot>
            </div>
            <slot name="label">
                <div class="mzzs-cell--label" :class="labelClass" v-if="label !== undefined">{{ label }}</div>
            </slot>
        </div>

        <!-- 自定义右侧内容 -->
        <slot name="extra"></slot>
    </div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { computed, defineComponent } from 'vue'
import { cellProps } from './cell'
import MzzsIcon from '@/icon' 

export default defineComponent({
    name: useComponentName('Cell'),
    components: {
        MzzsIcon
    },
    props: cellProps,
    setup(props) {
        const cellClass = computed(() => {
            const classList = ['mzzs-cell']
            const { size, border, center, clickable, isLink } = props

            if (size) {
                classList.push(`mzzs-cell--${size}`)
            }
            if (border) {
                classList.push('mzzs-cell--border')
            }
            if (center) {
                classList.push('mzzs-cell--center')
            }
            if (clickable || isLink) {
                classList.push('clickable')
            }

            return classList
        })

        return {
            iconComponent: MzzsIcon.name,
            cellClass
        }
    }
})
</script>
