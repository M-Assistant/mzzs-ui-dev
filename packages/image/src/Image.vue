<template>
    <div class="mzzs-image" ref="root" :style="imageStyle">
        <slot v-if="loading" name="placeholder">
            <div class="mzzs-image--placeholder">加载中</div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="mzzs-image--error">加载失败</div>
        </slot>
        <img v-else v-bind="$attrs" :alt="alt" :title="title" :src="src" :style="{ objectFit: fit }"/>
    </div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { ref, defineComponent, onMounted, watchEffect, onUnmounted, computed } from 'vue'
import { observe, unobserve } from '@/utils/observe'
import { formatCssSize } from '@/utils/format'
import { imageProps } from './image'

export default defineComponent({
    name: useComponentName('Image'),
    props: imageProps,
    emits: ['load', 'error'],
    setup (props, { emit }) {
        const root = ref<Element>()
        const loading = ref(true)
        const error = ref(false)
        const show = ref(!props.lazy)

        let prevSrc = ''

        const imageStyle = computed(() => {
            return {
                width: formatCssSize(props.width),
                height: formatCssSize(props.height),
                borderRadius: formatCssSize(props.radius)
            }
        })

        const loadImage = () => {
            // 重置状态
            loading.value = true
            error.value = false

            // 创建 image 对象，加载图片
            const img = new Image()
            img.onload  = e => handleLoad(e)
            img.onerror = e => handleError(e)
            img.src = prevSrc = props.src || ''
        }

        const handleLoad = (e: Event) => {
            loading.value = false
            error.value = false
            emit('load', e)
        }

        const handleError = (e: string | Event) => {
            loading.value = false
            error.value = true
            emit('error', e)
        }

        const handleLazyLoad = (el: Element) => {
            observe(el, entry => {
                show.value = entry.intersectionRatio > 0
            })
        }

        // 显示图片的情况：
        // 1. 不需要懒加载图片
        // 2. 需要懒加载图片时，会先注册观察对象。当图片出现再屏幕时，再加载图片
        // 3. 当懒加载被开启时，图片滚动到屏幕外，且src属性被修改后，只有图片出现到屏幕时，才会加载图片（只对加载失败/加载中有效）
        watchEffect(() => {
            if (show.value && props.src !== prevSrc) {
                loadImage()
            }
        })

        // 组件挂载后，观察对象
        onMounted(() => {
            if (props.lazy) {
                root.value && handleLazyLoad(root.value)
            }
        })

        // 组件移除后，取消观察
        onUnmounted(() => {
            if (root.value && props.lazy) {
                unobserve(root.value)
            }
        })

        return {
            root,
            loading,
            error,
            imageStyle
        }
    }
})
</script>
