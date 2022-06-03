---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 5
---

# Badge 提示徽章

## 基本用法

```tsx
import React from 'react';
import { Button, Badge } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Badge>
        <Button>按钮</Button>
      </Badge>
      <Badge count="new">
        <Button>按钮</Button>
      </Badge>
    </div>
  );
};

export default App;
```

## 最大数字

可通过 `maxCount` 属性设置最大数字，默认为 `99`，超出则加上 `+`。

```tsx
import React from 'react';
import { Button, Badge } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Badge count={10} maxCount={9}>
        <Button>按钮</Button>
      </Badge>
      <Badge count={100}>
        <Button>按钮</Button>
      </Badge>
      <Badge count={1000} maxCount={999}>
        <Button>按钮</Button>
      </Badge>
    </div>
  );
};

export default App;
```

## 自定义颜色

可通过 `color` 属性自定义徽标颜色。

```tsx
import React from 'react';
import { Button, Badge } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Badge color="#7EBF50">
        <Button>按钮</Button>
      </Badge>
      <Badge color="#F2AD4E">
        <Button>按钮</Button>
      </Badge>
    </div>
  );
};

export default App;
```

## 小红点徽章

可通过 `dot` 属性控制为小红点样式。

```tsx
import React from 'react';
import { Button, Badge } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Badge dot>
        <Button>按钮</Button>
      </Badge>
      <Badge dot count="new">
        <Button>按钮</Button>
      </Badge>
    </div>
  );
};

export default App;
```

## 自定义尺寸

可通过 `size` 属性自定义徽标尺寸。

```tsx
import React from 'react';
import { Button, Badge } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Badge size="medium">
        <Button>按钮</Button>
      </Badge>
      <Badge size="small">
        <Button>按钮</Button>
      </Badge>
    </div>
  );
};

export default App;
```

## 自定义形状

可通过 `shape` 属性自定义徽标形状。

```tsx
import React from 'react';
import { Button, Badge } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Badge shape="circle">
        <Button>按钮</Button>
      </Badge>
      <Badge shape="round">
        <Button>按钮</Button>
      </Badge>
    </div>
  );
};

export default App;
```

## 徽标位置偏移

可通过 `offset` 属性设置徽标位置偏移量。

```tsx
import React from 'react';
import { Button, Badge } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Badge count={6}>
        <Button>按钮</Button>
      </Badge>
      <Badge count={6} offset={[10, 10]}>
        <Button>按钮</Button>
      </Badge>
      <Badge count={6} offset={[-10, 10]}>
        <Button>按钮</Button>
      </Badge>
    </div>
  );
};

export default App;
```

<API />
