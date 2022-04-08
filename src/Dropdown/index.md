---
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  order: 2
order: 0
---

# Dropdown 下拉菜单（开发中）


### Popup 气泡提示

```tsx
import React from 'react';
import { Button, Popup } from 'idesign-react';

const App = () => {
  return (
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Popup trigger="click" content="提示内容">
          <Button>点击提示</Button>
        </Popup>
      </div>
    </div>
  );
};

export default App;
```

## 基本用法

```tsx
import React from 'react'
import { Dropdown, Button } from 'idesign-react'

const App = () => {
  const options = [
    {
      content: '操作一',
      value: 1
    },
    {
      content: '操作二',
      value: 2
    },
    {
      content: '操作三',
      value: 3
    }
  ]

  const handleSelect = (data) => {
    console.log(data)
  }

  return (
    <Dropdown options={options} onClick={handleSelect}>
      <Button>更多</Button>
    </Dropdown>
  )
}

export default App
```

## 不同触发方式

```tsx
import React from 'react'
import { Dropdown, Button } from 'idesign-react'

const App = () => {
  const options = [
    {
      content: '操作一',
      value: 1
    },
    {
      content: '操作二',
      value: 2
    },
    {
      content: '操作三',
      value: 3
    }
  ]

  const handleSelect = (data) => {
    console.log(data)
  }

  return (
    
    <div className="idesign-demo-block-column">
      <div className="idesign-demo-block-row">
        <Dropdown trigger="click" options={options} onClick={handleSelect}>
          <Button>点击触发</Button>
        </Dropdown>
        <Dropdown trigger="hover" options={options} onClick={handleSelect}>
          <Button>悬浮触发</Button>
        </Dropdown>
        <Dropdown trigger="context-menu" options={options} onClick={handleSelect}>
          <Button>右击触发</Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default App
```
