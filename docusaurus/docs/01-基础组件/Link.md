---
title: Link 超链接
---

使用超链接控件来触发功能，或点击跳转⻚面。一般来说，超链接不会是多行文本形式，而是相对简洁的描述形态。

## 引入

```js
import {Link} from 'idesign';
```

## 基本用法

```jsx live fffx
<div className="demo-column">
    <Link
        href="http://www.baidu.com"
        target="_blank"
        icon={<OutlinedFileSubmit />}
    >
        超链接
    </Link>
    <Link
        href="http://www.baidu.com"
        target="_blank"
        type="primary"
    >
        超链接
    </Link>
    <Link
        onClick={() => {
            console.log('超链接');
        }}
    >
        点击打印超链接
    </Link>
    <Link
        disabled
        href="http://wiki.baidu.com/pages/viewpage.action?pageId=1348602077"
        target="_blank"
        type="primary"
    >
        超链接禁用状态
    </Link>
</div>
```

## 字体大小

超链接不同的字体大小展示。

```jsx live fffx
<div className="demo-column">
    <Link
        href="http://www.baidu.com"
        target="_blank"
        size="medium"
    >
        超链接
    </Link>
    <Link
        href="http://www.baidu.com"
        target="_blank"
        size="small"
    >
        超链接
    </Link>
    <Link
        href="http://www.baidu.com"
        target="_blank"
        type="primary"
    >
        超链接
    </Link>
</div>
```

## API

| 属性     | 说明                                                  | 类型                         | 默认值    |
| -------- | ----------------------------------------------------- | ---------------------------- | --------- |
| type     | 设置按钮类型                                          | `primary`〡`text`〡`default` | `default` |
| size     | 设置按钮大小                                          | `medium`〡`small`            | `small`   |
| disabled | 按钮失效状态                                          | `boolean`                    | false     |
| href     | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | `string`                     | `--`      |
| icon     | 设置按钮的图标组件                                    | `ReactNode`                  | `--`      |
| target   | 相当于 a 链接的 target 属性，href 存在时生效          | `string`                     | `--`      |
| onClick  | 点击按钮时的回调                                      | `(event) => void`            | `--`      |

支持原生 链接标签 的其他所有属性。
