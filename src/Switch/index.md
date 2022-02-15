---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 1
---

# Switch 开关（开发中）

用于两个互斥选项，用来打开或关闭选项的选择控件。

## 基本用法

不带描述，最基础的开关。

```tsx
import React, { useState } from 'react';
import { Switch } from 'idesign-react';

const [checked, setChecked] = useState(true);

const onChange = (value) => {
  console.log('value', value);
  // setChecked(value)
};

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Switch size="large" value={checked} onChange={onChange} />
    </div>
  );
};

export default App;
```
