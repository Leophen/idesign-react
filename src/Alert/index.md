---
nav:
  title: 组件
  path: /components
group:
  title: 弹框提示组件
  order: 5
order: 1
---

# Alert 提示

用于页面中展示重要的提示信息。

## 基本用法

Alert 组件提供了四种不同的提示类型：`info`（默认）、`success`、`warning` 和 `error`。

```tsx
import React from 'react';
import { Alert } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Alert type="info" message="这是一条普通的消息提示" />
      <Alert type="success" message="这是一条成功的消息提示" />
      <Alert type="warning" message="这是一条警示消息" />
      <Alert type="error" message="高危操作 / 出错信息提示" />
    </div>
  );
};

export default App;
```

## 带关闭按钮的提示

提供 `closable` 属性控制提示是否可关闭。

```tsx
import React from 'react';
import { Alert } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Alert type="info" message="这是一条普通的消息提示" closable />
      <Alert type="success" message="这是一条成功的消息提示" closable />
      <Alert type="warning" message="这是一条警示消息" closable />
      <Alert type="error" message="高危操作 / 出错信息提示" closable />
    </div>
  );
};

export default App;
```

## 带相关操作的提示

提供 `operation` 属性来配置跟在提示内容后的操作。

```tsx
import React from 'react';
import { Alert } from 'idesign-react';

const App = () => {
  const operation = <span>相关操作</span>;

  return (
    <div className="idesign-demo-block-column">
      <Alert type="info" message="这是一条普通的消息提示" operation={operation} closable />
      <Alert type="success" message="这是一条成功的消息提示" operation={operation} closable />
      <Alert type="warning" message="这是一条警示消息" operation={operation} closable />
      <Alert type="error" message="高危操作 / 出错信息提示" operation={operation} closable />
    </div>
  );
};

export default App;
```

## 带标题的提示

提供 `title` 属性来配置提示内容的标题。

```tsx
import React from 'react';
import { Alert } from 'idesign-react';

const App = () => {
  const operation = <span>相关操作</span>;

  return (
    <div className="idesign-demo-block-column">
      <Alert
        type="info"
        title="消息提示标题"
        message="这是一条普通的消息提示"
        operation={operation}
        closable
      />
      <Alert
        type="success"
        title="消息提示标题"
        message="这是一条成功的消息提示"
        operation={operation}
        closable
      />
      <Alert
        type="warning"
        title="消息提示标题"
        message="这是一条警示消息"
        operation={operation}
        closable
      />
      <Alert
        type="error"
        title="消息提示标题"
        message="高危操作 / 出错信息提示"
        operation={operation}
        closable
      />
    </div>
  );
};

export default App;
```

<API src="./index.tsx"></API>
