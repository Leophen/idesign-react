---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 7
---

# Carousel 轮播图

用于展示多个内容的循环播放轮播组件。

## 基本用法

可通过 `defaultCurrent` 属性控制默认轮播项：

```tsx
import React from 'react';
import { Carousel } from 'idesign-react';

const App = () => {
  const handleChange = (val) => {
    console.log(val)
  }

  return (
    <Carousel defaultCurrent={1} onChange={handleChange}>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>1</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>2</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>3</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>4</div>
      </Carousel.Item>
    </Carousel>
  );
};

export default App;
```

## 垂直布局

可通过 `direction` 属性控制轮播图布局方向：

```tsx
import React from 'react';
import { Carousel } from 'idesign-react';

const App = () => {
  return (
    <Carousel direction="vertical">
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>1</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>2</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>3</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>4</div>
      </Carousel.Item>
    </Carousel>
  );
};

export default App;
```

## 自动轮播

可通过 `autoPlay` 属性控制是否自动轮播，可配合 `interval` 属性控制轮播间隔时间（单位为秒）

```tsx
import React from 'react';
import { Carousel } from 'idesign-react';

const App = () => {
  return (
    <Carousel autoPlay interval={2}>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>1</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>2</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>3</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>4</div>
      </Carousel.Item>
    </Carousel>
  );
};

export default App;
```

## 滑动速度

可通过 `duration` 属性控制滑动速度：

```tsx
import React from 'react';
import { Carousel } from 'idesign-react';

const App = () => {
  return (
    <Carousel duration={100}>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>1</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>2</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>3</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>4</div>
      </Carousel.Item>
    </Carousel>
  );
};

export default App;
```

## 卡片轮播

可通过 `type` 属性指定轮播样式：

```tsx
import React from 'react';
import { Carousel } from 'idesign-react';

const App = () => {
  return (
    <Carousel type='card'>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>1</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>2</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#d6d9dc', height: '100%' }}>3</div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ background: '#bcbfc2', height: '100%' }}>4</div>
      </Carousel.Item>
    </Carousel>
  );
};

export default App;
```

## Carousel API

<API hideTitle />

## CarouselItem API

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| children  | 按钮内容   | `ReactNode`     | `--`   |
| className | 类名       | `string`        | `--`   |
| style     | 自定义样式 | `CSSProperties` | `--`   |
