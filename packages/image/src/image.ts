export const imageProps = {
    // 图片路径
    src: {
        type: String,
        required: true
    },
    // 图片原生alt属性
    alt: String,
    // 图片原生title属性
    title: String,
    // 图片显示方式
    fit: String,
    // 是否开启懒加载
    lazy: Boolean,
    // 图片宽度
    width: [Number, String],
    // 图片高度
    height: [Number, String],
    // 圆角大小
    radius: [Number, String],
}
