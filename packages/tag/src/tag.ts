export const tagProps = {
    // 类型，可选值为primary success danger warning info
    type: {
        type: String,
        validator (val: string) {
            return ['primary', 'success', 'danger', 'warning', 'info'].includes(val)
        }
    },
    // 大小, 可选值为large medium small(默认)
    size: {
        type: String,
        validator (val: string) {
            return ['large', 'medium'].includes(val)
        }
    },
    // 标签颜色
    color: String,
    // 按钮圆角
    radius: [Number, String],
    // 是否为朴素标签
    plain: Boolean,
    // 文本颜色，优先级高于color属性
    textColor: String,
    // 是否为可关闭标签
    closeable: Boolean
}