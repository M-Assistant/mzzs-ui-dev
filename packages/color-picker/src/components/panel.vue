<template>
    <div ref="root" class="mzzs-color--svpanel" :style="{ backgroundColor: panelColor }">
        <div class="mzzs-color--svpanel-white"></div>
        <div class="mzzs-color--svpanel-black"></div>
        <div class="mzzs-color--svpanel-cursor" :style="{ left: `${cursor.left}px`, top: `${cursor.top}px` }"></div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { addDraggableListener, removeDraggableListener } from '@/utils/draggable'
import Color from '@/utils/color'
import { useRect } from '@/use'
import { colorOnchange, colorValue } from '../color-picker'

export default defineComponent({
    setup() {
        
        const color = inject(colorValue)
        const onchange = inject(colorOnchange)

        const root = ref<HTMLElement>()
        const cursor = reactive({
            left: 0,
            top: 0
        })
        
        const panelColor = computed(() => {
            if (color) {
                const { h } = color
                return `hsl(${h}, 100%, 50%)`
            }
        })

        const handleDrag = (e: Event) => {
            if (root.value) {
                const el = root.value
                const rect = useRect(el)

                let left = (e as MouseEvent).clientX - rect.left
                let top = (e as MouseEvent).clientY - rect.top
                left = Math.max(0, Math.min(left, rect.width))
                top = Math.max(0, Math.min(top, rect.height))

                cursor.left = left
                cursor.top = top

                const s = left / rect.width * 100
                const l = 100 - top / rect.height * 100
                onchange && onchange(undefined, s, l)
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
            cursor,
            color,
            panelColor
        }
    },
})
</script>
