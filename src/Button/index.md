---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
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
        <Button theme="info">填充按钮</Button>
        <Button theme="info" variant="outline">
          描边按钮
        </Button>
        <Button theme="info" variant="dashed">
          虚框按钮
        </Button>
        <Button theme="info" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 蓝色 primary（默认） */}
      <div className="idesign-demo-block-row">
        <Button theme="primary">填充按钮</Button>
        <Button theme="primary" variant="outline">
          描边按钮
        </Button>
        <Button theme="primary" variant="dashed">
          虚框按钮
        </Button>
        <Button theme="primary" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 绿色 success */}
      <div className="idesign-demo-block-row">
        <Button theme="success">填充按钮</Button>
        <Button theme="success" variant="outline">
          描边按钮
        </Button>
        <Button theme="success" variant="dashed">
          虚框按钮
        </Button>
        <Button theme="success" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 黄色 warning */}
      <div className="idesign-demo-block-row">
        <Button theme="warning">填充按钮</Button>
        <Button theme="warning" variant="outline">
          描边按钮
        </Button>
        <Button theme="warning" variant="dashed">
          虚框按钮
        </Button>
        <Button theme="warning" variant="text">
          文字按钮
        </Button>
      </div>
      {/* 红色 danger */}
      <div className="idesign-demo-block-row">
        <Button theme="danger">填充按钮</Button>
        <Button theme="danger" variant="outline">
          描边按钮
        </Button>
        <Button theme="danger" variant="dashed">
          虚框按钮
        </Button>
        <Button theme="danger" variant="text">
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
        <Button theme="info" active>
          Info
        </Button>
        <Button theme="primary" active>
          Primary
        </Button>
        <Button theme="success" active>
          Success
        </Button>
        <Button theme="warning" active>
          Warning
        </Button>
        <Button theme="danger" active>
          Danger
        </Button>
      </div>
      {/* 描边按钮 */}
      <div className="idesign-demo-block-row">
        <Button theme="info" variant="outline" active>
          Info
        </Button>
        <Button theme="primary" variant="outline" active>
          Primary
        </Button>
        <Button theme="success" variant="outline" active>
          Success
        </Button>
        <Button theme="warning" variant="outline" active>
          Warning
        </Button>
        <Button theme="danger" variant="outline" active>
          Danger
        </Button>
      </div>
      {/* 虚框按钮 */}
      <div className="idesign-demo-block-row">
        <Button theme="info" variant="dashed" active>
          Info
        </Button>
        <Button theme="primary" variant="dashed" active>
          Primary
        </Button>
        <Button theme="success" variant="dashed" active>
          Success
        </Button>
        <Button theme="warning" variant="dashed" active>
          Warning
        </Button>
        <Button theme="danger" variant="dashed" active>
          Danger
        </Button>
      </div>
      {/* 文字按钮 */}
      <div className="idesign-demo-block-row">
        <Button theme="info" variant="text" active>
          Info
        </Button>
        <Button theme="primary" variant="text" active>
          Primary
        </Button>
        <Button theme="success" variant="text" active>
          Success
        </Button>
        <Button theme="warning" variant="text" active>
          Warning
        </Button>
        <Button theme="danger" variant="text" active>
          Danger
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
        <Button theme="info" disabled>
          Info
        </Button>
        <Button theme="primary" disabled>
          Primary
        </Button>
        <Button theme="success" disabled>
          Success
        </Button>
        <Button theme="warning" disabled>
          Warning
        </Button>
        <Button theme="danger" disabled>
          Danger
        </Button>
      </div>
      {/* 描边按钮 */}
      <div className="idesign-demo-block-row">
        <Button theme="info" variant="outline" disabled>
          Info
        </Button>
        <Button theme="primary" variant="outline" disabled>
          Primary
        </Button>
        <Button theme="success" variant="outline" disabled>
          Success
        </Button>
        <Button theme="warning" variant="outline" disabled>
          Warning
        </Button>
        <Button theme="danger" variant="outline" disabled>
          Danger
        </Button>
      </div>
      {/* 虚框按钮 */}
      <div className="idesign-demo-block-row">
        <Button theme="info" variant="dashed" disabled>
          Info
        </Button>
        <Button theme="primary" variant="dashed" disabled>
          Primary
        </Button>
        <Button theme="success" variant="dashed" disabled>
          Success
        </Button>
        <Button theme="warning" variant="dashed" disabled>
          Warning
        </Button>
        <Button theme="danger" variant="dashed" disabled>
          Danger
        </Button>
      </div>
      {/* 文字按钮 */}
      <div className="idesign-demo-block-row">
        <Button theme="info" variant="text" disabled>
          Info
        </Button>
        <Button theme="primary" variant="text" disabled>
          Primary
        </Button>
        <Button theme="success" variant="text" disabled>
          Success
        </Button>
        <Button theme="warning" variant="text" disabled>
          Warning
        </Button>
        <Button theme="danger" variant="text" disabled>
          Danger
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
