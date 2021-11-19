import { App } from 'vue'
import Row from './row'
import Col from './col'
import Image from './image'
import Avatar from './avatar'
import Overlay from './overlay'
import LazyRender from './lazy-render'
import Icon from './icon'
import Button from './button'
import Tag from './tag'
import Badge from './badge'
import Backtop from './backtop'
import Tabs from './tabs'
import TabPane from './tab-pane'

const components = [
    Row,
    Col,
    Image,
    Avatar,
    Overlay,
    LazyRender,
    Icon,
    Button,
    Tag,
    Badge,
    Backtop,
    Tabs,
    TabPane
]


let installed = false
const install = (app: App) => {
    if (installed) return

    // 注册全局组件
    components.map(v => {
        app.component(v.name, v)
    })

    installed = true
}


// 判断是否直接引入文件
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
    // @ts-ignore
    install(window.Vue)
}

export default {
    install,
    ...components
}
