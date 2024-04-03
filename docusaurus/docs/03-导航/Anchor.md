---
title: Anchor 锚点
---

用于跳转到页面指定位置，需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 引入

```js
import {Anchor} from 'idesign';
```

## 基本用法

```jsx live fffx
<Anchor style={{margin: 'auto', width: 110}}>
    <Anchor.Link href="#基本用法" title="基本用法" />
    <Anchor.Link href="#静态位置" disabled title="静态位置" />
    <Anchor.Link href="#api" title="API">
        <Anchor.Link href="#anchor-props" title="Anchor Props" />
        <Anchor.Link href="#link-props" title="Link Props" />
    </Anchor.Link>
</Anchor>
```

## 静态位置

不浮动，状态不随页面滚动变化。

```jsx live fffx
<Anchor affix={false}>
    <Anchor.Link href="#基本用法" title="基本用法" />
    <Anchor.Link href="#静态位置" title="静态位置" />
    <Anchor.Link href="#api" title="API">
        <Anchor.Link href="#anchor-props" title="Anchor Props" />
        <Anchor.Link href="#link-props" title="Link Props" />
    </Anchor.Link>
</Anchor>
```

## API

### Anchor Props

| 成员             | 说明                                  | 类型                                  | 默认值         |
| ---------------- | ------------------------------------- | ------------------------------------- | -------------- |
| affix            | 固定模式                              | `boolean`                             | `true`         |
| bounds           | 锚点区域边界                          | `number`                              | `5`            |
| getContainer     | 指定滚动的容器                        | `() => HTMLElement`                   | `() => window` |
| getCurrentAnchor | 自定义高亮的锚点                      | `() => string`                        | `--`           |
| offsetTop        | 距离窗口顶部达到指定偏移量后触发      | `number`                              | `0`            |
| showInkInFixed   | `affix={false}` 时是否显示小圆点      | `boolean`                             | `false`        |
| targetOffset     | 锚点滚动偏移量，默认与 offsetTop 相同 | `number`                              | `--`           |
| onChange         | 监听锚点链接改变                      | `(currentActiveLink: string) => void` | `--`           |
| onClick          | `click` 事件的 handler                | `function(e: Event, link: Object)`    | `--`           |

### Link Props

| 成员   | 说明                             | 类型        | 默认值 |
| ------ | -------------------------------- | ----------- | ------ |
| href   | 锚点链接                         | `string`    | `--`   |
| target | 该属性指定在何处显示链接的资源。 | `string`    | `--`   |
| title  | 文字内容                         | `ReactNode` | `--`   |
