# 布局组件 - Row

### Row Props
|参数|说明|类型|默认值|
|:-|:-|:-|:-|
|gutter|列元素之间的间距（单位为 px）|`number` `string`|-|
|direction|Flex主轴排列方向，可选值为 `row` `row-reverse` `column` `column-reverse`|`string`|-|
|wrap|Flex主轴行为，可选值为 `no` `reverse` |`string`|-|
|justify|Flex 主轴对齐方式，可选值为 `start` `center` `end` `around` `between`|`string`|-|
|align-items|Flex 主轴对齐方式，可选值为 `start` `center` `end` `baseline` `stretch`|`string`|-|
|align-content|Flex 主轴对齐方式，可选值为 `start` `center` `end` `around` `between` `stretch`|`string`|-|
|tag|自定义元素标签|string|`div`|

### Row Events
|事件名|说明|回调参数|
|:-|:-|:-|
|click|点击时触发|`event: Event`|
