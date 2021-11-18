<template>
    <div></div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { defineComponent } from 'vue'

export default defineComponent({
    name: useComponentName('Tab'),
    props: {
        // 标题
        title: String,
        // 是否禁用标签
        disabled: Boolean,
        // 图标右上角徽标的内容
        badge: [Number, String, Boolean],
        // 标签名称，作为匹配的标识符
        name: [Number, String],
        // 自定义标题样式
        titleStyle: null,
        // 自定义标题类名
        titleClass: null
    },
    setup() {
        
    },
})
</script>
