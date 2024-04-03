---
title: Space 间距
---


避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

## 引入

```js
import {Space} from 'idesign';
```

## 基本用法

相邻组件水平间距。

```jsx live fff
<Space>
    Space
    <Button type="primary">Button</Button>
    <Upload>
        <Button>
            <OutlinedUpload /> Click to Upload
        </Button>
    </Upload>
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
        <Button>Confirm</Button>
    </Popconfirm>
</Space>
```

## 垂直间距

相邻组件垂直间距。

```jsx live fff
<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
    </Card>
    <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
    </Card>
</Space>
```

## 间距大小

间距预设大、中、小三种大小。

通过设置 `size` 为 `large` `middle` 分别把间距设为大、中间距。若不设置 `size`，则间距为小。

```jsx live fff
function App() {
    const [size, setSize] = useState('small');

    return (
        <>
            <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
                <Radio value="small">Small</Radio>
                <Radio value="middle">Middle</Radio>
                <Radio value="large">Large</Radio>
            </Radio.Group>
            <br />
            <br />
            <Space size={size}>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="link">Link</Button>
            </Space>
        </>
    );
}
```

## 对齐

设置对齐模式。

```jsx live fff
<div className="space-align-container">
    <div className="space-align-block">
        <Space align="center">
            center
            <Button type="primary">Primary</Button>
            <span className="mock-block">Block</span>
        </Space>
    </div>
    <div className="space-align-block">
        <Space align="start">
            start
            <Button type="primary">Primary</Button>
            <span className="mock-block">Block</span>
        </Space>
    </div>
    <div className="space-align-block">
        <Space align="end">
            end
            <Button type="primary">Primary</Button>
            <span className="mock-block">Block</span>
        </Space>
    </div>
    <div className="space-align-block">
        <Space align="baseline">
            baseline
            <Button type="primary">Primary</Button>
            <span className="mock-block">Block</span>
        </Space>
    </div>
</div>
```

## 自定义尺寸

```jsx live fff
function App() {
    const [size, setSize] = useState(8);

    return (
        <>
            <Slider value={size} onChange={value => setSize(value)} />
            <br />
            <Space size={size}>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="link">Link</Button>
            </Space>
        </>
    );
}
```

## 自动换行

```jsx live fff
<Space size={[8, 16]} wrap>
    {new Array(16).fill(null).map((_, index) => (
        <Button key={index}>Button</Button>
    ))}
</Space>
```

## 分隔符

相邻组件分隔符。

```jsx live fff
<Space split={<>|</>}>
    <a>Link</a>
    <a>Link</a>
    <a>Link</a>
</Space>
```

## API

| 参数      | 说明                                   | 类型                                 | 默认值       |
| --------- | -------------------------------------- | ------------------------------------ | ------------ |
| align     | 对齐方式                               | `start`〡`end`〡`center`〡`baseline` | `--`         |
| direction | 间距方向                               | `vertical`〡`horizontal`             | `horizontal` |
| size      | 间距大小                               | `small`〡`middle`〡`large`〡`number` | `small`      |
| split     | 设置拆分                               | `ReactNode`                          | `--`         |
| wrap      | 是否自动换行，仅在 `horizontal` 时有效 | `boolean`                            | `false`      |
