---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 3
---

# Loading 加载中

## 基本用法

```tsx
import React from 'react';
import { Loading } from 'idesign-react';

const App = () => {
  return (
    <Loading />
  );
};

export default App;
```

## 旋转提示

```tsx
import React from 'react';
import { Loading } from 'idesign-react';

const App = () => {
  return (
    <Loading info="加载中" />
  );
};

export default App;
```

## 自定义旋转图标

可通过 `icon` 属性自定义图标，[点击查看可选图标](./icon#%E5%85%A8%E9%83%A8%E5%9B%BE%E6%A0%87)。

```tsx
import React from 'react';
import { Loading } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Loading icon="RefreshRight" />
      <Loading icon="SettingFill" />
    </div>
  );
};

export default App;
```

## 自定义旋转图标大小

可通过 `size` 属性自定义图标。

```tsx
import React from 'react';
import { Loading } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Loading size={16} />
      <Loading size={32} />
      <Loading size={48} />
    </div>
  );
};

export default App;
```

## 自定义旋转图标颜色

可通过 `color` 属性自定义图标。

```tsx
import React from 'react';
import { Loading } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Loading color="#E06B67" />
      <Loading color="#DBA049" />
      <Loading color="#7EBF50" />
    </div>
  );
};

export default App;
```

## 自定义旋转内容

可通过 `spinner` 属性自定义旋转内容。

```tsx
import React from 'react';
import { Loading } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Loading spinner="🌞" />
      <Loading spinner={<span>※</span>} />
    </div>
  );
};

export default App;
```

<API />
