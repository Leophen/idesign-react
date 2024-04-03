---
title: Divider 分割线
---

区隔内容的分割线。

## 引入

```js
import {Divider} from 'idesign';
```

## 基本用法

默认为水平分割线，可在中间加入文字。

```jsx live fffx
<>
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider />
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider dashed />
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
</>
```

## 垂直分割线

使用 `type="vertical"` 设置为行内的垂直分割线。

```jsx live fffx
<>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
</>
```

## 带文字的分割线

分割线中带有文字，可以用 `orientation` 指定文字位置。

```jsx live fff
<>
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider>Text</Divider>
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider orientation="left">Left Text</Divider>
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider orientation="right">Right Text</Divider>
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider orientation="left" orientationMargin="0">
        Left Text with 0 orientationMargin
    </Divider>
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider orientation="right" orientationMargin={50}>
        Right Text with 50px orientationMargin
    </Divider>
    <p>
        对不同章节的文本段落进行分割。对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
</>
```

## 分割文字使用正文样式

使用 `plain` 可以设置为更轻量的分割文字样式。

```jsx live fff
<>
    <p>
        对不同章节的文本段落进行分割。 对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider plain>Text</Divider>
    <p>
        对不同章节的文本段落进行分割。 对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider orientation="left" plain>
        Left Text
    </Divider>
    <p>
        对不同章节的文本段落进行分割。 对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <Divider orientation="right" plain>
        Right Text
    </Divider>
    <p>
        对不同章节的文本段落进行分割。 对行内文字/链接进行分割，例如表格的操作列。对不同章节的文本段落进行分割。
        对行内文字/链接进行分割，例如表格的操作列。
    </p>
</>
```

## API

| 参数              | 说明                                                                                               | 类型                      | 默认值       |
| ----------------- | -------------------------------------------------------------------------------------------------- | ------------------------- | ------------ |
| children          | 嵌套的标题                                                                                         | `ReactNode`               | `--`         |
| className         | 分割线样式类                                                                                       | `string`                  | `--`         |
| dashed            | 是否虚线                                                                                           | `boolean`                 | `false`      |
| orientation       | 分割线标题的位置                                                                                   | `left`〡`right`〡`center` | `center`     |
| orientationMargin | 标题和最近 left/right 边框之间的距离，去除了分割线<br/>同时 `orientation` 必须为 `left` 或 `right` | `string`〡`number`        | `--`         |
| plain             | 文字是否显示为普通正文样式                                                                         | `boolean`                 | `false`      |
| style             | 分割线样式对象                                                                                     | `CSSProperties`           | `--`         |
| type              | 水平还是垂直类型                                                                                   | `horizontal`〡`vertical`  | `horizontal` |

