<template>
    <div ref="root" class="mzzs-color--svpanel" :style="{ backgroundColor: panelColor }">
        <div class="mzzs-color--svpanel-white"></div>
        <div class="mzzs-color--svpanel-black"></div>
        <div class="mzzs-color--svpanel-cursor" :style="{ left: `${cursor.left}px`, top: `${cursor.top}px` }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { addDraggableListener, removeDraggableListener } from '@/utils/draggable'
import { useRect } from '@/use'

export default defineComponent({
    setup() {
        const root = ref<HTMLElement>()
        const cursor = reactive({
            left: 0,
            top: 0
        })
        const panelColor = ref('rgb(255, 69, 0)')

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

                // this.color.set({
                // saturation: left / rect.width * 100,
                // value: 100 - top / rect.height * 100
                // });
            }


            
        }

        onMounted(() => {
            if (root.value) {
                const config = {
                    drag: (e: Event) => handleDrag(e),
                    end: (e: Event) => {}
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
            panelColor
        }
    },
})
</script>
