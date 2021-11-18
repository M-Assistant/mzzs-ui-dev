export const avatarSize = ['large', 'medium', 'small']

export const avatarProps = {
    // 图片路径
    src: String,
    // 图片原生alt属性
    alt: String,
    // 图片原生title属性
    title: String,
    // 图片显示方式。可选值：fill / contain / cover / none / scale-down
    fit: String,
    // 图片大小。可选值：number / string / large / medium / small
    size: [Number, String],
    // 图片圆角
    radius: [Number, String],
    // 自定义标签
    tag: {
        type: String,
        default: 'span'
    }
}
