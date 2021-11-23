<!--<template>
    <div class="mzzs-collapse" :class="{ 'is-vertical': vertical }">
        <slot/>
    </div>
</template>-->

<script lang="ts">
import { useComponentName } from '@/use'
import { isArray, isDef } from '@/utils/validator'
import { computed, defineComponent, h, provide, reactive, ref, useSlots, watch, watchEffect } from 'vue'
import CollapseItem from '@/collapse-item'
import { collapseValue, collapseOnchange } from './collapse'

export default defineComponent({
    name: useComponentName('Collapse'),
    props: {
        // 当前展开面板的 name
        // 非数组即 手风琴模式
        modelValue: {
            type: [Number, String, Array],
            required: true
        },
        // 是否开启手风琴模式
        // accordion: Boolean,
        // 垂直模式
        vertical: Boolean,
        // 是否显示外边框
        border: Boolean
    },
    emits: ['update:modelValue', 'change'],
    render() {
        return h('div', { class: this.collapseClass }, this.$slots)
    },
    setup(props, { emit }) {

        const collapseClass = computed(() => {
            const classList = ['mzzs-collapse']
            if (props.vertical) {
                classList.push('is-vertical')
            }
            if (props.border) {
                classList.push('mzzs-collapse--border')
            }
            return classList
        })

        const active = ref<number | string | any[] | null>(props.modelValue)
        watch(() => props.modelValue, val => {
            active.value = val
        })

        const onchange = (val: any, isOpen: boolean) => {
            let _tmp: number | string | any[] | null
            console.log(active.value, isOpen)
            if (isArray(active.value)) {
                // 数组模式下，可多展开
                _tmp = [...active.value]
                const i = _tmp.indexOf(val)
                if (isOpen && i === -1) {
                    _tmp.push(val)
                } else if (!isOpen && i > -1) {
                    _tmp.splice(i, 1)
                }
            } else {
                // 手风琴模式下，永远只有一个被打开
                _tmp = active.value
                if (isOpen && _tmp !== val) {
                    _tmp = val
                } else if (!isOpen && _tmp === val) {
                    _tmp = null
                }
            }

            console.log(_tmp)
            emit('update:modelValue', _tmp)
            emit('change', _tmp)
        }

        provide(collapseValue, active)
        provide(collapseOnchange, onchange)

        return {
            active,
            collapseClass
        }
    },
})
</script>
