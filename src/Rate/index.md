---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 17
---

# Rate 评分（开发中）

## 基本用法

```tsx
import React from 'react';
import { Rate } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Rate>填充按钮</Rate>
      </div>
    </div>
  );
};

export default App;
```