---
nav:
  title: 组件
  path: /components
group:
  title: 弹框提示组件
  order: 5
order: 3
---

# Notification 消息通知

全局展示通知提醒信息。

## 基本用法

使用 `Notification.info` | `Notification.success` | `Notification.warning` | `Notification.error` 来显示对应类型的全局通知，需传入配置项，例如传入 `{ title: "通知标题", duration: "通知内容" }` 对象来指定通知的标题及内容。

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button
          type="primary"
          onClick={() => {
            Notification.info({
              title: '默认通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
            });
          }}
        >
          默认通知
        </Button>
        <Button
          type="success"
          onClick={() => {
            Notification.success({
              title: '成功通知',
              content: "这是一条成功通知这是一条成功通知这是一条成功通知这是一条成功通知这是一条成功通知"
            });
          }}
        >
          成功通知
        </Button>
        <Button
          type="warning"
          onClick={() => {
            Notification.warning({
              title: '警告通知',
              content: "这是一条警告通知这是一条警告通知这是一条警告通知这是一条警告通知这是一条警告通知"
            });
          }}
        >
          警告通知
        </Button>
        <Button
          type="error"
          onClick={() => {
            Notification.error({
              title: '错误通知',
              content: "这是一条错误通知这是一条错误通知这是一条错误通知这是一条错误通知这是一条错误通知"
            });
          }}
        >
          错误通知
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 自定义通知内容

可通过配置项的 `content` 参数来设置通知自定义的内容。

```tsx
import React from 'react'
import { Button, Notification } from 'idesign-react'

const App = () => {
  const btn = (
    <div>
      <Button>这是一个按钮</Button>
    </div>
  )
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button
          type="primary"
          onClick={() => {
            Notification.info({
              content: '这是一个没有标题的纯内容通知'
            })
          }}
        >
          没有标题的通知
        </Button>
        <Button
          type="primary"
          onClick={() => {
            Notification.info({
              title: '自定义内容',
              content: btn
            })
          }}
        >
          自定义内容的通知
        </Button>
      </div>
    </div>
  )
}

export default App
```

## 设置通知持续时间

可通过配置项的 `duration` 参数来设置通知持续的时间，默认为 `3`，当设为 `0` 时保持通知不关闭。

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button
          onClick={() => {
            Notification.info({
              title: '这是一条不关闭的通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              duration: 0
            });
          }}
        >
          通知不关闭
        </Button>
        <Button
          onClick={() => {
            Notification.info({
              title: '这是一条持续 2 秒的通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              duration: 2
            });
          }}
        >
          通知 2 秒后关闭
        </Button>
        <Button
          onClick={() => {
            Notification.info({
              title: '这是一条持续 10 秒的通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              duration: 10
            });
          }}
        >
          通知 10 秒后关闭
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 设置通知展示位置

可通过配置项的 `placement` 参数来设置通知出现的位置，默认为 `top-right`。

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button
          type="primary"
          onClick={() => {
            Notification.info({
              title: '默认通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              placement: 'top-left'
            });
          }}
        >
          展示在左上角的通知
        </Button>
        <Button
          type="primary"
          onClick={() => {
            Notification.info({
              title: '默认通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              placement: 'top-right'
            });
          }}
        >
          展示在右上角的通知
        </Button>
        <Button
          type="primary"
          onClick={() => {
            Notification.info({
              title: '默认通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              placement: 'bottom-right'
            });
          }}
        >
          展示在右下角的通知
        </Button>
        <Button
          type="primary"
          onClick={() => {
            Notification.info({
              title: '默认通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              placement: 'bottom-left'
            });
          }}
        >
          展示在左下角的通知
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 可单项关闭的通知

可通过配置项的 `closeable` 参数来控制通知是否可单项关闭，默认为 `false`。

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button
          onClick={() => {
            Notification.info({
              title: '这是一条不关闭的通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              duration: 0,
              closeable: true
            });
          }}
        >
          通知不关闭
        </Button>
        <Button
          onClick={() => {
            Notification.info({
              title: '这是一条持续 3 秒的通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              closeable: true
            });
          }}
        >
          通知 3 秒后关闭
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## 手动关闭所有提示

可通过 `Notification.closeAll()` 来关闭所有提示。

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Button
          onClick={() => {
            Notification.info({
              title: '这是一条不关闭的通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              duration: 0
            });
          }}
        >
          通知不关闭
        </Button>
        <Button
          onClick={() => {
            Notification.info({
              title: '这是一条持续 2 秒的通知',
              content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
              duration: 2
            });
          }}
        >
          通知 2 秒后关闭
        </Button>
        <Button
          onClick={() => {
            Notification.closeAll();
          }}
        >
          关闭所有通知
        </Button>
      </div>
    </div>
  );
};

export default App;
```

## Notification 配置项

| 属性      | 说明                                        | 类型                                                     | 默认值      |
| --------- | ------------------------------------------- | -------------------------------------------------------- | ----------- |
| title     | 通知标题                                    | `string`                                                 | --          |
| content   | 通知内容                                    | `ReactNode`                                              | --          |
| duration  | 通知持续时间，单位：秒。值为 0 表示永久显示 | `number`                                                 | `3`         |
| placement | 通知位置                                    | `'top-left'〡'top-right'〡'bottom-left'〡'bottom-right'` | `top-right` |
| closeable | 通知是否可关闭                              | `boolean`                                                | `false`     |
