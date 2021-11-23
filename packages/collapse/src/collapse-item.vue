<template>
    <div class="mzzs-collapse-item">
        <div class="mzzs-collapse-item--header" @click="handleClick">
            <div>
                <slot name="title">
                    <div class="mzzs-collapse-item--title">{{ title }}</div>
                </slot>
                <slot name="label">
                    <div class="mzzs-collapse-item--label">{{ label }}</div>
                </slot>
            </div>
            <slot name="title-icon">
                <i class="mzzs-icon mzzs-icon--arrow-right"></i>
            </slot>
        </div>
        <div v-show="active" ref="wrapper" class="mzzs-collapse-item--wrapper" :style="style">
            <div class="mzzs-collapse-item--content"><slot/></div>
        </div>
    </div>
</template>

<script lang="ts">
import { collapseOnchange, collapseValue } from './collapse'
import { useComponentName } from '@/use'
import { computed, defineComponent, inject, nextTick, onMounted, ref } from 'vue'
import { isArray } from '@/utils/validator'

export default defineComponent({
    name: useComponentName('CollapseItem'),
    props: {
        name: [Number, String],
        icon: String,
        size: String,
        title: String,
        label: String,
        border: Boolean,
        isLink: Boolean,
        disabled: Boolean,
        titleClass: null,
        labelClass: null,
    },
    setup(props) {
        // 原理：
        // 当 Dom 元素 height 为 0 时，scrollHeight 属性会保留元素的整体高度
        // 但是当 display 为 none 时，scrollHeight 值为 0

        const selected = inject(collapseValue)
        const onchange = inject(collapseOnchange)

        const wrapper = ref<HTMLElement>()
        const active = ref(false)

        const beforeHeight = ref(0)
        const handleClick = () => {
            active.value = !active.value
        
            if (wrapper.value) {
                const el = wrapper.value
                nextTick(() => {
                    beforeHeight.value = el.scrollHeight
                    console.log(el.scrollHeight)
                })
            }

            onchange && onchange(props.name, !isOpen.value)
        }

        const isOpen = computed(() => {
            if (selected) {
                return isArray(selected.value) 
                    ? selected.value.indexOf(props.name) > -1 
                    : selected.value === props.name
            }
            return false
        })

        const style = computed(() => {
            if (!active.value) {
                return { height: '0px' }
            }
            return { height: beforeHeight.value + 'px'}
        })

        const handleAfterEnter = () => {
            console.log('打开后')
        }
        const handleAfterLeave = () => {
            console.log('关闭后')
        }

        onMounted(() => {
            if (wrapper.value) {
                // const { clientHeight, offsetHeight, scrollHeight } = wrapper.value
                beforeHeight.value = wrapper.value.scrollHeight
                // console.log(clientHeight, offsetHeight, scrollHeight)
            }
        })

        return {
            wrapper,
            active,
            style,
            beforeHeight,
            handleClick,
            handleAfterEnter,
            handleAfterLeave
        }
    },
})
</script>
