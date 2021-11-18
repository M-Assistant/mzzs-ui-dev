<script lang="ts">
import { useComponentName } from '@/use'
import { isNumeric } from '@/utils/validator'
import { computed, defineComponent, h, useSlots } from 'vue'
import { badgeProps } from './badge'

export default defineComponent({
    name: useComponentName('Badge'),
    props: badgeProps,
    render () {
        const slots = useSlots()
        const { content } = this
        const { dot } = this.$props
        let children = slots.default ? slots.default() : []

        if (children.length > 0) {
            return h('div', { class: 'mzzs-badge--wrapper' }, {
                default () {
                    const classList = ['mzzs-badge', 'mzzs-badge--fixed']
                    if (dot) {
                        classList.push('mzzs-badge--dot')
                    }

                    children.push(
                        h('div', { class: classList }, slots.content ? slots.content() : content)
                    )
                    return children
                }
            })
        }

        return h('div', { class: 'mzzs-badge' }, content)
    },
    setup(props) {
        const content = computed(() => {
            const { content, max } = props
            if (isNumeric(max) && isNumeric(content) && Number(content) > Number(max)) {
                return `${max}+`
            }
            return content
        })

        return {
            content
        }
    }
})
</script>
