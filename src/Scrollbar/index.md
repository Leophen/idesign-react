---
nav:
  title: 组件
  path: /components
group:
  title: 基础组件
  order: 1
---

# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基础用法

通过 `height` 属性设置超出多少高度显示滚动条，若不设置则根据父容器高度自适应。

```tsx
import React from 'react'
import { Scrollbar } from 'idesign-react'

const App = () => {
  const data = Array(24).fill('item')
  return (
    <Scrollbar height={360}>
      {data.map((item) => (
        <div className="idesign-demo-itemy" key={Math.random()}>
          {item}
        </div>
      ))}
    </Scrollbar>
  )
}

export default App
```

## 横向滚动

通过 `width` 属性设置超出多少宽度显示滚动条，若不设置则根据父容器宽度自适应。

```tsx
import React from 'react'
import { Scrollbar } from 'idesign-react'

const App = () => {
  const data = Array(36).fill('item')
  return (
    <Scrollbar width="100%">
      <div className="idesign-demo-itemx-wrap">
        {data.map((item) => (
          <div className="idesign-demo-itemx" key={Math.random()}>
            {item}
          </div>
        ))}
      </div>
    </Scrollbar>
  )
}

export default App
```

## 滚动触发事件

可通过传入 `onScrollX` 和 `onScrollY` 分别控制水平和垂直滚动触发事件，参数均为该方向上的滚动比例。

```tsx
import React from 'react'
import { Scrollbar } from 'idesign-react'

const App = () => {
  const data = Array(36).fill('item')
  const handleScroll = (val) => {
    console.log(val)
  }
  return (
    <>
      <Scrollbar height={360} onScrollY={handleScroll}>
        {data.map((item) => (
          <div className="idesign-demo-itemy" key={Math.random()}>
            {item}
          </div>
        ))}
      </Scrollbar>
      <Scrollbar width="100%" onScrollX={handleScroll}>
        <div className="idesign-demo-itemx-wrap">
          {data.map((item) => (
            <div className="idesign-demo-itemx" key={Math.random()}>
              {item}
            </div>
          ))}
        </div>
      </Scrollbar>
    </>
  )
}

export default App
```

<API src="./index.tsx"></API>
