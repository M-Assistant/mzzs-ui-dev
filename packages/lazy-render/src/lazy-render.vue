<!--<template>
    <div>222222</div>
</template>-->

<script lang="ts">
import { useComponentName } from '@/use'
import { defineComponent, h, nextTick, onMounted, onUnmounted, ref, toRefs, useSlots } from 'vue'
import { observe, unobserve } from '@/utils/observe'

export default defineComponent({
    name: useComponentName('LazyRender'),
    inheritAttrs: false,
    props: {
        to: [String, Element],
        disabled: Boolean
    },
    render () {
        // 获取子节点
        const slots = useSlots()
        let children = slots.default ? slots.default() : []

        const { to, disabled } = this.$props

        if (!to || disabled) {
            return children
        } else {
            return h('div', {
                id: this.id,
                style: {
                    display: 'none'
                }
            }, children)
        }
    },
    setup(props) {
        
        let container: Element
        const children: ChildNode[] = []
        const id = `mzzs-lazy-render--${Date.now()}`
        const isRender = ref(false)

        const renderTo = (el: string | Element, duration: number) => {
            const timer = setInterval(() => {
                console.log('查询节点')

                if (typeof el === 'string') {
                    const element = document.querySelector(el)
                    if (element) {
                        el = element
                    }
                }

                if (el instanceof Element) {
                    container = el
                    clearInterval(timer)

                    // 在指定的节点挂载
                    const render = document.getElementById(id)
                    console.log('render', render)
                    if (render) {
                        while (render.childNodes.length > 0) {
                            const node = render.childNodes[0]
                            // 转移节点
                            container.insertBefore(node, null)
                            // 记录节点
                            children.push(node)
                        }
                        console.log(children)
                        // 删除临时节点
                        render.parentNode?.removeChild(render)

                        isRender.value = true
                    }
                }
            }, duration)
        }

        // 移除节点
        if (process.env !== 'production') {
            onUnmounted(() => {
                console.log('写在组件')
                for(const node of children) {
                    container.removeChild(node)
                }
                children.length = 0
            })
        }

        nextTick(() => {
            console.log('租价更新')
        })
        
        console.log(222)
        props.to && renderTo(props.to, 100)
        // onMounted(() => {
        //     console.log('重新渲染')
            
        // })


        return {
            id,
            isRender
        }

    }
})
</script>
