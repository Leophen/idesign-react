---
nav:
  title: 组件
  path: /components
group:
  title: 表单组件
  order: 3
order: 16
---

# Steps 步骤条

任务流程中常见的步骤条。

## 基本用法

可通过 `current` 设置当前进行的步骤，默认为 `0`：

```tsx
import React from 'react';
import { Steps } from 'idesign-react';

const App = () => {
  return (
    <>
      <h4>不设置 current</h4>
      <Steps>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
      <h4>设置 current</h4>
      <Steps current={2}>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    </>
  );
};

export default App;
```

## 无序状态

可通过 `dot` 设置为无序小圆点步骤条：

```tsx
import React from 'react';
import { Steps } from 'idesign-react';

const App = () => {
  return (
    <>
      <h4>不设置 current</h4>
      <Steps dot>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
      <h4>设置 current</h4>
      <Steps dot current={2}>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    </>
  );
};

export default App;
```

## 垂直状态

可通过 `layout` 设置为垂直步骤条：

```tsx
import React from 'react';
import { Steps } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Steps layout="vertical" current={2}>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
      <Steps layout="vertical" dot current={2}>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    </div>
  );
};

export default App;
```

## 倒序步骤条

可通过 `reverse` 设置为倒序步骤条：

```tsx
import React from 'react';
import { Steps } from 'idesign-react';

const App = () => {
  return (
    <>
      <h4>默认正向</h4>
      <Steps>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
      <h4>反向顺序</h4>
      <Steps reverse>
        <Steps.Item
          title="步骤1"
          description="提示文字"
        />
        <Steps.Item
          title="步骤2"
          description="提示文字"
        />
        <Steps.Item
          title="步骤3"
          description="提示文字"
        />
      </Steps>
    </>
  );
};

export default App;
```

## Steps API

| 属性      | 说明               | 类型                   | 默认值       |
| --------- | ------------------ | ---------------------- | ------------ |
| children  | 按钮内容           | `ReactNode`            | --           |
| className | 类名               | `string`               | --           |
| style     | 自定义样式         | `CSSProperties`        | --           |
| current   | 进行到哪一步       | `number`               | `0`          |
| layout    | 步骤条方向         | `horizontal〡vertical` | `horizontal` |
| reverse   | 步骤条是否倒序     | `boolean`              | 'false'      |
| dot       | 是否为无序的步骤条 | `boolean`              | 'false'      |

## StepsItem API

| 属性        | 说明               | 类型              | 默认值  |
| ----------- | ------------------ | ----------------- | ------- |
| className   | 类名               | `string`          | --      |
| style       | 自定义样式         | `CSSProperties`   | --      |
| title       | 步骤标题           | `React.ReactNode` | `--`    |
| description | 步骤描述           | `React.ReactNode` | `--`    |
