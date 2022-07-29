---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 2
---

# Radio 单选框

单选框代表从一组互斥的选项中仅选择一个选项。

## 单选框

最简单的单选框形式。

```tsx
import React, { useState } from 'react';
import { Radio } from 'idesign-react';

const App = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (val, e) => {
    console.log(val, e);
    setChecked(val);
  };

  return (
    <div className="idesign-demo-block-column">
      <Radio>无默认值</Radio>
      <Radio defaultChecked={checked}>有默认值（非受控）</Radio>
      <Radio checked={checked}>有固定值（受控）</Radio>
      <Radio checked={checked} onChange={handleChange}>
        通用方法
      </Radio>
    </div>
  );
};

export default App;
```

## 单选框组

使用 `Radio.Group` 可以包裹 `Radio` 形成一组单选框组。

```tsx
import React, { useState } from 'react'
import { Radio } from 'idesign-react'

const App = () => {
  const [selected, setSelected] = useState('2')

  const handleChange = (val, e) => {
    console.log(val, e)
    setSelected(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <Radio.Group>
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
        <Radio value="3">选项三</Radio>
        <Radio value="4">选项四</Radio>
      </Radio.Group>
      <h4>有默认值（非受控）</h4>
      <Radio.Group defaultSelected={selected}>
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
        <Radio value="3">选项三</Radio>
        <Radio value="4">选项四</Radio>
      </Radio.Group>
      <h4>有固定值（受控）</h4>
      <Radio.Group selected={selected}>
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
        <Radio value="3">选项三</Radio>
        <Radio value="4">选项四</Radio>
      </Radio.Group>
      <h4>通用方法</h4>
      <Radio.Group selected={selected} onChange={handleChange}>
        <Radio value="1">选项一</Radio>
        <Radio value="2">选项二</Radio>
        <Radio value="3">选项三</Radio>
        <Radio value="4">选项四</Radio>
      </Radio.Group>
    </>
  )
}

export default App
```

## 单选框（按钮型）

`Radio` 提供 `type` 属性切换为按钮形式的单选框。

```tsx
import React from 'react';
import { Radio } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Radio defaultChecked type="radio-button">默认选中</Radio>
      <Radio type="radio-button">无默认值</Radio>
    </div>
  );
};

export default App;
```

## 单选框组（按钮型）

`Radio.Group` 提供 `type` 属性全局修改每一项为按钮型单选框。

```tsx
import React from 'react';
import { Radio } from 'idesign-react';

const App = () => {
  return (
    <Radio.Group type="radio-button">
      <Radio value="1">选项一</Radio>
      <Radio value="2">选项二</Radio>
      <Radio value="3">选项三</Radio>
      <Radio value="4">选项四</Radio>
    </Radio.Group>
  );
};

export default App;
```

## 不同尺寸（按钮型）

`Radio` 按钮形式的单选框提供 `size` 属性控制尺寸，`Radio.Group` 也有 `size` 属性可以全局控制每一项按钮单选框的尺寸。

```tsx
import React, { useState } from 'react';
import { Radio } from 'idesign-react';

const App = () => {
  const [selected, setSelected] = useState('2');

  const handleChange = (val) => {
    setSelected(val);
  };

  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Radio type="radio-button" size="small">
          未选中
        </Radio>
        <Radio type="radio-button" size="medium" defaultChecked>
          未选中
        </Radio>
        <Radio type="radio-button" size="large">
          未选中
        </Radio>
      </div>

      <div className="idesign-demo-block-row">
        <Radio.Group
          type="radio-button"
          size="small"
          selected={selected}
          onChange={handleChange}
        >
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
          <Radio value="3">选项三</Radio>
        </Radio.Group>
      </div>

      <div className="idesign-demo-block-row">
        <Radio.Group
          type="radio-button"
          size="medium"
          selected={selected}
          onChange={handleChange}
        >
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
          <Radio value="3">选项三</Radio>
        </Radio.Group>
      </div>

      <div className="idesign-demo-block-row">
        <Radio.Group
          type="radio-button"
          size="large"
          selected={selected}
          onChange={handleChange}
        >
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
          <Radio value="3">选项三</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default App;
```

## 禁用状态

`Radio` 提供 `disabled` 属性控制单选框为禁用状态，`Radio.Group` 可以全局控制每一项为禁用状态。

```tsx
import React, { useState } from 'react';
import { Radio } from 'idesign-react';

const App = () => {
  const [selected, setSelected] = useState('2');

  const handleChange = (val) => {
    setSelected(val);
  };

  return (
    <div className="idesign-demo-block-column">
      <h3>单项禁用</h3>
      <div className="idesign-demo-block-row">
        <Radio disabled>未选中</Radio>
        <Radio type="radio-button" disabled>
          未选中
        </Radio>
      </div>

      <h3>单选框组局部禁用</h3>
      <div className="idesign-demo-block-row">
        <Radio.Group selected={selected} onChange={handleChange}>
          <Radio value="1">选项一</Radio>
          <Radio value="2" disabled>
            选项二
          </Radio>
          <Radio value="3">选项三</Radio>
        </Radio.Group>
      </div>
      <div className="idesign-demo-block-row">
        <Radio.Group type="radio-button" selected={selected} onChange={handleChange}>
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
          <Radio value="3" disabled>
            选项三
          </Radio>
        </Radio.Group>
      </div>

      <h3>单选框组全局禁用</h3>
      <div className="idesign-demo-block-row">
        <Radio.Group disabled selected={selected} onChange={handleChange}>
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
          <Radio value="3">选项三</Radio>
        </Radio.Group>
      </div>
      <div className="idesign-demo-block-row">
        <Radio.Group
          disabled
          type="radio-button"
          selected={selected}
          onChange={handleChange}
        >
          <Radio value="1">选项一</Radio>
          <Radio value="2">选项二</Radio>
          <Radio value="3">选项三</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default App;
```

## Radio API

<API hideTitle />

## RadioGroup API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按钮内容 | `ReactNode` | `--` |
| className | 类名 | `string` | `--` |
| style | 自定义样式 | `CSSProperties` | `--` |
| selected | 单选框组选中固定值（受控） | `string〡number` | `--` |
| defaultSelected | 单选框组选中默认值（非受控） | `string〡number` | `--` |
| type | 单选框组全局类型 | `"radio"〡"radio-button"` | `"radio"` |
| size | 按钮单选框全局尺寸 | `"small"〡"medium"〡"large"` | `"medium"` |
| disabled | 单选框组是否全局禁用 | `boolean` | `false` |
| onChange | 选中某一项时触发 | `(value: string〡number, ev: React.ChangeEvent<HTMLInputElement>) => void` | `--` |
