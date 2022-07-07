---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 12
---

# Upload 上传（开发中）

## 基本用法

```tsx
import React from 'react';
import { Upload } from 'idesign-react';

const App = () => {
  const handleChange = (file) => {
    console.log(file)
  }

  return (
    <Upload onChange={handleChange} />
  );
};

export default App;
```

## 不同主题

可通过 `theme` 属性控制不同属性的上传组件：

```tsx
import React from 'react';
import { Upload } from 'idesign-react';

const App = () => {
  const handleChange = (file) => {
    console.log(file)
  }

  return (
    <div className="idesign-demo-block-row">
      <Upload theme="button" onChange={handleChange} />
      <Upload theme="block" onChange={handleChange} />
    </div>
  );
};

export default App;
```

<API />
