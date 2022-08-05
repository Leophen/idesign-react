---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 9
---

# ColorPicker 颜色选择器

用于颜色选择的组件，支持 `Hex` 和 `RGB` 格式。

## 基本用法

可通过 `value` 设置实时颜色值，通过 `onChange` 设置修改颜色值触发的方法，通过 `onTrigger` 设置切换颜色面板显示隐藏时触发的方法。

```tsx
import React, { useState } from 'react'
import { ColorPicker } from 'idesign-react'

const App = () => {
  const [value, setValue] = useState('rgb(92, 192, 131)')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  const handleTrigger = (val, visible) => {
    console.log(val, visible)
  }

  return (
    <>
      <h4>无默认值</h4>
      <ColorPicker />
      <h4>有默认值（非受控）</h4>
      <ColorPicker defaultValue={value} />
      <h4>有固定值（受控）</h4>
      <ColorPicker value={value} />
      <h4>一般用法</h4>
      <ColorPicker
        value={value}
        onChange={handleChange}
        onTrigger={handleTrigger}
      />
    </>
  )
}

export default App
```

## 禁用状态

可通过 `disabled` 属性禁用颜色选择器。

```tsx
import React from 'react';
import { ColorPicker } from 'idesign-react';

const App = () => {
  return (
    <ColorPicker disabled />
  );
};

export default App;
```

## 不同尺寸

提供 `small`、`medium`（默认）、`large` 三种尺寸的颜色触发块。

```tsx
import React from 'react';
import { ColorPicker } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <ColorPicker size="small" />
        <ColorPicker size="medium" />
        <ColorPicker size="large" />
      </div>
    </div>
  );
};

export default App;
```

## 预设颜色

可通过 `colorList` 属性传入颜色数组设置预设颜色。

```tsx
import React from 'react';
import { ColorPicker } from 'idesign-react';

const defaultColor = [
  {
    value: 'rgb(206, 55, 46)'
  },
  {
    value: 'rgb(245, 192, 66)'
  },
  {
    value: 'rgb(92, 192, 131)'
  },
  {
    value: 'rgb(86, 116, 245)'
  },
  {
    value: 'rgb(103, 98, 192)'
  },
]

const App = () => {
  return (
    <ColorPicker colorList={defaultColor} />
  );
};

export default App;
```

## 颜色面板

可通过 `<ColorPicker.Panel />` 单独使用颜色面板。

```tsx
import React from 'react';
import { ColorPicker } from 'idesign-react';

const App = () => {
  return (
    <ColorPicker.Panel />
  );
};

export default App;
```

## 禁用颜色面板

可通过 `<ColorPicker.Panel />` 单独使用颜色面板。

```tsx
import React from 'react';
import { ColorPicker } from 'idesign-react';

const App = () => {
  return (
    <ColorPicker.Panel disabled />
  );
};

export default App;
```

## ColorPicker API

<API hideTitle />

## ColorPanel API

| 属性         | 说明                 | 类型                    | 默认值    |
| ------------ | -------------------- | ----------------------- | --------- |
| className    | 类名                 | `string`                | `--`      |
| style        | 自定义样式           | `CSSProperties`         | `--`      |
| value        | 固定颜色值（受控）   | `string`                | `--`      |
| defaultValue | 默认颜色值（非受控） | `string`                | `#5e62ea` |
| colorList    | 底部预设颜色         | `colorListType[]`       | `--`      |
| disabled     | 禁用颜色面板         | `boolean`               | `false`   |
| onChange     | 修改颜色值时触发     | `(val: string) => void` | `--`      |
