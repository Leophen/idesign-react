---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
---

# Scrollbar 滚动条（开发中）

用于替换浏览器原生滚动条。

待定:

```tsx
import React from 'react';
import { Alert, Scrollbar } from 'idesign-react';

const App = () => {
  const data = Array(36).fill('item')
  return (
    <Scrollbar height={300}>
      {data.map(item => <Alert message={item} key={Math.random()} />)}
    </Scrollbar>
  );
};

export default App;
```
