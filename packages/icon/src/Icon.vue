<template>
    <component
        :is="tag" 
        :class="iconClass" 
        :style="{ 
            color, 
            fontSize: isLink ? undefined : fontSize,
            transform: rotate === undefined ? undefined : `rotate(${rotate}deg)`
        }">
        <img v-if="isLink" :class="`${classPrefix}__image`" :src="name" :style="{ width: fontSize, height: fontSize }"/>
    </component>
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { isURL } from '@/utils/validator'
import { formatCssSize } from '@/utils/format'
import { computed, defineComponent } from 'vue'
import { iconProps } from './icon'

export default defineComponent({
    name: useComponentName('Icon'),
    props: iconProps,
    setup (props) {        
        const isLink = computed(() => isURL(props.name))
        const fontSize = computed(() => formatCssSize(props.size))
        const iconClass = computed(() => {
            const { classPrefix, name } = props
            const classList = [ classPrefix ]
            if (!isLink.value) {
                classList.push(classPrefix + '--' + name)
            }
            return classList
        })
        
        return {
            isLink,
            iconClass,
            fontSize
        }
    }
})
</script>
