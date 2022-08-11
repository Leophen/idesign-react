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

与 [Message](./message) 组件同理，可使用 `Notification.info` | `Notification.success` | `Notification.warning` | `Notification.error` 来显示对应类型的全局通知：

```jsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        type="primary"
        onClick={() => Notification.info("这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通这是一条消息通知")}
      >
        默认通知
      </Button>
      <Button
        type="success"
        onClick={() => Notification.success("这是一条成功通知这是一条成功通知这是一条成功通知这是一条成功通知这是一条成功通知")}
      >
        成功通知
      </Button>
      <Button
        type="warning"
        onClick={() => Notification.warning("这是一条警告通知这是一条警告通知这是一条警告通知这是一条警告通知这是一条警告通知")}
      >
        警告通知
      </Button>
      <Button
        type="error"
        onClick={() => Notification.error("这是一条错误通知这是一条错误通知这是一条错误通知这是一条错误通知这是一条错误通知")}
      >
        错误通知
      </Button>
    </div>
  );
};

export default App;
```

## 传入配置项

也可通过传入配置项来使用：

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        type="primary"
        onClick={() => {
          Notification.info({
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
            content: "这是一条错误通知这是一条错误通知这是一条错误通知这是一条错误通知这是一条错误通知"
          });
        }}
      >
        错误通知
      </Button>
    </div>
  );
};

export default App;
```

## 添加通知标题

注意，标题仅可通过传入 `title` 配置项的方式来添加：

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <Button
      onClick={() => {
        Notification.info({
          title: "这是标题",
          content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
        });
      }}
    >
      有标题的通知
    </Button>
  );
};

export default App;
```

## 通知持续时间

默认方式可通过第二个参数来设置通知持续时间，配置项的方式则可通过 `duration` 来设置，单位为秒，默认为 `3`，当设为 `0` 时表示不关闭：

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
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
        通知不关闭（默认）
      </Button>
      <Button
        onClick={() => Notification.info("这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知", 0)}
      >
        通知不关闭（配置项）
      </Button>
      <Button
        onClick={() => Notification.info("这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知", 2)}
      >
        2秒后关闭的通知
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
        10秒后关闭的通知
      </Button>
    </div>
  );
};

export default App;
```

## 通知出现位置

默认方式可通过第三个参数来设置通知出现的位置，配置项的方式则可通过 `position` 来设置，默认为 `top-right`：

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        onClick={() => Notification.info("这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知", 3, 'top-left')}
      >
        展示在左上角的通知
      </Button>
      <Button
        onClick={() => Notification.info("这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知", 3, 'top-right')}
      >
        展示在右上角的通知
      </Button>
      <Button
        onClick={() => {
          Notification.info({
            title: '默认通知',
            content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
            position: 'bottom-right'
          });
        }}
      >
        展示在右下角的通知
      </Button>
      <Button
        onClick={() => {
          Notification.info({
            title: '默认通知',
            content: "这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知",
            position: 'bottom-left'
          });
        }}
      >
        展示在左下角的通知
      </Button>
    </div>
  );
};

export default App;
```

## 可关闭的通知

默认方式可通过第四个参数来设置是否显示关闭按钮，配置项的方式则可通过 `closeable` 来设置，默认为 `false`：

```tsx
import React from 'react'
import { Button, Notification } from 'idesign-react'

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button
        onClick={() => Notification.info("这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知", 3, 'top-right', true)}
      >
        显示关闭按钮的通知（默认）
      </Button>
      <Button
        onClick={() => {
          Notification.info({
            content: '这是一个没有标题的纯内容通知',
            closeable: true
          })
        }}
      >
        显示关闭按钮的通知（配置项）
      </Button>
    </div>
  )
}

export default App
```

## 自定义通知内容

通知内容或标题节点均可自定义展示：

```tsx
import React from 'react'
import { Button, Notification } from 'idesign-react'

const App = () => {
  const a = <Button>这是通知的标题</Button>
  const b = <Button>这是通知的内容</Button>

  return (
    <div className="idesign-demo-block-row">
      <Button onClick={() => Notification.info(a)}>
        自定义通知内容（默认）
      </Button>
      <Button
        onClick={() => {
          Notification.info({
            title: a,
            content: b
          })
        }}
      >
        自定义通知内容（配置项）
      </Button>
    </div>
  )
}

export default App
```

## 手动关闭所有提示

可通过 `Notification.clear()` 来关闭所有提示。

```tsx
import React from 'react';
import { Button, Notification } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Button onClick={() => Notification.clear()}>
        关闭所有通知
      </Button>
      <Button onClick={() => Notification.clear('top-left')}>
        关闭左上角通知
      </Button>
      <Button onClick={() => Notification.clear('top-right')}>
        关闭右上角通知
      </Button>
      <Button onClick={() => Notification.clear('bottom-left')}>
        关闭左下角通知
      </Button>
      <Button onClick={() => Notification.clear('bottom-right')}>
        关闭右下角通知
      </Button>
    </div>
  );
};

export default App;
```

## Notification 方法

| 属性    | 说明         | 类型                                |
| ------- | ------------ | ----------------------------------- |
| info    | 显示信息通知 | `NotificationMethod`                |
| success | 显示成功通知 | `NotificationMethod`                |
| warning | 显示警告通知 | `NotificationMethod`                |
| error   | 显示错误通知 | `NotificationMethod`                |
| clear   | 清除全部通知 | `(position?: PositionType) => void` |

```ts
type NotificationMethod = (
  messageConfig: ReactNode | NotificationConfigType,
  duration?: number,
  position?: PositionType,
  closeable?: boolean
) => void;

type PositionType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
```

## Notification 配置项

| 属性      | 说明                 | 类型           | 默认值      |
| --------- | -------------------- | -------------- | ----------- |
| title     | 通知标题             | `ReactNode`    | `--`        |
| content   | 通知内容             | `ReactNode`    | `--`        |
| duration  | 消息持续时间，单位秒 | `number`       | `3`         |
| position  | 通知位置             | `PositionType` | `top-right` |
| closeable | 通知是否可关闭       | `boolean`      | `false`     |
