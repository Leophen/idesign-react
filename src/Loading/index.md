---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 3
---

# Loading 加载中（开发中）

## 基本用法

```tsx
import React from 'react';
import { Loading } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Loading>填充按钮</Loading>
      </div>
    </div>
  );
};

export default App;
```
