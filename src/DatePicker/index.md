---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 8
---

# DatePicker 日期选择器（开发中）

## 基本用法

```tsx
import React, { useState } from 'react';
import { DatePicker } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('2022-05-20')

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <div className="idesign-demo-block-column">
      <DatePicker value={value} onChange={handleChange} />
    </div>
  );
};

export default App;
```
