---
title: ConfigProvider 全局配置
---

为组件提供统一的全局化配置。

ConfigProvider 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。

## 引入

```js
import {ConfigProvider} from 'idesign';
```

## 基本用法

```jsx live fffx
function App() {
    const [componentSize, setComponentSize] = useState('small');

    return (
        <div>
            <Radio.Group
                defaultValue={componentSize}
                value={componentSize}
                onChange={e => {
                    setComponentSize(e.target.value);
                }}
            >
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
            <br />
            <ConfigProvider componentSize={componentSize}>
                <Button>But ton</Button>
                <br /><br />
                <Input />
            </ConfigProvider>
        </div>
    );
}
```

## 图标统一前缀

设置图标统一样式前缀。

```jsx live fffx
<ConfigProvider iconPrefixCls="customicon">
    <OutlinedFileSubmit />
</ConfigProvider>
```

## prefix

```jsx live fffx
function App() {
    const children = [];
    for (let i = 10; i < 18; i++) {
        children.push(
            <Select.Option key={i.toString(36) + i}>
                {i.toString(36) + i}
            </Select.Option>
        );
    }

    return (
        <ConfigProvider prefixCls={'acud'} iconPrefixCls={'acudicon'}>
            <Select
                mode="multiple"
                allowClear
                style={{width: '100%'}}
                defaultValue={['a10', 'c12']}
                maxTagCount={'responsive'}
            >
                {children}
            </Select>
        </ConfigProvider>
    );
}
```

## API

| 参数               | 说明                                                                                   | 类型                                         | 默认值                |
| ------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------- | --------------------- |
| componentSize      | 设置 acud 组件大小                                                                     | `small`〡`middle`〡`large`                   | `--`                  |
| getPopupContainer  | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。                   | `function(triggerNode)`                      | `() => document.body` |
| getTargetContainer | 配置 Affix、Anchor 滚动监听容器。                                                      | `() => HTMLElement`                          | `() => window`        |
| locale             | 语言包配置，语言包可到 [acud/lib/locale](http://unpkg.com/acud/lib/locale/) 目录下寻找 | `object`                                     | `--`                  |
| prefixCls          | 设置统一样式前缀。注意：需要配合 `less` 变量 [@acud-prefix]                            | `string`                                     | `acud`                |
| iconPrefixCls      | 设置图标统一样式前缀。注意：需要配合 `less` 变量 [@iconfont-css-prefix]                | `string`                                     | `${prefixCls}icon`    |
| renderEmpty        | 自定义组件空状态                                                                       | `function(componentName: string): ReactNode` | `--`                  |

## ConfigProvider.config()

设置 `Modal.method()` 的prefix

```js
ConfigProvider.config({
  prefixCls: '',
});
```
