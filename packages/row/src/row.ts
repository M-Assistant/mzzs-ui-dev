export const rowProps = {
    // 列元素之间的间距（单位：px）
    gutter: [Number, String],
    // flex-direction 属性决定主轴的方向（即项目的排列方向）
    direction: String,
    // flex-wrap属性定义，轴线排列方式
    wrap: String,
    // justify-content属性定义了项目在主轴上的对齐方式
    justify: String,
    // align-items属性定义项目在交叉轴上如何对齐
    alignItems: String,
    // align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
    alignContent: String,
    // 标签名
    tag: {
        type: String,
        default: 'div'
    }
}
