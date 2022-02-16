---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 2
---

# Empty 空状态

空状态时的展示占位图。

## 基本用法

`Empty` 可直接包裹展位图提示文字。

```tsx
import React from 'react';
import { Empty } from 'idesign-react';

const App = () => {
  return <Empty>暂无数据</Empty>;
};

export default App;
```

## 不同尺寸

提供 `small`、`medium`（默认）、`large` 三种不同尺寸的空状态展位图。

```tsx
import React from 'react';
import { Empty } from 'idesign-react';

const App = () => {
  return (
    <>
      <Empty size="small">暂无数据</Empty>
      <Empty size="medium">暂无数据</Empty>
      <Empty size="large">暂无数据</Empty>
    </>
  );
};

export default App;
```

## 不同类型

提供 `default`（默认）、`shoppingTrolley`、`favorite`、`gold` 四种不同类型的空状态展位图。

```tsx
import React from 'react';
import { Empty } from 'idesign-react';

const App = () => {
  return (
    <>
      <Empty type="default">暂无数据</Empty>
      <Empty type="shoppingTrolley">购物车空空如也</Empty>
      <Empty type="favorite">收藏夹为空</Empty>
      <Empty type="gold">暂无金币</Empty>
    </>
  );
};

export default App;
```

## 自定义展位图

提供 `default`（默认）、`shoppingTrolley`、`favorite`、`gold` 四种不同类型的空状态展位图。

```tsx
import React from 'react';
import { Empty } from 'idesign-react';

const App = () => {
  return <Empty image="https://picsum.photos/180/120">自定义展位图</Empty>;
};

export default App;
```

<API src="./index.tsx"></API>
