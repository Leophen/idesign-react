---
title: BackTop 回到顶部
---

返回页面顶部的操作按钮。

## 引入

```js
import {BackTop} from 'idesign';
```

## 基本用法

使用场景：

- 当页面内容区域比较长时；
- 当用户需要频繁返回顶部查看相关内容时。

```jsx live fffx
<>
    <BackTop visibilityHeight={0} />
    Scroll down to see the bottom-right
    <strong className="site-back-top-basic"> gray </strong>
    button.
</>
```

## API

:::caution 注意

有默认样式，距离底部 `50px`，可覆盖。

自定义样式宽高不大于 40px。

:::

| 参数             | 说明                                                          | 类型                | 默认值         |
| ---------------- | ------------------------------------------------------------- | ------------------- | -------------- |
| duration         | 回到顶部所需时间（ms）                                        | `number`            | `450`          |
| target           | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | `() => HTMLElement` | `() => window` |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop                            | `number`            | `400`          |
| onClick          | 点击按钮的回调函数                                            | `function`          | `--`           |
