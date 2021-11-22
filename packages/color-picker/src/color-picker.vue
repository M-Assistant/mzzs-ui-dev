<template>
    <div class="mzzs-color">
        <div class="mzzs-color--main">
            <Panel/>
            <HueSlider :vertical="true"/>
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
import { defineComponent, provide, reactive, ref } from 'vue'
import Panel from './components/panel.vue'
import HueSlider from './components/hue-slider.vue'
import AlphaSlider from './components/alpha-slider.vue'
import Output from './components/output.vue'
import Predefine from './components/predefine.vue'
import Color from '@/utils/color'
import { colorOnchange, colorValue } from './color-picker'

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
        const color = ref(new Color())

        const value = reactive({
            h: 0,
            s: 0,
            l: 0,
            a: 1
        })

        const onChange = (h?: number, s?: number, l?: number, a?: number) => {
            if (h !== undefined) {
                value.h = h
            }
            if (s !== undefined) {
                value.s = s
            }
            if (l !== undefined) {
                value.l = l
            }
            if (a !== undefined) {
                value.a = a
            }
        }

        provide(colorValue, value)
        provide(colorOnchange, onChange)

        return {
            color
        }
    },
})
</script>
