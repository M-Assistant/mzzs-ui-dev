<template>
    <div ref="root" class="mzzs-color--hue-slider">
        <div class="mzzs-color--hue-slider-bar"></div>
        <div 
            ref="thumb"
            class="mzzs-color--hue-slider-thumb clickable"
            :style="{
                left: cursor.left + 'px',
                top: cursor.top + 'px'
            }"
        ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, onBeforeMount, onMounted, reactive, ref } from 'vue'
import Color from '@/utils/color'
import { useRect } from '@/use'
import { addDraggableListener, removeDraggableListener } from '@/utils/draggable'
import { colorOnchange, colorValue } from '../color-picker'

export default defineComponent({
    props: {
        vertical: Boolean
    },
    setup(props) {
        // const value = inject(colorValue)
        const onchange = inject(colorOnchange)

        const root = ref<HTMLElement>()
        const thumb = ref<HTMLElement>()
        const cursor = reactive({
            left: 0,
            top: 0
        })

        const handleDrag = (e: Event) => {
            if (root.value) {
                const el = root.value
                const rect = useRect(el)

                let top = 0, left = 0
                let hue = 0
                if (props.vertical) {

                    top = (e as MouseEvent).clientY - rect.top
                    top = Math.max(0, Math.min(top, rect.height))
                    cursor.top = top - (thumb.value?.offsetHeight || 0) / 2

                    hue = Math.round(top / rect.height * 360)

                } else {

                    left = (e as MouseEvent).clientX - rect.left
                    left = Math.max(0, Math.min(left, rect.width))
                    cursor.left = left - (thumb.value?.offsetWidth || 0) / 2

                    hue = Math.round(left / rect.width * 360)

                }

                onchange && onchange(hue)
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
            cursor
        }
    },
})
</script>
