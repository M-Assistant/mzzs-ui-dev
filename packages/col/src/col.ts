import { ColAlign, ColTextAlign } from "@/types"

export const colProps = {
    // 列元素宽度 1~24
    span: [Number, String],
    // 列元素偏移距离 1-24
    offset: [Number, String],
    // order: 属性定义项目的排列顺序
    order: [Number, String],
    // flex-grow: 属性定义项目的放大比例
    grow: [Number, String],
    // flex-shrink: 属性定义了项目的缩小比例
    shrink: [Number, String],
    // flex-basis: 分配多余空间之前，项目占据的主轴空间
    basis: [Number, String],
    // align-self: 属性允许单个项目有与其他项目不一样的对齐方式
    align: String as ColAlign,
    // text-align: 文本排列方式
    textAlign: String as ColTextAlign,
    // 自定义元素标签
    tag: {
        type: String,
        default: 'div'
    }
}
