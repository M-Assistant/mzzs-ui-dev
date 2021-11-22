<template>
    <div ref="root" class="mzzs-color--alpha-slider">
        <div class="mzzs-color--alpha-slider-bar" :style="{ background }"></div>
        <div 
            ref="thumb" 
            class="mzzs-color--alpha-slider-thumb clickable"
            :style="{
                left: cursor.left + 'px',
                top: cursor.top + 'px'
            }"
        ></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeMount, onMounted, reactive, ref  } from 'vue'
import Color from '@/utils/color'
import { useRect } from '@/use'
import { addDraggableListener, removeDraggableListener } from '@/utils/draggable'
import { colorOnchange, colorValue } from '../color-picker'

export default defineComponent({
    props: {
        vertical: Boolean
    },
    setup(props) {
        const color = inject(colorValue)
        const onchange = inject(colorOnchange)

        const bg = new Color()
        const root = ref<HTMLElement>()
        const thumb = ref<HTMLElement>()
        const cursor = reactive({
            left: 0,
            top: 0
        })

        const background = computed(() => {
            let { r, g, b } = bg.setCssHSL(color?.h || 0, color?.s || 0, color?.l || 0)
            r = (r * 255) >>> 0
            g = (g * 255) >>> 0
            b = (b * 255) >>> 0
            return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
        })

        const handleDrag = (e: Event) => {
            if (root.value) {
                const el = root.value
                const rect = useRect(el)

                let top = 0, left = 0
                let alpha = 0
                if (props.vertical) {

                    top = (e as MouseEvent).clientY - rect.top
                    top = Math.max(0, Math.min(top, rect.height))
                    cursor.top = top - (thumb.value?.offsetHeight || 0) / 2

                    alpha = Math.round(top / rect.height)

                } else {

                    left = (e as MouseEvent).clientX - rect.left
                    left = Math.max(0, Math.min(left, rect.width))
                    cursor.left = left - (thumb.value?.offsetWidth || 0) / 2

                    alpha = Math.round(left / rect.width)

                }

                onchange && onchange(undefined, undefined, undefined, alpha)
            }
        }

        onMounted(() => {
            if (root.value) {
                const config = {
                    drag: (e: Event) => handleDrag(e),
                    end: (e: Event) => handleDrag(e)
                }
                addDraggableListener(root.value, config)
            }
        })

        onBeforeMount(() => {
            if (root.value) {
                removeDraggableListener(root.value)
            }
        })

        return {
            root,
            thumb,
            cursor,
            background
        }
    },
})
</script>
