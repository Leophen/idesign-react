---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 4
---

# Input 输入框（开发中）

## 基本用法

基础的单行输入框，可通过 `value` 属性设置默认值，通过 `onChange` 设置值改变时触发的操作。

```tsx
import React, { useState } from 'react';
import { Input } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('Hello');

  return (
    <>
      <Input
        placeholder="请输入内容（无默认值）"
        onChange={(value) => {
          console.log(value);
        }}
      />
      <br />
      <Input
        placeholder="请输入内容（有默认值）"
        value={value}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
      />
    </>
  );
};

export default App;
```

## 触发事件

基础的单行输入框，可通过 `value` 属性设置默认值，通过 `onChange` 设置值改变时触发的操作。

```tsx
import React, { useState } from 'react';
import { Input } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState('Hello');

  return (
    <>
      <Input placeholder="请输入内容（无默认值）" />
      <br />
      <Input
        placeholder="请输入内容（有默认值）"
        value={value}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
        onEnter={(value) => {
          console.log(value);
        }}
      />
    </>
  );
};

export default App;
```
