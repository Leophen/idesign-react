---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 8
---

# Collapse 折叠面板（开发中）

## 基本用法

```tsx
import React from 'react';
import { Collapse } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Collapse>填充按钮</Collapse>
      </div>
    </div>
  );
};

export default App;
```
