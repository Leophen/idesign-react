---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 12
---

# Upload 上传

用户上传任意内容的组件。

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
      <Upload theme="drag" onChange={handleChange} />
    </div>
  );
};

export default App;
```

## 自定义提示

可通过 `placeholder` 属性控制自定义占位符：

```tsx
import React from 'react';
import { Upload } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Upload placeholder="自定义占位符" />
      <Upload placeholder="自定义占位符" />
      <Upload placeholder="自定义占位符" />
    </div>
  );
};

export default App;
```

## 自定义节点

可通过包裹自定义节点来展示任意上传组件：

```tsx
import React from 'react';
import { Upload } from 'idesign-react';

const App = () => {
  return (
    <Upload>
      <img width={100} src="/images/logo.svg" />
    </Upload>
  );
};

export default App;
```

<API />
