<template>
    <div ref="root" class="mzzs-scroll" :style="scrollStyle">
        <div class="mzzs-scroll--view">
            <slot/>
        </div>
        <div class="mzzs-scroll--horizontal-bar"></div>
        <div class="mzzs-scroll--vertical-bar"></div>
    </div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { formatCssSize } from '@/utils/format'
import { isNumber, isNumeric } from '@/utils/validator'
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import Scroll from './scroll'

export default defineComponent({
    name: useComponentName('Scroll'),
    props: {
        width: [Number, String],
        height: [Number, String],
        maxWidth: [Number, String],
        maxHeight: [Number, String],
        // 是否允许横向滚动
        scrollX: Boolean,
        // 是否允许纵向滚动
        scrollY: Boolean,
        // 是否显示滚动条
        scrollbars: Boolean,
        // 是否允许拖动滚动条
        interactive: Boolean,
        // 是否开启无限滚动
        infinite: Boolean,
        // 不使用滚动条时是否隐藏
        fade: Boolean,
        // 鼠标滚轮速度
        mouseWheelSpeed: {
            type: [Number, String],
            validator: (val: number | string) => {
                return isNumeric(val)
            },
            default: 20
        },
        // 起始滚动点
        startX: Number,
        startY: Number,
    },
    setup(props) {
        const root = ref<HTMLElement>()
        
        const prototype = reactive({
            x: 0,
            y: 0,
            directionX: 0,
            directionY: 0
        })

        const scrollStyle = computed(() => {
            const { width, height, maxWidth, maxHeight } = props
            return {
                width: formatCssSize(width),
                height: formatCssSize(height),
                maxWidth: formatCssSize(maxWidth),
                maxHeight: formatCssSize(maxHeight),
            }
        })


        let scroll: Scroll
        onMounted(() => {
            if (root.value) {
                scroll = new Scroll(root.value)
            }
        })

        onBeforeUnmount(() => {
            scroll && scroll.destory()
        })

        return {
            root,
            scrollStyle
        }
    },
})
</script>
