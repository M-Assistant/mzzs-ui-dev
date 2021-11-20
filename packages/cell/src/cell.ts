export const cellProps = {
    // 左侧标题
    title: [Number, String],
    // 右侧内容
    value: [Number, String],
    // 标题下方的描述信息
    label: [Number, String],
    // 单元格大小，可选值为 large medium small(默认)
    size: {
        type: String,
        validator: (val: string) => {
            return ['large', 'medium', 'small'].includes(val)
        },
        default: 'small'
    },
    // 是否显示表单必填星号
    required: Boolean,
    // 是否显示内边框
    border: {
        type: Boolean,
        default: true
    },
    // 是否使内容垂直居中
    center: Boolean,
    // 点击后跳转的链接地址
    url: String,
    // 点击后跳转的目标路由对象，同 vue-router 的 to 属性
    to: [String, Object],
    // 是否在跳转时替换当前页面历史
    replace: Boolean,
    // 是否开启点击反馈
    clickable: Boolean,
    // 是否展示右侧箭头并开启点击反馈
    isLink: Boolean,
    // 左侧图标名称或图片链接
    icon: String,
    // 图标类名前缀，同 Icon 组件的 class-prefix 属性
    iconPrefix: String,
    // 箭头方向，可选值为 left up down right（默认）
    arrowDirection: {
        type: String,
        validator: (val: string) => {
            return ['up', 'right', 'down', 'left'].includes(val)
        },
        default: 'right'
    },
    // 左侧标题额外类名
    titleClass: null,
    // 右侧内容额外类名
    valueClass: null,
    // 描述信息额外类名
    labelClass: null,
}
