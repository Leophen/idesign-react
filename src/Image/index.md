---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 6
---

# Image 图片查看器（开发中）

## 基本用法

```tsx
import React from 'react';
import { Image } from 'idesign-react';

const App = () => {
  return (
    <Image src="https://picsum.photos/180/120" />
  );
};

export default App;
```

## 自定义大小

通过 `width` 属性控制图片大小。

```tsx
import React from 'react';
import { Image } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Image width={260} src="https://picsum.photos/180/120" />
      <Image width="260px" src="https://picsum.photos/180/120" />
    </div>
  );
};

export default App;
```

<API />
