export const overlayProps = {
    // 是否展示遮罩层
    show: Boolean,
    // 是否锁定背景滚动
    lockScroll: {
        type: Boolean,
        default: true
    },
    // z-index 层级
    zIndex: [Number, String],
    // teleport 挂载位置
    position: String,
    // 自定义类名
    overlayClass: [String, Array, Object],
    // 自定义样式
    overlayStyle: Object
}