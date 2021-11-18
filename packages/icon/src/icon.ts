export const iconProps = {
    // 图标名称
    name: {
        type: String,
        required: true
    },
    // 自定义图标前缀
    classPrefix: {
        type: String,
        default: 'mzzs-icon'
    },
    // 图标颜色
    color: String,
    // 图标大小，如 20px 2em，默认单位为px
    size: [Number, String],
    // 旋转角度
    rotate: [Number, String],
    // HTML 标签
    tag: {
        type: String,
        default: 'i'
    }
}