import { MzzsUIComponent } from './compenents'

export type ColAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type ColTextAlign = 'left' | 'center' | 'right'

export declare class MzzsCol extends MzzsUIComponent {
    // 列元素宽度 1~24
    span?: number | string

    // 列元素偏移距离 1-24
    offset?: number | string

    // order: 属性定义项目的排列顺序
    order?: number | string

    // flex-grow: 属性定义项目的放大比例
    grow?: number | string

    // flex-shrink: 属性定义了项目的缩小比例
    shrink?: number | string

    // flex-basis: 分配多余空间之前，项目占据的主轴空间
    basis?: number | string

    // align-self: 属性允许单个项目有与其他项目不一样的对齐方式
    align?: ColAlign

    // text-align: 文本排列方式
    textAlign?: ColTextAlign

    // 自定义元素标签
    tag: string
}
