---
nav:
  title: 组件
  path: /components
group:
  title: 弹框提示组件
  order: 5
order: 6
---

# Popup 气泡提示

基于指定节点的通用气泡提示框。

## 基本用法

通过 `content` 属性指定气泡内容。

```tsx
import React from 'react';
import { Button, Popup } from 'idesign-react';

const App = () => {
  return (
    <Popup content="提示内容">
      <Button>悬浮提示</Button>
    </Popup>
  );
};

export default App;
```

## 禁用状态

通过 `disabled` 属性控制气泡禁用。

```tsx
import React from 'react';
import { Button, Popup } from 'idesign-react';

const App = () => {
  return (
    <Popup content="提示内容" disabled={true}>
      <Button>禁用气泡</Button>
    </Popup>
  );
};

export default App;
```

## 不同触发方式

可通过 `trigger` 属性指定触发方式，默认为 `hover`。

```tsx
import React from 'react';
import { Button, Popup } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-row">
      <Popup content="提示内容">
        <Button>悬浮提示</Button>
      </Popup>
      <Popup content="提示内容" trigger="click">
        <Button>点击提示</Button>
      </Popup>
      <Popup content="提示内容" trigger="context-menu">
        <Button>右击提示</Button>
      </Popup>
    </div>
  );
};

export default App;
```

## 不同触发方向

可通过 `placement` 属性指定气泡触发方向，默认为 `top`。

```tsx
import React from 'react'
import { Button, Popup } from 'idesign-react'

const App = () => {
  return (
    <div className="idesign-demo-block-popup">
      <Popup content="气泡提示内容 top" placement="top">
        <Button className="Top">top</Button>
      </Popup>
      <Popup content="气泡提示内容 top-start" placement="top-start">
        <Button className="TopLeft">top-start</Button>
      </Popup>
      <Popup content="气泡提示内容 top-end" placement="top-end">
        <Button className="TopRight">top-end</Button>
      </Popup>
      <Popup content="气泡提示内容 bottom" placement="bottom">
        <Button className="Bottom">bottom</Button>
      </Popup>
      <Popup content="气泡提示内容 bottom-start" placement="bottom-start">
        <Button className="BottomLeft">bottom-start</Button>
      </Popup>
      <Popup content="气泡提示内容 bottom-end" placement="bottom-end">
        <Button className="BottomRight">bottom-end</Button>
      </Popup>
      <Popup content="气泡提示内容 left" placement="left">
        <Button className="Left">left</Button>
      </Popup>
      <Popup content="气泡提示内容 left-start" placement="left-start">
        <Button className="LeftTop">left-start</Button>
      </Popup>
      <Popup content="气泡提示内容 left-end" placement="left-end">
        <Button className="LeftBottom">left-end</Button>
      </Popup>
      <Popup content="气泡提示内容 right" placement="right">
        <Button className="Right">right</Button>
      </Popup>
      <Popup content="气泡提示内容 right-start" placement="right-start">
        <Button className="RightTop">right-start</Button>
      </Popup>
      <Popup content="气泡提示内容 right-end" placement="right-end">
        <Button className="RightBottom">right-end</Button>
      </Popup>
    </div>
  )
}

export default App
```

## 手动显示隐藏

通过 `defaultVisible` 属性显示默认显示隐藏，通过 `visible` 属性手动切换气泡显示隐藏。

```tsx
import React from 'react';
import { Button, Popup } from 'idesign-react';

const App = () => {
  return (
    <>
      <h4>默认显示</h4>
      <Popup placement="right" defaultVisible={true} content="提示内容">
        <Button>悬浮提示</Button>
      </Popup>
      <h4>默认隐藏</h4>
      <Popup placement="right" defaultVisible={false} content="提示内容">
        <Button>悬浮提示</Button>
      </Popup>
      <h4>固定显示</h4>
      <Popup placement="right" visible={true} content="提示内容">
        <Button>悬浮提示</Button>
      </Popup>
      <h4>固定隐藏</h4>
      <Popup placement="right" visible={false} content="提示内容">
        <Button>悬浮提示</Button>
      </Popup>
    </>
  );
};

export default App;
```

<API />
