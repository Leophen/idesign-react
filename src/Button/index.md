---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
order: 1
---

# Button 按钮

常用的操作按钮。

## 基础按钮

基础按钮包括不同颜色状态下的填充按钮、描边按钮、虚框按钮和文字按钮。

```tsx
import React from 'react';
import { Button } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      {/* 灰色 info */}
      <div className="idesign-demo-block-row">
        <Button type="info">填充按钮</Button>
        <Button type="info" variant="outline">
          描边按钮
        </Button>
        <Button type="info" variant="dashed">
          虚框按钮
        </Button>
        <Button type="info" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 蓝色 primary（默认） */}
      <div className="idesign-demo-block-row">
        <Button type="primary">填充按钮</Button>
        <Button type="primary" variant="outline">
          描边按钮
        </Button>
        <Button type="primary" variant="dashed">
          虚框按钮
        </Button>
        <Button type="primary" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 绿色 success */}
      <div className="idesign-demo-block-row">
        <Button type="success">填充按钮</Button>
        <Button type="success" variant="outline">
          描边按钮
        </Button>
        <Button type="success" variant="dashed">
          虚框按钮
        </Button>
        <Button type="success" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 黄色 warning */}
      <div className="idesign-demo-block-row">
        <Button type="warning">填充按钮</Button>
        <Button type="warning" variant="outline">
          描边按钮
        </Button>
        <Button type="warning" variant="dashed">
          虚框按钮
        </Button>
        <Button type="warning" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 红色 error */}
      <div className="idesign-demo-block-row">
        <Button type="error">填充按钮</Button>
        <Button type="error" variant="outline">
          描边按钮
        </Button>
        <Button type="error" variant="dashed">
          虚框按钮
        </Button>
        <Button type="error" variant="text">
          文字按钮
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 聚焦状态

可以使用 `active` 属性来定义按钮是否被聚焦，该属性接受一个 `Boolean` 类型的值。

```tsx
import React from 'react';
import { Button } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      {/* 填充按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" active>
          Info
        </Button>
        <Button type="primary" active>
          Primary
        </Button>
        <Button type="success" active>
          Success
        </Button>
        <Button type="warning" active>
          Warning
        </Button>
        <Button type="error" active>
          Error
        </Button>
      </div>
      {/* 描边按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" variant="outline" active>
          Info
        </Button>
        <Button type="primary" variant="outline" active>
          Primary
        </Button>
        <Button type="success" variant="outline" active>
          Success
        </Button>
        <Button type="warning" variant="outline" active>
          Warning
        </Button>
        <Button type="error" variant="outline" active>
          Error
        </Button>
      </div>
      {/* 虚框按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" variant="dashed" active>
          Info
        </Button>
        <Button type="primary" variant="dashed" active>
          Primary
        </Button>
        <Button type="success" variant="dashed" active>
          Success
        </Button>
        <Button type="warning" variant="dashed" active>
          Warning
        </Button>
        <Button type="error" variant="dashed" active>
          Error
        </Button>
      </div>
      {/* 文字按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" variant="text" active>
          Info
        </Button>
        <Button type="primary" variant="text" active>
          Primary
        </Button>
        <Button type="success" variant="text" active>
          Success
        </Button>
        <Button type="warning" variant="text" active>
          Warning
        </Button>
        <Button type="error" variant="text" active>
          Error
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 禁用状态

可以使用 `disabled` 属性来定义按钮是否被禁用，该属性接受一个 `Boolean` 类型的值。

```tsx
import React from 'react';
import { Button } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      {/* 填充按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" disabled>
          Info
        </Button>
        <Button type="primary" disabled>
          Primary
        </Button>
        <Button type="success" disabled>
          Success
        </Button>
        <Button type="warning" disabled>
          Warning
        </Button>
        <Button type="error" disabled>
          Error
        </Button>
      </div>
      {/* 描边按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" variant="outline" disabled>
          Info
        </Button>
        <Button type="primary" variant="outline" disabled>
          Primary
        </Button>
        <Button type="success" variant="outline" disabled>
          Success
        </Button>
        <Button type="warning" variant="outline" disabled>
          Warning
        </Button>
        <Button type="error" variant="outline" disabled>
          Error
        </Button>
      </div>
      {/* 虚框按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" variant="dashed" disabled>
          Info
        </Button>
        <Button type="primary" variant="dashed" disabled>
          Primary
        </Button>
        <Button type="success" variant="dashed" disabled>
          Success
        </Button>
        <Button type="warning" variant="dashed" disabled>
          Warning
        </Button>
        <Button type="error" variant="dashed" disabled>
          Error
        </Button>
      </div>
      {/* 文字按钮 */}
      <div className="idesign-demo-block-row">
        <Button type="info" variant="text" disabled>
          Info
        </Button>
        <Button type="primary" variant="text" disabled>
          Primary
        </Button>
        <Button type="success" variant="text" disabled>
          Success
        </Button>
        <Button type="warning" variant="text" disabled>
          Warning
        </Button>
        <Button type="error" variant="text" disabled>
          Error
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 不同尺寸

提供 `small`、`medium`（默认）、`large` 三种尺寸的按钮。

```tsx
import React from 'react';
import { Button } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      {/* 小尺寸 small */}
      <div className="idesign-demo-block-row">
        <Button size="small">填充按钮</Button>
        <Button variant="outline" size="small">
          描边按钮
        </Button>
        <Button variant="dashed" size="small">
          虚框按钮
        </Button>
        <Button variant="text" size="small">
          文字按钮
        </Button>
      </div>
      {/* 中尺寸 medium（默认） */}
      <div className="idesign-demo-block-row">
        <Button size="medium">填充按钮</Button>
        <Button variant="outline" size="medium">
          描边按钮
        </Button>
        <Button variant="dashed" size="medium">
          虚框按钮
        </Button>
        <Button variant="text" size="medium">
          文字按钮
        </Button>
      </div>
      {/* 大尺寸 large */}
      <div className="idesign-demo-block-row">
        <Button size="large">填充按钮</Button>
        <Button variant="outline" size="large">
          描边按钮
        </Button>
        <Button variant="dashed" size="large">
          虚框按钮
        </Button>
        <Button variant="text" size="large">
          文字按钮
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 不同形状

提供 `square`、`round`（默认）、`circle` 三种形状的按钮。

```tsx
import React from 'react';
import { Button } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      {/* 方角 square */}
      <div className="idesign-demo-block-row">
        <Button shape="square">填充按钮</Button>
        <Button variant="outline" shape="square">
          描边按钮
        </Button>
        <Button variant="dashed" shape="square">
          虚框按钮
        </Button>
      </div>
      {/* 小圆角 round（默认） */}
      <div className="idesign-demo-block-row">
        <Button shape="round">填充按钮</Button>
        <Button variant="outline" shape="round">
          描边按钮
        </Button>
        <Button variant="dashed" shape="round">
          虚框按钮
        </Button>
      </div>
      {/* 大圆角 circle */}
      <div className="idesign-demo-block-row">
        <Button shape="circle">填充按钮</Button>
        <Button variant="outline" shape="circle">
          描边按钮
        </Button>
        <Button variant="dashed" shape="circle">
          虚框按钮
        </Button>
      </div>
    </div>
  );
};

export default App;
```

<API />
