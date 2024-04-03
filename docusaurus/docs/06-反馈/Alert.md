---
title: Alert 警示
---

警告提示，展现需要关注的信息。

## 引入

```js
import {Alert} from 'idesign';
```

## 基本用法

最简单的用法，适用于简短的警告提示。

```jsx live fffx
<Alert message="提示成功的文案" type="success" />
```

## 不同样式

共有四种样式 `success`、`info`、`warning`、`error`

```jsx live fffx
<div className="demo-column">
    <Alert message="提示成功的文案" type="success" />
    <Alert message="提示通知的文案" type="info" />
    <Alert message="提示警告的文案" type="warning" />
    <Alert message="提示报错的文案" type="error" />
</div>
```

## 带标题

带标题含有辅助性文字介绍的警告提示。

```jsx live fffx
<div className="demo-column">
    <Alert
        message="成功标题"
        description="提示成功的文案"
        type="success"
    />
    <Alert
        message="通知标题"
        description="提示通知的文案"
        type="info"
    />
    <Alert
        message="警告标题"
        description="提示警告的文案"
        type="warning"
    />
    <Alert
        message="报错标题"
        description="提示报错的文案"
        type="error"
    />
</div>
```

## 顶部公告

页面顶部通告形式，默认有图标且 `type` 为 `'warning'`

```jsx live fffx
<div className="demo-column">
    <Alert message="提示警告的文案" banner />
    <Alert
        message="提示警告的文案"
        banner
        closable
    />
    <Alert showIcon={false} message="提示警告的文案" banner />
    <Alert type="error" message="提示报错的文案" banner />
</div>
```

## 带图标

图标让信息类型更加醒目。

```jsx live fffx
<div className="demo-column">
    <Alert message="提示成功的文案" type="success" showIcon />
    <Alert message="提示通知的文案" type="info" showIcon />
    <Alert message="提示警告的文案" type="warning" showIcon closable />
    <Alert message="提示报错的文案" type="error" showIcon />
    <Alert
        message="成功标题"
        description="提示成功的文案"
        type="success"
        showIcon
    />
    <Alert
        message="通知标题"
        description="提示通知的文案"
        type="info"
        showIcon
    />
    <Alert
        message="警告标题"
        description="提示警告的文案"
        type="warning"
        showIcon
        closable
    />
    <Alert
        message="报错标题"
        description="提示报错的文案"
        type="error"
        showIcon
    />
</div>
```

## 自定义图标

通过 `icon` 属性自定义图标。

```jsx live fffx
<div className="demo-column">
    <Alert icon={<OutlinedSmile />} message="提示成功的文案" type="success" />
    <Alert icon={<OutlinedSmile />} message="提示成功的文案" type="success" showIcon />
    <Alert icon={<OutlinedSmile />} message="提示通知的文案" type="info" showIcon />
    <Alert icon={<OutlinedSmile />} message="提示警告的文案" type="warning" showIcon />
    <Alert icon={<OutlinedSmile />} message="提示报错的文案" type="error" showIcon />
    <Alert
        icon={<OutlinedSmile />}
        message="成功标题"
        description="提示成功的文案"
        type="success"
        showIcon
    />
    <Alert
        icon={<OutlinedSmile />}
        message="通知标题"
        description="提示通知的文案"
        type="info"
        showIcon
    />
    <Alert
        icon={<OutlinedSmile />}
        message="警告标题"
        description="提示警告的文案"
        type="warning"
        showIcon
    />
    <Alert
        icon={<OutlinedSmile />}
        message="报错标题"
        description="提示报错的文案"
        type="error"
        showIcon
    />
</div>
```

## 可关闭

显示关闭按钮，点击可关闭警告提示。

```jsx live fff
function App() {
    const onClose = (e) => {
        console.log(e, 'I was closed.');
    };

    return (
        <div className="demo-column">
            <Alert
                message="提示警告的文案"
                type="warning"
                closable
                onClose={onClose}
            />
            <Alert
                message="报错标题"
                description="提示报错的文案"
                type="error"
                closable
                onClose={onClose}
            />
        </div>
    );
}
```

## 操作项

可以在右上角自定义操作项。

```jsx live fff
<Alert
    message="提示成功的文案"
    type="success"
    showIcon
    action={
        <Link
            href="http://www.baidu.com"
            target="_blank"
            type="primary"
        >
            超链接
        </Link>
    }
    closable
/>
```

## 平滑地卸载

平滑、自然的卸载提示。

```jsx live fff
function App() {
    const [visible, setVisible] = useState(true);
    const handleClose = () => {
        setVisible(false);
    };

    return (
        <div className="demo-column">
            <p>placeholder text here</p>
            {visible ? (
                <Alert message="提示成功的文案" type="success" closable afterClose={handleClose} />
            ) : null}
        </div>
    );
}
```

## React 错误处理

友好的 React 错误处理 包裹组件。

```jsx live fff
function App() {
    const ErrorBoundary = Alert.ErrorBoundary;
    const ThrowError = () => {
        const [error, setError] = useState();
        const onClick = () => {
            setError(new Error('An Uncaught Error'));
        };

        if (error) {
            throw error;
        }
        return (
            <Button danger onClick={onClick}>
                Click me to throw a error
            </Button>
        );
    };

    return (
        <ErrorBoundary>
            <ThrowError />
        </ErrorBoundary>
    );
}
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

