---
title: ColorPicker 颜色选择器
---

颜色选择器，用于颜色选择的操作控件,相比较下拉选择框而言,颜色选择器不仅可以对颜色进行选择,也可以对颜色进一步编辑。 颜色选择器，用于颜色选择和调整的选择器控件。

## 引入

```js
import {ColorPicker} from 'idesign';
```

## 基本用法

```jsx live
function App() {
    const [color, setColor] = useState('#4D4DFF');

    const handleChange = color => {
        console.log(color);
        setColor(color);
    };

    return (
        <div className="demo-column">
            <h5>无默认值</h5>
            <ColorPicker />

            <h5>有默认值（非受控）</h5>
            <ColorPicker defaultColor={color} />

            <h5>有固定值（受控?）</h5>
            <ColorPicker color={color} />

            <h5>通用方法</h5>
            <ColorPicker color={color} onChange={handleChange} />
        </div>
    );
}
```

## 禁用状态

```jsx live
<ColorPicker defaultColor='#4D4DFF' disabled />
```

## 可清空颜色值

```jsx live
<ColorPicker defaultColor='#4D4DFF' allowClear />
```

## 简洁颜色选择器

简洁颜色选择器简化了选择器的部分，只显示已选颜色。

```jsx live
<ColorPicker defaultColor='#4D4DFF' type="simple" />
```

## 混合颜色选择器

相对基本颜色选择器而言,混合颜色选择器针对更加专业的颜色调节的业务场景，例如图文编辑中图片颜色、文字颜色调节等场景。

```jsx live
<ColorPicker defaultColor='#4D4DFF' type="custom" />
```

## API

| 参数             | 说明                                                                                 | 类型                           | 默认值                         |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------ |
| defaultColor     | 默认选中颜色                                                                         | `string`                       | `--`                           |
| defaultColors    | 默认色板，常规/推荐颜色，可以快速选择颜色，如果需要无颜色选项，设置为transparent即可 | `string[]`                     | `DEFAULT_COLORS(具体值见下方)` |
| disabled         | 是否可选                                                                             | `boolean`                      | `false`                        |
| type             | 颜色选择器有三种类型                                                                 | `simple`〡`cusAtom`〡`default` | `default`                      |
| color            | 指定当前选中的色值，HEX格式的颜色                                                    | `string`                       | `--`                           |
| placeholder      | 当前下拉选择器的placeholder                                                          | `string`                       | `--`                           |
| inputPlaceholder | 当type设置为custom时，下拉中输入框的placeholder                                      | `string`                       | `--`                           |
| allowClear       | 支持清除                                                                             | `boolean`                      | `false`                        |
| onChange         | 选中色值即色值变化时，调用该函数。其中color: {hex, rgb, hsl, hsv}                    | `function(hex〡color)`         | `--`                           |

```js
const DEFAULT_COLORS = [
    'transparent',
    '#FFFFFF',
    '#FFC27D',
    '#FF908C',
    '#7BD964',
    '#57D9D4',
    '#7DADFF',
    '#9497FF',
    '#E62E6B',
    '#FAD000',
    '#FF9326',
    '#F33E3E',
    '#30BF13',
    '#30B5F2',
    '#2468F2',
    '#4D4DFF'
];
```
