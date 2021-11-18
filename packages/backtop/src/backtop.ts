import { isNumeric } from "@/utils/validator"

export const backtopProps = {
    // 触发滚动的对象（默认window）
    target: String,
    // 滚动高度达到此参数值才出现
    visibilityHeight: {
        type: [Number, String],
        validator: (val: any) => {
            return isNumeric(val)
        },
        default: 200
    },
    // 滚动到顶部的时间（单位：ms）
    duration: {
        type: [Number, String],
        validator: (val: any) => {
            return isNumeric(val)
        },
        default: 500
    },
    // 控制其显示位置，距离页面右边距
    right: [Number, String],
    // 控制其显示位置，距离页面底部距离
    bottom: [Number, String]
}
