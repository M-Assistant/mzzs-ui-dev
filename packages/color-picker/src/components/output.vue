<template>
    <div class="mzzs-color--output">
        <component :is="iconComponent" class="clickable" title="复制" name="copy" @click="handleCopy"/>
        <div class="mzzs-color--output-content">
            <!-- class="mzzs-color--output-hex" -->
            <div v-show="mode === 1" class="mzzs-color--output-value">
                <div class="mzzs-color--input">
                    <input type="text"/>
                </div>
                <p>十六进制</p>
            </div>
            <div v-show="mode !== 1" class="mzzs-color--output-value">
                <div class="mzzs-color--output-input">
                    <input type="text"/>
                </div>
                <p>{{ mode === 2 ? 'R' : 'H' }}</p>
            </div>
            <div v-show="mode !== 1" class="mzzs-color--output-value">
                <div class="mzzs-color--output-input">
                    <input type="text"/>
                </div>
                <p>{{ mode === 2 ? 'G' : 'S' }}</p>
            </div>
            <div v-show="mode !== 1" class="mzzs-color--output-value">
                <div class="mzzs-color--output-input">
                    <input type="text"/>
                </div>
                <p>{{ mode === 2 ? 'B' : 'L' }}</p>
            </div>
            <div v-show="mode !== 1" class="mzzs-color--output-value">
                <div class="mzzs-color--output-input">
                    <input type="text"/>
                </div>
                <p>A</p>
            </div>
        </div>
        <component :is="iconComponent" class="clickable" title="切换" name="vertical-switch" @click="handleSwitchMode"/>
    </div>
    
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import MzzsIcon from '@/icon'

export default defineComponent({
    components: {
        MzzsIcon
    },
    setup() {
        const mode = ref(1)


        const handleCopy = () => {
            // 复制
        }

        const handleSwitchMode = () => {
            mode.value = Math.max(1, (mode.value + 1) % 4)
            console.log(mode.value)
        }

        return {
            mode,
            iconComponent: MzzsIcon.name,
            handleCopy,
            handleSwitchMode
        }   
    }
})
</script>
