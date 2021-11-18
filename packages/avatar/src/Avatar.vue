<script lang="ts">
import { useComponentName } from '@/use'
import { formatCssSize } from '@/utils/format'
import { isDef } from '@/utils/validator'
import { computed, defineComponent, h, ref, useSlots } from 'vue'
import { avatarSize, avatarProps } from './avatar'


export default defineComponent({
    name: useComponentName('Avatar'),
    props: avatarProps,
    emits: ['error'],
    render () {
        const slots = useSlots()
        const { avatarClass, avatarStyle, error, handleError } = this
        const { tag, src, alt, title, fit } = this.$props

        return h(tag, { class: avatarClass, style: avatarStyle }, {
            default () {
                if (src && !error) {
                    return [h('img', {
                        src,
                        alt, 
                        title,
                        style: { objectFit: fit },
                        onError: handleError
                    })]
                }
                return slots.default ? slots.default() : []
            }
        })
    },
    setup (props) {
        const avatarClass = computed(() => {
            const classList = ['mzzs-avatar']
            const { size } = props

            if (!isDef(size)) {
                if (typeof size === 'string' && avatarSize.includes(size)) {
                    classList.push(`mzzs-avatar--${size}`)
                }
            }

            return classList
        })

        const avatarStyle = computed(() => {
            const { size, radius } = props
            const style: Record<string, any> =  {
                borderRadius: formatCssSize(radius)
            }
            
            if (!isDef(size)) {
                if (typeof size !== 'string' || !avatarSize.includes(size)) {
                    style.width = style.height = style.lineHeight = formatCssSize(size)
                }
            }

            return style
        })

        const error = ref(false)

        const handleError = () => {
            error.value = true
        }

        return {
            avatarClass,
            avatarStyle,
            error,
            handleError
        }
    }
})
</script>
