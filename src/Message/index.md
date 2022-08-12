---
nav:
  title: 组件
  path: /components
group:
  title: 弹框提示组件
  order: 5
order: 2
---

# Message 全局提示

全局展示操作反馈信息。

## 基本用法

使用 `Message.info` | `Message.success` | `Message.warning` | `Message.error` 来显示对应类型的全局提示。

```tsx
import React from 'react';
import { Button, Message } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        type="primary"
        onClick={() => {
          Message.info("这是一条默认提示");
        }}
      >
        默认提示
      </Button>
      <Button
        type="success"
        onClick={() => {
          Message.success("这是一条成功提示");
        }}
      >
        成功提示
      </Button>
      <Button
        type="warning"
        onClick={() => {
          Message.warning("这是一条警告提示");
        }}
      >
        警告提示
      </Button>
      <Button
        type="error"
        onClick={() => {
          Message.error("这是一条错误提示");
        }}
      >
        错误提示
      </Button>
    </div>
  );
};

export default App;
```

## 设置提示持续时间

可通过第二个参数来设置提示持续的时间，默认为 `3`，当设为 `0` 时保持提示不关闭。

```tsx
import React from 'react';
import { Button, Message } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        onClick={() => {
          Message.info("这是一条不关闭的提示", 0);
        }}
      >
        提示不关闭
      </Button>
      <Button
        onClick={() => {
          Message.info("这是一条持续 2 秒的提示", 2);
        }}
      >
        提示 2 秒后关闭
      </Button>
      <Button
        onClick={() => {
          Message.info("这是一条持续 10 秒的提示", 10);
        }}
      >
        提示 10 秒后关闭
      </Button>
    </div>
  );
};

export default App;
```

## 设置提示展示位置

可通过第三个参数来设置提示出现的位置，默认为 `top`。

```tsx
import React from 'react';
import { Button, Message } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        onClick={() => {
          Message.info("这是一条顶部的提示", 3);
        }}
      >
        展示在顶部的提示
      </Button>
      <Button
        onClick={() => {
          Message.info("这是一条底部的提示", 3, "bottom");
        }}
      >
        展示在底部的提示
      </Button>
    </div>
  );
};

export default App;
```

## 手动关闭所有提示

可通过 `Message.clear()` 来关闭所有提示。

```tsx
import React from 'react';
import { Button, Message } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        onClick={() => {
          Message.clear();
        }}
      >
        关闭所有提示
      </Button>
      <Button
        onClick={() => {
          Message.clear('top');
        }}
      >
        关闭顶部提示
      </Button>
      <Button
        onClick={() => {
          Message.clear('bottom');
        }}
      >
        关闭底部提示
      </Button>
    </div>
  );
};

export default App;
```

## 传入配置的用法

除上述方式外，也可以传入 `{ content: "这是一条成功提示", duration: 5000 }` 对象来使用全局提示。

```tsx
import React from 'react';
import { Button, Message } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        onClick={() => {
          Message.info({
            content: "这是一条默认提示"
          });
        }}
      >
        默认提示
      </Button>
      <Button
        onClick={() => {
          Message.info({
            content: "这是一条持续 10 秒的提示",
            duration: 10,
            position: 'bottom'
          });
        }}
      >
        提示 10 秒后关闭
      </Button>
    </div>
  );
};

export default App;
```

## 自定义提示内容

通知内容或标题节点均可自定义展示：

```tsx
import React from 'react'
import { Button, Message } from 'idesign-react'

const App = () => {
  const a = <Button>这是提示的内容</Button>

  return (
    <div className="idesign-demo-block-row">
      <Button onClick={() => Message.info(a)}>
        自定义提示内容（默认）
      </Button>
      <Button
        onClick={() => {
          Message.info({
            content: a
          })
        }}
      >
        自定义提示内容（配置项）
      </Button>
    </div>
  )
}

export default App
```

## Message 方法

| 属性    | 说明         | 类型                                |
| ------- | ------------ | ----------------------------------- |
| info    | 显示信息提示 | `MessageMethod`                     |
| success | 显示成功提示 | `MessageMethod`                     |
| warning | 显示警告提示 | `MessageMethod`                     |
| error   | 显示错误提示 | `MessageMethod`                     |
| clear   | 清除全部提示 | `(position?: PositionType) => void` |

```ts
type MessageMethod = (
  messageConfig: ReactNode | MessageConfigType,
  duration?: number,
  position?: PositionType,
  closeable?: boolean
) => void;

type PositionType = 'top' | 'bottom';
```

## Message 配置项

| 属性     | 说明                 | 类型           | 默认值 |
| -------- | -------------------- | -------------- | ------ |
| content  | 提示内容             | `ReactNode`    | `--`   |
| duration | 消息持续时间，单位秒 | `number`       | `3`    |
| position | 提示位置             | `PositionType` | `top`  |
