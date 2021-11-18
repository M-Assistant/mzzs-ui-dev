export const buttonProps = {
    // 类型
    type: {
        type: String,
        validator (val: string) {
            return ['primary', 'success', 'warning', 'danger', 'info', 'text'].includes(val)
        }
    },
    // 按钮图标
    icon: String,
    // 内容布局
    layout: {
        type: String,
        validator (val: string) {
            return ['row', 'row-reverse', 'column', 'column-reverse'].includes(val)
        }
    },
    // 是否为朴素按钮
    plain: Boolean,
    // 是否为块级元素
    block: Boolean,
    // 是否正在加载
    loading: Boolean,
    // 是否禁用按钮
    disabled: Boolean,
    // 按钮圆角
    radius: [Number, String],
    // 按钮颜色
    color: String,
    // 选中后的按钮颜色
    activedColor: String,
    // 按钮字体颜色
    textColor: String,
    // 选中后的字体颜色
    activedTextColor: String,
    // 键盘按键
    keyboard: [String, Array],
    // HTML 标签
    tag: {
        type: String,
        default: 'button'
    }
}
