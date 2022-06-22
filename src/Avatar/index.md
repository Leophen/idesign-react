---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 4
---

# Avatar 头像

## 基本用法

通过 `image` 属性传入头像地址，如果链接失效或不传入链接会显示默认用户图标：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Avatar image="https://picsum.photos/180/120" />
      <Avatar image="https://picsum123.photos/180/120" />
      <Avatar />
    </div>
  );
};

export default App;
```

## 自定义头像内容

通过 `children` 子节点自定义头像内容：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <Avatar>L</Avatar>
  );
};

export default App;
```

## 自定义头像大小

通过 `size` 属性控制头像大小：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Avatar size={24}>L</Avatar>
      <Avatar size={32}>L</Avatar>
      <Avatar size={40}>L</Avatar>
    </div>
  );
};

export default App;
```

## 自定义头像形状

通过 `shape` 属性控制头像形状：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Avatar shape="circle">L</Avatar>
      <Avatar shape="round">L</Avatar>
    </div>
  );
};

export default App;
```

## 自定义头像底色

通过 `color` 属性控制头像底色：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Avatar color="#BCE0A4">L</Avatar>
      <Avatar color="#F0B9B7">L</Avatar>
    </div>
  );
};

export default App;
```

## 组合头像

可通过 `Avatar.Group` 包裹为组合头像：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <Avatar.Group>
      <Avatar>L</Avatar>
      <Avatar>P</Avatar>
      <Avatar>L</Avatar>
    </Avatar.Group>
  );
};

export default App;
```

## 组合折叠方向

可通过 `cascading` 属性控制组合头像折叠方向：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Avatar.Group cascading="right">
        <Avatar>L</Avatar>
        <Avatar>P</Avatar>
        <Avatar>L</Avatar>
      </Avatar.Group>
      <Avatar.Group cascading="left">
        <Avatar>L</Avatar>
        <Avatar>P</Avatar>
        <Avatar>L</Avatar>
      </Avatar.Group>
    </div>
  );
};

export default App;
```

## 组合头像透传

`Avatar.Group` 可透传 `size`、`shape`、`color` 属性，优先级低于单个头像对应的属性：

```tsx
import React from 'react';
import { Avatar } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <Avatar.Group
        size={40}
        shape="round"
        color="#5598F7"
      >
        <Avatar>L</Avatar>
        <Avatar>P</Avatar>
        <Avatar>L</Avatar>
      </Avatar.Group>
      <Avatar.Group
        size={40}
        shape="round"
        color="#5598F7"
      >
        <Avatar size={32}>L</Avatar>
        <Avatar shape="circle">P</Avatar>
        <Avatar color="#F0B9B7">L</Avatar>
      </Avatar.Group>
    </div>
  );
};

export default App;
```

## Avatar API

<API hideTitle />

## AvatarGroup API

| 属性      | 说明         | 类型            | 默认值    |
| --------- | ------------ | --------------- | --------- |
| children  | 头像         | `ReactNode`     | `--`        |
| className | 组合头像类名 | `string`        | `--`        |
| style     | 组合头像样式 | `CSSProperties` | `--`        |
| size      | 全局头像大小 | `number`        | `32`      |
| shape     | 全局头像形状 | `circle〡round` | `circle`  |
| color     | 全局头像底色 | `string`        | `#c1c4cb` |
| cascading | 组合折叠方向 | `left〡right`   | `right`   |
