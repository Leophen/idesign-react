---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 3
---

# Checkbox 多选框

多选框是一个选择控件，允许用户通过单击在选中和未选中之间切换。

## 基本用法

最简单的多选框形式。

```tsx
import React, { useState } from 'react';
import { Checkbox } from 'idesign-react';

const App = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (val, e) => {
    console.log(val, e);
    setChecked(val);
  };

  return (
    <div className="idesign-demo-block-row">
      <Checkbox checked={true}>已选中</Checkbox>
      <Checkbox checked={checked} onChange={handleChange}>
        {checked ? '已选中' : '未选中'}
      </Checkbox>
    </div>
  );
};

export default App;
```

## 多选框组

使用 `Checkbox.Group` 可以包裹 `Checkbox` 形成一组多选框组。

```tsx
import React, { useState } from 'react';
import { Checkbox } from 'idesign-react';

const App = () => {
  const [currentValue, setCurrentValue] = useState(['gz']);

  const handleChange = (val, e) => {
    console.log(val, e);
    setCurrentValue(val);
  };

  return (
    <Checkbox.Group currentValue={currentValue} onChange={handleChange}>
      <Checkbox value="bj">北京</Checkbox>
      <Checkbox value="sh">上海</Checkbox>
      <Checkbox value="gz">广州</Checkbox>
      <Checkbox value="sz">深圳</Checkbox>
    </Checkbox.Group>
  );
};

export default App;
```

## 不同尺寸

`Checkbox` 多选框提供 `size` 属性控制尺寸，`Checkbox.Group` 也有 `size` 属性可以全局控制每一项多选框的尺寸。

```tsx
import React, { useState } from 'react';
import { Checkbox } from 'idesign-react';

const App = () => {
  const [currentValue, setCurrentValue] = useState(['gz']);

  const handleChange = (val) => {
    setCurrentValue(val);
  };

  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Checkbox size="small">small</Checkbox>
        <Checkbox size="medium">medium</Checkbox>
        <Checkbox size="large">large</Checkbox>
      </div>

      <div className="idesign-demo-block-row">
        <Checkbox.Group size="small" currentValue={currentValue} onChange={handleChange}>
          <Checkbox value="bj">北京</Checkbox>
          <Checkbox value="sh">上海</Checkbox>
          <Checkbox value="gz">广州</Checkbox>
          <Checkbox value="sz">深圳</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="idesign-demo-block-row">
        <Checkbox.Group size="medium" currentValue={currentValue} onChange={handleChange}>
          <Checkbox value="bj">北京</Checkbox>
          <Checkbox value="sh">上海</Checkbox>
          <Checkbox value="gz">广州</Checkbox>
          <Checkbox value="sz">深圳</Checkbox>
        </Checkbox.Group>
      </div>

      <div className="idesign-demo-block-row">
        <Checkbox.Group size="large" currentValue={currentValue} onChange={handleChange}>
          <Checkbox value="bj">北京</Checkbox>
          <Checkbox value="sh">上海</Checkbox>
          <Checkbox value="gz">广州</Checkbox>
          <Checkbox value="sz">深圳</Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  );
};

export default App;
```

## 禁用状态

`Checkbox` 提供 `disabled` 属性控制多选框为禁用状态，`Checkbox.Group` 可以全局控制每一项为禁用状态。

```tsx
import React, { useState } from 'react';
import { Checkbox } from 'idesign-react';

const App = () => {
  const [currentValue, setCurrentValue] = useState(['gz']);

  const handleChange = (val) => {
    setCurrentValue(val);
  };

  return (
    <div className="idesign-demo-block-column">
      <h3>单项禁用</h3>

      <div className="idesign-demo-block-row">
        <Checkbox disabled>未选中</Checkbox>
      </div>

      <h3>多选框组局部禁用</h3>

      <div className="idesign-demo-block-row">
        <Checkbox.Group currentValue={currentValue} onChange={handleChange}>
          <Checkbox value="bj">北京</Checkbox>
          <Checkbox value="sh">上海</Checkbox>
          <Checkbox value="gz">广州</Checkbox>
          <Checkbox value="sz" disabled>
            深圳
          </Checkbox>
        </Checkbox.Group>
      </div>

      <h3>多选框组全局禁用</h3>

      <div className="idesign-demo-block-row">
        <Checkbox.Group disabled currentValue={currentValue} onChange={handleChange}>
          <Checkbox value="bj">北京</Checkbox>
          <Checkbox value="sh">上海</Checkbox>
          <Checkbox value="gz">广州</Checkbox>
          <Checkbox value="sz">深圳</Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  );
};

export default App;
```

## Checkbox API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按钮内容 | `ReactNode` | `--` |
| className | 类名 | `string` | `--` |
| style | 自定义样式 | `CSSProperties` | `--` |
| size | 多选框尺寸 | `"small"〡"medium"〡"large"` | `"medium"` |
| value | 多选框的值 | `string〡number` | `--` |
| checked | 是否选中 | `boolean` | `false` |
| disabled | 是否禁用组件 | `boolean` | `false` |
| onChange | 值变化时触发 | `(checked: boolean, context: React.ChangeEvent<HTMLInputElement>) => void` | `--` |

## CheckboxGroup API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 按钮内容 | `ReactNode` | `--` |
| className | 类名 | `string` | `--` |
| style | 自定义样式 | `CSSProperties` | `--` |
| currentValue | 多选框组选中的值 | `string〡number` | `--` |
| size | 多选框全局尺寸 | `"small"〡"medium"〡"large"` | `"medium"` |
| disabled | 多选框组是否全局禁用 | `boolean` | `false` |
| onChange | 选中某一项时触发 | `(value: Array<string〡number>〡string〡number, context: React.ChangeEvent<HTMLInputElement>) => void` | `--` |
