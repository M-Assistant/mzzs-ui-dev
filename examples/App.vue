<template>
    <div class="test">
        <h5>Layout 布局测试</h5>

        <p>基础用法</p>
        <mzzs-row>
            <mzzs-col span="8">span：8</mzzs-col>
            <mzzs-col span="8">span：8</mzzs-col>
            <mzzs-col span="8">span：8</mzzs-col>
        </mzzs-row>
        <mzzs-row>
            <mzzs-col span="4">span：4</mzzs-col>
            <mzzs-col span="10" offset="4">offset：4，span：10</mzzs-col>
        </mzzs-row>

        <p>增加间距</p>
        <mzzs-row gutter="20" @click="onRowClick">
            <mzzs-col span="8" @click="onColClick">span：8</mzzs-col>
            <mzzs-col span="8">span：8</mzzs-col>
            <mzzs-col span="8">span：8</mzzs-col>
        </mzzs-row>
    </div>
    
    <div class="test">
        <h5>Image 测试</h5>

        <p>基础用法</p>
        <mzzs-image lazy class="test-image" :src="src" width="100" height="100" radius="50%" fit="cover" @click="onChangeImg"/>
    </div>


    <div class="test">
        <h5>Avatar 测试</h5>

        <p>基础用法</p>
        <mzzs-avatar lazy class="test-avatar" size="80" radius="18" fit="cover">
            admin
        </mzzs-avatar>
    </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { Image },
    name: 'App',
    setup () {
        const src = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')

        // setTimeout(() => {
        //     src.value = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        // }, 10000)

        return {
            src,
            onRowClick: () => {
                console.log('row')
            },
            onColClick: () => {
                console.log('col')
            },
            onChangeImg: () => {
                src.value = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg2'
            }
        }
    }
})
</script>

<style lang="less">
html, body {
    font-size: 16px;
    margin: 0;
    padding: 0;
}
.test-image {
    width: 200px;
    height: 100px;
}
</style>
