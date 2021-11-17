<script lang="ts">
import { useComponentName } from '@/use'
import { formatCssSize } from '@/utils/format'
import { isDef } from '@/utils/validator'
import { computed, defineComponent, h, ref, useSlots, VNode } from 'vue'
import { avatarProps } from './avatar'

const enum AvatarSize {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small'
}

export default defineComponent({
    name: useComponentName('Avatar'),
    props: avatarProps,
    emits: ['error'],
    render () {
        const slots = useSlots()
        let children: VNode | VNode[] = slots.default ? slots.default() : []

        const { avatarClass, avatarStyle, error } = this
        const { tag, src, alt, title, fit } = this.$props
  
        if (src && !error) {
            children = h('img', {
                src,
                alt, 
                title,
                style: { objectFit: fit },
                onError: this.handleError
            })
        }

        return h(tag, { class: avatarClass, style: avatarStyle }, children)
    },
    setup (props) {
        const error = ref(false)

        const avatarClass = computed(() => {
            const classList = ['mzzs-avatar']
            const { size } = props

            if (!isDef(size)) {
                switch (size) {
                    case AvatarSize.LARGE: 
                    case AvatarSize.MEDIUM:
                    case AvatarSize.SMALL:
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
                switch (size) {
                    case AvatarSize.LARGE: break;
                    case AvatarSize.MEDIUM: break;
                    case AvatarSize.SMALL: break;
                    default:
                        style.width = style.height = style.lineHeight = formatCssSize(size)   
                }
            }

            return style
        })

        const handleError = (e: string | Event) => {
            error.value = true
        }

        return {
            error,
            avatarClass,
            avatarStyle,
            handleError
        }
    }
})
</script>
