# 布局组件 - Col
布局组件提供了 24列栅格，通过在 Col 上添加 span 属性设置列所占的宽度百分比。此外，添加 offset 属性可以设置列的偏移宽度，计算方式与 span 相同。

### Col Props
|参数|说明|类型|默认值|
|:-|:-|:-|:-|
|span|列元素宽度|`number` `string`|-|
|offset|列元素偏移距离|`number` `string`|-|
|order|Flex布局 order属性|`number` `string`|-|
|grow|Flex布局 flex-grow属性|`string`|-|
|shrink|Flex布局 flex-shrink属性|`string`|-|
|basis|Flex布局 flex-basis属性|`string`|-|
|align|Flex布局 align-self属性，可选值为 `start` `center` `end` `baseline` `stretch`|`string`|-|
|text-align|文本对齐方式，可选值为 `left` `center` `right`|`string`|-|
|tag|自定义元素标签|string|`div`|

### Col Events
|事件名|说明|回调参数|
|:-|:-|:-|
|click|点击时触发|`event: Event`|
