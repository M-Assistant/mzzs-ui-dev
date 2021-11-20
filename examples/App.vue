<template>
    <div class="test">
        <h5>cell 测试</h5>

        <p>基础用法</p>
        <div class="demo-cell">
            <mzzs-cell title="标题" value="内容"/>
            <mzzs-cell title="标题" value="内容" is-link/>
            <mzzs-cell title="标题" value="内容" required is-link/>
            <mzzs-cell title="标题" value="内容" arrow-direction="left" is-link/>
            <mzzs-cell title="标题" value="内容" arrow-direction="up" is-link/>
            <mzzs-cell title="标题" value="内容" arrow-direction="down" is-link/>
            <mzzs-cell title="标题" value="内容" icon="search" arrow-direction="down" is-link/>
            <mzzs-cell title="标题" value="内容" center label="内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息"/>
            <mzzs-cell title="标题" value="内容" label="内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息" size="large"/>
            <mzzs-cell title="标题" value="内容" label="内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息" size="medium" />
            <mzzs-cell title="标题" value="内容描述信息描述信息描述信息描述信息" label="内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息"/>
            <mzzs-cell title="标题" center value="内容描述信息描述信息描述信息描述信息" label="内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息内容描述信息描述信息描述信息描述信息"/>
        </div>
    </div>

    <div class="test">
        <h5>tabs、tab-pane 测试</h5>

        <p>基础用法</p>
        <div class="demo-tab">
            <mzzs-tabs v-model="activeName" @click="handleClick" :before-change="handleBeforeChange">
                <mzzs-tab-pane title="User" name="first">
                    <template #title>
                        <span>User</span>
                    </template>
                    User
                </mzzs-tab-pane>
                <mzzs-tab-pane title="Config" name="second">Config</mzzs-tab-pane>
                <mzzs-tab-pane title="Role" name="third">Role</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth1">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth2">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth3">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth4">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth5">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth6">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth7">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth8">Task</mzzs-tab-pane>
                <mzzs-tab-pane title="Task" name="fourth9">Task</mzzs-tab-pane>
            </mzzs-tabs>
        </div>
    </div>

    <div class="test">
        <h5>backtop 测试</h5>

        <p>基础用法</p>
        <div class="demo">
            <mzzs-backtop right="40" bottom="40"/>
            <mzzs-backtop target=".demo-scroll" right="40" bottom="100" visibility-height="100">
                <mzzs-icon name="search"/>
            </mzzs-backtop>
        </div>
        <div class="demo-scroll">
            <p v-for="i in 20" :key="i">{{ i + 1 }}</p>
        </div>
    </div>

    <div class="test">
        <h5>badge 测试</h5>

        <p>基础用法</p>
        <div class="demo">
            <mzzs-badge content="5">
                <div class="child"></div>
            </mzzs-badge>
            <mzzs-badge content="100">
                <div class="child"></div>
            </mzzs-badge>
            <mzzs-badge content="Hot">
                <div class="child"></div>
            </mzzs-badge>
            <mzzs-badge dot>
                <div class="child"></div>
            </mzzs-badge>
        </div>
        <div class="demo">
            <mzzs-badge content="5">
                <div class="child"></div>
            </mzzs-badge>
            <mzzs-badge content="100" max="99">
                <div class="child"></div>
            </mzzs-badge>
            <mzzs-badge content="Hot">
                <div class="child"></div>
            </mzzs-badge>
            <mzzs-badge dot>
                <div class="child"></div>
            </mzzs-badge>
        </div>
        <div class="demo">
            <mzzs-badge content="5">
            
            </mzzs-badge>
            <mzzs-badge content="100" max="99">
            
            </mzzs-badge>
            <mzzs-badge content="Hot">

            </mzzs-badge>
        </div>
    </div>

    <div class="test">
        <h5>tag 测试</h5>

        <p>基础用法</p>
        <div>
            <mzzs-tag>标签</mzzs-tag>
            <mzzs-tag type="primary">标签</mzzs-tag>
            <mzzs-tag type="success">标签</mzzs-tag>
            <mzzs-tag type="danger">标签</mzzs-tag>
            <mzzs-tag type="warning">标签</mzzs-tag>
            <mzzs-tag type="info">标签</mzzs-tag>
        </div>
        <div>
            <mzzs-tag plain>标签</mzzs-tag>
            <mzzs-tag plain type="primary">标签</mzzs-tag>
            <mzzs-tag plain type="success">标签</mzzs-tag>
            <mzzs-tag plain type="danger">标签</mzzs-tag>
            <mzzs-tag plain type="warning">标签</mzzs-tag>
            <mzzs-tag plain type="info">标签</mzzs-tag>
        </div>
        <div>
            <mzzs-tag>标签</mzzs-tag>
            <mzzs-tag radius="10" size="large">标签</mzzs-tag>
            <mzzs-tag size="medium">标签</mzzs-tag>
        </div>
        <div>
            <mzzs-tag color="#7232dd" text-color="#ffffff">标签</mzzs-tag>
            <mzzs-tag color="#ffe1e1" text-color="#ad0000">标签</mzzs-tag>
            <mzzs-tag color="#7232dd" plain>标签</mzzs-tag>
        </div>
        <div>
            <mzzs-tag closeable>标签</mzzs-tag>
            <mzzs-tag closeable radius="10" size="large">标签</mzzs-tag>
            <mzzs-tag closeable size="medium">标签</mzzs-tag>
        </div>
    </div>

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
        <mzzs-avatar class="test-avatar" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" size="80" radius="18" fit="cover">
            admin
        </mzzs-avatar>
    </div>

    <div class="test">
        <h5>Overlay 测试</h5>

        <p>基础用法</p>
        <mzzs-overlay z-index="10" :show="show" @click="onCloseOverlay">
            admin
        </mzzs-overlay>

        <p>相对父节点</p>
        <div class="test-overlay" id="test-overlay">
            <mzzs-overlay :lock-scroll="false" position="absolute" z-index="10" :show="show2" @click="onCloseOverlay"/>
        </div>
    </div>

    <div class="test">
        <h5>icon 测试</h5>

        <p>基础用法</p>
        <mzzs-icon name="search"/>
        <mzzs-icon name="loading"/>
        <mzzs-icon name="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" size="100" rotate="50"/>

    </div>

    <div class="test">
        <h5>icon 测试</h5>

        <p>基础用法</p>
        <mzzs-row>
            <mzzs-button>按钮</mzzs-button>
            <mzzs-button type="primary">按钮</mzzs-button>
            <mzzs-button type="success">按钮</mzzs-button>
            <mzzs-button type="info">按钮</mzzs-button>
            <mzzs-button type="warning">按钮</mzzs-button>
            <mzzs-button type="danger">按钮</mzzs-button>
            <mzzs-button>中文</mzzs-button>
        </mzzs-row>

        <mzzs-row>
            <mzzs-button plain>按钮</mzzs-button>
            <mzzs-button plain type="primary">按钮</mzzs-button>
            <mzzs-button plain type="success">按钮</mzzs-button>
            <mzzs-button plain type="info">按钮</mzzs-button>
            <mzzs-button plain type="warning">按钮</mzzs-button>
            <mzzs-button plain type="danger">按钮</mzzs-button>
            <mzzs-button plain>中文</mzzs-button>
        </mzzs-row>

        <mzzs-row>
            <mzzs-button disabled>按钮</mzzs-button>
            <mzzs-button disabled type="primary">按钮</mzzs-button>
            <mzzs-button disabled type="success">按钮</mzzs-button>
            <mzzs-button disabled type="info">按钮</mzzs-button>
            <mzzs-button disabled type="warning">按钮</mzzs-button>
            <mzzs-button disabled type="danger">按钮</mzzs-button>
            <mzzs-button disabled>中文</mzzs-button>
        </mzzs-row>

        <mzzs-row>
            <mzzs-button loading>按钮</mzzs-button>
            <mzzs-button loading type="primary">按钮</mzzs-button>
            <mzzs-button loading type="success">按钮</mzzs-button>
            <mzzs-button loading type="info">按钮</mzzs-button>
            <mzzs-button loading type="warning">按钮</mzzs-button>
            <mzzs-button loading type="danger">按钮</mzzs-button>
            <mzzs-button loading>中文</mzzs-button>
        </mzzs-row>

        <mzzs-row>
            <mzzs-button icon="search" layout="row">按钮</mzzs-button>
            <mzzs-button icon="search" layout="row-reverse">按钮</mzzs-button>
            <mzzs-button icon="search" layout="column">按钮</mzzs-button>
            <mzzs-button icon="search" layout="column-reverse">按钮</mzzs-button>
        </mzzs-row>
    </div>



    <div style="padding-top: 300px"></div>
</template>

<script lang="ts">
import { Done } from '@/types'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { Image },
    name: 'App',
    setup () {
        const show = ref(false)
        const show2 = ref(true)
        const show3 = ref(true)
        
        const src = ref('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')

        const activeName = ref('first')

        // setTimeout(() => {
        //     show3.value = false
        // }, 3000)

        // setTimeout(() => {
        //     show3.value = false
        // }, 4000)

        // setTimeout(() => {
        //     show3.value = true
        // }, 5000)

        // setTimeout(() => {
        //     src.value = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        // }, 10000)

        return {
            src,
            show,
            show2,
            show3,
            activeName,
            handleBeforeChange: (a: any, b :any, done: Done) => {
                console.log(a, b)
                done(true)
            },
            handleClick: (a: any, b: any) => {
                console.log(a, b)
            },
            onCloseOverlay: (e: PointerEvent) => {
                show.value = false
                show2.value = false
            },
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
.test-overlay {
    position: relative;
    width: 300px;
    height: 400px;
    background: green;
}
.child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
}
.demo .mzzs-badge--wrapper {
    margin-left: 17px;
}
.demo-scroll {
    height: 200px;
    overflow: auto;
}
.demo-tab {
    width: 500px;
    height: 400px;
}
.demo-cell {
    width: 500px;
    padding: 10px;
    background: #DDDDDD;
}
</style>
