---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 2
---

# Empty 空状态（开发中）

## 基本用法

```tsx
import React from 'react';
import { Empty } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Empty>填充按钮</Empty>
      </div>
    </div>
  );
};

export default App;
```
