<template>
    <div class="mzzs-color">
        <div class="mzzs-color--main">
            <Panel/>
            <HueSlider/>
        </div>

        <slot name="alpha">
            <AlphaSlider/>
        </slot>

        <slot name="output">
            <Output/>
        </slot>
        
        <slot name="predefine">
            <Predefine/>
        </slot>

        <slot/>
    </div>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { defineComponent, ref } from 'vue'
import Panel from './components/panel.vue'
import HueSlider from './components/hue-slider.vue'
import AlphaSlider from './components/alpha-slider.vue'
import Output from './components/output.vue'
import Predefine from './components/predefine.vue'

export default defineComponent({
    name: useComponentName('ColorPicker'),
    components: {
        Panel,
        HueSlider,
        AlphaSlider,
        Output,
        Predefine
    },
    props: {
        // 选中项绑定值
        modelValue: String,
        // 是否禁用
        disabled: Boolean,
        // 尺寸
        size: String,
        // 是否支持透明度选择
        alpha: Boolean,
        // 写入 v-model 的颜色的格式
        colorFormat: String,
        // 预定义颜色
        predefine: Array
    },
    emits: ['update:modelValue', 'input', 'change'],
    setup() {
        
    },
})
</script>
