---
nav:
  title: 组件
  path: /components
group:
  title: 弹框提示组件
  order: 5
order: 6
---

# Popup 气泡提示（开发中）

## 基本用法

```tsx
import React from 'react';
import { Button, Popup } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Popup content="提示内容">
          <Button>悬浮提示</Button>
        </Popup>
      </div>
    </div>
  );
};

export default App;
```
