<template>
    <div 
        v-show="show" 
        class="overlay" 
        :class="overlayClass" 
        :style="{
            zIndex: zIndex,
            ...overlayStyle 
        }" 
        @click="$emit('click', $event)"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
import { KeyValue, OverlayProps } from '@/lib/types'
import { useComponentName } from '@/lib/use'
import { watchEffect, defineComponent, PropType } from 'vue'

export default defineComponent({
    name: useComponentName('overlay'),
    props: {
        // 	是否展示遮罩层
        show: Boolean,
        // z-index 层级
        zIndex: Number,
        // 是否锁定背景滚动
        lockScroll: {
            type: Boolean,
            default: true
        },
        // 自定义类名
        overlayClass: [String, Array, Object],
        // 自定义样式
        overlayStyle: Object as PropType<KeyValue>,
    },
    emits: [
        'click'
    ],
    setup (props: OverlayProps) {

        watchEffect(() => {
            if (props.lockScroll) {
                props.show 
                ? document.body.classList.add('no-scrolling')
                : document.body.classList.remove('no-scrolling')
            }
        })
        
    },
})
</script>
