<script lang="ts">
import { useComponentName } from '@/use'
import { h, useSlots, computed, defineComponent } from 'vue'
import { rowProps } from './row'

export default defineComponent({
    name: useComponentName('Row'),
    props: rowProps,
    emits: ['click'],
    render () {
        // 获取子节点
        const slots = useSlots()
        let children = slots.default ? slots.default() : []

        // 增加子节点间隔
        const { tag, gutter } = this.$props
        const space = Number(gutter)
        if (space) {
            const half = space / 2
            const end = children.length - 1
            children = children.map((v, i) => {
                return h(v, {
                    style: {
                        paddingLeft:  i !== 0   ? `${half}px` : undefined,
                        paddingRight: i !== end ? `${half}px` : undefined,
                    }
                })
            })
        }
        
        // 渲染
        return h(tag, { 
            class: this.rowClass, 
            onClick: (e: Event) => this.$emit('click', e) 
        }, children)
    },
    setup(props) {
        const rowClass = computed(() => {
            const classList = ['mzzs-row']
            const { direction, wrap, alignItems, alignContent, justify } = props

            if (direction) {
                classList.push(`mzzs-row--direction-${direction}`)
            }
            if (wrap) {
                classList.push(`mzzs-row--wrap-${wrap}`)
            }
            if (justify) {
                classList.push(`mzzs-row--justify-${justify}`)
            }
            if (alignItems) {
                classList.push(`mzzs-row--align-items-${alignItems}`)
            }
            if (alignContent) {
                classList.push(`mzzs-row--align-content-${alignContent}`)
            }

            return classList
        })

        return {
            rowClass
        }
    }
})
</script>
