---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 2
---

# Tabs 选项卡（开发中）

## 基本用法

```tsx
import React from 'react';
import { Tabs } from 'idesign-react';

const App = () => {
  return (
    <Tabs>
      <Tabs.Item>选项卡1</Tabs.Item>
      <Tabs.Item>选项卡2</Tabs.Item>
      <Tabs.Item>选项卡3</Tabs.Item>
    </Tabs>
  );
};

export default App;
```
