<template>
    
</template>

<script lang="ts">
import { useComponentName } from '@/use'
import { defineComponent } from 'vue'

export default defineComponent({
    name: useComponentName('TabGroup'),
    props: {
        modelValue: [Number, String],
        lineWidth: [Number, String],
        lineHeight: [Number, String],
        titleActiveColor: String,
        titleInactiveColor: String,
        beforeChange: Function
    },
    setup() {
        
    },
})
</script>
