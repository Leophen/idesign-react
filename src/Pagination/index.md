---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 4
---

# Pagination 分页

## 基本用法

```tsx
import React from 'react';
import { Pagination } from 'idesign-react';

const App = () => {
  const handleChange = (val) => {
    console.log(val)
  }

  return (
    <div className="idesign-demo-block-column">
      <Pagination total={100} />
      <Pagination current={10} total={999} pageSize={20} onChange={handleChange} />
    </div>
  );
};

export default App;
```

## 全局禁用

可通过 `disabled` 属性隐藏分页选择器：

```tsx
import React from 'react';
import { Pagination } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Pagination disabled total={100} />
      <Pagination disabled current={10} total={999} pageSize={20} />
    </div>
  );
};

export default App;
```

## 隐藏分页选择器

可通过 `hideSelect` 属性隐藏分页选择器：

```tsx
import React from 'react';
import { Pagination } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Pagination hideSelect total={100} />
      <Pagination hideSelect current={10} total={999} pageSize={20} />
    </div>
  );
};

export default App;
```

## 隐藏跳转输入框

可通过 `hideInput` 属性隐藏分页选择器：

```tsx
import React from 'react';
import { Pagination } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Pagination hideInput total={100} />
      <Pagination hideSelect hideInput current={10} total={999} pageSize={20} />
    </div>
  );
};

export default App;
```

<API />
