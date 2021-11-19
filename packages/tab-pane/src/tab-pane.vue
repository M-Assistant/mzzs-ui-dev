<template>
    <div class="mzzs-tab-pane">
        <slot/>
    </div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { defineComponent } from 'vue'

export default defineComponent({
    name: useComponentName('TabPane'),
    props: {
        // 标题
        title: String,
        // 标签名称，作为匹配的标识符
        name: null,
        // 是否禁用标签
        disabled: Boolean,
        // 图标右上角徽标的内容
        badge: [Number, String, Boolean],
        // 标签是否可关闭
        closable: Boolean,
        // 标签是否延迟渲染
        lazy: Boolean,
        // 自定义标题样式
        titleStyle: null,
        // 自定义标题类名
        titleClass: null
    },
    setup() {
        
    }
})
</script>
