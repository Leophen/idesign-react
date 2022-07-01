---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示组件
  order: 4
order: 7
---

# Carousel 轮播图（开发中）

## 基本用法

```tsx
import React, { useState } from 'react'
import { Carousel } from 'idesign-react';

const App = () => {
  const [value, setValue] = useState(1)

  const handleChange = (val) => {
    console.log(val)
    setValue(val)
  }

  return (
    <>
      <h4>无默认值</h4>
      <Carousel>
        <Carousel.Item>
          <div className="carousel-demo-item1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">2</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item1">3</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">4</div>
        </Carousel.Item>
      </Carousel>

      <h4>有默认值</h4>
      <Carousel defaultCurrent={value}>
        <Carousel.Item>
          <div className="carousel-demo-item1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">2</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item1">3</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">4</div>
        </Carousel.Item>
      </Carousel>

      <h4>有固定值</h4>
      <Carousel current={value}>
        <Carousel.Item>
          <div className="carousel-demo-item1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">2</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item1">3</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">4</div>
        </Carousel.Item>
      </Carousel>

      <h4>通用方法</h4>
      <Carousel
        current={value}
        onChange={handleChange}
      >
        <Carousel.Item>
          <div className="carousel-demo-item1">1</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">2</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item1">3</div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-demo-item2">4</div>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default App;
```
